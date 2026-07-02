import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/page-container";
import { FadeIn } from "@/components/motion/fade-in";

interface TrustItem {
  number: string;
  label: string;
}

interface TrustBarProps {
  items?: TrustItem[];
  className?: string;
}

const fallbackItems: TrustItem[] = [
  { number: "13年+", label: "行业经验" },
  { number: "3000+", label: "服务家庭" },
  { number: "1对1", label: "专属顾问" },
  { number: "隐私", label: "全程保护" },
];

/**
 * 信任背书区块
 * 在 Hero 下方展示核心信任数字或服务承诺。
 */
export function TrustBar({ items = fallbackItems, className }: TrustBarProps) {
  return (
    <section className={cn("py-12 lg:py-16 bg-brand-cream", className)}>
      <PageContainer>
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "bg-white rounded-2xl p-5 sm:p-6",
                  "border border-border/50 shadow-sm",
                  "text-center"
                )}
              >
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  {item.number}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </PageContainer>
    </section>
  );
}
