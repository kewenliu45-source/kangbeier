import { defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "视频内容",
  type: "document",
  fields: [
    // ── 基础信息 ──
    defineField({
      name: "title",
      title: "视频标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "从标题自动生成，用于 /knowledge/videos/[slug]",
    }),
    defineField({
      name: "summary",
      title: "视频简介",
      type: "text",
      rows: 2,
      description: "列表页卡片展示，建议 80-150 字",
      validation: (rule) => rule.max(200).warning("建议不超过 200 字"),
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description: "视频列表页展示，建议使用视频截图",
    }),

    // ── 视频信息 ──
    defineField({
      name: "videoUrl",
      title: "视频链接",
      type: "url",
      description:
        "支持 YouTube、Bilibili、腾讯视频等平台链接",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "duration",
      title: "视频时长",
      type: "string",
      description: "格式：mm:ss 或 hh:mm:ss，例如 03:25",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          return /^\d{1,2}:\d{2}(:\d{2})?$/.test(value)
            ? true
            : "请输入正确的时间格式，如 03:25 或 1:03:25";
        }),
    }),

    // ── 分类 ──
    defineField({
      name: "category",
      title: "视频分类",
      type: "reference",
      to: [{ type: "articleCategory" }],
      description: "复用文章分类体系",
    }),

    // ── 视频文稿 ──
    defineField({
      name: "transcript",
      title: "视频文稿",
      type: "richText",
      description: "可选，视频内容的文字版本，有助于 SEO 和无障碍访问",
    }),

    // ── 时间与展示 ──
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      description: "默认为当前时间",
    }),
    defineField({
      name: "isFeatured",
      title: "首页精选",
      type: "boolean",
      initialValue: false,
      description: "勾选后展示在首页视频区块",
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
  ],
  preview: {
    select: {
      title: "title",
      duration: "duration",
      category: "category.title",
      isFeatured: "isFeatured",
      media: "coverImage.image",
    },
    prepare({ title, duration, category, isFeatured, media }) {
      return {
        title,
        subtitle: [
          category,
          duration,
          isFeatured ? "★ 精选" : undefined,
        ]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
