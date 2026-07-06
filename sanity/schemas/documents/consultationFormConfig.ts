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
      initialValue: "预约咨询",
    }),

    // ── 提交成功页面 ──
    defineField({
      name: "successTitle",
      title: "成功标题",
      type: "string",
      initialValue: "已收到您的咨询信息",
    }),
    defineField({
      name: "successDescription",
      title: "成功描述",
      type: "string",
      initialValue: "我们会尽快与您联系，也可以直接拨打电话沟通。",
    }),
    defineField({
      name: "successPhone",
      title: "成功页电话",
      type: "string",
      description: "提交成功后显示的电话号码",
    }),
    defineField({
      name: "successButtonText",
      title: "继续咨询按钮文字",
      type: "string",
      initialValue: "继续咨询",
    }),

    // ── 提交按钮 ──
    defineField({
      name: "submitButtonText",
      title: "提交按钮文字",
      type: "string",
      initialValue: "提交咨询",
    }),
    defineField({
      name: "submittingText",
      title: "提交中文字",
      type: "string",
      initialValue: "提交中...",
    }),

    // ── 底部提示 ──
    defineField({
      name: "privacyNotice",
      title: "隐私提示",
      type: "string",
      initialValue: "提交后顾问会在工作时间与您联系，您的信息将被严格保密",
    }),
  ],
  preview: {
    prepare() {
      return { title: "咨询表单配置" };
    },
  },
});
