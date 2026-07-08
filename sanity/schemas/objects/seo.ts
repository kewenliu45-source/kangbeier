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
      description: "[前台位置: 浏览器标签页标题、搜索结果标题] [注意: 建议50-60个字符，过长会被截断]",
      validation: (rule) =>
        rule.max(60).warning("建议不超过 60 个字符，过长会被搜索引擎截断"),
    }),
    defineField({
      name: "metaDescription",
      title: "页面描述（Meta Description）",
      type: "text",
      rows: 3,
      description: "[前台位置: 搜索结果标题下方的描述文字] [注意: 建议120-160个字符]",
      validation: (rule) =>
        rule.max(160).warning("建议不超过 160 个字符"),
    }),
    defineField({
      name: "keywords",
      title: "关键词",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "[前台位置: 搜索引擎关键词参考] [注意: 非专业人员建议保持默认]",
    }),
    defineField({
      name: "ogTitle",
      title: "社交分享标题（OG Title）",
      type: "string",
      description: "[前台位置: 微信/社交平台分享时的标题] [注意: 建议不超过70个字符]",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "ogDescription",
      title: "社交分享描述（OG Description）",
      type: "text",
      rows: 2,
      description: "[前台位置: 微信/社交平台分享时的描述文字] [注意: 建议不超过200个字符]",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "ogImage",
      title: "社交分享图片（OG Image）",
      type: "image",
      options: { hotspot: true },
      description: "[前台位置: 微信/社交平台分享时的预览图] [注意: 建议1200x630px，200KB以内]",
    }),
    defineField({
      name: "canonicalUrl",
      title: "规范链接（Canonical URL）",
      type: "url",
      description: "[前台位置: 搜索引擎收录的标准链接] [注意: 非专业人员建议留空]",
    }),
    defineField({
      name: "noIndex",
      title: "禁止搜索引擎索引",
      type: "boolean",
      initialValue: false,
      description: "[注意: 一般页面不要勾选，勾选后搜索引擎不收录该页面]",
    }),
  ],
});
