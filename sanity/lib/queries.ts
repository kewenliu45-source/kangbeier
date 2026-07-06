/**
 * Sanity GROQ 查询集合
 *
 * 所有查询统一管理，供 fetchers.ts 调用。
 * 查询中展开图片字段以满足 image builder 使用。
 */

// ─────────────────────────────────────────────
// 图片段复用
// ─────────────────────────────────────────────

/** 展开 imageWithAlt 对象 */
const IMAGE_WITH_ALT = `{
  image{
    ...,
    asset->
  },
  alt,
  caption
}`;

/** 展开 SanityImage */
const IMAGE_ASSET = `{
  ...,
  asset->
}`;

/** 展开 SEO 对象 */
const SEO = `{
  metaTitle,
  metaDescription,
  keywords,
  ogTitle,
  ogDescription,
  ogImage${IMAGE_ASSET},
  canonicalUrl,
  noIndex
}`;

/** 展开 link 对象 */
const LINK = `{
  label,
  href,
  openInNewTab
}`;

/** 展开 contactMethod 对象 */
const CONTACT_METHOD = `{
  type,
  label,
  value,
  description,
  icon,
  href,
  isPrimary
}`;

// ─────────────────────────────────────────────
// 网站基础信息
// ─────────────────────────────────────────────

/** 站点设置（单例） */
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  _type,
  siteName,
  brandName,
  logo${IMAGE_WITH_ALT},
  favicon${IMAGE_ASSET},
  slogan,
  description,
  defaultSeo${SEO},
  headerNavigation[]${LINK},
  footerNavigation[]${LINK},
  footerDescription,
  icpText,
  copyrightText,
  wechatQrCode${IMAGE_ASSET},
  primaryPhone,
  primaryWechat,
  primaryEmail,
  businessHours,
  ctaTitle,
  ctaDescription,
  ctaPrimaryButtonText,
  ctaSecondaryButtonText,
  ctaPhone
}`;

/** 联系方式（单例） */
export const contactInfoQuery = `*[_type == "contactInfo"][0]{
  _id,
  _type,
  phone,
  wechatId,
  wechatQrCode${IMAGE_ASSET},
  email,
  address,
  mapImage${IMAGE_WITH_ALT},
  mapUrl,
  businessHours,
  consultationNotice,
  contactMethods[]${CONTACT_METHOD},
  seo${SEO}
}`;

// ─────────────────────────────────────────────
// 配置文档查询（必须在使用前声明）
// ─────────────────────────────────────────────

/** 布局配置（单例） */
export const layoutConfigQuery = `*[_type == "layoutConfig"][0]{
  _id,
  _type,
  wechatConsultText,
  wechatModalTitle,
  wechatModalDescription,
  wechatQrPlaceholder,
  footerNavTitle,
  footerContactTitle,
  footerWechatNote,
  floatingPhoneText,
  floatingCtaText
}`;

/** 首页配置（单例） */
export const homePageConfigQuery = `*[_type == "homePageConfig"][0]{
  _id,
  _type,
  heroTrustPoints[]{
    icon,
    title,
    text
  },
  heroServiceTags,
  heroInfoCardTitle,
  heroInfoCardDescription,
  trustBarItems[]{
    number,
    label
  },
  processEyebrow,
  processTitle,
  processDescription,
  processSteps[]{
    title,
    description
  },
  serviceEyebrow,
  serviceTitle,
  serviceDescription,
  advantageEyebrow,
  advantageTitle,
  advantageDescription,
  advantageDetailText,
  caseEyebrow,
  caseTitle,
  caseDescription,
  caseDisclaimer,
  articleEyebrow,
  articleTitle,
  articleDescription,
  videoEyebrow,
  videoTitle,
  videoDescription
}`;

/** 优势页配置（单例） */
export const advantagesPageConfigQuery = `*[_type == "advantagesPageConfig"][0]{
  _id,
  _type,
  heroEyebrow,
  heroTitle,
  heroDescription,
  statsEyebrow,
  statsTitle,
  relatedServicesEyebrow,
  relatedServicesTitle
}`;

/** 服务页配置（单例） */
export const servicesPageConfigQuery = `*[_type == "servicesPageConfig"][0]{
  _id,
  _type,
  heroEyebrow,
  heroTitle,
  heroDescription
}`;

/** 科普页配置（单例） */
export const knowledgePageConfigQuery = `*[_type == "knowledgePageConfig"][0]{
  _id,
  _type,
  heroEyebrow,
  heroTitle,
  heroDescription,
  articleEyebrow,
  articleTitle,
  articleDescription,
  videoEyebrow,
  videoTitle,
  videoDescription
}`;

/** 咨询表单配置（单例） */
export const consultationFormConfigQuery = `*[_type == "consultationFormConfig"][0]{
  _id,
  _type,
  formTitle,
  successTitle,
  successDescription,
  successPhone,
  successButtonText,
  submitButtonText,
  submittingText,
  privacyNotice
}`;

/** 布局数据（Header + Footer 共需） */
export const layoutDataQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "contactInfo": ${contactInfoQuery},
  "layoutConfig": ${layoutConfigQuery}
}`;

// ─────────────────────────────────────────────
// 首页
// ─────────────────────────────────────────────

/** 首页 Banner */
const HOME_BANNERS = `*[_type == "banner" && position == "homeHero" && isActive == true] | order(sortOrder asc){
  _id,
  _type,
  title,
  subtitle,
  description,
  desktopImage${IMAGE_WITH_ALT},
  mobileImage${IMAGE_WITH_ALT},
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  position,
  isActive,
  seoImage${IMAGE_ASSET}
}`;

/** 首页精选服务 */
const FEATURED_SERVICES = `*[_type == "service" && isFeatured == true] | order(sortOrder asc)[0...6]{
  _id,
  _type,
  title,
  slug,
  summary,
  coverImage${IMAGE_WITH_ALT},
  icon${IMAGE_ASSET},
  ctaText,
  sortOrder,
  isFeatured
}`;

/** 首页精选优势 */
const FEATURED_ADVANTAGES = `*[_type == "advantage" && isFeatured == true] | order(sortOrder asc)[0...6]{
  _id,
  _type,
  title,
  slug,
  summary,
  icon${IMAGE_ASSET},
  coverImage${IMAGE_WITH_ALT},
  statistics[]{
    label,
    value,
    description
  },
  sortOrder,
  isFeatured
}`;

/** 首页精选案例 */
const FEATURED_CASES = `*[_type == "case" && isFeatured == true] | order(sortOrder asc)[0...6]{
  _id,
  _type,
  title,
  slug,
  summary,
  coverImage${IMAGE_WITH_ALT},
  ageRange,
  treatmentType,
  duration,
  tags,
  sortOrder,
  isFeatured
}`;

/** 首页精选文章 */
const FEATURED_ARTICLES = `*[_type == "article" && isFeatured == true] | order(publishedAt desc)[0...6]{
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  category->{
    _id,
    _type,
    title,
    slug
  },
  tags,
  author,
  publishedAt,
  isFeatured
}`;

/** 首页精选视频 */
const FEATURED_VIDEOS = `*[_type == "video" && isFeatured == true] | order(publishedAt desc)[0...6]{
  _id,
  _type,
  title,
  slug,
  summary,
  coverImage${IMAGE_WITH_ALT},
  videoUrl,
  duration,
  category->{
    _id,
    _type,
    title,
    slug
  },
  publishedAt,
  isFeatured
}`;

/** 首页精选 FAQ */
const FEATURED_FAQS = `*[_type == "faq" && isFeatured == true] | order(sortOrder asc)[0...6]{
  _id,
  _type,
  question,
  answer,
  category,
  sortOrder,
  isFeatured
}`;

/** 首页 SEO */
const HOME_PAGE_SEO = `*[_type == "pageSeo" && pageKey == "home"][0]{
  _id,
  _type,
  pageKey,
  title,
  description,
  keywords,
  ogImage${IMAGE_ASSET},
  canonicalUrl,
  noIndex
}`;

/** 首页聚合查询 */
export const homePageQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "pageSeo": ${HOME_PAGE_SEO},
  "banners": ${HOME_BANNERS},
  "featuredServices": ${FEATURED_SERVICES},
  "featuredAdvantages": ${FEATURED_ADVANTAGES},
  "featuredCases": ${FEATURED_CASES},
  "featuredArticles": ${FEATURED_ARTICLES},
  "featuredVideos": ${FEATURED_VIDEOS},
  "featuredFaqs": ${FEATURED_FAQS},
  "homePageConfig": ${homePageConfigQuery}
}`;

// ─────────────────────────────────────────────
// 服务列表
// ─────────────────────────────────────────────

/** 全部服务列表 */
export const servicesQuery = `*[_type == "service"] | order(sortOrder asc){
  _id,
  _type,
  title,
  slug,
  summary,
  coverImage${IMAGE_WITH_ALT},
  icon${IMAGE_ASSET},
  highlights,
  sortOrder,
  isFeatured,
  seo${SEO}
}`;

/** 服务详情（按 slug） */
export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  summary,
  coverImage${IMAGE_WITH_ALT},
  icon${IMAGE_ASSET},
  description[]{
    ...,
    _type == "imageWithAlt"${IMAGE_WITH_ALT}
  },
  highlights,
  suitableFor,
  processSteps[]{
    title,
    description,
    sortOrder
  },
  advantages[]{
    title,
    description
  },
  faqs[]{
    question,
    answer
  },
  ctaText,
  sortOrder,
  isFeatured,
  seo${SEO}
}`;

/** 所有服务 slug（用于 generateStaticParams） */
export const serviceSlugsQuery = `*[_type == "service" && defined(slug.current)][]{
  "slug": slug.current
}`;

// ─────────────────────────────────────────────
// 优势页
// ─────────────────────────────────────────────

/** 优势页 SEO */
const ADVANTAGES_PAGE_SEO = `*[_type == "pageSeo" && pageKey == "advantages"][0]{
  _id,
  _type,
  pageKey,
  title,
  description,
  keywords,
  ogImage${IMAGE_ASSET},
  canonicalUrl,
  noIndex
}`;

/** 优势页 Banner */
const ADVANTAGES_BANNERS = `*[_type == "banner" && position == "advantagesHero" && isActive == true] | order(sortOrder asc){
  _id,
  _type,
  title,
  subtitle,
  description,
  desktopImage${IMAGE_WITH_ALT},
  mobileImage${IMAGE_WITH_ALT},
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  position,
  isActive,
  seoImage${IMAGE_ASSET}
}`;

/** 全部优势列表 */
const ALL_ADVANTAGES = `*[_type == "advantage"] | order(sortOrder asc){
  _id,
  _type,
  title,
  slug,
  summary,
  icon${IMAGE_ASSET},
  coverImage${IMAGE_WITH_ALT},
  description,
  content[]{
    ...,
    _type == "imageWithAlt"${IMAGE_WITH_ALT}
  },
  statistics[]{
    label,
    value,
    description
  },
  relatedServices[]->{
    _id,
    _type,
    title,
    slug,
    summary
  },
  sortOrder,
  isFeatured,
  seo${SEO}
}`;

/** 优势页聚合查询 */
export const advantagesPageQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "pageSeo": ${ADVANTAGES_PAGE_SEO},
  "banners": ${ADVANTAGES_BANNERS},
  "advantages": ${ALL_ADVANTAGES},
  "advantagesPageConfig": ${advantagesPageConfigQuery}
}`;

// ─────────────────────────────────────────────
// 科普中心
// ─────────────────────────────────────────────

/** 科普页 SEO */
const KNOWLEDGE_PAGE_SEO = `*[_type == "pageSeo" && pageKey == "knowledge"][0]{
  _id,
  _type,
  pageKey,
  title,
  description,
  keywords,
  ogImage${IMAGE_ASSET},
  canonicalUrl,
  noIndex
}`;

/** 科普页 Banner */
const KNOWLEDGE_BANNERS = `*[_type == "banner" && position == "knowledgeHero" && isActive == true] | order(sortOrder asc){
  _id,
  _type,
  title,
  subtitle,
  description,
  desktopImage${IMAGE_WITH_ALT},
  mobileImage${IMAGE_WITH_ALT},
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  position,
  isActive,
  seoImage${IMAGE_ASSET}
}`;

/** 文章分类列表 */
const ALL_ARTICLE_CATEGORIES = `*[_type == "articleCategory"] | order(sortOrder asc){
  _id,
  _type,
  title,
  slug,
  description,
  sortOrder
}`;

/** 全部文章列表 */
const ALL_ARTICLES = `*[_type == "article"] | order(publishedAt desc){
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  category->{
    _id,
    _type,
    title,
    slug
  },
  tags,
  author,
  publishedAt,
  isFeatured
}`;

/** 全部视频列表 */
const ALL_VIDEOS = `*[_type == "video"] | order(publishedAt desc){
  _id,
  _type,
  title,
  slug,
  summary,
  coverImage${IMAGE_WITH_ALT},
  videoUrl,
  duration,
  category->{
    _id,
    _type,
    title,
    slug
  },
  publishedAt,
  isFeatured
}`;

/** 全部 FAQ 列表 */
const ALL_FAQS = `*[_type == "faq"] | order(sortOrder asc){
  _id,
  _type,
  question,
  answer,
  category,
  relatedService->{
    _id,
    _type,
    title,
    slug
  },
  sortOrder,
  isFeatured
}`;

/** 科普中心聚合查询 */
export const knowledgePageQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "pageSeo": ${KNOWLEDGE_PAGE_SEO},
  "banners": ${KNOWLEDGE_BANNERS},
  "categories": ${ALL_ARTICLE_CATEGORIES},
  "articles": ${ALL_ARTICLES},
  "videos": ${ALL_VIDEOS},
  "faqs": ${ALL_FAQS},
  "knowledgePageConfig": ${knowledgePageConfigQuery}
}`;

// ─────────────────────────────────────────────
// 文章详情
// ─────────────────────────────────────────────

/** 文章详情（按 slug） */
export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage${IMAGE_WITH_ALT},
  category->{
    _id,
    _type,
    title,
    slug
  },
  tags,
  author,
  publishedAt,
  updatedAt,
  content[]{
    ...,
    _type == "imageWithAlt"${IMAGE_WITH_ALT}
  },
  relatedArticles[]->{
    _id,
    _type,
    title,
    slug,
    excerpt,
    coverImage${IMAGE_WITH_ALT},
    publishedAt
  },
  isFeatured,
  seo${SEO}
}`;

/** 所有文章 slug（用于 generateStaticParams） */
export const articleSlugsQuery = `*[_type == "article" && defined(slug.current)][]{
  "slug": slug.current
}`;

// ─────────────────────────────────────────────
// 视频详情
// ─────────────────────────────────────────────

/** 视频详情（按 slug） */
export const videoBySlugQuery = `*[_type == "video" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  summary,
  coverImage${IMAGE_WITH_ALT},
  videoUrl,
  duration,
  category->{
    _id,
    _type,
    title,
    slug
  },
  transcript[]{
    ...,
    _type == "imageWithAlt"${IMAGE_WITH_ALT}
  },
  publishedAt,
  isFeatured,
  seo${SEO},
  "relatedVideos": *[_type == "video" && slug.current != $slug && references(^.category._ref)] | order(publishedAt desc)[0...3]{
    _id,
    _type,
    title,
    slug,
    summary,
    coverImage${IMAGE_WITH_ALT},
    videoUrl,
    duration,
    publishedAt
  }
}`;

/** 所有视频 slug（用于 generateStaticParams） */
export const videoSlugsQuery = `*[_type == "video" && defined(slug.current)][]{
  "slug": slug.current
}`;

// ─────────────────────────────────────────────
// 联系页
// ─────────────────────────────────────────────

/** 联系页 SEO */
const CONTACT_PAGE_SEO = `*[_type == "pageSeo" && pageKey == "contact"][0]{
  _id,
  _type,
  pageKey,
  title,
  description,
  keywords,
  ogImage${IMAGE_ASSET},
  canonicalUrl,
  noIndex
}`;

/** 联系页 Banner */
const CONTACT_BANNERS = `*[_type == "banner" && position == "contactHero" && isActive == true] | order(sortOrder asc){
  _id,
  _type,
  title,
  subtitle,
  description,
  desktopImage${IMAGE_WITH_ALT},
  mobileImage${IMAGE_WITH_ALT},
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  position,
  isActive,
  seoImage${IMAGE_ASSET}
}`;

/** 联系页 FAQ（精选或全部，限制 8 条） */
const CONTACT_FAQS = `*[_type == "faq"] | order(sortOrder asc)[0...8]{
  _id,
  _type,
  question,
  answer,
  category,
  sortOrder,
  isFeatured
}`;

/** 联系页聚合查询 */
export const contactPageQuery = `{
  "siteSettings": ${siteSettingsQuery},
  "pageSeo": ${CONTACT_PAGE_SEO},
  "banners": ${CONTACT_BANNERS},
  "contactInfo": ${contactInfoQuery},
  "faqs": ${CONTACT_FAQS},
  "contactPageConfig": *[_type == "contactPageConfig"][0]{
    _id,
    _type,
    heroEyebrow,
    heroTitle,
    heroDescription,
    consultationTitle
  }
}`;
