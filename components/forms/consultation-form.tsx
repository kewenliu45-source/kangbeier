"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, Phone, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  consultationFormSchema,
  consultationTypeOptions,
  type ConsultationFormData,
} from "@/lib/validations/contact";

interface ConsultationFormProps {
  className?: string;
}

export function ConsultationForm({ className }: ConsultationFormProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      consultationType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 收集 UTM 参数
      const utmSource = searchParams.get("utm_source") || "";
      const utmMedium = searchParams.get("utm_medium") || "";
      const utmCampaign = searchParams.get("utm_campaign") || "";

      const payload = {
        ...data,
        age: data.age ? Number(data.age) : undefined,
        sourcePage: pathname,
        utmSource,
        utmMedium,
        utmCampaign,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        reset();
      } else if (response.status === 429) {
        setErrorMessage(result.message || "提交过于频繁，请稍后再试");
      } else {
        setErrorMessage(result.message || "提交失败，请稍后重试或电话联系我们");
      }
    } catch {
      setErrorMessage("网络异常，请稍后重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className={cn(
          "bg-white rounded-2xl p-8 border border-border/50 shadow-sm text-center",
          className
        )}
      >
        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-bold text-primary mb-2">
          已收到您的咨询信息
        </h3>
        <p className="text-muted-foreground mb-4">
          我们会尽快与您联系，也可以直接拨打电话沟通。
        </p>
        <a
          href="tel:15527283220"
          className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Phone className="w-4 h-4" />
          155-2728-3220
        </a>
        <div>
          <Button
            variant="outline"
            className="border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsSubmitted(false)}
          >
            继续咨询
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-6 sm:p-8 border border-border/50 shadow-sm",
        className
      )}
    >
      <h3 className="text-xl font-bold text-primary mb-6">预约咨询</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 姓名 */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            姓名 <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="请输入您的姓名"
            className={cn(
              "w-full h-11 px-4 rounded-lg border bg-background text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "transition-colors",
              errors.name ? "border-destructive" : "border-border"
            )}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* 手机号 */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            手机号 <span className="text-destructive">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="请输入手机号"
            className={cn(
              "w-full h-11 px-4 rounded-lg border bg-background text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "transition-colors",
              errors.phone ? "border-destructive" : "border-border"
            )}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* 年龄 + 城市 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              年龄
            </label>
            <input
              id="age"
              type="number"
              placeholder="选填"
              className={cn(
                "w-full h-11 px-4 rounded-lg border bg-background text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                "transition-colors",
                errors.age ? "border-destructive" : "border-border"
              )}
              {...register("age")}
            />
            {errors.age && (
              <p className="mt-1 text-xs text-destructive">
                {errors.age.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              所在城市
            </label>
            <input
              id="city"
              type="text"
              placeholder="选填"
              className={cn(
                "w-full h-11 px-4 rounded-lg border bg-background text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                "transition-colors",
                errors.city ? "border-destructive" : "border-border"
              )}
              {...register("city")}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-destructive">
                {errors.city.message}
              </p>
            )}
          </div>
        </div>

        {/* 咨询项目 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            咨询项目 <span className="text-destructive">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {consultationTypeOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer",
                  "text-sm transition-colors",
                  "hover:border-primary/30 hover:bg-brand-cream-light"
                )}
              >
                <input
                  type="radio"
                  value={option.value}
                  className="accent-primary"
                  {...register("consultationType")}
                />
                <span className="text-foreground">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.consultationType && (
            <p className="mt-1 text-xs text-destructive">
              {errors.consultationType.message}
            </p>
          )}
        </div>

        {/* 备注 */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            备注
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="请简要描述您的情况或需求（选填）"
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-background text-sm resize-none",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "transition-colors",
              errors.message ? "border-destructive" : "border-border"
            )}
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* 错误提示 */}
        {errorMessage && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
            <p className="text-sm text-destructive">{errorMessage}</p>
          </div>
        )}

        {/* 提交按钮 */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full h-12 rounded-lg text-sm font-semibold",
            "bg-primary text-primary-foreground",
            "hover:bg-primary/90 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              提交中...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              提交咨询
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          提交后顾问会在工作时间与您联系，您的信息将被严格保密
        </p>
      </form>
    </div>
  );
}
