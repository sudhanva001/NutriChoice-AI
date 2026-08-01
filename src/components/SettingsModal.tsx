import React, { useState } from "react";
import { UserStats } from "../types";

interface SettingsModalProps {
  userStats: UserStats;
  onUpdateStats: (updated: Partial<UserStats>) => void;
  onClose: () => void;
  avatarUrl: string;
  onUpdateAvatar: (url: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  userStats,
  onUpdateStats,
  onClose,
  avatarUrl,
  onUpdateAvatar,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [calorieGoal, setCalorieGoal] = useState(userStats.dailyCalorieGoal);
  const [dietGoal, setDietGoal] = useState("Weight Loss & Fat Reduction");

  const avatarOptions = [
    {
      label: "Woman (Morning Light)",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzWLXUin22Ub4zWvmKBx1vXuHgl_NOwhfHZSQeB5aGBNpSg8UQD8C3Xj7Bqir4XslNUKAiA-mIuzaFG2p4tV5-L-tGJUhODuQBVZvmAsTH9KFv3Ky5YSLDwiq1NRFsgIPnsNVz-aOYmHY9ZIjS2Q93eVVE7gmcq2NCYmWLtIv0r6V12k3KYdQ6YevJ7I08BWYpw5zytQMvnh3mthpMaNT4fA-aEZOcn9wghsQ-_e7UZEBOV4CZ_16JNAii2LskbBBRBuxzopDFr_MI",
    },
    {
      label: "Man (Indoor Beard)",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgJhWwYYAV0LvIZcb5sp-M2Gb8rsgKh8GY6PQB375gbsyM1tkB6OHBgvaipdbNJYWOPkKeS3QyPNwvEzy5QKItSM5JKH5ggerkNVlUnYF8uW8Y53vMBNtmEiZNyOMZxNngsYP247n6KxaWVURcYGFJPZxSnnLYBtyZkFeXoAOrffho0ZYmogUFtP7zdPMX4RKkqPwVxAYG_mBM2ujEW-Hog2MINRBD2_rQIoLpCmjLtgo5kwbtK3d7NxCFAjn954910ARgBfnm8BVX",
    },
    {
      label: "Smiling Professional",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqlnpJ0WTWhddi-NocxfDb-tk70p-qGHzMa6x0eJxBir26W7_Fr8FAe2R0mdBmzZFRPdRDlXljCQALr3jscIhwNmP8D0qvf_NFvwYTPZ08ECN2-UbmEMTEB8IuhO2l0EsEDZQwp-RcXjdXFp31PZ5E52R-YV48oNcgdaylsLlFTv0eePJ-oqv2S38LTymzMEowZZzvez62aPftz1RRm7FbNNoSX_0Y0s-z9XlZSWVueFtn9s9SCmp-BmdHhk4E6VvOyOog4W_6ObKI",
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStats({ dailyCalorieGoal: calorieGoal });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="font-['Lexend'] font-bold text-xl text-slate-900 dark:text-slate-100">
            Profile & Settings
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
              Profile Avatar
            </label>
            <div className="grid grid-cols-3 gap-2">
              {avatarOptions.map((opt, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => onUpdateAvatar(opt.url)}
                  className={`p-1.5 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
                    avatarUrl === opt.url
                      ? "border-[#10b981] bg-emerald-50 dark:bg-emerald-950/40"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-400"
                  }`}
                >
                  <img
                    alt={opt.label}
                    src={opt.url}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 text-center line-clamp-1">
                    Option {i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Calorie Goal */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Daily Calorie Target
              </label>
              <span className="font-['Lexend'] font-bold text-emerald-600 text-sm">
                {calorieGoal} kcal
              </span>
            </div>
            <input
              type="range"
              min="1200"
              max="3500"
              step="50"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(Number(e.target.value))}
              className="w-full accent-[#10b981]"
            />
          </div>

          {/* Primary Goal */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Primary Nutrition Goal
            </label>
            <select
              value={dietGoal}
              onChange={(e) => setDietGoal(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            >
              <option value="Weight Loss & Fat Reduction">
                Weight Loss & Fat Reduction (-500 kcal deficit)
              </option>
              <option value="High Protein Muscle Building">
                High Protein Muscle Building (+300 kcal surplus)
              </option>
              <option value="Maintenance & Energy Balance">
                Maintenance & Energy Balance
              </option>
              <option value="Keto & Low Carb Focus">Keto & Low Carb Focus</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div>
              <span className="font-['Manrope'] font-bold text-xs text-slate-800 dark:text-slate-100 block">
                Dark Mode Palette
              </span>
              <span className="text-[10px] text-slate-400">
                Switch app color theme
              </span>
            </div>
            <button
              type="button"
              onClick={onToggleDarkMode}
              className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${
                isDarkMode ? "bg-[#10b981] justify-end" : "bg-slate-300 justify-start"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Submit */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-xs font-bold text-white bg-[#10b981] rounded-xl hover:bg-emerald-600 transition-colors shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
