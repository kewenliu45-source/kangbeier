/**
 * LocalBusiness JSON-LD
 *
 * 联系页输出保守的 LocalBusiness 数据。
 * 使用 LocalBusiness 而非 MedicalClinic，避免伪造医疗资质。
 */

import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

interface LocalBusinessJsonLdProps {
  name?: string;
  phone?: string;
  address?: string;
  openingHours?: string;
  image?: string;
}

export function LocalBusinessJsonLd({
  name = "好孕生命中心",
  phone,
  address,
  openingHours,
  image,
}: LocalBusinessJsonLdProps) {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url: siteUrl,
    ...(phone && { telephone: phone }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
      },
    }),
    ...(openingHours && { openingHours }),
    ...(image && { image }),
  };

  return <JsonLd data={data} />;
}
