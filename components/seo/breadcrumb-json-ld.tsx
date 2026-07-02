/**
 * BreadcrumbList JSON-LD
 *
 * 内页输出面包屑结构化数据。
 */

import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const siteUrl = getSiteUrl();

  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    ...(item.url && {
      item: item.url.startsWith("http")
        ? item.url
        : `${siteUrl}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    }),
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return <JsonLd data={data} />;
}
