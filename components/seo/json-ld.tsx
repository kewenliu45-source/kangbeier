/**
 * JSON-LD 结构化数据基础组件
 *
 * 安全输出 JSON-LD，过滤 undefined 值。
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

/** 过滤 undefined 值 */
function cleanObject(obj: unknown): unknown {
  if (obj === null || obj === undefined) return undefined;
  if (Array.isArray(obj)) {
    const cleaned = obj.map(cleanObject).filter((v) => v !== undefined);
    return cleaned.length > 0 ? cleaned : undefined;
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>)
      .map(([key, value]) => [key, cleanObject(value)])
      .filter(([, value]) => value !== undefined);
    return entries.length > 0 ? Object.fromEntries(entries) : undefined;
  }
  return obj;
}

export function JsonLd({ data }: JsonLdProps) {
  const cleaned = cleanObject(data);
  if (!cleaned) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleaned, null, 0),
      }}
    />
  );
}
