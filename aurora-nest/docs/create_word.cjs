const { Document, Packer, Paragraph, HeadingLevel, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType } = require('docx');
const fs = require('fs');

const out = '/vercel/share/v0-project/aurora-nest/docs/Aurora-Nest-Design-Patterns.docx';
const code = (text) => new Paragraph({ style: 'Code', children: [new TextRun({ text, font: 'Consolas', size: 18 })] });
const bullet = (text) => new Paragraph({ text, bullet: { level: 0 }, spacing: { after: 120 } });
const heading = (text, level = HeadingLevel.HEADING_1) => new Paragraph({ text, heading: level, spacing: { before: 260, after: 120 } });

const table = new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [
  new TableRow({ children: ['Nhóm', 'Pattern', 'Áp dụng trong Aurora Nest'].map((t) => new TableCell({ children: [new Paragraph({ text: t, bold: true })] })) }),
  ...[
    ['Creational', 'Singleton', 'AppConfigManager quản lý cấu hình dùng chung'],
    ['Creational', 'Factory Method', 'PaymentFactory tạo VNPay, MoMo, CreditCard'],
    ['Structural', 'Adapter', 'Chuyển đổi dữ liệu gateway về mô hình thanh toán nội bộ'],
    ['Structural', 'Repository', 'Tách BookingService khỏi cách lưu trữ phòng/CSDL'],
    ['Behavioral', 'Observer', 'Phát sự kiện booking, thanh toán, cập nhật doanh thu'],
    ['Behavioral', 'Strategy', 'Chọn chính sách giảm giá VIP, khách mới, Flash Sale'],
  ].map((row) => new TableRow({ children: row.map((t) => new TableCell({ children: [new Paragraph(t)] })) })),
]});

const doc = new Document({ creator: 'Aurora Nest - HTT19', title: 'Design Pattern trong Aurora Nest', description: 'Báo cáo lý thuyết và thực hành Design Pattern', styles: { paragraphStyles: [{ id: 'Code', name: 'Code', basedOn: 'Normal', run: { font: 'Consolas', size: 18, color: '334155' }, paragraph: { shading: { fill: 'F1F5F9' }, spacing: { before: 100, after: 100 } } }] }, sections: [{ properties: {}, children: [] }] });
const children = [
  new Paragraph({ text: 'AURORA NEST', heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
  new Paragraph({ text: 'Design Pattern trong hệ thống quản lý khách sạn và Homestay', alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
  new Paragraph({ text: 'Nhóm HTT19  |  Phát triển ứng dụng hướng đối tượng', alignment: AlignmentType.CENTER }),
  heading('1. Giới thiệu đề tài'),
  new Paragraph('Aurora Nest là hệ thống quản lý khách sạn và homestay, hỗ trợ quản lý phòng, đặt phòng, check-in, check-out, thanh toán, tiền cọc và báo cáo doanh thu. Báo cáo này trình bày cách dùng Design Pattern để kiến trúc dễ mở rộng và bảo trì.'),
  heading('2. Khái niệm Design Pattern và lý do sử dụng'),
  bullet('Design Pattern là giải pháp thiết kế tổng quát, đã được kiểm chứng cho các vấn đề lặp lại trong phát triển phần mềm.'),
  bullet('Pattern không phải thư viện hay đoạn code sao chép; đó là cách tổ chức lớp, đối tượng và quan hệ giữa chúng.'),
  bullet('Lợi ích: giảm coupling, tăng tái sử dụng, dễ kiểm thử, dễ thay thế công nghệ và mở rộng nghiệp vụ.'),
  heading('3. Các pattern áp dụng'), table,
  heading('4. Singleton Pattern – AppConfigManager'),
  new Paragraph('AppConfigManager đảm bảo toàn hệ thống dùng một đối tượng cấu hình duy nhất. Trong Aurora Nest, cấu hình gồm tên ứng dụng, thông tin database và đơn vị tiền tệ.'),
  code("config_1 = AppConfigManager()\nconfig_2 = AppConfigManager()\nassert config_1 is config_2"),
  heading('5. Factory Pattern – Cổng thanh toán'),
  new Paragraph('Client chỉ yêu cầu loại thanh toán. PaymentFactory chịu trách nhiệm khởi tạo VNPay, MoMo hoặc CreditCard, giúp nghiệp vụ checkout không phụ thuộc class cụ thể.'),
  code("gateway = PaymentFactory.create_payment('momo')\ngateway.pay(amount)"),
  heading('6. Strategy Pattern – Giảm giá'),
  new Paragraph('DiscountCalculator nhận một strategy và có thể thay đổi chiến lược tại runtime. Aurora Nest có VipDiscount 20%, NewCustomerDiscount 10% và FlashSaleDiscount 30%.'),
  code("calculator = DiscountCalculator(VipDiscount())\nfinal_amount = calculator.checkout(5_000_000)"),
  heading('7. Adapter, Repository và Observer'),
  bullet('Adapter chuyển đổi response khác nhau của VNPay/MoMo/CreditCard thành PaymentResult thống nhất.'),
  bullet('Repository cung cấp giao diện find_available_rooms, save_booking; service không phụ thuộc SQL hay bộ nhớ.'),
  bullet('Observer cho phép các subscriber nhận sự kiện BookingCreated, PaymentCompleted để cập nhật thông báo và doanh thu.'),
  heading('8. IoC Container / DI Container'),
  new Paragraph('IoC đảo ngược quyền kiểm soát việc tạo dependency. DI Container đăng ký và resolve AppConfigManager, InMemoryRoomRepository, BookingService và CheckoutService.'),
  code("container.register_singleton(AppConfigManager, AppConfigManager)\ncontainer.register_singleton(InMemoryRoomRepository, InMemoryRoomRepository)\nconfig = container.resolve(AppConfigManager)"),
  heading('9. Thực hành – Use Case'),
  bullet('Sơ đồ tổng quát: Quản trị viên quản lý phòng, khách hàng, dịch vụ và báo cáo; lễ tân xử lý đặt phòng, check-in, check-out; khách hàng đặt phòng và thanh toán; cổng thanh toán xử lý giao dịch.'),
  bullet('Use case Check-in: tìm đặt phòng → xác minh khách → kiểm tra phòng trống → cập nhật occupied → tạo phiếu nhận phòng.'),
  bullet('Use case Check-out: tính tiền phòng và dịch vụ → áp dụng Strategy → tạo hóa đơn → thanh toán → ghi nhận doanh thu.'),
  new Paragraph('Nguồn sơ đồ: diagrams/use-case.puml và diagrams/use-case-details.puml'),
  heading('10. Demo kết quả'),
  bullet('Phòng 101 chuyển từ available sang occupied khi check-in.'),
  bullet('Tổng tiền 5.000.000 VND, khách VIP giảm 20%, còn 4.000.000 VND.'),
  bullet('PaymentFactory tạo gateway MoMo và CheckoutService xử lý thanh toán.'),
  heading('11. Kết luận'),
  new Paragraph('Aurora Nest sử dụng Singleton, Factory, Adapter, Repository, Observer, Strategy và DI Container để tách biệt trách nhiệm, giảm phụ thuộc và sẵn sàng mở rộng. Các module Python trong thư mục python/ minh họa trực tiếp các pattern đã trình bày.'),
];

doc.addSection({ properties: {}, children });
Packer.toBuffer(doc).then((buffer) => { fs.mkdirSync('/vercel/share/v0-project/aurora-nest/docs', { recursive: true }); fs.writeFileSync(out, buffer); console.log(out); });
       
