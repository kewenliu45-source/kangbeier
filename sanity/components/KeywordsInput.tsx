/**
 * 自定义关键词输入组件
 *
 * 根据 source 字段渲染不同颜色的标签：
 * - sync（同步）→ 灰色
 * - manual（手动）→ 蓝色
 */

import React, { useCallback } from "react";
import { AddIcon } from "@sanity/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Stack,
  TextInput,
} from "@sanity/ui";
import {
  ArrayOfObjectsInputProps,
  PatchEvent,
  insert,
  setIfMissing,
  unset,
} from "sanity";

const sourceColors: Record<string, { bg: string; fg: string; label: string }> = {
  sync: { bg: "#e5e7eb", fg: "#374151", label: "同步" },
  manual: { bg: "#dbeafe", fg: "#1e40af", label: "手动" },
};

export function KeywordsInput(props: ArrayOfObjectsInputProps) {
  const { value, onChange, readOnly } = props;
  const [inputValue, setInputValue] = React.useState("");

  const handleAdd = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;

    // 检查重复
    const exists = (value || []).some(
      (item: any) => item.text === text
    );
    if (exists) {
      window.alert("该关键词已存在");
      return;
    }

    const newItem = {
      _key: Math.random().toString(36).slice(2, 9),
      _type: "keywordItem",
      text,
      source: "manual",
    };

    onChange(PatchEvent.from([setIfMissing([]), insert([newItem], "after", [-1])]));
    setInputValue("");
  }, [inputValue, value, onChange]);

  const handleRemove = useCallback(
    (key: string) => {
      onChange(PatchEvent.from(unset([{ _key: key }])));
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAdd();
      }
    },
    [handleAdd]
  );

  const items: any[] = value || [];

  return (
    <Stack space={3}>
      {/* 标签展示区 */}
      {items.length > 0 && (
        <Flex wrap="wrap" gap={2}>
          {items.map((item) => {
            const colors = sourceColors[item.source || "manual"];
            return (
              <Badge
                key={item._key}
                tone="default"
                style={{
                  backgroundColor: colors.bg,
                  color: colors.fg,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "13px",
                }}
              >
                <span>{item.text}</span>
                <span
                  style={{
                    fontSize: "10px",
                    opacity: 0.7,
                    marginLeft: "2px",
                  }}
                >
                  {colors.label}
                </span>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => handleRemove(item._key)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      marginLeft: "4px",
                      color: "inherit",
                      opacity: 0.6,
                      fontSize: "14px",
                      lineHeight: 1,
                    }}
                    title="删除"
                  >
                    ×
                  </button>
                )}
              </Badge>
            );
          })}
        </Flex>
      )}

      {/* 添加输入框 */}
      {!readOnly && (
        <Flex gap={2}>
          <Box flex={1}>
            <TextInput
              placeholder="输入关键词后按回车或点击添加"
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
            />
          </Box>
          <Button
            icon={AddIcon}
            text="添加"
            tone="primary"
            onClick={handleAdd}
            disabled={!inputValue.trim()}
          />
        </Flex>
      )}

      {/* 图例 */}
      {items.length > 0 && (
        <Flex gap={3} style={{ fontSize: "12px", color: "#6b7280" }}>
          <Flex align="center" gap={1}>
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                backgroundColor: sourceColors.sync.bg,
                borderRadius: 2,
              }}
            />
            <span>同步</span>
          </Flex>
          <Flex align="center" gap={1}>
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                backgroundColor: sourceColors.manual.bg,
                borderRadius: 2,
              }}
            />
            <span>手动</span>
          </Flex>
        </Flex>
      )}
    </Stack>
  );
}
