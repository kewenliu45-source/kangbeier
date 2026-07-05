import type { Metadata } from "next";
import type { Seo } from "@/types/sanity";

// ─────────────────────────────────────────────
// 常量（可通过 setSiteName 动态更新）
// ─────────────────────────────────────────────

let SITE_NAME = "好孕生命中心";

/** 设置站点名称（从 Sanity siteSettings 获取） */
export function setSiteName(name: string) {
  if (name) SITE_NAME = name;
}

/** 获取当前站点名称 */
export function getSiteName() {
  return SITE_NAME;
}

const FALLBACK_SEO = {
  title: SITE_NAME,
  description:
    "为高龄、二胎、试管多次失败及特殊生育需求家庭，提供一对一助孕咨询、方案评估和全程陪伴服务。",
  keywords: ["试管咨询", "高龄备孕", "第三代试管", "胚胎筛查", "助孕咨询"],
};

// ─────────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────────

/** 获取站点 URL */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.kangbeier.com"
  );
}

/** 构建绝对 canonical URL */
export function buildCanonicalUrl(pathname: string): string {
  const siteUrl = getSiteUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteUrl}${path === "/" ? "" : path}`;
}

/** 获取 Sanity 图片 URL */
function getImageUrl(
  image?: { asset?: { _ref?: string } } | null
): string | undefined {
  if (!image?.asset?._ref) return undefined;
  // Sanity image URL 格式：image-{assetId}-{dimensions}-{format}
  // 这里返回 undefined，让页面组件处理具体 URL
  return undefined;
}

// ─────────────────────────────────────────────
// Metadata 构建
// ─────────────────────────────────────────────

interface BuildMetadataOptions {
  /** 页面标题 */
  title?: string;
  /** 页面描述 */
  description?: string;
  /** 关键词 */
  keywords?: string[] | string;
  /** OG 图片 URL */
  image?: string;
  /** 页面路径，如 /services */
  path?: string;
  /** 是否禁止索引 */
  noIndex?: boolean;
  /** 页面类型 */
  type?: "website" | "article";
}

/**
 * 构建统一的 Next.js Metadata
 *
 * @example
 * ```ts
 * export const generateMetadata = () => buildMetadata({
 *   title: "服务项目",
 *   description: "...",
 *   path: "/services",
 * });
 * ```
 */
export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const {
    title,
    description,
    keywords,
    image,
    path = "/",
    noIndex = false,
    type = "website",
  } = options;

  const siteUrl = getSiteUrl();
  const canonical = buildCanonicalUrl(path);

  // 标题处理：带品牌后缀（使用动态 SITE_NAME）
  const currentSiteName = getSiteName();
  const fullTitle = title
    ? `${title} | ${currentSiteName}`
    : currentSiteName;

  // 描述处理
  const metaDescription = description || FALLBACK_SEO.description;

  // 关键词处理
  const keywordsArray = keywords
    ? Array.isArray(keywords)
      ? keywords
      : keywords.split(",").map((k) => k.trim())
    : FALLBACK_SEO.keywords;

  // OG 图片
  const ogImage = image || undefined;

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: keywordsArray,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonical,
      siteName: currentSiteName,
      type,
      locale: "zh_CN",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title || SITE_NAME,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

/**
 * 从 CMS SEO 字段构建 Metadata
 */
export function buildMetadataFromSeo(
  seo: Seo | null | undefined,
  fallback?: {
    title?: string;
    description?: string;
    image?: string;
    path?: string;
  }
): Metadata {
  return buildMetadata({
    title: seo?.metaTitle || fallback?.title,
    description: seo?.metaDescription || fallback?.description,
    keywords: seo?.keywords,
    image: fallback?.image,
    path: fallback?.path,
    noIndex: seo?.noIndex || false,
  });
}
