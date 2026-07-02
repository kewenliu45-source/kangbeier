import Link from "next/link";
import Image from "next/image";
import { Play, Clock, Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import type { Video } from "@/types/sanity";

interface VideoCardProps {
  video: Video;
  className?: string;
}

/**
 * 视频内容卡片
 */
export function VideoCard({ video, className }: VideoCardProps) {
  const href = `/knowledge/videos/${video.slug?.current || ""}`;

  // 图片处理
  const hasImage = video.coverImage?.image?.asset;
  let imageUrl: string | null = null;
  if (hasImage && video.coverImage?.image) {
    try {
      imageUrl = urlForImage(
        video.coverImage.image as unknown as Parameters<typeof urlForImage>[0]
      )
        .width(600)
        .height(340)
        .url();
    } catch {
      imageUrl = null;
    }
  }

  return (
    <Link
      href={href}
      className={cn(
        "group block bg-white rounded-2xl overflow-hidden",
        "border border-border/50 shadow-sm",
        "transition-all duration-200",
        "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        className
      )}
    >
      {/* 封面图 */}
      <div className="relative aspect-video bg-brand-cream-light">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={video.coverImage?.alt || video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <Film className="w-5 h-5 text-primary/40" />
              </div>
              <p className="text-xs text-muted-foreground/60">视频内容</p>
            </div>
          </div>
        )}

        {/* 播放图标 */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-black/0 group-hover:bg-black/10 transition-colors"
          )}
        >
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center",
              "bg-white/90 shadow-lg",
              "transform group-hover:scale-110 transition-transform"
            )}
          >
            <Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" />
          </div>
        </div>

        {/* 时长标签 */}
        {video.duration && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-white text-xs">
            <Clock className="w-3 h-3" />
            <span>{video.duration}</span>
          </div>
        )}
      </div>

      {/* 内容 */}
      <div className="p-5 sm:p-6">
        {/* 分类 */}
        {video.category?.title && (
          <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-brand-green-light text-primary/80 mb-3">
            {video.category.title}
          </span>
        )}

        {/* 标题 */}
        <h3 className="text-base sm:text-lg font-bold text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
          {video.title}
        </h3>

        {/* 简介 */}
        {video.summary && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {video.summary}
          </p>
        )}
      </div>
    </Link>
  );
}
