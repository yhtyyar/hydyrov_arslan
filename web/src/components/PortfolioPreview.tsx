"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PortfolioCardSkeleton } from "@/components/ui/Skeleton";

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  beforeImage?: string;
  afterImage?: string;
}

// Генерация красивых градиентов для заглушек (до/после)
function getGradientStyle(index: number, isAfter: boolean = false) {
  const gradients = [
    ["#e0f2fe", "#bae6fd", "#7dd3fc"], // голубой
    ["#f0fdf4", "#bbf7d0", "#86efac"], // зеленый
    ["#fdf4ff", "#f0abfc", "#e879f9"], // розовый
    ["#fff7ed", "#fed7aa", "#fdba74"], // оранжевый
  ];
  const colors = gradients[index % gradients.length];
  if (isAfter) {
    return { background: `linear-gradient(135deg, ${colors[1]} 0%, ${colors[2]} 100%)` };
  }
  return { background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)` };
}

// Компонент заглушки изображения с Before/After
function ImagePlaceholder({ title, category, index }: { title: string; category: string; index: number }) {
  return (
    <div className="aspect-[4/3] relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative flex flex-col items-center justify-center" style={getGradientStyle(index, false)}>
          <span className="text-xs font-medium text-gray-500/60 uppercase tracking-wider">До</span>
          <div className="mt-2 w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <span className="text-2xl">🦷</span>
          </div>
          <p className="mt-2 text-[10px] text-gray-500/60 text-center px-2">Пример работы</p>
        </div>
        <div className="relative flex flex-col items-center justify-center" style={getGradientStyle(index, true)}>
          <span className="text-xs font-medium text-teal-700/60 uppercase tracking-wider">После</span>
          <div className="mt-2 w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-teal-600" />
          </div>
          <p className="mt-2 text-[10px] text-teal-700/60 text-center px-2">Результат</p>
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <span className="inline-block rounded-full bg-white/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-gray-600">
          {category}
        </span>
      </div>
    </div>
  );
}

// Fallback данные
const fallbackItems: PortfolioItem[] = [
  { id: "1", title: "Виниры E-Max", category: "Эстетика", description: "Полная реставрация зоны улыбки" },
  { id: "2", title: "Имплантация", category: "Хирургия", description: "Восстановление жевательных зубов" },
  { id: "3", title: "Отбеливание ZOOM", category: "Эстетика", description: "Профессиональное отбеливание" },
];

export function PortfolioPreview() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/portfolio?limit=3");
        const data = await res.json();
        if (data.success && data.data?.length > 0) {
          setItems(data.data.slice(0, 3));
        } else {
          setItems(fallbackItems);
        }
      } catch {
        setError("Не удалось загрузить портфолио");
        setItems(fallbackItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const displayItems = items.length > 0 ? items : fallbackItems;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Наши работы
            </h2>
            <p className="mt-3 text-gray-500">
              Реальные результаты лечения наших пациентов
            </p>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-dental-teal hover:underline"
          >
            Все работы <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <PortfolioCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayItems.map((item, index) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
              >
                <ImagePlaceholder title={item.title} category={item.category} index={index} />
                <div className="p-5">
                  <span className="inline-block rounded-full bg-teal-50 px-3 py-0.5 text-xs font-medium text-dental-teal">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-sm font-medium text-dental-teal hover:underline"
          >
            Все работы <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
