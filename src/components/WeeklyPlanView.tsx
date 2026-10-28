import React from 'react';
import { WEEKLY_PLAY_SCHEDULE } from '../data/dailyPlanData';
import { ACTIVITIES_DATA } from '../data/activitiesData';
import { Calendar, Sparkles, Sun, Moon, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

interface WeeklyPlanViewProps {
  onSelectActivity: (activityId: string) => void;
}

export const WeeklyPlanView: React.FC<WeeklyPlanViewProps> = ({ onSelectActivity }) => {
  const currentDayIndex = new Date().getDay();
  const todayDayNumber = currentDayIndex === 0 ? 7 : currentDayIndex;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
          <Calendar className="w-4 h-4 text-amber-600" />
          <span>Kế hoạch khoa học tuần này</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
          Lộ Trình Chơi Cùng Con 7 Ngày
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
          Được phân bổ cân bằng giữa Vận động tinh, Vận động thô, Ngôn ngữ, Khoa học và Trí tuệ cảm xúc để trẻ không bị quá tải.
        </p>
      </div>

      {/* Days list */}
      <div className="space-y-4">
        {WEEKLY_PLAY_SCHEDULE.map((schedule) => {
          const isToday = schedule.dayNumber === todayDayNumber;
          const activity = ACTIVITIES_DATA.find((a) => a.id === schedule.focusActivityId) || ACTIVITIES_DATA[0];

          return (
            <div
              key={schedule.dayNumber}
              className={`p-6 rounded-3xl border transition-all ${
                isToday
                  ? 'bg-gradient-to-r from-amber-50 via-orange-50/50 to-white border-amber-300 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white border-neutral-200/90 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Day & Theme */}
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-black ${
                        isToday ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {schedule.dayOfWeek} {isToday && '· HÔM NAY'}
                    </span>
                    <span className="text-xs font-extrabold text-amber-800">
                      {schedule.theme}
                    </span>
                  </div>

                  {/* Activity preview */}
                  <div className="flex items-center gap-4 bg-white/80 p-3 rounded-2xl border border-amber-100">
                    <img
                      src={activity.coverImage}
                      alt={activity.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-neutral-900 truncate">
                        {activity.title}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-1">
                        {activity.categoryName} · {activity.ageLabel} · {activity.durationMinutes} phút
                      </p>
                      <button
                        onClick={() => onSelectActivity(activity.id)}
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 mt-1"
                      >
                        <span>Xem chi tiết trò chơi</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Morning tip & Bedtime affirmation */}
                <div className="space-y-2 lg:border-l lg:border-neutral-200 lg:pl-6 text-xs text-neutral-600 max-w-md">
                  <div className="flex items-start gap-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100/60">
                    <Sun className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-900 font-bold block">Buổi sáng hứng khởi:</strong>
                      <span>{schedule.quickMorningTip}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100/60">
                    <Moon className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-indigo-900 font-bold block">Thủ thỉ trước giờ ngủ:</strong>
                      <span>{schedule.bedtimeAffirmation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
