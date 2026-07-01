import { PageContainer } from "@/components/layout/page-container";

export default function KnowledgePage() {
  return (
    <PageContainer className="py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold">科普中心</h1>
        <p className="mt-4 text-lg text-muted-foreground">Knowledge Page</p>
        <p className="mt-2 text-sm text-muted-foreground">此页面将展示科普文章</p>
      </div>
    </PageContainer>
  );
}
