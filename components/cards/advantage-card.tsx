import Image from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import type { Advantage } from "@/types/sanity";

interface AdvantageCardProps {
  advantage: Advantage;
  index: number;
  className?: string;
}

export function AdvantageCard({
  advantage,
  className,
}: AdvantageCardProps) {
  const hasImage = advantage.coverImage?.image?.asset;
  let imageUrl: string | null = null;

  if (hasImage && advantage.coverImage?.image) {
    try {
      imageUrl = urlForImage(
        advantage.coverImage.image as unknown as Parameters<typeof urlForImage>[0]
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
        "group h-full bg-white rounded-2xl overflow-hidden",
        "border border-border/50 shadow-sm",
        "transition-all duration-200",
        "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="relative aspect-[16/10] bg-brand-cream-light">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={advantage.coverImage?.alt || advantage.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary/40" />
              </div>
              <p className="text-xs text-muted-foreground/60">优势特色</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {advantage.title}
        </h3>

        {advantage.summary && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {advantage.summary}
          </p>
        )}
      </div>
    </div>
  );
}
