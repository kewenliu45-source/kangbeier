import type { Metadata } from "next";
import { fetchAdvantagesPageData } from "@/sanity/lib/fetchers";
import { buildMetadata } from "@/lib/metadata";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { AdvantageCard } from "@/components/cards/advantage-card";
import { CtaSection } from "@/components/sections/cta-section";
import { cn } from "@/lib/utils";
import type { Advantage } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchAdvantagesPageData();
  const seo = data.pageSeo;

  return buildMetadata({
    title: seo?.title || "选择我们",
    description:
      seo?.description ||
      "从身体情况评估、方案理解、资源对接到周期陪伴，为有特殊生育需求的家庭提供更清晰的咨询支持。",
    keywords: seo?.keywords,
    path: "/advantages",
    noIndex: seo?.noIndex || false,
  });
}

const fallbackAdvantages: Advantage[] = [
  {
    _id: "fallback-1",
    _type: "advantage",
    title: "一对一评估，不套模板",
    slug: { current: "personal-assessment", _type: "slug" },
    summary:
      "每位客户都有专属顾问，根据年龄、身体状况和过往经历，量身定制最适合的生育方案。",
  },
  {
    _id: "fallback-2",
    _type: "advantage",
    title: "重视隐私保护",
    slug: { current: "privacy-protection", _type: "slug" },
    summary:
      "全程严格保护客户隐私，咨询记录加密存储，个人信息绝不外泄。",
  },
  {
    _id: "fallback-3",
    _type: "advantage",
    title: "协助梳理医疗资源",
    slug: { current: "medical-resources", _type: "slug" },
    summary:
      "整合国内外优质生殖医疗资源，为您匹配最适合的医院和专家团队。",
  },
  {
    _id: "fallback-4",
    _type: "advantage",
    title: "关键节点全程提醒",
    slug: { current: "full-companionship", _type: "slug" },
    summary:
      "从初次咨询到成功怀孕，全程陪伴跟踪进度，及时解答疑问和调整方案。",
  },
  {
    _id: "fallback-5",
    _type: "advantage",
    title: "高龄和多次失败经验更丰富",
    slug: { current: "advanced-age-experience", _type: "slug" },
    summary:
      "对高龄备孕、多次试管失败等复杂情况有更丰富的咨询经验，能给出更务实的建议。",
  },
  {
    _id: "fallback-6",
    _type: "advantage",
    title: "沟通透明，路径清晰",
    slug: { current: "transparent-communication", _type: "slug" },
    summary:
      "不做统一报价，不推固定套餐。先了解情况，再给出清晰的服务路径和资源建议。",
  },
];

export default async function AdvantagesPage() {
  const data = await fetchAdvantagesPageData();
  const displayAdvantages =
    data.advantages && data.advantages.length > 0
      ? data.advantages
      : fallbackAdvantages;

  return (
    <main>
      {/* 面包屑 */}
      <PageContainer className="pt-4 pb-0">
        <Breadcrumbs items={[{ label: "选择我们" }]} />
      </PageContainer>

      {/* 页面 Hero */}
      <section className="bg-brand-cream pt-8 pb-12 lg:pt-12 lg:pb-16">
        <PageContainer>
          <SectionHeader
            eyebrow={data.advantagesPageConfig?.heroEyebrow || "选择我们"}
            title={data.advantagesPageConfig?.heroTitle || "让每一步选择都有依据"}
            description={data.advantagesPageConfig?.heroDescription || "从身体情况评估、方案理解、资源对接到周期陪伴，为有特殊生育需求的家庭提供更清晰的咨询支持。"}
            align="center"
          />
        </PageContainer>
      </section>

      {/* 优势卡片列表 */}
      <section className="py-12 lg:py-20 bg-brand-green-light">
        <PageContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
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

      {/* 统计数据区 */}
      {data.advantages?.some((a) => a.statistics && a.statistics.length > 0) && (
        <section className="py-12 lg:py-16 bg-white">
          <PageContainer>
            <SectionHeader
              eyebrow={data.advantagesPageConfig?.statsEyebrow || "数据见证"}
              title={data.advantagesPageConfig?.statsTitle || "我们的服务数据"}
              align="center"
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {data.advantages
                .flatMap((a) => a.statistics || [])
                .slice(0, 4)
                .map((stat, i) => (
                  <div
                    key={i}
                    className="bg-brand-cream rounded-2xl p-5 text-center border border-border/50"
                  >
                    <p className="text-2xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* 关联服务入口 */}
      {data.advantages?.some(
        (a) => a.relatedServices && a.relatedServices.length > 0
      ) && (
        <section className="py-12 lg:py-16 bg-brand-cream">
          <PageContainer>
            <SectionHeader
              eyebrow={data.advantagesPageConfig?.relatedServicesEyebrow || "相关服务"}
              title={data.advantagesPageConfig?.relatedServicesTitle || "了解更多服务项目"}
              align="center"
            />
            <div className="flex flex-wrap justify-center gap-3">
              {data.advantages
                .flatMap((a) => a.relatedServices || [])
                .filter(
                  (s, i, arr) => arr.findIndex((x) => x._id === s._id) === i
                )
                .slice(0, 6)
                .map((service) => (
                  <a
                    key={service._id}
                    href={`/services/${service.slug?.current || ""}`}
                    className="text-sm px-5 py-2.5 rounded-full bg-white border border-border/50 text-primary font-medium hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    {service.title}
                  </a>
                ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* CTA */}
      <CtaSection siteSettings={data.siteSettings} />
    </main>
  );
}
