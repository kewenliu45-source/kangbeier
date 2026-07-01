import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "科普文章",
  type: "document",
  fields: [
    // ── 基础信息 ──
    defineField({
      name: "title",
      title: "文章标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "从标题自动生成，用于 /knowledge/articles/[slug]",
    }),
    defineField({
      name: "excerpt",
      title: "文章摘要",
      type: "text",
      rows: 3,
      description: "列表页卡片展示，建议 100-160 字",
      validation: (rule) => rule.max(200).warning("建议不超过 200 字"),
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description: "文章列表页和详情页顶部展示",
    }),

    // ── 分类与标签 ──
    defineField({
      name: "category",
      title: "文章分类",
      type: "reference",
      to: [{ type: "articleCategory" }],
      description: "选择文章所属分类",
    }),
    defineField({
      name: "tags",
      title: "标签",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "用于筛选和搜索，如：试管婴儿、高龄备孕、成功率",
    }),

    // ── 作者与时间 ──
    defineField({
      name: "author",
      title: "作者",
      type: "string",
      description: "文章作者名称",
    }),
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      description: "默认为当前时间",
    }),
    defineField({
      name: "updatedAt",
      title: "最后更新时间",
      type: "datetime",
      description: "内容更新时手动维护",
    }),

    // ── 文章内容 ──
    defineField({
      name: "content",
      title: "文章正文",
      type: "richText",
      description: "支持富文本、图片、链接",
    }),

    // ── 关联文章 ──
    defineField({
      name: "relatedArticles",
      title: "相关文章",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "article" }],
        },
      ],
      description: "详情页底部推荐阅读",
    }),

    // ── 展示控制 ──
    defineField({
      name: "isFeatured",
      title: "首页精选",
      type: "boolean",
      initialValue: false,
      description: "勾选后展示在首页科普区块",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "不填则使用默认 SEO",
    }),
  ],
  orderings: [
    {
      title: "按发布时间（新→旧）",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "按发布时间（旧→新）",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      publishedAt: "publishedAt",
      isFeatured: "isFeatured",
      media: "coverImage.image",
    },
    prepare({ title, category, publishedAt, isFeatured, media }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("zh-CN")
        : undefined;
      return {
        title,
        subtitle: [
          category,
          date,
          isFeatured ? "★ 精选" : undefined,
        ]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
