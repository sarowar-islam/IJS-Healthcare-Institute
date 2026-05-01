import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, GraduationCap, Languages, MapPin, Star, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import { branches, doctors } from "@/data/dummy";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/useAppStore";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === id);
  const branch = branches.find(b => b.id === doctor?.branchId);
  const { isAuthenticated, bookAppointment } = useAppStore();

  const [day, setDay] = useState(doctor?.schedule[0].day ?? "");
  const [slot, setSlot] = useState<string>("");
  const [reason, setReason] = useState("");

  const slots = useMemo(() => doctor?.schedule.find(s => s.day === day)?.slots ?? [], [day, doctor]);

  if (!doctor || !branch) {
    return <div className="container py-20 text-center"><p>Doctor not found.</p></div>;
  }

  const handleBook = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to book an appointment");
      navigate("/login");
      return;
    }
    if (!slot) {
      toast.error("Please choose a time slot");
      return;
    }
    const today = new Date();
    const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const target = dayMap[day];
    const offset = (target - today.getDay() + 7) % 7 || 7;
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    bookAppointment({
      doctorId: doctor.id,
      branchId: doctor.branchId,
      date: date.toISOString().split("T")[0],
      time: slot,
      reason: reason || "General consultation",
    });
    toast.success(`Appointment booked with ${doctor.name}`);
    navigate("/dashboard/appointments");
  };

  return (
    <div className="container py-10">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link to="/doctors"><ArrowLeft className="h-4 w-4" /> Back to doctors</Link>
      </Button>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div>
          <Card className="overflow-hidden">
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
              <Avatar className="h-32 w-32 ring-4 ring-primary/15">
                <AvatarImage src={doctor.image} alt={doctor.name} />
                <AvatarFallback>{doctor.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h1 className="text-3xl font-display font-bold">{doctor.name}</h1>
                    <p className="text-primary font-semibold mt-1">{doctor.specialization}</p>
                  </div>
                  <Badge className={doctor.available ? "bg-success text-success-foreground border-0" : "bg-muted text-muted-foreground border-0"}>
                    {doctor.available ? "Available today" : "Fully booked"}
                  </Badge>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" /> <span className="font-semibold">{doctor.rating}</span> <span className="text-muted-foreground">({doctor.reviewCount})</span></div>
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Stethoscope className="h-4 w-4" /> {doctor.experienceYears}+ yrs</div>
                  <div className="flex items-center gap-1.5 text-muted-foreground"><GraduationCap className="h-4 w-4" /> {doctor.qualification}</div>
                  <div className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-4 w-4" /> {branch.city}</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mt-6 p-6 sm:p-8">
            <h2 className="text-xl font-display font-semibold">About</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{doctor.bio}</p>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Speaks:</span>
              <div className="flex gap-2 flex-wrap">
                {doctor.languages.map(l => <Badge key={l} variant="secondary">{l}</Badge>)}
              </div>
            </div>
          </Card>

          <Card className="mt-6 p-6 sm:p-8">
            <h2 className="text-xl font-display font-semibold">Branch</h2>
            <div className="mt-4 flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{branch.name}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{branch.address}</div>
                <div className="text-sm text-muted-foreground">{branch.phone}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Booking */}
        <Card className="p-6 sticky top-24 self-start">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-display font-semibold">Book appointment</h2>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Consultation</div>
              <div className="font-bold text-gradient text-lg">৳{doctor.fee}</div>
            </div>
          </div>

          <div className="mt-5">
            <Label className="text-sm">Choose day</Label>
            <div className="mt-2 flex gap-2 flex-wrap">
              {doctor.schedule.map(s => (
                <button
                  key={s.day}
                  onClick={() => { setDay(s.day); setSlot(""); }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-base ${day === s.day ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}
                >
                  <Calendar className="h-3.5 w-3.5 inline mr-1" /> {s.day}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <Label className="text-sm">Choose time</Label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {slots.map(s => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`px-2 py-2 rounded-lg text-sm font-medium border transition-base ${slot === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}
                >
                  <Clock className="h-3.5 w-3.5 inline mr-1" /> {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <Label htmlFor="reason" className="text-sm">Reason (optional)</Label>
            <Textarea id="reason" value={reason} onChange={e => setReason(e.target.value)} placeholder="Briefly describe your concern" className="mt-2" />
          </div>

          <Button variant="hero" className="w-full mt-6" size="lg" onClick={handleBook}>
            Confirm booking
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">You can reschedule or cancel any time from your dashboard.</p>
        </Card>
      </div>
    </div>
  );
};

export default DoctorProfile;
