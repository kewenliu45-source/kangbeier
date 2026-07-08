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
      description: "[前台位置: 服务列表页卡片标题、服务详情页顶部标题、首页服务区块卡片标题]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "[前台位置: 服务详情页网址路径] [注意: 修改后旧链接失效，建议只在创建时设置一次]",
    }),
    defineField({
      name: "summary",
      title: "服务简介",
      type: "text",
      rows: 2,
      description: "[前台位置: 服务列表页卡片简介、首页服务区块卡片简介] [注意: 建议80-120字]",
      validation: (rule) => rule.max(200).warning("建议不超过 200 字"),
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description: "[前台位置: 服务列表页卡片封面图、服务详情页顶部图] [注意: 建议1200x600px，500KB以内]",
    }),
    defineField({
      name: "icon",
      title: "图标",
      type: "image",
      description: "[前台位置: 服务列表页卡片左上角小图标] [注意: 建议64x64px透明背景PNG]",
    }),

    // ── 详情内容 ──
    defineField({
      name: "description",
      title: "详细介绍",
      type: "richText",
      description: "[前台位置: 服务详情页主体内容区域，支持图文混排]",
    }),
    defineField({
      name: "highlights",
      title: "服务亮点",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "[前台位置: 服务列表页卡片亮点标签]",
    }),
    defineField({
      name: "suitableFor",
      title: "适用人群",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "[前台位置: 服务详情页适用人群标签]",
    }),

    // ── 服务流程 ──
    defineField({
      name: "processSteps",
      title: "服务流程",
      type: "array",
      description: "[前台位置: 服务详情页服务流程步骤列表]",
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
              description: "[前台位置: 服务流程步骤卡片标题]",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "步骤说明",
              type: "text",
              rows: 2,
              description: "[前台位置: 服务流程步骤卡片描述文字]",
            }),
            defineField({
              name: "sortOrder",
              title: "排序",
              type: "number",
              description: "[注意: 数值越小越靠前，建议用10/20/30间隔]",
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
      description: "[前台位置: 服务详情页服务优势列表]",
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
              description: "[前台位置: 服务优势卡片标题]",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "优势说明",
              type: "text",
              rows: 2,
              description: "[前台位置: 服务优势卡片描述文字]",
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
      description: "[前台位置: 服务详情页底部常见问题折叠区]",
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
              description: "[前台位置: 常见问题折叠区的问题文字]",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "回答",
              type: "text",
              rows: 3,
              description: "[前台位置: 常见问题折叠区展开后的回答文字]",
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
      description: "[前台位置: 服务详情页底部行动号召按钮文字]",
    }),

    // ── 排序与展示 ──
    defineField({
      name: "sortOrder",
      title: "排序权重",
      type: "number",
      initialValue: 0,
      description: "[前台位置: 服务列表页排列顺序] [注意: 数值越小越靠前，建议用10/20/30间隔]",
    }),
    defineField({
      name: "isFeatured",
      title: "首页精选",
      type: "boolean",
      initialValue: false,
      description: "[前台位置: 首页第三屏服务项目区块] [注意: 关闭后首页不展示该服务]",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "[前台位置: 服务详情页的搜索引擎展示信息] [注意: 非专业人员建议保持默认]",
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
