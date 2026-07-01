import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Mail,
} from "lucide-react";
import { fetchContactPageData } from "@/sanity/lib/fetchers";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { cn } from "@/lib/utils";

const fallbackContact = {
  phone: "155-2728-3220",
  wechatId: "请通过公众号或电话咨询",
  businessHours: "每日 9:00-21:00",
  consultationNotice:
    "先了解您的情况，再给出适合的路径建议。",
};

export default async function ContactPage() {
  const data = await fetchContactPageData();
  const contact = data.contactInfo;

  const phone = contact?.phone || fallbackContact.phone;
  const wechatId = contact?.wechatId || fallbackContact.wechatId;
  const businessHours = contact?.businessHours || fallbackContact.businessHours;
  const consultationNotice =
    contact?.consultationNotice || fallbackContact.consultationNotice;

  const faqs =
    data.faqs?.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })) || [];

  return (
    <main>
      {/* 面包屑 */}
      <PageContainer className="pt-4 pb-0">
        <Breadcrumbs items={[{ label: "联系我们" }]} />
      </PageContainer>

      {/* 页面 Hero */}
      <section className="bg-brand-cream pt-8 pb-12 lg:pt-12 lg:pb-16">
        <PageContainer>
          <SectionHeader
            eyebrow="联系我们"
            title="先沟通情况，再判断下一步"
            description="如果您正在经历高龄备孕、试管多次失败、二胎规划或特殊生育需求，可以先做一次初步咨询。"
            align="center"
          />
        </PageContainer>
      </section>

      {/* 联系方式卡片 */}
      <section className="py-12 lg:py-16 bg-white">
        <PageContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 电话 */}
            <a
              href={`tel:${phone?.replace(/-/g, "")}`}
              className="group bg-brand-cream rounded-[20px] p-6 border border-border/50 text-center hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-1">电话咨询</h3>
              <p className="text-sm text-muted-foreground">{phone}</p>
              <p className="mt-2 text-xs text-accent font-medium">点击拨打</p>
            </a>

            {/* 微信 */}
            <div className="bg-brand-cream rounded-[20px] p-6 border border-border/50 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-1">微信咨询</h3>
              <p className="text-sm text-muted-foreground">{wechatId}</p>
            </div>

            {/* 营业时间 */}
            <div className="bg-brand-cream rounded-[20px] p-6 border border-border/50 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-1">营业时间</h3>
              <p className="text-sm text-muted-foreground">{businessHours}</p>
            </div>

            {/* 地址/邮箱 */}
            <div className="bg-brand-cream rounded-[20px] p-6 border border-border/50 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                {contact?.address ? (
                  <MapPin className="w-5 h-5 text-primary" />
                ) : (
                  <Mail className="w-5 h-5 text-primary" />
                )}
              </div>
              <h3 className="font-bold text-primary mb-1">
                {contact?.address ? "地址" : "邮箱"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {contact?.address || contact?.email || "咨询后获取详细地址"}
              </p>
              {contact?.mapUrl && (
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-accent font-medium"
                >
                  查看地图
                </a>
              )}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 咨询说明区 */}
      <section className="py-12 lg:py-16 bg-brand-cream">
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
              咨询说明
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {consultationNotice}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* 表单占位区 */}
      <section className="py-12 lg:py-16 bg-white">
        <PageContainer>
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-brand-cream rounded-2xl p-8 border border-border/50">
              <h3 className="text-lg font-bold text-primary mb-2">
                咨询表单即将开放
              </h3>
              <p className="text-sm text-muted-foreground">
                当前可通过电话或公众号先联系
              </p>
              <a
                href={`tel:${phone?.replace(/-/g, "")}`}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>电话咨询</span>
              </a>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
