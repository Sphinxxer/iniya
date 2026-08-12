import type { CSSProperties } from "react";
import {
  ArrowLeftRight,
  BadgeCheck,
  Boxes,
  Clock3,
  Cylinder,
  Droplet,
  Factory,
  FileSliders,
  FlaskConical,
  Gauge,
  GitMerge,
  Globe2,
  Layers2,
  Mail,
  MapPin,
  MessageCircle,
  Orbit,
  Package,
  Phone,
  Ruler,
  Send,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Tag,
  Truck,
  Waves,
  type LucideIcon,
} from "lucide-react";

const iconMap = {
  fibreType: Waves,
  blend: GitMerge,
  colour: Droplet,
  yarnCount: Ruler,
  grade: BadgeCheck,
  quantity: Boxes,
  manufacturer: Factory,
  supplier: Package,
  trader: ArrowLeftRight,
  exporter: Globe2,
  processing: Settings2,
  specification: FileSliders,
  laboratory: FlaskConical,
  review: ShieldCheck,
  dispatch: Truck,
  quality: ShieldCheck,
  customisation: SlidersHorizontal,
  pricing: Tag,
  delivery: Clock3,
  spinning: Cylinder,
  textileManufacturing: Layers2,
  product: Package,
  contact: Send,
  email: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
  location: MapPin,
  hank: Orbit,
  csp: Gauge,
} satisfies Record<string, LucideIcon>;

export type FeatureIconName = keyof typeof iconMap;
export type FeatureIconSize = "utility" | "small" | "feature" | "workflow" | "industry";

const iconSizes: Record<FeatureIconSize, string> = {
  utility: "1.125rem",
  small: "1.25rem",
  feature: "1.75rem",
  workflow: "2rem",
  industry: "2.5rem",
};

export function FeatureIcon({
  name,
  size = "feature",
  className,
}: {
  name: FeatureIconName;
  size?: FeatureIconSize;
  className?: string;
}) {
  const Icon = iconMap[name];

  return (
    <span
      aria-hidden="true"
      className={["feature-icon", className].filter(Boolean).join(" ")}
      style={{ "--feature-icon-size": iconSizes[size] } as CSSProperties}
    >
      <Icon strokeWidth={1.65} />
    </span>
  );
}
