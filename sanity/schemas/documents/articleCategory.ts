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
      description: "[前台位置: 科普页分类筛选标签、文章列表页分类名称]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "[前台位置: 分类文章列表页网址路径] [注意: 修改后旧链接失效，建议只在创建时设置一次]",
    }),
    defineField({
      name: "description",
      title: "分类描述",
      type: "text",
      rows: 2,
      description: "[前台位置: 分类文章列表页分类描述文字]",
    }),
    defineField({
      name: "sortOrder",
      title: "排序权重",
      type: "number",
      initialValue: 0,
      description: "[前台位置: 科普页分类筛选标签排列顺序] [注意: 数值越小越靠前，建议用10/20/30间隔]",
    }),
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "[前台位置: 分类文章列表页的搜索引擎展示信息] [注意: 非专业人员建议保持默认]",
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
