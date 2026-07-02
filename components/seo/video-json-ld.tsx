/**
 * VideoObject JSON-LD
 *
 * 视频详情页输出 VideoObject JSON-LD。
 */

import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

interface VideoJsonLdProps {
  name: string;
  description?: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
  url: string;
}

/** 尝试将 mm:ss 或 hh:mm:ss 转换为 ISO 8601 Duration */
function toIsoDuration(duration?: string): string | undefined {
  if (!duration) return undefined;
  const parts = duration.split(":").map(Number);
  if (parts.length === 2) {
    const [min, sec] = parts;
    return `PT${min}M${sec}S`;
  }
  if (parts.length === 3) {
    const [hour, min, sec] = parts;
    return `PT${hour}H${min}M${sec}S`;
  }
  return undefined;
}

export function VideoJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  url,
}: VideoJsonLdProps) {
  const siteUrl = getSiteUrl();
  const isoDuration = toIsoDuration(duration);

  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    ...(description && { description }),
    ...(thumbnailUrl && { thumbnailUrl }),
    ...(uploadDate && { uploadDate }),
    ...(isoDuration && { duration: isoDuration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    url: url.startsWith("http") ? url : `${siteUrl}${url}`,
  };

  return <JsonLd data={data} />;
}
