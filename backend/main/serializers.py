from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Category, Item, ItemImage, Claim, Comment, CustomUser


class ItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemImage
        fields = ['id', 'image_url']

class CommentSerializer(serializers.ModelSerializer):
    itemId = serializers.ReadOnlyField(source='item.id')
    authorName = serializers.ReadOnlyField(source='author.username')
    createdAt = serializers.DateTimeField(source='created_at', format="%Y-%m-%dT%H:%M:%S", read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'itemId', 'authorName', 'text', 'createdAt']

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

class ItemSerializer(serializers.ModelSerializer):
    images = ItemImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    type = serializers.CharField(source='item_type')
    date = serializers.DateTimeField(source='created_at', format="%Y-%m-%d", read_only=True)
    postedBy = serializers.ReadOnlyField(source='finder.username')
    category_name = serializers.ReadOnlyField(source='category.name')
    #category = serializers.ReadOnlyField(source='category.name')
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    finder = serializers.PrimaryKeyRelatedField(read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.URLField(), write_only=True, required=False
    )
    
    class Meta:
        model = Item
        fields = [
            'id', 'title', 'category', 'category_name', 'location',
            'date', 'type', 'description', 'images', 
            'comments', 'uploaded_images', 'status', 'postedBy', 'finder'
        ]
    def create(self, validated_data):
        images_data = validated_data.pop('uploaded_images', [])
        item = Item.objects.create(**validated_data)
        for image_url in images_data:
            ItemImage.objects.create(item=item, image_url=image_url)
        return item

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

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'student_id', 'password')

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            student_id=validated_data['student_id'],
            password=validated_data['password']
        )
        return user