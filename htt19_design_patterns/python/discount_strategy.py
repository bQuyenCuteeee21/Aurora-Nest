from abc import ABC, abstractmethod


class DiscountStrategy(ABC):
    @abstractmethod
    def calculate_discount(self, amount: float) -> float:
        raise NotImplementedError


class VipDiscount(DiscountStrategy):
    def calculate_discount(self, amount: float) -> float:
        return amount * 0.20


class NewCustomerDiscount(DiscountStrategy):
    def calculate_discount(self, amount: float) -> float:
        return amount * 0.10


class FlashSaleDiscount(DiscountStrategy):
    def calculate_discount(self, amount: float) -> float:
        return amount * 0.30


class DiscountCalculator:
    def __init__(self, strategy: DiscountStrategy):
        self.strategy = strategy

    def calculate_final_amount(self, amount: float) -> float:
        if amount < 0:
            raise ValueError("Số tiền không thể âm")
        return amount - self.strategy.calculate_discount(amount)


if __name__ == "__main__":
    amount = 2_000_000
    for name, strategy in {
        "VIP": VipDiscount(),
        "Khách mới": NewCustomerDiscount(),
        "Flash Sale": FlashSaleDiscount(),
    }.items():
        total = DiscountCalculator(strategy).calculate_final_amount(amount)
        print(f"{name}: {total:,.0f} VND")
      
