import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, writeToken } from "../env";

/**
 * Sanity 写入 client（仅服务端 API route 使用）
 * 需要 SANITY_API_WRITE_TOKEN 环境变量
 *
 * 注意：此文件不可被客户端组件 import，"server-only" 会阻止这种情况
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});

/**
 * 检查写入 token 是否已配置
 * 在执行写入操作前调用，未配置时给出明确报错
 */
export function assertWriteToken(): void {
  if (!writeToken) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN 未配置，无法写入 Sanity。请在 .env.local 中设置该变量。"
    );
  }
}
