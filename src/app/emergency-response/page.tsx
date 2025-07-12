import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, ShieldCheck, Wind, AlertTriangle } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const SchoolChecklist = [
  "Move all outdoor activities indoors.",
  "Ensure all windows and doors are securely closed.",
  "Activate central air purification systems or place portable purifiers in every classroom.",
  "Monitor students with asthma or other respiratory conditions closely.",
  "Communicate the situation and safety measures to parents via email or SMS.",
];

const HospitalChecklist = [
  "Ensure HEPA filters in HVAC systems are functioning optimally.",
  "Restrict patient movement outdoors, especially for those in respiratory, cardiac, or pediatric wards.",
  "Place portable air purifiers in waiting areas and patient rooms.",
  "Prepare for a potential increase in patients with respiratory distress.",
  "Ensure all staff are aware of protocols and have access to N95 masks if necessary.",
];

export default function EmergencyResponsePage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          Emergency Response
        </h2>
        <p className="text-muted-foreground mt-2">
          High AQI Action Plans for Schools & Hospitals
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>For Schools</CardTitle>
          <CardDescription>
            Protecting students during severe air pollution events.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Immediate Action Checklist
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
              {SchoolChecklist.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Guidance on Air Purifiers</AccordionTrigger>
              <AccordionContent>
                When selecting air purifiers for classrooms, prioritize those with high-efficiency HEPA filters. Ensure the purifier's Clean Air Delivery Rate (CADR) is appropriate for the classroom size. Place units strategically to maximize air circulation, away from corners and furniture that may obstruct airflow.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button asChild variant="outline">
            <Link href="/#" target="_blank">
                <FileText className="mr-2" />
                Download School Response Plan Template
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>For Hospitals & Clinics</CardTitle>
          <CardDescription>
            Ensuring patient safety during air quality emergencies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-destructive" />
              Immediate Action Checklist
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
              {HospitalChecklist.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
           <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Protecting Vulnerable Patient Areas</AccordionTrigger>
              <AccordionContent>
                Create designated 'clean air zones' within the facility for high-risk patients, such as those in neonatal intensive care units (NICU), cardiac wards, and oncology centers. These areas should have enhanced air filtration and positive pressure ventilation to prevent polluted air from entering.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button asChild variant="outline">
            <Link href="/#" target="_blank">
                <FileText className="mr-2" />
                Download Hospital Response Plan Template
            </Link>
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
