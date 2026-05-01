import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Doctor, branches } from "@/data/dummy";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props { doctor: Doctor; }

export const DoctorCard = ({ doctor }: Props) => {
  const branch = branches.find(b => b.id === doctor.branchId);
  return (
    <Card className="group overflow-hidden border-border/60 hover:border-primary/40 hover:shadow-elegant transition-base hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-secondary">
        <img
          src={doctor.image}
          alt={doctor.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className={`absolute top-3 right-3 ${doctor.available ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"} border-0`}>
          {doctor.available ? "Available" : "Booked"}
        </Badge>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-semibold text-lg leading-tight">{doctor.name}</h3>
            <p className="text-sm text-primary font-medium mt-0.5">{doctor.specialization}</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-semibold">{doctor.rating}</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{doctor.qualification} · {doctor.experienceYears}+ yrs exp</p>
        <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {branch?.city}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm">
            <span className="text-muted-foreground">Fee </span>
            <span className="font-semibold">৳{doctor.fee}</span>
          </span>
          <Button variant="hero" size="sm" asChild>
            <Link to={`/doctors/${doctor.id}`}>Book</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};
