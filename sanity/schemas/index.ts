import type { SchemaTypeDefinition } from "sanity";

// Document Schemas
import { advantage } from "./documents/advantage";
import { advantagesPageConfig } from "./documents/advantagesPageConfig";
import { article } from "./documents/article";
import { articleCategory } from "./documents/articleCategory";
import { banner } from "./documents/banner";
import { caseSchema } from "./documents/case";
import { consultationFormConfig } from "./documents/consultationFormConfig";
import { consultationLead } from "./documents/consultationLead";
import { contactInfo } from "./documents/contactInfo";
import { contactPageConfig } from "./documents/contactPageConfig";
import { faq } from "./documents/faq";
import { homePageConfig } from "./documents/homePageConfig";
import { keywordLibrary } from "./documents/keywordLibrary";
import { knowledgePageConfig } from "./documents/knowledgePageConfig";
import { layoutConfig } from "./documents/layoutConfig";
import { pageSeo } from "./documents/pageSeo";
import { service } from "./documents/service";
import { servicesPageConfig } from "./documents/servicesPageConfig";
import { siteSettings } from "./documents/siteSettings";
import { video } from "./documents/video";

// Object Schemas
import { cta } from "./objects/cta";
import { imageWithAlt } from "./objects/imageWithAlt";
import { link } from "./objects/link";
import { richText } from "./objects/richText";
import { seo } from "./objects/seo";

/** 所有 Object Schema — 可被文档 Schema 复用 */
export const objectTypes: SchemaTypeDefinition[] = [
  seo,
  imageWithAlt,
  richText,
  link,
  cta,
];

/** 所有 Document Schema */
export const documentTypes: SchemaTypeDefinition[] = [
  siteSettings,
  layoutConfig,
  homePageConfig,
  contactPageConfig,
  advantagesPageConfig,
  servicesPageConfig,
  knowledgePageConfig,
  consultationFormConfig,
  pageSeo,
  keywordLibrary,
  banner,
  service,
  advantage,
  caseSchema,
  articleCategory,
  article,
  video,
  faq,
  contactInfo,
  consultationLead,
];

/** 汇总所有 Schema 类型 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...objectTypes, ...documentTypes],
};
