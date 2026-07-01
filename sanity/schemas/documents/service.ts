import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "服务项目",
  type: "document",
  fields: [
    // ── 基础信息 ──
    defineField({
      name: "title",
      title: "服务名称",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "用于 /services/[slug] 路由，从标题自动生成",
    }),
    defineField({
      name: "summary",
      title: "服务简介",
      type: "text",
      rows: 2,
      description: "列表页和首页卡片展示，建议 80-120 字",
      validation: (rule) => rule.max(200).warning("建议不超过 200 字"),
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description: "列表页卡片展示",
    }),
    defineField({
      name: "icon",
      title: "图标",
      type: "image",
      description: "可选，服务卡片小图标",
    }),

    // ── 详情内容 ──
    defineField({
      name: "description",
      title: "详细介绍",
      type: "richText",
      description: "服务详情页主体内容",
    }),
    defineField({
      name: "highlights",
      title: "服务亮点",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "suitableFor",
      title: "适用人群",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    // ── 服务流程 ──
    defineField({
      name: "processSteps",
      title: "服务流程",
      type: "array",
      of: [
        {
          type: "object",
          name: "processStep",
          title: "流程步骤",
          fields: [
            defineField({
              name: "title",
              title: "步骤名称",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "步骤说明",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "sortOrder",
              title: "排序",
              type: "number",
              initialValue: 0,
            }),
          ],
          preview: {
            select: { title: "title", order: "sortOrder" },
            prepare({ title, order }) {
              return {
                title,
                subtitle: order ? `第 ${order} 步` : undefined,
              };
            },
          },
        },
      ],
    }),

    // ── 优势 ──
    defineField({
      name: "advantages",
      title: "服务优势",
      type: "array",
      of: [
        {
          type: "object",
          name: "advantage",
          title: "优势项",
          fields: [
            defineField({
              name: "title",
              title: "优势标题",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "优势说明",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),

    // ── FAQ ──
    defineField({
      name: "faqs",
      title: "常见问题",
      type: "array",
      of: [
        {
          type: "object",
          name: "faq",
          title: "问答",
          fields: [
            defineField({
              name: "question",
              title: "问题",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "回答",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),

    // ── CTA ──
    defineField({
      name: "ctaText",
      title: "行动号召文案",
      type: "string",
      description: "如：立即预约、免费咨询",
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
      title: "首页精选",
      type: "boolean",
      initialValue: false,
      description: "勾选后展示在首页服务区块",
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
      slug: "slug.current",
      isFeatured: "isFeatured",
      media: "coverImage.image",
    },
    prepare({ title, slug, isFeatured, media }) {
      return {
        title,
        subtitle: `/services/${slug}${isFeatured ? " ★ 精选" : ""}`,
        media,
      };
    },
  },
});
