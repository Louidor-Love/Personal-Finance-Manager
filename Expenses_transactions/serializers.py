from rest_framework import serializers
from . models import *



class ExpenseSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.name')

    class Meta:
        model = Expense
        fields = "__all__"

    