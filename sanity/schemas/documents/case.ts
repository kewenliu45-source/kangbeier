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
      description: "[前台位置: 案例列表页卡片标题、首页案例区块卡片标题] [注意: 需去隐私化，不承诺结果]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "[前台位置: 案例详情页网址路径] [注意: 修改后旧链接失效，建议只在创建时设置一次]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "案例简介",
      type: "text",
      rows: 2,
      description: "[前台位置: 案例列表页卡片简介、首页案例区块卡片简介] [注意: 建议80-120字，需去隐私化]",
      validation: (rule) => rule.max(200).warning("建议不超过 200 字"),
    }),
    defineField({
      name: "coverImage",
      title: "封面图片",
      type: "imageWithAlt",
      description: "[前台位置: 案例列表页卡片封面图、首页案例区块卡片图] [注意: 建议1200x600px，需去隐私化配图]",
    }),

    // ── 匿名设置 ──
    defineField({
      name: "isAnonymous",
      title: "匿名案例",
      type: "boolean",
      initialValue: true,
      description: "[注意: 成功案例默认必须匿名，保护患者隐私]",
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
      description: "[前台位置: 案例详情页年龄段信息]",
    }),
    defineField({
      name: "background",
      title: "案例背景",
      type: "text",
      rows: 3,
      description: "[前台位置: 案例详情页案例背景区域] [注意: 需去隐私化，不承诺结果]",
    }),
    defineField({
      name: "challenge",
      title: "面临挑战",
      type: "text",
      rows: 3,
      description: "[前台位置: 案例详情页面临挑战区域]",
    }),
    defineField({
      name: "solution",
      title: "干预方案",
      type: "text",
      rows: 3,
      description: "[前台位置: 案例详情页干预方案区域]",
    }),
    defineField({
      name: "result",
      title: "康复效果",
      type: "text",
      rows: 3,
      description: "[前台位置: 案例详情页康复效果区域] [注意: 需去隐私化，不承诺结果]",
    }),
    defineField({
      name: "treatmentType",
      title: "干预类型",
      type: "string",
      description: "[前台位置: 案例列表页卡片干预类型标签、案例详情页干预类型]",
    }),
    defineField({
      name: "duration",
      title: "干预周期",
      type: "string",
      description: "[前台位置: 案例详情页干预周期信息]",
    }),

    // ── 标签 ──
    defineField({
      name: "tags",
      title: "标签",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "[前台位置: 案例详情页标签] [注意: 用于内部筛选，建议2-5个]",
    }),

    // ── 排序与展示 ──
    defineField({
      name: "sortOrder",
      title: "排序权重",
      type: "number",
      initialValue: 0,
      description: "[前台位置: 案例列表页排列顺序] [注意: 数值越小越靠前，建议用10/20/30间隔]",
    }),
    defineField({
      name: "isFeatured",
      title: "首页展示",
      type: "boolean",
      initialValue: false,
      description: "[前台位置: 首页第六屏成功案例区块] [注意: 关闭后首页不展示该案例]",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "[前台位置: 案例详情页的搜索引擎展示信息] [注意: 非专业人员建议保持默认]",
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
