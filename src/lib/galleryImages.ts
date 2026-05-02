import imageMetadata from "@/data/image_metadata.json";

export interface GalleryImage {
  src: string;
  title: string;
  year?: string;
  description?: string;
  alt?: string;
  sortOrder?: number;
}

interface GalleryMetadataEntry {
  src?: string;
  title?: string;
  year?: string;
  description?: string;
  alt?: string;
  sortOrder?: number;
}

const galleryModules = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}", {
  eager: true,
  import: "default",
});

const metadataByFilename = new Map<string, GalleryMetadataEntry>(
  imageMetadata.map((entry) => [getFilename(entry.src ?? ""), entry]),
);

function getFilename(path: string): string {
  return path.split("/").pop() ?? path;
}

function getBaseName(filename: string): string {
  return filename.replace(/\.[^.]+$/, "");
}

function titleFromFilename(filename: string): string {
  return getBaseName(filename)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

export const galleryImages: GalleryImage[] = Object.entries(galleryModules)
  .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath, undefined, { numeric: true }))
  .map(([modulePath, src]) => {
    const filename = getFilename(modulePath);
    const metadata = metadataByFilename.get(filename);
    const fallbackTitle = titleFromFilename(filename);

    return {
      src: src as string,
      title: metadata?.title || fallbackTitle,
      year: metadata?.year,
      description: metadata?.description,
      alt: metadata?.alt || fallbackTitle,
      sortOrder: metadata?.sortOrder,
    };
  })
  .sort((left, right) => {
    const leftOrder = left.sortOrder ?? Number.POSITIVE_INFINITY;
    const rightOrder = right.sortOrder ?? Number.POSITIVE_INFINITY;
    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }
    return 0;
  });
