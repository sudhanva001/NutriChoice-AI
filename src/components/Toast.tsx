import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "info" | "warning";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: "bg-emerald-600 text-white shadow-emerald-600/20",
    info: "bg-indigo-600 text-white shadow-indigo-600/20",
    warning: "bg-amber-600 text-white shadow-amber-600/20",
  };

  const icons = {
    success: "check_circle",
    info: "auto_awesome",
    warning: "info",
  };

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 animate-bounce max-w-sm w-11/12">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl w-full ${bgColors[type]}`}>
        <span className="material-symbols-outlined text-[20px]">{icons[type]}</span>
        <span className="text-sm font-medium flex-1">{message}</span>
        <button onClick={onClose} className="p-1 opacity-80 hover:opacity-100">
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};
