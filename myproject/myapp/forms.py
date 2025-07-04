from django import forms

class PanicButtonForm(forms.Form):
    contact_number = forms.CharField(max_length=15, required=True)
