import sharp from "sharp";

const BAYER8 = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
];

const [src, dest] = process.argv.slice(2);
if (!src || !dest) {
  console.error("Usage: node scripts/dither.mjs <src> <dest>");
  process.exit(1);
}

const W = 60;
const H = 75;
const SCALE = 4; // 240x300 px (rendered at 120x150 CSS px)

const meta = await sharp(src).metadata();
const { data } = await sharp(src)
  .extract({
    left: 0,
    top: 0,
    width: meta.width ?? 600,
    height: Math.max(100, (meta.height ?? 750) - 24),
  })
  .resize(W, H, { fit: "cover", position: "center" })
  .greyscale()
  .normalise()
  .linear(1.15, -6)
  .raw()
  .toBuffer({ resolveWithObject: true });

const rgba = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const lum = data[y * W + x];
    const threshold = ((BAYER8[(y % 8) * 8 + (x % 8)] + 0.5) / 64) * 255;
    if (lum < threshold && lum < 238) {
      const idx = (y * W + x) * 4;
      rgba[idx] = 20;
      rgba[idx + 1] = 25;
      rgba[idx + 2] = 42;
      rgba[idx + 3] = 255;
    }
  }
}

await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .resize(W * SCALE, H * SCALE, { kernel: "nearest" })
  .png({ palette: true, colors: 2 })
  .toFile(dest);

console.log(`Wrote ${dest}`);
