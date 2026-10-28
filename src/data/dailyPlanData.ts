import { DailyPlaySchedule, MembershipPlan } from '../types';

export const WEEKLY_PLAY_SCHEDULE: DailyPlaySchedule[] = [
  {
    dayOfWeek: 'Thứ Hai',
    dayNumber: 1,
    theme: 'Khởi đầu tuần mới với Vận động tinh',
    focusActivityId: 'act-01',
    quickMorningTip: 'Cho con uống 1 cốc nước ấm và khen ngợi nụ cười rạng rỡ của con khi thức dậy.',
    bedtimeAffirmation: 'Ôm con và nói: "Hôm nay con đã rất kiên nhẫn khi chơi kẹp áo cùng mẹ đấy!".'
  },
  {
    dayOfWeek: 'Thứ Ba',
    dayNumber: 2,
    theme: 'Giải phóng năng lượng cùng Vận động thô',
    focusActivityId: 'act-02',
    quickMorningTip: 'Cùng con vươn vai hít thở sâu như chú hươu cao cổ đón ánh ban mai.',
    bedtimeAffirmation: 'Nói với con: "Con của mẹ rất dũng cảm và bước đi rất vững vàng!".'
  },
  {
    dayOfWeek: 'Thứ Tư',
    dayNumber: 3,
    theme: 'Khám phá thế giới qua Giác quan & Khoa học',
    focusActivityId: 'act-03',
    quickMorningTip: 'Để con cùng nhặt rau hoặc sờ các loại củ quả khi mẹ chuẩn bị bữa ăn.',
    bedtimeAffirmation: 'Thì thầm: "Mẹ thích cách đôi mắt con sáng lấp lánh khi tò mò về thế giới xung quanh".'
  },
  {
    dayOfWeek: 'Thứ Năm',
    dayNumber: 4,
    theme: 'Lắng nghe và thấu hiểu Cảm xúc của con',
    focusActivityId: 'act-04',
    quickMorningTip: 'Hỏi con: "Thời tiết trong lòng con sáng nay đang có nắng ấm hay có mây mưa?".',
    bedtimeAffirmation: 'Xoa lưng con: "Dù con vui hay buồn, ba mẹ vẫn luôn ở đây yêu thương con vô điều kiện".'
  },
  {
    dayOfWeek: 'Thứ Sáu',
    dayNumber: 5,
    theme: 'Mở rộng thế giới Ngôn ngữ & Kể chuyện',
    focusActivityId: 'act-05',
    quickMorningTip: 'Đố con một câu đố vui đơn giản trên đường đến trường mầm non.',
    bedtimeAffirmation: 'Đọc cho con một câu chuyện tranh ngắn trước khi ngủ và chúc con mơ giấc mơ thật đẹp.'
  },
  {
    dayOfWeek: 'Thứ Bảy',
    dayNumber: 6,
    theme: 'Toán học thực tế & Tư duy logic vui nhộn',
    focusActivityId: 'act-06',
    quickMorningTip: 'Cùng con đếm số bậc cầu thang khi đi xuống nhà ăn sáng.',
    bedtimeAffirmation: 'Khen ngợi: "Hôm nay con đã biết chia sẻ đồ chơi cho bạn rất công bằng và đáng yêu!".'
  },
  {
    dayOfWeek: 'Chủ Nhật',
    dayNumber: 7,
    theme: 'Gắn kết gia đình & Thử thách sáng tạo',
    focusActivityId: 'act-07',
    quickMorningTip: 'Cả nhà cùng nhau ra công viên đi dạo hoặc làm một bữa sáng ấm cúng.',
    bedtimeAffirmation: 'Cùng con điểm lại 3 điều hạnh phúc nhất trong tuần qua mà gia đình đã có cùng nhau.'
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'free',
    name: 'Gói Miễn Phí',
    price: 0,
    priceFormatted: '0đ',
    durationDays: 365,
    durationLabel: 'Trải nghiệm cơ bản',
    badge: 'Mặc định',
    features: [
      'Truy cập các hoạt động cơ bản miễn phí',
      'Kho tranh tô màu cơ bản có thể in ấn',
      'Gợi ý hoạt động mỗi ngày trong tuần',
      'Lưu danh sách hoạt động yêu thích'
    ]
  },
  {
    id: 'monthly',
    name: 'Gói Tháng Linh Hoạt',
    price: 29000,
    priceFormatted: '29.000đ',
    durationDays: 30,
    durationLabel: '/ 30 ngày',
    badge: 'Phổ biến',
    popular: true,
    features: [
      'Mở khóa toàn bộ 100+ hoạt động chuyên sâu 2-6 tuổi',
      'Đầy đủ 6 lĩnh vực: Vận động, Ngôn ngữ, Toán, EQ...',
      'Toàn bộ thư viện tranh tô màu & học liệu in ấn độ phân giải cao',
      'Kế hoạch chơi theo tuần chi tiết cho ba mẹ bận rộn',
      'Hỗ trợ hỏi đáp cùng chuyên gia giáo dục mầm non',
      'Kích hoạt ngay trong 5-15 phút'
    ]
  },
  {
    id: 'annual',
    name: 'Gói Năm Tiết Kiệm',
    price: 249000,
    priceFormatted: '249.000đ',
    durationDays: 365,
    durationLabel: '/ 365 ngày (Chỉ ~20k/tháng)',
    badge: 'Tiết kiệm nhất',
    features: [
      'Toàn bộ quyền lợi của Gói Tháng',
      'Tiết kiệm hơn 30% so với gia hạn hàng tháng',
      'Tặng kèm Bộ Ebook "365 Ngày Đồng Hành Cùng Con Khôn Lớn"',
      'Cập nhật hoạt động mới hàng tuần không giới hạn trong 1 năm',
      'Được ưu tiên hỗ trợ 24/7'
    ]
  }
];

export const BANK_CONFIG = {
  bankName: 'Ngân hàng Quân Đội (MB Bank)',
  bankCode: 'MB',
  accountNumber: '0987654321',
  accountHolder: 'CUNG CON MOI NGAY',
  branch: 'Chi nhánh Hà Nội',
  supportHotline: '0901.234.567',
  supportEmail: 'hotro@cungconmoingay.vn'
};
