import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-dental-teal text-white font-bold text-lg">
                H
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Dr. Hydyrov Arslan
                </p>
                <p className="text-xs text-gray-500">
                  Профессиональная стоматология
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Современные методы лечения, индивидуальный подход к каждому
              пациенту. Ваша улыбка — наша забота.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Навигация
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Услуги", href: "#services" },
                { name: "Портфолио", href: "/portfolio" },
                { name: "Отзывы", href: "/reviews" },
                { name: "Записаться", href: "/booking" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-dental-teal transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Контакты
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="h-4 w-4 text-dental-teal" />
                +998 90 123 45 67
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4 text-dental-teal" />
                info@hydyrov-dental.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 text-dental-teal" />
                г. Ташкент, ул. Примерная 1
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4 text-dental-teal" />
                Пн-Сб: 9:00 — 18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Dr. Hydyrov Arslan. Все права
          защищены.
        </div>
      </div>
    </footer>
  );
}
