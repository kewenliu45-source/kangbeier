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
      description: "[前台位置: 联系页电话咨询卡片、页脚联系方式区电话号码]",
    }),
    defineField({
      name: "wechatId",
      title: "微信号",
      type: "string",
      description: "[前台位置: 联系页微信咨询卡片微信号、页脚微信号码]",
    }),
    defineField({
      name: "wechatQrCode",
      title: "微信二维码",
      type: "image",
      options: { hotspot: false },
      description: "[前台位置: 联系页微信二维码弹窗] [注意: 建议500x500px，200KB以内]",
    }),
    defineField({
      name: "email",
      title: "联系邮箱",
      type: "string",
      description: "[前台位置: 联系页地址/邮箱卡片]",
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
      description: "[前台位置: 联系页地址/邮箱卡片地址信息]",
    }),
    defineField({
      name: "mapImage",
      title: "地图图片",
      type: "imageWithAlt",
      description: "[前台位置: 联系页地图展示区域] [注意: 建议800x400px，300KB以内]",
    }),
    defineField({
      name: "mapUrl",
      title: "地图链接",
      type: "url",
      description: "[前台位置: 联系页地图卡片的[查看地图]链接] [注意: 需填写完整的地图链接]",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "businessHours",
      title: "营业时间",
      type: "text",
      rows: 2,
      description: "[前台位置: 联系页营业时间卡片、页脚营业时间]",
    }),
    defineField({
      name: "consultationNotice",
      title: "咨询提示",
      type: "text",
      rows: 2,
      description: "[前台位置: 联系页咨询说明区域的提示文案]",
    }),

    // ── 联系方式列表 ──
    defineField({
      name: "contactMethods",
      title: "联系方式列表",
      type: "array",
      description: "[前台位置: 联系页联系方式卡片列表]",
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
              description: "[前台位置: 联系方式卡片的类型]",
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
              description: "[前台位置: 联系方式卡片的标题文字]",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "值",
              type: "string",
              description: "[前台位置: 联系方式卡片的值，如电话号码、微信号等]",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "说明",
              type: "string",
              description: "[前台位置: 联系方式卡片的补充说明文字]",
            }),
            defineField({
              name: "icon",
              title: "图标",
              type: "string",
              description: "[前台位置: 联系方式卡片的图标] [注意: 需填写lucide-react图标名称]",
            }),
            defineField({
              name: "href",
              title: "链接",
              type: "string",
              description: "[前台位置: 联系方式卡片的点击跳转链接] [注意: 站内用/path形式]",
            }),
            defineField({
              name: "isPrimary",
              title: "主要联系方式",
              type: "boolean",
              description: "[注意: 勾选后该联系方式在列表中优先显示]",
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
      description: "[前台位置: 联系页的搜索引擎展示信息] [注意: 非专业人员建议保持默认]",
    }),
  ],
  preview: {
    prepare() {
      return { title: "联系方式" };
    },
  },
});
