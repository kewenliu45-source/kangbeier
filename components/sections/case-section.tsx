import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { CaseCard } from "@/components/cards/case-card";
import { FadeIn } from "@/components/motion/fade-in";
import type { CaseStudy } from "@/types/sanity";

interface CaseSectionProps {
  cases?: CaseStudy[];
  className?: string;
}

const fallbackCases: CaseStudy[] = [
  {
    _id: "fallback-1",
    _type: "case",
    title: "高龄备孕家庭的方案梳理",
    slug: { current: "advanced-age-case", _type: "slug" },
    isAnonymous: true,
    ageRange: "38岁",
    treatmentType: "综合评估",
    duration: "3个月",
    challenge:
      "婚后多年未孕，年龄偏大，卵巢功能下降，之前自行尝试多种方法无果。",
    result:
      "通过系统评估明确身体现状，梳理适合的检查方向，制定个性化调理方案，路径更清晰。",
  },
  {
    _id: "fallback-2",
    _type: "case",
    title: "多次移植失败后重新评估",
    slug: { current: "repeated-failure-case", _type: "slug" },
    isAnonymous: true,
    ageRange: "35岁",
    treatmentType: "方案优化",
    duration: "2个月",
    challenge:
      "经历多次移植失败，身心疲惫，对下一步方向迷茫，不知道问题出在哪里。",
    result:
      "重新梳理过往治疗记录，找出可能的调整方向，对接适合的医疗资源，减少盲目尝试。",
  },
  {
    _id: "fallback-3",
    _type: "case",
    title: "二胎备孕方案梳理",
    slug: { current: "second-child-case", _type: "slug" },
    isAnonymous: true,
    ageRange: "36岁",
    treatmentType: "二胎咨询",
    duration: "1个月",
    challenge:
      "第一胎自然怀孕，二胎备孕一年多未成功，身体状况与几年前不同。",
    result:
      "评估当前生育力指标，结合家庭情况给出备孕建议和资源对接，方案更匹配实际需求。",
  },
];

/**
 * 首页案例区块
 */
export function CaseSection({
  cases = fallbackCases,
  className,
}: CaseSectionProps) {
  const displayCases = cases && cases.length > 0 ? cases : fallbackCases;

  return (
    <section
      id="cases"
      className={cn("py-16 lg:py-24 bg-brand-cream", className)}
    >
      <PageContainer>
        <FadeIn>
          <SectionHeader
            eyebrow="Success Stories"
            title="真实案例分享"
            description="匿名展示，保护隐私，仅供参考"
            align="center"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {displayCases.map((caseStudy) => (
              <CaseCard key={caseStudy._id} caseStudy={caseStudy} />
            ))}
          </div>
        </FadeIn>

        {/* 空状态提示 */}
        {displayCases.length === 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>案例正在整理中，您可以联系我们了解详情</span>
            </div>
          </div>
        )}

        {/* 合规提示 */}
        <p className="mt-8 text-center text-xs text-muted-foreground/60">
          * 案例已匿名处理，仅供参考，不构成任何医疗建议或效果承诺
        </p>
      </PageContainer>
    </section>
  );
}
