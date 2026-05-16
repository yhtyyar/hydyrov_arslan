import Link from "next/link";
import Image from "next/image";
import { Shield, Award, Users, Star, Phone } from "lucide-react";

const stats = [
  { icon: Users, label: "Довольных пациентов", value: "500+" },
  { icon: Award, label: "Лет опыта", value: "7+" },
  { icon: Star, label: "Средний рейтинг", value: "4.9" },
  { icon: Shield, label: "Гарантия качества", value: "100%" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50/40 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-4 py-1.5 text-sm text-dental-teal mb-6 shadow-sm">
              <Shield className="h-4 w-4" />
              Профессиональная стоматология
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
              Ваша{" "}
              <span className="text-dental-teal">идеальная улыбка</span>{" "}
              начинается здесь
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              Доктор Арслан Хыдыров — стоматолог с 7-летним опытом. Индивидуальный
              подход, современное оборудование, безболезненное лечение и гарантия
              результата.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:+79050092127"
                className="inline-flex items-center gap-2 rounded-xl bg-dental-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" />
                +7 905 009-21-27
              </a>
              <span className="inline-flex items-center gap-2 rounded-xl border-2 border-dental-teal bg-white px-7 py-3.5 text-base font-semibold text-dental-teal">
                Бесплатная консультация
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {["А", "М", "Д", "Н"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">500+</span> пациентов
                доверяют нам свою улыбку
              </p>
            </div>
          </div>

          {/* Right: Doctor photo */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white">
              <Image
                src="./images/doctor.jpg"
                alt="Арслан Хыдыров — стоматолог"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-semibold text-lg drop-shadow-lg">
                  Арслан Хыдыров
                </p>
                <p className="text-white/80 text-sm drop-shadow">
                  Врач-стоматолог · 7 лет практики
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow" />
                  ))}
                  <span className="text-white/90 text-sm ml-1 drop-shadow">4.9</span>
                </div>
              </div>
            </div>

            {/* Floating badge — experience */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-dental-teal flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">7+</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Лет опыта</p>
                <p className="text-xs text-gray-500">500+ пациентов</p>
              </div>
            </div>

            {/* Floating badge — guarantee */}
            <div className="absolute -top-4 -right-4 bg-dental-teal rounded-2xl shadow-xl p-4 text-white border border-teal-600">
              <Shield className="h-6 w-6 mb-1" />
              <p className="text-xs font-bold">Гарантия</p>
              <p className="text-xs opacity-80">качества</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border bg-white/80 backdrop-blur-sm p-5 text-center shadow-sm hover:shadow-md transition-shadow"
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
