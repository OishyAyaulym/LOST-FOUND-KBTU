from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Item, Category
from .serializers import ItemSerializer, StatsSerializer, CategorySerializer

@api_view(['GET'])
def get_stats(request):
    data = {
        'total_items': Item.objects.count(),
        'returned_items': Item.objects.filter(status='returned').count()
    }
    serializer = StatsSerializer(data)
    return Response(serializer.data)

@api_view(['GET'])
def recent_items(request):
    items = Item.objects.order_by('-created_at')[:3]
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


class ItemList(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(finder=request.user) # Привязка к текущему юзеру
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ItemDetail(APIView):
    def get_object(self, pk):
        try:
            return Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return None

    def get(self, request, pk):
        item = self.get_object(pk)
        if not item: return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def delete(self, request, pk):
        item = self.get_object(pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CategoryList(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    

