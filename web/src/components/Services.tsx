"use client";

import { useState, useEffect } from "react";
import { Sparkles, Wrench, Crown, Stethoscope, HeartPulse, Smile, Loader2 } from "lucide-react";
import { ServiceCardSkeleton } from "@/components/ui/Skeleton";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Терапия": Wrench,
  "Лечение кариеса": Wrench,
  "Лечение пульпита": Wrench,
  "Ортопедия": Crown,
  "Коронка металлокерамика": Crown,
  "Виниры E-Max": Crown,
  "Хирургия": HeartPulse,
  "Имплантация": HeartPulse,
  "Удаление зуба": HeartPulse,
  "Отбеливание": Sparkles,
  "Отбеливание ZOOM": Sparkles,
  "Профилактика": Stethoscope,
  "Профессиональная чистка": Stethoscope,
  "Эстетика": Smile,
  "Эстетическая стоматология": Smile,
  "Общее": Stethoscope,
  "Консультация": Stethoscope,
};

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: string;
  duration: number;
  category: string;
}

function getIconForService(name: string, category: string) {
  return iconMap[name] || iconMap[category] || Stethoscope;
}

function formatPrice(price: string) {
  const num = parseFloat(price);
  if (num === 0) return "Бесплатно";
  return `от ${num.toLocaleString("ru-RU")} сум`;
}

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/services");
        const data = await res.json();
        if (data.success) {
          setServices(data.data);
        } else {
          setError("Не удалось загрузить услуги");
        }
      } catch {
        setError("Ошибка загрузки услуг");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Fallback mock data if API fails
  const fallbackServices: Service[] = [
    { id: "1", name: "Терапия", description: "Лечение кариеса, пульпита, периодонтита", price: "200000", duration: 60, category: "Терапия" },
    { id: "2", name: "Ортопедия", description: "Коронки, мосты, виниры", price: "800000", duration: 60, category: "Ортопедия" },
    { id: "3", name: "Хирургия", description: "Удаление, имплантация", price: "300000", duration: 30, category: "Хирургия" },
    { id: "4", name: "Отбеливание", description: "Профессиональное отбеливание", price: "500000", duration: 60, category: "Эстетика" },
    { id: "5", name: "Профилактика", description: "Чистка, фторирование", price: "150000", duration: 45, category: "Профилактика" },
    { id: "6", name: "Эстетика", description: "Виниры, реставрация", price: "1000000", duration: 90, category: "Эстетика" },
  ];

  const displayServices = services.length > 0 ? services : (error ? fallbackServices : []);

  return (
    <section id="services" className="py-20 bg-dental-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Наши услуги
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Полный спектр стоматологических услуг с использованием современного оборудования и материалов
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayServices.map((service) => {
              const Icon = getIconForService(service.name, service.category);
              return (
                <div
                  key={service.id}
                  className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-dental-teal/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-dental-teal transition-colors group-hover:bg-dental-teal group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {service.description || "Профессиональное стоматологическое лечение"}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-dental-teal">
                      {formatPrice(service.price)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {service.duration} мин
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {error && services.length === 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Показаны примеры услуг. Для актуальных цен звоните по телефону.</p>
          </div>
        )}
      </div>
    </section>
  );
}
