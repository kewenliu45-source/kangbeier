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
      description: "[前台位置: 对应页面的搜索引擎展示信息] [注意: 每个页面只能有一条SEO记录]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "页面标题（Meta Title）",
      type: "string",
      description: "[前台位置: 浏览器标签页标题、搜索结果标题] [注意: 建议50-60个字符]",
      validation: (rule) =>
        rule.required().max(60).warning("建议不超过 60 个字符"),
    }),
    defineField({
      name: "description",
      title: "页面描述（Meta Description）",
      type: "text",
      rows: 3,
      description: "[前台位置: 搜索结果标题下方的描述文字] [注意: 建议120-160个字符]",
      validation: (rule) =>
        rule.required().max(160).warning("建议不超过 160 个字符"),
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
      name: "keywordSource",
      title: "关键词来源",
      type: "object",
      description: "引用其他页面或公共关键词库的关键词，点击文档顶部「同步关键词」按钮增量同步",
      fields: [
        defineField({
          name: "sourceType",
          title: "来源类型",
          type: "string",
          options: {
            list: [
              { title: "公共关键词库", value: "keywordLibrary" },
              { title: "其他页面 SEO", value: "pageSeo" },
            ],
            layout: "radio",
          },
        }),
        defineField({
          name: "sourceLibrary",
          title: "公共关键词库",
          type: "reference",
          to: [{ type: "keywordLibrary" }],
          description: "选择关键词库后，点击文档顶部「同步关键词」按钮导入",
          hidden: ({ parent }) => parent?.sourceType !== "keywordLibrary",
        }),
        defineField({
          name: "sourcePage",
          title: "其他页面 SEO",
          type: "reference",
          to: [{ type: "pageSeo" }],
          description: "选择来源页面后，点击文档顶部「同步关键词」按钮导入",
          hidden: ({ parent }) => parent?.sourceType !== "pageSeo",
        }),
      ],
    }),
    defineField({
      name: "ogImage",
      title: "社交分享图片",
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
      description: "[注意: 一般页面不要勾选，勾选后搜索引擎不收录该页面]",
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
