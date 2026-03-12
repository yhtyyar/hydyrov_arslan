import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

const reviews = [
  {
    id: "1",
    name: "Алина М.",
    rating: 5,
    text: "Отличный врач! Очень аккуратно и безболезненно. Результат превзошёл ожидания. Рекомендую всем!",
    date: "2 недели назад",
  },
  {
    id: "2",
    name: "Тимур К.",
    rating: 5,
    text: "Делал виниры у доктора Арслана. Качество на высшем уровне. Очень доволен результатом.",
    date: "1 месяц назад",
  },
  {
    id: "3",
    name: "Диана Р.",
    rating: 5,
    text: "Профессионал своего дела. Всё объяснил, показал план лечения. Никакой боли. Спасибо!",
    date: "2 месяца назад",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsPreview() {
  return (
    <section className="py-20 bg-dental-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Отзывы пациентов
            </h2>
            <p className="mt-3 text-gray-500">
              Что говорят наши пациенты о лечении
            </p>
          </div>
          <Link
            href="/reviews"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-dental-teal hover:underline"
          >
            Все отзывы <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <StarRating rating={review.rating} />
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {review.name}
                </p>
                <p className="text-xs text-gray-400">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
