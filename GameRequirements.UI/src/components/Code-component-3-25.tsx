import { CompatibilityStatus } from "./CompatibilityBadge";

interface ProgressRingProps {
  percentage: number;
  status: CompatibilityStatus;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

const statusColors = {
  compatible: "#76BC21",
  borderline: "#F59E0B", 
  incompatible: "#9CA3AF",
};

export function ProgressRing({ 
  percentage, 
  status, 
  size = 120, 
  strokeWidth = 8,
  showLabel = true 
}: ProgressRingProps) {
  const normalizedRadius = (size - strokeWidth * 2) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        height={size}
        width={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          stroke={statusColors[status]}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-semibold text-foreground text-lg">
              {percentage}%
            </div>
            <div className="text-xs text-muted-foreground">
              совместимость
            </div>
          </div>
        </div>
      )}
    </div>
  );
}