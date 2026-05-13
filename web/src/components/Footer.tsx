import Link from "next/link";
import { Phone, Clock, Send } from "lucide-react";

function VkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.136.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dental-teal text-white font-bold text-lg shadow-lg">
                А
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Арслан Хыдыров
                </p>
                <p className="text-xs text-gray-400">Врач-стоматолог</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Современные методы лечения, индивидуальный подход к каждому
              пациенту. Ваша улыбка — наша забота.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://t.me/arsstomat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-sky-500 hover:text-white transition-all"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="https://vk.ru/id379037016"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-[#0077FF] hover:text-white transition-all"
                aria-label="ВКонтакте"
              >
                <VkIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Навигация
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Услуги", href: "#services" },
                { name: "Портфолио", href: "/portfolio" },
                { name: "Отзывы", href: "/reviews" },
                { name: "Контакты", href: "#contacts" },
                { name: "Записаться", href: "/booking" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-dental-teal transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Услуги
            </h3>
            <ul className="space-y-2.5">
              {[
                "Лечение кариеса",
                "Имплантация",
                "Циркониевые коронки",
                "Микропротезирование",
                "Съёмные протезы",
                "Профессиональная чистка",
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Контакты
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+79050092127"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-dental-teal transition-colors"
                >
                  <Phone className="h-4 w-4 text-dental-teal shrink-0" />
                  +7 905 009-21-27
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/arsstomat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-sky-400 transition-colors"
                >
                  <Send className="h-4 w-4 text-sky-400 shrink-0" />
                  @arsstomat
                </a>
              </li>
              <li>
                <a
                  href="https://vk.ru/id379037016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#0077FF] transition-colors"
                >
                  <VkIcon className="h-4 w-4 text-[#0077FF] shrink-0" />
                  ВКонтакте
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4 text-dental-teal shrink-0 mt-0.5" />
                <span>
                  Пн–Пт: 9:00–19:00<br />
                  Сб: 9:00–15:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Арслан Хыдыров. Все права защищены.
          </p>
          <p className="text-xs text-gray-600">
            Профессиональная стоматология
          </p>
        </div>
      </div>
    </footer>
  );
}
