import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { AdvantageCard } from "@/components/cards/advantage-card";
import { FadeIn } from "@/components/motion/fade-in";
import type { Advantage, HomePageConfig } from "@/types/sanity";

interface AdvantageSectionProps {
  advantages?: Advantage[];
  homePageConfig?: HomePageConfig | null;
  className?: string;
}

const fallbackAdvantages: Advantage[] = [
  {
    _id: "fallback-1",
    _type: "advantage",
    title: "一对一方案评估",
    slug: { current: "personal-assessment", _type: "slug" },
    summary:
      "每位客户都有专属顾问，根据年龄、身体状况和过往经历，量身定制最适合的生育方案。",
  },
  {
    _id: "fallback-2",
    _type: "advantage",
    title: "私密咨询保护",
    slug: { current: "privacy-protection", _type: "slug" },
    summary:
      "全程严格保护客户隐私，咨询记录加密存储，个人信息绝不外泄。",
  },
  {
    _id: "fallback-3",
    _type: "advantage",
    title: "医疗资源对接",
    slug: { current: "medical-resources", _type: "slug" },
    summary:
      "整合国内外优质生殖医疗资源，为您匹配最适合的医院和专家团队。",
  },
  {
    _id: "fallback-4",
    _type: "advantage",
    title: "全程进度陪伴",
    slug: { current: "full-companionship", _type: "slug" },
    summary:
      "从初次咨询到成功怀孕，全程陪伴跟踪进度，及时解答疑问和调整方案。",
  },
];

/**
 * 首页优势区块
 */
export function AdvantageSection({
  advantages = fallbackAdvantages,
  homePageConfig,
  className,
}: AdvantageSectionProps) {
  const displayAdvantages =
    advantages && advantages.length > 0 ? advantages : fallbackAdvantages;

  // 配置文字
  const eyebrow = homePageConfig?.advantageEyebrow || "Why Choose Us";
  const title = homePageConfig?.advantageTitle || "选择我们的理由";
  const description = homePageConfig?.advantageDescription || "专业、私密、高效的一站式辅助生殖咨询服务";
  const detailText = homePageConfig?.advantageDetailText || "先把过往经历、身体状态和当下顾虑梳理清楚，再匹配更合适的检查方向、医疗资源和陪伴节奏，避免在信息混乱里反复试错。";

  return (
    <section className={cn("py-16 lg:py-24 bg-brand-green-light", className)}>
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.45fr] lg:items-start lg:gap-10">
          <FadeIn>
            <div className="lg:sticky lg:top-24">
              <SectionHeader
                eyebrow={eyebrow}
                title={title}
                description={description}
                align="left"
                className="mb-0"
              />
              <div className="mt-6 rounded-xl border border-primary/10 bg-white/70 p-5 text-sm leading-relaxed text-muted-foreground shadow-sm">
                {detailText}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {displayAdvantages.map((advantage, index) => (
                <AdvantageCard
                  key={advantage._id}
                  advantage={advantage}
                  index={index}
                />
              ))}
            </div>
          </FadeIn>
        </div>

        {/* 空状态提示 */}
        {displayAdvantages.length === 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>内容正在整理中，欢迎联系我们了解详情</span>
            </div>
          </div>
        )}
      </PageContainer>
    </section>
  );
}
