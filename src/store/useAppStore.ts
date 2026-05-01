import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Appointment, MedicalReport, Patient, Prescription,
  currentPatient, initialAppointments, initialPrescriptions, initialReports,
} from "@/data/dummy";

interface AppState {
  isAuthenticated: boolean;
  patient: Patient | null;
  appointments: Appointment[];
  prescriptions: Prescription[];
  reports: MedicalReport[];

  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;

  bookAppointment: (a: Omit<Appointment, "id" | "status" | "patientId">) => Appointment;
  cancelAppointment: (id: string) => void;
  updatePatient: (updates: Partial<Patient>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      patient: null,
      appointments: initialAppointments,
      prescriptions: initialPrescriptions,
      reports: initialReports,

      login: (email) => set({
        isAuthenticated: true,
        patient: { ...currentPatient, email },
      }),
      signup: (name, email) => set({
        isAuthenticated: true,
        patient: { ...currentPatient, name, email },
      }),
      logout: () => set({ isAuthenticated: false, patient: null }),

      bookAppointment: (a) => {
        const appt: Appointment = {
          ...a,
          id: `a${Date.now()}`,
          patientId: get().patient?.id ?? "p1",
          status: "upcoming",
        };
        set({ appointments: [appt, ...get().appointments] });
        return appt;
      },
      cancelAppointment: (id) => set({
        appointments: get().appointments.map(a => a.id === id ? { ...a, status: "cancelled" } : a),
      }),
      updatePatient: (updates) => set({
        patient: get().patient ? { ...get().patient!, ...updates } : null,
      }),
    }),
    { name: "ijs-app-storage" }
  )
);
