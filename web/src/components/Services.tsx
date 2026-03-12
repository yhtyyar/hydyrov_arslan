import { Sparkles, Wrench, Crown, Stethoscope, HeartPulse, Smile } from "lucide-react";

const services = [
  {
    icon: Wrench,
    name: "Терапия",
    description: "Лечение кариеса, пульпита, периодонтита. Современные пломбировочные материалы.",
    price: "от 200 000 сум",
  },
  {
    icon: Crown,
    name: "Ортопедия",
    description: "Коронки, мосты, виниры. Восстановление жевательной функции и эстетики.",
    price: "от 800 000 сум",
  },
  {
    icon: HeartPulse,
    name: "Хирургия",
    description: "Удаление зубов, имплантация, костная пластика. Безболезненно.",
    price: "от 300 000 сум",
  },
  {
    icon: Sparkles,
    name: "Отбеливание",
    description: "Профессиональное отбеливание зубов. Безопасно, эффективно, быстро.",
    price: "от 500 000 сум",
  },
  {
    icon: Stethoscope,
    name: "Профилактика",
    description: "Профессиональная чистка, реминерализация, фторирование.",
    price: "от 150 000 сум",
  },
  {
    icon: Smile,
    name: "Эстетическая стоматология",
    description: "Виниры, люминиры, художественная реставрация. Голливудская улыбка.",
    price: "от 1 000 000 сум",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-dental-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Наши услуги
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Полный спектр стоматологических услуг с использованием современного оборудования и материалов
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-dental-teal/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-dental-teal transition-colors group-hover:bg-dental-teal group-hover:text-white">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {service.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-dental-teal">
                {service.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
