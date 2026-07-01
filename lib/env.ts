/**
 * 环境变量读取与校验工具
 *
 * 使用方式：
 * import { env } from "@/lib/env";
 * console.log(env.NEXT_PUBLIC_SITE_URL);
 */

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    console.warn(`Environment variable ${key} is not set`);
    return "";
  }
  return value;
}

function getRequiredEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
}

export const env = {
  // 站点配置
  NEXT_PUBLIC_SITE_URL: getEnvVar("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: getEnvVar("NEXT_PUBLIC_SITE_NAME", "康贝儿"),

  // Sanity CMS 配置
  NEXT_PUBLIC_SANITY_PROJECT_ID: getEnvVar("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  NEXT_PUBLIC_SANITY_DATASET: getEnvVar("NEXT_PUBLIC_SANITY_DATASET", "production"),
  NEXT_PUBLIC_SANITY_API_VERSION: getEnvVar("NEXT_PUBLIC_SANITY_API_VERSION", "2024-01-01"),
  SANITY_API_READ_TOKEN: getEnvVar("SANITY_API_READ_TOKEN"),

  // 表单通知配置
  CONTACT_NOTIFICATION_EMAIL: getEnvVar("CONTACT_NOTIFICATION_EMAIL"),

  // SMTP 配置
  SMTP_HOST: getEnvVar("SMTP_HOST"),
  SMTP_PORT: getEnvVar("SMTP_PORT", "587"),
  SMTP_USER: getEnvVar("SMTP_USER"),
  SMTP_PASSWORD: getEnvVar("SMTP_PASSWORD"),

  // 企业微信配置
  WECHAT_WEBHOOK_URL: getEnvVar("WECHAT_WEBHOOK_URL"),

  // 飞书配置
  FEISHU_WEBHOOK_URL: getEnvVar("FEISHU_WEBHOOK_URL"),

  // 统计工具配置
  NEXT_PUBLIC_BAIDU_ANALYTICS_ID: getEnvVar("NEXT_PUBLIC_BAIDU_ANALYTICS_ID"),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: getEnvVar("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
} as const;

/**
 * 检查 Sanity 配置是否完整
 * 在需要使用 Sanity 的地方调用
 */
export function isSanityConfigured(): boolean {
  return Boolean(
    env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      env.NEXT_PUBLIC_SANITY_DATASET &&
      env.NEXT_PUBLIC_SANITY_API_VERSION
  );
}

/**
 * 检查邮件配置是否完整
 */
export function isEmailConfigured(): boolean {
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASSWORD);
}

/**
 * 检查企业微信配置是否完整
 */
export function isWechatConfigured(): boolean {
  return Boolean(env.WECHAT_WEBHOOK_URL);
}

/**
 * 检查飞书配置是否完整
 */
export function isFeishuConfigured(): boolean {
  return Boolean(env.FEISHU_WEBHOOK_URL);
}
