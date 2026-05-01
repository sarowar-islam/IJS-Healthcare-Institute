import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Calendar, MapPin, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/store/useAppStore";
import { Appointment, branches, doctors } from "@/data/dummy";

const AppointmentItem = ({ a, onCancel }: { a: Appointment; onCancel?: (id: string) => void }) => {
  const doc = doctors.find(d => d.id === a.doctorId);
  const branch = branches.find(b => b.id === a.branchId);
  const statusStyle = {
    upcoming: "bg-primary/15 text-primary",
    completed: "bg-success/15 text-success",
    cancelled: "bg-destructive/15 text-destructive",
  }[a.status];

  return (
    <Card className="p-5 hover:shadow-soft transition-base">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <Avatar className="h-14 w-14">
          <AvatarImage src={doc?.image} />
          <AvatarFallback>{doc?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display font-semibold">{doc?.name}</h3>
            <Badge className={`${statusStyle} border-0 capitalize`}>{a.status}</Badge>
          </div>
          <p className="text-sm text-primary mt-0.5">{doc?.specialization}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(a.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })} · {a.time}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {branch?.name}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Reason: {a.reason}</p>
        </div>
        {a.status === "upcoming" && onCancel && (
          <Button variant="outline" size="sm" onClick={() => onCancel(a.id)}>
            <X className="h-4 w-4" /> Cancel
          </Button>
        )}
      </div>
    </Card>
  );
};

const Appointments = () => {
  const { appointments, cancelAppointment } = useAppStore();
  const upcoming = appointments.filter(a => a.status === "upcoming");
  const past = appointments.filter(a => a.status !== "upcoming");

  const handleCancel = (id: string) => {
    cancelAppointment(id);
    toast.success("Appointment cancelled");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">My Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage your visits across all IJS branches.</p>
        </div>
        <Button variant="hero" asChild><Link to="/doctors">Book new</Link></Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-5 space-y-3">
          {upcoming.length === 0 && <Card className="p-10 text-center text-muted-foreground">No upcoming appointments.</Card>}
          {upcoming.map(a => <AppointmentItem key={a.id} a={a} onCancel={handleCancel} />)}
        </TabsContent>
        <TabsContent value="past" className="mt-5 space-y-3">
          {past.length === 0 && <Card className="p-10 text-center text-muted-foreground">No past appointments yet.</Card>}
          {past.map(a => <AppointmentItem key={a.id} a={a} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;
