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
      description: "[前台位置: 咨询转化区块(CTA)的主标题]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "描述",
      type: "text",
      rows: 3,
      description: "[前台位置: 咨询转化区块(CTA)主标题下方的描述文字]",
    }),
    defineField({
      name: "buttonText",
      title: "主按钮文字",
      type: "string",
      description: "[前台位置: 咨询转化区块(CTA)主按钮文字，如: 免费咨询方案]",
    }),
    defineField({
      name: "buttonLink",
      title: "主按钮链接",
      type: "string",
      description: "[前台位置: 主按钮点击后的跳转地址] [注意: 站内用/path形式，不要填不存在的地址]",
    }),
    defineField({
      name: "secondaryButtonText",
      title: "次按钮文字",
      type: "string",
      description: "[前台位置: 咨询转化区块(CTA)次按钮文字，如: 立即电话沟通]",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "次按钮链接",
      type: "string",
      description: "[前台位置: 次按钮点击后的跳转地址] [注意: 站内用/path形式，不要填不存在的地址]",
    }),
    defineField({
      name: "wechatQrCode",
      title: "微信二维码",
      type: "image",
      options: { hotspot: false },
      description: "[前台位置: 咨询转化区块(CTA)微信二维码] [注意: 建议500x500px，200KB以内]",
    }),
    defineField({
      name: "phone",
      title: "联系电话",
      type: "string",
      description: "[前台位置: 咨询转化区块(CTA)的电话号码]",
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
