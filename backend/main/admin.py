from django.contrib import admin
from .models import Category, Item, Claim

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'created_at')
    list_filter = ('status', 'category')
    search_fields = ('title', 'description')

@admin.register(Claim)
class ClaimAdmin(admin.ModelAdmin):
    list_display = ('user', 'item', 'created_at')

