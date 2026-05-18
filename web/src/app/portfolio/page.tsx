"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type CarouselItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[];
};

const portfolioItems: CarouselItem[] = [
  {
    id: "1",
    title: "Имплантация в области 44–46",
    category: "Хирургия",
    description: "Восстановление трёх жевательных зубов с помощью дентальных имплантов.",
    images: [
      "/hydyrov_arslan/images/implant-1.webp",
      "/hydyrov_arslan/images/implant-2.webp",
    ],
  },
  {
    id: "2",
    title: "Лечение кариеса",
    category: "Терапия",
    description: "Профессиональное лечение кариеса с эстетической реставрацией.",
    images: [
      "/hydyrov_arslan/images/caries-1.webp",
      "/hydyrov_arslan/images/caries-2.webp",
      "/hydyrov_arslan/images/caries-3.webp",
      "/hydyrov_arslan/images/caries-4.webp",
    ],
  },
  {
    id: "3",
    title: "Микропротезирование Table Tops",
    category: "Ортопедия",
    description: "Керамические накладки для восстановления высоты и формы зубов.",
    images: [
      "/hydyrov_arslan/images/tabletops-1.webp",
      "/hydyrov_arslan/images/tabletops-2.webp",
      "/hydyrov_arslan/images/tabletops-3.webp",
      "/hydyrov_arslan/images/tabletops-4.webp",
    ],
  },
  {
    id: "4",
    title: "Съёмный протез",
    category: "Ортопедия",
    description: "Изготовление полного съёмного протеза для комфортного жевания.",
    images: [
      "/hydyrov_arslan/images/denture-1.webp",
      "/hydyrov_arslan/images/denture-2.webp",
    ],
  },
  {
    id: "5",
    title: "Циркониевые коронки",
    category: "Ортопедия",
    description: "Протезирование безметалловыми циркониевыми коронками.",
    images: [
      "/hydyrov_arslan/images/zirconia.webp",
    ],
  },
];

function CarouselModal({
  item,
  onClose,
}: {
  item: CarouselItem;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % item.images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="h-8 w-8" />
      </button>

      <div className="relative max-w-4xl w-full">
        <div className="relative overflow-hidden rounded-xl bg-gray-900" style={{ aspectRatio: '4/3' }}>
          <img
            src={item.images[currentIndex]}
            alt={`${item.title} — фото ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
          <div className="absolute top-4 left-4 bg-dental-teal text-white text-sm font-medium px-3 py-1 rounded-full">
            {currentIndex + 1} / {item.images.length}
          </div>
        </div>

        {item.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <div className="mt-4 text-center text-white">
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-gray-300 mt-1">{item.description}</p>
        </div>

        {/* Thumbnails */}
        {item.images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {item.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex ? "border-dental-teal" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`Миниатюра ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);

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
            Реальные клинические случаи доктора Арслана Хыдырова — кликните на работу, чтобы посмотреть все фото
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group text-left overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* Preview Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                    {item.category}
                  </span>
                </div>
                {item.images.length > 1 && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-block bg-dental-teal text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {item.images.length} фото
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                <p className="mt-2 text-xs text-dental-teal font-medium">
                  Кликните, чтобы посмотреть все фото →
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center rounded-2xl bg-gradient-to-br from-dental-teal to-teal-700 px-8 py-12 text-white shadow-xl">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Хотите такой же результат?
          </h2>
          <p className="mt-3 text-teal-100">
            Свяжитесь со специалистом для бесплатной консультации
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

      {/* Carousel Modal */}
      {selectedItem && (
        <CarouselModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
