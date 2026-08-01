import React, { useState } from "react";
import { UserStats } from "../types";
import { HEALTHIER_SWAPS_CAROUSEL } from "../data/mockData";

interface HabitsViewProps {
  userStats: UserStats;
  onAddGroceryItem: (name: string, category: "Fresh Produce" | "Proteins" | "Dairy & Alternatives" | "Healthy Snacks") => void;
  onShowToast: (msg: string) => void;
}

export const HabitsView: React.FC<HabitsViewProps> = ({
  userStats,
  onAddGroceryItem,
  onShowToast,
}) => {
  const [nudgeAccepted, setNudgeAccepted] = useState(false);

  const handleTryNudge = () => {
    setNudgeAccepted(true);
    onShowToast("Herbal Tea ritual added to your evening habit tracker!");
    onAddGroceryItem("Herbal Chamomile Tea", "Healthy Snacks");
  };

  return (
    <main className="pt-20 pb-28 px-5 max-w-2xl mx-auto space-y-6">
      {/* Title */}
      <section>
        <h1 className="font-['Lexend'] font-bold text-3xl text-slate-900 dark:text-slate-100 mb-1">
          Habit Hub
        </h1>
        <p className="font-['Manrope'] text-sm text-slate-500 dark:text-slate-400">
          Your behavioral stability and eating patterns.
        </p>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Habit Score Main Card (2 Cols, 2 Rows) */}
        <div className="md:col-span-2 md:row-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <span className="font-['Manrope'] font-bold text-[11px] text-[#006c49] dark:text-emerald-400 tracking-widest uppercase block">
              Habit Score
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-['Lexend'] font-bold text-5xl text-slate-900 dark:text-slate-100">
                {userStats.habitScore}
              </span>
              <span className="font-['Manrope'] text-sm text-slate-400">/100</span>
            </div>
          </div>

          <div className="relative flex justify-center py-4">
            <svg className="w-32 h-32">
              <circle
                cx="64"
                cy="64"
                fill="transparent"
                r="56"
                stroke="#eceef0"
                strokeWidth="12"
              />
              <circle
                className="progress-ring-circle text-[#10b981]"
                cx="64"
                cy="64"
                fill="transparent"
                r="56"
                stroke="currentColor"
                strokeDasharray="351.85"
                strokeDashoffset={351.85 * (1 - userStats.habitScore / 100)}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[#10b981] text-2xl">
                trending_up
              </span>
              <span className="font-['Manrope'] font-bold text-[10px] text-[#10b981]">
                +4.2%
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-['Manrope']">
              <span className="text-slate-500">Consistency</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">92%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div className="bg-[#006c49] h-2 rounded-full" style={{ width: "92%" }} />
            </div>
          </div>
        </div>

        {/* Actionable Nudge Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 flex flex-col justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#4b41e1] text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <h3 className="font-['Lexend'] font-bold text-sm text-slate-900 dark:text-slate-100">
              Actionable Nudge
            </h3>
          </div>
          <p className="font-['Manrope'] text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            You tend to reach for snacks around 9:30 PM. Try a 5-minute herbal tea ritual instead tonight.
          </p>
          <button
            onClick={handleTryNudge}
            disabled={nudgeAccepted}
            className={`py-2 px-4 rounded-xl font-['Manrope'] font-bold text-xs transition-all cursor-pointer ${
              nudgeAccepted
                ? "bg-emerald-100 text-[#006c49]"
                : "bg-[#4b41e1]/10 text-[#4b41e1] hover:bg-[#4b41e1]/20"
            }`}
          >
            {nudgeAccepted ? "RITUAL ACCEPTED ✓" : "I'LL TRY THIS"}
          </button>
        </div>

        {/* Consistency Streak Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="font-['Lexend'] font-bold text-sm text-slate-900 dark:text-slate-100">
              Consistency Streak
            </h3>
            <div className="flex items-center gap-1 text-[#855300]">
              <span className="material-symbols-outlined text-base">bolt</span>
              <span className="font-bold text-xs">{userStats.streakDays} Days</span>
            </div>
          </div>

          <div className="flex justify-between px-1">
            {["M", "T", "W", "T", "F"].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-full bg-[#006c49] flex items-center justify-center text-white text-[10px] font-bold">
                  {day}
                </div>
              </div>
            ))}
            {["S", "S"].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                  {day}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 italic">
            Behavioral stability is up by 12% this week.
          </p>
        </div>

        {/* Eating Patterns Full Width Card */}
        <div className="md:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-['Lexend'] font-bold text-base text-slate-900 dark:text-slate-100">
              Eating Patterns
            </h3>
            <span className="font-['Manrope'] font-bold text-xs text-slate-400">
              Last 30 Days
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-[#ba1a1a] text-lg">
                  dark_mode
                </span>
                <span className="font-['Manrope'] font-bold text-xs text-slate-800 dark:text-slate-100">
                  Late Night Snacking
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                High frequency observed on Tuesdays and Thursdays after 9 PM.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-[#006c49] text-lg">
                  wb_sunny
                </span>
                <span className="font-['Manrope'] font-bold text-xs text-slate-800 dark:text-slate-100">
                  Balanced Breakfast
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                90% compliance. You start your days with high protein consistently.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-[#4b41e1] text-lg">
                  speed
                </span>
                <span className="font-['Manrope'] font-bold text-xs text-slate-800 dark:text-slate-100">
                  Eating Velocity
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Medium. Your average lunch duration is 18 minutes. Goal: 20 mins.
              </p>
            </div>
          </div>
        </div>

        {/* Growth Tip Banner */}
        <div className="md:col-span-4 bg-[#e2dfff]/30 dark:bg-indigo-950/30 rounded-2xl p-5 border border-[#4b41e1]/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
            <div className="w-14 h-14 flex-shrink-0 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-[#4b41e1] shadow-sm">
              <span className="material-symbols-outlined text-2xl">lightbulb</span>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h4 className="font-['Lexend'] font-bold text-base text-[#4b41e1] mb-1">
                Growth Tip: Micro-Habits
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Try drinking 8oz of water before every meal. This small ritual increases mindfulness and hydration scores by up to 25%.
              </p>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <span
              className="material-symbols-outlined text-[120px] text-[#4b41e1]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
          </div>
        </div>
      </div>

      {/* Healthier Swaps Section */}
      <section className="pt-4">
        <h3 className="font-['Lexend'] font-bold text-lg text-slate-900 dark:text-slate-100 mb-4">
          Healthier Swaps
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scroll-hide">
          {HEALTHIER_SWAPS_CAROUSEL.map((swap) => (
            <div
              key={swap.id}
              className="min-w-[280px] bg-white dark:bg-slate-900 rounded-2xl p-4 border-2 border-[#4b41e1]/10 flex flex-col gap-3 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] justify-between"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    alt={swap.title}
                    className="w-full h-full object-cover"
                    src={swap.imageUrl}
                  />
                </div>
                <span
                  className="material-symbols-outlined text-[#4b41e1]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
              </div>

              <div>
                <span className="font-['Manrope'] font-bold text-sm text-slate-900 dark:text-slate-100 block mb-1">
                  {swap.title}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {swap.description}
                </p>
              </div>

              <button
                onClick={() => {
                  onAddGroceryItem(swap.title, "Healthy Snacks");
                  onShowToast(`Added ${swap.title} to Grocery list!`);
                }}
                className="w-full py-2 text-xs font-bold text-[#4b41e1] bg-indigo-50 dark:bg-indigo-950 rounded-xl hover:bg-indigo-100 transition-colors"
              >
                + Add Ingredient to Grocery
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
