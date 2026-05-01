import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAppStore(s => s.login);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Please enter a valid email");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    setTimeout(() => {
      login(email);
      toast.success("Welcome back!");
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
          <h2 className="text-4xl font-display font-bold leading-tight">Your health, <br />beautifully organized.</h2>
          <p className="mt-4 opacity-90 max-w-md">Manage appointments, prescriptions and reports across all IJS branches in one place.</p>
        </div>
        <p className="text-sm opacity-80">© {new Date().getFullYear()} IJS Healthcare Institute</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <Card className="w-full max-w-md p-8">
          <Link to="/" className="lg:hidden flex items-center gap-2 font-display font-bold text-lg mb-6">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground"><Heart className="h-5 w-5" fill="currentColor" /></span>
            IJS Healthcare
          </Link>
          <h1 className="text-2xl font-display font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Log in to your patient portal.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2">
                <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-9 h-11" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="pl-9 h-11" placeholder="••••••••" />
              </div>
            </div>
            <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Log in"}
            </Button>
          </form>
          <p className="mt-6 text-sm text-center text-muted-foreground">
            New here? <Link to="/signup" className="text-primary font-medium hover:underline">Create an account</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
