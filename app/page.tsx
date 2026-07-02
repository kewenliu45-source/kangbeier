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

  // 优先级：pageSeo > siteSettings.defaultSeo > fallback
  const pageSeo = data.pageSeo;
  const defaultSeo = data.siteSettings?.defaultSeo;

  return buildMetadata({
    title: pageSeo?.title || defaultSeo?.metaTitle || "好孕生命中心",
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
      <TrustBar />

      {/* 3. 服务项目 */}
      <ServiceSection services={data.featuredServices} />

      {/* 4. 核心优势 */}
      <AdvantageSection advantages={data.featuredAdvantages} />

      {/* 5. 服务流程 */}
      <ProcessSection />

      {/* 6. 成功案例 */}
      <CaseSection cases={data.featuredCases} />

      {/* 7. 科普文章 */}
      <ArticleSection articles={data.featuredArticles} />

      {/* 8. 科普视频 */}
      <VideoSection videos={data.featuredVideos} />

      {/* 9. 常见问题 */}
      <FaqSection faqs={faqs} />

      {/* 10. 咨询转化 */}
      <CtaSection />
    </main>
  );
}
