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
      description: "[前台位置: 该图片在前台对应位置显示]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "替代文本（Alt）",
      type: "string",
      description: "[前台位置: 图片加载失败时的替代文字、搜索引擎图片索引] [注意: 用简短文字描述图片内容]",
      validation: (rule) => rule.required().max(125),
    }),
    defineField({
      name: "caption",
      title: "图片说明",
      type: "string",
      description: "[前台位置: 图片下方的说明文字]",
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
