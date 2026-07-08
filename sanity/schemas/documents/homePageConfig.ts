import { defineField, defineType } from "sanity";

export const homePageConfig = defineType({
  name: "homePageConfig",
  title: "首页配置",
  type: "document",
  // singleton — 通过 structure.ts 限制只有一份
  fields: [
    // ── Hero 区块 ──
    defineField({
      name: "heroTrustPoints",
      title: "Hero 信任点",
      type: "array",
      of: [
        {
          type: "object",
          name: "trustPoint",
          title: "信任点",
          fields: [
            defineField({
              name: "icon",
              title: "图标名称",
              type: "string",
              description: "[前台位置: 信任点卡片左侧图标] [注意: 需填写lucide-react图标名称，如: ShieldCheck]",
            }),
            defineField({
              name: "title",
              title: "标题",
              type: "string",
              description: "[前台位置: 信任点卡片标题，如: 隐私保护]",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "描述",
              type: "string",
              description: "[前台位置: 信任点卡片描述文字，如: 沟通资料严格保密]",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "text",
            },
          },
        },
      ],
      description: "[前台位置: 首页第一屏左侧信任点卡片，如: 隐私保护、专属顾问、先评估]",
    }),
    defineField({
      name: "heroServiceTags",
      title: "Hero 服务标签",
      type: "array",
      of: [{ type: "string" }],
      description: "[前台位置: 首页第一屏底部服务标签，如: 高龄备孕、二胎咨询]",
    }),
    defineField({
      name: "heroInfoCardTitle",
      title: "Hero 信息卡片标题",
      type: "string",
      description: "[前台位置: 首页第一屏右侧图片卡片内标题]",
    }),
    defineField({
      name: "heroInfoCardDescription",
      title: "Hero 信息卡片描述",
      type: "text",
      rows: 2,
      description: "[前台位置: 首页第一屏右侧图片卡片内描述文字]",
    }),

    // ── 信任背书区块 ──
    defineField({
      name: "trustBarItems",
      title: "信任背书数据",
      type: "array",
      of: [
        {
          type: "object",
          name: "trustBarItem",
          title: "信任数据",
          fields: [
            defineField({
              name: "number",
              title: "数字",
              type: "string",
              description: "[前台位置: 信任背书数据的数值，如: 5000+、98%]",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "标签",
              type: "string",
              description: "[前台位置: 信任背书数据的标签文字，如: 服务家庭、满意度]",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "number",
              subtitle: "label",
            },
          },
        },
      ],
      description: "[前台位置: 首页第二屏信任背书数据，如: 5000+服务家庭、98%满意度]",
    }),

    // ── 服务流程区块 ──
    defineField({
      name: "processEyebrow",
      title: "流程区块小标题",
      type: "string",
      description: "[前台位置: 首页第五屏服务流程区块的小标题]",
      initialValue: "Our Process",
    }),
    defineField({
      name: "processTitle",
      title: "流程区块标题",
      type: "string",
      description: "[前台位置: 首页第五屏服务流程区块的主标题]",
      initialValue: "服务流程",
    }),
    defineField({
      name: "processDescription",
      title: "流程区块描述",
      type: "string",
      description: "[前台位置: 首页第五屏服务流程区块的描述文字]",
      initialValue: "从初次咨询到后续随访，全程专业陪伴",
    }),
    defineField({
      name: "processSteps",
      title: "流程步骤",
      type: "array",
      of: [
        {
          type: "object",
          name: "processStep",
          title: "流程步骤",
          fields: [
            defineField({
              name: "title",
              title: "步骤标题",
              type: "string",
              description: "[前台位置: 服务流程步骤卡片标题]",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "步骤描述",
              type: "string",
              description: "[前台位置: 服务流程步骤卡片描述文字]",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
      description: "[前台位置: 首页第五屏服务流程步骤列表]",
    }),

    // ── 服务项目区块 ──
    defineField({
      name: "serviceEyebrow",
      title: "服务区块小标题",
      type: "string",
      description: "[前台位置: 首页第三屏服务项目区块的小标题]",
      initialValue: "Our Services",
    }),
    defineField({
      name: "serviceTitle",
      title: "服务区块标题",
      type: "string",
      description: "[前台位置: 首页第三屏服务项目区块的主标题]",
      initialValue: "专业服务项目",
    }),
    defineField({
      name: "serviceDescription",
      title: "服务区块描述",
      type: "string",
      description: "[前台位置: 首页第三屏服务项目区块的描述文字]",
      initialValue: "为您的家庭提供全方位的辅助生殖咨询服务",
    }),

    // ── 优势区块 ──
    defineField({
      name: "advantageEyebrow",
      title: "优势区块小标题",
      type: "string",
      description: "[前台位置: 首页第四屏核心优势区块的小标题]",
      initialValue: "Why Choose Us",
    }),
    defineField({
      name: "advantageTitle",
      title: "优势区块标题",
      type: "string",
      description: "[前台位置: 首页第四屏核心优势区块的主标题]",
      initialValue: "选择我们的理由",
    }),
    defineField({
      name: "advantageDescription",
      title: "优势区块描述",
      type: "string",
      description: "[前台位置: 首页第四屏核心优势区块的描述文字]",
      initialValue: "专业、私密、高效的一站式辅助生殖咨询服务",
    }),
    defineField({
      name: "advantageDetailText",
      title: "优势区块详细说明",
      type: "text",
      rows: 3,
      description: "[前台位置: 首页第四屏核心优势区块左侧的详细说明文字]",
    }),

    // ── 案例区块 ──
    defineField({
      name: "caseEyebrow",
      title: "案例区块小标题",
      type: "string",
      description: "[前台位置: 首页第六屏成功案例区块的小标题]",
      initialValue: "Success Stories",
    }),
    defineField({
      name: "caseTitle",
      title: "案例区块标题",
      type: "string",
      description: "[前台位置: 首页第六屏成功案例区块的主标题]",
      initialValue: "真实案例分享",
    }),
    defineField({
      name: "caseDescription",
      title: "案例区块描述",
      type: "string",
      description: "[前台位置: 首页第六屏成功案例区块的描述文字]",
      initialValue: "匿名展示，保护隐私，仅供参考",
    }),
    defineField({
      name: "caseDisclaimer",
      title: "案例免责声明",
      type: "string",
      description: "[前台位置: 首页第六屏成功案例区块底部免责小字]",
      initialValue: "* 案例已匿名处理，仅供参考，不构成任何医疗建议或效果承诺",
    }),

    // ── 文章区块 ──
    defineField({
      name: "articleEyebrow",
      title: "文章区块小标题",
      type: "string",
      description: "[前台位置: 首页第七屏科普文章区块的小标题]",
      initialValue: "Knowledge Center",
    }),
    defineField({
      name: "articleTitle",
      title: "文章区块标题",
      type: "string",
      description: "[前台位置: 首页第七屏科普文章区块的主标题]",
      initialValue: "科普文章",
    }),
    defineField({
      name: "articleDescription",
      title: "文章区块描述",
      type: "string",
      description: "[前台位置: 首页第七屏科普文章区块的描述文字]",
      initialValue: "了解辅助生殖知识，做出更明智的决策",
    }),

    // ── 视频区块 ──
    defineField({
      name: "videoEyebrow",
      title: "视频区块小标题",
      type: "string",
      description: "[前台位置: 首页第八屏科普视频区块的小标题]",
      initialValue: "Video Center",
    }),
    defineField({
      name: "videoTitle",
      title: "视频区块标题",
      type: "string",
      description: "[前台位置: 首页第八屏科普视频区块的主标题]",
      initialValue: "科普视频",
    }),
    defineField({
      name: "videoDescription",
      title: "视频区块描述",
      type: "string",
      description: "[前台位置: 首页第八屏科普视频区块的描述文字]",
      initialValue: "通过视频快速了解辅助生殖知识",
    }),
  ],
  preview: {
    prepare() {
      return { title: "首页配置" };
    },
  },
});
