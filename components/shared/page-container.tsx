import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /** 是否使用全宽背景（内部内容仍限制宽度） */
  fullWidth?: boolean;
}

/**
 * 页面宽度容器
 * 控制最大宽度和响应式 padding，后续所有页面区块统一使用。
 */
export function PageContainer({
  children,
  className,
  fullWidth = false,
}: PageContainerProps) {
  if (fullWidth) {
    return (
      <div className={cn("w-full", className)}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
