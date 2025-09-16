from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from .models import HelpRequest
from .serializers import HelpRequestSerializer

# Create your views here.
class HelpRequestViewSet(viewsets.ModelViewSet):
    queryset = HelpRequest.objects.all()
    serializer_class = HelpRequestSerializer