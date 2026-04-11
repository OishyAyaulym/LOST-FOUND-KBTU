from django.db import models
from django.contrib.auth.models import User

class AvailableItemsManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status='available')
    

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Item(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('under_review', 'Under Review'),
        ('returned', 'Returned'),
    ]
    objects = models.Manager() 
    available = AvailableItemsManager()
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField(max_length=500, blank=True)
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    created_at = models.DateTimeField(auto_now_add=True)
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')

    finder = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Claim(models.Model):
    description = models.TextField() 
    created_at = models.DateTimeField(auto_now_add=True)
    
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='claims')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Claim by {self.user.username} for {self.item.title}"
    

