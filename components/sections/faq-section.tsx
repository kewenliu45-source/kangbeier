"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  /** FAQ 列表 */
  faqs?: FaqItem[];
  /** 区块标题 */
  title?: string;
  /** 区块描述 */
  description?: string;
  /** 小标题 */
  eyebrow?: string;
  /** 自定义 className */
  className?: string;
}

const defaultProps = {
  title: "常见问题",
  description: "以下是客户最常咨询的问题，如有其他疑问欢迎联系我们。",
  eyebrow: "FAQ",
};

/**
 * 单个 FAQ 折叠项
 */
function FaqItemComponent({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex items-center justify-between w-full py-5 px-6",
          "text-left transition-colors",
          "hover:bg-brand-cream-light/50"
        )}
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-sm sm:text-base font-semibold pr-4",
            isOpen ? "text-primary" : "text-foreground"
          )}
        >
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 flex-shrink-0 text-accent transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
          {answer}
        </p>
      </div>
    </div>
  );
}

/**
 * 可复用 FAQ 展示区块
 * 用于首页、服务详情页、科普页、联系页等位置。
 */
export function FaqSection({
  faqs = [],
  title = defaultProps.title,
  description = defaultProps.description,
  eyebrow = defaultProps.eyebrow,
  className,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 空数据时不渲染
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section
      className={cn("py-16 lg:py-24 bg-brand-cream", className)}
    >
      <PageContainer>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />

        <div
          className={cn(
            "max-w-3xl mx-auto",
            "bg-white rounded-2xl border border-border shadow-sm",
            "overflow-hidden"
          )}
        >
          {faqs.map((faq, index) => (
            <FaqItemComponent
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
