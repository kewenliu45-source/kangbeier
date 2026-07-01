/**
 * Sanity 环境变量统一管理
 *
 * NEXT_PUBLIC_ 前缀变量可在客户端使用；
 * SANITY_API_READ_TOKEN 仅在服务端使用。
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = assertEnv(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertEnv(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

/**
 * 服务端读取 token（可选）
 * 若未设置，则 client 回退到公开 CDN 读取模式
 */
export const token = process.env.SANITY_API_READ_TOKEN;

/** Studio 路由路径 */
export const studioUrl = "/studio";

function assertEnv<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
