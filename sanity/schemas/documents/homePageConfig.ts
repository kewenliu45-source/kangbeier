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
              description: "lucide-react 图标名称，如：ShieldCheck",
            }),
            defineField({
              name: "title",
              title: "标题",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "描述",
              type: "string",
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
      description: "Hero 区域的信任点展示",
    }),
    defineField({
      name: "heroServiceTags",
      title: "Hero 服务标签",
      type: "array",
      of: [{ type: "string" }],
      description: "Hero 区域的服务标签",
    }),
    defineField({
      name: "heroInfoCardTitle",
      title: "Hero 信息卡片标题",
      type: "string",
      description: "Hero 右侧信息卡片标题",
    }),
    defineField({
      name: "heroInfoCardDescription",
      title: "Hero 信息卡片描述",
      type: "text",
      rows: 2,
      description: "Hero 右侧信息卡片描述",
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
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "标签",
              type: "string",
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
      description: "信任背书区块的数据",
    }),

    // ── 服务流程区块 ──
    defineField({
      name: "processEyebrow",
      title: "流程区块小标题",
      type: "string",
      initialValue: "Our Process",
    }),
    defineField({
      name: "processTitle",
      title: "流程区块标题",
      type: "string",
      initialValue: "服务流程",
    }),
    defineField({
      name: "processDescription",
      title: "流程区块描述",
      type: "string",
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
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "步骤描述",
              type: "string",
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
      description: "服务流程步骤",
    }),

    // ── 服务项目区块 ──
    defineField({
      name: "serviceEyebrow",
      title: "服务区块小标题",
      type: "string",
      initialValue: "Our Services",
    }),
    defineField({
      name: "serviceTitle",
      title: "服务区块标题",
      type: "string",
      initialValue: "专业服务项目",
    }),
    defineField({
      name: "serviceDescription",
      title: "服务区块描述",
      type: "string",
      initialValue: "为您的家庭提供全方位的辅助生殖咨询服务",
    }),

    // ── 优势区块 ──
    defineField({
      name: "advantageEyebrow",
      title: "优势区块小标题",
      type: "string",
      initialValue: "Why Choose Us",
    }),
    defineField({
      name: "advantageTitle",
      title: "优势区块标题",
      type: "string",
      initialValue: "选择我们的理由",
    }),
    defineField({
      name: "advantageDescription",
      title: "优势区块描述",
      type: "string",
      initialValue: "专业、私密、高效的一站式辅助生殖咨询服务",
    }),
    defineField({
      name: "advantageDetailText",
      title: "优势区块详细说明",
      type: "text",
      rows: 3,
      description: "优势区块左侧的详细说明文字",
    }),

    // ── 案例区块 ──
    defineField({
      name: "caseEyebrow",
      title: "案例区块小标题",
      type: "string",
      initialValue: "Success Stories",
    }),
    defineField({
      name: "caseTitle",
      title: "案例区块标题",
      type: "string",
      initialValue: "真实案例分享",
    }),
    defineField({
      name: "caseDescription",
      title: "案例区块描述",
      type: "string",
      initialValue: "匿名展示，保护隐私，仅供参考",
    }),
    defineField({
      name: "caseDisclaimer",
      title: "案例免责声明",
      type: "string",
      initialValue: "* 案例已匿名处理，仅供参考，不构成任何医疗建议或效果承诺",
    }),

    // ── 文章区块 ──
    defineField({
      name: "articleEyebrow",
      title: "文章区块小标题",
      type: "string",
      initialValue: "Knowledge Center",
    }),
    defineField({
      name: "articleTitle",
      title: "文章区块标题",
      type: "string",
      initialValue: "科普文章",
    }),
    defineField({
      name: "articleDescription",
      title: "文章区块描述",
      type: "string",
      initialValue: "了解辅助生殖知识，做出更明智的决策",
    }),

    // ── 视频区块 ──
    defineField({
      name: "videoEyebrow",
      title: "视频区块小标题",
      type: "string",
      initialValue: "Video Center",
    }),
    defineField({
      name: "videoTitle",
      title: "视频区块标题",
      type: "string",
      initialValue: "科普视频",
    }),
    defineField({
      name: "videoDescription",
      title: "视频区块描述",
      type: "string",
      initialValue: "通过视频快速了解辅助生殖知识",
    }),
  ],
  preview: {
    prepare() {
      return { title: "首页配置" };
    },
  },
});
