import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import type { Service } from "@/types/sanity";

interface ServiceCardProps {
  service: Service;
  href?: string;
  variant?: "default" | "image";
  className?: string;
}

/**
 * 服务项目卡片
 */
export function ServiceCard({
  service,
  href,
  variant = "default",
  className,
}: ServiceCardProps) {
  const serviceHref = service.slug?.current
    ? `/services/${service.slug.current}`
    : "/services";
  const cardHref = href || serviceHref;
  const isImageVariant = variant === "image";

  const hasImage = service.coverImage?.image?.asset;
  let imageUrl: string | null = null;
  if (hasImage && service.coverImage?.image) {
    try {
      imageUrl = urlForImage(
        service.coverImage.image as unknown as Parameters<typeof urlForImage>[0]
      )
        .width(600)
        .height(400)
        .url();
    } catch {
      imageUrl = null;
    }
  }

  if (isImageVariant) {
    return (
      <Link
        href={cardHref}
        className={cn(
          "group block h-full bg-white rounded-2xl overflow-hidden",
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
              alt={service.coverImage?.alt || service.title}
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
                <p className="text-xs text-muted-foreground/60">服务项目</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6">
          {service.highlights && service.highlights.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {service.highlights.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded-full bg-brand-green-light text-primary/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {service.title}
          </h3>

          {service.summary && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {service.summary}
            </p>
          )}

          <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent/80 transition-colors">
            <span>了解详情</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={cardHref}
      className={cn(
        "group block h-full bg-white rounded-2xl p-6 sm:p-7",
        "border border-border/50 shadow-sm",
        "transition-all duration-200",
        "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        className
      )}
    >
      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
        {service.title}
      </h3>

      {service.summary && (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {service.summary}
        </p>
      )}

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

      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent/80 transition-colors">
        <span>了解详情</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
