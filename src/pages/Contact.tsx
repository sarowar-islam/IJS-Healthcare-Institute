import { useState } from "react";
import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Thanks! We'll be in touch within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container py-12">
      <div className="max-w-2xl">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider">Get in touch</p>
        <h1 className="mt-2 text-4xl font-display font-bold">We'd love to hear from you</h1>
        <p className="mt-3 text-muted-foreground">Questions, feedback or partnership inquiries — reach out and our team will respond promptly.</p>
      </div>

      <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-8">
        <Card className="p-6 sm:p-8">
          <form onSubmit={submit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full name *</Label>
                <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-2 h-11" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-2 h-11" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="mt-2 h-11" placeholder="How can we help?" />
            </div>
            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="mt-2 min-h-32" placeholder="Tell us more…" />
            </div>
            <Button variant="hero" size="lg" type="submit"><Send className="h-4 w-4" /> Send message</Button>
          </form>
        </Card>

        <div className="space-y-4">
          {[
            { icon: MapPin, title: "Head office", text: "12 Gulshan Avenue, Dhaka 1212" },
            { icon: Phone, title: "Phone", text: "+880 1700-100001" },
            { icon: Mail, title: "Email", text: "care@ijshealth.com" },
            { icon: MessageSquare, title: "Live chat", text: "Available Mon-Sat, 9am-9pm" },
          ].map(item => (
            <Card key={item.title} className="p-5 flex items-start gap-4 hover:border-primary/40 transition-base">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{item.text}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
