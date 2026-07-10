import { defineField, defineType } from "sanity";

export const keywordLibrary = defineType({
  name: "keywordLibrary",
  title: "公共关键词库",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "库名称",
      type: "string",
      description: "例如：核心关键词、行业关键词",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "keywords",
      title: "关键词",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "公共关键词列表，页面SEO可引用此库同步关键词",
    }),
    defineField({
      name: "description",
      title: "备注",
      type: "text",
      rows: 2,
      description: "可选，记录此关键词库的用途",
    }),
  ],
  preview: {
    select: { title: "name", keywords: "keywords" },
    prepare({ title, keywords }) {
      const count = keywords?.length || 0;
      return {
        title: title || "未命名关键词库",
        subtitle: `${count} 个关键词`,
      };
    },
  },
});
