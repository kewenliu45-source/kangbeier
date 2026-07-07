import Image from "next/image";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import type { CaseStudy } from "@/types/sanity";

interface CaseCardProps {
  caseStudy: CaseStudy;
  className?: string;
}

/**
 * 匿名成功案例卡片
 */
export function CaseCard({ caseStudy, className }: CaseCardProps) {
  // 图片处理
  const hasImage = caseStudy.coverImage?.image?.asset;
  let imageUrl: string | null = null;
  if (hasImage && caseStudy.coverImage?.image) {
    try {
      imageUrl = urlForImage(
        caseStudy.coverImage.image as unknown as Parameters<typeof urlForImage>[0]
      )
        .width(600)
        .height(400)
        .url();
    } catch {
      imageUrl = null;
    }
  }

  return (
    <div
      className={cn(
        "h-full bg-white rounded-2xl overflow-hidden",
        "border border-border/50 shadow-sm",
        "transition-all duration-200",
        "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        className
      )}
    >
      {/* 封面图 */}
      <div className="relative aspect-[16/10] bg-brand-cream-light">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={caseStudy.coverImage?.alt || caseStudy.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary/40" />
              </div>
              <p className="text-xs text-muted-foreground/60">成功案例</p>
            </div>
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="p-6 sm:p-7">
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
        <h3 className="text-lg font-bold text-foreground mb-2">
          {caseStudy.title}
        </h3>

        {/* 案例简介 */}
        {caseStudy.summary && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
            {caseStudy.summary}
          </p>
        )}

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
    </div>
  );
}
