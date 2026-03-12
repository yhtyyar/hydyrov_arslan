import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Dr. Hydyrov Arslan — Профессиональная стоматология",
  description:
    "Профессиональный стоматолог с многолетним опытом. Современные методы лечения, эстетическая стоматология, имплантация. Запишитесь на приём онлайн.",
  keywords: [
    "стоматолог",
    "стоматология",
    "записаться к стоматологу",
    "имплантация зубов",
    "виниры",
    "Хыдыров Арслан",
  ],
  openGraph: {
    title: "Dr. Hydyrov Arslan — Профессиональная стоматология",
    description:
      "Запишитесь на приём онлайн. Современные методы лечения, доступные цены.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
