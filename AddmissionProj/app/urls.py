# AddmissionProj/urls.py (the main project urls file)
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# DRF Router imports
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Import all views
from app import views # Assuming SubmissionViewSet is in app.views

# --- 1. Initialize and Configure DRF Router ---
router = DefaultRouter()
# Register the SubmissionViewSet under the path 'students' to match your frontend API_BASE_URL
router.register(r'students', views.SubmissionViewSet, basename='submission') 

# --- 2. Define Main URL Patterns ---
urlpatterns = [
    # --- Django admin ---
    path('admin/', admin.site.urls),

    # --- Frontend pages (HTML views) ---
    path('', views.index, name='home'),
    path('list/', views.list_stu, name='list'),

    # --- JWT authentication endpoints ---
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # --- REST API Endpoints (Using DRF Router) ---
    # This single line replaces your manual list_students and create_student paths
    # It creates: /api/students/ (GET, POST) and /api/students/{id}/ (GET, PATCH, DELETE)
    path('api/', include(router.urls)), 
    
]

# --- 3. Serve media files (development only) ---
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)