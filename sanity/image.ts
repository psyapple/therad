import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

export type ContentImage = {
  _type: "image";
  _key?: string;
  asset?: { _type?: "reference"; _ref: string };
  alt?: string;
  caption?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
};

const builder = createImageUrlBuilder({ projectId, dataset });
export function imageDimensions(image: ContentImage) {
  const match = image.asset?._ref.match(/-(\d+)x(\d+)-/);
  if (!match) return {};
  const crop = image.crop;
  return {
    width: Math.round(
      Number(match[1]) * (1 - (crop?.left || 0) - (crop?.right || 0)),
    ),
    height: Math.round(
      Number(match[2]) * (1 - (crop?.top || 0) - (crop?.bottom || 0)),
    ),
  };
}
export function imageUrl(image: ContentImage | undefined, width = 1200) {
  if (!image?.asset?._ref?.match(/^image-[a-zA-Z0-9]+-\d+x\d+-[a-zA-Z0-9]+$/))
    return undefined;
  return builder.image(image).width(width).fit("max").auto("format").url();
}
