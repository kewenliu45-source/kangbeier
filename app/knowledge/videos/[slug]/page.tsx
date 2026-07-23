import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ExternalLink, Play } from "lucide-react";
import { fetchVideoBySlug, fetchSiteSettings } from "@/sanity/lib/fetchers";
import { buildMetadata, getSanityOgImageUrl } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { VideoJsonLd } from "@/components/seo/video-json-ld";
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
  const video = await fetchVideoBySlug(slug);

  if (!video) {
    return buildMetadata({ title: "视频未找到", noIndex: true });
  }

  return buildMetadata({
    title: video.seo?.metaTitle || video.title,
    description: video.seo?.metaDescription || video.summary,
    keywords: video.seo?.keywords,
    image:
      getSanityOgImageUrl(video.seo?.ogImage) ||
      getSanityOgImageUrl(video.coverImage?.image),
    path: `/knowledge/videos/${slug}`,
    noIndex: video.seo?.noIndex || false,
  });
}

/** 判断 URL 是否可安全嵌入 */
function getEmbedUrl(url: string): string | null {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Bilibili
  const bilibiliMatch = url.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/);
  if (bilibiliMatch) {
    return `https://player.bilibili.com/player.html?bvid=${bilibiliMatch[1]}`;
  }

  return null;
}

/** 判断 URL 是否为直链视频文件（MP4、WebM、Ogg） */
function isDirectVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$|#)/i.test(url);
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const [video, siteSettings] = await Promise.all([
    fetchVideoBySlug(slug),
    fetchSiteSettings(),
  ]);

  if (!video) {
    notFound();
  }

  // 封面图处理
  const hasImage = video.coverImage?.image?.asset;
  let coverUrl: string | null = null;
  if (hasImage && video.coverImage?.image) {
    try {
      coverUrl = urlForImage(
        video.coverImage.image as unknown as Parameters<typeof urlForImage>[0]
      )
        .width(1200)
        .height(675)
        .url();
    } catch {
      coverUrl = null;
    }
  }

  // 嵌入 URL
  const embedUrl = video.videoUrl ? getEmbedUrl(video.videoUrl) : null;
  // 直链视频（MP4、WebM 等）
  const isDirectVideo = video.videoUrl ? isDirectVideoUrl(video.videoUrl) : false;

  // 日期格式化
  const publishedDate = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString("zh-CN", {
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
          { name: video.title, url: `/knowledge/videos/${slug}` },
        ]}
      />
      <VideoJsonLd
        name={video.title}
        description={video.summary}
        thumbnailUrl={coverUrl || undefined}
        uploadDate={video.publishedAt}
        duration={video.duration}
        contentUrl={!embedUrl ? video.videoUrl : undefined}
        embedUrl={embedUrl || undefined}
        url={`/knowledge/videos/${slug}`}
      />

      {/* 面包屑 */}
      <PageContainer className="pt-4 pb-0">
        <Breadcrumbs
          items={[
            { label: "科普中心", href: "/knowledge" },
            { label: video.title },
          ]}
        />
      </PageContainer>

      {/* 视频 Header */}
      <section className="bg-brand-cream pt-8 pb-12 lg:pt-12 lg:pb-16">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            {/* 分类 + 时长 + 日期 */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {video.category?.title && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-brand-green-light text-primary/80">
                  {video.category.title}
                </span>
              )}
              {video.duration && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {video.duration}
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
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground">
              {video.title}
            </h1>

            {/* 简介 */}
            {video.summary && (
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {video.summary}
              </p>
            )}
          </div>
        </PageContainer>
      </section>

      {/* 视频展示区 */}
      <section className="bg-brand-cream pb-8">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
              ) : isDirectVideo ? (
                <video
                  src={video.videoUrl!}
                  className="absolute inset-0 w-full h-full"
                  controls
                  preload="metadata"
                  playsInline
                />
              ) : coverUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={coverUrl}
                    alt={video.coverImage?.alt || video.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 80vw"
                  />
                  {/* 播放按钮或外链 */}
                  {video.videoUrl ? (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play
                          className="w-8 h-8 text-primary ml-1"
                          fill="currentColor"
                        />
                      </div>
                    </a>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="text-center">
                        <Play className="w-12 h-12 text-white/80 mx-auto mb-2" />
                        <p className="text-white/80 text-sm">视频内容</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-white/40 mx-auto mb-2" />
                    <p className="text-white/40 text-sm">
                      视频内容正在准备中
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 外链按钮（仅非 iframe 且非直链视频时显示） */}
            {video.videoUrl && !embedUrl && !isDirectVideo && (
              <div className="mt-4 text-center">
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>在新窗口打开视频</span>
                </a>
              </div>
            )}
          </div>
        </PageContainer>
      </section>

      {/* 文字稿 */}
      {video.transcript && video.transcript.length > 0 && (
        <section className="py-12 lg:py-16 bg-white">
          <PageContainer>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                视频文稿
              </h2>
              <div className="space-y-4">
                {video.transcript.map((block, i) => {
                  if (block._type === "block" && "children" in block) {
                    const children = block.children as Array<{
                      _type: string;
                      text?: string;
                    }>;
                    const text = children
                      ?.map((c) => c.text || "")
                      .join("");
                    if (!text) return null;
                    return (
                      <p
                        key={i}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {text}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </PageContainer>
        </section>
      )}

      {/* 相关视频 */}
      {"relatedVideos" in video &&
        Array.isArray(video.relatedVideos) &&
        video.relatedVideos.length > 0 && (
          <section className="py-12 lg:py-16 bg-brand-cream">
            <PageContainer>
              <h2 className="text-2xl font-bold text-foreground text-center mb-8">
                相关视频
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(video.relatedVideos as Array<{
                  _id: string;
                  title: string;
                  slug?: { current?: string };
                  summary?: string;
                  duration?: string;
                }>).map((related) => (
                  <Link
                    key={related._id}
                    href={`/knowledge/videos/${related.slug?.current || ""}`}
                    className="group block bg-white rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Play className="w-4 h-4 text-accent" />
                      {related.duration && (
                        <span className="text-xs text-muted-foreground">
                          {related.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    {related.summary && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {related.summary}
                      </p>
                    )}
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
