import { defineField, defineType } from "sanity";

export const contactPageConfig = defineType({
  name: "contactPageConfig",
  title: "联系页配置",
  type: "document",
  // singleton — 通过 structure.ts 限制只有一份
  fields: [
    // ── 页面 Hero ──
    defineField({
      name: "heroEyebrow",
      title: "Hero 小标题",
      type: "string",
      description: "[前台位置: 联系页顶部Hero区域的小标题/标签]",
      initialValue: "联系我们",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero 标题",
      type: "string",
      description: "[前台位置: 联系页顶部Hero区域的主标题]",
      initialValue: "先沟通情况，再判断下一步",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero 描述",
      type: "text",
      rows: 2,
      description: "[前台位置: 联系页顶部Hero区域主标题下方的描述文字]",
      initialValue: "如果您正在经历高龄备孕、试管多次失败、二胎规划或特殊生育需求，可以先做一次初步咨询。",
    }),

    // ── 咨询说明区块 ──
    defineField({
      name: "consultationTitle",
      title: "咨询说明标题",
      type: "string",
      description: "[前台位置: 联系页咨询说明区域的标题]",
      initialValue: "咨询说明",
    }),
  ],
  preview: {
    prepare() {
      return { title: "联系页配置" };
    },
  },
});
