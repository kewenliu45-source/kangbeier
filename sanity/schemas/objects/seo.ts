import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO 设置",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "页面标题（Meta Title）",
      type: "string",
      description: "建议 50-60 个字符，显示在浏览器标签和搜索结果中",
      validation: (rule) =>
        rule.max(60).warning("建议不超过 60 个字符，过长会被搜索引擎截断"),
    }),
    defineField({
      name: "metaDescription",
      title: "页面描述（Meta Description）",
      type: "text",
      rows: 3,
      description: "建议 120-160 个字符，显示在搜索结果摘要中",
      validation: (rule) =>
        rule.max(160).warning("建议不超过 160 个字符"),
    }),
    defineField({
      name: "keywords",
      title: "关键词",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "页面核心关键词，用于内部管理参考",
    }),
    defineField({
      name: "ogTitle",
      title: "社交分享标题（OG Title）",
      type: "string",
      description: "分享到微信、微博等平台时显示的标题",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "ogDescription",
      title: "社交分享描述（OG Description）",
      type: "text",
      rows: 2,
      description: "分享到社交平台时显示的描述",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "ogImage",
      title: "社交分享图片（OG Image）",
      type: "image",
      options: { hotspot: true },
      description: "建议尺寸 1200×630 像素",
    }),
    defineField({
      name: "canonicalUrl",
      title: "规范链接（Canonical URL）",
      type: "url",
      description: "避免重复内容问题，留空则使用页面默认 URL",
    }),
    defineField({
      name: "noIndex",
      title: "禁止搜索引擎索引",
      type: "boolean",
      initialValue: false,
      description: "勾选后该页面不会出现在搜索结果中",
    }),
  ],
});
