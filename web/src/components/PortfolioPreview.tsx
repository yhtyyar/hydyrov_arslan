import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";

const portfolioItems = [
  { id: "1", title: "Виниры E-Max", category: "Эстетика", description: "Полная реставрация зоны улыбки" },
  { id: "2", title: "Имплантация", category: "Хирургия", description: "Восстановление жевательных зубов" },
  { id: "3", title: "Отбеливание", category: "Эстетика", description: "Профессиональное отбеливание ZOOM" },
];

export function PortfolioPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Наши работы
            </h2>
            <p className="mt-3 text-gray-500">
              Реальные результаты лечения наших пациентов
            </p>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-dental-teal hover:underline"
          >
            Все работы <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-xs text-gray-400">До / После</p>
                </div>
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-teal-50 px-3 py-0.5 text-xs font-medium text-dental-teal">
                  {item.category}
                </span>
                <h3 className="mt-2 text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-sm font-medium text-dental-teal hover:underline"
          >
            Все работы <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
