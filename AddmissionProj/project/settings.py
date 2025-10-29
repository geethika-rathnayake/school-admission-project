
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-qh2el!i0pdesl^rbab2886_-lx83yrm%()qxru++98kk#z(8^o'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Your App and Third-party Apps
    'app',
    'rest_framework',   # DRF for API
    'corsheaders',      # For cross-origin requests
    # NOTE: If you are using JWT, you will need to install and include:
    # 'rest_framework_simplejwt', 
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",    # CRITICAL: MUST be at the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'school',
        'USER': 'root',
        'PASSWORD': 'Admin1234',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'


# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# =========================================================
# 🔹 CUSTOM SETTINGS FOR FRONTEND/BACKEND (API, CORS, MEDIA)
# =========================================================

# --- 1. CORS Settings (Required for Frontend/Backend communication) ---
# Allow requests from the Next.js development server
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Add any other frontend origins here
]

# --- 2. Media File Storage Settings (Required for ImageField and FileField) ---
# This is the URL prefix for media files (e.g., http://127.0.0.1:8000/media/...)
MEDIA_URL = '/media/'
# This is the file system path where uploaded files will be stored
# It creates a 'media' folder at the root of your project
MEDIA_ROOT = BASE_DIR / 'media' 


# --- 3. Django REST Framework configuration (JWT authentication) ---
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        # Ensure you have installed djangorestframework-simplejwt for this
        "rest_framework_simplejwt.authentication.JWTAuthentication", 
        "rest_framework.authentication.SessionAuthentication", # Keep for browsable API
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.AllowAny", # Allows API access without authentication by default
        # If you want to enforce login for all views, change to: 
        # "rest_framework.permissions.IsAuthenticated",
    ),
}