from django.urls import path
from .views import ItemList, ItemDetail, get_stats, recent_items, CategoryList 

urlpatterns = [
    path('items/', ItemList.as_view(), name='item-list'),
    path('items/<int:pk>/', ItemDetail.as_view(), name='item-detail'),
    
    path('categories/', CategoryList.as_view(), name='category-list'), 

    path('stats/', get_stats, name='api-stats'), 
    path('recent/', recent_items, name='api-recent'),   
]

