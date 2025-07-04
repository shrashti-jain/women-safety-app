from django.shortcuts import render, redirect
from django.conf import settings
from twilio.rest import Client
from .forms import PanicButtonForm
from django.http import HttpResponse

def send_sms(contact_number):
    # Initialize Twilio client
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    # Define message details
    message = client.messages.create(
        body="I am in emergency! Need help my location is https://maps.google.com/?q=27.6033411,77.5955222",
        from_=settings.TWILIO_PHONE_NUMBER,
        to=contact_number
    )

    return message.sid

def panic_button_view(request):
    if request.method == 'POST':
        form = PanicButtonForm(request.POST)
        if form.is_valid():
            contact_number = form.cleaned_data['contact_number']  # Corrected field name
            send_sms(contact_number)
            return HttpResponse('<h1>Panic Alert Sent Successfully</h1><p>Your panic alert has been sent. We hope you are safe!</p>')
    else:
        form = PanicButtonForm()

    return render(request, 'home.html', {'form': form})

def home(request):
    return render(request,'home.html')

