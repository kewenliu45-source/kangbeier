import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

/**
 * Sanity client（带 token，服务端使用）
 * - 读取公开内容 + 受保护内容
 * - 前台 SSR / ISR 数据获取推荐使用此 client
 * - useCdn: false 确保每次请求都从 Sanity API 获取最新数据
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

/**
 * 匿名 client（仅 CDN 读取公开内容）
 * 适合纯客户端调用或不需要 token 的场景
 */
export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
