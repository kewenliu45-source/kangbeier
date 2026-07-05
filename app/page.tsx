import type { Metadata } from "next";
import { fetchHomePageData } from "@/sanity/lib/fetchers";
import { buildMetadata } from "@/lib/metadata";
import { WebSiteJsonLd } from "@/components/seo/website-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServiceSection } from "@/components/sections/service-section";
import { AdvantageSection } from "@/components/sections/advantage-section";
import { ProcessSection } from "@/components/sections/process-section";
import { CaseSection } from "@/components/sections/case-section";
import { ArticleSection } from "@/components/sections/article-section";
import { VideoSection } from "@/components/sections/video-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchHomePageData();

  // 优先级：pageSeo > siteSettings.defaultSeo > siteSettings.siteName > fallback
  const pageSeo = data.pageSeo;
  const defaultSeo = data.siteSettings?.defaultSeo;
  const siteName = data.siteSettings?.siteName || "好孕生命中心";

  return buildMetadata({
    title: pageSeo?.title || defaultSeo?.metaTitle || siteName,
    description:
      pageSeo?.description ||
      defaultSeo?.metaDescription ||
      "为高龄、二胎、试管多次失败及特殊生育需求家庭，提供一对一助孕咨询、方案评估和全程陪伴服务。",
    keywords: pageSeo?.keywords || defaultSeo?.keywords,
    path: "/",
    noIndex: pageSeo?.noIndex || defaultSeo?.noIndex || false,
  });
}

export default async function Home() {
  const data = await fetchHomePageData();

  // 转换 FAQ 数据格式（Sanity Faq → FaqSection 需要的格式）
  const faqs =
    data.featuredFaqs?.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })) || [];

  return (
    <main>
      <WebSiteJsonLd
        name={data.siteSettings?.siteName || "好孕生命中心"}
        description={data.siteSettings?.description}
      />
      <FaqJsonLd faqs={faqs} />

      {/* 1. Hero 首屏 */}
      <HeroSection banner={data.banners?.[0]} />

      {/* 2. 信任背书 */}
      <TrustBar className="pt-8 pb-6 lg:pt-10 lg:pb-8" />

      {/* 3. 服务项目 */}
      <ServiceSection
        services={data.featuredServices}
        className="pt-8 pb-14 lg:pt-10 lg:pb-16"
      />

      {/* 4. 核心优势 */}
      <AdvantageSection
        advantages={data.featuredAdvantages}
        className="py-14 lg:py-18"
      />

      {/* 5. 服务流程 */}
      <ProcessSection className="py-14 lg:py-18 bg-white" />

      {/* 6. 成功案例 */}
      <CaseSection
        cases={data.featuredCases}
        className="pt-14 pb-10 lg:pt-18 lg:pb-12 bg-brand-green-light"
      />

      {/* 7. 科普文章 */}
      <ArticleSection
        articles={data.featuredArticles}
        className="pt-10 pb-8 lg:pt-12 lg:pb-10 bg-brand-green-light"
      />

      {/* 8. 科普视频 */}
      <VideoSection
        videos={data.featuredVideos}
        className="pt-8 pb-14 lg:pt-10 lg:pb-18 bg-brand-green-light"
      />

      {/* 9. 常见问题 */}
      <FaqSection faqs={faqs} className="py-14 lg:py-18 bg-white" />

      {/* 10. 咨询转化 */}
      <CtaSection className="pt-0 pb-14 lg:pb-18 bg-white" />
    </main>
  );
}
