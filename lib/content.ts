import {
  Banknote,
  BarChart3,
  Blocks,
  Briefcase,
  Calculator,
  Eye,
  FileSpreadsheet,
  Gauge,
  Landmark,
  Receipt,
  Crosshair,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
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

export interface Pillar {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FirmValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Home page value propositions (impact-driven, no scale metrics). */
export const valueProps: readonly ValueProp[] = [
  {
    title: "Financial engineering",
    description:
      "We treat your books like infrastructure—structured, reconciled, and built to hold up under scrutiny, fundraising, and growth.",
    icon: Calculator,
  },
  {
    title: "Seamless integration",
    description:
      "Your bank, billing, payroll, and spend tools flow into one source of truth. No spreadsheets stitched together by hand.",
    icon: Workflow,
  },
  {
    title: "Clarity at every layer",
    description:
      "Plain-English reporting and live dashboards translate the numbers into decisions you can actually act on.",
    icon: Eye,
  },
  {
    title: "Always one step ahead",
    description:
      "Proactive, not reactive. We surface risks and opportunities before they hit your runway—not after.",
    icon: Sparkles,
  },
];

/** Corporate accounting capabilities (Home preview + Services page). */
export const services: readonly Service[] = [
  {
    slug: "bookkeeping",
    title: "Bookkeeping & Close",
    summary:
      "Accurate, reconciled books with a fast, predictable monthly close you can rely on.",
    features: ["Monthly reconciliations", "Accrual & cash basis", "Fast close"],
    icon: FileSpreadsheet,
  },
  {
    slug: "tax-compliance",
    title: "Tax & Compliance",
    summary:
      "Proactive planning and filing that keeps you compliant and minimizes liability.",
    features: ["Multi-jurisdiction filings", "Quarterly estimates", "Credits"],
    icon: Receipt,
  },
  {
    slug: "payroll",
    title: "Payroll & Benefits",
    summary:
      "Reliable payroll, contractor payments, and benefits administration—fully managed.",
    features: ["Multi-region payroll", "Contractor payments", "Benefits sync"],
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
    features: ["Custom dashboards", "Variance analysis", "Unit economics"],
    icon: BarChart3,
  },
];

/** Pillars of approach — replaces the old numeric stats band. */
export const approachPillars: readonly Pillar[] = [
  {
    title: "Precision",
    description:
      "Every figure is traceable to its source. No rounding away the details that matter.",
    icon: Crosshair,
  },
  {
    title: "Integration",
    description:
      "One connected system—your tools and your finances speaking the same language.",
    icon: Blocks,
  },
  {
    title: "Clarity",
    description:
      "Reporting that reads like a story, not a riddle. You always know where you stand.",
    icon: Eye,
  },
  {
    title: "Velocity",
    description:
      "A close that keeps pace with your business, so insight never arrives too late.",
    icon: Gauge,
  },
];

/** Firm values for the About page. */
export const firmValues: readonly FirmValue[] = [
  {
    title: "Precision",
    description:
      "We treat your books with the rigor of a public-company finance team—every number, every time.",
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
