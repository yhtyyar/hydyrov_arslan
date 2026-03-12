# Hydyrov Arslan — Dental Digital Ecosystem

Цифровая экосистема для частного стоматолога **Хыдырова Арслана**: веб-платформа (лендинг + админ-панель) и мобильное приложение (Android).

---

## 🏗 Архитектурное решение

### Почему Custom Development, а не WordPress?

| Критерий | WordPress | Custom (Next.js) |
|---|---|---|
| Реальное время (слоты) | ❌ Медленный REST API, нет WebSocket | ✅ Server Actions, API Routes |
| Двойное бронирование | ❌ Нет транзакций в WP | ✅ PostgreSQL + оптимистичная блокировка |
| Мобильная синхронизация | ⚠️ Тяжёлый JSON | ✅ Единый API для Web + Mobile |
| 152-ФЗ / Безопасность | ⚠️ Плагины с уязвимостями | ✅ Полный контроль, шифрование |
| Кастомная админка | ❌ Ограничения WP-admin | ✅ Полностью кастомный UI |
| Масштабируемость | ❌ Монолит | ✅ Горизонтальное масштабирование |

**Вывод:** Custom Development на базе Next.js — оптимальный выбор по соотношению цена/качество/скорость при требованиях к реальному времени и мобильной синхронизации.

### Стек технологий

| Слой | Технология | Обоснование |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | SSR/SSG для SEO, Server Components |
| **UI** | TailwindCSS + shadcn/ui | Быстрая разработка, консистентный дизайн |
| **Backend** | Next.js API Routes | Единый деплой, TypeScript end-to-end |
| **ORM** | Prisma | Type-safe запросы, миграции |
| **Database** | PostgreSQL | ACID-транзакции (критично для бронирования) |
| **Auth** | NextAuth.js | OAuth + Credentials, сессии в БД |
| **Mobile** | Flutter | Один код → Android + iOS, нативная производительность |
| **Deploy** | Vercel + Supabase | Бесплатный tier для MVP, автоматический CI/CD |

### Синхронизация Web ↔ Mobile

```
┌─────────────┐     ┌─────────────┐
│   Next.js   │     │   Flutter   │
│  (Web App)  │     │ (Mobile)    │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └───────┬───────────┘
               │
       ┌───────▼───────┐
       │  REST API      │
       │  /api/*        │
       └───────┬───────┘
               │
       ┌───────▼───────┐
       │  PostgreSQL    │
       │  (Единая БД)  │
       └───────────────┘
```

Оба клиента (Web и Mobile) работают с **единым REST API**. Next.js API Routes выступают как Backend-for-Frontend (BFF).

---

## 📁 Структура проекта

```
hydyrov_arslan/
├── web/                    # Next.js веб-приложение
│   ├── prisma/             # Схема БД и миграции
│   ├── src/
│   │   ├── app/            # App Router (страницы + API)
│   │   ├── components/     # React-компоненты
│   │   ├── lib/            # Утилиты, Prisma клиент
│   │   └── types/          # TypeScript типы
│   └── public/             # Статика (изображения)
├── mobile/                 # Flutter мобильное приложение
├── docs/                   # Документация
│   ├── ROADMAP.md          # План разработки
│   ├── DATABASE.md         # Схема БД
│   └── UX_GUIDELINES.md   # UX/UI рекомендации
└── README.md
```

## 🚀 Быстрый старт

### Web-приложение

```bash
cd web
npm install
cp .env.example .env.local   # Настрой переменные окружения
npx prisma generate
npx prisma db push
npm run dev
```

### Mobile-приложение

```bash
cd mobile
flutter pub get
flutter run
```

---

## 📄 Лицензия

Proprietary. © 2026 Hydyrov Arslan. All rights reserved.
