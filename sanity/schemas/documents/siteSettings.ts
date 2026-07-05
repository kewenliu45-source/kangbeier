import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "网站设置",
  type: "document",
  // singleton — 通过 structure.ts 限制只有一份
  fields: [
    // ── 品牌信息 ──
    defineField({
      name: "siteName",
      title: "网站名称",
      type: "string",
      description: "显示在浏览器标签、页脚等位置",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brandName",
      title: "品牌名称",
      type: "string",
      description: "可选，若与网站名称不同则单独填写",
    }),
    defineField({
      name: "logo",
      title: "网站 Logo",
      type: "imageWithAlt",
      description: "页头导航展示的 Logo",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "浏览器标签栏小图标，建议 32×32 或 64×64 像素的 PNG/ICO",
    }),
    defineField({
      name: "slogan",
      title: "品牌标语",
      type: "string",
      description: "简短宣传语，可用于页头或 banner",
    }),
    defineField({
      name: "description",
      title: "网站简介",
      type: "text",
      rows: 3,
      description: "网站整体描述，可用于 footer 或关于页面",
    }),

    // ── 默认 SEO ──
    defineField({
      name: "defaultSeo",
      title: "默认 SEO 设置",
      type: "seo",
      description: "未单独设置 SEO 的页面将使用此默认值",
    }),

    // ── 导航 ──
    defineField({
      name: "headerNavigation",
      title: "顶部导航",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "footerNavigation",
      title: "底部导航",
      type: "array",
      of: [{ type: "link" }],
    }),

    // ── 页脚信息 ──
    defineField({
      name: "footerDescription",
      title: "页脚简介",
      type: "text",
      rows: 2,
      description: "显示在页脚的品牌简介",
    }),
    defineField({
      name: "icpText",
      title: "ICP 备案号",
      type: "string",
      description: "如：京ICP备12345678号",
    }),
    defineField({
      name: "copyrightText",
      title: "版权信息",
      type: "string",
      description: "如：© 2024 康贝儿 版权所有",
    }),

    // ── 联系方式 ──
    defineField({
      name: "wechatQrCode",
      title: "微信咨询二维码",
      type: "image",
      options: { hotspot: false },
      description: "扫码添加微信",
    }),
    defineField({
      name: "primaryPhone",
      title: "主联系电话",
      type: "string",
      description: "如：400-123-4567",
    }),
    defineField({
      name: "primaryWechat",
      title: "主微信号",
      type: "string",
      description: "客服微信号",
    }),
    defineField({
      name: "primaryEmail",
      title: "主联系邮箱",
      type: "string",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true; // 可选
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? true
            : "请输入有效的邮箱地址";
        }),
    }),
    defineField({
      name: "businessHours",
      title: "营业时间",
      type: "string",
      description: "如：周一至周五 9:00-18:00",
    }),
  ],
  preview: {
    prepare() {
      return { title: "网站设置" };
    },
  },
});
