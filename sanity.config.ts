"use client";

/**
 * Sanity Studio 配置
 * 嵌入式 Studio 路由: /studio
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { syncKeywords } from "./sanity/actions/syncKeywords";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  document: {
    actions: (prev, context) => {
      if (context.schemaType === "pageSeo") {
        return [...prev, syncKeywords];
      }
      return prev;
    },
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
