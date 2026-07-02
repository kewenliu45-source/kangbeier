import type { MetadataRoute } from "next";
import { fetchServiceSlugs, fetchArticleSlugs, fetchVideoSlugs } from "@/sanity/lib/fetchers";
import { getSiteUrl } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  // 获取动态页面 slugs
  const [serviceSlugs, articleSlugs, videoSlugs] = await Promise.all([
    fetchServiceSlugs().catch(() => []),
    fetchArticleSlugs().catch(() => []),
    fetchVideoSlugs().catch(() => []),
  ]);

  const now = new Date();

  // 固定页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/advantages`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/knowledge`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 服务详情页
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 文章详情页
  const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${siteUrl}/knowledge/articles/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 视频详情页
  const videoPages: MetadataRoute.Sitemap = videoSlugs.map((slug) => ({
    url: `${siteUrl}/knowledge/videos/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...articlePages, ...videoPages];
}
