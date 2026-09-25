from django.core.management.base import BaseCommand
from bookings.models import RoomType,RoomImage
class Command(BaseCommand):
 def handle(self,*args,**kwargs):
  data=[('Phòng đơn','P.101',680000,'View Đà Lạt: rừng thông và đồi núi mờ sương','Nhà vệ sinh riêng, vòi sen kính','room-single.png',['1 giường queen','Wi-Fi']),('Phòng đôi','P.102',920000,'View Hội An: phố cổ vàng và sân đèn lồng','Nhà vệ sinh riêng, vòi sen đứng','room-double.png',['2 giường đơn','Smart TV']),('Phòng VIP','P.201',1650000,'View Hồ Gươm: mặt hồ và cầu Thê Húc đỏ','Phòng tắm marble, bồn tắm nằm','room-vip.png',['Giường king','Minibar']),('Phòng gia đình','P.202',1320000,'View biển Phú Quốc: biển xanh, cát trắng và hàng dừa','Nhà vệ sinh rộng, vòi sen','room-family.png',['Giường king + giường tầng']),('Homestay','H.01',3900000,'View Đà Lạt: sân thông, cẩm tú cầu và sương sớm','2 nhà vệ sinh riêng','homestay-house.png',['3 phòng ngủ','Bếp']),('Villa','H.02',5200000,'View Hội An: sân vàng, đèn lồng và vườn xanh','Phòng tắm phong cách spa','homestay-villa.png',['4 phòng ngủ','BBQ'])]
  for name,code,price,view,bath,image,amenities in data:
   room,_=RoomType.objects.update_or_create(code=code,defaults={'name':name,'price':price,'view':view,'bathroom':bath,'image':image,'amenities':amenities})
   RoomImage.objects.get_or_create(room=room,image=image,defaults={'caption':name+' · phòng ngủ'})
  self.stdout.write(self.style.SUCCESS('Seeded rooms'))
