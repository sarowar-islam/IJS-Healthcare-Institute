import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signup = useAppStore(s => s.signup);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 2) return toast.error("Please enter your full name");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Please enter a valid email");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords do not match");
    setLoading(true);
    setTimeout(() => {
      signup(name, email);
      toast.success("Account created!");
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative gradient-primary p-12 flex-col justify-between text-primary-foreground">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <Heart className="h-6 w-6" fill="currentColor" /> IJS Healthcare
        </Link>
        <div>
          <h2 className="text-4xl font-display font-bold leading-tight">Join 250,000+ patients <br />who trust IJS.</h2>
          <p className="mt-4 opacity-90 max-w-md">Book appointments, view prescriptions and chat with care teams from anywhere.</p>
        </div>
        <p className="text-sm opacity-80">© {new Date().getFullYear()} IJS Healthcare Institute</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-2xl font-display font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">It only takes a minute.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <div className="relative mt-2">
                <User className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" value={name} onChange={e => setName(e.target.value)} className="pl-9 h-11" placeholder="Jane Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2">
                <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-9 h-11" placeholder="you@example.com" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-2">
                  <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="pl-9 h-11" placeholder="••••••••" />
                </div>
              </div>
              <div>
                <Label htmlFor="confirm">Confirm</Label>
                <div className="relative mt-2">
                  <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="pl-9 h-11" placeholder="••••••••" />
                </div>
              </div>
            </div>
            <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating…" : "Create account"}
            </Button>
          </form>
          <p className="mt-6 text-sm text-center text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
