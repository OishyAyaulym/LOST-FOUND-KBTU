from rest_framework import serializers
from .models import Category, Item, Claim
from django.contrib.auth.models import User

class ItemSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = Item
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class StatsSerializer(serializers.Serializer):
    total_items = serializers.IntegerField()
    returned_items = serializers.IntegerField()

class UserShortSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()

