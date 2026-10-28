import React, { useState, useMemo } from 'react';
import { ACTIVITIES_DATA } from '../data/activitiesData';
import { Activity, AgeGroup, ActivityCategory } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Filter, 
  Baby, 
  Clock, 
  Heart, 
  Crown, 
  CheckCircle2, 
  HandMetal, 
  Activity as ActivityIcon, 
  MessageCircle, 
  FlaskConical, 
  Binary, 
  Smile,
  X
} from 'lucide-react';

interface ActivitiesViewProps {
  initialAge?: string;
  initialCategory?: string;
  onSelectActivity: (activityId: string) => void;
  onNavigateToMembership: () => void;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({
  initialAge,
  initialCategory,
  onSelectActivity,
  onNavigateToMembership
}) => {
  const { user, isPremium, toggleFavoriteActivity } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAge, setSelectedAge] = useState<string>(initialAge || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [tierFilter, setTierFilter] = useState<'all' | 'free' | 'premium'>('all');

  const ageGroups: { id: string; label: string }[] = [
    { id: 'all', label: 'Tất cả độ tuổi' },
    { id: '2-3', label: '2-3 tuổi' },
    { id: '3-4', label: '3-4 tuổi' },
    { id: '4-5', label: '4-5 tuổi' },
    { id: '5-6', label: '5-6 tuổi' },
  ];

  const categories: { id: string; label: string; icon: any }[] = [
    { id: 'all', label: 'Tất cả lĩnh vực', icon: Filter },
    { id: 'fine_motor', label: 'Vận động tinh', icon: HandMetal },
    { id: 'gross_motor', label: 'Vận động thô', icon: ActivityIcon },
    { id: 'language', label: 'Ngôn ngữ', icon: MessageCircle },
    { id: 'sensory_science', label: 'Giác quan & Khoa học', icon: FlaskConical },
    { id: 'math_logic', label: 'Toán & Tư duy logic', icon: Binary },
    { id: 'social_emotional', label: 'Cảm xúc & Xã hội', icon: Smile },
  ];

  const filteredActivities = useMemo(() => {
    return ACTIVITIES_DATA.filter((act) => {
      // Age filter
      if (selectedAge !== 'all' && act.ageGroup !== selectedAge) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && act.category !== selectedCategory) {
        return false;
      }
      // Tier filter
      if (tierFilter === 'free' && act.isPremium) return false;
      if (tierFilter === 'premium' && !act.isPremium) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = act.title.toLowerCase().includes(query);
        const matchSummary = act.summary.toLowerCase().includes(query);
        const matchMaterials = act.materials.some(m => m.toLowerCase().includes(query));
        const matchTags = act.tags.some(t => t.toLowerCase().includes(query));
        return matchTitle || matchSummary || matchMaterials || matchTags;
      }

      return true;
    });
  }, [selectedAge, selectedCategory, tierFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
          Kho Hoạt Động Cùng Con Tại Nhà
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
          Được thiết kế theo phương pháp khoa học mầm non, dễ chuẩn bị nguyên liệu và an toàn tuyệt đối cho bé.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên trò chơi, nguyên liệu (băng dính, kẹp áo, bột mì...)"
            className="w-full pl-12 pr-10 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-neutral-900 font-medium transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Age Groups Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Baby className="w-3.5 h-3.5" />
            Độ tuổi:
          </span>
          {ageGroups.map((age) => (
            <button
              key={age.id}
              onClick={() => setSelectedAge(age.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition-all ${
                selectedAge === age.id
                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              {age.label}
            </button>
          ))}
        </div>

        {/* Category Domains Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
            Lĩnh vực:
          </span>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Free / Premium Tier filter */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-400">Phân loại:</span>
            <button
              onClick={() => setTierFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold ${
                tierFilter === 'all' ? 'bg-neutral-800 text-white' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              Tất cả ({ACTIVITIES_DATA.length})
            </button>
            <button
              onClick={() => setTierFilter('free')}
              className={`px-2.5 py-1 rounded-lg font-bold ${
                tierFilter === 'free' ? 'bg-emerald-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              Miễn phí (0đ)
            </button>
            <button
              onClick={() => setTierFilter('premium')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 ${
                tierFilter === 'premium' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Crown className="w-3 h-3 fill-amber-500" />
              <span>Gói Hội Viên VIP</span>
            </button>
          </div>

          <div className="text-neutral-500 font-semibold">
            Tìm thấy {filteredActivities.length} hoạt động
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto text-amber-600">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-extrabold text-neutral-900">Không tìm thấy hoạt động phù hợp</h3>
          <p className="text-sm text-neutral-500 max-w-md mx-auto">
            Ba mẹ thử thay đổi từ khóa tìm kiếm hoặc bấm vào nút bên dưới để xem toàn bộ danh mục hoạt động nhé.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedAge('all');
              setSelectedCategory('all');
              setTierFilter('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-sm"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => {
            const isSaved = user?.savedActivities?.includes(act.id);
            const isCompleted = user?.completedActivities?.includes(act.id);
            return (
              <div
                key={act.id}
                onClick={() => onSelectActivity(act.id)}
                className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col group cursor-pointer"
              >
                {/* Cover Image & Badges */}
                <div className="relative aspect-16/10 bg-amber-50 overflow-hidden">
                  <img
                    src={act.coverImage}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-xl bg-neutral-900/85 backdrop-blur-xs text-white text-xs font-black">
                      {act.ageLabel}
                    </span>
                    {act.isPremium ? (
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-neutral-950 text-xs font-black flex items-center gap-1 shadow-xs">
                        <Crown className="w-3.5 h-3.5 fill-neutral-950" />
                        <span>VIP</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs">
                        Miễn phí
                      </span>
                    )}
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteActivity(act.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-neutral-600 hover:text-rose-500 shadow-xs transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Completed Ribbon */}
                  {isCompleted && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-emerald-500 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Đã chơi cùng con</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider block mb-1">
                      {act.categoryName}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-neutral-900 group-hover:text-amber-800 transition-colors leading-snug mb-2">
                      {act.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {act.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{act.durationMinutes} phút</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-bold">
                      {act.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
