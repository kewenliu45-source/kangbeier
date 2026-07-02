import { NextResponse } from "next/server";
import { z } from "zod";

import { writeClient, assertWriteToken } from "@/sanity/lib/write-client";

// ── 服务端 Zod schema（与前端 schema 独立，age 为 number） ──

const apiSchema = z.object({
  name: z.string().min(2, "姓名至少 2 个字符").max(20, "姓名最多 20 个字符"),
  phone: z
    .string()
    .min(1, "请输入手机号")
    .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
  age: z.number().min(18).max(60).optional(),
  city: z.string().max(30).optional(),
  consultationType: z.enum(
    [
      "ivf-consultation",
      "pre-ivf-assessment",
      "advanced-age",
      "embryo-screening",
      "repeated-failure",
      "other",
    ],
    { message: "请选择咨询项目" }
  ),
  message: z.string().max(500).optional(),
  sourcePage: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

// ── 内存限流（按 phone + IP，60 秒内同一组合只允许提交一次） ──
// 注：serverless 环境下内存限流不是强保证，后续可升级到 Vercel KV / Upstash Redis

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 60 秒

function checkRateLimit(phone: string, ip: string): boolean {
  const now = Date.now();
  const key = `${phone}:${ip}`;
  const lastSubmit = rateLimitMap.get(key);

  if (lastSubmit && now - lastSubmit < RATE_LIMIT_WINDOW) {
    return false; // 被限流
  }

  rateLimitMap.set(key, now);

  // 简单清理：超过 100 条时清除过期条目，防止内存泄漏
  if (rateLimitMap.size > 100) {
    for (const [k, v] of rateLimitMap) {
      if (now - v > RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(k);
      }
    }
  }

  return true;
}

// ── POST handler ──

export async function POST(request: Request) {
  try {
    // 1. 检查 write token
    assertWriteToken();

    // 2. 解析请求体
    const body = await request.json();

    // 3. 服务端 Zod 校验
    const parsed = apiSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "提交失败，请稍后重试或电话联系我们" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 4. 限流检查
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(data.phone, ip)) {
      return NextResponse.json(
        { success: false, message: "提交过于频繁，请稍后再试" },
        { status: 429 }
      );
    }

    // 5. 写入 Sanity
    await writeClient.create({
      _type: "consultationLead",
      name: data.name,
      phone: data.phone,
      age: data.age,
      city: data.city || undefined,
      consultationType: data.consultationType,
      message: data.message || undefined,
      sourcePage: data.sourcePage || undefined,
      utmSource: data.utmSource || undefined,
      utmMedium: data.utmMedium || undefined,
      utmCampaign: data.utmCampaign || undefined,
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    return NextResponse.json({
      success: true,
      message: "提交成功，我们会尽快与您联系",
    });
  } catch (error) {
    // 区分配置错误和运行时错误
    if (error instanceof Error && error.message.includes("SANITY_API_WRITE_TOKEN")) {
      console.error("Sanity 写入配置错误:", error.message);
      return NextResponse.json(
        { success: false, message: "服务配置错误，请电话联系我们" },
        { status: 500 }
      );
    }

    console.error("咨询表单提交失败:", error);
    return NextResponse.json(
      { success: false, message: "提交失败，请稍后重试或电话联系我们" },
      { status: 500 }
    );
  }
}
