import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MessageSquare, Star, Briefcase, Users, LayoutDashboard, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Panel | Dr. Hydyrov Arslan",
  description: "Управление записями, отзывами и контентом",
};

const navItems = [
  { href: "/admin", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Записи", icon: Calendar },
  { href: "/admin/reviews", label: "Отзывы", icon: Star },
  { href: "/admin/portfolio", label: "Портфолио", icon: Briefcase },
  { href: "/admin/messages", label: "Сообщения", icon: MessageSquare },
  { href: "/admin/users", label: "Пациенты", icon: Users },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-dental-teal">
                🦷 Dental Admin
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">admin@hydyrov-dental.com</span>
              <Link 
                href="/" 
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Выйти на сайт →
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
