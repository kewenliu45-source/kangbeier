import { Shield, Users, HeartHandshake, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Advantage } from "@/types/sanity";

interface AdvantageCardProps {
  advantage: Advantage;
  index: number;
  className?: string;
}

/** fallback 图标映射 */
const fallbackIcons = [
  { icon: Users, color: "text-primary" },
  { icon: Shield, color: "text-accent" },
  { icon: Stethoscope, color: "text-primary" },
  { icon: HeartHandshake, color: "text-accent" },
];

/**
 * 优势卡片
 */
export function AdvantageCard({
  advantage,
  index,
  className,
}: AdvantageCardProps) {
  const iconData = fallbackIcons[index % fallbackIcons.length];
  const Icon = iconData.icon;

  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-6 sm:p-7",
        "border border-border/50 shadow-sm",
        "transition-all duration-200",
        "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        className
      )}
    >
      {/* 图标 */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
          "bg-brand-green-light"
        )}
      >
        <Icon className={cn("w-6 h-6", iconData.color)} />
      </div>

      {/* 标题 */}
      <h3 className="text-lg font-bold text-primary">{advantage.title}</h3>

      {/* 描述 */}
      {advantage.summary && (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {advantage.summary}
        </p>
      )}
    </div>
  );
}
