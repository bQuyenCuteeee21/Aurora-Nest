from pathlib import Path
import os
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY','dev-only-aurora-key')
DEBUG = True
ALLOWED_HOSTS = ['*']
ROOT_URLCONF = 'aurora.urls'
INSTALLED_APPS = ['django.contrib.admin','django.contrib.auth','django.contrib.contenttypes','django.contrib.sessions','django.contrib.messages','django.contrib.staticfiles','bookings']
MIDDLEWARE = ['django.middleware.security.SecurityMiddleware','django.contrib.sessions.middleware.SessionMiddleware','django.middleware.common.CommonMiddleware','django.middleware.csrf.CsrfViewMiddleware','django.contrib.auth.middleware.AuthenticationMiddleware','django.contrib.messages.middleware.MessageMiddleware']
TEMPLATES = [{'BACKEND':'django.template.backends.django.DjangoTemplates','DIRS':[BASE_DIR/'templates'],'APP_DIRS':True,'OPTIONS':{'context_processors':['django.template.context_processors.request','django.contrib.auth.context_processors.auth','django.contrib.messages.context_processors.messages']}}]
WSGI_APPLICATION = 'aurora.wsgi.application'
DATABASE_URL = os.getenv('DATABASE_URL') or os.getenv('POSTGRES_URL')
if DATABASE_URL:
    DATABASES = {'default': {'ENGINE': 'django.db.backends.postgresql', 'NAME': DATABASE_URL, 'OPTIONS': {'sslmode': 'require', 'connect_timeout': 10}}}
else:
    DATABASES = {'default': {'ENGINE':'django.db.backends.postgresql','NAME':os.getenv('POSTGRES_DATABASE', os.getenv('PGDATABASE','postgres')),'USER':os.getenv('POSTGRES_USER', os.getenv('PGUSER','postgres')),'PASSWORD':os.getenv('POSTGRES_PASSWORD', os.getenv('PGPASSWORD','')),'HOST':os.getenv('POSTGRES_HOST', os.getenv('PGHOST','localhost')),'PORT':os.getenv('PGPORT','5432')}}
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR/'static']
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
LANGUAGE_CODE = 'vi'
TIME_ZONE = 'Asia/Ho_Chi_Minh'
USE_TZ = True
