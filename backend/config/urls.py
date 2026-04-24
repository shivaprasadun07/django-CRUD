
from django.contrib import admin
from django.urls import path ,include 
from domain.api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/" ,include("domain.api.urls")),
    path('api/notes/', include('domain.notes.urls')),
    path("api-auth/", include("rest_framework.urls")),
]
