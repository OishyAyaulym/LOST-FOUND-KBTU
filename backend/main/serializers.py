from rest_framework import serializers
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
    category = serializers.ReadOnlyField(source='category.name')

    uploaded_images = serializers.ListField(
        child=serializers.URLField(), write_only=True, required=False
    )
    
    class Meta:
        model = Item
        fields = [
            'id', 'title', 'category', 'location',
            'date', 'type', 'description', 'images', 
            'comments', 'uploaded_images', 'status', 'postedBy'
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

