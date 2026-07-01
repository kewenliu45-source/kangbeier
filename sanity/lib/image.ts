import createImageUrlBuilder from "@sanity/image-url";
import type { Image, ImageUrlBuilder } from "sanity";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * 从 Sanity Image 字段值生成图片 URL
 *
 * @example
 * ```ts
 * const url = urlForImage(post.coverImage).width(800).url();
 * ```
 */
export function urlForImage(source: Image): ImageUrlBuilder {
  return builder.image(source).auto("format").fit("max");
}
