import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "行动号召（CTA）",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buttonText",
      title: "主按钮文字",
      type: "string",
    }),
    defineField({
      name: "buttonLink",
      title: "主按钮链接",
      type: "string",
      description: "支持外部 URL 或内部路径",
    }),
    defineField({
      name: "secondaryButtonText",
      title: "次按钮文字",
      type: "string",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "次按钮链接",
      type: "string",
      description: "支持外部 URL 或内部路径",
    }),
    defineField({
      name: "wechatQrCode",
      title: "微信二维码",
      type: "image",
      options: { hotspot: false },
      description: "扫码添加微信咨询",
    }),
    defineField({
      name: "phone",
      title: "联系电话",
      type: "string",
      description: "如：400-123-4567",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "buttonText",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "未命名 CTA",
        subtitle: subtitle ? `按钮：${subtitle}` : undefined,
      };
    },
  },
});
