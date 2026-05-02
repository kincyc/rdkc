import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryDir = path.resolve(__dirname, "../src/assets/gallery");
const metadataPath = path.resolve(__dirname, "../src/data/image_metadata.json");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function filenameFromSrc(src = "") {
  return src.split("/").pop() ?? src;
}

function titleFromFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

async function main() {
  const [galleryEntries, metadataRaw] = await Promise.all([
    fs.readdir(galleryDir, { withFileTypes: true }),
    fs.readFile(metadataPath, "utf8"),
  ]);

  const metadata = JSON.parse(metadataRaw);
  if (!Array.isArray(metadata)) {
    throw new Error("image_metadata.json must contain a JSON array");
  }

  const existingFilenames = new Set(metadata.map((entry) => filenameFromSrc(entry?.src)));

  const galleryFiles = galleryEntries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => imageExtensions.has(path.extname(name).toLowerCase()))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

  const newEntries = galleryFiles
    .filter((filename) => !existingFilenames.has(filename))
    .map((filename) => {
      const placeholder = titleFromFilename(filename);
      return {
        src: `/images/gallery/${filename}`,
        title: placeholder,
        alt: placeholder,
      };
    });

  if (newEntries.length === 0) {
    console.log("No new gallery images found. Metadata is already up to date.");
    return;
  }

  const nextMetadata = [...metadata, ...newEntries];
  await fs.writeFile(metadataPath, `${JSON.stringify(nextMetadata, null, 2)}\n`, "utf8");

  console.log(`Added ${newEntries.length} metadata entr${newEntries.length === 1 ? "y" : "ies"}:`);
  for (const entry of newEntries) {
    console.log(`- ${filenameFromSrc(entry.src)}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
