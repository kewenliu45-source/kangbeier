import type { Metadata } from "next";
import { fetchKnowledgePageData } from "@/sanity/lib/fetchers";
import { buildMetadata, getSanityOgImageUrl } from "@/lib/metadata";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ArticleCard } from "@/components/cards/article-card";
import { VideoCard } from "@/components/cards/video-card";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { Film, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Article, Video } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchKnowledgePageData();
  const seo = data.pageSeo;

  return buildMetadata({
    title: seo?.title || "科普中心",
    description:
      seo?.description ||
      "整理试管基础知识、高龄备孕、胚胎筛查和常见问题，帮助您在咨询前先建立基本判断。",
    keywords: seo?.keywords,
    image: getSanityOgImageUrl(seo?.ogImage),
    path: "/knowledge",
    noIndex: seo?.noIndex || false,
  });
}

const fallbackArticles: Article[] = [
  {
    _id: "fallback-1",
    _type: "article",
    title: "试管前需要了解哪些基础检查？",
    slug: { current: "basic-tests-before-ivf", _type: "slug" },
    excerpt:
      "在开始试管之前，了解基础检查项目可以帮助您更好地准备，提高成功率。",
    category: {
      _id: "cat-1",
      _type: "articleCategory",
      title: "试管基础知识",
      slug: { current: "ivf-basics", _type: "slug" },
    },
    publishedAt: "2024-01-15T00:00:00Z",
  },
  {
    _id: "fallback-2",
    _type: "article",
    title: "高龄备孕为什么要先做系统评估？",
    slug: { current: "why-assessment-for-advanced-age", _type: "slug" },
    excerpt:
      "35岁以上备孕，系统评估可以帮助您了解身体现状，制定更合理的备孕计划。",
    category: {
      _id: "cat-2",
      _type: "articleCategory",
      title: "高龄备孕",
      slug: { current: "advanced-age", _type: "slug" },
    },
    publishedAt: "2024-01-10T00:00:00Z",
  },
  {
    _id: "fallback-3",
    _type: "article",
    title: "胚胎筛查适合哪些家庭？",
    slug: { current: "embryo-screening-for-whom", _type: "slug" },
    excerpt:
      "胚胎筛查技术可以帮助特定家庭降低遗传风险，了解是否适合您的情况。",
    category: {
      _id: "cat-3",
      _type: "articleCategory",
      title: "胚胎筛查",
      slug: { current: "embryo-screening", _type: "slug" },
    },
    publishedAt: "2024-01-05T00:00:00Z",
  },
];

const fallbackVideos: Video[] = [
  {
    _id: "fallback-1",
    _type: "video",
    title: "试管婴儿的完整流程是怎样的？",
    slug: { current: "ivf-process-overview", _type: "slug" },
    summary: "用5分钟了解试管婴儿从检查到移植的完整流程。",
    duration: "05:12",
    category: {
      _id: "cat-1",
      _type: "articleCategory",
      title: "试管基础知识",
      slug: { current: "ivf-basics", _type: "slug" },
    },
  },
  {
    _id: "fallback-2",
    _type: "video",
    title: "高龄备孕需要注意什么？",
    slug: { current: "advanced-age-tips", _type: "slug" },
    summary: "35岁以上备孕的关键注意事项和建议。",
    duration: "04:35",
    category: {
      _id: "cat-2",
      _type: "articleCategory",
      title: "高龄备孕",
      slug: { current: "advanced-age", _type: "slug" },
    },
  },
  {
    _id: "fallback-3",
    _type: "video",
    title: "胚胎筛查技术解读",
    slug: { current: "embryo-screening-explained", _type: "slug" },
    summary: "了解PGS/PGD技术的原理和适用人群。",
    duration: "06:20",
    category: {
      _id: "cat-3",
      _type: "articleCategory",
      title: "胚胎筛查",
      slug: { current: "embryo-screening", _type: "slug" },
    },
  },
];

export default async function KnowledgePage() {
  const data = await fetchKnowledgePageData();

  const displayArticles =
    data.articles && data.articles.length > 0
      ? data.articles
      : fallbackArticles;
  const displayVideos =
    data.videos && data.videos.length > 0 ? data.videos : fallbackVideos;
  const faqs =
    data.faqs?.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })) || [];

  return (
    <main>
      {/* 面包屑 */}
      <PageContainer className="pt-4 pb-0">
        <Breadcrumbs items={[{ label: "科普中心" }]} />
      </PageContainer>

      {/* 页面 Hero */}
      <section className="bg-brand-cream pt-8 pb-12 lg:pt-12 lg:pb-16">
        <PageContainer>
          <SectionHeader
            eyebrow={data.knowledgePageConfig?.heroEyebrow || "科普中心"}
            title={data.knowledgePageConfig?.heroTitle || "用更清晰的信息，减少盲目焦虑"}
            description={data.knowledgePageConfig?.heroDescription || "整理试管基础知识、高龄备孕、胚胎筛查和常见问题，帮助您在咨询前先建立基本判断。"}
            align="center"
          />
        </PageContainer>
      </section>

      {/* 分类筛选入口 */}
      {data.categories && data.categories.length > 0 && (
        <section className="py-8 bg-white">
          <PageContainer>
            <div className="flex flex-wrap justify-center gap-2">
              {data.categories.map((cat) => (
                <span
                  key={cat._id}
                  className="text-sm px-4 py-2 rounded-full bg-brand-cream text-muted-foreground font-medium"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* 精选文章 */}
      <section className="py-12 lg:py-20 bg-brand-cream">
        <PageContainer>
          <SectionHeader
            eyebrow={data.knowledgePageConfig?.articleEyebrow || "精选文章"}
            title={data.knowledgePageConfig?.articleTitle || "科普文章"}
            description={data.knowledgePageConfig?.articleDescription || "了解辅助生殖知识，做出更明智的决策"}
            align="center"
          />
          {displayArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {displayArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                文章内容正在整理中
              </p>
            </div>
          )}
        </PageContainer>
      </section>

      {/* 视频内容 */}
      <section className="py-12 lg:py-20 bg-brand-cream-light">
        <PageContainer>
          <SectionHeader
            eyebrow={data.knowledgePageConfig?.videoEyebrow || "科普视频"}
            title={data.knowledgePageConfig?.videoTitle || "视频内容"}
            description={data.knowledgePageConfig?.videoDescription || "通过视频快速了解辅助生殖知识"}
            align="center"
          />
          {displayVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {displayVideos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Film className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                视频内容正在整理中
              </p>
            </div>
          )}
        </PageContainer>
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* CTA */}
      <CtaSection siteSettings={data.siteSettings} />
    </main>
  );
}
