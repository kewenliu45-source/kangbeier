import { defineField, defineType } from "sanity";

export const keywordItem = defineType({
  name: "keywordItem",
  title: "关键词",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "关键词",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "来源",
      type: "string",
      options: {
        list: [
          { title: "同步", value: "sync" },
          { title: "手动", value: "manual" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
    }),
  ],
  preview: {
    select: { title: "text", source: "source" },
    prepare({ title, source }) {
      return {
        title,
        subtitle: source === "sync" ? "同步" : "手动",
      };
    },
  },
});
