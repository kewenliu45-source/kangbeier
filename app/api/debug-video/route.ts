import { NextResponse } from "next/server";
import { fetchVideoBySlug } from "@/sanity/lib/fetchers";

export async function GET() {
  try {
    const video = await fetchVideoBySlug("shipin1");
    return NextResponse.json({
      found: !!video,
      title: video?.title ?? null,
      slug: video?.slug?.current ?? null,
      videoUrl: video?.videoUrl ?? null,
    });
  } catch (err) {
    return NextResponse.json({
      error: String(err),
    });
  }
}
