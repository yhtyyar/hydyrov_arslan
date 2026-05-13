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
    before: "/images/implant-before.jpg",
    after: "/images/implant-after.jpg",
  },
  {
    id: "2",
    title: "Лечение кариеса",
    description: "Устранение кариеса с эстетической реставрацией",
    category: "Терапия",
    before: "/images/caries-1-before.jpg",
    after: "/images/caries-1-after.jpg",
  },
  {
    id: "3",
    title: "Микропротезирование (Table Tops)",
    description: "Керамические накладки для восстановления формы зубов",
    category: "Ортопедия",
    before: "/images/tabletops-1-before.jpg",
    after: "/images/tabletops-1-after.jpg",
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
              До и После
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
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* Before / After images */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="grid grid-cols-2 h-full">
                  {/* Before */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.before}
                      alt={`До — ${item.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="inline-block bg-black/50 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        До
                      </span>
                    </div>
                  </div>
                  {/* After */}
                  <div className="relative overflow-hidden border-l-2 border-white">
                    <Image
                      src={item.after}
                      alt={`После — ${item.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                    />
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="inline-block bg-dental-teal/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        После
                      </span>
                    </div>
                  </div>
                </div>
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
              </div>
            </div>
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
