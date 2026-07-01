import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";

export default function Home() {
  return (
    <PageContainer className="flex flex-col items-center justify-center gap-6 py-24">
      <h1 className="text-4xl font-bold">康贝儿</h1>
      <p className="text-lg text-muted-foreground">Shadcn UI 配置成功</p>
      <div className="flex gap-4">
        <Button>默认按钮</Button>
        <Button variant="outline">轮廓按钮</Button>
        <Button variant="secondary">次要按钮</Button>
        <Button variant="ghost">幽灵按钮</Button>
      </div>
    </PageContainer>
  );
}
