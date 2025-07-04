from django.urls import path
from . import views
from .views import shake_alert


urlpatterns = [
    path('', views.home, name='home'),
    path('', shake_alert, name='shake_alert'),
    path('panic-button/', views.panic_button_view, name='panic_button'),  # Added path
]

    
