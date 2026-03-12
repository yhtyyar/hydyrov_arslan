"use client";

import { useState } from "react";
import { CalendarDays, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const mockServices = [
  { id: "1", name: "Консультация", duration: 30, price: "Бесплатно" },
  { id: "2", name: "Лечение кариеса", duration: 60, price: "от 200 000 сум" },
  { id: "3", name: "Профессиональная чистка", duration: 45, price: "от 150 000 сум" },
  { id: "4", name: "Отбеливание", duration: 60, price: "от 500 000 сум" },
  { id: "5", name: "Установка виниров", duration: 90, price: "от 1 000 000 сум" },
  { id: "6", name: "Имплантация", duration: 120, price: "от 3 000 000 сум" },
];

const mockTimeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

type Step = "service" | "datetime" | "info" | "confirm";

export default function BookingPage() {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", notes: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps: { key: Step; label: string }[] = [
    { key: "service", label: "Услуга" },
    { key: "datetime", label: "Дата и время" },
    { key: "info", label: "Ваши данные" },
    { key: "confirm", label: "Подтверждение" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const handleSubmit = async () => {
    // In production, this would call POST /api/appointments
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Запись оформлена!</h1>
        <p className="mt-3 text-gray-500">
          Мы подтвердим вашу запись в течение 15 минут. Информация будет отправлена на ваш email.
        </p>
        <div className="mt-6 rounded-xl border bg-gray-50 p-6 text-left">
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Услуга:</span> <span className="font-medium">{mockServices.find((s) => s.id === selectedService)?.name}</span></p>
            <p><span className="text-gray-500">Дата:</span> <span className="font-medium">{selectedDate}</span></p>
            <p><span className="text-gray-500">Время:</span> <span className="font-medium">{selectedTime}</span></p>
            <p><span className="text-gray-500">Имя:</span> <span className="font-medium">{formData.name}</span></p>
            <p><span className="text-gray-500">Телефон:</span> <span className="font-medium">{formData.phone}</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Онлайн-запись на приём
      </h1>
      <p className="mt-2 text-center text-gray-500">
        Выберите услугу, удобную дату и время
      </p>

      {/* Step indicator */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                i <= currentStepIndex
                  ? "bg-dental-teal text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <span className={`ml-1.5 text-xs hidden sm:inline ${i <= currentStepIndex ? "text-dental-teal font-medium" : "text-gray-400"}`}>
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div className={`mx-3 h-px w-8 ${i < currentStepIndex ? "bg-dental-teal" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">
        {/* Step 1: Select Service */}
        {step === "service" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Выберите услугу</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {mockServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    selectedService === service.id
                      ? "border-dental-teal bg-teal-50 ring-1 ring-dental-teal"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {service.duration} мин
                    </span>
                    <span className="font-medium text-dental-teal">{service.price}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => selectedService && setStep("datetime")}
                disabled={!selectedService}
                className="rounded-lg bg-dental-teal px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50 hover:bg-dental-teal/90 transition-colors"
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === "datetime" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Выберите дату и время</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Дата</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm w-full focus:border-dental-teal focus:ring-1 focus:ring-dental-teal outline-none"
              />
            </div>
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Свободное время</label>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                  {mockTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-lg border px-3 py-2 text-sm transition-all ${
                        selectedTime === time
                          ? "border-dental-teal bg-dental-teal text-white"
                          : "border-gray-200 text-gray-700 hover:border-dental-teal/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep("service")}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft className="h-4 w-4" /> Назад
              </button>
              <button
                onClick={() => selectedDate && selectedTime && setStep("info")}
                disabled={!selectedDate || !selectedTime}
                className="rounded-lg bg-dental-teal px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50 hover:bg-dental-teal/90 transition-colors"
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Personal Info */}
        {step === "info" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ваши данные</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm w-full focus:border-dental-teal focus:ring-1 focus:ring-dental-teal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm w-full focus:border-dental-teal focus:ring-1 focus:ring-dental-teal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm w-full focus:border-dental-teal focus:ring-1 focus:ring-dental-teal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Опишите жалобу или пожелания..."
                  rows={3}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm w-full focus:border-dental-teal focus:ring-1 focus:ring-dental-teal outline-none resize-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep("datetime")}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft className="h-4 w-4" /> Назад
              </button>
              <button
                onClick={() => formData.name && formData.phone && formData.email && setStep("confirm")}
                disabled={!formData.name || !formData.phone || !formData.email}
                className="rounded-lg bg-dental-teal px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50 hover:bg-dental-teal/90 transition-colors"
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === "confirm" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Подтверждение записи</h2>
            <div className="rounded-xl border bg-gray-50 p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Услуга</span>
                <span className="font-medium">{mockServices.find((s) => s.id === selectedService)?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Дата</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Время</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <hr />
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Имя</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Телефон</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              {formData.notes && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Комментарий</span>
                  <span className="font-medium max-w-[200px] text-right">{formData.notes}</span>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep("info")}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft className="h-4 w-4" /> Назад
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-lg bg-dental-teal px-8 py-2.5 text-sm font-semibold text-white hover:bg-dental-teal/90 transition-colors shadow-lg shadow-teal-500/25"
              >
                Подтвердить запись
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
