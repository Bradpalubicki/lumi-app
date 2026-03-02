const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#818cf8"/>
      <stop offset="100%" style="stop-color:#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="url(#g)"/>
  <circle cx="${Math.round(size * 0.5)}" cy="${Math.round(size * 0.42)}" r="${Math.round(size * 0.22)}" fill="white" opacity="0.95"/>
  <text x="50%" y="78%" font-family="Arial,sans-serif" font-size="${Math.round(size * 0.18)}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">Lumi</text>
</svg>`;

  const outPath = path.join(__dirname, '..', 'public', 'icons', `icon-${size}.svg`);
  fs.writeFileSync(outPath, svg);
  console.log(`Created icon-${size}.svg`);
});

// Also create a favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#6366f1"/>
  <circle cx="16" cy="13" r="7" fill="white" opacity="0.95"/>
  <text x="50%" y="80%" font-family="Arial,sans-serif" font-size="6" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">Lumi</text>
</svg>`;
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), faviconSvg);
console.log('Created favicon.svg');
