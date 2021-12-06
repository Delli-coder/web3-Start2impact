from django.shortcuts import render, redirect
from .forms import *
from .utils import *
from django.contrib import messages
from .models import *
from django.contrib.auth.decorators import login_required


def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            account = create_wallet()
            username = form.cleaned_data.get('username')
            new_prof = Profile.objects.create(user=user, address=account[0], private_key=account[1])
            new_prof.save()
            try:
                send_ether_new_user(new_prof.address)  # function from app.utils
                messages.success(request, 'You received one Ether!')
            except ValueError:
                pass
            messages.success(request, f'Benvenuto!, {username}.')
            return redirect('login')
    form = RegistrationForm()
    return render(request, 'register.html', {'form': form})


@login_required(login_url='login')
def create_token(request):
    if request.method == 'POST':
        form = TokenNftForm(request.POST, request.FILES)
        if form.is_valid():
            try:
                price = w3.toWei(form.instance.price, 'ether')
                tx_token_create = create_nft(form.instance.name, form.instance.uri, price)  # function from app.utils
                form.instance.token_id = event_token_id(tx_token_create)
                messages.success(request, 'Nft create!')
                form.save()
                return redirect('new_token')
            except ValueError:
                messages.error(request, 'error')
                pass
                return redirect('new_token')
    else:
        form = TokenNftForm()
        return render(request, 'new_token.html', {'form': form})


@login_required(login_url='login')
def buy_token(request):
    id_ = request.session.get('selected_id')
    token = TokenNft.objects.filter(token_id=id_)
    return render(request, 'buy_token.html', {'token': token})


@login_required(login_url='login')
def home(request):
    if request.user.is_superuser:
        messages.error(request, 'super user can access to admin/ and new_auction page only')
        return redirect('new_token')
    user_profile = Profile.objects.get(user=request.user)
    id_on_sale = get_id_token_on_sale(user_profile.address)  # function from app.utils
    limit = len(id_on_sale)
    i = 0
    tokens = []
    while i < limit:
        tokens.append(TokenNft.objects.get(token_id=id_on_sale[i]))
        i += 1
    if request.method == 'POST':
        form = request.POST
        id_token = form['token_id']
        token_id = int(id_token)
        request.session['selected_id'] = token_id
        return redirect('buy_token')
    return render(request, 'market.html', {'tokens': tokens})


@login_required(login_url='login')
def profile(request):
    if request.user.is_superuser:
        messages.error(request, 'super user can access to admin/ and new_auction page only')
        return redirect('new_token')
    user_profile = Profile.objects.get(user=request.user)
    token_profile = get_all_token_user(user_profile.address)  # function from app.utils
    return render(request, 'profile.html', {'profile': user_profile, 'tokens': token_profile})
