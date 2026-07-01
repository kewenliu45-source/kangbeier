import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "站点设置",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "站点标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "站点描述",
      type: "text",
    }),
    defineField({
      name: "logo",
      title: "站点 Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
