from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view


from rest_framework import status

from . models import *
from . serializers import *





@api_view(['GET'])
def get_exp_by_cate(request, category):
    expenses = Expense.objects.filter(category=category)
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def search(request):
    query = request.query_params.get('query')
    if query is None:
        query = ''
    product = Expense.objects.filter(name__icontains=query)
    serializer = ExpenseSerializer(product, many=True)
    return Response({'expenses': serializer.data})


@api_view(['GET'])
def get_expenses(request):
    expenses = Expense.objects.all()
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_expense(request, name):
    expenses = Expense.objects.get(name=name)
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_expense(request):
    if request.user.is_staff:
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)




@api_view(['PUT'])
def edit_expense(request, pk):
    product = Expense.objects.get(pk=pk)
    if request.user.is_staff:
        serializer = ExpenseSerializer(Expense, data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            category = serializer.validated_data['category']
            s = name + category
            slug = slugify(s)
            serializer.save(user=request.user, slug=slug)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
def delete_expense(request, pk):
    product = Expense.objects.get(pk=pk)
    if request.user.is_staff:
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

# Create your views here.
