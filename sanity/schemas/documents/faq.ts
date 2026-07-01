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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "回答",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
      description: "简洁清晰的回答，适合前台折叠展示",
    }),
    defineField({
      name: "category",
      title: "问题分类",
      type: "string",
      options: {
        list: FAQ_CATEGORIES,
        layout: "radio",
      },
      description: "用于前台按分类筛选和分组展示",
    }),
    defineField({
      name: "relatedService",
      title: "关联服务",
      type: "reference",
      to: [{ type: "service" }],
      description: "可选，关联后可在服务详情页展示",
    }),
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
      description: "勾选后展示在首页 FAQ 区块",
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "可选，FAQ 页面 SEO 配置",
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
    },
    prepare({ question, category, isFeatured }) {
      const cat = FAQ_CATEGORIES.find((c) => c.value === category);
      return {
        title: question || "未命名问题",
        subtitle: [
          cat?.title,
          isFeatured ? "★ 首页展示" : undefined,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
