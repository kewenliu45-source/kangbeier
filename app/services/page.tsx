import type { Metadata } from "next";
import { fetchServices, fetchSiteSettings, fetchServicesPageConfig } from "@/sanity/lib/fetchers";
import { buildMetadata } from "@/lib/metadata";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ServiceCard } from "@/components/cards/service-card";
import { CtaSection } from "@/components/sections/cta-section";
import type { Service } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "服务项目",
    description:
      "不做统一套餐推荐，先了解年龄、身体情况、过往经历和当前需求，再给出更清晰的服务建议。",
    path: "/services",
  });
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
    title: "促排卵方案咨询",
    slug: { current: "ovulation-induction", _type: "slug" },
    summary:
      "根据卵巢功能和身体状况，制定个性化促排方案，提高取卵效率。",
    highlights: ["个性化方案", "卵巢调理", "监测指导"],
  },
  {
    _id: "fallback-4",
    _type: "service",
    title: "胚胎筛查方案",
    slug: { current: "embryo-screening", _type: "slug" },
    summary:
      "通过先进胚胎筛查技术，提高着床率，降低流产风险，助力健康妊娠。",
    highlights: ["PGS/PGD", "着床率提升", "优生优育"],
  },
  {
    _id: "fallback-5",
    _type: "service",
    title: "高龄备孕方案",
    slug: { current: "advanced-age-fertility", _type: "slug" },
    summary:
      "专为 35 岁以上女性设计的个性化备孕方案，综合调理提升生育机会。",
    highlights: ["35+", "卵巢调理", "个性化方案"],
  },
  {
    _id: "fallback-6",
    _type: "service",
    title: "私密定制咨询",
    slug: { current: "private-consultation", _type: "slug" },
    summary:
      "一对一私密咨询，全程保护隐私，根据您的具体情况制定最适合的路径。",
    highlights: ["1对1", "隐私保护", "全程陪伴"],
  },
];

export default async function ServicesPage() {
  const [services, siteSettings, servicesPageConfig] = await Promise.all([
    fetchServices(),
    fetchSiteSettings(),
    fetchServicesPageConfig(),
  ]);
  const displayServices =
    services && services.length > 0 ? services : fallbackServices;

  return (
    <main>
      {/* 面包屑 */}
      <PageContainer className="pt-4 pb-0">
        <Breadcrumbs items={[{ label: "服务项目" }]} />
      </PageContainer>

      {/* 页面标题区 */}
      <section className="bg-brand-cream pt-8 pb-12 lg:pt-12 lg:pb-16">
        <PageContainer>
          <SectionHeader
            eyebrow={servicesPageConfig?.heroEyebrow || "服务项目"}
            title={servicesPageConfig?.heroTitle || "根据您的情况，匹配更合适的助孕咨询路径"}
            description={servicesPageConfig?.heroDescription || "不做统一套餐推荐，先了解年龄、身体情况、过往经历和当前需求，再给出更清晰的服务建议。"}
            align="center"
          />
        </PageContainer>
      </section>

      {/* 服务卡片列表 */}
      <section className="bg-brand-cream pb-16 lg:pb-24">
        <PageContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {displayServices.map((service) => (
              <ServiceCard key={service._id} service={service} variant="image" />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* CTA */}
      <CtaSection siteSettings={siteSettings} />
    </main>
  );
}
