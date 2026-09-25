from config import AppConfigManager
from di_container import DIContainer
from discount_strategy import DiscountCalculator, VipDiscount
from payment_factory import PaymentFactory
from repositories import InMemoryRoomRepository
from services import BookingService, CheckoutService


def build_container() -> DIContainer:
    container = DIContainer()
    container.register_singleton(AppConfigManager, AppConfigManager)
    container.register_singleton(
        InMemoryRoomRepository,
        InMemoryRoomRepository,
    )
    return container


def main():
    container = build_container()
    config = container.resolve(AppConfigManager)
    rooms = container.resolve(InMemoryRoomRepository)

    print("=== HTT19 HOTEL MANAGEMENT ===")
    print(config.get("application_name"))
    print("Phòng trống trước check-in:", rooms.find_available_rooms())

    booking_service = BookingService(rooms, config)
    booking_service.check_in(101)
    print("Phòng trống sau check-in:", rooms.find_available_rooms())

    gateway = PaymentFactory.create_payment("momo")
    discount = DiscountCalculator(VipDiscount())
    checkout_service = CheckoutService(gateway, discount)
    final_amount = checkout_service.checkout(5_000_000)
    print(f"Tổng tiền sau giảm giá: {final_amount:,.0f} VND")


if __name__ == "__main__":
    main()
      
