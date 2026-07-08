import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "链接",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "链接文字",
      type: "string",
      description: "[前台位置: 导航菜单或页脚链接的显示文字]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "链接地址",
      type: "string",
      description: "[前台位置: 点击链接后的跳转地址] [注意: 站内用/path形式，不要填不存在的地址]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "新窗口打开",
      type: "boolean",
      description: "[注意: 勾选后链接在新浏览器标签页打开]",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});
