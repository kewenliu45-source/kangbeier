import { defineField, defineType } from "sanity";

export const contactInfo = defineType({
  name: "contactInfo",
  title: "联系方式",
  type: "document",
  fields: [
    // ── 基础联系方式 ──
    defineField({
      name: "phone",
      title: "联系电话",
      type: "string",
      description: "如：400-123-4567",
    }),
    defineField({
      name: "wechatId",
      title: "微信号",
      type: "string",
      description: "客服微信号",
    }),
    defineField({
      name: "wechatQrCode",
      title: "微信二维码",
      type: "image",
      options: { hotspot: false },
      description: "扫码添加微信咨询",
    }),
    defineField({
      name: "email",
      title: "联系邮箱",
      type: "string",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? true
            : "请输入有效的邮箱地址";
        }),
    }),
    defineField({
      name: "address",
      title: "地址",
      type: "text",
      rows: 2,
      description: "详细地址",
    }),
    defineField({
      name: "mapImage",
      title: "地图图片",
      type: "imageWithAlt",
      description: "可选，静态地图截图",
    }),
    defineField({
      name: "mapUrl",
      title: "地图链接",
      type: "url",
      description: "高德/百度/腾讯地图链接",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "businessHours",
      title: "营业时间",
      type: "text",
      rows: 2,
      description: "如：周一至周五 9:00-18:00\n周六 9:00-12:00",
    }),
    defineField({
      name: "consultationNotice",
      title: "咨询提示",
      type: "text",
      rows: 2,
      description: "联系页顶部或表单旁的提示文案",
    }),

    // ── 联系方式列表 ──
    defineField({
      name: "contactMethods",
      title: "联系方式列表",
      type: "array",
      of: [
        {
          type: "object",
          name: "contactMethod",
          title: "联系方式",
          fields: [
            defineField({
              name: "type",
              title: "类型",
              type: "string",
              options: {
                list: [
                  { title: "电话", value: "phone" },
                  { title: "微信", value: "wechat" },
                  { title: "邮箱", value: "email" },
                  { title: "在线表单", value: "form" },
                  { title: "其他", value: "other" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "显示名称",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "值",
              type: "string",
              description: "电话号码、微信号、邮箱地址等",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "说明",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "图标",
              type: "string",
              description: "可选，图标名称（lucide-react）",
            }),
            defineField({
              name: "href",
              title: "链接",
              type: "string",
              description: "可选，点击跳转地址",
            }),
            defineField({
              name: "isPrimary",
              title: "主要联系方式",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
              isPrimary: "isPrimary",
            },
            prepare({ title, subtitle, isPrimary }) {
              return {
                title,
                subtitle: `${subtitle}${isPrimary ? " ★ 主要" : ""}`,
              };
            },
          },
        },
      ],
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "SEO 设置",
      type: "seo",
      description: "联系页 SEO 配置",
    }),
  ],
  preview: {
    prepare() {
      return { title: "联系方式" };
    },
  },
});
