"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import type { SiteSettings, ContactInfo } from "@/types/sanity";

const fallbackNavItems = [
  { label: "首页", href: "/" },
  { label: "服务项目", href: "/services" },
  { label: "选择我们", href: "/advantages" },
  { label: "科普中心", href: "/knowledge" },
  { label: "联系我们", href: "/contact" },
];

interface MobileNavProps {
  siteSettings?: SiteSettings | null;
  contactInfo?: ContactInfo | null;
}

export function MobileNav({ siteSettings, contactInfo }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // 字段优先级
  const brandName =
    siteSettings?.brandName || siteSettings?.siteName || "好孕生命中心";
  const phone =
    contactInfo?.phone || siteSettings?.primaryPhone || "155-2728-3220";
  const wechatId =
    contactInfo?.wechatId || siteSettings?.primaryWechat || "15527283220";
  const telHref = `tel:${phone.replace(/[\s-]/g, "")}`;

  // 导航：优先用 Sanity 数据
  const navItems =
    siteSettings?.headerNavigation && siteSettings.headerNavigation.length > 0
      ? siteSettings.headerNavigation
      : fallbackNavItems;

  // 微信二维码
  const wechatQrCode =
    contactInfo?.wechatQrCode || siteSettings?.wechatQrCode;

  const handleClose = () => setOpen(false);

  return (
    <div className="lg:hidden">
      {/* 触发按钮 */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center justify-center",
          "w-10 h-10 rounded-lg",
          "text-primary hover:bg-primary/5 transition-colors"
        )}
        aria-label="打开菜单"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* 遮罩层 */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {/* 侧边面板 */}
      <div
        className={cn(
          "fixed top-0 right-0 z-[101] h-full w-[280px] max-w-[85vw]",
          "bg-brand-cream shadow-2xl",
          "transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* 面板头部 */}
        <div className="flex items-center justify-between px-6 h-[80px] border-b border-border">
          <Link
            href="/"
            onClick={handleClose}
            className="text-lg font-bold text-primary"
          >
            {brandName}
          </Link>
          <button
            type="button"
            onClick={handleClose}
            className={cn(
              "flex items-center justify-center",
              "w-9 h-9 rounded-lg",
              "text-primary hover:bg-primary/5 transition-colors"
            )}
            aria-label="关闭菜单"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 导航链接 */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleClose}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* 公众号二维码区域 */}
          <div className="mt-6 px-4">
            <div
              className={cn(
                "p-4 rounded-2xl",
                "bg-white border border-border"
              )}
            >
              <p className="text-sm font-semibold text-primary mb-1">
                添加微信
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                获取试管科普与咨询提醒
              </p>
              {wechatQrCode ? (
                <div className="w-full aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={urlForImage(wechatQrCode as unknown as Parameters<typeof urlForImage>[0]).width(400).url()}
                    alt="公众号二维码"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </nav>

        {/* 底部操作区 */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-border bg-brand-cream">
          <a
            href={telHref}
            className={cn(
              "flex items-center justify-center gap-2 w-full mb-3",
              "text-sm font-semibold text-accent-foreground transition-colors hover:text-accent"
            )}
          >
            <Phone className="h-4 w-4 text-accent" />
            <span>{phone}</span>
          </a>
          <Link href="/contact" onClick={handleClose}>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-sm font-semibold">
              免费咨询方案
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
