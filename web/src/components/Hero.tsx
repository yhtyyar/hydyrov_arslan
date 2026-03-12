import Link from "next/link";
import { Shield, Award, Users, Star } from "lucide-react";

const stats = [
  { icon: Users, label: "Довольных пациентов", value: "500+" },
  { icon: Award, label: "Лет опыта", value: "7+" },
  { icon: Star, label: "Средний рейтинг", value: "4.9" },
  { icon: Shield, label: "Гарантия качества", value: "100%" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50/30 to-white">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-sm text-dental-teal mb-6">
              <Shield className="h-4 w-4" />
              Профессиональная стоматология
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Ваша{" "}
              <span className="text-dental-teal">идеальная улыбка</span>{" "}
              начинается здесь
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Доктор Хыдыров Арслан — опытный стоматолог с индивидуальным
              подходом к каждому пациенту. Современное оборудование,
              безболезненное лечение, гарантия результата.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="rounded-lg bg-dental-teal px-6 py-3 text-base font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-dental-teal/90 hover:shadow-xl hover:shadow-teal-500/30"
              >
                Записаться на приём
              </Link>
              <Link
                href="/portfolio"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Посмотреть работы
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 shadow-2xl">
              <div className="flex h-full items-center justify-center">
                <div className="text-center p-8">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-dental-teal/10">
                    <Award className="h-10 w-10 text-dental-teal" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Фото доктора
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Замените на профессиональное фото
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border bg-white p-5 text-center shadow-sm"
            >
              <stat.icon className="mx-auto h-6 w-6 text-dental-teal mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
