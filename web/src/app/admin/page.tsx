"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MessageSquare, Star, Users, TrendingUp, Clock } from "lucide-react";

interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  todayAppointments: number;
  totalReviews: number;
  unreadMessages: number;
  totalPatients: number;
}

interface RecentAppointment {
  id: string;
  patientName: string;
  service: string;
  date: string;
  time: string;
  status: string;
}

// Fallback stats data
const fallbackStats: DashboardStats = {
  totalAppointments: 156,
  pendingAppointments: 12,
  todayAppointments: 4,
  totalReviews: 48,
  unreadMessages: 3,
  totalPatients: 89,
};

const fallbackRecentAppointments: RecentAppointment[] = [
  { id: "1", patientName: "Алина М.", service: "Консультация", date: "Сегодня", time: "14:00", status: "CONFIRMED" },
  { id: "2", patientName: "Тимур К.", service: "Лечение кариеса", date: "Сегодня", time: "15:30", status: "PENDING" },
  { id: "3", patientName: "Диана Р.", service: "Проф. чистка", date: "Завтра", time: "10:00", status: "CONFIRMED" },
  { id: "4", patientName: "Андрей Л.", service: "Отбеливание", date: "Завтра", time: "16:00", status: "PENDING" },
];

function StatCard({ title, value, icon: Icon, trend, color }: { 
  title: string; 
  value: number; 
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {trend}
            </p>
          )}
        </div>
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    CONFIRMED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
    COMPLETED: "bg-blue-100 text-blue-700",
  };
  const labels: Record<string, string> = {
    CONFIRMED: "Подтверждено",
    PENDING: "Ожидает",
    CANCELLED: "Отменено",
    COMPLETED: "Завершено",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-700"}`}>
      {labels[status] || status}
    </span>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(fallbackStats);
  const [recentAppointments, setRecentAppointments] = useState<RecentAppointment[]>(fallbackRecentAppointments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API calls
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        // In production, fetch from:
        // - GET /api/admin/stats
        // - GET /api/admin/appointments?limit=5
        setStats(fallbackStats);
        setRecentAppointments(fallbackRecentAppointments);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
        <p className="text-sm text-gray-500">Обзор клиники и статистика</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Всего записей"
          value={stats.totalAppointments}
          icon={Calendar}
          trend="+12% за месяц"
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Ожидают подтверждения"
          value={stats.pendingAppointments}
          icon={Clock}
          color="bg-yellow-50 text-yellow-600"
        />
        <StatCard
          title="Записи на сегодня"
          value={stats.todayAppointments}
          icon={Calendar}
          color="bg-green-50 text-green-600"
        />
        <StatCard
          title="Всего отзывов"
          value={stats.totalReviews}
          icon={Star}
          trend="+5 новых"
          color="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Новых сообщений"
          value={stats.unreadMessages}
          icon={MessageSquare}
          color="bg-orange-50 text-orange-600"
        />
        <StatCard
          title="Пациентов"
          value={stats.totalPatients}
          icon={Users}
          trend="+8 за неделю"
          color="bg-teal-50 text-teal-600"
        />
      </div>

      {/* Recent Appointments */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Ближайшие записи</h2>
          <Link 
            href="/admin/appointments" 
            className="text-sm font-medium text-dental-teal hover:underline"
          >
            Все записи →
          </Link>
        </div>
        <div className="divide-y">
          {recentAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
                  <span className="text-sm font-medium text-dental-teal">
                    {appointment.patientName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{appointment.patientName}</p>
                  <p className="text-xs text-gray-500">{appointment.service}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                  <p className="text-xs text-gray-500">{appointment.date}</p>
                </div>
                <StatusBadge status={appointment.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link 
          href="/admin/appointments"
          className="flex items-center gap-4 rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Управление записями</p>
            <p className="text-sm text-gray-500">Подтверждение и редактирование</p>
          </div>
        </Link>
        <Link 
          href="/admin/reviews"
          className="flex items-center gap-4 rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50">
            <Star className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Модерация отзывов</p>
            <p className="text-sm text-gray-500">{stats.unreadMessages} отзывов ожидают</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
