import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const W = 1200;
const H = 630;

const fontDir = path.join(root, "src/assets/fonts");
const fontBook = await fs.readFile(path.join(fontDir, "CentraNo2-Book.ttf"));
const fontMedium = await fs.readFile(path.join(fontDir, "CentraNo2-Medium.ttf"));
const fontBold = await fs.readFile(path.join(fontDir, "CentraNo2-Bold.ttf"));
const fontFaces = `
    @font-face { font-family: 'CentraNo2'; font-weight: 400; src: url(data:font/ttf;base64,${fontBook.toString("base64")}); }
    @font-face { font-family: 'CentraNo2'; font-weight: 500; src: url(data:font/ttf;base64,${fontMedium.toString("base64")}); }
    @font-face { font-family: 'CentraNo2'; font-weight: 700; src: url(data:font/ttf;base64,${fontBold.toString("base64")}); }
`;

// Render a text string at given size/weight, return measured width in px.
const measureText = async (content, weight, size) => {
    const probe = `<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="200">
        <style>${fontFaces}</style>
        <rect width="100%" height="100%" fill="#fff"/>
        <text x="20" y="150" font-family="CentraNo2" font-weight="${weight}" font-size="${size}" fill="#000">${content}</text>
    </svg>`;
    const buf = await sharp(Buffer.from(probe)).png().toBuffer();
    const { info } = await sharp(buf).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
    return info.width;
};

// Find the font-size that makes `content` render at target width.
const findSize = async (content, weight, targetWidth) => {
    // Start with a guess proportional to target width / char count
    let size = Math.round(targetWidth / content.length / 0.6);
    for (let i = 0; i < 8; i++) {
        const w = await measureText(content, weight, size);
        const ratio = targetWidth / w;
        if (Math.abs(1 - ratio) < 0.01) return size;
        size = Math.round(size * ratio);
    }
    return size;
};

const heroSize = 80;
const heroWidth = await measureText("Let's Chat!", 700, heroSize);
const nameSize = await findSize("Miguel Lozano", 700, heroWidth);
const roleSize = await findSize("Full-Stack Developer", 500, heroWidth);

console.log(`hero "Let's Chat!" @ 80px = ${heroWidth}px`);
console.log(`name "Miguel Lozano" sized to ${nameSize}px to match`);
console.log(`role "Full-Stack Developer" sized to ${roleSize}px to match`);

const gradientDef = `
    <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(41 0.5 0.5)">
            <stop offset="0%" stop-color="#7e3f95"/>
            <stop offset="100%" stop-color="#00aeef"/>
        </linearGradient>
    </defs>
`;

const dividerWidth = heroWidth;
const textBlock = `
    <text x="600" y="200" font-family="CentraNo2" font-weight="500" font-size="36" fill="#fff" opacity="0.85">Wanna Hire Me?</text>
    <text x="600" y="310" font-family="CentraNo2" font-weight="700" font-size="${heroSize}" fill="#fff">Let's Chat!</text>
    <line x1="600" y1="345" x2="${600 + dividerWidth}" y2="345" stroke="#fff" stroke-width="2" opacity="0.45"/>
    <text x="600" y="${410 + Math.round(nameSize * 0.05)}" font-family="CentraNo2" font-weight="700" font-size="${nameSize}" fill="#fff">Miguel Lozano</text>
    <text x="600" y="${470 + Math.round(roleSize * 0.05)}" font-family="CentraNo2" font-weight="500" font-size="${roleSize}" fill="#fff" opacity="0.95">Full-Stack Developer</text>
    <text x="600" y="525" font-family="CentraNo2" font-weight="400" font-size="22" fill="#fff" opacity="0.75">migueldotl.github.io</text>
`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <style>${fontFaces}</style>
    ${gradientDef}
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    ${textBlock}
</svg>`;

const bitmojiPath = path.join(root, "src/assets/images/bitmoji/bitmoji-laptop-2.png");
const bitmoji = await sharp(bitmojiPath).resize({ height: 480, fit: "inside" }).toBuffer();
const outPath = path.join(root, "public/og-image.png");

await sharp(Buffer.from(svg))
    .composite([{ input: bitmoji, left: 60, top: Math.round((H - 480) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

const stats = await fs.stat(outPath);
console.log(`og-image.png — ${(stats.size / 1024).toFixed(1)} KB`);
