import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { fetchLayoutData } from "@/sanity/lib/fetchers";
import { setSiteName, getSiteUrl, getDefaultOgImage } from "@/lib/metadata";
import { urlForImage } from "@/sanity/lib/image";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await fetchLayoutData();

  const siteName = siteSettings?.siteName || "康贝儿";
  const description = siteSettings?.description || "康贝儿项目";

  // 生成 favicon URL
  let faviconUrl: string | undefined;
  if (siteSettings?.favicon?.asset) {
    try {
      faviconUrl = urlForImage(
        siteSettings.favicon as unknown as Parameters<typeof urlForImage>[0]
      )
        .width(64)
        .height(64)
        .url();
    } catch {
      // 忽略错误，使用默认
    }
  }

  const siteUrl = getSiteUrl();
  const ogImage = getDefaultOgImage();

  return {
    title: siteName,
    description,
    icons: faviconUrl
      ? {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        }
      : undefined,
    openGraph: {
      title: siteName,
      description,
      url: siteUrl,
      siteName,
      type: "website" as const,
      locale: "zh_CN",
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: siteName,
      description,
      images: [ogImage],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteSettings, contactInfo, layoutConfig } = await fetchLayoutData();

  // 更新全局站点名称（用于 metadata 标题后缀）
  if (siteSettings?.siteName) {
    setSiteName(siteSettings.siteName);
  }

  // 字段优先级
  const brandName =
    siteSettings?.brandName || siteSettings?.siteName || "好孕生命中心";
  const phone =
    contactInfo?.phone || siteSettings?.primaryPhone || "155-2728-3220";

  return (
    <html lang="zh-CN" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col">
        <OrganizationJsonLd
          name={brandName}
          description={
            siteSettings?.description ||
            "为高龄、二胎、试管多次失败及特殊生育需求家庭，提供一对一助孕咨询、方案评估和全程陪伴服务。"
          }
          phone={phone}
        />
        <Header siteSettings={siteSettings} contactInfo={contactInfo} layoutConfig={layoutConfig} />
        <div className="flex-1">{children}</div>
        <Footer siteSettings={siteSettings} contactInfo={contactInfo} layoutConfig={layoutConfig} />
        <FloatingContact siteSettings={siteSettings} contactInfo={contactInfo} layoutConfig={layoutConfig} />
        {/* 移动端底部安全区 padding */}
        <div className="lg:hidden h-[72px]" />
      </body>
    </html>
  );
}
