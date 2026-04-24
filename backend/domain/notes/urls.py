from django.urls import path 
from domain.notes.views import NoteListCreate, NoteDelete 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', NoteListCreate.as_view(), name="note-list"),
    path("delete/<int:pk>/", NoteDelete.as_view(), name="delete-note" ),
]
