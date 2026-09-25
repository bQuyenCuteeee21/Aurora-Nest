# HTT19 - Design Patterns

Bộ bài làm hoàn chỉnh cho đề tài **Hệ thống Quản lý Khách sạn và Homestay HTT19**.

## Nội dung

- `python/`: mã Python chạy demo Singleton, Factory, Strategy, Repository và DI Container.
- `diagrams/use-case.puml`: sơ đồ Use Case tổng quát.
- `diagrams/use-case-details.puml`: hai Use Case chi tiết: Check-in và Check-out.
- `slides/HTT19_Design_Patterns.pptx`: file PowerPoint báo cáo 30 phút.
- `slides/create_presentation.cjs`: mã tạo lại PowerPoint.

## Chạy demo Python

Từ thư mục `python`, chạy:

```bash
python main.py
```

Kết quả demo gồm: đọc cấu hình Singleton, check-in phòng qua Repository và DI Container, áp dụng giảm giá VIP bằng Strategy, sau đó thanh toán qua MoMo được tạo bởi Factory.

## Tạo lại PowerPoint

Đứng tại thư mục gốc dự án và chạy:

```bash
node htt19_design_patterns/slides/create_presentation.cjs
```

File PowerPoint sẽ được tạo tại thư mục hiện hành với tên `HTT19_Design_Patterns.pptx`. Bản đã tạo sẵn nằm trong thư mục `slides`.

## Sơ đồ

Mở hai file `.puml` bằng PlantUML, VS Code extension PlantUML hoặc dán nội dung vào PlantUML Online để xuất PNG/SVG chèn vào báo cáo.

## Kịch bản demo 6 phút

1. Mở `python/main.py` và chạy chương trình.
2. Chỉ ra `AppConfigManager` trả về cùng một instance.
3. Chỉ ra Repository trả về các phòng trống trước và sau check-in.
4. Chỉ ra `PaymentFactory.create_payment("momo")` tạo cổng thanh toán.
5. Chỉ ra `VipDiscount` làm thay đổi số tiền thanh toán mà không sửa `CheckoutService`.
6. Kết luận DI Container đã cung cấp dependency cho `BookingService`.

## Phân chia 30 phút

- Giới thiệu đề tài: 2 phút.
- Design Pattern và lợi ích: 4 phút.
- Creational, Structural, Behavioral: 7 phút.
- IoC/DI Container: 3 phút.
- Use Case: 4 phút.
- Demo Python: 6 phút.
- Đánh giá và kết luận: 4 phút.
      
