import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** 小标题/标签 */
  eyebrow?: string;
  /** 主标题 */
  title: string;
  /** 描述文字 */
  description?: string;
  /** 对齐方式 */
  align?: "left" | "center";
  /** 自定义 className */
  className?: string;
}

/**
 * 区块标题组件
 * 用于后续首页、服务页、优势页、科普页等页面区块统一标题样式。
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-7 lg:mb-9",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-xs font-semibold tracking-widest uppercase mb-3",
            "text-accent"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl lg:text-4xl font-bold",
          "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-sm sm:text-base leading-relaxed max-w-2xl",
            "text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
