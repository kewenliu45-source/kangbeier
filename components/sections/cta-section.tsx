"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/page-container";
import { FadeIn } from "@/components/motion/fade-in";

interface CtaSectionProps {
  /** 主标题 */
  title?: string;
  /** 描述文字 */
  description?: string;
  /** 主按钮文字 */
  primaryButtonText?: string;
  /** 主按钮链接 */
  primaryButtonHref?: string;
  /** 次按钮文字 */
  secondaryButtonText?: string;
  /** 次按钮链接 */
  secondaryButtonHref?: string;
  /** 电话号码 */
  phone?: string;
  /** 自定义 className */
  className?: string;
}

const defaultProps = {
  title: "先了解您的情况，再给方案",
  description:
    "我们不做统一报价，不推固定套餐。先评估年龄、身体情况、过往经历，再给适合您的路径建议。",
  primaryButtonText: "免费咨询方案",
  secondaryButtonText: "立即电话沟通",
  phone: "15527283220",
};

/**
 * 可复用咨询转化区块
 * 用于首页、服务页、文章页等位置。
 */
export function CtaSection({
  title = defaultProps.title,
  description = defaultProps.description,
  primaryButtonText = defaultProps.primaryButtonText,
  primaryButtonHref,
  secondaryButtonText = defaultProps.secondaryButtonText,
  secondaryButtonHref = `tel:${defaultProps.phone}`,
  phone = defaultProps.phone,
  className,
}: CtaSectionProps) {
  return (
    <section
      className={cn(
        "py-16 lg:py-24",
        "bg-brand-cream-light",
        className
      )}
    >
      <PageContainer>
        <FadeIn>
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "bg-white border border-border",
            "px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20",
            "shadow-sm"
          )}
        >
          {/* 装饰性背景 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="relative max-w-2xl">
            {/* 标题 */}
            <h2
              className={cn(
                "text-2xl sm:text-3xl lg:text-4xl font-bold",
                "text-primary"
              )}
            >
              {title}
            </h2>

            {/* 描述 */}
            {description && (
              <p
                className={cn(
                  "mt-4 text-sm sm:text-base leading-relaxed",
                  "text-muted-foreground"
                )}
              >
                {description}
              </p>
            )}

            {/* 按钮组 */}
            <div className="mt-8 flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4">
              {/* 主按钮 */}
              {primaryButtonHref ? (
                <Link href={primaryButtonHref} className="w-full sm:w-auto">
                  <Button
                    className={cn(
                      "w-full sm:w-auto h-12 px-8 rounded-lg text-sm font-semibold",
                      "bg-primary text-primary-foreground",
                      "hover:bg-primary/90 transition-colors"
                    )}
                  >
                    {primaryButtonText}
                  </Button>
                </Link>
              ) : (
                <Button
                  className={cn(
                    "w-full sm:w-auto h-12 px-8 rounded-lg text-sm font-semibold",
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary/90 transition-colors"
                  )}
                >
                  {primaryButtonText}
                </Button>
              )}

              {/* 次按钮 */}
              {secondaryButtonHref ? (
                <Link href={secondaryButtonHref} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-auto h-12 px-8 rounded-lg text-sm font-semibold",
                      "border-accent text-accent-foreground",
                      "hover:bg-accent hover:text-accent-foreground",
                      "transition-colors"
                    )}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {secondaryButtonText}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto h-12 px-8 rounded-lg text-sm font-semibold",
                    "border-accent text-accent-foreground",
                    "hover:bg-accent hover:text-accent-foreground",
                    "transition-colors"
                  )}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {secondaryButtonText}
                </Button>
              )}
            </div>

            {/* 电话号码 */}
            {phone && (
              <p className="mt-6 text-sm text-muted-foreground">
                或直接拨打：{" "}
                <a
                  href={`tel:${phone}`}
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
                </a>
              </p>
            )}
          </div>
        </div>
        </FadeIn>
      </PageContainer>
    </section>
  );
}
