import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { PageContainer } from "@/components/shared/page-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="bg-brand-cream min-h-[60vh] flex items-center">
      <PageContainer className="py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          {/* 404 数字 */}
          <p className="text-7xl sm:text-8xl font-bold text-primary/20 mb-4">
            404
          </p>

          {/* 标题 */}
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            页面没有找到
          </h1>

          {/* 描述 */}
          <p className="text-muted-foreground leading-relaxed mb-8">
            您访问的内容可能已调整，建议返回首页或联系顾问获取帮助。
          </p>

          {/* 按钮 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button
                className={cn(
                  "h-12 px-8 rounded-full text-sm font-semibold",
                  "bg-primary text-primary-foreground",
                  "hover:bg-primary/90 transition-colors"
                )}
              >
                <Home className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className={cn(
                  "h-12 px-8 rounded-full text-sm font-semibold",
                  "border-accent text-accent-foreground",
                  "hover:bg-accent hover:text-accent-foreground",
                  "transition-colors"
                )}
              >
                <Phone className="w-4 h-4 mr-2" />
                联系我们
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
