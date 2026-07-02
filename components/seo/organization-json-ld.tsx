/**
 * Organization JSON-LD
 *
 * 全站输出基础组织信息。
 * 使用 Organization 而非 MedicalOrganization，避免伪造医疗资质。
 */

import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

interface OrganizationJsonLdProps {
  name?: string;
  description?: string;
  phone?: string;
  logo?: string;
}

export function OrganizationJsonLd({
  name = "好孕生命中心",
  description,
  phone,
  logo,
}: OrganizationJsonLdProps) {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: siteUrl,
    ...(description && { description }),
    ...(logo && { logo }),
    ...(phone && {
      contactPoint: {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        availableLanguage: "Chinese",
      },
    }),
  };

  return <JsonLd data={data} />;
}
