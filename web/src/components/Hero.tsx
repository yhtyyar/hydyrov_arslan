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
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-teal-100 via-teal-50 to-white shadow-2xl ring-4 ring-white">
              {/* Doctor photo placeholder with gradient */}
              <div className="flex h-full items-center justify-center relative">
                {/* Decorative circles */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-teal-200/40 rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl" />
                
                <div className="text-center p-8 relative z-10">
                  {/* Avatar circle */}
                  <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-dental-teal to-teal-600 shadow-xl">
                    <span className="text-5xl">👨‍⚕️</span>
                  </div>
                  <p className="text-base font-medium text-gray-700">
                    Dr. Hydyrov Arslan
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Главный врач · Стоматолог
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">⭐</span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">4.9</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full inline-block">
                    🖼️ Замените на профессиональное фото
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">7+</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">Лет опыта</p>
                <p className="text-[10px] text-gray-500">500+ пациентов</p>
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
