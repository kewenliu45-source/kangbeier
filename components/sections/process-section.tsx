import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/motion/fade-in";
import type { HomePageConfig, HeroProcessStep } from "@/types/sanity";

interface ProcessSectionProps {
  steps?: HeroProcessStep[];
  homePageConfig?: HomePageConfig | null;
  className?: string;
}

const fallbackSteps: HeroProcessStep[] = [
  {
    title: "初步咨询",
    description: "了解年龄、身体情况、过往治疗经历和当前需求。",
  },
  {
    title: "专属评估",
    description: "根据情况梳理适合的检查方向和方案重点。",
  },
  {
    title: "方案建议",
    description: "给出服务路径、医疗资源对接和准备事项。",
  },
  {
    title: "周期陪伴",
    description: "在关键节点提供提醒、沟通和进度跟进。",
  },
  {
    title: "后续随访",
    description: "根据结果和反馈调整下一步建议。",
  },
];

/**
 * 首页助孕流程区块
 */
export function ProcessSection({
  steps,
  homePageConfig,
  className,
}: ProcessSectionProps) {
  const displaySteps = steps && steps.length > 0 ? steps : fallbackSteps;

  // 配置文字
  const eyebrow = homePageConfig?.processEyebrow || "Our Process";
  const title = homePageConfig?.processTitle || "服务流程";
  const description = homePageConfig?.processDescription || "从初次咨询到后续随访，全程专业陪伴";

  return (
    <section
      id="process"
      className={cn("py-16 lg:py-24 bg-brand-cream", className)}
    >
      <PageContainer>
        <FadeIn>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />
        </FadeIn>

        {/* 桌面端：横向步骤 */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* 连接线 */}
            <div className="absolute top-8 left-[10%] right-[10%] h-px bg-border" />

            <div className="grid grid-cols-5 gap-6">
              {displaySteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  {/* 编号 */}
                  <div
                    className={cn(
                      "relative z-10 w-16 h-16 mx-auto mb-5",
                      "rounded-full flex items-center justify-center",
                      "bg-primary text-primary-foreground text-xl font-bold"
                    )}
                  >
                    {index + 1}
                  </div>

                  {/* 标题 */}
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {step.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 移动端：纵向步骤 */}
        <div className="lg:hidden">
          <div className="relative">
            {/* 连接线 */}
            <div className="absolute top-0 bottom-0 left-8 w-px bg-border" />

            <div className="space-y-8">
              {displaySteps.map((step, index) => (
                <div key={index} className="relative flex gap-5">
                  {/* 编号 */}
                  <div
                    className={cn(
                      "relative z-10 flex-shrink-0 w-16 h-16",
                      "rounded-full flex items-center justify-center",
                      "bg-primary text-primary-foreground text-xl font-bold"
                    )}
                  >
                    {index + 1}
                  </div>

                  {/* 内容 */}
                  <div className="pt-2">
                    <h3 className="text-base font-bold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
