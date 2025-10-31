from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    ChatMessageViewSet,
    ModuleContextViewSet,
    EconomicToolViewSet,
    ModuleConversationViewSet,
    ModuleConversationMessageViewSet,
    generate_response,
    agent_start,
    agent_stop,
    agent_status,
    agent_command,
    agent_tool_call,
    agent_ingest_url,
    agent_ingest_text,
    agent_query,
    module_chat,
)

router = DefaultRouter()
router.register(r'messages', ChatMessageViewSet)
router.register(r'module-contexts', ModuleContextViewSet)
router.register(r'economic-tools', EconomicToolViewSet)
router.register(r'conversations', ModuleConversationViewSet)
router.register(r'conversation-messages', ModuleConversationMessageViewSet)

urlpatterns = router.urls + [
    path('generate-response/', generate_response, name='generate_response'),
    path('agent/start/', agent_start, name='agent_start'),
    path('agent/stop/', agent_stop, name='agent_stop'),
    path('agent/status/', agent_status, name='agent_status'),
    path('agent/command/', agent_command, name='agent_command'),
    path('agent/tool-call/', agent_tool_call, name='agent_tool_call'),
    path('agent/ingest-url/', agent_ingest_url, name='agent_ingest_url'),
    path('agent/ingest-text/', agent_ingest_text, name='agent_ingest_text'),
    path('agent/query/', agent_query, name='agent_query'),
    path('module-chat/', module_chat, name='module_chat'),
]
