"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter } from "lucide-react";

const allCategories = ["Все", "Терапия", "Хирургия", "Ортопедия"];

type BeforeAfterItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  kind: "pair";
  before: string;
  after: string;
};

type SingleItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  kind: "single";
  image: string;
};

type PortfolioItem = BeforeAfterItem | SingleItem;

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    kind: "pair",
    title: "Имплантация в области 44–46",
    category: "Хирургия",
    description: "Восстановление трёх жевательных зубов с помощью дентальных имплантов.",
    before: "/images/implant-before.jpg",
    after: "/images/implant-after.jpg",
  },
  {
    id: "2",
    kind: "pair",
    title: "Лечение кариеса — случай 1",
    category: "Терапия",
    description: "Профессиональное лечение кариеса с последующей эстетической реставрацией.",
    before: "/images/caries-1-before.jpg",
    after: "/images/caries-1-after.jpg",
  },
  {
    id: "3",
    kind: "pair",
    title: "Лечение кариеса — случай 2",
    category: "Терапия",
    description: "Устранение множественного кариеса, восстановление естественного вида зубов.",
    before: "/images/caries-2-before.jpg",
    after: "/images/caries-2-after.jpg",
  },
  {
    id: "4",
    kind: "pair",
    title: "Микропротезирование Table Tops — случай 1",
    category: "Ортопедия",
    description: "Керамические накладки Table Tops для восстановления высоты и формы зубов.",
    before: "/images/tabletops-1-before.jpg",
    after: "/images/tabletops-1-after.jpg",
  },
  {
    id: "5",
    kind: "pair",
    title: "Микропротезирование Table Tops — случай 2",
    category: "Ортопедия",
    description: "Эстетическое микропротезирование с сохранением максимума тканей зуба.",
    before: "/images/tabletops-2-before.jpg",
    after: "/images/tabletops-2-after.jpg",
  },
  {
    id: "6",
    kind: "pair",
    title: "Съёмный протез",
    category: "Ортопедия",
    description: "Изготовление и установка полного съёмного протеза для комфортного жевания.",
    before: "/images/denture-before.jpg",
    after: "/images/denture-after.jpg",
  },
  {
    id: "7",
    kind: "single",
    title: "Циркониевые коронки",
    category: "Ортопедия",
    description: "Протезирование безметалловыми циркониевыми коронками — эстетика и прочность.",
    image: "/images/zirconia.jpg",
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered =
    activeCategory === "Все"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-dental-surface min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium text-dental-teal mb-2 uppercase tracking-wider">
            Результаты работы
          </span>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Портфолио работ
          </h1>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Реальные клинические случаи доктора Арслана Хыдырова — фотографии
            до и после лечения
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <Filter className="h-4 w-4 text-gray-400 mr-1" />
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-dental-teal text-white shadow-md shadow-teal-500/20"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* Images */}
              {item.kind === "single" ? (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-dental-teal/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Результат
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="grid grid-cols-2 h-full">
                    <div className="relative overflow-hidden">
                      <Image
                        src={item.before}
                        alt={`До — ${item.title}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="inline-block bg-black/50 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          До
                        </span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden border-l-2 border-white">
                      <Image
                        src={item.after}
                        alt={`После — ${item.title}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                      />
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="inline-block bg-dental-teal/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          После
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Category */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5">
                <h3 className="text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>Нет работ в этой категории</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center rounded-2xl bg-gradient-to-br from-dental-teal to-teal-700 px-8 py-12 text-white shadow-xl">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Хотите такой же результат?
          </h2>
          <p className="mt-3 text-teal-100">
            Запишитесь на бесплатную консультацию — оценим ситуацию и составим
            план лечения
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+79050092127"
              className="rounded-xl bg-white px-7 py-3 text-base font-semibold text-dental-teal shadow hover:bg-gray-50 transition-all"
            >
              +7 905 009-21-27
            </a>
            <a
              href="https://t.me/arsstomat"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border-2 border-white px-7 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
