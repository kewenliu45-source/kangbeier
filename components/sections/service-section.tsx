import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { ServiceCard } from "@/components/cards/service-card";
import { FadeIn } from "@/components/motion/fade-in";
import type { Service, HomePageConfig } from "@/types/sanity";

interface ServiceSectionProps {
  services?: Service[];
  homePageConfig?: HomePageConfig | null;
  className?: string;
}

const fallbackServices: Service[] = [
  {
    _id: "fallback-1",
    _type: "service",
    title: "第三代试管咨询",
    slug: { current: "ivf-consultation", _type: "slug" },
    summary:
      "针对有遗传病风险或反复失败的家庭，提供第三代试管婴儿技术的专业咨询与方案规划。",
    highlights: ["PGT 技术", "遗传筛查", "方案定制"],
  },
  {
    _id: "fallback-2",
    _type: "service",
    title: "试管前评估",
    slug: { current: "pre-ivf-assessment", _type: "slug" },
    summary:
      "全面评估身体状况、生育力指标和心理准备，为试管之路打好基础。",
    highlights: ["身体评估", "生育力检测", "心理辅导"],
  },
  {
    _id: "fallback-3",
    _type: "service",
    title: "胚胎筛查方案",
    slug: { current: "embryo-screening", _type: "slug" },
    summary:
      "通过先进胚胎筛查技术，提高着床率，降低流产风险，助力健康妊娠。",
    highlights: ["PGS/PGD", "着床率提升", "优生优育"],
  },
  {
    _id: "fallback-4",
    _type: "service",
    title: "高龄备孕方案",
    slug: { current: "advanced-age-fertility", _type: "slug" },
    summary:
      "专为 35 岁以上女性设计的个性化备孕方案，综合调理提升生育机会。",
    highlights: ["35+", "卵巢调理", "个性化方案"],
  },
  {
    _id: "fallback-5",
    _type: "service",
    title: "私密定制咨询",
    slug: { current: "private-consultation", _type: "slug" },
    summary:
      "一对一私密咨询，全程保护隐私，根据您的具体情况制定最适合的路径。",
    highlights: ["1对1", "隐私保护", "全程陪伴"],
  },
  {
    _id: "fallback-6",
    _type: "service",
    title: "LGBT人群辅助生殖方案",
    slug: { current: "lgbt-fertility", _type: "slug" },
    summary:
      "为LGBT群体提供专业的辅助生殖咨询，包括卵子/精子挑选、代孕方案及出生证办理等全流程支持。",
    highlights: ["卵子/精子挑选", "出生证办理", "全流程支持"],
  },
];

/**
 * 首页服务区块
 */
export function ServiceSection({
  services = fallbackServices,
  homePageConfig,
  className,
}: ServiceSectionProps) {
  const displayServices =
    services && services.length > 0 ? services : fallbackServices;

  // 配置文字
  const eyebrow = homePageConfig?.serviceEyebrow || "Our Services";
  const title = homePageConfig?.serviceTitle || "专业服务项目";
  const description = homePageConfig?.serviceDescription || "为您的家庭提供全方位的辅助生殖咨询服务";

  return (
    <section className={cn("py-16 lg:py-24 bg-brand-cream", className)}>
      <PageContainer>
        <FadeIn>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {displayServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </FadeIn>

        {/* 空状态提示 */}
        {displayServices.length === 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Stethoscope className="w-4 h-4" />
              <span>服务项目正在更新中，欢迎联系我们了解详情</span>
            </div>
          </div>
        )}
      </PageContainer>
    </section>
  );
}
