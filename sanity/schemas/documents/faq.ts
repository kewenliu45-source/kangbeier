import { defineField, defineType } from "sanity";

/** FAQ 分类 */
const FAQ_CATEGORIES = [
  { title: "就诊流程", value: "process" },
  { title: "费用相关", value: "pricing" },
  { title: "治疗方案", value: "treatment" },
  { title: "成功率", value: "success-rate" },
  { title: "注意事项", value: "precautions" },
  { title: "其他", value: "other" },
];

export const faq = defineType({
  name: "faq",
  title: "常见问题",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "问题",
      type: "string",
      description: "[前台位置: 首页第九屏常见问题折叠区问题、联系页FAQ折叠区问题]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "回答",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
      description: "[前台位置: 首页第九屏常见问题折叠区回答、联系页FAQ折叠区回答] [注意: 简洁清晰，适合折叠展示]",
    }),
    defineField({
      name: "category",
      title: "问题分类",
      type: "string",
      options: {
        list: FAQ_CATEGORIES,
        layout: "radio",
      },
      description: "[前台位置: FAQ按分类分组展示] [注意: 用于内部筛选和分组]",
    }),
    defineField({
      name: "relatedService",
      title: "关联服务",
      type: "reference",
      to: [{ type: "service" }],
      description: "[前台位置: 服务详情页常见问题折叠区] [注意: 需先在[服务项目]中创建]",
    }),
    defineField({
      name: "sortOrder",
      title: "排序权重",
      type: "number",
      initialValue: 0,
      description: "[前台位置: FAQ列表排列顺序] [注意: 数值越小越靠前，建议用10/20/30间隔]",
    }),
    defineField({
      name: "isFeatured",
      title: "首页展示",
      type: "boolean",
      initialValue: false,
      description: "[前台位置: 首页第九屏常见问题区块] [注意: 关闭后首页不展示该问题]",
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "[前台位置: FAQ页面的搜索引擎展示信息] [注意: 非专业人员建议保持默认]",
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
      question: "question",
      category: "category",
      isFeatured: "isFeatured",
      sortOrder: "sortOrder",
    },
    prepare({ question, category, isFeatured, sortOrder }) {
      const cat = FAQ_CATEGORIES.find((c) => c.value === category);
      return {
        title: question || "未命名问题",
        subtitle: [
          cat?.title,
          `排序: ${sortOrder ?? 0}`,
          isFeatured ? "★ 首页展示" : undefined,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
