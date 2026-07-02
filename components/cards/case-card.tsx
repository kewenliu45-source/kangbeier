import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types/sanity";

interface CaseCardProps {
  caseStudy: CaseStudy;
  className?: string;
}

/**
 * 匿名成功案例卡片
 */
export function CaseCard({ caseStudy, className }: CaseCardProps) {
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
      {/* 标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {caseStudy.treatmentType && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-brand-green-light text-primary/80">
            {caseStudy.treatmentType}
          </span>
        )}
        {caseStudy.ageRange && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent-foreground">
            {caseStudy.ageRange}
          </span>
        )}
        {caseStudy.duration && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
            {caseStudy.duration}
          </span>
        )}
      </div>

      {/* 标题 */}
      <h3 className="text-lg font-bold text-primary mb-3">
        {caseStudy.title}
      </h3>

      {/* 挑战 */}
      {caseStudy.challenge && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {caseStudy.challenge}
        </p>
      )}

      {/* 结果 */}
      {caseStudy.result && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-sm text-primary/80 leading-relaxed line-clamp-2">
            {caseStudy.result}
          </p>
        </div>
      )}
    </div>
  );
}
