import sharp from "sharp";
import { renameSync } from "fs";

const INPUT  = "public/logo.png";
const TEMP   = "public/logo_tmp.png";
const OUTPUT = "public/logo.png";

const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const out = Buffer.from(data); // cópia RGBA

for (let i = 0; i < width * height; i++) {
  const off = i * 4;
  const r = data[off];
  const g = data[off + 1];
  const b = data[off + 2];

  // "Dourado" = vermelho muito acima do azul e acima do verde
  // Fundo azul escuro: b >= r  ou b perto de r
  const goldness = r - b;        // >0 = quente, <0 = azulado
  const warmth   = r - g;        // separação warm vs frio

  let alpha;
  if (goldness >= 70) {
    // claramente dourado — opaco
    alpha = 255;
  } else if (goldness <= 5 || b > r * 1.15) {
    // claramente fundo — transparente
    alpha = 0;
  } else {
    // zona de transição suave (bordas, glow, sombra)
    const t = (goldness - 5) / 65;           // 0..1
    const boost = warmth > 20 ? 1.25 : 1.0;  // pixels quentes ficam mais opacos
    alpha = Math.round(Math.min(255, t * boost * 255));
  }

  out[off + 3] = alpha;
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(TEMP);

renameSync(TEMP, OUTPUT);
console.log(`✓ Background removido: ${OUTPUT} (${width}×${height})`);
