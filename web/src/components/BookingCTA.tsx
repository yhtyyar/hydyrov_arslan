import Link from "next/link";
import { CalendarDays, Clock, Shield, Phone } from "lucide-react";

export function BookingCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-dental-teal via-teal-600 to-teal-800 px-8 py-16 text-center text-white shadow-2xl shadow-teal-500/20 sm:px-16 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <span className="inline-block text-sm font-medium text-teal-200 mb-3 uppercase tracking-wider">
              Запись онлайн
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Запишитесь на приём
            </h2>
            <p className="mt-4 text-lg text-teal-100 max-w-2xl mx-auto">
              Выберите удобное время. Первичная консультация — бесплатно.
              Мы подтвердим запись в течение 15 минут.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-teal-100">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-teal-300" />
                Удобный выбор даты
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-teal-300" />
                Подтверждение за 15 мин
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-300" />
                Без предоплаты
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/booking"
                className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-dental-teal shadow-lg hover:bg-gray-50 hover:-translate-y-0.5 transition-all"
              >
                Выбрать время онлайн
              </Link>
              <a
                href="tel:+79050092127"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/50 bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 hover:-translate-y-0.5 transition-all"
              >
                <Phone className="h-4 w-4" />
                +7 905 009-21-27
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
