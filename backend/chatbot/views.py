import google.generativeai as genai
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.conf import settings
from .models import ChatMessage, ModuleContext, EconomicTool, ModuleConversation, ModuleConversationMessage, AgentTask, AgentMemory, AgentSource, AgentDocument, AgentInsight
from .serializers import (
    ChatMessageSerializer,
    ModuleContextSerializer,
    EconomicToolSerializer,
    ModuleConversationSerializer,
    ModuleConversationMessageSerializer,
)
from .agent import agent

def _build_knowledge_pack(module: str) -> str:
    from business_forecast.models import KPI
    kpis = list(KPI.objects.all().values('name', 'current', 'target', 'unit')[:50])
    insights = list(AgentInsight.objects.filter(module=module).values('summary', 'details')[:20])
    kpi_lines = [f"- {k['name']}: {k['current']}{(' ' + k['unit']) if k.get('unit') else ''} (target {k['target']})" for k in kpis]
    insight_lines = [f"- {i['summary']}" for i in insights]
    parts = []
    parts.append(f"Module: {module}")
    if kpi_lines:
        parts.append("KPIs:\n" + "\n".join(kpi_lines))
    if insight_lines:
        parts.append("Insights:\n" + "\n".join(insight_lines))
    return "\n\n".join(parts)

def _groq_chat(messages: list, system: str, knowledge: str | None = None) -> str | None:
    # Use environment variable for API key
    api_key = settings.GROQ_API_KEY
    if not api_key:
        return None
    try:
        import requests
        openai_msgs = []
        sys_content = system.strip()
        if knowledge:
            sys_content += "\n\nIn-app Knowledge (KPIs/Insights):\n" + knowledge.strip()
        openai_msgs.append({"role": "system", "content": sys_content})
        for m in messages:
            role = 'user' if m.get('type') == 'user' else 'assistant'
            openai_msgs.append({"role": role, "content": m.get('content', '')})
        r = requests.post(
            'https://api.groq.com/openai/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json',
            },
            json={
                'model': 'llama-3.3-70b-versatile',
                'temperature': 0.3,
                'messages': openai_msgs,
            },
            timeout=30,
        )
        if r.status_code != 200:
            return None
        data = r.json()
        return (data.get('choices') or [{}])[0].get('message', {}).get('content')
    except Exception:
        return None

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

class ModuleConversationViewSet(viewsets.ModelViewSet):
    queryset = ModuleConversation.objects.all()
    serializer_class = ModuleConversationSerializer

    def get_queryset(self):
        module = self.request.query_params.get('module')
        queryset = ModuleConversation.objects.all()
        if module:
            queryset = queryset.filter(module=module)
        return queryset

    def create(self, request, *args, **kwargs):
        module = request.data.get('module')
        title = request.data.get('title')

        conversation = ModuleConversation.objects.create(
            module=module,
            title=title,
            user=request.user if request.user.is_authenticated else None
        )

        serializer = self.get_serializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ModuleConversationMessageViewSet(viewsets.ModelViewSet):
    queryset = ModuleConversationMessage.objects.all()
    serializer_class = ModuleConversationMessageSerializer

    def get_queryset(self):
        conversation_id = self.request.query_params.get('conversation')
        queryset = ModuleConversationMessage.objects.all()
        if conversation_id:
            queryset = queryset.filter(conversation_id=conversation_id)
        return queryset

    def create(self, request, *args, **kwargs):
        conversation_id = request.data.get('conversation')
        message_type = request.data.get('type')
        content = request.data.get('content')

        try:
            conversation = ModuleConversation.objects.get(id=conversation_id)
        except ModuleConversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

        message = ModuleConversationMessage.objects.create(
            conversation=conversation,
            type=message_type,
            content=content
        )

        conversation.title = conversation.title or f"{conversation.module} Chat"
        conversation.save()

        serializer = self.get_serializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@csrf_exempt
@api_view(['POST'])
def module_chat(request):
    """Handle chat messages for module-specific conversations"""
    conversation_id = request.data.get('conversation')
    content = request.data.get('content')
    module = request.data.get('module')

    if not all([conversation_id, content, module]):
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        conversation = ModuleConversation.objects.get(id=conversation_id)
    except ModuleConversation.DoesNotExist:
        return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

    user_message = ModuleConversationMessage.objects.create(
        conversation=conversation,
        type='user',
        content=content
    )

    try:
        history = list(conversation.messages.all().exclude(id=user_message.id).values('type', 'content'))
        sys_prompt = get_module_system_prompt(module)
        knowledge = _build_knowledge_pack(module)
        # Prefer Groq
        assistant_content = _groq_chat(history + [{"type": "user", "content": content}], sys_prompt, knowledge) or None
        if not assistant_content:
            try:
                response = model.generate_content(
                    f"{sys_prompt}\n\nIn-app Knowledge:\n{knowledge}\n\nUser message: {content}",
                    generation_config=genai.types.GenerationConfig(temperature=0.7)
                )
                assistant_content = response.text if response else "Unable to generate response"
            except Exception:
                assistant_content = f"I'm a {module.replace('_', ' ')} assistant. How can I help you today?"

        assistant_message = ModuleConversationMessage.objects.create(
            conversation=conversation,
            type='assistant',
            content=assistant_content
        )

        return Response({
            'user_message': ModuleConversationMessageSerializer(user_message).data,
            'assistant_message': ModuleConversationMessageSerializer(assistant_message).data,
        })
    except Exception as e:
        assistant_message = ModuleConversationMessage.objects.create(
            conversation=conversation,
            type='assistant',
            content=f"I'm a {module.replace('_', ' ')} assistant. I'm here to help with your questions about {module.replace('_', ' ').lower()}."
        )
        return Response({
            'user_message': ModuleConversationMessageSerializer(user_message).data,
            'assistant_message': ModuleConversationMessageSerializer(assistant_message).data,
        })

def get_module_system_prompt(module):
    prompts = {
        'market_analysis': 'You are a market analysis expert. Provide insights about market trends, competitive landscape, and market opportunities.',
        'pricing_strategy': 'You are a pricing strategy expert. Help with pricing models, competitor analysis, and price optimization strategies.',
        'revenue_strategy': 'You are a revenue strategy expert. Provide guidance on revenue optimization, growth strategies, and business metrics.',
    }
    return prompts.get(module, 'You are a business assistant.')

class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

class ModuleContextViewSet(viewsets.ModelViewSet):
    queryset = ModuleContext.objects.all()
    serializer_class = ModuleContextSerializer

class EconomicToolViewSet(viewsets.ModelViewSet):
    queryset = EconomicTool.objects.all()
    serializer_class = EconomicToolSerializer

@csrf_exempt
@api_view(['POST'])
def generate_response(request):
    """Generate a contextual response based on conversation history and context using Gemini AI"""
    messages = request.data.get('messages', [])
    context = request.data.get('context', '')
    current_data = request.data.get('currentData', {})

    # Context descriptions for the AI
    context_descriptions = {
        "economic-forecasting": "Economic indicators, forecasts, and market analysis",
        "business-forecast": "Business performance predictions and scenarios",
        "tax-compliance": "Tax obligations and regulatory compliance",
        "pricing-strategy": "Pricing models and competitive analysis",
        "revenue-strategy": "Revenue optimization and growth strategies",
        "market-analysis": "Market research and competitive intelligence",
        "loan-funding": "Financing options and investment analysis",
        "inventory-supply": "Supply chain optimization and inventory management",
        "financial-advisory": "Financial planning and strategic budgeting",
        "policy-economic": "Policy analysis and economic impact assessment",
    }

    context_description = context_descriptions.get(context, "General business and economic analysis")

    # System prompt
    system_prompt = f"""You are Joseph AI, an expert economic and business intelligence assistant.

Current Context: {context_description}

{("Current Data: " + str(current_data)) if current_data else ""}

Please provide helpful, accurate, and contextual responses as Joseph AI. Be professional, insightful, and focus on the specific context. If relevant data is provided, analyze it and provide actionable insights. Maintain conversation context and build upon previous messages."""

    # Prefer Groq with in-app knowledge
    knowledge = _build_knowledge_pack(context or 'general')
    groq_text = _groq_chat(messages, system_prompt, knowledge)
    if groq_text:
        response_content = groq_text.strip()
    else:
        # Prepare contents for Gemini
        contents = [{"role": "user", "parts": [system_prompt + "\n\nIn-app Knowledge:\n" + knowledge]}]
        for msg in messages:
            role = "user" if msg.get('type') == 'user' else "model"
            content = msg.get('content', '')
            contents.append({"role": role, "parts": [content]})
        try:
            response = model.generate_content(contents)
            response_content = response.text.strip() if response else ''
            if not response_content:
                response_content = f"As Joseph AI, I'm here to help with {context_description}."
        except Exception:
            response_content = f"As Joseph AI, I'm here to help with {context_description}."

    from django.utils import timezone
    return Response({
        'response': response_content,
        'timestamp': timezone.now().isoformat()
    })

@api_view(['POST'])
def agent_start(request):
    """Start the autonomous agent."""
    if not agent.is_running:
        agent.start()
        return Response({'status': 'Agent started'})
    else:
        return Response({'status': 'Agent already running'})

@api_view(['POST'])
def agent_stop(request):
    """Stop the autonomous agent."""
    if agent.is_running:
        agent.stop()
        return Response({'status': 'Agent stopped'})
    else:
        return Response({'status': 'Agent not running'})

@api_view(['GET'])
def agent_status(request):
    """Get the current status of the autonomous agent."""
    status = agent.get_status()
    return Response(status)

@csrf_exempt
@api_view(['POST'])
def agent_command(request):
    """Accept a natural-language command; plan and execute actions; return result."""
    message = request.data.get('message') or request.data.get('text') or ''
    context = request.data.get('context') or {}
    if not isinstance(context, dict):
        context = {}
    if not message:
        return Response({'error': 'Missing message'}, status=status.HTTP_400_BAD_REQUEST)

    # Ask model to decide actions
    result = agent._handle_user_request(message, context)

    # Also persist as a task entry
    task = AgentTask.objects.create(type='agent_command', payload={'message': message, 'context': context}, status=AgentTask.COMPLETED, result=result)
    return Response({'task_id': str(task.id), 'result': result})

@csrf_exempt
@api_view(['POST'])
def agent_tool_call(request):
    """Direct tool execution: { tool: string, params: object }"""
    tool = request.data.get('tool')
    params = request.data.get('params') or {}
    if not tool:
        return Response({'error': 'Missing tool'}, status=status.HTTP_400_BAD_REQUEST)

    outcome = agent._execute_tool(tool, params if isinstance(params, dict) else {})
    AgentTask.objects.create(type='tool_call', payload={'tool': tool, 'params': params}, status=AgentTask.COMPLETED if outcome.get('ok') else AgentTask.FAILED, result=outcome)
    return Response(outcome)

@csrf_exempt
@api_view(['POST'])
def agent_ingest_url(request):
    url = request.data.get('url')
    module = request.data.get('module') or 'general'
    if not url:
        return Response({'error': 'Missing url'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        import requests
        from html import unescape
        r = requests.get(url, timeout=10)
        text = r.text
        # very simple text extraction
        import re
        no_scripts = re.sub(r'<(script|style)[\s\S]*?</\1>', ' ', text, flags=re.I)
        stripped = re.sub(r'<[^>]+>', ' ', no_scripts)
        content = unescape(re.sub(r'\s+', ' ', stripped)).strip()
        source = AgentSource.objects.create(type=AgentSource.URL, identifier=url, content=content[:4000])
        AgentDocument.objects.create(source=source, title=url, content_excerpt=content[:2000], tokens=min(len(content)//4, 4000))
        AgentInsight.objects.create(module=module, summary=f"Ingested URL: {url}", details={"chars": len(content)})
        return Response({"ok": True, "url": url})
    except Exception as e:
        return Response({"ok": False, "error": str(e)}, status=500)

@csrf_exempt
@api_view(['POST'])
def agent_ingest_text(request):
    text = request.data.get('text')
    label = request.data.get('label') or 'user-text'
    module = request.data.get('module') or 'general'
    if not text:
        return Response({'error': 'Missing text'}, status=status.HTTP_400_BAD_REQUEST)
    source = AgentSource.objects.create(type=AgentSource.TEXT, identifier=label, content=text[:4000])
    AgentDocument.objects.create(source=source, title=label, content_excerpt=text[:2000], tokens=min(len(text)//4, 4000))
    AgentInsight.objects.create(module=module, summary=f"Ingested text: {label}", details={"chars": len(text)})
    return Response({"ok": True, "label": label})

@csrf_exempt
@api_view(['POST'])
def agent_query(request):
    """Return a dynamic data bundle for a module from latest KPIs/insights."""
    module = request.data.get('module') or 'general'
    from business_forecast.models import KPI
    kpis = list(KPI.objects.all().values('name', 'current', 'target', 'unit', 'trend', 'category')[:50])
    insights = list(AgentInsight.objects.filter(module=module).values('summary', 'details', 'created_at')[:20])
    return Response({
        'module': module,
        'kpis': kpis,
        'insights': insights,
    })
