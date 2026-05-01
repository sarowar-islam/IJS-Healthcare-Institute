import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border bg-secondary/30 mt-20">
    <div className="container py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <img src="/photo/founder.png" alt="Founder" className="h-9 w-9 rounded-full object-cover" />
          <span>IJS Healthcare</span>
        </Link>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          Modern, compassionate healthcare across five cities. Founded by Israth Jahan Apshara to make world-class care accessible to all.
        </p>
        <div className="flex gap-2 mt-5">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-base">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Explore</h4>
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          <li><Link to="/doctors" className="hover:text-primary transition-base">Find a Doctor</Link></li>
          <li><Link to="/departments" className="hover:text-primary transition-base">Departments</Link></li>
          <li><Link to="/branches" className="hover:text-primary transition-base">Our Branches</Link></li>
          <li><Link to="/about" className="hover:text-primary transition-base">About Us</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Patient Portal</h4>
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          <li><Link to="/login" className="hover:text-primary transition-base">Log in</Link></li>
          <li><Link to="/signup" className="hover:text-primary transition-base">Create account</Link></li>
          <li><Link to="/dashboard" className="hover:text-primary transition-base">Dashboard</Link></li>
          <li><Link to="/dashboard/appointments" className="hover:text-primary transition-base">My Appointments</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Contact</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> 12 Gulshan Avenue, Dhaka 1212</li>
          <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" /> +880 1700-100001</li>
          <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" /> care@ijshealth.com</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container py-5 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} IJS Healthcare Institute. All rights reserved.</p>
        <p>Made by Sarowar.</p>
      </div>
    </div>
  </footer>
);
