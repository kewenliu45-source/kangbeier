import type { Metadata } from "next";
import { Suspense } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import {
  fetchConsultationFormConfig,
  fetchServiceBySlug,
  fetchServiceSlugs,
  fetchSiteSettings,
} from "@/sanity/lib/fetchers";
import { buildMetadata, getSanityOgImageUrl } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { urlForImage } from "@/sanity/lib/image";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-8 text-muted-foreground">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="pt-4 text-2xl font-bold text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-2 text-xl font-bold text-foreground">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 text-base leading-8 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-base leading-8 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const link = value as { href?: string; blank?: boolean } | undefined;
      const href = link?.href || "#";
      return (
        <a
          href={href}
          target={link?.blank ? "_blank" : undefined}
          rel={link?.blank ? "noopener noreferrer" : undefined}
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    imageWithAlt: ({ value }) => {
      const imageValue = value as {
        image?: Parameters<typeof urlForImage>[0];
        alt?: string;
        caption?: string;
      };

      if (!imageValue.image) return null;

      let imageUrl: string | null = null;
      try {
        imageUrl = urlForImage(imageValue.image).width(900).url();
      } catch {
        imageUrl = null;
      }

      if (!imageUrl) return null;

      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageValue.alt || ""}
            className="w-full rounded-2xl"
            loading="lazy"
          />
          {imageValue.caption && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              {imageValue.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

// 服务详情页在构建时按 Sanity slug 生成，避免静态部署环境下动态路由 404。
export const dynamicParams = false;

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
    return buildMetadata({
      title: "服务详情",
      description: "了解康贝儿助孕中心服务项目，并提交咨询表单获取一对一方案建议。",
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || service.summary,
    keywords: service.seo?.keywords,
    image:
      getSanityOgImageUrl(service.seo?.ogImage) ||
      getSanityOgImageUrl(service.coverImage?.image),
    path: `/services/${slug}`,
    noIndex: service.seo?.noIndex || false,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, siteSettings, consultationFormConfig] = await Promise.all([
    fetchServiceBySlug(slug),
    fetchSiteSettings(),
    fetchConsultationFormConfig(),
  ]);

  const serviceTitle = service?.title || "服务详情";
  const serviceSummary =
    service?.summary ||
    "我们会根据您的年龄、身体情况、过往经历和当前需求，提供更适合的助孕咨询建议。";

  const faqs =
    service?.faqs?.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })) || [];

  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "首页", url: "/" },
          { name: "服务项目", url: "/services" },
          { name: serviceTitle, url: `/services/${slug}` },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      {/* 面包屑 */}
      <PageContainer className="pt-4 pb-0">
        <Breadcrumbs
          items={[
            { label: "服务项目", href: "/services" },
            { label: serviceTitle },
          ]}
        />
      </PageContainer>

      {/* 服务详情 Hero */}
      <section className="bg-brand-cream pt-8 pb-12 lg:pt-12 lg:pb-16">
        <PageContainer>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {serviceTitle}
            </h1>
            {serviceSummary && (
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {serviceSummary}
              </p>
            )}
          </div>
        </PageContainer>
      </section>

      {service?.description && service.description.length > 0 && (
        <section className="py-12 lg:py-16 bg-white">
          <PageContainer>
            <div className="mx-auto max-w-3xl space-y-5">
              <PortableText
                value={service.description as unknown as PortableTextBlock[]}
                components={portableTextComponents}
              />
            </div>
          </PageContainer>
        </section>
      )}

      {/* 服务亮点 */}
      {service?.highlights && service.highlights.length > 0 && (
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
      {service?.suitableFor && service.suitableFor.length > 0 && (
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
      {service?.processSteps && service.processSteps.length > 0 && (
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
                    <h3 className="font-bold text-foreground">{step.title}</h3>
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
      {service?.advantages && service.advantages.length > 0 && (
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
                  <h3 className="font-bold text-foreground">{adv.title}</h3>
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

      {/* 鍜ㄨ琛ㄥ崟 */}
      <section id="form" className="py-12 lg:py-16 bg-white">
        <PageContainer>
          <div className="max-w-lg mx-auto">
            <Suspense fallback={<div className="text-center py-8">鍔犺浇涓?..</div>}>
              <ConsultationForm config={consultationFormConfig} />
            </Suspense>
          </div>
        </PageContainer>
      </section>

      {/* CTA */}
      <CtaSection siteSettings={siteSettings} />
    </main>
  );
}
