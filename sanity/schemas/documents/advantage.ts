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
      description: "[前台位置: 优势列表页卡片标题、优势详情页顶部标题]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "[前台位置: 优势详情页网址路径] [注意: 修改后旧链接失效，建议只在创建时设置一次]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "优势简介",
      type: "text",
      rows: 2,
      description: "[前台位置: 优势列表页卡片简介、首页优势区块卡片简介] [注意: 建议80-120字]",
      validation: (rule) => rule.max(200).warning("建议不超过 200 字"),
    }),
    defineField({
      name: "icon",
      title: "图标",
      type: "image",
      description: "[前台位置: 优势列表页卡片左上角小图标] [注意: 建议64x64px透明背景PNG]",
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description: "[前台位置: 优势详情页顶部封面大图] [注意: 建议1200x600px，500KB以内]",
    }),

    // ── 详情内容 ──
    defineField({
      name: "description",
      title: "简要描述",
      type: "text",
      rows: 3,
      description: "[前台位置: 优势详情页封面图下方的简要描述文字]",
    }),
    defineField({
      name: "content",
      title: "详细介绍",
      type: "richText",
      description: "[前台位置: 优势详情页主体内容区域，支持图文混排]",
    }),

    // ── 数据统计 ──
    defineField({
      name: "statistics",
      title: "数据统计",
      type: "array",
      description: "[前台位置: 优势页底部数据统计区块] [注意: 最多显示前4项]",
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
              description: "[前台位置: 数据统计区块每项的指标名称文字]",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "指标数值",
              type: "string",
              description: "[前台位置: 数据统计区块每项的数值，如98%、5000+] [注意: 建议简短有力]",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "补充说明",
              type: "string",
              description: "[前台位置: 数据统计区块每项数值下方的补充说明]",
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
      description: "[前台位置: 优势详情页底部关联服务入口] [注意: 需先在[服务项目]中创建]",
    }),

    // ── 排序与展示 ──
    defineField({
      name: "sortOrder",
      title: "排序权重",
      type: "number",
      initialValue: 0,
      description: "[前台位置: 优势列表页排列顺序] [注意: 数值越小越靠前，建议用10/20/30间隔]",
    }),
    defineField({
      name: "isFeatured",
      title: "首页展示",
      type: "boolean",
      initialValue: false,
      description: "[前台位置: 首页第四屏核心优势区块] [注意: 关闭后首页不展示该优势]",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "[前台位置: 优势详情页的搜索引擎展示信息] [注意: 非专业人员建议保持默认]",
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
