import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { fetchArticleBySlug, fetchSiteSettings } from "@/sanity/lib/fetchers";
import { buildMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { PageContainer } from "@/components/shared/page-container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaSection } from "@/components/sections/cta-section";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

// 强制动态渲染，避免构建时超时
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return buildMetadata({ title: "文章未找到", noIndex: true });
  }

  return buildMetadata({
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    keywords: article.seo?.keywords,
    path: `/knowledge/articles/${slug}`,
    noIndex: article.seo?.noIndex || false,
    type: "article",
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const [article, siteSettings] = await Promise.all([
    fetchArticleBySlug(slug),
    fetchSiteSettings(),
  ]);

  if (!article) {
    notFound();
  }

  // 封面图处理
  const hasImage = article.coverImage?.image?.asset;
  let coverUrl: string | null = null;
  if (hasImage && article.coverImage?.image) {
    try {
      coverUrl = urlForImage(
        article.coverImage.image as unknown as Parameters<typeof urlForImage>[0]
      )
        .width(1200)
        .height(630)
        .url();
    } catch {
      coverUrl = null;
    }
  }

  // 日期格式化
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "首页", url: "/" },
          { name: "科普中心", url: "/knowledge" },
          { name: article.title, url: `/knowledge/articles/${slug}` },
        ]}
      />
      <ArticleJsonLd
        headline={article.title}
        description={article.excerpt}
        image={coverUrl || undefined}
        datePublished={article.publishedAt}
        dateModified={article.updatedAt || article.publishedAt}
        author={article.author}
        url={`/knowledge/articles/${slug}`}
      />

      {/* 面包屑 */}
      <PageContainer className="pt-4 pb-0">
        <Breadcrumbs
          items={[
            { label: "科普中心", href: "/knowledge" },
            { label: article.title },
          ]}
        />
      </PageContainer>

      {/* 文章 Header */}
      <section className="bg-brand-cream pt-8 pb-12 lg:pt-12 lg:pb-16">
        <PageContainer>
          <div className="max-w-3xl mx-auto">
            {/* 分类 + 日期 */}
            <div className="flex items-center gap-3 mb-4">
              {article.category?.title && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-brand-green-light text-primary/80">
                  {article.category.title}
                </span>
              )}
              {publishedDate && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {publishedDate}
                </span>
              )}
            </div>

            {/* 标题 */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-tight">
              {article.title}
            </h1>

            {/* 摘要 */}
            {article.excerpt && (
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            )}
          </div>
        </PageContainer>
      </section>

      {/* 封面图 */}
      {coverUrl && (
        <section className="bg-brand-cream pb-8">
          <PageContainer>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src={coverUrl}
                  alt={article.coverImage?.alt || article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </div>
            </div>
          </PageContainer>
        </section>
      )}

      {/* 文章正文 */}
      <section className="py-12 lg:py-16 bg-white">
        <PageContainer>
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent">
            {article.content && article.content.length > 0 ? (
              <div>
                {article.content.map((block, i) => {
                  // 处理内嵌图片
                  if (block._type === "imageWithAlt" || block._type === "image") {
                    const imageData = (block as { image?: { asset?: unknown } }).image;
                    if (!imageData?.asset) return null;
                    try {
                      const imgUrl = urlForImage(
                        imageData as unknown as Parameters<typeof urlForImage>[0]
                      )
                        .width(800)
                        .url();
                      const alt = (block as { alt?: string }).alt || article.title;
                      return (
                        <figure key={i} className="my-6">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imgUrl}
                            alt={alt}
                            className="w-full rounded-lg"
                            loading="lazy"
                          />
                        </figure>
                      );
                    } catch {
                      return null;
                    }
                  }

                  // 处理文字 block
                  if (block._type === "block" && "children" in block) {
                    const children = block.children as Array<{
                      _type: string;
                      text?: string;
                    }>;
                    const text = children
                      ?.map((c) => c.text || "")
                      .join("");
                    if (!text) return null;

                    const style = (block as { style?: string }).style || "normal";
                    if (style === "h2") {
                      return (
                        <h2 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4">
                          {text}
                        </h2>
                      );
                    }
                    if (style === "h3") {
                      return (
                        <h3 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">
                          {text}
                        </h3>
                      );
                    }
                    if (style === "blockquote") {
                      return (
                        <blockquote
                          key={i}
                          className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4"
                        >
                          {text}
                        </blockquote>
                      );
                    }
                    return (
                      <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                        {text}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                文章内容正在整理中
              </p>
            )}
          </div>
        </PageContainer>
      </section>

      {/* 相关文章 */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="py-12 lg:py-16 bg-brand-cream">
          <PageContainer>
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              相关文章
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {article.relatedArticles.map((related) => (
                <Link
                  key={related._id}
                  href={`/knowledge/articles/${related.slug?.current || ""}`}
                  className="group block bg-white rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  {related.excerpt && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {related.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent">
                    <span>阅读更多</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* CTA */}
      <CtaSection siteSettings={siteSettings} />
    </main>
  );
}
