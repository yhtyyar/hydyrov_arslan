# Структура базы данных

## ER-диаграмма (основные сущности)

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│    User      │       │   Appointment    │       │   Service    │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ id           │──┐    │ id               │    ┌──│ id           │
│ email        │  │    │ userId      (FK) │◄───┘  │ name         │
│ phone        │  └───►│ serviceId   (FK) │       │ description  │
│ name         │       │ date             │       │ price        │
│ role         │       │ startTime        │       │ duration     │
│ passwordHash │       │ endTime          │       │ category     │
│ createdAt    │       │ status           │       │ isActive     │
│ updatedAt    │       │ notes            │       └──────────────┘
└──────────────┘       │ createdAt        │
       │               └──────────────────┘
       │
       │        ┌──────────────────┐       ┌──────────────────┐
       │        │    Review        │       │  PortfolioItem   │
       │        ├──────────────────┤       ├──────────────────┤
       └───────►│ id               │       │ id               │
                │ userId      (FK) │       │ title            │
                │ rating           │       │ description      │
                │ text             │       │ category         │
                │ isApproved       │       │ beforeImage      │
                │ isVisible        │       │ afterImage       │
                │ createdAt        │       │ serviceId   (FK) │
                └──────────────────┘       │ isPublished      │
                                           │ createdAt        │
       ┌──────────────────┐                └──────────────────┘
       │    Message       │
       ├──────────────────┤       ┌──────────────────┐
       │ id               │       │   Schedule       │
       │ name             │       ├──────────────────┤
       │ email            │       │ id               │
       │ phone            │       │ dayOfWeek        │
       │ text             │       │ startTime        │
       │ isRead           │       │ endTime          │
       │ reply            │       │ isWorkingDay     │
       │ createdAt        │       │ breakStart       │
       │ repliedAt        │       │ breakEnd         │
       └──────────────────┘       └──────────────────┘

       ┌──────────────────┐
       │  BlockedDate     │
       ├──────────────────┤
       │ id               │
       │ date             │
       │ reason           │
       └──────────────────┘
```

## Описание сущностей

### User (Пользователи)
- **role**: `ADMIN` (врач/менеджер), `PATIENT` (пациент)
- Хранит данные для авторизации и личного кабинета
- Связан с `Appointment` и `Review`

### Service (Услуги)
- Каталог стоматологических услуг
- `duration` — длительность в минутах (для расчёта слотов)
- `category` — категория (терапия, ортодонтия, хирургия и т.д.)

### Appointment (Записи на приём)
- **status**: `PENDING` → `CONFIRMED` → `COMPLETED` / `CANCELLED` / `NO_SHOW`
- Связан с `User` (пациент) и `Service`
- `startTime` / `endTime` — точное время записи

### Review (Отзывы)
- `isApproved` — модерация администратором
- `rating` — оценка от 1 до 5
- Привязан к `User` (автор отзыва)

### PortfolioItem (Портфолио)
- Кейсы «До/После»
- `category` — для фильтрации
- `isPublished` — черновик/опубликован

### Message (Вопросы Q&A)
- Анонимные или авторизованные вопросы
- `reply` — ответ врача
- `isRead` — статус прочтения

### Schedule (Расписание)
- Шаблон рабочего расписания по дням недели
- `breakStart` / `breakEnd` — обеденный перерыв

### BlockedDate (Нерабочие дни)
- Отпуска, праздники, конференции
- Блокирует конкретную дату целиком

## Ключевые индексы

```sql
-- Быстрый поиск свободных слотов
CREATE INDEX idx_appointment_date ON "Appointment" (date, "startTime");
CREATE INDEX idx_appointment_status ON "Appointment" (status);

-- Поиск отзывов для публичной страницы
CREATE INDEX idx_review_approved ON "Review" ("isApproved", "createdAt");

-- Портфолио по категориям
CREATE INDEX idx_portfolio_category ON "PortfolioItem" (category, "isPublished");
```

## Защита от двойного бронирования

Используется **оптимистичная блокировка на уровне БД** через PostgreSQL:

```sql
-- Атомарная проверка + вставка в одной транзакции
BEGIN;
  SELECT id FROM "Appointment"
  WHERE date = $1
    AND status NOT IN ('CANCELLED')
    AND (
      ("startTime" < $3 AND "endTime" > $2)
    )
  FOR UPDATE;
  
  -- Если нет конфликтов → INSERT
  INSERT INTO "Appointment" (...) VALUES (...);
COMMIT;
```

`FOR UPDATE` блокирует строки на время транзакции, предотвращая race condition.
