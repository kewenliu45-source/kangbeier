import { PageContainer } from "@/components/layout/page-container";

export default function ContactPage() {
  return (
    <PageContainer className="py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold">联系我们</h1>
        <p className="mt-4 text-lg text-muted-foreground">Contact Page</p>
        <p className="mt-2 text-sm text-muted-foreground">此页面将展示联系方式</p>
      </div>
    </PageContainer>
  );
}
