import { Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { VideoCard } from "@/components/cards/video-card";
import { FadeIn } from "@/components/motion/fade-in";
import type { Video } from "@/types/sanity";

interface VideoSectionProps {
  videos?: Video[];
  className?: string;
}

const fallbackVideos: Video[] = [
  {
    _id: "fallback-1",
    _type: "video",
    title: "试管婴儿的完整流程是怎样的？",
    slug: { current: "ivf-process-overview", _type: "slug" },
    summary: "用5分钟了解试管婴儿从检查到移植的完整流程。",
    duration: "05:12",
    category: {
      _id: "cat-1",
      _type: "articleCategory",
      title: "试管基础知识",
      slug: { current: "ivf-basics", _type: "slug" },
    },
  },
  {
    _id: "fallback-2",
    _type: "video",
    title: "高龄备孕需要注意什么？",
    slug: { current: "advanced-age-tips", _type: "slug" },
    summary: "35岁以上备孕的关键注意事项和建议。",
    duration: "04:35",
    category: {
      _id: "cat-2",
      _type: "articleCategory",
      title: "高龄备孕",
      slug: { current: "advanced-age", _type: "slug" },
    },
  },
  {
    _id: "fallback-3",
    _type: "video",
    title: "胚胎筛查技术解读",
    slug: { current: "embryo-screening-explained", _type: "slug" },
    summary: "了解PGS/PGD技术的原理和适用人群。",
    duration: "06:20",
    category: {
      _id: "cat-3",
      _type: "articleCategory",
      title: "胚胎筛查",
      slug: { current: "embryo-screening", _type: "slug" },
    },
  },
];

/**
 * 首页视频区块
 */
export function VideoSection({
  videos = fallbackVideos,
  className,
}: VideoSectionProps) {
  const displayVideos = videos && videos.length > 0 ? videos : fallbackVideos;

  return (
    <section className={cn("py-16 lg:py-24 bg-brand-cream-light", className)}>
      <PageContainer>
        <FadeIn>
          <SectionHeader
            eyebrow="Video Center"
            title="科普视频"
            description="通过视频快速了解辅助生殖知识"
            align="center"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {displayVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </FadeIn>

        {/* 空状态提示 */}
        {(!videos || videos.length === 0) && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Film className="w-4 h-4" />
              <span>更多视频内容正在整理中</span>
            </div>
          </div>
        )}
      </PageContainer>
    </section>
  );
}
