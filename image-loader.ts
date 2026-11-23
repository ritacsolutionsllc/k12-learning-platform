import type { ImageLoaderProps } from "next/image";

export default function passthroughImageLoader({ src }: ImageLoaderProps): string {
  return src;
}
