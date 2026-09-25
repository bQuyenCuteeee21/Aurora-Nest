from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from .models import Booking, RoomType

def home(request):
    rooms=RoomType.objects.prefetch_related('images').all()
    return render(request,'home.html',{'rooms':rooms,'bookings':Booking.objects.select_related('room').order_by('-created_at')[:8]})
def create_booking(request):
    if request.method=='POST':
        room=get_object_or_404(RoomType,pk=request.POST['room']); booking=Booking(guest_name=request.POST['guest_name'],room=room,check_in=request.POST['check_in'],check_out=request.POST['check_out']); booking.save(); return redirect('booking_detail',booking.code)
    return redirect('home')
def booking_detail(request,code):
    booking=get_object_or_404(Booking.objects.select_related('room'),code=code); return render(request,'booking_detail.html',{'booking':booking})
def confirm_deposit(request,code):
    booking=get_object_or_404(Booking,code=code); booking.status='deposit_sent'; booking.deposit_sent_at=timezone.now(); booking.save(update_fields=['status','deposit_sent_at']); return redirect('booking_detail',code)
