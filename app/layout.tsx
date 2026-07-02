import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "康贝儿",
  description: "康贝儿项目",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col">
        <OrganizationJsonLd
          name="好孕生命中心"
          description="为高龄、二胎、试管多次失败及特殊生育需求家庭，提供一对一助孕咨询、方案评估和全程陪伴服务。"
          phone="155-2728-3220"
        />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <FloatingContact />
        {/* 移动端底部安全区 padding */}
        <div className="lg:hidden h-[72px]" />
      </body>
    </html>
  );
}
