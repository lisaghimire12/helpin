from rest_framework import serializers
from . models import *

class HelpRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpRequestfielsa = '__all__'