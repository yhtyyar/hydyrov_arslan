"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle2, ChevronLeft, AlertCircle, Loader2 } from "lucide-react";
import { BookingServiceSkeleton, TimeSlotSkeleton, Skeleton } from "@/components/ui/Skeleton";

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: string;
  duration: number;
  category: string;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface AvailableSlotsData {
  date: string;
  serviceName: string;
  duration: number;
  slots: TimeSlot[];
}

type Step = "service" | "datetime" | "info" | "confirm";

export default function BookingPage() {
  // Steps
  const [step, setStep] = useState<Step>("service");
  const steps: { key: Step; label: string }[] = [
    { key: "service", label: "Услуга" },
    { key: "datetime", label: "Дата и время" },
    { key: "info", label: "Ваши данные" },
    { key: "confirm", label: "Подтверждение" },
  ];
  const currentStepIndex = steps.findIndex((s) => s.key === step);

  // Selection state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", notes: "" });

  // Data fetching state
  const [services, setServices] = useState<Service[]>([]);
  const [slotsData, setSlotsData] = useState<AvailableSlotsData | null>(null);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string>("");

  // Fetch services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch slots when date and service selected
  useEffect(() => {
    if (selectedDate && selectedService) {
      fetchSlots(selectedDate, selectedService.id);
    }
  }, [selectedDate, selectedService]);

  const fetchServices = async () => {
    try {
      setIsLoadingServices(true);
      setError(null);
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      } else {
        setError("Не удалось загрузить услуги");
      }
    } catch {
      setError("Ошибка загрузки услуг");
    } finally {
      setIsLoadingServices(false);
    }
  };

  const fetchSlots = async (date: string, serviceId: string) => {
    try {
      setIsLoadingSlots(true);
      setError(null);
      const res = await fetch(`/api/appointments?date=${date}&serviceId=${serviceId}`);
      const data = await res.json();
      if (data.success) {
        setSlotsData(data.data);
      } else {
        setError("Не удалось загрузить доступное время");
      }
    } catch {
      setError("Ошибка загрузки временных слотов");
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedSlot) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          date: selectedDate,
          startTime: selectedSlot.startTime,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setAppointmentId(data.data.appointmentId);
        setIsSubmitted(true);
      } else {
        setError(data.error || "Ошибка при создании записи");
      }
    } catch {
      setError("Ошибка сети при создании записи");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (num === 0) return "Бесплатно";
    return `от ${num.toLocaleString("ru-RU")} сум`;
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
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
            <p><span className="text-gray-500">Номер записи:</span> <span className="font-medium">{appointmentId}</span></p>
            <p><span className="text-gray-500">Услуга:</span> <span className="font-medium">{selectedService?.name}</span></p>
            <p><span className="text-gray-500">Дата:</span> <span className="font-medium">{selectedDate}</span></p>
            <p><span className="text-gray-500">Время:</span> <span className="font-medium">{selectedSlot ? formatTime(selectedSlot.startTime) : ""}</span></p>
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

      {/* Error Alert */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Ошибка</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="mt-10">
        {/* Step 1: Select Service */}
        {step === "service" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Выберите услугу</h2>
            {isLoadingServices ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <BookingServiceSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        selectedService?.id === service.id
                          ? "border-dental-teal bg-teal-50 ring-1 ring-dental-teal"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {service.duration} мин
                        </span>
                        <span className="font-medium text-dental-teal">{formatPrice(service.price)}</span>
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
              </>
            )}
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
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlot(null);
                }}
                min={new Date().toISOString().split("T")[0]}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm w-full focus:border-dental-teal focus:ring-1 focus:ring-dental-teal outline-none"
              />
            </div>
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Свободное время
                  {isLoadingSlots && <span className="ml-2 text-gray-400">(загрузка...)</span>}
                </label>
                {isLoadingSlots ? (
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                    {[...Array(16)].map((_, i) => (
                      <TimeSlotSkeleton key={i} />
                    ))}
                  </div>
                ) : slotsData?.slots.length === 0 ? (
                  <p className="text-sm text-gray-500 py-8 text-center bg-gray-50 rounded-lg">
                    На выбранную дату нет доступного времени
                  </p>
                ) : (
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                    {slotsData?.slots.filter(s => s.isAvailable).map((slot) => (
                      <button
                        key={slot.startTime}
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-lg border px-3 py-2 text-sm transition-all ${
                          selectedSlot?.startTime === slot.startTime
                            ? "border-dental-teal bg-dental-teal text-white"
                            : "border-gray-200 text-gray-700 hover:border-dental-teal/50"
                        }`}
                      >
                        {formatTime(slot.startTime)}
                      </button>
                    ))}
                  </div>
                )}
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
                onClick={() => selectedDate && selectedSlot && setStep("info")}
                disabled={!selectedDate || !selectedSlot}
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
                <span className="font-medium">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Дата</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Время</span>
                <span className="font-medium">{selectedSlot ? formatTime(selectedSlot.startTime) : ""}</span>
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
                disabled={isSubmitting}
                className="rounded-lg bg-dental-teal px-8 py-2.5 text-sm font-semibold text-white hover:bg-dental-teal/90 transition-colors shadow-lg shadow-teal-500/25 disabled:opacity-70 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Оформление...
                  </>
                ) : (
                  "Подтвердить запись"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
