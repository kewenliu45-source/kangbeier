import { defineField, defineType } from "sanity";

const CONSULTATION_TYPES = [
  { title: "第三代试管咨询", value: "ivf-consultation" },
  { title: "试管前评估", value: "pre-ivf-assessment" },
  { title: "高龄备孕", value: "advanced-age" },
  { title: "胚胎筛查", value: "embryo-screening" },
  { title: "多次失败方案", value: "repeated-failure" },
  { title: "其他", value: "other" },
];

const STATUS_OPTIONS = [
  { title: "新线索", value: "new" },
  { title: "已联系", value: "contacted" },
  { title: "无效", value: "invalid" },
  { title: "已归档", value: "archived" },
];

export const consultationLead = defineType({
  name: "consultationLead",
  title: "咨询线索",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "姓名",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "手机号",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "age",
      title: "年龄",
      type: "number",
    }),
    defineField({
      name: "city",
      title: "所在城市",
      type: "string",
    }),
    defineField({
      name: "consultationType",
      title: "咨询项目",
      type: "string",
      options: {
        list: CONSULTATION_TYPES,
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "message",
      title: "备注",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sourcePage",
      title: "来源页面",
      type: "string",
    }),
    defineField({
      name: "utmSource",
      title: "UTM Source",
      type: "string",
    }),
    defineField({
      name: "utmMedium",
      title: "UTM Medium",
      type: "string",
    }),
    defineField({
      name: "utmCampaign",
      title: "UTM Campaign",
      type: "string",
    }),
    defineField({
      name: "submittedAt",
      title: "提交时间",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "status",
      title: "跟进状态",
      type: "string",
      options: {
        list: STATUS_OPTIONS,
        layout: "dropdown",
      },
      initialValue: "new",
    }),
    defineField({
      name: "internalNote",
      title: "内部备注",
      type: "text",
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: "按提交时间（新→旧）",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "按状态",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      phone: "phone",
      consultationType: "consultationType",
      status: "status",
      submittedAt: "submittedAt",
    },
    prepare({ name, phone, consultationType, status, submittedAt }) {
      const typeLabel =
        CONSULTATION_TYPES.find((t) => t.value === consultationType)?.title ||
        consultationType;
      const statusLabel =
        STATUS_OPTIONS.find((s) => s.value === status)?.title || status;
      const date = submittedAt
        ? new Date(submittedAt).toLocaleDateString("zh-CN")
        : "";
      return {
        title: `${name || "未填姓名"} - ${phone || "未填手机"}`,
        subtitle: `${typeLabel} · ${statusLabel} · ${date}`,
      };
    },
  },
});
