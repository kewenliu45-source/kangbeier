import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import type { Article } from "@/types/sanity";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

/**
 * 科普文章卡片
 */
export function ArticleCard({ article, className }: ArticleCardProps) {
  const href = `/knowledge/articles/${article.slug?.current || ""}`;

  // 图片处理
  const hasImage = article.coverImage?.image?.asset;
  let imageUrl: string | null = null;
  if (hasImage && article.coverImage?.image) {
    try {
      imageUrl = urlForImage(
        article.coverImage.image as unknown as Parameters<typeof urlForImage>[0]
      )
        .width(600)
        .height(400)
        .url();
    } catch {
      imageUrl = null;
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
    <Link
      href={href}
      className={cn(
        "group block bg-white rounded-[20px] overflow-hidden",
        "border border-border/50 shadow-sm",
        "transition-all duration-200",
        "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        className
      )}
    >
      {/* 封面图 */}
      <div className="relative aspect-[16/10] bg-brand-cream-light">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.coverImage?.alt || article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg">📖</span>
              </div>
              <p className="text-xs text-muted-foreground/60">科普文章</p>
            </div>
          </div>
        )}
      </div>

      {/* 内容 */}
      <div className="p-5 sm:p-6">
        {/* 分类 + 日期 */}
        <div className="flex items-center gap-3 mb-3">
          {article.category?.title && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-green-light text-primary/80">
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
        <h3 className="text-base sm:text-lg font-bold text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* 摘要 */}
        {article.excerpt && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        )}

        {/* 阅读更多 */}
        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent/80 transition-colors">
          <span>阅读更多</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
