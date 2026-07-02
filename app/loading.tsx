import { cn } from "@/lib/utils";

/**
 * 全局页面加载状态
 * 使用品牌色，轻量不闪烁
 */
export default function Loading() {
  return (
    <main className="bg-brand-cream min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        {/* 品牌色加载动画 */}
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div
            className={cn(
              "absolute inset-0 rounded-full border-2 border-muted",
              "border-t-primary animate-spin"
            )}
          />
        </div>
        <p className="text-sm text-muted-foreground">加载中...</p>
      </div>
    </main>
  );
}
