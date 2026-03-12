import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contacts" className="py-20 bg-dental-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Контакты
          </h2>
          <p className="mt-3 text-gray-500">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-dental-teal">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Телефон</h3>
                <a href="tel:+998901234567" className="text-sm text-gray-500 hover:text-dental-teal">
                  +998 90 123 45 67
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-dental-teal">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Telegram / WhatsApp</h3>
                <p className="text-sm text-gray-500">+998 90 123 45 67</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-dental-teal">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Email</h3>
                <a href="mailto:info@hydyrov-dental.com" className="text-sm text-gray-500 hover:text-dental-teal">
                  info@hydyrov-dental.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-dental-teal">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Адрес</h3>
                <p className="text-sm text-gray-500">г. Ташкент, ул. Примерная 1</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-dental-teal">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Режим работы</h3>
                <p className="text-sm text-gray-500">Пн-Сб: 9:00 — 18:00</p>
                <p className="text-sm text-gray-500">Вс: выходной</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-2 shadow-sm overflow-hidden">
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm text-gray-400">Карта</p>
                <p className="text-xs text-gray-300 mt-1">
                  Интегрируйте Google Maps / Яндекс Карты
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
