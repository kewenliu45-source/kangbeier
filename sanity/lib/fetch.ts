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
  cache?: "force-cache" | "no-store";
}

/**
 * 通用 Sanity 数据获取函数
 *
 * 封装 `client.fetch`，接入 Next.js 缓存控制。
 * 通过 client.fetch 第三个参数传递 cache 和 next.revalidate，
 * 避免 no-store 与 next.revalidate 同时出现的语义冲突。
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
  // 情况 A：不缓存 —— 只传 cache，不传 next
  if (cache === "no-store") {
    return client.fetch<T>(query, params, { cache: "no-store" });
  }

  // 情况 B：revalidate 语义等同 no-store —— 只传 cache，不传 next
  if (revalidate === 0) {
    return client.fetch<T>(query, params, { cache: "no-store" });
  }

  // 情况 C：带 revalidate 的 force-cache —— 同时传 cache 和 next.revalidate
  if (cache === "force-cache" && typeof revalidate === "number" && revalidate > 0) {
    return client.fetch<T>(query, params, {
      cache: "force-cache",
      next: { revalidate },
    });
  }

  // 情况 D：永久 force-cache（revalidate === false）—— 只传 cache，不传 next
  return client.fetch<T>(query, params, { cache: "force-cache" });
}
