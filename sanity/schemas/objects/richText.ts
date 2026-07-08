import { defineField, defineType } from "sanity";

export const richText = defineType({
  name: "richText",
  title: "富文本",
  type: "array",
  of: [
    // 基础文本块
    {
      type: "block",
      styles: [
        { title: "正文", value: "normal" },
        { title: "标题 2", value: "h2" },
        { title: "标题 3", value: "h3" },
        { title: "引用", value: "blockquote" },
      ],
      lists: [
        { title: "无序列表", value: "bullet" },
        { title: "有序列表", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "加粗", value: "strong" },
          { title: "斜体", value: "em" },
          { title: "下划线", value: "underline" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "链接",
            fields: [
              defineField({
                name: "href",
                title: "链接地址",
                type: "url",
                description: "[前台位置: 富文本中选中文字的链接地址] [注意: 站内用/path形式，不要填不存在的地址]",
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: "blank",
                title: "新窗口打开",
                type: "boolean",
                description: "[注意: 勾选后链接在新浏览器标签页打开]",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    },
    // 内嵌图片
    {
      type: "imageWithAlt",
    },
  ],
});
