from config import AppConfigManager
from repositories import RoomRepository


class BookingService:
    def __init__(self, room_repository: RoomRepository, config: AppConfigManager):
        self.room_repository = room_repository
        self.config = config

    def check_in(self, room_id: int) -> bool:
        success = self.room_repository.update_status(room_id, "occupied")
        message = "thành công" if success else "thất bại"
        print(f"Check-in phòng {room_id} {message}")
        return success


class CheckoutService:
    def __init__(self, payment_gateway, discount_calculator):
        self.payment_gateway = payment_gateway
        self.discount_calculator = discount_calculator

    def checkout(self, total_before_discount: float) -> float:
        final_amount = self.discount_calculator.calculate_final_amount(
            total_before_discount
        )
        self.payment_gateway.pay(final_amount)
        return final_amount
      
