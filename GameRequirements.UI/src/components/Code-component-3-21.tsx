import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";

export type CompatibilityStatus = "compatible" | "borderline" | "incompatible";

interface CompatibilityBadgeProps {
  status: CompatibilityStatus;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  compatible: {
    label: "Совместимо",
    icon: CheckCircle,
    className: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  borderline: {
    label: "На грани",
    icon: AlertTriangle,
    className: "bg-warning text-warning-foreground hover:bg-warning/90",
  },
  incompatible: {
    label: "Требуется апгрейд",
    icon: XCircle,
    className: "bg-muted text-muted-foreground hover:bg-muted/90",
  },
};

export function CompatibilityBadge({ status, size = "md" }: CompatibilityBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };
  
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <Badge className={`${config.className} ${sizeClasses[size]} flex items-center gap-2`}>
      <Icon className={iconSizes[size]} />
      {config.label}
    </Badge>
  );
}