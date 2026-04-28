"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ArrowRight, User } from "lucide-react";
import { ReviewCardSkeleton } from "@/components/ui/Skeleton";

interface Review {
  id: string;
  rating: number;
  text: string;
  userName: string;
  createdAt: string;
}

// Fallback reviews when API is not available
const fallbackReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    text: "Отличный врач! Очень аккуратно и безболезненно. Результат превзошёл ожидания. Рекомендую всем!",
    userName: "Алина М.",
    createdAt: "2024-12-15",
  },
  {
    id: "2",
    rating: 5,
    text: "Делал виниры у доктора Арслана. Качество на высшем уровне. Очень доволен результатом.",
    userName: "Тимур К.",
    createdAt: "2024-11-20",
  },
  {
    id: "3",
    rating: 5,
    text: "Профессионал своего дела. Всё объяснил, показал план лечения. Никакой боли. Спасибо!",
    userName: "Диана Р.",
    createdAt: "2024-10-05",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 7) return "На этой неделе";
  if (diffDays < 14) return "1 неделю назад";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} недели назад`;
  if (diffDays < 60) return "1 месяц назад";
  return `${Math.floor(diffDays / 30)} месяцев назад`;
}

// Avatar placeholder with initials
function AvatarPlaceholder({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  const colors = ["bg-teal-100 text-teal-700", "bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700"];
  const colorClass = colors[name.length % colors.length];
  
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${colorClass}`}>
      {initial}
    </div>
  );
}

export function ReviewsPreview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/reviews?limit=3");
        const data = await res.json();
        if (data.success && data.data?.length > 0) {
          setReviews(data.data.slice(0, 3));
        } else {
          setReviews(fallbackReviews);
        }
      } catch {
        setReviews(fallbackReviews);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;
  const averageRating = displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length;

  return (
    <section className="py-20 bg-dental-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Отзывы пациентов
            </h2>
            <p className="mt-3 text-gray-500">
              Что говорят наши пациенты о лечении
            </p>
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-lg font-semibold text-gray-900">{averageRating.toFixed(1)}</span>
              <span className="text-sm text-gray-500">({displayReviews.length} отзывов)</span>
            </div>
          </div>
          <Link
            href="/reviews"
            className="flex items-center gap-1 text-sm font-medium text-dental-teal hover:underline"
          >
            Все отзывы <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <StarRating rating={review.rating} />
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3 border-t pt-4">
                  <AvatarPlaceholder name={review.userName} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {review.userName}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
