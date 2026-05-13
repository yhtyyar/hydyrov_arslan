import { Phone, MapPin, Clock, Send } from "lucide-react";

function VkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.136.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <section id="contacts" className="py-20 bg-dental-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-medium text-dental-teal mb-2 uppercase tracking-wider">
            Связаться с нами
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Контакты
          </h2>
          <p className="mt-3 text-gray-500">
            Запишитесь на приём любым удобным способом
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact cards */}
          <div className="space-y-4">
            {/* Phone */}
            <a
              href="tel:+79050092127"
              className="flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md hover:border-dental-teal/30 transition-all group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-dental-teal group-hover:bg-dental-teal group-hover:text-white transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Телефон</h3>
                <p className="text-base font-medium text-dental-teal mt-0.5">
                  +7 905 009-21-27
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Звонки и WhatsApp</p>
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/arsstomat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md hover:border-dental-teal/30 transition-all group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Telegram</h3>
                <p className="text-base font-medium text-sky-500 mt-0.5">
                  @arsstomat
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Быстрые ответы в мессенджере</p>
              </div>
            </a>

            {/* VK */}
            <a
              href="https://vk.ru/id379037016"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md hover:border-[#0077FF]/30 transition-all group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0077FF] group-hover:bg-[#0077FF] group-hover:text-white transition-colors">
                <VkIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">ВКонтакте</h3>
                <p className="text-base font-medium text-[#0077FF] mt-0.5">
                  vk.ru/id379037016
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Записи и отзывы пациентов</p>
              </div>
            </a>

            {/* Working hours */}
            <div className="flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Режим работы</h3>
                <div className="mt-1 space-y-0.5">
                  <p className="text-sm text-gray-600">Пн–Пт: 9:00 — 19:00</p>
                  <p className="text-sm text-gray-600">Сб: 9:00 — 15:00</p>
                  <p className="text-sm text-gray-400">Вс: выходной</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA panel */}
          <div className="rounded-2xl bg-gradient-to-br from-dental-teal to-teal-700 p-8 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 mb-6">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Запишитесь прямо сейчас</h3>
              <p className="mt-3 text-teal-100 leading-relaxed">
                Оставьте заявку, и мы свяжемся с вами в течение 15 минут,
                чтобы подобрать удобное время для визита.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Бесплатная консультация",
                  "Составим план лечения",
                  "Подберём удобное время",
                  "Безболезненное лечение",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-teal-50 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-white text-xs">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+79050092127"
                className="flex-1 rounded-xl bg-white py-3 text-center text-sm font-semibold text-dental-teal shadow hover:bg-gray-50 transition-all"
              >
                Позвонить
              </a>
              <a
                href="https://t.me/arsstomat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl border-2 border-white py-3 text-center text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
