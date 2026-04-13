from rest_framework import serializers
from .models import Category, Item, Claim
from django.contrib.auth.models import User

class ItemSerializer(serializers.ModelSerializer):
    imageUrl = serializers.URLField(source='image_url', allow_blank=True)
    type = serializers.CharField(source='item_type')
    date = serializers.DateTimeField(source='created_at', format="%Y-%m-%d", read_only=True)
    postedBy = serializers.ReadOnlyField(source='finder.username')
    category = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = Item
        fields = [
            'id', 'title', 'category', 'location',
            'date', 'type', 'description', 'imageUrl', 'status', 'postedBy'
        ]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon']

class ClaimSerializer(serializers.ModelSerializer):
    itemId = serializers.PrimaryKeyRelatedField(source='item', queryset=Item.objects.all())
    date = serializers.DateTimeField(source='created_at', format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Claim
        fields = ['id', 'itemId', 'description', 'status', 'date']

class StatsSerializer(serializers.Serializer):
    total_items = serializers.IntegerField()
    returned_items = serializers.IntegerField()

class UserShortSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()

