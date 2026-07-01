import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { ArticleCard } from "@/components/cards/article-card";
import type { Article } from "@/types/sanity";

interface ArticleSectionProps {
  articles?: Article[];
  className?: string;
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

/**
 * 首页文章区块
 */
export function ArticleSection({
  articles = fallbackArticles,
  className,
}: ArticleSectionProps) {
  const displayArticles =
    articles && articles.length > 0 ? articles : fallbackArticles;

  return (
    <section className={cn("py-16 lg:py-24 bg-brand-cream", className)}>
      <PageContainer>
        <SectionHeader
          eyebrow="Knowledge Center"
          title="科普文章"
          description="了解辅助生殖知识，做出更明智的决策"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {displayArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
