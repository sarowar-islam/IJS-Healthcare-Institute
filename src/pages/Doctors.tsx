import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { branches, departments, doctors } from "@/data/dummy";
import { DoctorCard } from "@/components/DoctorCard";
import { DoctorCardSkeleton } from "@/components/DoctorCardSkeleton";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

const Doctors = () => {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [spec, setSpec] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => doctors.filter(d => {
    if (q && !d.name.toLowerCase().includes(q.toLowerCase()) && !d.specialization.toLowerCase().includes(q.toLowerCase())) return false;
    if (spec !== "all" && d.specialization !== spec) return false;
    if (city !== "all" && branches.find(b => b.id === d.branchId)?.city !== city) return false;
    if (onlyAvailable && !d.available) return false;
    return true;
  }), [q, spec, city, onlyAvailable]);

  return (
    <div className="container py-12">
      <div className="max-w-2xl">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider">Find a doctor</p>
        <h1 className="mt-2 text-4xl font-display font-bold">Browse our specialists</h1>
        <p className="mt-3 text-muted-foreground">Filter by specialization, location and availability to find the right doctor for you.</p>
      </div>

      <Card className="mt-8 p-4 lg:p-5 grid gap-4 lg:grid-cols-[1fr_200px_200px_auto]">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or specialty" className="pl-9 h-11" />
        </div>
        <Select value={spec} onValueChange={setSpec}>
          <SelectTrigger className="h-11"><SelectValue placeholder="Specialization" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All specializations</SelectItem>
            {departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="h-11"><SelectValue placeholder="City" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {branches.map(b => <SelectItem key={b.id} value={b.city}>{b.city}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 px-2">
          <Switch id="avail" checked={onlyAvailable} onCheckedChange={setOnlyAvailable} />
          <Label htmlFor="avail" className="text-sm cursor-pointer">Available only</Label>
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <p><SlidersHorizontal className="h-4 w-4 inline mr-1" /> {filtered.length} doctors found</p>
        {(q || spec !== "all" || city !== "all" || onlyAvailable) && (
          <Button variant="ghost" size="sm" onClick={() => { setQ(""); setSpec("all"); setCity("all"); setOnlyAvailable(false); }}>
            Clear filters
          </Button>
        )}
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <DoctorCardSkeleton key={i} />)
          : filtered.map(d => <DoctorCard key={d.id} doctor={d} />)
        }
      </div>

      {!loading && filtered.length === 0 && (
        <Card className="p-12 text-center mt-6">
          <p className="text-muted-foreground">No doctors match your filters. Try widening your search.</p>
        </Card>
      )}
    </div>
  );
};

export default Doctors;
