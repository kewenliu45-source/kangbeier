import { defineField, defineType } from "sanity";

export const advantagesPageConfig = defineType({
  name: "advantagesPageConfig",
  title: "优势页配置",
  type: "document",
  // singleton — 通过 structure.ts 限制只有一份
  fields: [
    // ── 页面 Hero ──
    defineField({
      name: "heroEyebrow",
      title: "Hero 小标题",
      type: "string",
      description: "[前台位置: 优势页顶部Hero区域的小标题/标签]",
      initialValue: "选择我们",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero 标题",
      type: "string",
      description: "[前台位置: 优势页顶部Hero区域的主标题]",
      initialValue: "让每一步选择都有依据",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero 描述",
      type: "text",
      rows: 2,
      description: "[前台位置: 优势页顶部Hero区域主标题下方的描述文字]",
      initialValue: "从身体情况评估、方案理解、资源对接到周期陪伴，为有特殊生育需求的家庭提供更清晰的咨询支持。",
    }),

    // ── 统计数据区块 ──
    defineField({
      name: "statsEyebrow",
      title: "统计区块小标题",
      type: "string",
      description: "[前台位置: 优势页数据统计区块的小标题]",
      initialValue: "数据见证",
    }),
    defineField({
      name: "statsTitle",
      title: "统计区块标题",
      type: "string",
      description: "[前台位置: 优势页数据统计区块的主标题]",
      initialValue: "我们的服务数据",
    }),

    // ── 关联服务区块 ──
    defineField({
      name: "relatedServicesEyebrow",
      title: "关联服务小标题",
      type: "string",
      description: "[前台位置: 优势页关联服务区块的小标题]",
      initialValue: "相关服务",
    }),
    defineField({
      name: "relatedServicesTitle",
      title: "关联服务标题",
      type: "string",
      description: "[前台位置: 优势页关联服务区块的主标题]",
      initialValue: "了解更多服务项目",
    }),
  ],
  preview: {
    prepare() {
      return { title: "优势页配置" };
    },
  },
});
