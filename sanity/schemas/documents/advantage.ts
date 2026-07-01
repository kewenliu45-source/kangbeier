import { defineField, defineType } from "sanity";

export const advantage = defineType({
  name: "advantage",
  title: "试管优势",
  type: "document",
  fields: [
    // ── 基础信息 ──
    defineField({
      name: "title",
      title: "优势标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "优势简介",
      type: "text",
      rows: 2,
      description: "列表页和首页卡片展示，建议 80-120 字",
      validation: (rule) => rule.max(200).warning("建议不超过 200 字"),
    }),
    defineField({
      name: "icon",
      title: "图标",
      type: "image",
      description: "优势卡片小图标",
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description: "优势详情页展示",
    }),

    // ── 详情内容 ──
    defineField({
      name: "description",
      title: "简要描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "详细介绍",
      type: "richText",
      description: "优势详情页主体内容",
    }),

    // ── 数据统计 ──
    defineField({
      name: "statistics",
      title: "数据统计",
      type: "array",
      of: [
        {
          type: "object",
          name: "statistic",
          title: "统计项",
          fields: [
            defineField({
              name: "label",
              title: "指标名称",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "指标数值",
              type: "string",
              description: "如：98%、5000+、30 年",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "补充说明",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),

    // ── 关联服务 ──
    defineField({
      name: "relatedServices",
      title: "关联服务",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "service" }],
        },
      ],
      description: "关联的服务项目，展示在优势详情页",
    }),

    // ── 排序与展示 ──
    defineField({
      name: "sortOrder",
      title: "排序权重",
      type: "number",
      initialValue: 0,
      description: "数字越小越靠前",
    }),
    defineField({
      name: "isFeatured",
      title: "首页展示",
      type: "boolean",
      initialValue: false,
      description: "勾选后展示在首页优势区块",
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
      title: "按排序权重",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      isFeatured: "isFeatured",
      media: "coverImage.image",
    },
    prepare({ title, isFeatured, media }) {
      return {
        title,
        subtitle: isFeatured ? "★ 首页展示" : undefined,
        media,
      };
    },
  },
});
