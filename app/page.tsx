import { fetchHomePageData } from "@/sanity/lib/fetchers";
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
