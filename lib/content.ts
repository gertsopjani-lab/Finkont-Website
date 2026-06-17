import {
  Banknote,
  BarChart3,
  Briefcase,
  Calculator,
  FileSpreadsheet,
  Gauge,
  Landmark,
  Receipt,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface ValueProp {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  features: readonly string[];
  icon: LucideIcon;
}

export interface Stat {
  value: string;
  label: string;
}

export interface FirmValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Home page value propositions. */
export const valueProps: readonly ValueProp[] = [
  {
    title: "Always audit-ready",
    description:
      "Clean books, reconciled monthly, with documentation that stands up to any review or due-diligence process.",
    icon: ShieldCheck,
  },
  {
    title: "Clarity on demand",
    description:
      "Real-time dashboards and plain-English reporting so you always know exactly where your business stands.",
    icon: Gauge,
  },
  {
    title: "Built to scale",
    description:
      "From your first hire to your Series B, our systems and advisors grow with you—no rebuilds required.",
    icon: Sparkles,
  },
];

/** Corporate accounting capabilities (used on Home preview + Services page). */
export const services: readonly Service[] = [
  {
    slug: "bookkeeping",
    title: "Bookkeeping & Close",
    summary:
      "Accurate, reconciled books with a fast, predictable monthly close you can rely on.",
    features: [
      "Monthly reconciliations",
      "Accrual & cash basis",
      "Month-end close in 5 days",
    ],
    icon: FileSpreadsheet,
  },
  {
    slug: "tax-compliance",
    title: "Tax & Compliance",
    summary:
      "Proactive tax planning and filing that keeps you compliant and minimizes liability.",
    features: [
      "Federal, state & local filings",
      "Quarterly estimates",
      "R&D and credit capture",
    ],
    icon: Receipt,
  },
  {
    slug: "payroll",
    title: "Payroll & Benefits",
    summary:
      "Reliable payroll, contractor payments, and benefits administration—fully managed.",
    features: ["Multi-state payroll", "Contractor 1099s", "Benefits sync"],
    icon: Banknote,
  },
  {
    slug: "audit-assurance",
    title: "Audit & Assurance",
    summary:
      "Audit preparation and assurance support that gives stakeholders confidence.",
    features: ["Audit readiness", "Investor reporting", "Controls review"],
    icon: ShieldCheck,
  },
  {
    slug: "advisory",
    title: "Advisory & Fractional CFO",
    summary:
      "Strategic financial leadership—budgeting, forecasting, and fundraising support.",
    features: ["Budget & forecast", "Cash-flow modeling", "Board decks"],
    icon: Briefcase,
  },
  {
    slug: "reporting",
    title: "Reporting & Analytics",
    summary:
      "Decision-ready reporting and KPI dashboards tailored to your business model.",
    features: ["Custom KPI dashboards", "Variance analysis", "Unit economics"],
    icon: BarChart3,
  },
];

/** Credibility stats band. */
export const stats: readonly Stat[] = [
  { value: "$2.4B+", label: "Transactions reconciled" },
  { value: "650+", label: "Businesses served" },
  { value: "5-day", label: "Average monthly close" },
  { value: "99.2%", label: "Client retention" },
];

/** Firm values for the About page. */
export const firmValues: readonly FirmValue[] = [
  {
    title: "Precision",
    description:
      "Every number is traceable. We treat your books with the rigor of a public-company finance team.",
    icon: Calculator,
  },
  {
    title: "Partnership",
    description:
      "We sit on your side of the table—proactive, responsive, and invested in your outcomes.",
    icon: Users,
  },
  {
    title: "Integrity",
    description:
      "Independent, objective, and discreet. Your trust is the foundation of everything we do.",
    icon: Landmark,
  },
];
