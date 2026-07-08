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
      description: "[前台位置: 科普视频列表页卡片标题、视频详情页顶部标题、首页视频区块卡片标题]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "[前台位置: 视频详情页网址路径] [注意: 修改后旧链接失效，建议只在创建时设置一次]",
    }),
    defineField({
      name: "summary",
      title: "视频简介",
      type: "text",
      rows: 2,
      description: "[前台位置: 科普视频列表页卡片简介] [注意: 建议80-150字]",
      validation: (rule) => rule.max(200).warning("建议不超过 200 字"),
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description: "[前台位置: 科普视频列表页卡片封面图] [注意: 建议1200x675px，500KB以内]",
    }),

    // ── 视频信息 ──
    defineField({
      name: "videoUrl",
      title: "视频链接",
      type: "url",
      description: "[前台位置: 视频详情页播放区域] [注意: 支持YouTube、Bilibili、腾讯视频等平台链接]",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "duration",
      title: "视频时长",
      type: "string",
      description: "[前台位置: 科普视频列表页卡片时长标签] [注意: 格式mm:ss或hh:mm:ss，如03:25]",
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
      description: "[前台位置: 科普视频列表页卡片分类标签] [注意: 需先在[文章分类]中创建]",
    }),

    // ── 视频文稿 ──
    defineField({
      name: "transcript",
      title: "视频文稿",
      type: "richText",
      description: "[前台位置: 视频详情页下方文字版内容] [注意: 有助于SEO和无障碍访问]",
    }),

    // ── 时间与展示 ──
    defineField({
      name: "publishedAt",
      title: "发布时间",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      description: "[前台位置: 科普视频列表页卡片日期]",
    }),
    defineField({
      name: "isFeatured",
      title: "首页精选",
      type: "boolean",
      initialValue: false,
      description: "[前台位置: 首页第八屏科普视频区块] [注意: 关闭后首页不展示该视频]",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "[前台位置: 视频详情页的搜索引擎展示信息] [注意: 非专业人员建议保持默认]",
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
