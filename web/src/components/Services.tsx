"use client";

import { Crown, HeartPulse, Wrench, Sparkles, Smile } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Wrench,
    name: "Лечение кариеса",
    description: "Диагностика и лечение кариеса любой сложности. Световые пломбы, эстетическая реставрация, безболезненная анестезия.",
    color: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    icon: HeartPulse,
    name: "Имплантация",
    description: "Восстановление утраченных зубов на дентальных имплантах. Долгосрочный результат, современные материалы.",
    color: "bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white",
  },
  {
    icon: Crown,
    name: "Циркониевые коронки",
    description: "Безметалловые коронки из диоксида циркония — максимальная эстетика и прочность, точное прилегание.",
    color: "bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white",
  },
  {
    icon: Smile,
    name: "Микропротезирование (Table Tops)",
    description: "Керамические накладки Table Tops для восстановления высоты и формы зубов с минимальным препарированием.",
    color: "bg-teal-50 text-dental-teal group-hover:bg-dental-teal group-hover:text-white",
  },
  {
    icon: Crown,
    name: "Съёмные протезы",
    description: "Изготовление качественных съёмных протезов: полных, частичных, бюгельных — под анатомию пациента.",
    color: "bg-purple-50 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
  },
  {
    icon: Sparkles,
    name: "Профессиональная чистка",
    description: "Ультразвуковая чистка, AirFlow, полировка — удаление камня и налёта для здоровья дёсен и свежего дыхания.",
    color: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-dental-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-medium text-dental-teal mb-2 uppercase tracking-wider">
            Что мы лечим
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Наши услуги
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Полный спектр стоматологических услуг с современным оборудованием
            и безболезненной анестезией
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="group rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-transparent"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${service.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Не нашли нужную услугу? Свяжитесь с нами — мы ответим на все вопросы
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+79050092127"
              className="rounded-xl bg-dental-teal px-6 py-3 text-sm font-semibold text-white shadow hover:bg-teal-700 transition-all"
            >
              +7 905 009-21-27
            </a>
            <Link
              href="/booking"
              className="rounded-xl border-2 border-dental-teal px-6 py-3 text-sm font-semibold text-dental-teal hover:bg-dental-teal hover:text-white transition-all"
            >
              Записаться онлайн
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
