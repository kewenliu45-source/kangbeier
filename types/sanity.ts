/**
 * Sanity CMS 数据类型定义
 *
 * 与 sanity/schemas/ 下的 Schema 一一对应。
 * 可选字段使用 `?:`，必填字段使用 `:`。
 */

// ─────────────────────────────────────────────
// 通用基础类型
// ─────────────────────────────────────────────

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { x: number; y: number };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface ImageWithAlt {
  image: SanityImage;
  alt: string;
  caption?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface SanityLink {
  label: string;
  href: string;
  openInNewTab?: boolean;
}

export interface Cta {
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  wechatQrCode?: SanityImage;
  phone?: string;
}

export interface Slug {
  current: string;
  _type: "slug";
}

/** Portable Text block — 宽松类型，避免过早复杂化 */
export type RichTextBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

// ─────────────────────────────────────────────
// 轻量引用类型（用于 reference 字段展开）
// ─────────────────────────────────────────────

export interface ServiceRef {
  _id: string;
  _type: "service";
  title: string;
  slug: Slug;
}

export interface ArticleCategoryRef {
  _id: string;
  _type: "articleCategory";
  title: string;
  slug: Slug;
}

export interface ArticleRef {
  _id: string;
  _type: "article";
  title: string;
  slug: Slug;
  excerpt?: string;
  coverImage?: ImageWithAlt;
  publishedAt?: string;
}

// ─────────────────────────────────────────────
// 内嵌对象类型
// ─────────────────────────────────────────────

export interface ProcessStep {
  _type: "processStep";
  title: string;
  description?: string;
  sortOrder?: number;
}

export interface AdvantageItem {
  _type: "advantage";
  title: string;
  description?: string;
}

export interface FaqItem {
  _type: "faq";
  question: string;
  answer: string;
}

export interface StatisticItem {
  _type: "statistic";
  label: string;
  value: string;
  description?: string;
}

export interface ContactMethod {
  _type: "contactMethod";
  type: "phone" | "wechat" | "email" | "form" | "other";
  label: string;
  value: string;
  description?: string;
  icon?: string;
  href?: string;
  isPrimary?: boolean;
}

export interface NavItem {
  _type: "navItem";
  label: string;
  href: string;
  openInNewTab?: boolean;
}

// ─────────────────────────────────────────────
// 文档类型
// ─────────────────────────────────────────────

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  siteName: string;
  brandName?: string;
  logo?: ImageWithAlt;
  favicon?: SanityImage;
  slogan?: string;
  description?: string;
  defaultSeo?: Seo;
  headerNavigation?: SanityLink[];
  footerNavigation?: SanityLink[];
  footerDescription?: string;
  icpText?: string;
  copyrightText?: string;
  wechatQrCode?: SanityImage;
  primaryPhone?: string;
  primaryWechat?: string;
  primaryEmail?: string;
  businessHours?: string;
}

export interface PageSeo {
  _id: string;
  _type: "pageSeo";
  pageKey: "home" | "services" | "advantages" | "knowledge" | "contact";
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: SanityImage;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export type BannerPosition =
  | "homeHero"
  | "servicesHero"
  | "advantagesHero"
  | "knowledgeHero"
  | "contactHero";

export interface Banner {
  _id: string;
  _type: "banner";
  title: string;
  subtitle?: string;
  description?: string;
  desktopImage?: ImageWithAlt;
  mobileImage?: ImageWithAlt;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  position: BannerPosition;
  isActive?: boolean;
  seoImage?: SanityImage;
}

export interface Service {
  _id: string;
  _type: "service";
  title: string;
  slug: Slug;
  summary?: string;
  coverImage?: ImageWithAlt;
  icon?: SanityImage;
  description?: RichTextBlock[];
  highlights?: string[];
  suitableFor?: string[];
  processSteps?: ProcessStep[];
  advantages?: AdvantageItem[];
  faqs?: FaqItem[];
  ctaText?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  seo?: Seo;
}

export interface Advantage {
  _id: string;
  _type: "advantage";
  title: string;
  slug: Slug;
  summary?: string;
  icon?: SanityImage;
  coverImage?: ImageWithAlt;
  description?: string;
  content?: RichTextBlock[];
  statistics?: StatisticItem[];
  relatedServices?: ServiceRef[];
  sortOrder?: number;
  isFeatured?: boolean;
  seo?: Seo;
}

export interface CaseStudy {
  _id: string;
  _type: "case";
  title: string;
  slug: Slug;
  summary?: string;
  coverImage?: ImageWithAlt;
  isAnonymous: boolean;
  ageRange?: string;
  background?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  treatmentType?: string;
  duration?: string;
  tags?: string[];
  sortOrder?: number;
  isFeatured?: boolean;
  seo?: Seo;
}

export interface ArticleCategory {
  _id: string;
  _type: "articleCategory";
  title: string;
  slug: Slug;
  description?: string;
  sortOrder?: number;
  seo?: Seo;
}

export interface Article {
  _id: string;
  _type: "article";
  title: string;
  slug: Slug;
  excerpt?: string;
  coverImage?: ImageWithAlt;
  category?: ArticleCategoryRef;
  tags?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  content?: RichTextBlock[];
  relatedArticles?: ArticleRef[];
  isFeatured?: boolean;
  seo?: Seo;
}

export interface Video {
  _id: string;
  _type: "video";
  title: string;
  slug: Slug;
  summary?: string;
  coverImage?: ImageWithAlt;
  videoUrl?: string;
  duration?: string;
  category?: ArticleCategoryRef;
  transcript?: RichTextBlock[];
  publishedAt?: string;
  isFeatured?: boolean;
  seo?: Seo;
}

export type FaqCategory =
  | "process"
  | "pricing"
  | "treatment"
  | "success-rate"
  | "precautions"
  | "other";

export interface Faq {
  _id: string;
  _type: "faq";
  question: string;
  answer: string;
  category?: FaqCategory;
  relatedService?: ServiceRef;
  sortOrder?: number;
  isFeatured?: boolean;
  seo?: Seo;
}

export interface ContactInfo {
  _id: string;
  _type: "contactInfo";
  phone?: string;
  wechatId?: string;
  wechatQrCode?: SanityImage;
  email?: string;
  address?: string;
  mapImage?: ImageWithAlt;
  mapUrl?: string;
  businessHours?: string;
  consultationNotice?: string;
  contactMethods?: ContactMethod[];
  seo?: Seo;
}
