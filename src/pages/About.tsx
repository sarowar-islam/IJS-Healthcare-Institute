import { Award, HeartHandshake, Sparkles, Target, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import founderImg from "@/assets/founder.jpg";

const values = [
  { icon: HeartHandshake, title: "Patient-first", desc: "Every decision begins and ends with the wellbeing of our patients." },
  { icon: Sparkles, title: "Innovation", desc: "We invest in modern technology to deliver smarter, faster care." },
  { icon: Users, title: "Community", desc: "Healthcare that reaches every corner of every city we serve." },
  { icon: Target, title: "Excellence", desc: "Internationally accredited standards, measured outcomes." },
];

const About = () => (
  <div>
    <section className="container py-16 lg:py-24">
      <div className="max-w-3xl">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider">About IJS Healthcare</p>
        <h1 className="mt-3 text-4xl lg:text-5xl font-display font-bold leading-tight">
          Healing with heart. Built on <span className="text-gradient">science.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          IJS Healthcare Institute is a multi-city hospital network founded on the belief that exceptional care should be accessible, dignified, and deeply human. From routine consultations to complex surgeries, our 300+ specialists serve over 250,000 patients each year.
        </p>
      </div>
    </section>

    {/* Founder */}
    <section className="container pb-20">
      <Card className="overflow-hidden border-border/60 shadow-soft">
        <div className="grid lg:grid-cols-[420px_1fr]">
          <div className="relative bg-gradient-to-br from-primary/15 to-accent/15">
            <img src={founderImg} alt="Israth Jahan Apshara, Founder" loading="lazy" className="w-full h-full object-cover aspect-[4/5] lg:aspect-auto" />
          </div>
          <div className="p-8 lg:p-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Award className="h-3.5 w-3.5" /> Founder & Chairperson
            </span>
            <h2 className="mt-4 text-3xl font-display font-bold">Israth Jahan Apshara</h2>
            <p className="mt-1 text-primary font-medium">MBA, Healthcare Strategy · Founder, IJS Healthcare Institute</p>

            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Israth Jahan Apshara founded IJS Healthcare with a singular mission — to bring world-class hospital care to families across Bangladesh, regardless of city or means. Her leadership has shaped a network defined by clinical excellence, transparent pricing, and human-centred design.
              </p>
              <p>
                Under her stewardship, IJS has grown to five city branches, opened 12 specialty centres of excellence, and pioneered Bangladesh's most modern patient digital experience. She continues to lead the institute's vision for accessible, technology-driven healthcare.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "18+", l: "Years leading" },
                { v: "5", l: "City branches" },
                { v: "300+", l: "Specialists" },
              ].map(s => (
                <div key={s.l} className="rounded-2xl bg-secondary/50 p-4 text-center">
                  <div className="text-2xl font-display font-bold text-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </section>

    {/* Values */}
    <section className="container pb-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider">Our values</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold">What we stand for</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {values.map(v => (
          <Card key={v.title} className="p-6 hover:border-primary/40 hover:-translate-y-1 transition-base">
            <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <v.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display font-semibold text-lg">{v.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  </div>
);

export default About;
