from django.contrib.auth.models import User 
from rest_framework import serializers 
from domain.notes.models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        # Check the spelling of 'created_at' carefully here
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
