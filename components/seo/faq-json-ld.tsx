/**
 * FAQPage JSON-LD
 *
 * 含 FAQ 的页面输出 FAQPage JSON-LD。
 * 只在 FAQ 数组非空时输出。
 */

import { JsonLd } from "./json-ld";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqJsonLdProps {
  faqs: FaqItem[];
}

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  // 过滤空问题或空答案
  const validFaqs = faqs.filter(
    (faq) => faq.question?.trim() && faq.answer?.trim()
  );

  if (validFaqs.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.trim(),
      },
    })),
  };

  return <JsonLd data={data} />;
}
