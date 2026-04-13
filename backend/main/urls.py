from django.urls import path
from .views import ItemList, ItemDetail, get_stats, recent_items, CategoryList, ClaimList, ClaimDetail

urlpatterns = [
    path('items/', ItemList.as_view(), name='item-list'),
    path('items/<int:pk>/', ItemDetail.as_view(), name='item-detail'),
    path('recent/', recent_items, name='api-recent'), 
    path('categories/', CategoryList.as_view(), name='category-list'), 
    path('stats/', get_stats, name='api-stats'),  
    path('claims/', ClaimList.as_view(), name='claim-list'),
    path('claims/<int:pk>/', ClaimDetail.as_view(), name='claim-detail'),
]

