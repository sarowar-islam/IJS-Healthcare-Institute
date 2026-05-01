import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { departments } from "@/data/dummy";
import { ArrowRight } from "lucide-react";

const Departments = () => (
  <div className="container py-12">
    <div className="max-w-2xl">
      <p className="text-primary font-semibold text-sm uppercase tracking-wider">Specialties</p>
      <h1 className="mt-2 text-4xl font-display font-bold">Departments & centres of excellence</h1>
      <p className="mt-3 text-muted-foreground">Comprehensive specialty services delivered by experienced clinicians and modern facilities.</p>
    </div>

    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {departments.map(dept => {
        const Icon = (Icons as any)[dept.icon] ?? Icons.Stethoscope;
        return (
          <Card key={dept.id} className="p-6 hover:border-primary/40 hover:shadow-soft hover:-translate-y-1 transition-base group">
            <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-display font-semibold">{dept.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{dept.description}</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{dept.doctorCount} specialists</span>
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/doctors`}>View doctors <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  </div>
);

export default Departments;
