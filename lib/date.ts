const ZH_CN_DATE_FORMAT = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

export function formatChineseDate(date: string | Date): string {
  return ZH_CN_DATE_FORMAT.format(new Date(date));
}
