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
      description: "[前台位置: 科普文章列表页卡片标题、文章详情页顶部标题]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "[前台位置: 文章详情页网址路径] [注意: 修改后旧链接失效，建议只在创建时设置一次]",
    }),
    defineField({
      name: "excerpt",
      title: "文章摘要",
      type: "text",
      rows: 3,
      description: "[前台位置: 科普文章列表页卡片简介文字] [注意: 建议100-160字]",
      validation: (rule) => rule.max(200).warning("建议不超过 200 字"),
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description: "[前台位置: 科普文章列表页卡片封面图、文章详情页顶部大图] [注意: 建议1200x600px，500KB以内]",
    }),

    // ── 分类与标签 ──
    defineField({
      name: "category",
      title: "文章分类",
      type: "reference",
      to: [{ type: "articleCategory" }],
      description: "[前台位置: 文章列表页卡片分类标签、详情页面包屑分类] [注意: 需先在[文章分类]中创建]",
    }),
    defineField({
      name: "tags",
      title: "标签",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "[前台位置: 文章列表页卡片标签] [注意: 用于内部筛选，建议2-5个]",
    }),

    // ── 作者与时间 ──
    defineField({
      name: "author",
      title: "作者",
      type: "string",
      description: "[前台位置: 文章列表页卡片作者名、文章详情页作者信息]",
    }),
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      description: "[前台位置: 文章列表页卡片日期、文章详情页发布时间]",
    }),
    defineField({
      name: "updatedAt",
      title: "最后更新时间",
      type: "datetime",
      description: "[前台位置: 文章详情页更新时间] [注意: 需手动更新，用于显示内容时效性]",
    }),

    // ── 文章内容 ──
    defineField({
      name: "content",
      title: "文章正文",
      type: "richText",
      description: "[前台位置: 文章详情页正文内容区域，支持图文混排]",
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
      description: "[前台位置: 文章详情页底部推荐阅读区域] [注意: 需先创建其他文章]",
    }),

    // ── 展示控制 ──
    defineField({
      name: "isFeatured",
      title: "首页精选",
      type: "boolean",
      initialValue: false,
      description: "[前台位置: 首页第七屏科普文章区块] [注意: 关闭后首页不展示该文章]",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "[前台位置: 文章详情页的搜索引擎展示信息] [注意: 非专业人员建议保持默认]",
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
