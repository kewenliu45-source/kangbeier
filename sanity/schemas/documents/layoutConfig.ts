import { defineField, defineType } from "sanity";

export const layoutConfig = defineType({
  name: "layoutConfig",
  title: "布局配置",
  type: "document",
  // singleton — 通过 structure.ts 限制只有一份
  fields: [
    // ── Header 配置 ──
    defineField({
      name: "wechatConsultText",
      title: "微信咨询按钮文字",
      type: "string",
      description: "导航栏微信咨询按钮文字",
      initialValue: "微信咨询",
    }),
    defineField({
      name: "wechatModalTitle",
      title: "微信弹窗标题",
      type: "string",
      description: "微信二维码弹窗标题",
      initialValue: "添加微信",
    }),
    defineField({
      name: "wechatModalDescription",
      title: "微信弹窗描述",
      type: "string",
      description: "微信二维码弹窗描述文字",
      initialValue: "获取试管科普与咨询提醒",
    }),
    defineField({
      name: "wechatQrPlaceholder",
      title: "二维码占位文字",
      type: "string",
      description: "未上传二维码时显示的占位文字",
      initialValue: "公众号二维码",
    }),

    // ── Footer 配置 ──
    defineField({
      name: "footerNavTitle",
      title: "底部导航标题",
      type: "string",
      description: "页脚导航区域标题",
      initialValue: "快速导航",
    }),
    defineField({
      name: "footerContactTitle",
      title: "底部联系方式标题",
      type: "string",
      description: "页脚联系方式区域标题",
      initialValue: "联系我们",
    }),
    defineField({
      name: "footerWechatNote",
      title: "底部微信提示",
      type: "string",
      description: "页脚微信咨询提示文字",
      initialValue: "微信咨询：顶部导航扫码添加",
    }),

    // ── FloatingContact 配置 ──
    defineField({
      name: "floatingPhoneText",
      title: "浮动电话按钮文字",
      type: "string",
      description: "移动端底部浮动电话按钮文字",
      initialValue: "电话沟通",
    }),
    defineField({
      name: "floatingCtaText",
      title: "浮动咨询按钮文字",
      type: "string",
      description: "移动端底部浮动咨询按钮文字",
      initialValue: "免费咨询方案",
    }),
  ],
  preview: {
    prepare() {
      return { title: "布局配置" };
    },
  },
});
