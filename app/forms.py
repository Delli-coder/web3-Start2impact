from .models import TokenNft
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class RegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class TokenNftForm(forms.ModelForm):
    class Meta:
        model = TokenNft
        fields = ['image', 'name', 'uri', 'price']
        widgets = {'price': forms.TextInput(attrs={'placeholder': 'Price in eth'})}


class SellForm(forms.ModelForm):
    class Meta:
        model = TokenNft
        fields = ['price', 'token_id']
