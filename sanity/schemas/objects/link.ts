import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "链接",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "链接文字",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "链接地址",
      type: "string",
      description: "支持外部 URL（https://...）或内部路径（/about）",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "新窗口打开",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});
