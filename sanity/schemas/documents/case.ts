import { defineField, defineType } from "sanity";

export const caseSchema = defineType({
  name: "case",
  title: "成功案例",
  type: "document",
  fields: [
    // ── 基础信息 ──
    defineField({
      name: "title",
      title: "案例标题",
      type: "string",
      description:
        "用于展示的标题，请勿包含真实姓名或可识别身份的信息。建议使用「XX 岁宝宝」等匿名描述。",
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
      title: "案例简介",
      type: "text",
      rows: 2,
      description: "列表页卡片展示，建议 80-120 字，请勿包含可识别身份的信息",
      validation: (rule) => rule.max(200).warning("建议不超过 200 字"),
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description: "请使用匿名配图，避免使用可识别面部的照片",
    }),

    // ── 匿名设置 ──
    defineField({
      name: "isAnonymous",
      title: "匿名案例",
      type: "boolean",
      initialValue: true,
      description: "成功案例默认必须匿名，保护患者隐私",
      validation: (rule) =>
        rule.custom((value) => {
          if (value === false) {
            return "⚠️ 成功案例必须匿名，请勿取消此选项";
          }
          return true;
        }),
    }),

    // ── 案例详情 ──
    defineField({
      name: "ageRange",
      title: "年龄段",
      type: "string",
      description: "如：2-3 岁、学龄前、小学阶段",
    }),
    defineField({
      name: "background",
      title: "案例背景",
      type: "text",
      rows: 3,
      description: "请使用匿名描述，避免真实姓名、地址等可识别信息",
    }),
    defineField({
      name: "challenge",
      title: "面临挑战",
      type: "text",
      rows: 3,
      description: "描述孩子的核心问题和困难",
    }),
    defineField({
      name: "solution",
      title: "干预方案",
      type: "text",
      rows: 3,
      description: "采用的训练方法和干预策略",
    }),
    defineField({
      name: "result",
      title: "康复效果",
      type: "text",
      rows: 3,
      description: "干预后的改善情况和成果",
    }),
    defineField({
      name: "treatmentType",
      title: "干预类型",
      type: "string",
      description: "如：感统训练、语言康复、行为干预等",
    }),
    defineField({
      name: "duration",
      title: "干预周期",
      type: "string",
      description: "如：3 个月、半年、持续干预中",
    }),

    // ── 标签 ──
    defineField({
      name: "tags",
      title: "标签",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "用于筛选和分类，如：感统训练、语言发育、社交能力",
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
      description: "勾选后展示在首页案例区块",
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
      treatmentType: "treatmentType",
      isFeatured: "isFeatured",
      media: "coverImage.image",
    },
    prepare({ title, treatmentType, isFeatured, media }) {
      return {
        title,
        subtitle: [
          treatmentType,
          isFeatured ? "★ 首页展示" : undefined,
        ]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
