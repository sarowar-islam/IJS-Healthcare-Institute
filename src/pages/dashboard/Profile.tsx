import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/store/useAppStore";

const Profile = () => {
  const { patient, updatePatient } = useAppStore();
  const [form, setForm] = useState(patient!);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatient(form);
    toast.success("Profile updated");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Keep your information up to date for faster check-ins.</p>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20 ring-4 ring-primary/15">
            <AvatarImage src={form.avatar} />
            <AvatarFallback>{form.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-display font-semibold text-xl">{form.name}</div>
            <div className="text-sm text-muted-foreground">{form.email}</div>
          </div>
        </div>

        <form onSubmit={save} className="mt-8 grid sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" className="mt-2 h-11" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="mt-2 h-11" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" className="mt-2 h-11" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="dob">Date of birth</Label>
            <Input id="dob" type="date" className="mt-2 h-11" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="blood">Blood group</Label>
            <Input id="blood" className="mt-2 h-11" value={form.bloodGroup} onChange={e => setForm({ ...form, bloodGroup: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" className="mt-2 h-11" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value as any })} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" className="mt-2" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Button variant="hero" type="submit">Save changes</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
