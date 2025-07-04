from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('panic-button/', views.panic_button_view, name='panic_button'),  # Added path
]

    
