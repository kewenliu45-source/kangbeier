import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  /** 显示文字 */
  label: string;
  /** 链接地址，最后一项可不传 */
  href?: string;
}

interface BreadcrumbsProps {
  /** 面包屑列表，首页会自动添加 */
  items: BreadcrumbItem[];
  /** 自定义 className */
  className?: string;
}

/**
 * 面包屑导航组件
 * 用于内页定位和 SEO。
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  // 构建完整列表（自动添加首页）
  const allItems: BreadcrumbItem[] = [
    { label: "首页", href: "/" },
    ...items,
  ];

  return (
    <nav
      aria-label="面包屑导航"
      className={cn("py-3", className)}
    >
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {/* 分隔符 */}
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" />
              )}

              {/* 链接或文字 */}
              {isLast || !item.href ? (
                <span
                  className={cn(
                    "text-xs sm:text-sm",
                    isLast
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-xs sm:text-sm text-muted-foreground transition-colors duration-200",
                    "hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
