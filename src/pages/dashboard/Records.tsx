import { Download, FileText, Pill } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/store/useAppStore";
import { doctors } from "@/data/dummy";

const Records = () => {
  const { prescriptions, reports } = useAppStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Medical Records</h1>
        <p className="text-muted-foreground mt-1">All your prescriptions and reports in one place.</p>
      </div>

      <Tabs defaultValue="prescriptions">
        <TabsList>
          <TabsTrigger value="prescriptions"><Pill className="h-4 w-4" /> Prescriptions</TabsTrigger>
          <TabsTrigger value="reports"><FileText className="h-4 w-4" /> Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="prescriptions" className="mt-5 space-y-4">
          {prescriptions.map(rx => {
            const doc = doctors.find(d => d.id === rx.doctorId);
            return (
              <Card key={rx.id} className="p-6">
                <div className="flex justify-between items-start gap-3 flex-wrap">
                  <div>
                    <h3 className="font-display font-semibold text-lg">{rx.diagnosis}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">Prescribed by {doc?.name} · {new Date(rx.date).toLocaleDateString()}</p>
                  </div>
                  <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Download</Button>
                </div>
                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                  {rx.medications.map((m, i) => (
                    <div key={i} className="p-3 rounded-lg bg-secondary/50 border border-border">
                      <div className="font-medium">{m.name} <span className="text-muted-foreground font-normal">· {m.dose}</span></div>
                      <div className="text-xs text-muted-foreground mt-1">{m.frequency} · {m.duration}</div>
                    </div>
                  ))}
                </div>
                {rx.notes && <p className="mt-4 text-sm text-muted-foreground italic">Note: {rx.notes}</p>}
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="reports" className="mt-5 space-y-3">
          {reports.map(r => (
            <Card key={r.id} className="p-5 flex items-center gap-4 hover:border-primary/40 transition-base">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{r.title}</h3>
                  <Badge variant="secondary">{r.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{r.doctor} · {new Date(r.date).toLocaleDateString()}</p>
              </div>
              <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Download</Button>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Records;
