from django.urls import path
from . import views
urlpatterns=[path('',views.home,name='home'),path('booking/create/',views.create_booking,name='create_booking'),path('booking/<str:code>/',views.booking_detail,name='booking_detail'),path('booking/<str:code>/confirm-deposit/',views.confirm_deposit,name='confirm_deposit')]
