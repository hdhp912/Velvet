import { ColoringPage } from '../types';

export const COLORING_DATA: ColoringPage[] = [
  {
    id: 'color-01',
    title: 'Chú Cún Con Đáng Yêu Chơi Bóng',
    category: 'animals',
    categoryName: 'Thế giới động vật',
    ageRecommendation: '2-4 tuổi',
    isPremium: false,
    tags: ['Động vật', 'Cún con', 'Dễ vẽ', 'Miễn phí'],
    description: 'Nét vẽ to, rõ ràng, giúp bé 2-4 tuổi dễ dàng tô màu mà không bị lem ra ngoài.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    svgData: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="400" fill="#FFFFFF"/>
      <!-- Background Ground -->
      <path d="M 20 340 Q 200 320 380 340 L 380 390 L 20 390 Z" fill="none" stroke="#2D2A26" stroke-width="4" stroke-linecap="round"/>
      <!-- Puppy Head -->
      <circle cx="170" cy="180" r="65" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5"/>
      <!-- Puppy Left Ear -->
      <path d="M 120 150 C 90 140 70 190 100 220 C 115 200 120 170 120 150 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5" stroke-linejoin="round"/>
      <!-- Puppy Right Ear -->
      <path d="M 220 150 C 250 140 270 190 240 220 C 225 200 220 170 220 150 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5" stroke-linejoin="round"/>
      <!-- Eyes -->
      <ellipse cx="145" cy="170" rx="9" ry="12" fill="#2D2A26"/>
      <circle cx="147" cy="167" r="3" fill="#FFFFFF"/>
      <ellipse cx="195" cy="170" rx="9" ry="12" fill="#2D2A26"/>
      <circle cx="197" cy="167" r="3" fill="#FFFFFF"/>
      <!-- Snout & Nose -->
      <ellipse cx="170" cy="195" rx="20" ry="14" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <path d="M 162 190 Q 170 185 178 190 Q 170 198 162 190 Z" fill="#2D2A26"/>
      <path d="M 170 198 L 170 206 Q 160 214 150 206 M 170 206 Q 180 214 190 206" fill="none" stroke="#2D2A26" stroke-width="4" stroke-linecap="round"/>
      <!-- Puppy Body -->
      <path d="M 140 240 C 130 280 120 320 130 340 L 170 340 C 175 310 185 310 190 340 L 230 340 C 240 310 245 270 220 240 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5" stroke-linejoin="round"/>
      <!-- Tail -->
      <path d="M 230 280 Q 280 260 285 230 Q 270 240 225 270" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5" stroke-linecap="round"/>
      <!-- Ball -->
      <circle cx="310" cy="320" r="35" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5"/>
      <path d="M 285 300 Q 320 320 310 355" fill="none" stroke="#2D2A26" stroke-width="4"/>
      <path d="M 335 300 Q 300 320 310 355" fill="none" stroke="#2D2A26" stroke-width="4"/>
      <!-- Sun -->
      <circle cx="340" cy="70" r="30" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <line x1="340" y1="25" x2="340" y2="10" stroke="#2D2A26" stroke-width="4" stroke-linecap="round"/>
      <line x1="340" y1="115" x2="340" y2="130" stroke="#2D2A26" stroke-width="4" stroke-linecap="round"/>
      <line x1="295" y1="70" x2="280" y2="70" stroke="#2D2A26" stroke-width="4" stroke-linecap="round"/>
      <line x1="385" y1="70" x2="400" y2="70" stroke="#2D2A26" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'color-02',
    title: 'Khủng Long T-Rex Thân Thiện & Trái Cây Rừng',
    category: 'animals',
    categoryName: 'Thế giới động vật',
    ageRecommendation: '3-5 tuổi',
    isPremium: false,
    tags: ['Khủng long', 'Thám hiểm', 'Miễn phí'],
    description: 'Chú khủng long bạo chúa phiên bản chibi hiền hòa ăn quả táo rừng ngọt ngào.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=600&q=80',
    svgData: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="400" fill="#FFFFFF"/>
      <!-- Ground and Plants -->
      <path d="M 10 350 Q 200 330 390 350 L 390 395 L 10 395 Z" fill="none" stroke="#2D2A26" stroke-width="4"/>
      <!-- Dino Body & Tail -->
      <path d="M 160 100 C 230 100 240 160 210 180 C 230 220 230 280 210 340 L 150 340 C 130 310 110 310 100 340 L 60 340 C 50 300 60 260 90 230 C 50 250 10 220 20 180 C 50 180 80 200 110 210 C 100 160 110 100 160 100 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5" stroke-linejoin="round"/>
      <!-- Dino Spikes on Back -->
      <polygon points="120,110 130,85 140,110" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <polygon points="105,145 110,120 120,145" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <polygon points="90,185 92,160 105,185" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <polygon points="70,220 65,200 80,225" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <!-- Big Cute Eye -->
      <circle cx="180" cy="130" r="14" fill="#2D2A26"/>
      <circle cx="184" cy="126" r="4" fill="#FFFFFF"/>
      <!-- Smile with little tooth -->
      <path d="M 215 155 Q 190 170 175 160" fill="none" stroke="#2D2A26" stroke-width="4" stroke-linecap="round"/>
      <polygon points="195,164 200,172 205,163" fill="#FFFFFF" stroke="#2D2A26" stroke-width="2"/>
      <!-- Little Dino Arm holding apple -->
      <path d="M 180 210 Q 210 215 220 230 Q 200 240 175 230" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <!-- Apple -->
      <circle cx="230" cy="235" r="16" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <path d="M 230 220 C 230 210 235 205 240 205" fill="none" stroke="#2D2A26" stroke-width="3"/>
      <!-- Clouds -->
      <path d="M 280 80 Q 290 60 310 65 Q 330 50 350 70 Q 370 70 370 90 Q 350 100 290 95 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'color-03',
    title: 'Chiếc Xe Buýt Trường Học Vui Nhộn',
    category: 'vehicles',
    categoryName: 'Phương tiện giao thông',
    ageRecommendation: '3-6 tuổi',
    isPremium: true,
    tags: ['Xe buýt', 'Trường học', 'Giao thông'],
    description: 'Chuyến xe buýt chở các bạn nhỏ đến trường mẫu giáo dưới ánh mặt trời rạng rỡ.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=600&q=80',
    svgData: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="400" fill="#FFFFFF"/>
      <line x1="10" y1="330" x2="390" y2="330" stroke="#2D2A26" stroke-width="5" stroke-linecap="round"/>
      <!-- Bus Body -->
      <path d="M 50 290 L 50 160 C 50 140 70 130 100 130 L 320 130 C 350 130 365 160 365 200 L 365 290 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5" stroke-linejoin="round"/>
      <!-- Front Windshield -->
      <path d="M 310 150 L 350 170 L 350 220 L 310 220 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <!-- Side Windows -->
      <rect x="70" y="150" width="60" height="70" rx="8" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <rect x="150" y="150" width="60" height="70" rx="8" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <rect x="230" y="150" width="60" height="70" rx="8" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <!-- Smile in window 1 -->
      <circle cx="100" cy="180" r="16" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <path d="M 94 185 Q 100 192 106 185" fill="none" stroke="#2D2A26" stroke-width="3"/>
      <!-- Smile in window 2 -->
      <circle cx="180" cy="180" r="16" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <path d="M 174 185 Q 180 192 186 185" fill="none" stroke="#2D2A26" stroke-width="3"/>
      <!-- Bus Wheels -->
      <circle cx="110" cy="295" r="32" fill="#FFFFFF" stroke="#2D2A26" stroke-width="6"/>
      <circle cx="110" cy="295" r="14" fill="#2D2A26"/>
      <circle cx="295" cy="295" r="32" fill="#FFFFFF" stroke="#2D2A26" stroke-width="6"/>
      <circle cx="295" cy="295" r="14" fill="#2D2A26"/>
      <!-- Headlights and Bumper -->
      <rect x="355" y="240" width="15" height="20" rx="4" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <rect x="35" y="275" width="20" height="15" rx="3" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'color-04',
    title: 'Ngôi Nhà Nhỏ Ấm Áp Giữa Vườn Hoa Hướng Dương',
    category: 'nature',
    categoryName: 'Thiên nhiên & Đời sống',
    ageRecommendation: '3-6 tuổi',
    isPremium: true,
    tags: ['Gia đình', 'Ngôi nhà', 'Hoa lá'],
    description: 'Bức tranh gia đình ấm áp với mái ngói đỏ, ống khói nhỏ và những đóa hoa hướng dương rực rỡ.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
    svgData: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="400" fill="#FFFFFF"/>
      <!-- Ground -->
      <line x1="10" y1="340" x2="390" y2="340" stroke="#2D2A26" stroke-width="5"/>
      <!-- House Walls -->
      <rect x="90" y="200" width="180" height="140" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5"/>
      <!-- Roof -->
      <polygon points="70,205 180,105 290,205" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5" stroke-linejoin="round"/>
      <!-- Chimney -->
      <rect x="220" y="120" width="25" height="45" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <!-- Smoke -->
      <path d="M 230 110 Q 220 90 235 80 Q 220 60 235 45" fill="none" stroke="#2D2A26" stroke-width="3" stroke-linecap="round"/>
      <!-- Door -->
      <rect x="155" y="245" width="50" height="95" rx="4" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <circle cx="195" cy="295" r="4" fill="#2D2A26"/>
      <!-- Window -->
      <rect x="105" y="225" width="35" height="35" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <line x1="122" y1="225" x2="122" y2="260" stroke="#2D2A26" stroke-width="3"/>
      <line x1="105" y1="242" x2="140" y2="242" stroke="#2D2A26" stroke-width="3"/>
      <!-- Sunflowers -->
      <circle cx="330" cy="270" r="18" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <line x1="330" y1="288" x2="330" y2="340" stroke="#2D2A26" stroke-width="5"/>
      <circle cx="360" cy="290" r="14" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <line x1="360" y1="304" x2="360" y2="340" stroke="#2D2A26" stroke-width="4"/>
    </svg>`
  },
  {
    id: 'color-05',
    title: 'Phi Thuyền Khám Phá Vũ Trụ & Các Vì Sao',
    category: 'vehicles',
    categoryName: 'Phương tiện giao thông',
    ageRecommendation: '4-6 tuổi',
    isPremium: true,
    tags: ['Vũ trụ', 'Tên lửa', 'Ước mơ'],
    description: 'Kích thích trí tưởng tượng bay bổng của bé tới mặt trăng và các thiên hà xa xôi.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    svgData: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="400" fill="#FFFFFF"/>
      <!-- Rocket Body -->
      <path d="M 200 60 C 230 110 240 220 220 270 L 180 270 C 160 220 170 110 200 60 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5" stroke-linejoin="round"/>
      <!-- Rocket Nosecone -->
      <path d="M 185 105 Q 200 60 215 105 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4"/>
      <!-- Wings -->
      <path d="M 172 230 L 130 280 L 175 270 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5"/>
      <path d="M 228 230 L 270 280 L 225 270 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5"/>
      <!-- Porthole Window -->
      <circle cx="200" cy="170" r="24" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5"/>
      <circle cx="200" cy="170" r="16" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <!-- Exhaust Fire -->
      <path d="M 185 275 L 180 320 L 200 300 L 220 325 L 215 275 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="4" stroke-linejoin="round"/>
      <!-- Stars & Crescent Moon -->
      <path d="M 70 80 Q 85 95 85 120 Q 55 120 50 90 Q 60 80 70 80 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <!-- Little Stars -->
      <polygon points="310,90 315,102 328,102 318,110 322,122 310,114 298,122 302,110 292,102 305,102" fill="#FFFFFF" stroke="#2D2A26" stroke-width="2"/>
      <polygon points="90,260 93,268 102,268 95,274 98,282 90,277 82,282 85,274 78,268 87,268" fill="#FFFFFF" stroke="#2D2A26" stroke-width="2"/>
      <polygon points="320,240 323,248 332,248 325,254 328,262 320,257 312,262 315,254 308,248 317,248" fill="#FFFFFF" stroke="#2D2A26" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'color-06',
    title: 'Học Chữ Cái Vui Nhộn: Chữ A & Quả Táo Ngọt',
    category: 'alphabet_numbers',
    categoryName: 'Chữ cái & Chữ số',
    ageRecommendation: '3-6 tuổi',
    isPremium: false,
    tags: ['Chữ cái', 'Số đếm', 'Tập viết'],
    description: 'Vừa tô màu vừa ghi nhớ mặt chữ cái A in hoa và hình ảnh liên tưởng quả táo.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    svgData: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="400" fill="#FFFFFF"/>
      <!-- Giant Letter A outline -->
      <path d="M 80 340 L 140 100 L 190 100 L 250 340 L 205 340 L 185 260 L 145 260 L 125 340 Z M 153 220 L 177 220 L 165 160 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="6" stroke-linejoin="round"/>
      <!-- Apple next to it -->
      <path d="M 310 180 C 270 180 260 230 260 270 C 260 320 290 340 310 340 C 330 340 360 320 360 270 C 360 230 350 180 310 180 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="5"/>
      <path d="M 310 180 C 310 155 315 145 325 140" fill="none" stroke="#2D2A26" stroke-width="4" stroke-linecap="round"/>
      <!-- Leaf on Apple -->
      <path d="M 315 155 C 335 140 345 160 335 170 C 320 170 315 160 315 155 Z" fill="#FFFFFF" stroke="#2D2A26" stroke-width="3"/>
      <!-- Cute Face on Apple -->
      <circle cx="295" cy="250" r="5" fill="#2D2A26"/>
      <circle cx="325" cy="250" r="5" fill="#2D2A26"/>
      <path d="M 302 265 Q 310 275 318 265" fill="none" stroke="#2D2A26" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  }
];
