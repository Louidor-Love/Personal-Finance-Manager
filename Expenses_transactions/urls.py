from django.urls import path
from . import views

urlpatterns = [
    path('get/<str:name>/', views.get_expense),
    path('', views.get_expenses),
    path('post/', views.create_expense),
    path('edit/<int:pk>/', views.edit_expense),
    path('delete/<int:pk>/', views.delete_expense),
    path('cate/<str:category>/', views.get_exp_by_cate),
]