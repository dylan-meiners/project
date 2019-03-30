from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('scraper/', include('scraper.urls')),
    path('admin/', admin.site.urls),
]
