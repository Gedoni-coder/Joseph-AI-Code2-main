from django.db import models
from django.contrib.auth.models import User
import uuid

class ModuleConversation(models.Model):
    MODULE_CHOICES = [
        ('market_analysis', 'Market Analysis'),
        ('pricing_strategy', 'Pricing Strategy'),
        ('revenue_strategy', 'Revenue Strategy'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    module = models.CharField(max_length=50, choices=MODULE_CHOICES)
    title = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.module} Conversation: {self.title or str(self.id)}"

class ModuleConversationMessage(models.Model):
    MESSAGE_TYPES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(ModuleConversation, on_delete=models.CASCADE, related_name='messages')
    type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.type}: {self.content[:50]}..."

class ChatMessage(models.Model):
    USER = "user"
    ASSISTANT = "assistant"
    MESSAGE_TYPES = [
        (USER, "User"),
        (ASSISTANT, "Assistant"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    context = models.CharField(max_length=100, null=True, blank=True)
    tools = models.JSONField(null=True, blank=True)  # Array of tool IDs

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.type}: {self.content[:50]}..."

class ModuleContext(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)
    route = models.CharField(max_length=200)
    description = models.TextField()
    capabilities = models.JSONField()  # Array of strings
    sample_questions = models.JSONField()  # Array of strings

    def __str__(self):
        return self.name

class EconomicTool(models.Model):
    CALCULATOR = "calculator"
    ANALYZER = "analyzer"
    PLANNER = "planner"
    ADVISOR = "advisor"
    UTILITY = "utility"
    CATEGORIES = [
        (CALCULATOR, "Calculator"),
        (ANALYZER, "Analyzer"),
        (PLANNER, "Planner"),
        (ADVISOR, "Advisor"),
        (UTILITY, "Utility"),
    ]

    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORIES)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

# Monolithic Agent persistence
class AgentTask(models.Model):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    STATUS_CHOICES = [
        (PENDING, "pending"),
        (COMPLETED, "completed"),
        (FAILED, "failed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    type = models.CharField(max_length=100)
    payload = models.JSONField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)
    result = models.JSONField(null=True, blank=True)
    error = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

class AgentMemory(models.Model):
    key = models.CharField(max_length=255, unique=True)
    value = models.JSONField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.key

class AgentSource(models.Model):
    URL = "url"
    TEXT = "text"
    TYPE_CHOICES = [
        (URL, "url"),
        (TEXT, "text"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    identifier = models.TextField()  # URL or user-provided label
    content = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

class AgentDocument(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source = models.ForeignKey(AgentSource, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=255, null=True, blank=True)
    content_excerpt = models.TextField()
    tokens = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

class AgentInsight(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    module = models.CharField(max_length=100)
    summary = models.TextField()
    details = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
