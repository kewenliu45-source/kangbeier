import { defineField, defineType } from "sanity";

/** 可维护 SEO 的静态页面 */
const PAGE_KEYS = [
  { title: "首页", value: "home" },
  { title: "服务页", value: "services" },
  { title: "优势页", value: "advantages" },
  { title: "科普页", value: "knowledge" },
  { title: "联系页", value: "contact" },
];

export const pageSeo = defineType({
  name: "pageSeo",
  title: "页面 SEO",
  type: "document",
  fields: [
    defineField({
      name: "pageKey",
      title: "页面标识",
      type: "string",
      options: {
        list: PAGE_KEYS,
        layout: "radio",
      },
      description: "唯一标识，每个页面只能有一条 SEO 记录",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "页面标题（Meta Title）",
      type: "string",
      description: "建议 50-60 个字符",
      validation: (rule) =>
        rule.required().max(60).warning("建议不超过 60 个字符"),
    }),
    defineField({
      name: "description",
      title: "页面描述（Meta Description）",
      type: "text",
      rows: 3,
      description: "建议 120-160 个字符",
      validation: (rule) =>
        rule.required().max(160).warning("建议不超过 160 个字符"),
    }),
    defineField({
      name: "keywords",
      title: "关键词",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "ogImage",
      title: "社交分享图片",
      type: "image",
      options: { hotspot: true },
      description: "建议 1200×630 像素",
    }),
    defineField({
      name: "canonicalUrl",
      title: "规范链接（Canonical URL）",
      type: "url",
      description: "留空则使用页面默认 URL",
    }),
    defineField({
      name: "noIndex",
      title: "禁止搜索引擎索引",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { pageKey: "pageKey", title: "title" },
    prepare({ pageKey, title }) {
      const page = PAGE_KEYS.find((p) => p.value === pageKey);
      return {
        title: page?.title || pageKey || "未选择页面",
        subtitle: title,
      };
    },
  },
});
