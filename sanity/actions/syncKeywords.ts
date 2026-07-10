/**
 * 同步关键词 - Sanity 自定义文档操作
 *
 * 仅在 pageSeo 文档上显示。
 * 从引用的来源（公共关键词库或其他页面SEO）增量同步关键词。
 * 规则：只新增不删除，精确文本匹配去重。
 */

import { useCallback, useState } from "react";
import { useClient } from "sanity";
import type { DocumentActionComponent } from "sanity";
import { SyncIcon } from "@sanity/icons";

interface KeywordSource {
  sourceType?: "keywordLibrary" | "pageSeo";
  sourceRef?: { _ref: string };
}

export const syncKeywords: DocumentActionComponent = (props) => {
  const { id, type, draft, published } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const [isSyncing, setIsSyncing] = useState(false);

  // 仅在 pageSeo 文档上显示
  if (type !== "pageSeo") {
    return null;
  }

  const doc = (draft || published) as Record<string, any> | undefined;
  const keywordSource = doc?.keywordSource as KeywordSource | undefined;
  const sourceRef = keywordSource?.sourceRef?._ref;

  // 未配置来源时禁用按钮
  if (!keywordSource?.sourceType || !sourceRef) {
    return {
      label: "同步关键词",
      icon: SyncIcon,
      disabled: true,
      title: "请先设置关键词来源",
    };
  }

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    try {
      // 1. 获取来源文档的关键词
      const sourceDoc = await client.fetch<{ keywords?: string[] } | null>(
        `*[_id == $id][0]{ keywords }`,
        { id: sourceRef }
      );

      const sourceKeywords: string[] = sourceDoc?.keywords || [];

      if (sourceKeywords.length === 0) {
        window.alert("来源文档暂无关键词");
        return;
      }

      // 2. 获取当前文档的关键词
      const currentDoc = await client.fetch<{ keywords?: string[] } | null>(
        `*[_id == $id][0]{ keywords }`,
        { id: id.replace(/^drafts\./, "") }
      );

      const currentKeywords: string[] =
        (draft?.keywords as string[]) || currentDoc?.keywords || [];

      // 3. 增量同步：只添加来源中存在但当前不存在的关键词
      const currentSet = new Set(currentKeywords);
      const newKeywords = sourceKeywords.filter((kw) => !currentSet.has(kw));

      if (newKeywords.length === 0) {
        window.alert("没有新关键词需要同步");
        return;
      }

      // 4. 合并：保留现有 + 追加新增
      const mergedKeywords = [...currentKeywords, ...newKeywords];

      // 5. 写入（优先更新 draft，否则创建 draft from published）
      const targetId = draft?._id || id.replace(/^drafts\./, "");
      const docId = draft?._id ? targetId : `drafts.${targetId}`;

      await client
        .patch(docId)
        .set({ keywords: mergedKeywords })
        .commit();

      window.alert(`✅ 已同步 ${newKeywords.length} 个新关键词`);
    } catch (err) {
      console.error("同步关键词失败:", err);
      window.alert("❌ 同步失败，请重试");
    } finally {
      setIsSyncing(false);
    }
  }, [client, draft, id, sourceRef]);

  return {
    label: isSyncing ? "同步中..." : "同步关键词",
    icon: SyncIcon,
    disabled: isSyncing,
    onHandle: handleSync,
  };
};
