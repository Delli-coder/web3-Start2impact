from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout', auth_views.LogoutView.as_view(template_name='logout.html'), name='logout'),
    path('register', views.register, name='registration'),
    path('new_token', views.create_token, name='new_token'),
    path('', views.home, name='home'),
    path('profile', views.profile, name='profile'),
    path('buy', views.buy_token, name='buy_token'),
]