import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "图片（含替代文本）",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "图片",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "替代文本（Alt）",
      type: "string",
      description: "描述图片内容，用于无障碍访问和 SEO",
      validation: (rule) => rule.required().max(125),
    }),
    defineField({
      name: "caption",
      title: "图片说明",
      type: "string",
      description: "可选，显示在图片下方的说明文字",
    }),
  ],
  preview: {
    select: {
      media: "image",
      title: "alt",
      subtitle: "caption",
    },
  },
});
