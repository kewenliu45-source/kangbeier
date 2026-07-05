/**
 * Sanity 环境变量统一管理
 *
 * NEXT_PUBLIC_ 前缀变量可在客户端使用；
 * SANITY_API_READ_TOKEN 仅在服务端使用。
 *
 * 所有变量均提供默认值，缺失时不会导致构建失败。
 * 仅在 projectId 为空时于开发环境给出提示。
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// 开发环境下提示缺失的 projectId
if (!projectId && process.env.NODE_ENV === "development") {
  console.warn(
    "[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID 未设置，Sanity 数据获取将不可用。请在 .env.local 中配置。"
  );
}

/**
 * 服务端读取 token（可选）
 * 若未设置，则 client 回退到公开 CDN 读取模式
 */
export const token = process.env.SANITY_API_READ_TOKEN;

/**
 * 服务端写入 token（可选）
 * 用于 API route 写入线索，需要 Sanity Editor 权限
 * 不可使用 NEXT_PUBLIC_ 前缀，仅限服务端使用
 */
export const writeToken = process.env.SANITY_API_WRITE_TOKEN;

/** Studio 路由路径 */
export const studioUrl = "/studio";
