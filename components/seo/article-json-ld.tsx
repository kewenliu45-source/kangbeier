/**
 * Article JSON-LD
 *
 * 文章详情页输出 Article JSON-LD。
 */

import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

interface ArticleJsonLdProps {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  url: string;
}

export function ArticleJsonLd({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
}: ArticleJsonLdProps) {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(description && { description }),
    ...(image && { image }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: {
      "@type": "Organization",
      name: author || "好孕生命中心",
    },
    publisher: {
      "@type": "Organization",
      name: "好孕生命中心",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${siteUrl}${url}`,
    },
  };

  return <JsonLd data={data} />;
}
