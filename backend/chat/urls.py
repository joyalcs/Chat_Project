from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.GetUserView.as_view()),
    # path('user/<int:id>/', views.GetUserView.as_view(), name='user')
]

