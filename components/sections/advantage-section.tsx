import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { AdvantageCard } from "@/components/cards/advantage-card";
import type { Advantage } from "@/types/sanity";

interface AdvantageSectionProps {
  advantages?: Advantage[];
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
  className,
}: AdvantageSectionProps) {
  const displayAdvantages =
    advantages && advantages.length > 0 ? advantages : fallbackAdvantages;

  return (
    <section className={cn("py-16 lg:py-24 bg-brand-green-light", className)}>
      <PageContainer>
        <SectionHeader
          eyebrow="Why Choose Us"
          title="选择我们的理由"
          description="专业、私密、高效的一站式辅助生殖咨询服务"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {displayAdvantages.map((advantage, index) => (
            <AdvantageCard
              key={advantage._id}
              advantage={advantage}
              index={index}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
