import type { Metadata } from "next";
import type { Seo } from "@/types/sanity";
import { urlForImage } from "@/sanity/lib/image";

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

const SOGOU_SITE_VERIFICATION = "OyIwuw6XQr";

// ─────────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────────

/** 获取站点 URL */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.kbeier.com"
  );
}

/** 构建绝对 canonical URL */
export function buildCanonicalUrl(pathname: string): string {
  const siteUrl = getSiteUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteUrl}${path === "/" ? "" : path}`;
}

/** 获取默认分享图片 URL（用于微信分享等场景） */
export function getDefaultOgImage(): string {
  const siteUrl = getSiteUrl();
  return `${siteUrl}/images/share.png`;
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
  /** 社交分享标题（覆盖 title） */
  ogTitle?: string;
  /** 社交分享描述（覆盖 description） */
  ogDescription?: string;
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
    ogTitle,
    ogDescription,
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

  // OG 图片：优先使用传入的图片，否则使用默认分享图片
  const ogImage = image || getDefaultOgImage();

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: keywordsArray,
    other: {
      sogou_site_verification: SOGOU_SITE_VERIFICATION,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle || fullTitle,
      description: ogDescription || metaDescription,
      url: canonical,
      siteName: currentSiteName,
      type,
      locale: "zh_CN",
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: title || SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
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
  // 从 Sanity ogImage 生成 URL
  let ogImageUrl: string | undefined;
  if (seo?.ogImage?.asset) {
    try {
      ogImageUrl = urlForImage(
        seo.ogImage as unknown as Parameters<typeof urlForImage>[0]
      )
        .width(1200)
        .height(630)
        .url();
    } catch {
      // 忽略错误，使用默认图片
    }
  }

  return buildMetadata({
    title: seo?.metaTitle || fallback?.title,
    description: seo?.metaDescription || fallback?.description,
    keywords: seo?.keywords,
    image: ogImageUrl || fallback?.image,
    path: fallback?.path,
    noIndex: seo?.noIndex || false,
    ogTitle: seo?.ogTitle,
    ogDescription: seo?.ogDescription,
  });
}
