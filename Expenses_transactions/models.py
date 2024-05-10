from django.db import models
from users.models import User


class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=100, blank=True)
    amount = models.DecimalField(max_digits=10,
                                decimal_places=2,
                                null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    Date_Expense= models.DateTimeField(blank=True)




# Create your models here.
