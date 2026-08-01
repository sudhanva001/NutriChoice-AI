import React, { useState, useEffect } from "react";
import { TabType, UserStats, GroceryItem } from "./types";
import { DEFAULT_USER_STATS, INITIAL_GROCERY_ITEMS } from "./data/mockData";
import { Header } from "./components/Header";
import { BottomNavBar } from "./components/BottomNavBar";
import { HomeView } from "./components/HomeView";
import { AssistantView } from "./components/AssistantView";
import { ScanView } from "./components/ScanView";
import { HabitsView } from "./components/HabitsView";
import { GroceryView } from "./components/GroceryView";
import { SettingsModal } from "./components/SettingsModal";
import { Toast } from "./components/Toast";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [userStats, setUserStats] = useState<UserStats>(DEFAULT_USER_STATS);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(INITIAL_GROCERY_ITEMS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDgJhWwYYAV0LvIZcb5sp-M2Gb8rsgKh8GY6PQB375gbsyM1tkB6OHBgvaipdbNJYWOPkKeS3QyPNwvEzy5QKItSM5JKH5ggerkNVlUnYF8uW8Y53vMBNtmEiZNyOMZxNngsYP247n6KxaWVURcYGFJPZxSnnLYBtyZkFeXoAOrffho0ZYmogUFtP7zdPMX4RKkqPwVxAYG_mBM2ujEW-Hog2MINRBD2_rQIoLpCmjLtgo5kwbtK3d7NxCFAjn954910ARgBfnm8BVX"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleLogMeal = (
    title: string,
    calories: number,
    protein: number,
    carbs: number,
    fat: number
  ) => {
    setUserStats((prev) => ({
      ...prev,
      currentCalories: prev.currentCalories + calories,
      currentMacros: {
        protein: prev.currentMacros.protein + protein,
        carbs: prev.currentMacros.carbs + carbs,
        fat: prev.currentMacros.fat + fat,
      },
      habitScore: Math.min(100, prev.habitScore + 1),
    }));
    showToast(`Logged "${title}" (+${calories} kcal)!`);
  };

  const handleAddGroceryItem = (
    name: string,
    category: GroceryItem["category"],
    quantity = "1 unit"
  ) => {
    const newItem: GroceryItem = {
      id: `g-${Date.now()}`,
      name,
      category,
      quantity,
      completed: false,
      isFromSwap: true,
    };
    setGroceryItems((prev) => [newItem, ...prev]);
    showToast(`Added "${name}" to Grocery List!`);
  };

  const handleToggleGroceryItem = (id: string) => {
    setGroceryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteGroceryItem = (id: string) => {
    setGroceryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCompletedGrocery = () => {
    setGroceryItems((prev) => prev.filter((item) => !item.completed));
    showToast("Cleared completed grocery items.");
  };

  const handleUpdateStats = (updated: Partial<UserStats>) => {
    setUserStats((prev) => ({ ...prev, ...updated }));
    showToast("Updated daily goals!");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] dark:bg-slate-950 text-[#191c1e] dark:text-slate-100 font-['Manrope'] antialiased">
      {/* Top Header */}
      <Header
        onOpenSettings={() => setShowSettings(true)}
        avatarUrl={avatarUrl}
        unreadNotifications={true}
        onNotificationClick={() =>
          showToast("Proactive Tip: You have hit 80% of your daily protein target!")
        }
      />

      {/* Main Tab Content */}
      <div className="min-h-screen">
        {activeTab === "home" && (
          <HomeView
            userStats={userStats}
            onNavigateTab={setActiveTab}
            onLogMeal={handleLogMeal}
            onAddGroceryItem={handleAddGroceryItem}
          />
        )}

        {activeTab === "assistant" && (
          <AssistantView
            onChooseMeal={handleLogMeal}
            onAddGroceryItem={handleAddGroceryItem}
          />
        )}

        {activeTab === "scan" && <ScanView onLogMeal={handleLogMeal} />}

        {activeTab === "habits" && (
          <HabitsView
            userStats={userStats}
            onAddGroceryItem={handleAddGroceryItem}
            onShowToast={showToast}
          />
        )}

        {activeTab === "grocery" && (
          <GroceryView
            items={groceryItems}
            onToggleItem={handleToggleGroceryItem}
            onDeleteItem={handleDeleteGroceryItem}
            onAddItem={(name, cat, qty) => handleAddGroceryItem(name, cat, qty)}
            onClearCompleted={handleClearCompletedGrocery}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          userStats={userStats}
          onUpdateStats={handleUpdateStats}
          onClose={() => setShowSettings(false)}
          avatarUrl={avatarUrl}
          onUpdateAvatar={setAvatarUrl}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
      )}

      {/* Notification Toast */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
