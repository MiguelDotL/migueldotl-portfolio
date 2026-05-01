import sharp from "sharp";
import pngToIco from "png-to-ico";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const svg = await fs.readFile(path.join(root, "src/assets/images/logo.svg"), "utf-8");
const whiteLogo = svg.replace(/#000/g, "#fff").replace(/#231f20/g, "#fff");

// Rounded-square base — for PWA / Apple touch icons (iOS rounds them anyway).
// Inner: dark base + translucent white-alpha circle (matches NavBar's logo-bg) + white logo.
const renderRoundedSquare = async (size) => {
    const inner = Math.round(size * 0.7);
    const corner = size * 0.18;
    const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
        <rect width="${size}" height="${size}" rx="${corner}" fill="#151515"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${inner / 2}" fill="rgb(217,217,217)" fill-opacity="0.25"/>
    </svg>`;
    const logo = await sharp(Buffer.from(whiteLogo)).resize(inner, inner).png().toBuffer();
    return sharp(Buffer.from(bg))
        .composite([{ input: logo, gravity: "center" }])
        .png({ compressionLevel: 9 })
        .toBuffer();
};

// Circular base — for favicon. Just alpha-white disc + white logo, both at max size,
// transparent corners (no dark border).
const renderCircle = async (size) => {
    const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="rgb(217,217,217)" fill-opacity="0.25"/>
    </svg>`;
    const logo = await sharp(Buffer.from(whiteLogo)).resize(size, size).png().toBuffer();
    return sharp(Buffer.from(bg))
        .composite([{ input: logo, gravity: "center" }])
        .png({ compressionLevel: 9 })
        .toBuffer();
};

// PWA manifest icons (rounded square, alpha layer)
for (const size of [192, 512]) {
    const buf = await renderRoundedSquare(size);
    const outPath = path.join(root, `public/logo${size}.png`);
    await fs.writeFile(outPath, buf);
    const stats = await fs.stat(outPath);
    console.log(`logo${size}.png — ${(stats.size / 1024).toFixed(1)} KB`);
}

// Apple touch icon (180×180, rounded square — iOS adds its own corner mask)
const appleBuf = await renderRoundedSquare(180);
await fs.writeFile(path.join(root, "public/apple-touch-icon.png"), appleBuf);
console.log(`apple-touch-icon.png — 180×180`);

// Multi-size favicon.ico (circle, no alpha layer)
const faviconBufs = await Promise.all([16, 32, 48].map(renderCircle));
const ico = await pngToIco(faviconBufs);
await fs.writeFile(path.join(root, "public/favicon.ico"), ico);
const icoStats = await fs.stat(path.join(root, "public/favicon.ico"));
console.log(`favicon.ico (16/32/48 circle, packed) — ${(icoStats.size / 1024).toFixed(1)} KB`);
