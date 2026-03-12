"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navigation = [
  { name: "Услуги", href: "#services" },
  { name: "Портфолио", href: "/portfolio" },
  { name: "Отзывы", href: "/reviews" },
  { name: "Контакты", href: "#contacts" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-dental-teal text-white font-bold text-lg">
            H
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              Dr. Hydyrov Arslan
            </p>
            <p className="text-xs text-gray-500">Стоматолог</p>
          </div>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-dental-teal"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+998901234567"
            className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-dental-teal transition-colors"
          >
            <Phone className="h-4 w-4" />
            +998 90 123 45 67
          </a>
          <Link
            href="/booking"
            className="rounded-lg bg-dental-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-dental-teal/90"
          >
            Записаться
          </Link>
          <button
            type="button"
            className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-sm font-medium text-gray-600 hover:text-dental-teal"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
