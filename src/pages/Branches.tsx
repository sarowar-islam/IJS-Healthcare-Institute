import { Bed, Mail, MapPin, Phone, Stethoscope } from "lucide-react";
import { branches } from "@/data/dummy";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Branches = () => (
  <div className="container py-12">
    <div className="max-w-2xl">
      <p className="text-primary font-semibold text-sm uppercase tracking-wider">Our network</p>
      <h1 className="mt-2 text-4xl font-display font-bold">Branches across Bangladesh</h1>
      <p className="mt-3 text-muted-foreground">Five city hospitals, one shared standard of care. Find a branch nearest you.</p>
    </div>

    <div className="mt-10 grid md:grid-cols-2 gap-6">
      {branches.map(b => (
        <Card key={b.id} className="overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-base group">
          <div className="relative h-52 overflow-hidden bg-secondary">
            <img src={b.image} alt={b.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <div className="text-xs text-primary font-semibold uppercase tracking-wider">{b.city}</div>
              <div className="font-display font-bold text-2xl">{b.name}</div>
            </div>
          </div>
          <div className="p-6 space-y-3 text-sm">
            <p className="flex gap-2 text-muted-foreground"><MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" /> {b.address}</p>
            <p className="flex gap-2 text-muted-foreground"><Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" /> {b.phone}</p>
            <p className="flex gap-2 text-muted-foreground"><Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" /> {b.email}</p>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2"><Bed className="h-4 w-4 text-primary" /> <span className="font-semibold">{b.beds}</span> <span className="text-muted-foreground">beds</span></div>
              <div className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-primary" /> <span className="font-semibold">{b.doctors}</span> <span className="text-muted-foreground">doctors</span></div>
            </div>
            <Button variant="soft" className="w-full mt-3" asChild>
              <Link to="/doctors">See doctors at this branch</Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default Branches;
