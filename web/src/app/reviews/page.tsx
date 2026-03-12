"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";

const mockReviews = [
  { id: "1", name: "Алина М.", rating: 5, text: "Отличный врач! Очень аккуратно и безболезненно. Результат превзошёл ожидания.", date: "2 недели назад" },
  { id: "2", name: "Тимур К.", rating: 5, text: "Делал виниры у доктора Арслана. Качество на высшем уровне. Очень доволен результатом.", date: "1 месяц назад" },
  { id: "3", name: "Диана Р.", rating: 5, text: "Профессионал своего дела. Всё объяснил, показал план лечения. Никакой боли.", date: "2 месяца назад" },
  { id: "4", name: "Андрей Л.", rating: 4, text: "Хороший специалист. Делал чистку и лечение. Всё прошло отлично, рекомендую.", date: "3 месяца назад" },
  { id: "5", name: "Камила Н.", rating: 5, text: "Лучший стоматолог! Наконец-то не боюсь ходить к зубному. Спасибо огромное!", date: "4 месяца назад" },
];

function StarRating({ rating, interactive, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          onClick={() => interactive && onRate?.(i + 1)}
          className={`h-5 w-5 ${interactive ? "cursor-pointer" : ""} ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formRating, setFormRating] = useState(0);
  const [formText, setFormText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const averageRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Отзывы пациентов</h1>
        <div className="mt-4 flex items-center justify-center gap-3">
          <StarRating rating={Math.round(Number(averageRating))} />
          <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
          <span className="text-sm text-gray-500">({mockReviews.length} отзывов)</span>
        </div>
      </div>

      <div className="mb-8 text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-dental-teal px-6 py-2.5 text-sm font-medium text-white hover:bg-dental-teal/90 transition-colors"
        >
          Оставить отзыв
        </button>
      </div>

      {showForm && !submitted && (
        <div className="mb-10 rounded-xl border bg-gray-50 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Ваш отзыв</h3>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1.5">Оценка</label>
            <StarRating rating={formRating} interactive onRate={setFormRating} />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1.5">Текст отзыва</label>
            <textarea
              value={formText}
              onChange={(e) => setFormText(e.target.value)}
              placeholder="Расскажите о вашем опыте..."
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-dental-teal focus:ring-1 focus:ring-dental-teal outline-none resize-none"
            />
          </div>
          <button
            onClick={() => { setSubmitted(true); setShowForm(false); }}
            disabled={formRating === 0 || formText.length < 10}
            className="flex items-center gap-2 rounded-lg bg-dental-teal px-5 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-dental-teal/90 transition-colors"
          >
            <Send className="h-4 w-4" /> Отправить
          </button>
        </div>
      )}

      {submitted && (
        <div className="mb-10 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="text-green-700 font-medium">Спасибо за ваш отзыв! Он будет опубликован после модерации.</p>
        </div>
      )}

      <div className="space-y-4">
        {mockReviews.map((review) => (
          <div key={review.id} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <StarRating rating={review.rating} />
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <p className="text-sm font-medium text-gray-900">{review.name}</p>
              <p className="text-xs text-gray-400">{review.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
