// Builds both language versions from beyond.html (the source, English by default).
//   beyond-mn.html       the same film, Mongolian by default (published as its own artifact)
//   site/index.html      English, as a standalone page for hosting or sending
//   site/mn/index.html   Mongolian, as a standalone page
//   site/og*.jpg         link-preview images (the cards X, WhatsApp, Telegram etc. show)
// Run with: node build.mjs
import fs from 'fs';

// where the site is served; link previews need absolute URLs
const SITE = 'https://beyond-film.fly.dev';

const META = {
  en: {
    path: '/',
    image: 'og.jpg',
    locale: 'en_US',
    title: 'BEYOND: shapes from four, eight and ten dimensions, computed live in your browser',
    description: 'A four-minute film: slices of a 4D cube, the 120-cell, the Hopf fibration, a ten-dimensional cube, and E8 turning until it falls into its 30-fold symmetry. No video files: every frame and every note is computed as you watch.',
    alt: 'The E8 root system projected onto its Coxeter plane: 240 points on eight rainbow rings joined by 6,720 edges, under the title BEYOND.',
  },
  mn: {
    path: '/mn/',
    image: 'og-mn.jpg',
    locale: 'mn_MN',
    title: 'ЦААШ: дөрөв, найм, арван хэмжээст дүрсүүд таны браузер дээр шууд тооцоологдоно',
    description: 'Дөрвөн минутын кино: 4D кубын огтлол, 120 нүдэт, Хопфын фибраци, арван хэмжээст куб, 30 давхар тэгш хэмдээ буух E8. Видео файл огт байхгүй: кадр бүр, нот бүр таны үзэх агшинд тооцоологдоно.',
    alt: 'Коксетерийн хавтгайд проекцолсон E8: солонгон өнгийн найман цагираг дээрх 240 цэг, 6,720 ирмэг, ЦААШ гэсэн гарчигтай.',
  },
};

// a tesseract: a cube inside a cube, corners joined
const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23030306'/%3E%3Cg fill='none' stroke='%23ede7db' stroke-width='2.5'%3E%3Crect x='13' y='13' width='38' height='38'/%3E%3Crect x='24' y='24' width='16' height='16'/%3E%3Cpath d='M13 13L24 24M51 13L40 24M13 51L24 40M51 51L40 40'/%3E%3C/g%3E%3C/svg%3E";

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`expected to find: ${from}`);
  return s.replace(from, to);
};

const head = (lang) => {
  const m = META[lang], url = SITE + m.path, img = `${SITE}/${m.image}`;
  return [
    `<meta name="description" content="${m.description}">`,
    '<meta name="theme-color" content="#030306">',
    `<link rel="icon" href="${FAVICON}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="BEYOND">',
    `<meta property="og:locale" content="${m.locale}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${m.title}">`,
    `<meta property="og:description" content="${m.description}">`,
    `<meta property="og:image" content="${img}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${m.alt}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${m.title}">`,
    `<meta name="twitter:description" content="${m.description}">`,
    `<meta name="twitter:image" content="${img}">`,
    `<meta name="twitter:image:alt" content="${m.alt}">`,
  ].join('\n');
};

const en = fs.readFileSync('beyond.html', 'utf8');
let mn = swap(en, "const DEFAULT_LANG = 'en';", "const DEFAULT_LANG = 'mn';");
mn = swap(mn, '<title>Beyond Three Dimensions</title>', '<title>Гурван хэмжээсээс цааш</title>');
fs.writeFileSync('beyond-mn.html', mn);

// the artifact host adds the document skeleton itself; standalone pages need it spelled out
const page = (body, lang) => {
  const i = body.indexOf('<canvas');
  return `<!doctype html>\n<html lang="${lang}">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${head(lang)}\n${body.slice(0, i)}</head>\n<body>\n${body.slice(i)}\n</body>\n</html>\n`;
};
fs.mkdirSync('site/mn', { recursive: true });
fs.writeFileSync('site/index.html', page(en, 'en'));
fs.writeFileSync('site/mn/index.html', page(mn, 'mn'));
for (const m of Object.values(META)) fs.copyFileSync(`assets/${m.image}`, `site/${m.image}`);
console.log('built beyond-mn.html, site/index.html, site/mn/index.html and the preview images');
