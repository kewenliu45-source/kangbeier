import type { QueryParams } from "next-sanity";

import { client } from "./client";

interface FetchOptions {
  /** GROQ 查询字符串 */
  query: string;
  /** 查询参数 */
  params?: QueryParams;
  /**
   * Next.js revalidate 秒数
   * - false: 不缓存（每次请求实时获取）
   * - number: ISR，按秒数重新验证
   * @default false
   */
  revalidate?: false | number;
  /**
   * Next.js cache 策略
   * - "force-cache": 静态缓存
   * - "no-store": 不缓存
   * @default "no-store"
   */
  cache?: RequestCache;
}

/**
 * 通用 Sanity 数据获取函数
 *
 * 封装 `client.fetch`，接入 Next.js 缓存控制。
 * 后续可扩展 draft mode、token 切换等。
 *
 * @example
 * ```ts
 * const siteSettings = await sanityFetch<SiteSettings>({
 *   query: `*[_type == "siteSettings"][0]`,
 * });
 * ```
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = false,
  cache = "no-store",
}: FetchOptions): Promise<T> {
  return client.fetch<T>(query, params);
}
