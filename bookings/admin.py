from django.contrib import admin
from .models import Booking, RoomImage, RoomType

@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display=('name','code','price','view')
    search_fields=('name','code')

@admin.register(RoomImage)
class RoomImageAdmin(admin.ModelAdmin):
    list_display=('room','caption','order')
    list_filter=('room',)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display=('code','guest_name','room','check_in','check_out','nights','total_amount','status')
    list_filter=('status','room')
    search_fields=('code','guest_name')
    actions=['approve_deposits']

    @admin.action(description='Duyệt cọc và xác nhận đặt phòng')
    def approve_deposits(self,request,queryset):
        queryset.filter(status='deposit_sent').update(status='confirmed')
