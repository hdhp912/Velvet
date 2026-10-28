import React, { useState } from 'react';
import { Activity } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Baby, 
  Clock, 
  Heart, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  HelpCircle, 
  Printer, 
  Crown, 
  Award, 
  CheckSquare, 
  Square,
  ArrowRight
} from 'lucide-react';

interface ActivityDetailModalProps {
  activity: Activity;
  onClose: () => void;
  onNavigateToMembership: () => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  onClose,
  onNavigateToMembership,
}) => {
  const { user, isPremium, toggleFavoriteActivity, toggleCompletedActivity } = useAuth();

  const isSaved = user?.savedActivities?.includes(activity.id);
  const isCompleted = user?.completedActivities?.includes(activity.id);

  // Local checklist of materials
  const [checkedMaterials, setCheckedMaterials] = useState<Record<number, boolean>>({});

  const toggleMaterial = (index: number) => {
    setCheckedMaterials((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isLocked = activity.isPremium && !isPremium;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-amber-200/80 my-8 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-white/95 backdrop-blur-md sticky top-0 z-10 no-print">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs font-black">
              {activity.ageLabel}
            </span>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide">
              {activity.categoryName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
              title="In hướng dẫn hoạt động này"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={() => toggleFavoriteActivity(activity.id)}
              className="p-2 rounded-xl text-neutral-500 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              title="Lưu hoạt động"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Main Title & Image */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 leading-tight mb-2">
              {activity.title}
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              {activity.summary}
            </p>

            {/* Quick Meta Stats */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 mb-6">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 font-bold">
                <Clock className="w-4 h-4 text-neutral-500" />
                Thời lượng: {activity.durationMinutes} phút
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-neutral-100 font-bold">
                Độ khó: {activity.difficulty}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-900 border border-orange-200 font-bold">
                <Baby className="w-4 h-4 text-orange-600" />
                Dành cho trẻ {activity.ageLabel}
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-video bg-amber-50 shadow-xs mb-6">
              <img
                src={activity.coverImage}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* CRITICAL SAFETY WARNING (Always visible) */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-rose-700 uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Cảnh báo an toàn cho cha mẹ (Safety First)</span>
            </div>
            <ul className="space-y-1 text-xs text-rose-900 list-disc list-inside">
              {activity.safetyWarnings.map((warn, idx) => (
                <li key={idx} className="leading-relaxed">
                  {warn}
                </li>
              ))}
            </ul>
          </div>

          {/* Materials Checklist */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-black text-neutral-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-amber-600" />
              <span>Nguyên vật liệu chuẩn bị (Tích để đánh dấu)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activity.materials.map((item, idx) => {
                const isChecked = !!checkedMaterials[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleMaterial(idx)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left text-xs sm:text-sm transition-all ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 line-through'
                        : 'bg-neutral-50/80 border-neutral-200 hover:bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    )}
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Locked vs. Unlocked step-by-step content */}
          {isLocked ? (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-white">
                <Crown className="w-6 h-6 fill-white" />
              </div>
              <h3 className="text-xl font-black">
                Mở khóa các bước thực hiện chi tiết
              </h3>
              <p className="text-sm text-amber-100 max-w-md mx-auto leading-relaxed">
                Hoạt động chuyên sâu này thuộc <strong>Gói Hội Viên</strong>. Chỉ từ 29.000đ/tháng để đồng hành trọn vẹn cùng bé mỗi ngày.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToMembership();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-neutral-900 font-extrabold text-sm shadow-md hover:bg-neutral-100 transition-colors"
                >
                  Đăng ký gói hội viên ngay
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step by Step Instructions */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-black text-neutral-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <span>Các bước thực hiện chi tiết</span>
                </h3>
                <div className="space-y-3">
                  {activity.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 font-black text-xs flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <h4 className="font-extrabold text-neutral-900 text-sm">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600 pl-8 leading-relaxed">
                        {step.instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent Tips & Talking Prompts */}
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <h3 className="text-sm font-black text-amber-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>Lời khuyên & Gợi ý trò chuyện cùng con</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-neutral-700 list-disc list-inside">
                  {activity.parentTips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Developmental Milestones */}
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                <h3 className="text-sm font-black text-neutral-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-neutral-700" />
                  <span>Mục tiêu phát triển đạt được</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activity.milestones.map((ms, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{ms}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky Bottom Actions */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <div className="text-xs text-neutral-500 text-center sm:text-left">
            {isCompleted ? 'Tuyệt vời! Ba mẹ và bé đã hoàn thành hoạt động này.' : 'Đừng quên ghi nhận nỗ lực nhỏ của con hôm nay.'}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => toggleCompletedActivity(activity.id)}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Đã hoàn thành' : 'Đánh dấu đã chơi cùng con'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
