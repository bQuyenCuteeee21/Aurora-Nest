from abc import ABC, abstractmethod
from typing import Any


class RoomRepository(ABC):
    @abstractmethod
    def find_available_rooms(self) -> list[dict[str, Any]]:
        raise NotImplementedError

    @abstractmethod
    def update_status(self, room_id: int, status: str) -> bool:
        raise NotImplementedError


class InMemoryRoomRepository(RoomRepository):
    def __init__(self):
        self.rooms = [
            {"id": 101, "type": "Standard", "status": "available"},
            {"id": 102, "type": "Deluxe", "status": "occupied"},
            {"id": 201, "type": "Suite", "status": "available"},
        ]

    def find_available_rooms(self) -> list[dict[str, Any]]:
        return [room for room in self.rooms if room["status"] == "available"]

    def update_status(self, room_id: int, status: str) -> bool:
        for room in self.rooms:
            if room["id"] == room_id:
                room["status"] = status
                return True
        return False
      
