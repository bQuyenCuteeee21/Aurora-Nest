from django.db import models
from django.utils.crypto import get_random_string

class RoomType(models.Model):
    name=models.CharField(max_length=120); code=models.CharField(max_length=20,unique=True); price=models.PositiveIntegerField(); view=models.CharField(max_length=180); bathroom=models.CharField(max_length=180); image=models.CharField(max_length=200); amenities=models.JSONField(default=list)
    def __str__(self): return f'{self.name} · {self.code}'
class RoomImage(models.Model):
    room=models.ForeignKey(RoomType,on_delete=models.CASCADE,related_name='images'); image=models.CharField(max_length=200); caption=models.CharField(max_length=120,blank=True); order=models.PositiveIntegerField(default=0)
    class Meta: ordering=['order']
class Booking(models.Model):
    STATUS=[('pending','Chờ cọc'),('deposit_sent','Đã gửi xác nhận cọc'),('confirmed','Đã xác nhận'),('completed','Đã hoàn tất')]
    code=models.CharField(max_length=24,unique=True,editable=False); guest_name=models.CharField(max_length=120); room=models.ForeignKey(RoomType,on_delete=models.PROTECT); check_in=models.DateField(); check_out=models.DateField(); status=models.CharField(max_length=20,choices=STATUS,default='pending'); deposit_amount=models.PositiveIntegerField(default=0); total_amount=models.PositiveIntegerField(default=0); deposit_sent_at=models.DateTimeField(null=True,blank=True); created_at=models.DateTimeField(auto_now_add=True)
    def save(self,*args,**kwargs):
        if not self.code: self.code='BK-'+get_random_string(6,allowed_chars='0123456789').upper()
        self.total_amount=max(0,(self.check_out-self.check_in).days*self.room.price); self.deposit_amount=self.total_amount//2; super().save(*args,**kwargs)
    @property
    def nights(self): return max(0,(self.check_out-self.check_in).days)
    def __str__(self): return f'{self.code} · {self.guest_name}'
