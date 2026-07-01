import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/page-container";
import { urlForImage } from "@/sanity/lib/image";
import type { Banner, SanityImage } from "@/types/sanity";

interface HeroSectionProps {
  banner?: Banner | null;
}

const fallback = {
  eyebrow: "一对一生育方案咨询",
  title: "让求子之路\n更安心、更清晰",
  description:
    "为高龄、二胎、试管多次失败及有特殊生育需求的家庭，提供从评估、方案、医疗资源对接到全程陪伴的一站式咨询服务。",
  primaryButtonText: "免费咨询方案",
  primaryButtonHref: "/contact",
  secondaryButtonText: "立即电话沟通",
  secondaryButtonHref: "tel:15527283220",
};

/**
 * 首页 Hero 首屏
 */
export function HeroSection({ banner }: HeroSectionProps) {
  const eyebrow = banner?.subtitle || fallback.eyebrow;
  const title = banner?.title || fallback.title;
  const description = banner?.description || fallback.description;
  const primaryText = banner?.buttonText || fallback.primaryButtonText;
  const primaryHref = banner?.buttonLink || fallback.primaryButtonHref;
  const secondaryText = banner?.secondaryButtonText || fallback.secondaryButtonText;
  const secondaryHref = banner?.secondaryButtonLink || fallback.secondaryButtonHref;

  // 图片处理
  const hasImage = banner?.desktopImage?.image?.asset;
  let imageUrl: string | null = null;
  if (hasImage && banner?.desktopImage?.image) {
    try {
      imageUrl = urlForImage(
        banner.desktopImage.image as unknown as Parameters<typeof urlForImage>[0]
      )
        .width(800)
        .height(600)
        .url();
    } catch {
      imageUrl = null;
    }
  }

  return (
    <section className="relative bg-brand-cream overflow-hidden">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <PageContainer className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧文案 */}
          <div className="max-w-xl">
            <span
              className={cn(
                "inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4",
                "text-accent"
              )}
            >
              {eyebrow}
            </span>

            <h1
              className={cn(
                "text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.15]",
                "text-primary"
              )}
            >
              {title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < title.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p
              className={cn(
                "mt-6 text-base sm:text-lg leading-relaxed",
                "text-muted-foreground"
              )}
            >
              {description}
            </p>

            {/* 按钮组 */}
            <div className="mt-8 flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4">
              <Link href={primaryHref} className="w-full sm:w-auto">
                <Button
                  className={cn(
                    "w-full sm:w-auto h-12 px-8 rounded-full text-sm font-semibold",
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary/90 transition-colors"
                  )}
                >
                  {primaryText}
                </Button>
              </Link>
              <Link href={secondaryHref} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto h-12 px-8 rounded-full text-sm font-semibold",
                    "border-accent text-accent-foreground bg-accent/10",
                    "hover:bg-accent hover:text-accent-foreground",
                    "transition-colors"
                  )}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {secondaryText}
                </Button>
              </Link>
            </div>
          </div>

          {/* 右侧图片卡片 */}
          <div className="relative">
            <div
              className={cn(
                "relative rounded-[28px] overflow-hidden",
                "bg-white shadow-lg border border-border/50"
              )}
            >
              {/* 图片区域 */}
              <div className="relative aspect-[4/3] bg-brand-cream-light">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={banner?.desktopImage?.alt || "好孕生命中心"}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-3xl">🤱</span>
                      </div>
                      <p className="text-sm text-muted-foreground/60">
                        专业 · 温暖 · 陪伴
                      </p>
                    </div>
                  </div>
                )}
                {/* 淡遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              </div>

              {/* 信息卡片 */}
              <div className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
                  先了解您的情况，再给方案
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  我们不做统一报价，不推固定套餐。先评估年龄、身体情况、过往经历，再给适合您的路径建议。
                </p>
              </div>
            </div>
          </div>
        </div>

      </PageContainer>
    </section>
  );
}
