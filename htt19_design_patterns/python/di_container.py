class DIContainer:
    def __init__(self):
        self._services = {}

    def register_singleton(self, service_type, factory):
        self._services[service_type] = factory()

    def register_transient(self, service_type, factory):
        self._services[service_type] = factory

    def resolve(self, service_type):
        service = self._services.get(service_type)
        if service is None:
            raise ValueError(f"Service chưa được đăng ký: {service_type}")
        return service() if callable(service) else service
      
