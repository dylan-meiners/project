from django.shortcuts import render
from django.http import HttpResponse
from templates import *

def index(request):
    return render(request, 'index.html')
