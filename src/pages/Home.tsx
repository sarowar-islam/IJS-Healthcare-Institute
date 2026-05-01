import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, CalendarCheck, Search, Phone, Shield, Clock, Award, Star, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DoctorCard } from "@/components/DoctorCard";
import { departments, doctors, stats, testimonials } from "@/data/dummy";
import heroImg from "@/assets/hero-hospital.jpg";

const Home = () => {
  const [q, setQ] = useState("");
  const featured = doctors.slice(0, 6);
  const filtered = q
    ? doctors.filter(d => d.name.toLowerCase().includes(q.toLowerCase()) || d.specialization.toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-20 dark:opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10" />
        </div>
        <div className="container py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> Trusted by 250,000+ patients
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] tracking-tight">
              World-class care, <br />
              <span className="text-gradient">close to home.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed">
              IJS Healthcare Institute brings together top specialists across five cities, offering modern, compassionate care backed by digital convenience.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/doctors"><CalendarCheck className="h-5 w-5" /> Book Appointment</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/departments">Explore Services <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-gradient">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant border border-border">
              <img src={heroImg} alt="Hospital reception" width={1600} height={1024} className="w-full h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            </div>
            <Card className="absolute -bottom-6 -left-6 p-4 shadow-elegant max-w-[240px] hidden sm:block animate-float">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-success/15 text-success">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">JCI Accredited</div>
                  <div className="text-xs text-muted-foreground">Highest care standards</div>
                </div>
              </div>
            </Card>
            <Card className="absolute -top-4 -right-4 p-4 shadow-elegant hidden sm:block animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">24/7 Care</div>
                  <div className="text-xs text-muted-foreground">Always here for you</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="container -mt-8 relative z-10">
        <Card className="p-2 sm:p-3 shadow-elegant border-border/60">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground ml-3 shrink-0" />
            <Input
              placeholder="Search doctors by name or specialization…"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="border-0 focus-visible:ring-0 h-12 text-base bg-transparent"
            />
            <Button variant="hero" asChild className="hidden sm:inline-flex">
              <Link to={`/doctors${q ? `?q=${encodeURIComponent(q)}` : ""}`}>Search</Link>
            </Button>
          </div>
          {q && filtered.length > 0 && (
            <div className="border-t border-border mt-2 pt-2 max-h-72 overflow-auto">
              {filtered.slice(0, 5).map(d => (
                <Link key={d.id} to={`/doctors/${d.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-base">
                  <Avatar className="h-10 w-10"><AvatarImage src={d.image} /><AvatarFallback>{d.name[0]}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.specialization}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}
        </Card>
      </section>

      {/* Departments */}
      <section className="container py-20">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider">Our Specialties</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold">Care across every department</h2>
          </div>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link to="/departments">View all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {departments.slice(0, 8).map(dept => {
            const Icon = (Icons as any)[dept.icon] ?? Icons.Stethoscope;
            return (
              <Link key={dept.id} to="/departments">
                <Card className="p-6 h-full hover:border-primary/40 hover:shadow-soft hover:-translate-y-1 transition-base group">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:gradient-primary group-hover:text-primary-foreground transition-base">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display font-semibold">{dept.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{dept.doctorCount} specialists</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured doctors */}
      <section className="container py-12">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider">Meet our specialists</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold">Featured doctors</h2>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/doctors">All doctors <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(d => <DoctorCard key={d.id} doctor={d} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider">Patient stories</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold">Loved by our community</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <Card key={t.id} className="p-6 hover:shadow-soft transition-base">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <Avatar><AvatarImage src={t.avatar} /><AvatarFallback>{t.name[0]}</AvatarFallback></Avatar>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency banner */}
      <section className="container pb-16">
        <Card className="overflow-hidden border-0 gradient-primary text-primary-foreground p-8 md:p-12 shadow-elegant">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold opacity-90">
                <Award className="h-4 w-4" /> 24/7 Emergency Response
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold leading-tight">
                In an emergency? We're here, every second of every day.
              </h2>
              <p className="mt-3 opacity-90 max-w-xl">
                Our emergency teams across all branches are standing by with rapid-response ambulances and trauma specialists.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a href="tel:+8801700100000" className="inline-flex items-center gap-3 rounded-2xl bg-background/15 backdrop-blur px-6 py-4 hover:bg-background/25 transition-base">
                <Phone className="h-6 w-6" />
                <div>
                  <div className="text-xs opacity-80">Emergency hotline</div>
                  <div className="font-display font-bold text-xl">+880 1700-100000</div>
                </div>
              </a>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
