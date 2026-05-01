// Centralized dummy data — backend-ready shape
export type Specialization =
  | "Cardiology" | "Neurology" | "Orthopedics" | "Pediatrics"
  | "Dermatology" | "Oncology" | "Gynecology" | "General Medicine"
  | "ENT" | "Ophthalmology" | "Psychiatry" | "Dentistry";

export interface Department {
  id: string;
  name: Specialization;
  icon: string; // lucide icon name
  description: string;
  doctorCount: number;
}

export interface Branch {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  beds: number;
  doctors: number;
  image: string;
}

export interface ScheduleSlot {
  day: string;
  slots: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: Specialization;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  fee: number;
  branchId: string;
  available: boolean;
  bio: string;
  languages: string[];
  image: string;
  schedule: ScheduleSlot[];
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  address: string;
  avatar: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  branchId: string;
  date: string; // ISO
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  reason: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  medications: { name: string; dose: string; frequency: string; duration: string }[];
  notes?: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  title: string;
  type: "Lab" | "Imaging" | "Discharge" | "Other";
  date: string;
  doctor: string;
  fileUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

const doctorPhotos = [
  "https://images.pexels.com/photos/19438563/pexels-photo-19438563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/19438560/pexels-photo-19438560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/19438558/pexels-photo-19438558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5722157/pexels-photo-5722157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4989136/pexels-photo-4989136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/19438557/pexels-photo-19438557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6762862/pexels-photo-6762862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6762876/pexels-photo-6762876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/19438565/pexels-photo-19438565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6762869/pexels-photo-6762869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/19438566/pexels-photo-19438566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4989135/pexels-photo-4989135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const doctorPhoto = (index: number) => doctorPhotos[index % doctorPhotos.length];

const img = () => doctorPhotos[0];
const branchImg = (id: number) => `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;

export const branches: Branch[] = [
  { id: "b1", city: "Dhaka", name: "IJS Dhaka Central", address: "12 Gulshan Avenue, Dhaka 1212", phone: "+880 1700-100001", email: "dhaka@ijshealth.com", beds: 320, doctors: 84, image: "1586773860418-d37222d8fce3" },
  { id: "b2", city: "Chittagong", name: "IJS Chittagong Bay", address: "45 Agrabad C/A, Chittagong 4100", phone: "+880 1700-100002", email: "ctg@ijshealth.com", beds: 220, doctors: 56, image: "1538108149393-fbbd81895907" },
  { id: "b3", city: "Sylhet", name: "IJS Sylhet Care", address: "8 Zindabazar, Sylhet 3100", phone: "+880 1700-100003", email: "sylhet@ijshealth.com", beds: 160, doctors: 38, image: "1551076805-e1869033e561" },
  { id: "b4", city: "Khulna", name: "IJS Khulna Specialty", address: "21 Khan Jahan Ali Rd, Khulna 9100", phone: "+880 1700-100004", email: "khulna@ijshealth.com", beds: 140, doctors: 30, image: "1519494026892-80bbd2d6fd0d" },
  { id: "b5", city: "Rajshahi", name: "IJS Rajshahi Wellness", address: "5 Saheb Bazar, Rajshahi 6000", phone: "+880 1700-100005", email: "rajshahi@ijshealth.com", beds: 110, doctors: 24, image: "1504439468489-c8920d796a29" },
].map(b => ({ ...b, image: branchImg(parseInt(b.image.split('-')[0])) }));

export const departments: Department[] = [
  { id: "d1", name: "Cardiology", icon: "Heart", description: "Comprehensive heart care including diagnostics, surgery and rehabilitation.", doctorCount: 18 },
  { id: "d2", name: "Neurology", icon: "Brain", description: "Advanced treatment for brain, spine and nervous system conditions.", doctorCount: 12 },
  { id: "d3", name: "Orthopedics", icon: "Bone", description: "Bone, joint and muscle care with minimally invasive surgical options.", doctorCount: 15 },
  { id: "d4", name: "Pediatrics", icon: "Baby", description: "Compassionate care for newborns, children and adolescents.", doctorCount: 22 },
  { id: "d5", name: "Dermatology", icon: "Sparkles", description: "Skin, hair and nail treatments with modern aesthetic procedures.", doctorCount: 9 },
  { id: "d6", name: "Oncology", icon: "Ribbon", description: "Multi-disciplinary cancer care including chemotherapy and radiation.", doctorCount: 11 },
  { id: "d7", name: "Gynecology", icon: "Flower2", description: "Women's health, maternity and reproductive care.", doctorCount: 14 },
  { id: "d8", name: "General Medicine", icon: "Stethoscope", description: "Primary care, preventive health and chronic disease management.", doctorCount: 26 },
  { id: "d9", name: "ENT", icon: "Ear", description: "Ear, nose and throat treatments for all ages.", doctorCount: 8 },
  { id: "d10", name: "Ophthalmology", icon: "Eye", description: "Complete eye care including LASIK and cataract surgery.", doctorCount: 10 },
  { id: "d11", name: "Psychiatry", icon: "BrainCircuit", description: "Mental wellness, therapy and psychiatric treatment.", doctorCount: 7 },
  { id: "d12", name: "Dentistry", icon: "Smile", description: "Cosmetic and restorative dental care for the whole family.", doctorCount: 13 },
];

const defaultSchedule: ScheduleSlot[] = [
  { day: "Mon", slots: ["09:00", "10:00", "11:00", "15:00", "16:00"] },
  { day: "Tue", slots: ["09:00", "10:00", "14:00", "15:00"] },
  { day: "Wed", slots: ["10:00", "11:00", "16:00", "17:00"] },
  { day: "Thu", slots: ["09:00", "11:00", "15:00", "16:00", "17:00"] },
  { day: "Sat", slots: ["09:00", "10:00", "11:00"] },
];

const docNames = [
  "Dr. Arman Hossain", "Dr. Fariha Rahman", "Dr. Tanvir Ahmed", "Dr. Nusrat Jahan",
  "Dr. Imran Khan", "Dr. Sumaiya Akter", "Dr. Rashed Karim", "Dr. Mehnaz Siddique",
  "Dr. Sabbir Alam", "Dr. Anika Tabassum", "Dr. Kamrul Islam", "Dr. Rumana Pervin",
];

export const doctors: Doctor[] = docNames.map((name, i) => {
  const spec = departments[i % departments.length].name;
  return {
    id: `doc${i + 1}`,
    name,
    specialization: spec,
    qualification: ["MBBS, FCPS", "MBBS, MD", "MBBS, MS", "MBBS, DCH"][i % 4],
    experienceYears: 5 + ((i * 3) % 20),
    rating: +(4.3 + (i % 7) * 0.1).toFixed(1),
    reviewCount: 42 + i * 17,
    fee: 800 + (i % 6) * 200,
    branchId: branches[i % branches.length].id,
    available: i % 4 !== 0,
    bio: `${name} is a highly experienced ${spec.toLowerCase()} specialist with a patient-first approach. Recognized for clinical excellence and compassionate care across thousands of successful treatments.`,
    languages: ["English", "Bangla", i % 2 ? "Hindi" : "Urdu"],
    image: doctorPhoto(i),
    schedule: defaultSchedule,
  };
});

export const currentPatient: Patient = {
  id: "p1",
  name: "Ayesha Rahman",
  email: "ayesha.rahman@example.com",
  phone: "+880 1711-223344",
  dob: "1995-06-12",
  gender: "Female",
  bloodGroup: "B+",
  address: "House 22, Road 7, Dhanmondi, Dhaka",
  avatar: img(),
};

export const initialAppointments: Appointment[] = [
  { id: "a1", patientId: "p1", doctorId: "doc1", branchId: "b1", date: "2026-05-08", time: "10:00", status: "upcoming", reason: "Routine cardiac check-up" },
  { id: "a2", patientId: "p1", doctorId: "doc4", branchId: "b1", date: "2026-05-15", time: "16:00", status: "upcoming", reason: "Pediatric consult for child" },
  { id: "a3", patientId: "p1", doctorId: "doc2", branchId: "b2", date: "2026-03-12", time: "11:00", status: "completed", reason: "Migraine follow-up" },
  { id: "a4", patientId: "p1", doctorId: "doc8", branchId: "b1", date: "2026-02-02", time: "09:00", status: "completed", reason: "Annual physical" },
];

export const initialPrescriptions: Prescription[] = [
  {
    id: "rx1", patientId: "p1", doctorId: "doc2", date: "2026-03-12",
    diagnosis: "Chronic migraine",
    medications: [
      { name: "Sumatriptan", dose: "50mg", frequency: "As needed", duration: "30 days" },
      { name: "Propranolol", dose: "40mg", frequency: "Twice daily", duration: "60 days" },
    ],
    notes: "Avoid known triggers. Maintain sleep schedule.",
  },
  {
    id: "rx2", patientId: "p1", doctorId: "doc8", date: "2026-02-02",
    diagnosis: "Vitamin D deficiency",
    medications: [
      { name: "Cholecalciferol", dose: "60,000 IU", frequency: "Weekly", duration: "8 weeks" },
    ],
  },
];

export const initialReports: MedicalReport[] = [
  { id: "r1", patientId: "p1", title: "Complete Blood Count", type: "Lab", date: "2026-03-10", doctor: "Dr. Fariha Rahman", fileUrl: "#" },
  { id: "r2", patientId: "p1", title: "Brain MRI", type: "Imaging", date: "2026-03-08", doctor: "Dr. Fariha Rahman", fileUrl: "#" },
  { id: "r3", patientId: "p1", title: "Lipid Profile", type: "Lab", date: "2026-02-02", doctor: "Dr. Mehnaz Siddique", fileUrl: "#" },
];

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Rafiul Karim", role: "Patient, Dhaka", avatar: img(), rating: 5, quote: "The booking flow was effortless and the cardiologist was outstanding. IJS truly puts patients first." },
  { id: "t2", name: "Tahsin Chowdhury", role: "Parent, Chittagong", avatar: img(), rating: 5, quote: "Brought my daughter for a pediatric consult — kind, fast, and thorough. Best hospital experience we've had." },
  { id: "t3", name: "Nadia Islam", role: "Patient, Sylhet", avatar: img(), rating: 5, quote: "From digital records to follow-up reminders, IJS feels like healthcare from the future." },
];

export const stats = [
  { label: "Patients Served", value: "250K+" },
  { label: "Expert Doctors", value: "300+" },
  { label: "City Branches", value: "5" },
  { label: "Years of Care", value: "18" },
];
