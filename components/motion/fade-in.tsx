"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** 延迟（秒） */
  delay?: number;
  /** 动画时长（秒） */
  duration?: number;
  /** Y 轴偏移量（px），0 表示纯淡入 */
  y?: number;
  /** 是否仅在首次进入视口时触发 */
  once?: boolean;
}

/**
 * 轻量淡入包裹组件
 * - 尊重 prefers-reduced-motion
 * - 移动端自动减半位移
 * - 默认从下方 24px 淡入
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 24,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
