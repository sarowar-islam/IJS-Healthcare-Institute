import { Link } from "react-router-dom";
import { Calendar, FileText, Pill, ArrowRight, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/useAppStore";
import { doctors } from "@/data/dummy";

const DashboardHome = () => {
  const { patient, appointments, prescriptions, reports } = useAppStore();
  const upcoming = appointments.filter(a => a.status === "upcoming");
  const past = appointments.filter(a => a.status === "completed");

  const stats = [
    { label: "Upcoming", value: upcoming.length, icon: Calendar, color: "text-primary bg-primary/10" },
    { label: "Past visits", value: past.length, icon: Clock, color: "text-accent bg-accent/10" },
    { label: "Prescriptions", value: prescriptions.length, icon: Pill, color: "text-success bg-success/10" },
    { label: "Reports", value: reports.length, icon: FileText, color: "text-warning bg-warning/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Hi {patient?.name?.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's a snapshot of your health activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="p-5">
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-3xl font-display font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">Upcoming appointments</h2>
            <Button variant="ghost" size="sm" asChild><Link to="/dashboard/appointments">View all <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          {upcoming.length === 0 && <p className="text-sm text-muted-foreground">No upcoming appointments.</p>}
          <div className="space-y-3">
            {upcoming.slice(0, 3).map(a => {
              const doc = doctors.find(d => d.id === a.doctorId);
              return (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Avatar><AvatarImage src={doc?.image} /><AvatarFallback>{doc?.name[0]}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{doc?.name}</div>
                    <div className="text-xs text-muted-foreground">{doc?.specialization}</div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="font-semibold">{new Date(a.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</div>
                    <div className="text-muted-foreground">{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="hero" className="w-full mt-5" asChild><Link to="/doctors">Book new appointment</Link></Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">Recent prescriptions</h2>
            <Button variant="ghost" size="sm" asChild><Link to="/dashboard/records">View all <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="space-y-3">
            {prescriptions.slice(0, 3).map(rx => {
              const doc = doctors.find(d => d.id === rx.doctorId);
              return (
                <div key={rx.id} className="p-3 rounded-lg border border-border">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="font-medium text-sm">{rx.diagnosis}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{doc?.name} · {new Date(rx.date).toLocaleDateString()}</div>
                    </div>
                    <Badge variant="secondary">{rx.medications.length} meds</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
