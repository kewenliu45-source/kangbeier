import { defineField, defineType } from "sanity";

export const knowledgePageConfig = defineType({
  name: "knowledgePageConfig",
  title: "科普页配置",
  type: "document",
  // singleton — 通过 structure.ts 限制只有一份
  fields: [
    // ── 页面 Hero ──
    defineField({
      name: "heroEyebrow",
      title: "Hero 小标题",
      type: "string",
      description: "[前台位置: 科普页顶部Hero区域的小标题/标签]",
      initialValue: "科普中心",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero 标题",
      type: "string",
      description: "[前台位置: 科普页顶部Hero区域的主标题]",
      initialValue: "用更清晰的信息，减少盲目焦虑",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero 描述",
      type: "text",
      rows: 2,
      description: "[前台位置: 科普页顶部Hero区域主标题下方的描述文字]",
      initialValue: "整理试管基础知识、高龄备孕、胚胎筛查和常见问题，帮助您在咨询前先建立基本判断。",
    }),

    // ── 文章区块 ──
    defineField({
      name: "articleEyebrow",
      title: "文章区块小标题",
      type: "string",
      description: "[前台位置: 科普页文章区块的小标题]",
      initialValue: "精选文章",
    }),
    defineField({
      name: "articleTitle",
      title: "文章区块标题",
      type: "string",
      description: "[前台位置: 科普页文章区块的主标题]",
      initialValue: "科普文章",
    }),
    defineField({
      name: "articleDescription",
      title: "文章区块描述",
      type: "string",
      description: "[前台位置: 科普页文章区块的描述文字]",
      initialValue: "了解辅助生殖知识，做出更明智的决策",
    }),

    // ── 视频区块 ──
    defineField({
      name: "videoEyebrow",
      title: "视频区块小标题",
      type: "string",
      description: "[前台位置: 科普页视频区块的小标题]",
      initialValue: "科普视频",
    }),
    defineField({
      name: "videoTitle",
      title: "视频区块标题",
      type: "string",
      description: "[前台位置: 科普页视频区块的主标题]",
      initialValue: "视频内容",
    }),
    defineField({
      name: "videoDescription",
      title: "视频区块描述",
      type: "string",
      description: "[前台位置: 科普页视频区块的描述文字]",
      initialValue: "通过视频快速了解辅助生殖知识",
    }),
  ],
  preview: {
    prepare() {
      return { title: "科普页配置" };
    },
  },
});
