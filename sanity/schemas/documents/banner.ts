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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "副标题",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "desktopImage",
      title: "桌面端背景图",
      type: "imageWithAlt",
      description: "建议尺寸 1920×800 像素",
    }),
    defineField({
      name: "mobileImage",
      title: "移动端背景图",
      type: "imageWithAlt",
      description: "建议尺寸 750×900 像素",
    }),
    defineField({
      name: "buttonText",
      title: "主按钮文字",
      type: "string",
    }),
    defineField({
      name: "buttonLink",
      title: "主按钮链接",
      type: "string",
      description: "支持外部 URL（https://...）或内部路径（/services）",
    }),
    defineField({
      name: "secondaryButtonText",
      title: "次按钮文字",
      type: "string",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "次按钮链接",
      type: "string",
      description: "支持外部 URL 或内部路径",
    }),
    defineField({
      name: "position",
      title: "所属页面",
      type: "string",
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
      description: "关闭后该 Banner 不会在前台显示",
    }),
    defineField({
      name: "seoImage",
      title: "SEO 图片",
      type: "image",
      options: { hotspot: true },
      description: "用于 OG 分享等场景，建议 1200×630 像素",
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
