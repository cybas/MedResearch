'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Scale, FileText } from "lucide-react";

const standards = [
  {
    value: "hipaa",
    title: "HIPAA",
    icon: CheckCircle,
    summary: "Framework for protecting sensitive patient health information. This product is HIPAA-ready, supporting your compliance needs via BAAs and technical safeguards.",
    details: [
        "Access Controls: Role-based access ensures only authorized users see specific data.",
        "Encryption: All PHI is encrypted at rest and in transit.",
        "Audit Logging: All actions are logged for accountability.",
        "Business Associate Agreement (BAA): Available for enterprise customers."
    ],
    action: "Download HIPAA Overview"
  },
  {
    value: "gdpr",
    title: "GDPR",
    icon: Shield,
    summary: "Regulation on data protection and privacy for all individuals within the European Union and the European Economic Area.",
     details: [
        "Data Processing Agreement (DPA): Available with Standard Contractual Clauses (SCCs).",
        "Data Residency: EU data can be processed and stored within the EU region.",
        "User Consent: Explicit consent is obtained for alerts and notifications.",
        "Data Subject Rights: Tools to support data access, rectification, and erasure requests."
    ],
    action: "Download DPA (Template)"
  },
  {
    value: "ethics",
    title: "Research Ethics",
    icon: Scale,
    summary: "Commitment to responsible AI use in a medical context, emphasizing that AI-generated summaries are informational and not a substitute for clinical judgment.",
    details: [
        "Non-Diagnostic Use: Summaries are for research and informational purposes only.",
        "Data Integrity: We do not alter the content of source materials.",
        "Transparency: AI-generated content is clearly marked."
    ],
    action: "View Disclaimers"
  },
   {
    value: "soc2",
    title: "SOC 2 / ISO 27001",
    icon: FileText,
    summary: "Industry-standard frameworks for security, availability, processing integrity, confidentiality, and privacy.",
    badge: "In Progress",
    details: [
        "Currently undergoing SOC 2 Type II audit.",
        "Expected completion: Q4 2025.",
        "ISO 27001 certification planned for 2026."
    ],
    action: "View Roadmap"
  }
];

export function StandardsAccordion() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-xl">Standards & Certifications</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {standards.map(standard => (
            <AccordionItem value={standard.value} key={standard.value}>
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-4">
                  <standard.icon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-base flex items-center gap-2">
                        {standard.title}
                        {standard.badge && <Badge variant="secondary">{standard.badge}</Badge>}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 font-normal">{standard.summary}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-14">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm mb-4">
                    {standard.details.map((detail, i) => <li key={i}>{detail}</li>)}
                </ul>
                <Button variant="secondary" size="sm">{standard.action}</Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
