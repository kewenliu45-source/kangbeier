import { defineField, defineType } from "sanity";

/** Banner 所属页面位置 */
const POSITIONS = [
  { title: "首页首屏", value: "homeHero" },
  { title: "服务页首屏", value: "servicesHero" },
  { title: "优势页首屏", value: "advantagesHero" },
  { title: "科普页首屏", value: "knowledgeHero" },
  { title: "联系页首屏", value: "contactHero" },
];

export const banner = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      description: "[前台位置: 对应页面首屏Hero区域的主标题]",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "副标题",
      type: "string",
      description: "[前台位置: 对应页面首屏Hero区域主标题上方的小标题/标签]",
    }),
    defineField({
      name: "description",
      title: "描述",
      type: "text",
      rows: 3,
      description: "[前台位置: 对应页面首屏Hero区域主标题下方的描述文字]",
    }),
    defineField({
      name: "desktopImage",
      title: "桌面端背景图",
      type: "imageWithAlt",
      description: "[前台位置: 对应页面首屏背景大图(桌面端)] [注意: 建议1920x800px，500KB以内]",
    }),
    defineField({
      name: "mobileImage",
      title: "移动端背景图",
      type: "imageWithAlt",
      description: "[前台位置: 对应页面首屏背景图(手机端)] [注意: 建议750x900px，300KB以内]",
    }),
    defineField({
      name: "buttonText",
      title: "主按钮文字",
      type: "string",
      description: "[前台位置: 对应页面首屏Hero区域主按钮文字，如: 免费咨询方案]",
    }),
    defineField({
      name: "buttonLink",
      title: "主按钮链接",
      type: "string",
      description: "[前台位置: 主按钮点击后的跳转地址] [注意: 站内用/path形式，不要填不存在的地址]",
    }),
    defineField({
      name: "secondaryButtonText",
      title: "次按钮文字",
      type: "string",
      description: "[前台位置: 对应页面首屏Hero区域次按钮文字，如: 立即电话沟通]",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "次按钮链接",
      type: "string",
      description: "[前台位置: 次按钮点击后的跳转地址] [注意: 站内用/path形式，不要填不存在的地址]",
    }),
    defineField({
      name: "position",
      title: "所属页面",
      type: "string",
      description: "[前台位置: 选择此Banner显示在哪个页面的首屏]",
      options: {
        list: POSITIONS,
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "启用状态",
      type: "boolean",
      initialValue: true,
      description: "[前台位置: 对应页面首屏] [注意: 关闭后该Banner不会在前台显示]",
    }),
    defineField({
      name: "seoImage",
      title: "SEO 图片",
      type: "image",
      options: { hotspot: true },
      description: "[前台位置: 微信/社交平台分享时的预览图] [注意: 建议1200x630px，200KB以内]",
    }),
  ],
  orderings: [
    {
      title: "按页面位置",
      name: "positionAsc",
      by: [{ field: "position", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      position: "position",
      isActive: "isActive",
      media: "desktopImage.image",
    },
    prepare({ title, position, isActive, media }) {
      const pos = POSITIONS.find((p) => p.value === position);
      return {
        title: title || "未命名 Banner",
        subtitle: `${pos?.title || position || "未指定位置"}${isActive === false ? "（已停用）" : ""}`,
        media,
      };
    },
  },
});
