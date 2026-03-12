import Link from "next/link";
import { CalendarDays, Clock, Shield } from "lucide-react";

export function BookingCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-dental-teal to-teal-700 px-8 py-14 text-center text-white shadow-xl sm:px-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Запишитесь на приём онлайн
          </h2>
          <p className="mt-4 text-lg text-teal-100 max-w-2xl mx-auto">
            Выберите удобное время и запишитесь в один клик.
            Мы подтвердим запись в течение 15 минут.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-teal-100">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Удобный выбор даты
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Быстрое подтверждение
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Ваши данные защищены
            </div>
          </div>

          <Link
            href="/booking"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-dental-teal shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
          >
            Выбрать время
          </Link>
        </div>
      </div>
    </section>
  );
}
