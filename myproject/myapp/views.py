from django.shortcuts import render, redirect
from django.conf import settings
from twilio.rest import Client
from django.http import HttpResponse
from django.http import JsonResponse

# def send_sms(contact_number):
#     # Initialize Twilio client
#     client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

#     # Define message details
#     message = client.messages.create(
#         body="I am in emergency! Need help my location is https://maps.google.com/?q=27.6033411,77.5955222",
#         from_=settings.TWILIO_PHONE_NUMBER,
#         to=fixed_number
#     )

#     return message.sid

def panic_button_view(request):
    if request.method == 'POST':
        # Twilio configuration
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

        # Fixed number to send the alert
        fixed_number = '+917017371076'  # Replace with the actual number

        message = client.messages.create(
        body="I am in emergency! Need help my location is https://maps.google.com/?q=27.6033411,77.5955222",
        from_=settings.TWILIO_PHONE_NUMBER,
        to=fixed_number
    )

        return HttpResponse("Alert sent successfully!")
    else:
        return render(request, 'home.html')
    


def panic_button(request):
    if request.method == 'POST':
        # Twilio configuration
        account_sid = 'AC444e3d7a8ceb84ad0633952bd1891cf4'
        auth_token = '31bcf4bc80d6a84b5a727c9af4963fe0'
        client = Client(account_sid, auth_token)

        # Fixed number to send the alert
        fixed_number = '+917017371076'  # Replace with the actual number

        # Message body
        message_body = 'Panic alert! Immediate help needed.'

        # Sending the SMS
        client.messages.create(
            body=message_body,
            from_='+17272653490',  # Your Twilio number
            to=fixed_number
        )

        return JsonResponse({'status': 'Alert sent successfully!'})

    return JsonResponse({'status': 'Invalid request'}, status=400)


# def send_sms(request):
#     # Twilio configuration
#     client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

#     # Fixed number to send the alert
#     fixed_number = '+917017371076'  # Replace with the actual number

#     # Sending the SMS
#     message = client.messages.create(
#         body="I am in emergency! Need help my location is https://maps.google.com/?q=27.6033411,77.5955222",
#         from_=settings.TWILIO_PHONE_NUMBER,
#         to=fixed_number
#     )

#     return HttpResponse("Alert sent successfully!")



# def panic_button_view(request):
#     if request.method == 'POST':
#         form = PanicButtonForm(request.POST)
#         if form.is_valid():
#             contact_number = form.cleaned_data['contact_number']  # Corrected field name
#             send_sms(contact_number)
#             return HttpResponse('<h1>Panic Alert Sent Successfully</h1><p>Your panic alert has been sent. We hope you are safe!</p>')
#     else:
#         form = PanicButtonForm()

#     return render(request, 'home.html', {'form': form})

def home(request):
    return render(request,'home.html')
def shake_alert(request):
    return render(request, 'home.html')

