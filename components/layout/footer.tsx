import Link from "next/link";
import { Phone, MessageCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "服务项目", href: "/services" },
  { label: "选择我们", href: "/advantages" },
  { label: "科普中心", href: "/knowledge" },
  { label: "联系我们", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* 品牌信息 */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold text-primary-foreground tracking-wide"
            >
              好孕生命中心
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
              专注高龄、二胎、试管多次失败及特殊生育需求家庭的一站式咨询服务。
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h3 className="text-sm font-semibold text-primary-foreground mb-4">
              快速导航
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm text-primary-foreground/70 transition-colors duration-200",
                      "hover:text-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-sm font-semibold text-primary-foreground mb-4">
              联系我们
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:15527283220"
                  className={cn(
                    "flex items-center gap-2 text-sm text-primary-foreground/70",
                    "transition-colors duration-200 hover:text-accent"
                  )}
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>155-2728-3220</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <MessageCircle className="h-4 w-4 flex-shrink-0" />
                  <span>微信：15527283220</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>周一至周日 9:00-18:00</span>
                </div>
              </li>
              <li className="pt-1">
                <p className="text-xs text-primary-foreground/50">
                  微信公众号：顶部导航扫码关注
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} 好孕生命中心 版权所有
            </p>
            <p className="text-xs text-primary-foreground/50">
              ICP 备案号占位
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
