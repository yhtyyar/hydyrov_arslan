import { AppointmentStatus, Role } from "@prisma/client";

// ─── API Response Types ──────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Slot Types ──────────────────────────────────────────

export interface TimeSlot {
  startTime: string; // ISO string
  endTime: string; // ISO string
  isAvailable: boolean;
}

export interface AvailableSlotsRequest {
  date: string; // YYYY-MM-DD
  serviceId: string;
}

export interface AvailableSlotsResponse {
  date: string;
  serviceName: string;
  duration: number;
  slots: TimeSlot[];
}

// ─── Booking Types ───────────────────────────────────────

export interface BookingRequest {
  serviceId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // ISO string
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingResponse {
  appointmentId: string;
  date: string;
  startTime: string;
  endTime: string;
  serviceName: string;
  status: AppointmentStatus;
}

// ─── Service Types ───────────────────────────────────────

export interface ServiceInfo {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  category: string;
}

// ─── Review Types ────────────────────────────────────────

export interface ReviewInfo {
  id: string;
  rating: number;
  text: string;
  userName: string;
  createdAt: string;
}

// ─── Portfolio Types ─────────────────────────────────────

export interface PortfolioInfo {
  id: string;
  title: string;
  description: string | null;
  category: string;
  beforeImage: string;
  afterImage: string;
}
