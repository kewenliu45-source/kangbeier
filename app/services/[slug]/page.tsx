import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchServiceBySlug, fetchServiceSlugs } from "@/sanity/lib/fetchers";
import { buildMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await fetchServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await fetchServiceBySlug(slug);

  if (!service) {
    return buildMetadata({ title: "服务未找到", noIndex: true });
  }

  return buildMetadata({
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || service.summary,
    keywords: service.seo?.keywords,
    path: `/services/${slug}`,
    noIndex: service.seo?.noIndex || false,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await fetchServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const faqs =
    service.faqs?.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })) || [];

  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "首页", url: "/" },
          { name: "服务项目", url: "/services" },
          { name: service.title, url: `/services/${slug}` },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      {/* 面包屑 */}
      <PageContainer className="pt-4 pb-0">
        <Breadcrumbs
          items={[
            { label: "服务项目", href: "/services" },
            { label: service.title },
          ]}
        />
      </PageContainer>

      {/* 服务详情 Hero */}
      <section className="bg-brand-cream pt-8 pb-12 lg:pt-12 lg:pb-16">
        <PageContainer>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              {service.title}
            </h1>
            {service.summary && (
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {service.summary}
              </p>
            )}
          </div>
        </PageContainer>
      </section>

      {/* 服务亮点 */}
      {service.highlights && service.highlights.length > 0 && (
        <section className="py-12 lg:py-16 bg-white">
          <PageContainer>
            <SectionHeader
              eyebrow="服务亮点"
              title="这项服务的核心特点"
              align="center"
            />
            <div className="flex flex-wrap justify-center gap-3">
              {service.highlights.map((tag, i) => (
                <span
                  key={i}
                  className="text-sm px-4 py-2 rounded-full bg-brand-green-light text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* 适合人群 */}
      {service.suitableFor && service.suitableFor.length > 0 && (
        <section className="py-12 lg:py-16 bg-brand-cream">
          <PageContainer>
            <SectionHeader
              eyebrow="适合人群"
              title="这项服务适合谁"
              align="center"
            />
            <div className="flex flex-wrap justify-center gap-3">
              {service.suitableFor.map((tag, i) => (
                <span
                  key={i}
                  className="text-sm px-4 py-2 rounded-full bg-accent/10 text-accent-foreground font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* 服务流程 */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-12 lg:py-16 bg-white">
          <PageContainer>
            <SectionHeader
              eyebrow="服务流程"
              title="从咨询到陪伴的完整路径"
              align="center"
            />
            <div className="max-w-3xl mx-auto space-y-6">
              {service.processSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 rounded-2xl bg-brand-cream border border-border/50"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{step.title}</h3>
                    {step.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* 服务优势 */}
      {service.advantages && service.advantages.length > 0 && (
        <section className="py-12 lg:py-16 bg-brand-cream">
          <PageContainer>
            <SectionHeader
              eyebrow="服务优势"
              title="选择这项服务的理由"
              align="center"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.advantages.map((adv, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm"
                >
                  <h3 className="font-bold text-primary">{adv.title}</h3>
                  {adv.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {adv.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
