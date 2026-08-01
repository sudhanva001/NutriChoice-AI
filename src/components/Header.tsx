import React from "react";

interface HeaderProps {
  onOpenSettings: () => void;
  avatarUrl?: string;
  unreadNotifications?: boolean;
  onNotificationClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDgJhWwYYAV0LvIZcb5sp-M2Gb8rsgKh8GY6PQB375gbsyM1tkB6OHBgvaipdbNJYWOPkKeS3QyPNwvEzy5QKItSM5JKH5ggerkNVlUnYF8uW8Y53vMBNtmEiZNyOMZxNngsYP247n6KxaWVURcYGFJPZxSnnLYBtyZkFeXoAOrffho0ZYmogUFtP7zdPMX4RKkqPwVxAYG_mBM2ujEW-Hog2MINRBD2_rQIoLpCmjLtgo5kwbtK3d7NxCFAjn954910ARgBfnm8BVX",
  unreadNotifications = true,
  onNotificationClick,
}) => {
  return (
    <header className="bg-[#F8FAFC] dark:bg-slate-950 flex justify-between items-center w-full px-5 h-16 fixed top-0 left-0 right-0 z-50 border-b border-slate-100/80 dark:border-slate-800/80 backdrop-blur-md bg-opacity-95">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 rounded-full overflow-hidden bg-emerald-100 dark:bg-emerald-950 ring-2 ring-emerald-500/20 hover:scale-105 transition-transform flex-shrink-0"
          title="Profile & Settings"
        >
          <img
            alt="User profile"
            className="w-full h-full object-cover"
            src={avatarUrl}
          />
        </button>
        <span className="font-['Lexend'] font-bold text-xl text-slate-900 dark:text-slate-50 tracking-tight">
          NutriCoach
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onNotificationClick}
          className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-transform active:scale-95"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {unreadNotifications && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          )}
        </button>
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-transform active:scale-95"
          title="Settings"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </div>
    </header>
  );
};
