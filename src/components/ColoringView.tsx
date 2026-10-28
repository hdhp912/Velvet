import React, { useState } from 'react';
import { COLORING_DATA } from '../data/coloringData';
import { ColoringPage, ColoringCategory } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Palette, 
  Printer, 
  Download, 
  Crown, 
  Sparkles, 
  Eye, 
  Filter, 
  CheckCircle2, 
  Heart,
  Baby
} from 'lucide-react';

interface ColoringViewProps {
  onOpenCanvas: (coloringId: string) => void;
  onNavigateToMembership: () => void;
}

export const ColoringView: React.FC<ColoringViewProps> = ({
  onOpenCanvas,
  onNavigateToMembership
}) => {
  const { user, isPremium, toggleFavoriteColoring } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [printablePage, setPrintablePage] = useState<ColoringPage | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả chủ đề' },
    { id: 'animals', label: 'Động vật dễ thương' },
    { id: 'vehicles', label: 'Xe cộ & Tàu thuyền' },
    { id: 'nature', label: 'Thiên nhiên & Gia đình' },
    { id: 'alphabet_numbers', label: 'Chữ cái & Số đếm' },
  ];

  const filteredPages = COLORING_DATA.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleDownloadSVG = (page: ColoringPage) => {
    const blob = new Blob([page.svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CungConMoiNgay-${page.id}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = (page: ColoringPage) => {
    setPrintablePage(page);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Printable Sheet (Shown only when printing) */}
      {printablePage && (
        <div className="hidden print:block fixed inset-0 bg-white p-8 z-50">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-black">
              Cùng Con Mỗi Ngày - {printablePage.title}
            </h1>
            <p className="text-sm text-neutral-600">
              Khuyến nghị: {printablePage.ageRecommendation} · www.cungconmoingay.vn
            </p>
          </div>
          <div 
            className="w-full max-w-[650px] mx-auto aspect-square border-2 border-black p-4 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: printablePage.svgData }}
          />
          <div className="mt-8 text-center text-xs text-neutral-500">
            Họ tên bé: .................................................... Ngày tô: ..... / ..... / 202...
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black">
          <Palette className="w-4 h-4" />
          <span>Học liệu vẽ & Tô màu chuẩn A4</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
          Thư Viện Tranh Tô Màu Cho Trẻ 2-6 Tuổi
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
          Nét vẽ to, rõ ràng, giàu tính giáo dục. Ba mẹ có thể cho con tô trực tuyến trên điện thoại/máy tính bảng hoặc in ra giấy A4 sạch đẹp.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap no-print">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
              selectedCategory === c.id
                ? 'bg-amber-500 text-neutral-950 shadow-xs scale-105'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Coloring Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
        {filteredPages.map((page) => {
          const isSaved = user?.savedColoringPages?.includes(page.id);
          const isLocked = page.isPremium && !isPremium;

          return (
            <div
              key={page.id}
              className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual SVG Card Preview */}
                <div className="relative aspect-square bg-neutral-50 border-b border-neutral-100 p-6 flex items-center justify-center overflow-hidden">
                  <div
                    className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                    dangerouslySetInnerHTML={{ __html: page.svgData }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-bold">
                      {page.ageRecommendation}
                    </span>
                    {page.isPremium ? (
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-neutral-950 text-[11px] font-black flex items-center gap-1 shadow-xs">
                        <Crown className="w-3 h-3 fill-neutral-950" />
                        <span>VIP</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                        Miễn phí
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleFavoriteColoring(page.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-neutral-500 hover:text-rose-500 shadow-xs transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Description */}
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                    {page.categoryName}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-neutral-900 leading-snug">
                    {page.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {page.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenCanvas(page.id)}
                  className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-black transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Bé tô online</span>
                </button>

                <button
                  onClick={() => handlePrint(page)}
                  className="py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In ra giấy A4</span>
                </button>

                <button
                  onClick={() => handleDownloadSVG(page)}
                  className="col-span-2 py-1.5 text-center text-xs font-semibold text-neutral-400 hover:text-neutral-700 flex items-center justify-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Tải file nét vector (.SVG)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
