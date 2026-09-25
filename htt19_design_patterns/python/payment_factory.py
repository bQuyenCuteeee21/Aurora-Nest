from abc import ABC, abstractmethod


class PaymentGateway(ABC):
    @abstractmethod
    def pay(self, amount: float) -> bool:
        raise NotImplementedError


class VNPay(PaymentGateway):
    def pay(self, amount: float) -> bool:
        print(f"Thanh toán {amount:,.0f} VND qua VNPay")
        return True


class Momo(PaymentGateway):
    def pay(self, amount: float) -> bool:
        print(f"Thanh toán {amount:,.0f} VND qua MoMo")
        return True


class CreditCard(PaymentGateway):
    def pay(self, amount: float) -> bool:
        print(f"Thanh toán {amount:,.0f} VND qua Credit Card")
        return True


class PaymentFactory:
    _gateways = {
        "vnpay": VNPay,
        "momo": Momo,
        "credit_card": CreditCard,
    }

    @classmethod
    def create_payment(cls, payment_type: str) -> PaymentGateway:
        gateway_class = cls._gateways.get(payment_type.lower())
        if gateway_class is None:
            raise ValueError(f"Phương thức không hợp lệ: {payment_type}")
        return gateway_class()


if __name__ == "__main__":
    gateway = PaymentFactory.create_payment("momo")
    gateway.pay(1_500_000)
      
