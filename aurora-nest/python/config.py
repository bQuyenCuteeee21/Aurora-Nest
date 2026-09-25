from threading import Lock


class AppConfigManager:
    _instance = None
    _lock = Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self.settings = {
            "application_name": "HTT19 Hotel Management",
            "database_name": "htt19_hotel_db",
            "currency": "VND",
        }
        self._initialized = True

    def get(self, key: str):
        return self.settings.get(key)

    def set(self, key: str, value):
        self.settings[key] = value


if __name__ == "__main__":
    first = AppConfigManager()
    second = AppConfigManager()
    print("Cùng một instance:", first is second)
    print("Tên ứng dụng:", first.get("application_name"))
    second.set("currency", "VND")
    print("Đơn vị tiền tệ:", first.get("currency"))
      
