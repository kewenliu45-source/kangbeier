import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";

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
export const documentTypes: SchemaTypeDefinition[] = [siteSettings];

/** 汇总所有 Schema 类型 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...objectTypes, ...documentTypes],
};
