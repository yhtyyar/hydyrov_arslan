"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const portfolioItems = [
  {
    id: "1",
    title: "Имплантация",
    description: "Восстановление жевательных зубов в области 44–46",
    category: "Хирургия",
    preview: "/images/implant-1.jpg",
  },
  {
    id: "2",
    title: "Лечение кариеса",
    description: "Устранение кариеса с эстетической реставрацией",
    category: "Терапия",
    preview: "/images/caries-1.jpg",
  },
  {
    id: "3",
    title: "Микропротезирование (Table Tops)",
    description: "Керамические накладки для восстановления формы зубов",
    category: "Ортопедия",
    preview: "/images/tabletops-1.jpg",
  },
];

export function PortfolioPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="inline-block text-sm font-medium text-dental-teal mb-2 uppercase tracking-wider">
              Результаты работы
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Примеры работ
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl">
              Реальные результаты лечения пациентов доктора Арслана Хыдырова
            </p>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-dental-teal hover:underline"
          >
            Все работы <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* Preview image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.preview}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                <p className="mt-2 text-xs text-dental-teal font-medium">
                  Посмотреть все фото →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-dental-teal px-6 py-3 text-sm font-semibold text-dental-teal hover:bg-dental-teal hover:text-white transition-all"
          >
            Смотреть все работы <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
