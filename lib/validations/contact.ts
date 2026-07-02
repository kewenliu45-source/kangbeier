import { z } from "zod";

export const consultationFormSchema = z.object({
  name: z
    .string()
    .min(2, "姓名至少 2 个字符")
    .max(20, "姓名最多 20 个字符"),
  phone: z
    .string()
    .min(1, "请输入手机号")
    .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
  age: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === "") return true;
        const num = Number(val);
        return !isNaN(num) && num >= 18 && num <= 60;
      },
      { message: "年龄应为 18-60 之间的数字" }
    ),
  city: z.string().max(30, "城市名最多 30 个字符").optional(),
  consultationType: z.string().min(1, "请选择咨询项目"),
  message: z.string().max(500, "备注最多 500 个字符").optional(),
});

export type ConsultationFormData = z.infer<typeof consultationFormSchema>;

export const consultationTypeOptions = [
  { label: "第三代试管咨询", value: "ivf-consultation" },
  { label: "试管前评估", value: "pre-ivf-assessment" },
  { label: "高龄备孕", value: "advanced-age" },
  { label: "胚胎筛查", value: "embryo-screening" },
  { label: "多次失败方案", value: "repeated-failure" },
  { label: "其他", value: "other" },
];
