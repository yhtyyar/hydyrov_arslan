"use client";

import { useState } from "react";
import { ImageIcon, Filter } from "lucide-react";

const categories = ["Все", "Виниры", "Имплантация", "Отбеливание", "Реставрация", "Ортодонтия"];

const portfolioItems = [
  { id: "1", title: "Виниры E-Max — полная реставрация", category: "Виниры", description: "Установка 8 виниров в зоне улыбки. Результат — естественная белоснежная улыбка." },
  { id: "2", title: "Имплантация жевательных зубов", category: "Имплантация", description: "Восстановление 3 жевательных зубов с помощью имплантов Straumann." },
  { id: "3", title: "Отбеливание ZOOM 4", category: "Отбеливание", description: "Профессиональное отбеливание на 8 тонов за одно посещение." },
  { id: "4", title: "Художественная реставрация", category: "Реставрация", description: "Восстановление скола переднего зуба композитным материалом." },
  { id: "5", title: "Керамические виниры", category: "Виниры", description: "6 виниров для коррекции формы и цвета зубов." },
  { id: "6", title: "All-on-4 имплантация", category: "Имплантация", description: "Полное восстановление зубного ряда на 4 имплантах." },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Портфолио работ</h1>
        <p className="mt-3 text-gray-500">Реальные результаты лечения наших пациентов (До / После)</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <Filter className="h-4 w-4 text-gray-400 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeCategory === cat
                ? "bg-dental-teal text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div key={item.id} className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
            <div className="grid grid-cols-2 gap-px bg-gray-200">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-gray-300" />
                  <p className="text-[10px] text-gray-400 mt-1">До</p>
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-teal-50 to-white flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-dental-teal/30" />
                  <p className="text-[10px] text-dental-teal/50 mt-1">После</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <span className="inline-block rounded-full bg-teal-50 px-3 py-0.5 text-xs font-medium text-dental-teal">
                {item.category}
              </span>
              <h3 className="mt-2 text-base font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>Нет работ в этой категории</p>
        </div>
      )}
    </div>
  );
}
