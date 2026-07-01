import { PageContainer } from "@/components/layout/page-container";

export default function ServicesPage() {
  return (
    <PageContainer className="py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold">服务项目</h1>
        <p className="mt-4 text-lg text-muted-foreground">Services Page</p>
        <p className="mt-2 text-sm text-muted-foreground">此页面将展示各项服务内容</p>
      </div>
    </PageContainer>
  );
}
