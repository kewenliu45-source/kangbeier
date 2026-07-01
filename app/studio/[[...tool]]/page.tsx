"use client";

/**
 * Sanity Studio 嵌入式路由
 * 访问路径: /studio
 */

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
