/**
 * 页面聚合数据类型
 *
 * 每个页面需要从 CMS 获取多份数据，
 * 这里定义各页面的完整数据结构。
 */

import type {
  Advantage,
  Article,
  ArticleCategory,
  Banner,
  CaseStudy,
  ContactInfo,
  Faq,
  PageSeo,
  Service,
  SiteSettings,
  Video,
} from "./sanity";

// ─────────────────────────────────────────────
// 首页
// ─────────────────────────────────────────────

export interface HomePageData {
  siteSettings: SiteSettings | null;
  pageSeo: PageSeo | null;
  banners: Banner[];
  featuredServices: Service[];
  featuredAdvantages: Advantage[];
  featuredCases: CaseStudy[];
  featuredArticles: Article[];
  featuredVideos: Video[];
  featuredFaqs: Faq[];
}

// ─────────────────────────────────────────────
// 服务页
// ─────────────────────────────────────────────

export interface ServicesPageData {
  siteSettings: SiteSettings | null;
  pageSeo: PageSeo | null;
  banners: Banner[];
  services: Service[];
}

// ─────────────────────────────────────────────
// 优势页
// ─────────────────────────────────────────────

export interface AdvantagesPageData {
  siteSettings: SiteSettings | null;
  pageSeo: PageSeo | null;
  banners: Banner[];
  advantages: Advantage[];
}

// ─────────────────────────────────────────────
// 科普页
// ─────────────────────────────────────────────

export interface KnowledgePageData {
  siteSettings: SiteSettings | null;
  pageSeo: PageSeo | null;
  banners: Banner[];
  categories: ArticleCategory[];
  articles: Article[];
  videos: Video[];
  faqs: Faq[];
}

// ─────────────────────────────────────────────
// 联系页
// ─────────────────────────────────────────────

export interface ContactPageData {
  siteSettings: SiteSettings | null;
  pageSeo: PageSeo | null;
  banners: Banner[];
  contactInfo: ContactInfo | null;
  faqs: Faq[];
}
