import { NavLink, Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { Calendar, FileText, Heart, LayoutDashboard, LogOut, User, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/appointments", label: "Appointments", icon: Calendar },
  { to: "/dashboard/records", label: "Medical Records", icon: FileText },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

export const DashboardLayout = () => {
  const { isAuthenticated, patient, logout } = useAppStore();
  const navigate = useNavigate();

  if (!isAuthenticated || !patient) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-secondary/30">
      <aside className="fixed inset-y-0 left-0 hidden lg:flex w-64 flex-col border-r border-border bg-card">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg p-5 border-b border-border">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground">
            <Heart className="h-5 w-5" fill="currentColor" />
          </span>
          IJS Healthcare
        </Link>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-base ${
                  isActive ? "gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`
              }
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/"><ArrowLeft className="h-4 w-4" /> Back to site</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => { logout(); navigate("/"); }}>
            <LogOut className="h-4 w-4" /> Log out
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 glass border-b border-border">
          <div className="flex items-center justify-between gap-4 px-5 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="lg:hidden flex items-center gap-2 font-display font-bold">
                <Heart className="h-5 w-5 text-primary" fill="currentColor" />
                IJS
              </Link>
              <h1 className="hidden sm:block font-display font-semibold text-lg">Patient Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Avatar className="h-9 w-9">
                <AvatarImage src={patient.avatar} />
                <AvatarFallback>{patient.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <nav className="lg:hidden flex gap-1 px-3 pb-3 overflow-x-auto">
            {navItems.map(n => (
              <NavLink key={n.to} to={n.to} end={n.end}
                className={({ isActive }) => `shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium ${isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
