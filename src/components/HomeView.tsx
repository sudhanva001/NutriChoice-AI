import React, { useState } from "react";
import { UserStats, IndianSwapItem, TabType } from "../types";
import { INDIAN_SWAPS } from "../data/mockData";

interface HomeViewProps {
  userStats: UserStats;
  onNavigateTab: (tab: TabType) => void;
  onLogMeal: (title: string, calories: number, protein: number, carbs: number, fat: number) => void;
  onAddGroceryItem: (name: string, category: "Fresh Produce" | "Proteins" | "Dairy & Alternatives" | "Healthy Snacks") => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userStats,
  onNavigateTab,
  onLogMeal,
  onAddGroceryItem,
}) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [quickMealName, setQuickMealName] = useState("");
  const [quickCalories, setQuickCalories] = useState(350);

  const caloriePercentage = Math.min(
    100,
    Math.round((userStats.currentCalories / userStats.dailyCalorieGoal) * 100)
  );

  // Circle circumference for r=54: 2 * Math.PI * 54 = 339.29
  const dashoffset = 339.29 * (1 - caloriePercentage / 100);

  const handleQuickLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMealName.trim()) return;
    onLogMeal(quickMealName, quickCalories, 25, 30, 12);
    setQuickMealName("");
    setShowLogModal(false);
  };

  return (
    <main className="pt-20 pb-28 px-5 max-w-2xl mx-auto space-y-6">
      {/* Proactive Insight Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-[#10b981] p-6 text-[#00422b] shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-white"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="font-['Lexend'] text-xs uppercase tracking-wider font-bold text-emerald-100">
              Proactive Insight
            </span>
          </div>
          <h2 className="font-['Lexend'] text-xl font-bold text-white leading-tight">
            Time for an afternoon snack—try these high-protein options near you.
          </h2>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onNavigateTab("assistant")}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full font-['Manrope'] text-[12px] font-bold text-white border border-white/30 active:scale-95 transition-all cursor-pointer"
            >
              View Swaps
            </button>
            <button
              onClick={() => setShowLogModal(true)}
              className="bg-white hover:bg-emerald-50 text-[#10b981] px-4 py-2 rounded-full font-['Manrope'] text-[12px] font-bold active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              Log Now
            </button>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[200px] text-white">
            restaurant
          </span>
        </div>
      </section>

      {/* Progress & Macro Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Calorie & Macro Circle Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center relative overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-slate-100 dark:text-slate-800"
                cx="72"
                cy="72"
                fill="transparent"
                r="54"
                stroke="currentColor"
                strokeWidth="12"
              />
              <circle
                className="text-[#10b981] progress-ring-circle"
                cx="72"
                cy="72"
                fill="transparent"
                r="54"
                stroke="currentColor"
                strokeDasharray="339.29"
                strokeDashoffset={dashoffset}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-['Lexend'] text-2xl font-bold text-[#006c49] dark:text-emerald-400">
                {userStats.currentCalories.toLocaleString()}
              </span>
              <span className="font-['Manrope'] font-bold text-slate-400 text-[10px] tracking-wider uppercase">
                OF {userStats.dailyCalorieGoal.toLocaleString()} KCAL
              </span>
            </div>
          </div>

          <div className="mt-6 w-full space-y-3">
            <div className="flex justify-between items-end text-xs font-bold font-['Manrope']">
              <span className="text-slate-500 uppercase tracking-wider">
                MACRO BALANCE
              </span>
              <span className="text-[#10b981]">Healthy Mix</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
              <div
                className="h-full bg-[#10b981]"
                style={{ width: "40%" }}
                title="Carbs 40%"
              />
              <div
                className="h-full bg-[#645efb]"
                style={{ width: "35%" }}
                title="Protein 35%"
              />
              <div
                className="h-full bg-[#e29100]"
                style={{ width: "25%" }}
                title="Fat 25%"
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 font-['Manrope']">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" /> CARB 40%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#645efb]" /> PRO 35%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#e29100]" /> FAT 25%
              </span>
            </div>
          </div>
        </div>

        {/* Habit Score Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between border border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-['Lexend'] font-bold text-lg text-slate-800 dark:text-slate-100">
                Habit Score
              </h3>
              <span className="bg-emerald-50 dark:bg-emerald-950 text-[#10b981] text-[12px] font-bold px-2 py-1 rounded-lg">
                +12%
              </span>
            </div>
            <div className="flex items-end gap-1.5 h-24 mb-4">
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[40%]" title="Mon" />
              <div className="flex-1 bg-[#10b981] rounded-t-lg h-[80%]" title="Tue" />
              <div className="flex-1 bg-[#10b981] rounded-t-lg h-[90%]" title="Wed" />
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[60%]" title="Thu" />
              <div className="flex-1 bg-[#10b981] rounded-t-lg h-[75%]" title="Fri" />
              <div className="flex-1 bg-[#10b981] rounded-t-lg h-[100%]" title="Sat" />
              <div className="flex-1 bg-[#006c49] rounded-t-lg h-[95%]" title="Today" />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-['Manrope']">
            You've logged {userStats.loggedDaysCount} days in a row! You're in the top 5% of users this week.
          </p>
        </div>
      </section>

      {/* Suggested Indian Swaps Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-['Lexend'] font-bold text-lg text-slate-800 dark:text-slate-100">
            Suggested Indian Swaps
          </h3>
          <button
            onClick={() => onNavigateTab("assistant")}
            className="text-[#4b41e1] font-bold text-xs uppercase tracking-wider hover:underline"
          >
            View All
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto custom-scroll-hide pb-2 -mx-5 px-5">
          {INDIAN_SWAPS.map((swap) => (
            <div
              key={swap.id}
              className="min-w-[220px] bg-white dark:bg-slate-900 rounded-2xl border-2 border-[#4b41e1]/20 p-4 shadow-sm relative shrink-0 flex flex-col justify-between"
            >
              <div className="absolute top-2 right-2 text-[#4b41e1]">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
              </div>
              <div className="w-full h-28 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 overflow-hidden">
                <img
                  alt={swap.title}
                  className="w-full h-full object-cover"
                  src={swap.imageUrl}
                />
              </div>
              <div>
                <p className="font-['Manrope'] font-bold text-[10px] text-[#4b41e1] tracking-wider uppercase mb-1">
                  HEALTHIER SWAP
                </p>
                <h4 className="font-['Manrope'] font-bold text-slate-800 dark:text-slate-100 text-sm mb-0.5">
                  {swap.title}
                </h4>
                <p className="text-[12px] text-slate-500 dark:text-slate-400">
                  Instead of {swap.insteadOf}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[11px] font-bold text-[#10b981] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    {swap.benefitType === "calories_less" ? "arrow_downward" : swap.benefitType === "protein_more" ? "arrow_upward" : "bolt"}
                  </span>
                  {swap.benefitTag}
                </span>
                <button
                  onClick={() => onAddGroceryItem(swap.title, "Proteins")}
                  className="text-xs bg-indigo-50 dark:bg-indigo-950 text-[#4b41e1] px-2 py-1 rounded-md font-medium hover:bg-indigo-100 transition-colors"
                  title="Add to Grocery List"
                >
                  + List
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Action Navigation Buttons */}
      <section className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onNavigateTab("assistant")}
          className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 flex flex-col gap-3 active:scale-95 transition-all text-left group hover:border-[#4b41e1]/40 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#4b41e1]/10 text-[#4b41e1] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <div>
            <h4 className="font-['Lexend'] font-bold text-slate-800 dark:text-slate-100 text-sm">
              Decision Assistant
            </h4>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1">
              Chat about what to eat
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab("scan")}
          className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 flex flex-col gap-3 active:scale-95 transition-all text-left group hover:border-[#10b981]/40 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#10b981]/10 text-[#10b981] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">photo_camera</span>
          </div>
          <div>
            <h4 className="font-['Lexend'] font-bold text-slate-800 dark:text-slate-100 text-sm">
              Food Scanner
            </h4>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1">
              Instant nutrition info
            </p>
          </div>
        </button>
      </section>

      {/* Modal for Quick Log Meal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <h3 className="font-['Lexend'] font-bold text-lg text-slate-900 dark:text-slate-100">
                Quick Log Meal
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleQuickLogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Meal or Food Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Avocado Toast with Eggs"
                  value={quickMealName}
                  onChange={(e) => setQuickMealName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Estimated Calories (kcal)
                </label>
                <input
                  type="number"
                  required
                  min="50"
                  max="2500"
                  value={quickCalories}
                  onChange={(e) => setQuickCalories(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold text-white bg-[#10b981] rounded-xl hover:bg-emerald-600 transition-colors shadow-md"
                >
                  Log Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
