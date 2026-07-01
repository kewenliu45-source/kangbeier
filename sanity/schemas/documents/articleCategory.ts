import { defineField, defineType } from "sanity";

export const articleCategory = defineType({
  name: "articleCategory",
  title: "文章分类",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "分类名称",
      type: "string",
      description: "如：试管基础知识、第三代试管、高龄备孕",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "从分类名称自动生成",
    }),
    defineField({
      name: "description",
      title: "分类描述",
      type: "text",
      rows: 2,
      description: "可选，用于分类列表页展示",
    }),
    defineField({
      name: "sortOrder",
      title: "排序权重",
      type: "number",
      initialValue: 0,
      description: "数字越小越靠前",
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "分类页面的 SEO 配置",
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
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/knowledge/${slug}`,
      };
    },
  },
});
