import { defineField, defineType } from "sanity";

export const servicesPageConfig = defineType({
  name: "servicesPageConfig",
  title: "服务页配置",
  type: "document",
  // singleton — 通过 structure.ts 限制只有一份
  fields: [
    // ── 页面 Hero ──
    defineField({
      name: "heroEyebrow",
      title: "Hero 小标题",
      type: "string",
      initialValue: "服务项目",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero 标题",
      type: "string",
      initialValue: "根据您的情况，匹配更合适的助孕咨询路径",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero 描述",
      type: "text",
      rows: 2,
      initialValue: "不做统一套餐推荐，先了解年龄、身体情况、过往经历和当前需求，再给出更清晰的服务建议。",
    }),
  ],
  preview: {
    prepare() {
      return { title: "服务页配置" };
    },
  },
});
