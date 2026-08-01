import React, { useState } from "react";
import { GroceryItem } from "../types";

interface GroceryViewProps {
  items: GroceryItem[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onAddItem: (name: string, category: GroceryItem["category"], quantity: string) => void;
  onClearCompleted: () => void;
}

export const GroceryView: React.FC<GroceryViewProps> = ({
  items,
  onToggleItem,
  onDeleteItem,
  onAddItem,
  onClearCompleted,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] =
    useState<GroceryItem["category"]>("Fresh Produce");
  const [newItemQuantity, setNewItemQuantity] = useState("1 unit");

  const categories = [
    "All",
    "Fresh Produce",
    "Proteins",
    "Dairy & Alternatives",
    "Healthy Snacks",
  ];

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const completedCount = items.filter((i) => i.completed).length;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    onAddItem(newItemName.trim(), newItemCategory, newItemQuantity);
    setNewItemName("");
  };

  return (
    <main className="pt-20 pb-28 px-5 max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-['Lexend'] font-bold text-3xl text-slate-900 dark:text-slate-100 mb-1">
            Grocery List
          </h1>
          <p className="font-['Manrope'] text-sm text-slate-500 dark:text-slate-400">
            {completedCount} of {items.length} items completed
          </p>
        </div>

        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors pt-1"
          >
            Clear Done
          </button>
        )}
      </div>

      {/* Add Item Form */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-3"
      >
        <div className="flex gap-2">
          <input
            type="text"
            required
            placeholder="Add ingredient (e.g., Avocado, Kale)..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#10b981] hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add
          </button>
        </div>

        <div className="flex gap-2 text-xs">
          <select
            value={newItemCategory}
            onChange={(e) =>
              setNewItemCategory(e.target.value as GroceryItem["category"])
            }
            className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="Fresh Produce">Fresh Produce</option>
            <option value="Proteins">Proteins</option>
            <option value="Dairy & Alternatives">Dairy & Alternatives</option>
            <option value="Healthy Snacks">Healthy Snacks</option>
          </select>

          <input
            type="text"
            placeholder="Qty (e.g. 500g)"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
            className="w-28 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
          />
        </div>
      </form>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto custom-scroll-hide pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#10b981] text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-900 border border-slate-100 dark:border-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grocery Items List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs italic">
            No ingredients in this category yet.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex items-center justify-between transition-colors ${
                item.completed ? "bg-slate-50/50 dark:bg-slate-800/20" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleItem(item.id)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                    item.completed
                      ? "bg-[#10b981] border-[#10b981] text-white"
                      : "border-slate-300 dark:border-slate-600 hover:border-[#10b981]"
                  }`}
                >
                  {item.completed && (
                    <span className="material-symbols-outlined text-xs">check</span>
                  )}
                </button>

                <div>
                  <span
                    className={`font-['Manrope'] text-sm font-medium ${
                      item.completed
                        ? "line-through text-slate-400"
                        : "text-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[10px] font-medium text-slate-500">
                      {item.quantity}
                    </span>
                    {item.isFromSwap && (
                      <span className="bg-indigo-50 dark:bg-indigo-950 text-[#4b41e1] text-[9px] font-bold px-1.5 py-0.5 rounded">
                        SWAP ITEM
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDeleteItem(item.id)}
                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                title="Remove Item"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
};
