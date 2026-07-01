/**
 * Sanity GROQ 查询集合
 * 后续 Task 会逐步添加具体业务查询
 */

/** 站点设置（单例） */
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;
