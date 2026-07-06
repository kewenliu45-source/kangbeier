/**
 * Sanity 数据获取函数
 *
 * 每个函数封装一个 GROQ 查询，返回强类型数据。
 * CMS 无数据时返回 null，不抛出错误。
 */

import type {
  Article,
  ContactInfo,
  Service,
  SiteSettings,
  Video,
  LayoutConfig,
  HomePageConfig,
  AdvantagesPageConfig,
  ServicesPageConfig,
  KnowledgePageConfig,
  ConsultationFormConfig,
} from "@/types/sanity";
import type {
  AdvantagesPageData,
  ContactPageData,
  HomePageData,
  KnowledgePageData,
} from "@/types/page";

import {
  advantagesPageQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  contactInfoQuery,
  contactPageQuery,
  homePageQuery,
  knowledgePageQuery,
  layoutDataQuery,
  layoutConfigQuery,
  homePageConfigQuery,
  advantagesPageConfigQuery,
  servicesPageConfigQuery,
  knowledgePageConfigQuery,
  consultationFormConfigQuery,
  serviceBySlugQuery,
  serviceSlugsQuery,
  servicesQuery,
  siteSettingsQuery,
  videoBySlugQuery,
  videoSlugsQuery,
} from "./queries";
import { sanityFetch } from "./fetch";

// ─────────────────────────────────────────────
// 网站基础信息
// ─────────────────────────────────────────────

/** 获取站点设置（单例），无数据返回 null */
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch siteSettings");
    return null;
  }
}

/** 获取联系方式（单例），无数据返回 null */
export async function fetchContactInfo(): Promise<ContactInfo | null> {
  try {
    return await sanityFetch<ContactInfo | null>({
      query: contactInfoQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch contactInfo");
    return null;
  }
}

/** 布局数据（siteSettings + contactInfo + layoutConfig），用于 Header/Footer */
export async function fetchLayoutData(): Promise<{
  siteSettings: SiteSettings | null;
  contactInfo: ContactInfo | null;
  layoutConfig: LayoutConfig | null;
}> {
  try {
    return await sanityFetch<{
      siteSettings: SiteSettings | null;
      contactInfo: ContactInfo | null;
      layoutConfig: LayoutConfig | null;
    }>({
      query: layoutDataQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch layout data");
    return { siteSettings: null, contactInfo: null, layoutConfig: null };
  }
}

// ─────────────────────────────────────────────
// 首页
// ─────────────────────────────────────────────

/** 首页聚合数据，CMS 无数据时返回合理空结构 */
export async function fetchHomePageData(): Promise<HomePageData> {
  try {
    return await sanityFetch<HomePageData>({
      query: homePageQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch home page data");
    return {
      siteSettings: null,
      pageSeo: null,
      banners: [],
      featuredServices: [],
      featuredAdvantages: [],
      featuredCases: [],
      featuredArticles: [],
      featuredVideos: [],
      featuredFaqs: [],
      homePageConfig: null,
    };
  }
}

// ─────────────────────────────────────────────
// 服务列表
// ─────────────────────────────────────────────

/** 全部服务列表，按 sortOrder 升序，无数据返回空数组 */
export async function fetchServices(): Promise<Service[]> {
  try {
    return await sanityFetch<Service[]>({
      query: servicesQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch services");
    return [];
  }
}

/** 按 slug 获取单个服务详情，未找到返回 null */
export async function fetchServiceBySlug(
  slug: string
): Promise<Service | null> {
  try {
    return await sanityFetch<Service | null>({
      query: serviceBySlugQuery,
      params: { slug },
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn(`Failed to fetch service by slug: ${slug}`);
    return null;
  }
}

/** 获取所有服务 slug，用于 generateStaticParams */
export async function fetchServiceSlugs(): Promise<string[]> {
  try {
    const result = await sanityFetch<{ slug: string }[]>({
      query: serviceSlugsQuery,
      cache: "force-cache",
      revalidate: 60,
    });
    return result.map((item) => item.slug);
  } catch {
    console.warn("Failed to fetch service slugs");
    return [];
  }
}

// ─────────────────────────────────────────────
// 优势页
// ─────────────────────────────────────────────

/** 优势页聚合数据，CMS 无数据时返回合理空结构 */
export async function fetchAdvantagesPageData(): Promise<AdvantagesPageData> {
  try {
    return await sanityFetch<AdvantagesPageData>({
      query: advantagesPageQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch advantages page data");
    return {
      siteSettings: null,
      pageSeo: null,
      banners: [],
      advantages: [],
      advantagesPageConfig: null,
    };
  }
}

// ─────────────────────────────────────────────
// 科普中心
// ─────────────────────────────────────────────

/** 科普中心聚合数据，CMS 无数据时返回合理空结构 */
export async function fetchKnowledgePageData(): Promise<KnowledgePageData> {
  try {
    return await sanityFetch<KnowledgePageData>({
      query: knowledgePageQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch knowledge page data");
    return {
      siteSettings: null,
      pageSeo: null,
      banners: [],
      categories: [],
      articles: [],
      videos: [],
      faqs: [],
      knowledgePageConfig: null,
    };
  }
}

// ─────────────────────────────────────────────
// 文章详情
// ─────────────────────────────────────────────

/** 按 slug 获取文章详情，未找到返回 null */
export async function fetchArticleBySlug(
  slug: string
): Promise<Article | null> {
  try {
    return await sanityFetch<Article | null>({
      query: articleBySlugQuery,
      params: { slug },
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn(`Failed to fetch article by slug: ${slug}`);
    return null;
  }
}

/** 获取所有文章 slug，用于 generateStaticParams */
export async function fetchArticleSlugs(): Promise<string[]> {
  try {
    const result = await sanityFetch<{ slug: string }[]>({
      query: articleSlugsQuery,
      cache: "force-cache",
      revalidate: 60,
    });
    return result.map((item) => item.slug);
  } catch {
    console.warn("Failed to fetch article slugs");
    return [];
  }
}

// ─────────────────────────────────────────────
// 视频详情
// ─────────────────────────────────────────────

/** 按 slug 获取视频详情，未找到返回 null */
export async function fetchVideoBySlug(
  slug: string
): Promise<Video | null> {
  try {
    return await sanityFetch<Video | null>({
      query: videoBySlugQuery,
      params: { slug },
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn(`Failed to fetch video by slug: ${slug}`);
    return null;
  }
}

/** 获取所有视频 slug，用于 generateStaticParams */
export async function fetchVideoSlugs(): Promise<string[]> {
  try {
    const result = await sanityFetch<{ slug: string }[]>({
      query: videoSlugsQuery,
      cache: "force-cache",
      revalidate: 60,
    });
    return result.map((item) => item.slug);
  } catch {
    console.warn("Failed to fetch video slugs");
    return [];
  }
}

// ─────────────────────────────────────────────
// 联系页
// ─────────────────────────────────────────────

/** 联系页聚合数据，CMS 无数据时返回合理空结构 */
export async function fetchContactPageData(): Promise<ContactPageData> {
  try {
    return await sanityFetch<ContactPageData>({
      query: contactPageQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch contact page data");
    return {
      siteSettings: null,
      pageSeo: null,
      banners: [],
      contactInfo: null,
      faqs: [],
      contactPageConfig: null,
    };
  }
}

// ─────────────────────────────────────────────
// 配置文档
// ─────────────────────────────────────────────

/** 获取布局配置（单例），无数据返回 null */
export async function fetchLayoutConfig(): Promise<LayoutConfig | null> {
  try {
    return await sanityFetch<LayoutConfig | null>({
      query: layoutConfigQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch layoutConfig");
    return null;
  }
}

/** 获取首页配置（单例），无数据返回 null */
export async function fetchHomePageConfig(): Promise<HomePageConfig | null> {
  try {
    return await sanityFetch<HomePageConfig | null>({
      query: homePageConfigQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch homePageConfig");
    return null;
  }
}

/** 获取优势页配置（单例），无数据返回 null */
export async function fetchAdvantagesPageConfig(): Promise<AdvantagesPageConfig | null> {
  try {
    return await sanityFetch<AdvantagesPageConfig | null>({
      query: advantagesPageConfigQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch advantagesPageConfig");
    return null;
  }
}

/** 获取服务页配置（单例），无数据返回 null */
export async function fetchServicesPageConfig(): Promise<ServicesPageConfig | null> {
  try {
    return await sanityFetch<ServicesPageConfig | null>({
      query: servicesPageConfigQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch servicesPageConfig");
    return null;
  }
}

/** 获取科普页配置（单例），无数据返回 null */
export async function fetchKnowledgePageConfig(): Promise<KnowledgePageConfig | null> {
  try {
    return await sanityFetch<KnowledgePageConfig | null>({
      query: knowledgePageConfigQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch knowledgePageConfig");
    return null;
  }
}

/** 获取咨询表单配置（单例），无数据返回 null */
export async function fetchConsultationFormConfig(): Promise<ConsultationFormConfig | null> {
  try {
    return await sanityFetch<ConsultationFormConfig | null>({
      query: consultationFormConfigQuery,
      cache: "force-cache",
      revalidate: 60,
    });
  } catch {
    console.warn("Failed to fetch consultationFormConfig");
    return null;
  }
}
