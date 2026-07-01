import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { ServiceCard } from "@/components/cards/service-card";
import type { Service } from "@/types/sanity";

interface ServiceSectionProps {
  services?: Service[];
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
];

/**
 * 首页服务区块
 */
export function ServiceSection({
  services = fallbackServices,
  className,
}: ServiceSectionProps) {
  const displayServices =
    services && services.length > 0 ? services : fallbackServices;

  return (
    <section className={cn("py-16 lg:py-24 bg-brand-cream", className)}>
      <PageContainer>
        <SectionHeader
          eyebrow="Our Services"
          title="专业服务项目"
          description="为您的家庭提供全方位的辅助生殖咨询服务"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {displayServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
