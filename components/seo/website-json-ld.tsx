/**
 * WebSite JSON-LD
 *
 * 首页输出 WebSite 结构化数据。
 */

import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

interface WebSiteJsonLdProps {
  name?: string;
  description?: string;
}

export function WebSiteJsonLd({
  name = "好孕生命中心",
  description,
}: WebSiteJsonLdProps) {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: siteUrl,
    ...(description && { description }),
  };

  return <JsonLd data={data} />;
}
