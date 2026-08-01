import React from "react";
import { TabType } from "../types";

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { id: TabType; label: string; icon: string; filledIcon?: boolean }[] = [
    { id: "home", label: "Home", icon: "dashboard" },
    { id: "assistant", label: "Assistant", icon: "auto_awesome" },
    { id: "scan", label: "Scan", icon: "photo_camera" },
    { id: "habits", label: "Habits", icon: "insights" },
    { id: "grocery", label: "Grocery", icon: "shopping_basket" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-2 pb-safe h-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0px_-4px_20px_rgba(0,0,0,0.04)] rounded-t-2xl max-w-md md:max-w-xl lg:max-w-2xl mx-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isScan = tab.id === "scan";

        if (isScan && !isActive) {
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#10B981] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-md -mt-4 border-2 border-white dark:border-slate-900">
                <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
              </div>
              <span className="font-['Lexend'] text-[10px] font-medium mt-0.5">{tab.label}</span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer px-3 py-1 rounded-xl ${
              isActive
                ? "text-[#10B981] bg-[#10B981]/10 scale-95 font-semibold"
                : "text-slate-400 dark:text-slate-500 hover:text-[#10B981]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : undefined}
            >
              {tab.icon}
            </span>
            <span className="font-['Lexend'] text-[10px] font-medium mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
