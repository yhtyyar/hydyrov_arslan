# Hydyrov Dental — Mobile App (Flutter)

## Описание

Мобильное приложение для пациентов стоматологической клиники Dr. Hydyrov Arslan.

## Функционал

- Авторизация пациента
- Просмотр услуг и цен
- Онлайн-запись на приём (синхронизация с веб-сайтом)
- Портфолио работ (До/После)
- Отзывы пациентов
- Личный кабинет (история посещений, будущие записи)
- Push-уведомления о записи (Firebase Cloud Messaging)

## Стек

- **Framework:** Flutter 3.x
- **State Management:** Riverpod
- **HTTP Client:** Dio
- **Navigation:** GoRouter
- **Push Notifications:** Firebase Cloud Messaging

## Структура проекта (планируемая)

```
mobile/
├── lib/
│   ├── main.dart
│   ├── app/
│   │   ├── app.dart
│   │   └── router.dart
│   ├── features/
│   │   ├── auth/
│   │   ├── booking/
│   │   ├── portfolio/
│   │   ├── reviews/
│   │   └── profile/
│   ├── core/
│   │   ├── api/
│   │   │   ├── api_client.dart
│   │   │   └── endpoints.dart
│   │   ├── models/
│   │   ├── theme/
│   │   └── utils/
│   └── shared/
│       └── widgets/
├── android/
├── ios/
├── pubspec.yaml
└── README.md
```

## Быстрый старт

```bash
# Установите Flutter SDK: https://flutter.dev/docs/get-started/install

# Создание проекта
flutter create --org com.hydyrov dental_app

# Установка зависимостей
flutter pub get

# Запуск
flutter run
```

## API Integration

Приложение использует те же API-эндпоинты, что и веб-сайт:

| Endpoint | Method | Description |
|---|---|---|
| `/api/services` | GET | Список услуг |
| `/api/appointments?date=&serviceId=` | GET | Свободные слоты |
| `/api/appointments` | POST | Бронирование |
| `/api/reviews` | GET | Отзывы |
| `/api/portfolio` | GET | Портфолио |

## Настройка API URL

```dart
// lib/core/api/api_client.dart
class ApiConfig {
  static const String baseUrl = 'https://hydyrov-dental.com/api';
  // Для разработки: 'http://10.0.2.2:3000/api' (Android emulator)
}
```

## TODO

- [ ] Инициализация Flutter проекта
- [ ] Настройка навигации (GoRouter)
- [ ] Авторизация (NextAuth JWT)
- [ ] Экран бронирования
- [ ] Портфолио и отзывы
- [ ] Личный кабинет
- [ ] Push-уведомления
- [ ] Публикация в Google Play
