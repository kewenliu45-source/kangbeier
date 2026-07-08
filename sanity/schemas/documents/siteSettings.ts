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
      description: "[前台位置: 浏览器标签页标题、页脚品牌名、全站默认标题]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brandName",
      title: "品牌名称",
      type: "string",
      description: "[前台位置: 顶部导航栏Logo旁品牌名、页脚品牌名] [注意: 若与网站名称相同可不填]",
    }),
    defineField({
      name: "logo",
      title: "网站 Logo",
      type: "imageWithAlt",
      description: "[前台位置: 全站顶部导航栏左侧Logo图片] [注意: 建议200x60px透明背景PNG，100KB以内]",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "[前台位置: 浏览器标签页小图标] [注意: 建议32x32或64x64px的PNG/ICO]",
    }),
    defineField({
      name: "slogan",
      title: "品牌标语",
      type: "string",
      description: "[前台位置: 品牌宣传语，可在页头或Banner中使用]",
    }),
    defineField({
      name: "description",
      title: "网站简介",
      type: "text",
      rows: 3,
      description: "[前台位置: 页脚品牌简介、搜索引擎结构化数据]",
    }),

    // ── 默认 SEO ──
    defineField({
      name: "defaultSeo",
      title: "默认 SEO 设置",
      type: "seo",
      description: "[前台位置: 全站页面的默认搜索引擎展示信息] [注意: 非专业人员建议保持默认]",
    }),

    // ── 导航 ──
    defineField({
      name: "headerNavigation",
      title: "顶部导航",
      type: "array",
      of: [{ type: "link" }],
      description: "[前台位置: 全站顶部导航栏菜单项]",
    }),
    defineField({
      name: "footerNavigation",
      title: "底部导航",
      type: "array",
      of: [{ type: "link" }],
      description: "[前台位置: 全站页脚快速导航链接]",
    }),

    // ── 页脚信息 ──
    defineField({
      name: "footerDescription",
      title: "页脚简介",
      type: "text",
      rows: 2,
      description: "[前台位置: 全站页脚品牌简介文字]",
    }),
    defineField({
      name: "icpText",
      title: "ICP 备案号",
      type: "string",
      description: "[前台位置: 全站页脚底部备案号]",
    }),
    defineField({
      name: "copyrightText",
      title: "版权信息",
      type: "string",
      description: "[前台位置: 全站页脚底部版权信息]",
    }),

    // ── 联系方式 ──
    defineField({
      name: "wechatQrCode",
      title: "微信咨询二维码",
      type: "image",
      options: { hotspot: false },
      description: "[前台位置: 全站顶部导航栏微信二维码弹窗] [注意: 建议500x500px，200KB以内]",
    }),
    defineField({
      name: "primaryPhone",
      title: "主联系电话",
      type: "string",
      description: "[前台位置: 全站顶部导航栏电话、页脚电话] [注意: 联系方式中未填写时使用此号码]",
    }),
    defineField({
      name: "primaryWechat",
      title: "主微信号",
      type: "string",
      description: "[前台位置: 全站页脚微信号码] [注意: 联系方式中未填写时使用此号码]",
    }),
    defineField({
      name: "primaryEmail",
      title: "主联系邮箱",
      type: "string",
      description: "[前台位置: 全站页脚邮箱] [注意: 联系方式中未填写时使用此邮箱]",
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
      description: "[前台位置: 全站页脚营业时间] [注意: 联系方式中未填写时使用此时间]",
    }),

    // ── CTA 咨询转化区块 ──
    defineField({
      name: "ctaTitle",
      title: "CTA 标题",
      type: "string",
      description: "[前台位置: 全站底部咨询转化区块(CTA)的主标题]",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA 描述",
      type: "text",
      rows: 2,
      description: "[前台位置: 全站底部咨询转化区块(CTA)的描述文字]",
    }),
    defineField({
      name: "ctaPrimaryButtonText",
      title: "CTA 主按钮文字",
      type: "string",
      description: "[前台位置: 全站底部咨询转化区块(CTA)主按钮文字]",
    }),
    defineField({
      name: "ctaSecondaryButtonText",
      title: "CTA 次按钮文字",
      type: "string",
      description: "[前台位置: 全站底部咨询转化区块(CTA)次按钮文字]",
    }),
    defineField({
      name: "ctaPhone",
      title: "CTA 电话号码",
      type: "string",
      description: "[前台位置: 全站底部咨询转化区块(CTA)的电话号码]",
    }),
  ],
  preview: {
    prepare() {
      return { title: "网站设置" };
    },
  },
});
