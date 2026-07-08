import { defineField, defineType } from "sanity";

export const consultationFormConfig = defineType({
  name: "consultationFormConfig",
  title: "咨询表单配置",
  type: "document",
  // singleton — 通过 structure.ts 限制只有一份
  fields: [
    // ── 表单标题 ──
    defineField({
      name: "formTitle",
      title: "表单标题",
      type: "string",
      description: "[前台位置: 联系页咨询表单顶部标题]",
      initialValue: "预约咨询",
    }),

    // ── 提交成功页面 ──
    defineField({
      name: "successTitle",
      title: "成功标题",
      type: "string",
      description: "[前台位置: 咨询表单提交成功后的页面标题]",
      initialValue: "已收到您的咨询信息",
    }),
    defineField({
      name: "successDescription",
      title: "成功描述",
      type: "string",
      description: "[前台位置: 咨询表单提交成功后的页面描述文字]",
      initialValue: "我们会尽快与您联系，也可以直接拨打电话沟通。",
    }),
    defineField({
      name: "successPhone",
      title: "成功页电话",
      type: "string",
      description: "[前台位置: 咨询表单提交成功后的页面电话号码]",
    }),
    defineField({
      name: "successButtonText",
      title: "继续咨询按钮文字",
      type: "string",
      description: "[前台位置: 咨询表单提交成功后的继续咨询按钮文字]",
      initialValue: "继续咨询",
    }),

    // ── 提交按钮 ──
    defineField({
      name: "submitButtonText",
      title: "提交按钮文字",
      type: "string",
      description: "[前台位置: 联系页咨询表单底部提交按钮文字]",
      initialValue: "提交咨询",
    }),
    defineField({
      name: "submittingText",
      title: "提交中文字",
      type: "string",
      description: "[前台位置: 咨询表单提交过程中的按钮加载文字]",
      initialValue: "提交中...",
    }),

    // ── 底部提示 ──
    defineField({
      name: "privacyNotice",
      title: "隐私提示",
      type: "string",
      description: "[前台位置: 联系页咨询表单底部隐私提示文字]",
      initialValue: "提交后顾问会在工作时间与您联系，您的信息将被严格保密",
    }),
  ],
  preview: {
    prepare() {
      return { title: "咨询表单配置" };
    },
  },
});
