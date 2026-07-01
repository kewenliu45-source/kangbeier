"use client";

import { Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function FloatingContact() {
  return (
    <>
      {/* 桌面端：右侧浮动按钮组 */}
      <div
        className={cn(
          "hidden lg:flex fixed right-6 bottom-24 z-40",
          "flex-col items-center gap-3"
        )}
      >
        {/* 微信咨询 */}
        <a
          href="#"
          className={cn(
            "flex items-center justify-center",
            "w-12 h-12 rounded-full shadow-lg",
            "bg-white border border-border",
            "text-primary hover:text-accent hover:border-accent",
            "transition-all duration-200 hover:scale-105"
          )}
          aria-label="微信咨询"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* 电话咨询 */}
        <a
          href="tel:15527283220"
          className={cn(
            "flex items-center justify-center",
            "w-12 h-12 rounded-full shadow-lg",
            "bg-accent text-accent-foreground",
            "hover:bg-accent/90 transition-all duration-200 hover:scale-105"
          )}
          aria-label="电话咨询"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* 移动端：底部固定咨询条 */}
      <div
        className={cn(
          "lg:hidden fixed bottom-0 left-0 right-0 z-40",
          "bg-white/95 backdrop-blur-md border-t border-border",
          "px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        )}
      >
        <div className="flex items-center gap-3">
          {/* 电话沟通 */}
          <a
            href="tel:15527283220"
            className={cn(
              "flex items-center justify-center gap-2",
              "flex-1 h-11 rounded-lg",
              "bg-accent text-accent-foreground",
              "text-sm font-semibold",
              "hover:bg-accent/90 transition-colors"
            )}
          >
            <Phone className="w-4 h-4" />
            <span>电话沟通</span>
          </a>

          {/* 免费咨询方案 */}
          <Button
            className={cn(
              "flex-1 h-11 rounded-lg",
              "bg-primary text-primary-foreground",
              "text-sm font-semibold",
              "hover:bg-primary/90"
            )}
          >
            免费咨询方案
          </Button>
        </div>
      </div>
    </>
  );
}
