import { Activity } from '../types';

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'act-01',
    title: 'Thử Thách Phân Loại Màu Sắc Cùng Kẹp Áo & Bát Nhựa',
    summary: 'Trò chơi rèn luyện sức mạnh ngón tay cái và ngón trỏ, chuẩn bị cho kỹ năng cầm bút sau này.',
    ageGroup: '2-3',
    ageLabel: '2-3 tuổi',
    category: 'fine_motor',
    categoryName: 'Vận động tinh',
    durationMinutes: 15,
    difficulty: 'Dễ làm',
    isPremium: false,
    coverImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    materials: [
      '4 bát nhựa hoặc cốc giấy tô màu khác nhau (Đỏ, Vàng, Xanh lá, Xanh dương)',
      '12-16 chiếc kẹp quần áo bằng nhựa nhiều màu tương ứng',
      '1 chiếc khay nhỏ để đựng kẹp'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bày biện nguyên liệu',
        instruction: 'Đặt 4 chiếc bát nhiều màu trước mặt con. Để khay kẹp quần áo ở giữa trong tầm tay với của bé.'
      },
      {
        stepNumber: 2,
        title: 'Ba mẹ làm mẫu chậm rãi',
        instruction: 'Ba mẹ cầm một chiếc kẹp màu đỏ, dùng hai ngón tay bóp nhẹ để kẹp mở ra, sau đó kẹp vào vành bát màu đỏ và nói to: "Màu đỏ về nhà màu đỏ nào!".'
      },
      {
        stepNumber: 3,
        title: 'Khích lệ con tự thử sức',
        instruction: 'Đưa kẹp cho bé thử bóp mở. Với trẻ 2 tuổi, lực ngón tay còn yếu, ba mẹ có thể hỗ trợ cầm tay con bấm vài lần đầu.'
      },
      {
        stepNumber: 4,
        title: 'Mở rộng trò chơi',
        instruction: 'Đếm số lượng kẹp trên từng vành bát cùng con khi hoàn thành.'
      }
    ],
    parentTips: [
      'Đừng vội vã sửa ngay khi con kẹp nhầm màu, hãy nhẹ nhàng hỏi: "Chiếc kẹp này có màu giống bạn bát này chưa nhỉ?" để con tự quan sát.',
      'Khen ngợi nỗ lực ngón tay của con thay vì chỉ khen kết quả: "Mẹ thấy ngón tay con bóp rất khỏe và khéo léo đấy!".'
    ],
    safetyWarnings: [
      'CHÚ Ý: Sử dụng kẹp nhựa to, không dùng kẹp gỗ có lò xo sắt quá cứng hoặc kẹp có chi tiết nhỏ dễ vỡ bung lò xo.',
      'Luôn có người lớn quan sát để tránh bé đưa kẹp vào miệng ngậm.'
    ],
    milestones: [
      'Phát triển lực cơ ngón trỏ và ngón cái (Pincer Grasp).',
      'Khả năng nhận biết và phân loại 4 màu sắc cơ bản.',
      'Rèn luyện tính kiên nhẫn và tập trung trong 10-15 phút.'
    ],
    tags: ['Màu sắc', 'Kẹp áo', 'Ngón tay khéo', 'Ở nhà'],
    isFeatured: true
  },
  {
    id: 'act-02',
    title: 'Đường Băng Dính Vải Kỳ Thú & Thử Thách Cân Bằng',
    summary: 'Vận động toàn thân giúp trẻ làm chủ trọng tâm cơ thể, tăng cường phản xạ thăng bằng và định hướng không gian.',
    ageGroup: '2-3',
    ageLabel: '2-3 tuổi',
    category: 'gross_motor',
    categoryName: 'Vận động thô',
    durationMinutes: 20,
    difficulty: 'Dễ làm',
    isPremium: false,
    coverImage: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    materials: [
      '1 cuộn băng dính giấy màu nổi bật (dễ bóc không làm hỏng sàn nhà)',
      'Một vài con thú bông hoặc đồ chơi nhỏ yêu thích của bé',
      'Một chiếc rổ nhỏ ở cuối vạch đích'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tạo đường đi trên sàn',
        instruction: 'Dán băng dính lên sàn tạo thành 1 đường thẳng (dài 2m), 1 đường zíc-zắc và 1 đường lượn sóng.'
      },
      {
        stepNumber: 2,
        title: 'Đặt nhiệm vụ giải cứu',
        instruction: 'Để thú bông ở đầu đường và chiếc rổ ở cuối đường: "Các bạn thú bông bị lạc rồi, bạn nhỏ hãy ôm bạn đi đúng trên vạch đường để đưa bạn về chuồng nhé!".'
      },
      {
        stepNumber: 3,
        title: 'Các kiểu di chuyển đa dạng',
        instruction: 'Lần 1: Đi bộ thẳng chân trên vạch. Lần 2: Nhảy lò cò hoặc đi nhón gót. Lần 3: Giả làm chú gấu bò 4 chân dọc theo đường băng dính.'
      }
    ],
    parentTips: [
      'Bật một bài nhạc vui nhộn thiếu nhi để nhịp điệu thêm hứng khởi.',
      'Cùng thi với con để tạo bầu không khí gia đình hào hứng và kết nối.'
    ],
    safetyWarnings: [
      'Dọn dẹp các đồ vật sắc nhọn, cạnh bàn ghế xung quanh khu vực sàn chơi.',
      'Cho bé đi chân trần hoặc đi tất có hạt cao su chống trượt để không bị té ngã.'
    ],
    milestones: [
      'Cải thiện khả năng giữ thăng bằng động và tĩnh.',
      'Phát triển cơ bắp chân, đầu gối và sự phối hợp giữa mắt và chân.',
      'Hiểu và làm theo các chỉ dẫn vận động có điều kiện.'
    ],
    tags: ['Vận động tại nhà', 'Thăng bằng', 'Năng lượng tích cực'],
    isFeatured: true
  },
  {
    id: 'act-03',
    title: 'Thí Nghiệm Núi Lửa Sủi Bọt Cầu Vồng Thần Kỳ',
    summary: 'Khám phá phản ứng hóa học thú vị và an toàn từ giấm ăn và baking soda, kích thích sự tò mò khoa học.',
    ageGroup: '3-4',
    ageLabel: '3-4 tuổi',
    category: 'sensory_science',
    categoryName: 'Giác quan & Khoa học',
    durationMinutes: 20,
    difficulty: 'Vừa sức',
    isPremium: false,
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    materials: [
      '1 khay nhựa sâu lòng hoặc chậu nhỏ',
      '3-4 chiếc cốc thủy tinh thấp hoặc cốc nhựa trong',
      'Bột baking soda (muối nở làm bánh)',
      'Giấm ăn trắng thông thường',
      'Phẩm màu thực phẩm (Đỏ, Vàng, Xanh)',
      'Thìa nhỏ và ống nhỏ giọt (hoặc ống hút nhựa)'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Chuẩn bị miệng núi lửa',
        instruction: 'Cho vào mỗi cốc 2 thìa đầy baking soda và nhỏ 3-4 giọt màu thực phẩm khác nhau vào đáy cốc.'
      },
      {
        stepNumber: 2,
        title: 'Tạo sự tò mò',
        instruction: 'Hỏi con: "Con nhìn xem trong cốc có gì? Khi mẹ nhỏ thứ nước chua này vào, con đoán xem điều kỳ diệu gì sẽ xảy ra?".'
      },
      {
        stepNumber: 3,
        title: 'Khoảnh khắc sủi bọt phun trào',
        instruction: 'Đưa ống nhỏ giọt chứa giấm cho con tự bóp vào cốc bột. Bọt khí CO2 sẽ xèo xèo trào dâng rực rỡ sắc màu!'
      },
      {
        stepNumber: 4,
        title: 'Chạm và cảm nhận',
        instruction: 'Cho con đưa tay sờ vào bọt xà phòng sủi mát (hoàn toàn lành tính) để cảm nhận tiếng xèo xèo và nhiệt độ mát nhẹ.'
      }
    ],
    parentTips: [
      'Giải thích đơn giản: "Bột trắng và giấm gặp nhau rất vui vẻ nên đã cùng thổi những quả bóng tí hon tạo thành bọt đấy con ạ!".',
      'Khuyến khích bé dùng từ miêu tả: "Xèo xèo", "Ấm hay mát?", "Màu gì đang trào lên thế con?".'
    ],
    safetyWarnings: [
      'CẢNH BÁO: Giấm ăn có mùi chua nồng và có thể làm cay mắt nếu bị văng vào mắt. Hướng dẫn con không đưa tay lên dụi mắt khi chơi.',
      'Tuyệt đối không uống hỗn hợp này.'
    ],
    milestones: [
      'Khơi gợi niềm đam mê khám phá hiện tượng nguyên nhân - kết quả.',
      'Kích thích đa giác quan: Thính giác (tiếng xèo xèo), Thị giác (màu sắc trào dâng), Xúc giác (sờ bọt khí).',
      'Rèn kỹ năng vận động tinh khi dùng ống bóp nhỏ giọt.'
    ],
    tags: ['Khoa học vui', 'Núi lửa', 'Baking soda', 'Kỳ diệu'],
    isFeatured: true
  },
  {
    id: 'act-04',
    title: 'Bản Đồ Cảm Xúc & Kể Chuyện Chiếc Gương Biểu Cảm',
    summary: 'Giúp trẻ 3-4 tuổi nhận diện và gọi tên các cảm xúc cơ bản: Vui vẻ, Buồn bã, Tức giận, Ngạc nhiên và Bình yên.',
    ageGroup: '3-4',
    ageLabel: '3-4 tuổi',
    category: 'social_emotional',
    categoryName: 'Cảm xúc & Kỹ năng xã hội',
    durationMinutes: 15,
    difficulty: 'Dễ làm',
    isPremium: false,
    coverImage: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80',
    materials: [
      '1 chiếc gương soi cầm tay nhỏ hoặc gương bàn',
      'Tờ giấy A4 vẽ sẵn 4 vòng tròn khuôn mặt trống (chưa có mắt miệng)',
      'Bút dạ màu để ba mẹ cùng con vẽ'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Soi gương làm mặt hề',
        instruction: 'Hai mẹ con cùng ngồi trước gương, thử làm các khuôn mặt cười toét miệng, nhăn nhó, há hốc mồm ngạc nhiên.'
      },
      {
        stepNumber: 2,
        title: 'Gọi tên cảm xúc',
        instruction: 'Hỏi con: "Khi con được mẹ ôm, mặt con sẽ thế nào?". Chỉ vào gương và giải thích: "Mắt cong cong, miệng cười tươi, đó là cảm xúc Vui Vẻ!".'
      },
      {
        stepNumber: 3,
        title: 'Vẽ biểu cảm lên giấy',
        instruction: 'Cùng con vẽ các đường nét đơn giản: miệng cong lên là Vui, miệng chúc xuống là Buồn, chân mày cau lại là Tức Giận.'
      },
      {
        stepNumber: 4,
        title: 'Cách xử lý khi tức giận',
        instruction: 'Tập cùng con "hít thở bong bóng": Hít vào sâu căng bụng rồi thở nhẹ nhàng ra để cơn giận bay mất.'
      }
    ],
    parentTips: [
      'Trẻ 3 tuổi thường xuyên bộc phát ăn vạ do chưa biết diễn đạt bằng lời. Trò chơi này cung cấp "từ vựng cảm xúc" giúp con giải tỏa bế tắc.',
      'Tuyệt đối không phán xét cảm xúc tiêu cực: "Tức giận là bình thường con nhé, nhưng chúng mình không ném đồ chơi mà sẽ hít thở cùng mẹ".'
    ],
    safetyWarnings: [
      'Sử dụng gương nhựa an toàn hoặc gương có khung chắc chắn, tránh để trẻ đập vỡ gương kính.'
    ],
    milestones: [
      'Trẻ nhận biết và gọi tên được ít nhất 4 trạng thái cảm xúc.',
      'Học kỹ năng điều hòa cảm xúc ban đầu (hít thở sâu).',
      'Xây dựng sợi dây gắn kết thấu hiểu sâu sắc giữa cha mẹ và con cái.'
    ],
    tags: ['Trí tuệ cảm xúc EQ', 'Gương soi', 'Bình an', 'Gắn kết']
  },
  {
    id: 'act-05',
    title: 'Truy Tìm Báu Vật Chữ Cái & Âm Thanh Xung Quanh Nhà',
    summary: 'Phương pháp tiếp cận ngữ âm tự nhiên (Phonics) giúp trẻ 4-5 tuổi làm quen với mặt chữ và phát âm chuẩn.',
    ageGroup: '4-5',
    ageLabel: '4-5 tuổi',
    category: 'language',
    categoryName: 'Ngôn ngữ & Giao tiếp',
    durationMinutes: 20,
    difficulty: 'Vừa sức',
    isPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    materials: [
      'Các mẩu giấy nhớ viết các chữ cái to rõ ràng (ví dụ: A, B, C, M, B, N...)',
      'Một chiếc túi vải hoặc ba lô nhỏ mang tên "Túi Thám Tử"'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Giới thiệu mật mã hôm nay',
        instruction: 'Hôm nay chúng ta sẽ truy tìm chữ "B" (Âm "Bờ"). Cho con xem thẻ chữ B và cùng phát âm: "B - Bờ - Bạn Búp Bê, Quả Bóng".'
      },
      {
        stepNumber: 2,
        title: 'Hành trình thám tử nhí',
        instruction: 'Đặt đồng hồ 3 phút: "Thám tử hãy tìm trong phòng khách 3 món đồ bắt đầu bằng âm Bờ để cho vào túi nào!".'
      },
      {
        stepNumber: 3,
        title: 'Kiểm tra chiến lợi phẩm',
        instruction: 'Hai ba con cùng mở túi ra: Bát, Bút, Búp bê... và dán thẻ chữ cái lên đồ vật đó.'
      }
    ],
    parentTips: [
      'Nhấn mạnh vào âm thanh đầu của từ (Âm vị học) thay vì chỉ đọc vẹt tên chữ cái.',
      'Khuyến khích con tự tin nói thành câu hoàn chỉnh: "Con tìm thấy một chiếc Bát màu xanh!".'
    ],
    safetyWarnings: [
      'Nhắc nhở bé không chạy nhảy trèo cao lấy đồ vật nguy hiểm ở trên nóc tủ hoặc bếp.'
    ],
    milestones: [
      'Khả năng liên kết giữa biểu tượng ký tự và âm thanh ngôn ngữ nói.',
      'Mở rộng vốn từ vựng miêu tả đồ vật gia đình.',
      'Rèn luyện kỹ năng quan sát chi tiết.'
    ],
    tags: ['Học chữ cái', 'Phonics', 'Thám tử nhí', 'Từ vựng'],
    isFeatured: true
  },
  {
    id: 'act-06',
    title: 'Siêu Thị Nhí: Phân Loại & Đếm Số Cùng Hạt Đậu Thần Kỳ',
    summary: 'Trò chơi đóng vai đi chợ kết hợp học toán đếm số lượng thực tế, so sánh nhiều hơn - ít hơn một cách trực quan.',
    ageGroup: '4-5',
    ageLabel: '4-5 tuổi',
    category: 'math_logic',
    categoryName: 'Toán học & Tư duy logic',
    durationMinutes: 25,
    difficulty: 'Vừa sức',
    isPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80',
    materials: [
      'Các loại quả hoặc đồ chơi củ quả (chuối, táo, cà rốt...)',
      'Một vài tờ tiền giấy đồ chơi hoặc thẻ giấy viết số 1, 2, 3, 4, 5',
      'Túi xách đi chợ và 1 chiếc hộp làm máy tính tiền'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Dựng quầy hàng siêu thị',
        instruction: 'Bày các loại quả lên bàn nhỏ. Đặt biển số lượng giá tiền bên cạnh (ví dụ: Táo giá 2 đồng, Chuối giá 3 đồng).'
      },
      {
        stepNumber: 2,
        title: 'Đóng vai mua bán',
        instruction: 'Mẹ đóng vai khách hàng: "Bác thu ngân ơi, tôi muốn mua 3 quả táo và 2 quả cam nhé!".'
      },
      {
        stepNumber: 3,
        title: 'Thực hành đếm số lượng tương ứng',
        instruction: 'Bé phải lấy đúng 3 quả táo, đếm to "1, 2, 3", sau đó nhận tiền giấy đồ chơi tương ứng.'
      },
      {
        stepNumber: 4,
        title: 'So sánh tư duy',
        instruction: 'Hỏi con: "Táo và cam, giỏ nào có số lượng nhiều hơn nhỉ con?".'
      }
    ],
    parentTips: [
      'Để con tự cầm nắm từng vật thể khi đếm, nguyên tắc 1-1 (One-to-one correspondence) giúp con hiểu bản chất số lượng chứ không chỉ đọc vẹt dãy số.'
    ],
    safetyWarnings: [
      'Nếu dùng đồ thật, tránh các loại hạt quá nhỏ có thể gây hóc.'
    ],
    milestones: [
      'Nắm vững khái niệm đếm tương ứng 1-1 từ 1 đến 10.',
      'Phát triển kỹ năng giao tiếp xã hội qua trò chơi đóng vai.',
      'Khái niệm toán học cơ bản: Thêm vào, bớt ra, nhiều hơn, ít hơn.'
    ],
    tags: ['Toán mầm non', 'Đóng vai', 'Đi siêu thị', 'Tư duy logic']
  },
  {
    id: 'act-07',
    title: 'Đường Hầm Bí Mật Bằng Thùng Carton & Thử Thách Vượt Chướng Ngại Vật',
    summary: 'Hoạt động phát triển thể chất toàn diện, vận động không gian 3 chiều và kích thích lòng can đảm.',
    ageGroup: '4-5',
    ageLabel: '4-5 tuổi',
    category: 'gross_motor',
    categoryName: 'Vận động thô',
    durationMinutes: 30,
    difficulty: 'Thử thách',
    isPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    materials: [
      '2-3 thùng bìa carton to mở 2 đầu ghép lại thành đường hầm',
      'Gối đệm sofa xếp làm chướng ngại vật',
      'Đèn pin nhỏ để con cầm khám phá trong đường hầm'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Lắp ráp công trình cùng con',
        instruction: 'Cùng bé dán băng dính liên kết các thùng carton lại với nhau tạo thành hầm trú ẩn.'
      },
      {
        stepNumber: 2,
        title: 'Chinh phục hầm tối',
        instruction: 'Đưa đèn pin cho bé: "Trong hầm có kho báu kim cương, dũng sĩ hãy trườn qua hầm và rọi đèn tìm nhé!".'
      },
      {
        stepNumber: 3,
        title: 'Vượt núi gối đệm',
        instruction: 'Sau khi ra khỏi hầm, con phải nhảy qua 3 chiếc đệm gối trên sàn để về đích an toàn.'
      }
    ],
    parentTips: [
      'Nếu bé sợ bóng tối, hãy mở nắp trên của thùng để ánh sáng lọt vào trước, sau đó mới đóng dần khi con đã quen.'
    ],
    safetyWarnings: [
      'Kiểm tra kỹ thùng carton không còn ghim bấm kim loại hay góc nhọn có thể làm xước da con.',
      'Đặt thảm êm hoặc chăn mềm dưới sàn.'
    ],
    milestones: [
      'Cải thiện sức mạnh cơ lõi (Core muscles) và khả năng phối hợp tay chân khi trườn bò.',
      'Tăng cường cảm nhận vị trí cơ thể trong không gian (Proprioception).',
      'Xây dựng sự tự tin và vượt qua nỗi sợ bóng tối.'
    ],
    tags: ['Thể chất', 'Thùng carton', 'Khám phá', 'Dũng cảm']
  },
  {
    id: 'act-08',
    title: 'Khu Vườn Bột Nặn Thực Vật & Sáng Tạo Hình Khối 3D',
    summary: 'Rèn luyện khả năng tưởng tượng không gian và sự khéo léo của các cơ bàn tay trước khi bước vào lớp 1.',
    ageGroup: '5-6',
    ageLabel: '5-6 tuổi',
    category: 'fine_motor',
    categoryName: 'Vận động tinh',
    durationMinutes: 25,
    difficulty: 'Thử thách',
    isPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    materials: [
      'Bột nặn an toàn tự làm từ bột mì (hoặc đất nặn hữu cơ không độc hại)',
      'Tăm tre cắt bỏ đầu nhọn hoặc que kem gỗ',
      'Lá cây, hoa khô nhặt ngoài vườn rụng xuống'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tạo hình khối cơ bản',
        instruction: 'Hướng dẫn con nặn các khối hình học: Hình cầu, hình trụ, hình lập phương, hình chóp nón.'
      },
      {
        stepNumber: 2,
        title: 'Tạo vân tự nhiên',
        instruction: 'Dùng lá cây thật ấn lên bề mặt đất nặn để in lại đường gân lá tuyệt đẹp.'
      },
      {
        stepNumber: 3,
        title: 'Xây dựng khu vườn 3D',
        instruction: 'Dùng que kem liên kết các khối đất nặn thành cây cầu, ngôi nhà nhỏ và cây cối tí hon.'
      }
    ],
    parentTips: [
      'Hỏi con câu chuyện đằng sau tác phẩm: "Ai đang sống trong khu vườn này thế con? Chú thỏ này đang đi đâu vậy?".'
    ],
    safetyWarnings: [
      'Đảm bảo que kem hoặc tăm gỗ đã được mài nhẵn, không có dằm dăm gỗ gây tổn thương tay bé.'
    ],
    milestones: [
      'Phát triển khả năng tư duy hình học không gian 3D.',
      'Sự tỉ mỉ, kiên nhẫn điều khiển các đầu ngón tay.',
      'Cảm thụ thẩm mỹ và tình yêu thiên nhiên.'
    ],
    tags: ['Đất nặn', 'Hình khối 3D', 'Chuẩn bị vào lớp 1', 'Sáng tạo']
  },
  {
    id: 'act-09',
    title: 'Nhà Hùng Biện Tí Hon: Phỏng Vấn Gia Đình & Kể Chuyện Bằng Tranh',
    summary: 'Phát triển năng lực thuyết trình tự tin, mạch lạc, biết lắng nghe và diễn đạt cảm nghĩ trước mọi người.',
    ageGroup: '5-6',
    ageLabel: '5-6 tuổi',
    category: 'language',
    categoryName: 'Ngôn ngữ & Giao tiếp',
    durationMinutes: 20,
    difficulty: 'Vừa sức',
    isPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=800&q=80',
    materials: [
      '1 chiếc micrô đồ chơi (hoặc cuộn giấy vệ sinh cuộn lại làm micro)',
      '3 bức tranh do con vẽ hoặc ảnh chụp kỷ niệm của gia đình',
      'Chiếc ghế sofa làm sân khấu mini'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Chuẩn bị kịch bản',
        instruction: 'Con chọn một bức ảnh kỷ niệm (ví dụ: Chuyến đi biển hè vừa rồi).'
      },
      {
        stepNumber: 2,
        title: 'Gợi ý cấu trúc kể chuyện',
        instruction: 'Mở đầu: "Xin chào cả nhà, hôm nay con xin kể về...". Diễn biến: "Lúc đó con đã thấy...". Kết thúc: "Con cảm thấy rất hạnh phúc vì...".'
      },
      {
        stepNumber: 3,
        title: 'Phần phỏng vấn ngược lại',
        instruction: 'Bé cầm micro đi phỏng vấn bố mẹ: "Hôm nay bố đi làm có điều gì vui nhất ạ?".'
      }
    ],
    parentTips: [
      'Lắng nghe con với ánh mắt tập trung hoàn toàn (Eye-contact), không cầm điện thoại khi con đang nói.',
      'Gỗ tay nồng nhiệt và khen ngợi cụ thể: "Mẹ rất thích cách con miêu tả màu xanh của nước biển!".'
    ],
    safetyWarnings: [
      'Khuyến khích nhẹ nhàng, tuyệt đối không ép buộc nếu con còn rụt rè chưa quen đứng trước đám đông.'
    ],
    milestones: [
      'Nói năng lưu loát, dùng cấu trúc câu phức (nguyên nhân - kết quả).',
      'Tự tin giao tiếp và diễn đạt ý kiến cá nhân.',
      'Thấu cảm và lắng nghe câu chuyện của người khác.'
    ],
    tags: ['Hùng biện', 'Kể chuyện', 'Tự tin', 'Ngôn ngữ']
  },
  {
    id: 'act-10',
    title: 'Cây Cầu Giấy Chịu Lực: Trở Thành Kỹ Sư Công Trình Nhí',
    summary: 'Ứng dụng tư duy STEM thông qua thử thách gấp giấy chịu lực, hiểu về cấu trúc vòm và tam giác bền vững.',
    ageGroup: '5-6',
    ageLabel: '5-6 tuổi',
    category: 'math_logic',
    categoryName: 'Toán học & Tư duy logic',
    durationMinutes: 25,
    difficulty: 'Thử thách',
    isPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    materials: [
      'Vài tờ giấy A4 thông thường (giấy đã qua sử dụng 1 mặt)',
      '2 chồng sách có độ cao bằng nhau (khoảng 10-15cm) đặt cách nhau 15cm',
      'Đồng xu hoặc đồ chơi lego nhỏ để thử tải trọng'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Thử nghiệm chiếc cầu phẳng đầu tiên',
        instruction: 'Đặt 1 tờ giấy phẳng bắc ngang 2 chồng sách. Đặt 1 con lego lên, tờ giấy sụp xuống ngay lập tức!'
      },
      {
        stepNumber: 2,
        title: 'Đặt câu hỏi kỹ thuật',
        instruction: 'Hỏi con: "Làm thế nào để tờ giấy mỏng manh này có thể gánh được 10 bạn lego mà không bị sụp?".'
      },
      {
        stepNumber: 3,
        title: 'Gấp giấy theo hình quạt dẻo (Zig-zag)',
        instruction: 'Hướng dẫn con gấp tờ giấy thành các nếp zíc zắc như chiếc quạt giấy rồi đặt bắc ngang qua 2 chồng sách.'
      },
      {
        stepNumber: 4,
        title: 'Thử tải trọng bất ngờ',
        instruction: 'Lần lượt đặt từng khối lego lên. Con sẽ vô cùng kinh ngạc khi chiếc cầu giấy zíc zắc có thể chịu được tới 15-20 khối lego!'
      }
    ],
    parentTips: [
      'Giải thích kiến thức thực tế: "Nhìn mái tôn nhà hay cầu lớn bắc qua sông con cũng sẽ thấy những thanh sắt chéo nhau giống hệt nếp gấp giấy này đấy!".'
    ],
    safetyWarnings: [
      'Cẩn thận với mép giấy sắc có thể cứa nhẹ vào da tay bé.'
    ],
    milestones: [
      'Hiểu nguyên lý cơ bản về cấu trúc chịu lực trong kiến trúc và kỹ thuật.',
      'Phát triển tư duy phản biện và giải quyết vấn đề (Trial and Error).',
      'Khơi nguồn cảm hứng với các môn khoa học kỹ thuật STEM.'
    ],
    tags: ['STEM', 'Kỹ sư nhí', 'Tư duy logic', 'Cầu giấy']
  }
];
