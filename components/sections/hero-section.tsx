import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Heart,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/page-container";
import { FadeIn } from "@/components/motion/fade-in";
import { urlForImage } from "@/sanity/lib/image";
import type { Banner, HomePageConfig, SanityImage } from "@/types/sanity";

interface HeroSectionProps {
  banner?: Banner | null;
  homePageConfig?: HomePageConfig | null;
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
  infoCardTitle: "先了解您的情况，再给方案",
  infoCardDescription: "我们不做统一报价，不推固定套餐。先评估年龄、身体情况、过往经历，再给适合您的路径建议。",
};

/**
 * 首页 Hero 首屏
 */
export function HeroSection({ banner, homePageConfig }: HeroSectionProps) {
  const eyebrow = banner?.subtitle || fallback.eyebrow;
  const title = banner?.title || fallback.title;
  const description = banner?.description || fallback.description;
  const primaryText = banner?.buttonText || fallback.primaryButtonText;
  const primaryHref = banner?.buttonLink || fallback.primaryButtonHref;
  const secondaryText = banner?.secondaryButtonText || fallback.secondaryButtonText;
  const secondaryHref = banner?.secondaryButtonLink || fallback.secondaryButtonHref;

  // 从配置读取
  const infoCardTitle = homePageConfig?.heroInfoCardTitle || fallback.infoCardTitle;
  const infoCardDescription = homePageConfig?.heroInfoCardDescription || fallback.infoCardDescription;

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

  // 信任点：从配置读取或使用默认值
  const trustPoints = homePageConfig?.heroTrustPoints?.length
    ? homePageConfig.heroTrustPoints.map((tp) => ({
        icon: tp.icon === "ShieldCheck" ? ShieldCheck
          : tp.icon === "UserRoundCheck" ? UserRoundCheck
          : tp.icon === "CheckCircle2" ? CheckCircle2
          : ShieldCheck,
        title: tp.title,
        text: tp.text,
      }))
    : [
        { icon: ShieldCheck, title: "隐私保护", text: "沟通资料严格保密" },
        { icon: UserRoundCheck, title: "专属顾问", text: "一对一评估需求" },
        { icon: CheckCircle2, title: "先评估", text: "不推固定套餐" },
      ];

  // 服务标签：从配置读取或使用默认值
  const serviceTags = homePageConfig?.heroServiceTags?.length
    ? homePageConfig.heroServiceTags
    : ["高龄备孕", "二胎咨询", "试管多次失败", "特殊生育需求"];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* 极淡装饰性背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/[0.045] to-transparent" />
        <div className="absolute left-0 top-24 h-56 w-[42%] bg-brand-green-light/60" />
      </div>

      <PageContainer className="relative py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:gap-12">
          {/* 左侧文案 */}
          <FadeIn className="max-w-2xl" y={32}>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3 py-1.5",
                "text-xs font-medium text-primary shadow-sm"
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {eyebrow}
            </span>

            <h1
              className={cn(
                "mt-5 text-3xl font-semibold leading-[1.3] sm:text-4xl lg:text-[2.9rem]",
                "text-foreground"
              )}
            >
              {title.split(/\r?\n/).map((line, i, arr) => (
                <span key={i}>
                  {line || " "}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p
              className={cn(
                "mt-5 max-w-[42rem] text-base leading-relaxed sm:text-lg",
                "text-muted-foreground"
              )}
            >
              {description}
            </p>

            {/* 按钮组 */}
            <div className="mt-7 flex flex-col sm:flex-row w-full sm:w-auto gap-3">
              <Link href={primaryHref} className="w-full sm:w-auto">
                <Button
                  className={cn(
                    "w-full sm:w-auto h-11 px-7 rounded-[10px] text-sm font-medium",
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary-hover transition-colors"
                  )}
                >
                  {primaryText}
                </Button>
              </Link>
              <Link href={secondaryHref} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto h-11 px-7 rounded-[10px] text-sm font-medium",
                    "border-primary text-primary bg-transparent",
                    "hover:bg-primary/5",
                    "transition-colors"
                  )}
                >
                  <Phone className="w-4 h-4 mr-2 text-primary" />
                  {secondaryText}
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {trustPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border/70 bg-white/90 p-4 shadow-sm"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {serviceTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/[0.08] px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* 右侧图片卡片 */}
          <FadeIn className="relative" delay={0.15} y={32}>
            <div
              className={cn(
                "relative overflow-hidden rounded-xl",
                "border border-border bg-white shadow-[0_18px_50px_rgba(15,23,42,0.10)]"
              )}
            >
              {/* 图片区域 */}
              <div className="relative aspect-[4/3] bg-muted">
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
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/5 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-primary/30" />
                      </div>
                      <p className="text-xs text-muted-foreground/50">
                        专业 · 温暖 · 陪伴
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 信息卡片 */}
              <div className="p-5 sm:p-6">
                <h3 className="text-base font-semibold text-foreground mb-1.5">
                  {infoCardTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {infoCardDescription}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

      </PageContainer>
    </section>
  );
}
