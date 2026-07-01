"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Phone, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/layout/mobile-nav";

const navItems = [
  { label: "服务项目", href: "/services" },
  { label: "选择我们", href: "/advantages" },
  { label: "服务流程", href: "/#process" },
  { label: "成功案例", href: "/#cases" },
  { label: "科普中心", href: "/knowledge" },
  { label: "联系我们", href: "/contact" },
];

export function Header() {
  const [showQr, setShowQr] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 点击外部关闭
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (qrRef.current && !qrRef.current.contains(event.target as Node)) {
        setShowQr(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowQr(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowQr(false), 200);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-brand-cream/95 backdrop-blur-md supports-[backdrop-filter]:bg-brand-cream/80",
        "border-b border-border"
      )}
    >
      <div className="container mx-auto flex h-[80px] items-center justify-between px-4 lg:px-8">
        {/* 品牌名 */}
        <Link
          href="/"
          className="text-xl lg:text-2xl font-bold text-primary tracking-wide"
        >
          好孕生命中心
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors duration-200",
                "hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* 微信公众号 */}
          <div
            ref={qrRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              onFocus={() => setShowQr(true)}
              onBlur={() => {
                timeoutRef.current = setTimeout(() => setShowQr(false), 200);
              }}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors duration-200",
                "hover:text-primary focus:text-primary"
              )}
            >
              微信公众号
            </button>

            {/* 二维码浮层 */}
            {showQr && (
              <div
                className={cn(
                  "absolute top-full right-0 mt-2 z-50",
                  "w-[220px] p-4 rounded-2xl",
                  "bg-white border border-border shadow-lg"
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <p className="text-sm font-semibold text-primary mb-1">
                  关注公众号
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  获取试管科普与咨询提醒
                </p>
                <div
                  className={cn(
                    "w-full aspect-square rounded-xl",
                    "bg-brand-cream-light border border-border",
                    "flex flex-col items-center justify-center gap-2"
                  )}
                >
                  <QrCode className="w-10 h-10 text-primary/30" />
                  <span className="text-xs text-muted-foreground/60">
                    公众号二维码
                  </span>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* 右侧电话 + 移动端菜单 */}
        <div className="flex items-center gap-4">
          <a
            href="tel:15527283220"
            className={cn(
              "hidden sm:flex items-center gap-2",
              "text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            )}
          >
            <Phone className="h-4 w-4" />
            <span>155-2728-3220</span>
          </a>

          {/* 移动端导航 */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
