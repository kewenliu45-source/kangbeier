"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/layout/mobile-nav";
import { urlForImage } from "@/sanity/lib/image";
import type { SiteSettings, ContactInfo, LayoutConfig } from "@/types/sanity";

const fallbackNavItems = [
  { label: "服务项目", href: "/services" },
  { label: "选择我们", href: "/advantages" },
  { label: "服务流程", href: "/#process" },
  { label: "成功案例", href: "/#cases" },
  { label: "科普中心", href: "/knowledge" },
  { label: "联系我们", href: "/contact" },
];

interface HeaderProps {
  siteSettings?: SiteSettings | null;
  contactInfo?: ContactInfo | null;
  layoutConfig?: LayoutConfig | null;
}

export function Header({ siteSettings, contactInfo, layoutConfig }: HeaderProps) {
  const [showQr, setShowQr] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 字段优先级
  const brandName =
    siteSettings?.brandName || siteSettings?.siteName || "好孕生命中心";
  const phone =
    contactInfo?.phone || siteSettings?.primaryPhone || "155-2728-3220";
  const telHref = `tel:${phone.replace(/[\s-]/g, "")}`;

  // 导航：优先用 Sanity 数据
  const navItems =
    siteSettings?.headerNavigation && siteSettings.headerNavigation.length > 0
      ? siteSettings.headerNavigation
      : fallbackNavItems;

  // Logo 图片
  const logoImage = siteSettings?.logo?.image;

  // 微信二维码
  const wechatQrCode =
    contactInfo?.wechatQrCode || siteSettings?.wechatQrCode;

  // 配置文字
  const wechatConsultText = layoutConfig?.wechatConsultText || "微信咨询";
  const wechatModalTitle = layoutConfig?.wechatModalTitle || "添加微信";
  const wechatModalDescription = layoutConfig?.wechatModalDescription || "获取试管科普与咨询提醒";
  const wechatQrPlaceholder = layoutConfig?.wechatQrPlaceholder || "公众号二维码";

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
        "bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80",
        "border-b border-border"
      )}
    >
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
        {/* 品牌名 / Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logoImage && (
            <Image
              src={urlForImage(logoImage as unknown as Parameters<typeof urlForImage>[0]).width(300).url()}
              alt={siteSettings?.logo?.alt || brandName}
              width={80}
              height={80}
              className="h-16 lg:h-20 w-auto"
              priority
            />
          )}
          <span className="text-lg lg:text-xl font-bold text-primary tracking-wide">
            {brandName}
          </span>
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-[#4B5563] transition-colors duration-200",
                "hover:text-primary"
              )}
              {...(("openInNewTab" in item && item.openInNewTab)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
            </Link>
          ))}

          {/* 微信咨询 */}
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
                "text-sm font-medium text-[#4B5563] transition-colors duration-200",
                "hover:text-primary focus:text-primary"
              )}
            >
              {wechatConsultText}
            </button>

            {/* 二维码浮层 */}
            {showQr && (
              <div
                className={cn(
                  "absolute top-full right-0 mt-2 z-50",
                  "w-[220px] p-4 rounded-xl",
                  "bg-white border border-border shadow-lg"
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <p className="text-sm font-semibold text-foreground mb-1">
                  {wechatModalTitle}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  {wechatModalDescription}
                </p>
                {wechatQrCode ? (
                  <div className="w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={urlForImage(wechatQrCode as unknown as Parameters<typeof urlForImage>[0]).width(400).url()}
                      alt={wechatQrPlaceholder}
                      width={400}
                      height={400}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "w-full aspect-square rounded-lg",
                      "bg-muted border border-border",
                      "flex flex-col items-center justify-center gap-2"
                    )}
                  >
                    <QrCode className="w-10 h-10 text-muted-foreground/20" />
                    <span className="text-xs text-muted-foreground/50">
                      {wechatQrPlaceholder}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* 右侧电话 + 移动端菜单 */}
        <div className="flex items-center gap-4">
          <a
            href={telHref}
            className={cn(
              "hidden sm:flex items-center gap-2",
              "text-sm font-medium text-[#168A94] transition-colors hover:text-[#168A94]/80"
            )}
          >
            <Phone className="h-4 w-4" />
            <span>{phone}</span>
          </a>

          {/* 移动端导航 */}
          <MobileNav siteSettings={siteSettings} contactInfo={contactInfo} />
        </div>
      </div>
    </header>
  );
}
