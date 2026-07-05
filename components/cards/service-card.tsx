import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/sanity";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

/**
 * 服务项目卡片
 */
export function ServiceCard({ service, className }: ServiceCardProps) {
  const href = `/services/${service.slug?.current || ""}`;

  return (
    <Link
      href={href}
      className={cn(
        "group block h-full bg-white rounded-2xl p-6 sm:p-7",
        "border border-border/50 shadow-sm",
        "transition-all duration-200",
        "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        className
      )}
    >
      {/* 标题 */}
      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
        {service.title}
      </h3>

      {/* 简介 */}
      {service.summary && (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {service.summary}
        </p>
      )}

      {/* 亮点标签 */}
      {service.highlights && service.highlights.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {service.highlights.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full bg-brand-green-light text-primary/80"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 了解更多 */}
      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent/80 transition-colors">
        <span>了解详情</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
