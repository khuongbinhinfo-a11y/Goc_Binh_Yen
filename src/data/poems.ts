export type PoemStatus = "published" | "upcoming";

export type PoemAnalysis = {
  emotionFlow: string;
  standoutImages: string;
  meaning: string;
  memorableLine: string;
};

export type PoemImageResearch = {
  moodKeywords: string[];
  referenceLinks: string[];
  recommendedScene: string;
  licenseNote: string;
};

export type PoemItem = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  author: string;
  locationDate: string;
  cardImage: string;
  heroImage: string;
  content: string;
  status: PoemStatus;
  analysis: PoemAnalysis;
  imageResearch: PoemImageResearch;
};

const POEM_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

const AVAILABLE_LOCAL_POEM_IMAGES = new Set([
  "anh-yeu-em.jpeg",
  "ban-tay.jpeg",
  "ben-do.jpeg",
  "cam-hoa.jpeg",
  "cam-on-tinh-yeu.jpeg",
  "chi-can-co-vay.jpeg",
  "em-mua-xuan-ve.jpeg",
  "em-trong-anh.jpeg",
  "hoa-buom.jpeg",
  "hoa-luc-binh.jpeg",
  "hue-trang.jpeg",
  "khoang-cach-vo-hinh.jpeg",
  "mot-thoang.jpeg",
  "ngang-ben-song-xua.jpeg",
  "nho.jpeg",
  "qua-mien-thuong-nho.jpeg",
  "tieng-keu-chim-le-ban.jpeg",
]);

function normalizeVietnameseText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u0111\u0110\u00f0\u00d0]/g, "d")
    .toLowerCase();
}

function slugifyPoemTitle(title: string) {
  return normalizeVietnameseText(title)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function resolvePoemImageByTitle(title: string) {
  const baseName = slugifyPoemTitle(title);

  for (const ext of POEM_IMAGE_EXTENSIONS) {
    const fileName = `${baseName}${ext}`;
    if (AVAILABLE_LOCAL_POEM_IMAGES.has(fileName)) {
      return `/images/poems/${fileName}`;
    }
  }

  return "/images/logo-4.jpg";
}

export const poems: PoemItem[] = [
{
    slug: "ben-do",
    title: "B\u1ebfn \u0110\u00f2",
    tag: "Th\u01a1 qu\u00ea",
    summary: "C\u00f3 m\u1ed9t con thuy\u1ec1n d\u1ecdc Ch\u1edf nh\u1eefng chuy\u1ebfn h\u00e0ng \u0111i",
    author: "L\u00ea D\u0169ng",
    locationDate: "T\u00e2n Phong, 13/10/2018",
    cardImage: resolvePoemImageByTitle("B\u1ebfn \u0110\u00f2"),
    heroImage: resolvePoemImageByTitle("B\u1ebfn \u0110\u00f2"),
    content: "C\u00f3 m\u1ed9t con thuy\u1ec1n d\u1ecdc\nCh\u1edf nh\u1eefng chuy\u1ebfn h\u00e0ng \u0111i\nCh\u1edf bao ni\u1ec1m m\u01a1 \u01b0\u1edbc\nC\u1ee7a n\u00f4ng d\u00e2n, th\u00e1ng ng\u00e0y\nCon \u0111\u00f2 d\u1ecdc quen th\u1ea5y\nCh\u1ea1y tr\u00ean d\u00f2ng s\u00f4ng n\u00e0y\nCon \u0111\u00f2 trong l\u00f2ng anh\nCh\u1ea1y tr\u00ean d\u00f2ng th\u01b0\u01a1ng nh\u1edb\nCh\u1edf \u0111\u1ea7y bao y\u00eau th\u01b0\u01a1ng\n\u0110i t\u00ecm em b\u1ebfn \u0111\u1ed7\nSao m\u1ecbt m\u00f9 h\u01b0\u1edbng ph\u01b0\u01a1ng\nTh\u01b0\u01a1ng chi\u1ebfc thuy\u1ec1n xu\u00f4i d\u00f2ng c\u00f4 \u0111\u1ed9c\nKh\u00e1ch th\u01b0\u01a1ng h\u1ed3 g\u1ea1o ch\u1ee3, n\u01b0\u1edbc s\u00f4ng\nTh\u01b0\u01a1ng anh t\u00ecnh m\u00e3i long \u0111ong\nEm \u01a1i b\u1ebfn \u0111\u1eadu...\nEm \u01a1i b\u1ebfn \u0111\u1eadu...\nCho anh \u0111\u1eadu c\u00f9ng.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"C\u00f3 m\u1ed9t con thuy\u1ec1n d\u1ecdc\" v\u00e0 \"Ch\u1edf nh\u1eefng chuy\u1ebfn h\u00e0ng \u0111i\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Cho anh \u0111\u1eadu c\u00f9ng.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "ban-tay",
    title: "B\u00e0n Tay",
    tag: "Th\u01a1 t\u00ecnh",
    summary: "Anh \u0111\u00e3 h\u00f4n l\u00ean b\u00e0n tay \u1ea5y N\u00ean bi\u1ebft tay m\u1ec1m, \u1ea5m d\u01b0\u1eddng n\u00e0o",
    author: "L\u00ea D\u0169ng",
    locationDate: "M\u1ef9 Tho, ng\u00e0y 17/01/2019",
    cardImage: resolvePoemImageByTitle("B\u00e0n Tay"),
    heroImage: resolvePoemImageByTitle("B\u00e0n Tay"),
    content: "Anh \u0111\u00e3 h\u00f4n l\u00ean b\u00e0n tay \u1ea5y\nN\u00ean bi\u1ebft tay m\u1ec1m, \u1ea5m d\u01b0\u1eddng n\u00e0o\nBao \u0111\u00eam ve vu\u1ed1t, ru anh ng\u1ee7\nB\u1ea5y d\u1ecbu d\u00e0ng t\u1eeb \u1ea5y lan \u0111i\nKhi g\u1ed1i \u0111\u1ea7u l\u00ean b\u00e0n tay nh\u1ecf nh\u1eafn\nNghe \u00f9a v\u1ec1: H\u1ea1nh ph\u00fac, tin y\u00eau\nNh\u1eefng s\u1edbm mai, trong l\u00f2ng hoa n\u1edf\nV\u1eefng v\u00e0ng \u0111i, d\u1eabu m\u01b0a gi\u00f3 tr\u00e1i m\u00f9a\nNh\u00e0 l\u00e0 n\u01a1i v\u1ec1 sau h\u00e0nh tr\u00ecnh v\u1ea5t v\u1ea3\nV\u00f2ng tay em, s\u01b0\u1edfi \u1ea5m l\u00f2ng anh\nEm bi\u1ebft h\u00f4ng, anh th\u01b0\u01a1ng nhi\u1ec1u l\u1eafm \u0111\u00f3\nNh\u1eefng b\u00fap m\u0103ng, c\u0169ng c\u00f2i l\u1ea1 k\u1ef3\nD\u1ecbu t\u00ecnh ta th\u0103ng hoa h\u1ea1nh ph\u00fac\nD\u1eabu \u0111\u01b0\u1eddng c\u00f3 g\u1eadp gh\u1ec1nh ta v\u1eabn b\u01b0\u1edbc \u0111i\nAnh gi\u1eef m\u00e3i h\u01a1i \u1ea5m b\u00e0n tay \u1ea5y\nHoa mai v\u00e0ng tr\u00ean th\u1ea3m c\u1ecf xanh t\u01b0\u01a1i.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Anh \u0111\u00e3 h\u00f4n l\u00ean b\u00e0n tay \u1ea5y\" v\u00e0 \"N\u00ean bi\u1ebft tay m\u1ec1m, \u1ea5m d\u01b0\u1eddng n\u00e0o\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Hoa mai v\u00e0ng tr\u00ean th\u1ea3m c\u1ecf xanh t\u01b0\u01a1i.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "cam-hoa",
    title: "C\u1eafm Hoa",
    tag: "Th\u01a1 t\u00ecnh",
    summary: "Anh n\u00e2ng niu \u0111\u1eb7t em v\u00e0o b\u00ecnh pha-l\u00ea Say s\u01b0a ng\u1eafm em, t\u1ecfa h\u01b0\u01a1ng khoe s\u1eafc",
    author: "L\u00ea D\u0169ng",
    locationDate: "M\u1ef9 Tho, ng\u00e0y 18/6/2019",
    cardImage: resolvePoemImageByTitle("C\u1eafm Hoa"),
    heroImage: resolvePoemImageByTitle("C\u1eafm Hoa"),
    content: "Anh n\u00e2ng niu \u0111\u1eb7t em v\u00e0o b\u00ecnh pha-l\u00ea\nSay s\u01b0a ng\u1eafm em, t\u1ecfa h\u01b0\u01a1ng khoe s\u1eafc\nH\u01b0\u01a1ng hoa hu\u1ec7 \u0111\u00e2u nh\u1eb9 nh\u00e0ng, \u0111\u1eb1m th\u1eafm\nM\u00e0 gi\u1eef h\u1ed3n \u1ee7 \u1ea5m l\u00f2ng anh\nC\u1ea3 m\u1ed9t th\u1eddi em c\u00f3 bi\u1ebft kh\u00f4ng\nAnh say h\u01b0\u01a1ng hoa, y\u00eau nh\u00e0nh hu\u1ec7 tr\u1eafng\nCh\u1ec9 l\u00e0 hoa th\u00f4i sao anh \u201csay n\u1eafng\u201d?\nS\u1eafc v\u00e0 h\u01b0\u01a1ng c\u0169ng b\u00ecnh d\u1ecb \u0111\u1eddi th\u01b0\u1eddng\nC\u00f9ng s\u1edbm chi\u1ec1u tho\u1ea3ng nh\u1eb9 s\u1eafc, h\u01b0\u01a1ng\nAi \u0111\u00e2u bi\u1ebft s\u1eafc, h\u01b0\u01a1ng v\u1eabn v\u01b0\u01a1ng n\u1ed7i nh\u1edb\nCh\u00e1y l\u00f2ng anh, m\u1ed9t g\u00e3 si t\u00ecnh\nAnh lang thang qua v\u00f9ng c\u00f3 v\u00e0 kh\u00f4ng\n\u0110\u1ec3 b\u1ea5t ch\u1ee3t g\u1eb7p h\u1eb9n h\u00f2 n\u0103m c\u0169\nEm nh\u00ecn anh ch\u01b0a bao gi\u1edd l\u1ea1\n\u00d4i \u0111\u1eb1m chi\u00eau xuy\u00ean th\u1ea5u tr\u00e1i tim n\u00e0y\nThi\u00ean \u0111\u01b0\u1eddng anh b\u00e0y s\u1eb5n trong tim \u0111\u00e2y\nCh\u1edd em \u0111\u1ebfn, v\u1ec1 v\u1edbi anh hu\u1ec7 nh\u00e9.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Anh n\u00e2ng niu \u0111\u1eb7t em v\u00e0o b\u00ecnh pha-l\u00ea\" v\u00e0 \"Say s\u01b0a ng\u1eafm em, t\u1ecfa h\u01b0\u01a1ng khoe s\u1eafc\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Ch\u1edd em \u0111\u1ebfn, v\u1ec1 v\u1edbi anh hu\u1ec7 nh\u00e9.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "cam-on-tinh-yeu",
    title: "C\u1ea3m \u01a0n T\u00ecnh Y\u00eau",
    tag: "Th\u01a1 chi\u00eam nghi\u1ec7m",
    summary: "Ng\u1ee1 ch\u1ebft r\u1ed3i t\u00ecnh y\u00eau ch\u00e1y b\u1ecfng Tu\u1ed5i b\u1ed1n m\u01b0\u01a1i qua n\u1eeda \u0111\u1eddi ng\u01b0\u1eddi",
    author: "L\u00ea D\u0169ng",
    locationDate: "",
    cardImage: resolvePoemImageByTitle("C\u1ea3m \u01a0n T\u00ecnh Y\u00eau"),
    heroImage: resolvePoemImageByTitle("C\u1ea3m \u01a0n T\u00ecnh Y\u00eau"),
    content: "Ng\u1ee1 ch\u1ebft r\u1ed3i t\u00ecnh y\u00eau ch\u00e1y b\u1ecfng\nTu\u1ed5i b\u1ed1n m\u01b0\u01a1i qua n\u1eeda \u0111\u1eddi ng\u01b0\u1eddi\nThui th\u1ee7i b\u01b0\u1edbc d\u1ecdc \u0111\u01b0\u1eddng gi\u00f3 b\u1ee5i\nC\u1ed9i c\u00fac gi\u00e0 b\u1ed7ng n\u1edf \u0111\u00f3a v\u00e0ng t\u01b0\u01a1i\nAnh \u0111em m\u00f9a xu\u00e2n \u0111\u1ebfn b\u00ean em\nX\u1edbi tung th\u1ea3m l\u1eb7ng n\u1ea5p b\u00ean th\u1ec1m\nMang n\u1eafng \u1ea5m s\u01b0\u1edfi h\u1ed3n hoang l\u1ea1nh\nN\u1ee5 h\u00f4n d\u00e0i th\u00f4i th\u00fac h\u1ed3n xu\u00e2n\nCho m\u00f4i h\u1ed3ng r\u1ea1ng r\u1ee1 n\u1ee5 c\u01b0\u1eddi t\u01b0\u01a1i\n\u0110\u1ec3 m\u1eaft bi\u1ebfc s\u00f3ng t\u00ecnh d\u1ed3n d\u00e3\n\u0110\u1ebfn b\u00e2y gi\u1edd em m\u1edbi hi\u1ec3u ra\nT\u00ecnh y\u00eau \u0111\u00e2u xa l\u01a1 xa l\u1eafc\nM\u1ed9t ch\u00fat ki\u1ec3u k\u1ef3 hoa d\u1ea1i h\u00e9o h\u1eaft\nM\u1ed9t ch\u00fat \u201cd\u1ed7i\u201d th\u00f4i h\u1ea1nh ph\u00fac \u0111\u00e2m ch\u1ed3i\nHai n\u1eeda g\u1eb7p nhau \u0111\u01a1m \u0111\u1ea7y h\u01b0\u01a1ng hoa l\u1ea1\nKh\u00f4ng t\u00ecnh y\u00eau \u0111\u1eddi nh\u1ea1t nh\u1ebdo \u0111\u01a1n c\u00f4i.\n\n12/6/1999",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Ng\u1ee1 ch\u1ebft r\u1ed3i t\u00ecnh y\u00eau ch\u00e1y b\u1ecfng\" v\u00e0 \"Tu\u1ed5i b\u1ed1n m\u01b0\u01a1i qua n\u1eeda \u0111\u1eddi ng\u01b0\u1eddi\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "12/6/1999",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "mot-thoang",
    title: "M\u1ed9t Tho\u00e1ng",
    tag: "Th\u01a1 k\u00fd \u1ee9c",
    summary: "M\u1ed9t ph\u00fat th\u00f4i l\u00e0m c\u1ea3 \u0111\u1eddi v\u01b0\u01a1ng v\u1ea5n B\u1eaft g\u1eb7p em c\u01b0\u1eddi... \u00d4i \u0111\u00f4i m\u1eaft lung linh",
    author: "L\u00ea D\u0169ng",
    locationDate: "",
    cardImage: resolvePoemImageByTitle("M\u1ed9t Tho\u00e1ng"),
    heroImage: resolvePoemImageByTitle("M\u1ed9t Tho\u00e1ng"),
    content: "M\u1ed9t ph\u00fat th\u00f4i l\u00e0m c\u1ea3 \u0111\u1eddi v\u01b0\u01a1ng v\u1ea5n\nB\u1eaft g\u1eb7p em c\u01b0\u1eddi... \u00d4i \u0111\u00f4i m\u1eaft lung linh\nR\u0103ng kh\u1ec3nh kia l\u00e0m r\u1ec9 m\u00e1u tim m\u00ecnh\nBao \u0111\u00eam th\u1ee9c v\u00e0 c\u1ea3 \u0111\u1eddi tr\u0103n tr\u1edf\nAnh \u0111i t\u00ecm em... C\u1ea3 m\u1ed9t tr\u1eddi th\u01b0\u01a1ng nh\u1edb\nV\u00f4 v\u1ecdng h\u00e3o huy\u1ec1n v\u1eabn m\u00e3i g\u1eafng \u0111i t\u00ecm\nEm c\u00f3 trong \u0111\u1eddi? L\u00e0 ch\u1eafc ch\u1eafn c\u00f3 trong tim\nD\u1eabu em c\u00f3 c\u00f2n... hay h\u00ecnh nh\u01b0 em \u0111\u00e3...\nAnh v\u1eabn t\u00ecm em, nh\u01b0 anh t\u1eebng \u0111\u00e3\nL\u1ea7n d\u1ea5u nh\u00e2n gian... L\u1ea7n theo c\u1ea3 cu\u1ed9c \u0111\u1eddi.\n\n4/9/2018",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"M\u1ed9t ph\u00fat th\u00f4i l\u00e0m c\u1ea3 \u0111\u1eddi v\u01b0\u01a1ng v\u1ea5n\" v\u00e0 \"B\u1eaft g\u1eb7p em c\u01b0\u1eddi... \u00d4i \u0111\u00f4i m\u1eaft lung linh\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "4/9/2018",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "hoa-buom",
    title: "Hoa B\u01b0\u1edbm",
    tag: "Th\u01a1 t\u00ecnh",
    summary: "M\u1ed9t \u0111\u00f3a hoa: V\u00e0o \u0111\u1ed9 m\u00e3n khai Ch\u1ec9 ng\u1eafm th\u00f4i, \u0111\u00e3 th\u1ed5n th\u1ee9c \u0111\u00eam d\u00e0i",
    author: "L\u00ea D\u0169ng",
    locationDate: "M\u1ef9 Tho, ng\u00e0y 8/10/19",
    cardImage: resolvePoemImageByTitle("Hoa B\u01b0\u1edbm"),
    heroImage: resolvePoemImageByTitle("Hoa B\u01b0\u1edbm"),
    content: "M\u1ed9t \u0111\u00f3a hoa: V\u00e0o \u0111\u1ed9 m\u00e3n khai\nCh\u1ec9 ng\u1eafm th\u00f4i, \u0111\u00e3 th\u1ed5n th\u1ee9c \u0111\u00eam d\u00e0i\nEm ... c\u1ea3 tr\u1eddi m\u1ed9ng m\u1ecb\nAnh kh\u00f4ng c\u00f2n g\u00ec, ngo\u00e0i k\u1ebb t\u00ecnh si\nC\u00e1nh b\u01b0\u1edbm d\u1eebng bay, l\u1ee5y \u0111\u00f3a hoa xinh\nHoa \u01a1i, b\u01b0\u1edbm \u0111\u00e2u l\u00e0 k\u1ebb \u0111a t\u00ecnh\nB\u01b0\u1edbm \u0111\u00e3 t\u00ecm hoa gi\u1eefa ng\u00e0n c\u00e1nh gi\u00f3\nX\u00f4 \u0111\u1ea9y, d\u1eadp v\u00f9i b\u01b0\u1edbm m\u1ecfi g\u1ed1i, ch\u1ed3n ch\u00e2n\n\u0110\u1ec3 b\u00e2y gi\u1edd hoa r\u1ef1c s\u1eafc m\u00f9a xu\u00e2n\n\u0110\u1ec3 b\u00e2y gi\u1edd b\u01b0\u1edbm l\u01b0\u1ee3n say t\u00ecnh y\u00eau v\u0169 kh\u00fac\nEm \u01a1i h\u00e3y c\u01b0\u1eddi cho hoa khoe ngh\u00ecn s\u1eafc\nCho k\u1ebb si t\u00ecnh ch\u1ebft gi\u1eefa h\u1ed3 thu.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"M\u1ed9t \u0111\u00f3a hoa: V\u00e0o \u0111\u1ed9 m\u00e3n khai\" v\u00e0 \"Ch\u1ec9 ng\u1eafm th\u00f4i, \u0111\u00e3 th\u1ed5n th\u1ee9c \u0111\u00eam d\u00e0i\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Cho k\u1ebb si t\u00ecnh ch\u1ebft gi\u1eefa h\u1ed3 thu.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "hue-trang",
    title: "Hu\u1ec7 Tr\u1eafng",
    tag: "Th\u01a1 ho\u00e0i ni\u1ec7m",
    summary: "Anh \u0111i t\u00ecm em lo\u00e0i hoa hu\u1ec7 tr\u1eafng Tho\u1ea3ng h\u01b0\u01a1ng th\u00f4i m\u00e0 n\u1ed3ng \u1ea5m l\u1ea1 k\u1ef3",
    author: "L\u00ea D\u0169ng",
    locationDate: "M\u1ef9 Tho, ng\u00e0y 8/8 (kh\u00f4ng r\u00f5 n\u0103m)",
    cardImage: resolvePoemImageByTitle("Hu\u1ec7 Tr\u1eafng"),
    heroImage: resolvePoemImageByTitle("Hu\u1ec7 Tr\u1eafng"),
    content: "Anh \u0111i t\u00ecm em lo\u00e0i hoa hu\u1ec7 tr\u1eafng\nTho\u1ea3ng h\u01b0\u01a1ng th\u00f4i m\u00e0 n\u1ed3ng \u1ea5m l\u1ea1 k\u1ef3\nH\u01a1n ba m\u01b0\u01a1i n\u0103m r\u1ed3i, gi\u1eefa cu\u1ed9c chia ly\nL\u00f2ng t\u01a1 t\u01b0\u1edfng, th\u01b0\u01a1ng th\u01b0\u01a1ng, nh\u1edb nh\u1edb\n\u0110\u1eddi v\u00f4 th\u01b0\u1eddng ai m\u00e0 bi\u1ebft tr\u01b0\u1edbc\nCh\u1ec9 \u0111\u1ecbnh ninh: V\u00ec y\u00eau l\u1eafm \u0111\u00f3 m\u00e0\nN\u00e0o bi\u1ebft \u0111\u00e2u khi t\u00ecnh \u0111\u00e3 \u0111i xa\nMu\u1ed1n ngo\u00e1i l\u1ea1i, ng\u0103n ng\u1eafn, v\u1ea1n c\u00e1ch\nTh\u00f4i em c\u1ed1 cho anh v\u00e0i kh\u1eafc\nN\u00f3i h\u1ebft l\u00f2ng anh: Em nh\u1eadn - ch\u1ed1i t\u1eeb\nC\u0169ng \u0111\u00e0nh th\u00f4i, b\u1edfi ph\u1eadn ph\u01b0\u1edbc k\u00e9m tu\nDuy\u00ean v\u1edbi s\u1ed1, \u0111\u00e0nh m\u1ed9t \u0111\u1eddi dang d\u1edf\n\u00c9n b\u1eafc, nh\u1ea1n nam chi\u1ec1u thu \u1ee7 r\u0169\nTh\u01b0\u01a1ng ng\u01b0\u1eddi x\u01b0a, nh\u1edb h\u01b0\u01a1ng hu\u1ec7 tr\u1eafng, b\u1ea1c \u0111\u1ea7u.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Anh \u0111i t\u00ecm em lo\u00e0i hoa hu\u1ec7 tr\u1eafng\" v\u00e0 \"Tho\u1ea3ng h\u01b0\u01a1ng th\u00f4i m\u00e0 n\u1ed3ng \u1ea5m l\u1ea1 k\u1ef3\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Th\u01b0\u01a1ng ng\u01b0\u1eddi x\u01b0a, nh\u1edb h\u01b0\u01a1ng hu\u1ec7 tr\u1eafng, b\u1ea1c \u0111\u1ea7u.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "qua-mien-thuong-nho",
    title: "Qua Mi\u1ec1n Th\u01b0\u01a1ng Nh\u1edb",
    tag: "Th\u01a1 k\u00fd \u1ee9c",
    summary: "Gi\u00f3 xu\u00e2n d\u1ecbu d\u00e0ng mang \u0111i Nh\u1eefng \u0111i\u1ec1u anh ch\u01b0a th\u1ec3 n\u00f3i",
    author: "L\u00ea D\u0169ng",
    locationDate: "Kh\u00f4ng r\u00f5 ng\u00e0y th\u00e1ng",
    cardImage: resolvePoemImageByTitle("Qua Mi\u1ec1n Th\u01b0\u01a1ng Nh\u1edb"),
    heroImage: resolvePoemImageByTitle("Qua Mi\u1ec1n Th\u01b0\u01a1ng Nh\u1edb"),
    content: "Gi\u00f3 xu\u00e2n d\u1ecbu d\u00e0ng mang \u0111i\nNh\u1eefng \u0111i\u1ec1u anh ch\u01b0a th\u1ec3 n\u00f3i\nHoa c\u00fac v\u1ea5n v\u01b0\u01a1ng th\u00e1ng Gi\u00eang\nMai v\u00e0ng, l\u00e1 xanh l\u1ed9c bi\u1ebfc\nHu\u1ec7 tr\u1eafng cho d\u1ea1 b\u00ecnh y\u00ean\nT\u00ecnh anh nh\u01b0 x\u01b0a: D\u1ecbu d\u00e0ng\nGi\u00f3 mang xu\u00e2n v\u1ec1 ph\u00eda em\nMang l\u1eddi t\u1ecf t\u00ecnh anh g\u1eedi\nTu\u1ed5i hai m\u01b0\u01a1i gi\u0103ng \u0111\u01b0\u1eddng thu\u1edf \u0111\u00f3\nT\u00e0 \u00e1o em bay, nghi\u00eang ng\u1ea3 h\u1ed3n anh\nTu\u1ed5i xanh \u0111i qua, t\u00e0 \u00e1o bay ho\u00e0i th\u01b0\u01a1ng nh\u1edb\nEm ch\u1eb3ng khi n\u00e0o qu\u00ean \u00e1nh m\u1eaft anh\nAnh kh\u00f4ng th\u1ec3 qu\u00ean chi\u1ebfc r\u0103ng kh\u1ec3nh \u1ea5y\nAnh kh\u00f4ng th\u1ec3 qu\u00ean su\u1ed1i t\u00f3c b\u1ed3ng b\u1ec1nh\nEm \u01a1i h\u00e3y nghe ti\u1ebfng y\u00eau trong gi\u00f3\nQua mi\u1ec1n th\u01b0\u01a1ng nh\u1edb, c\u1ecf d\u1ea1i sao c\u1ee9 qu\u1ea5n.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Gi\u00f3 xu\u00e2n d\u1ecbu d\u00e0ng mang \u0111i\" v\u00e0 \"Nh\u1eefng \u0111i\u1ec1u anh ch\u01b0a th\u1ec3 n\u00f3i\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Qua mi\u1ec1n th\u01b0\u01a1ng nh\u1edb, c\u1ecf d\u1ea1i sao c\u1ee9 qu\u1ea5n.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "chi-can-co-vay",
    title: "Ch\u1ec9 C\u1ea7n C\u00f3 V\u1eady",
    tag: "Th\u01a1 t\u00ecnh",
    summary: "Anh th\u01b0\u01a1ng em nhi\u1ec1u l\u1eafm bi\u1ebft h\u00f4ng N\u00ean kh\u00f4ng th\u1ec3 th\u1ea3 bu\u00f4ng ra \u0111\u01b0\u1ee3c",
    author: "L\u00ea D\u0169ng",
    locationDate: "M\u1ef9 Tho, \u0111\u00eam 7/01/2019",
    cardImage: resolvePoemImageByTitle("Ch\u1ec9 C\u1ea7n C\u00f3 V\u1eady"),
    heroImage: resolvePoemImageByTitle("Ch\u1ec9 C\u1ea7n C\u00f3 V\u1eady"),
    content: "Anh th\u01b0\u01a1ng em nhi\u1ec1u l\u1eafm bi\u1ebft h\u00f4ng\nN\u00ean kh\u00f4ng th\u1ec3 th\u1ea3 bu\u00f4ng ra \u0111\u01b0\u1ee3c\nAnh bi\u1ebft bao kh\u00f3 kh\u0103n \u0111ang ch\u1edd ph\u00eda tr\u01b0\u1edbc\nS\u1ee3 chi em, d\u1eabu ch\u1ebft c\u0169ng vui l\u00f2ng\nB\u1edfi khi y\u00eau l\u00e0 d\u00e1m \u0111\u1ebfn v\u1edbi t\u1eadn c\u00f9ng\nN\u00ean m\u1edbi c\u00f3 tr\u0103m thi\u00ean t\u00ecnh s\u1eed\nAnh ch\u1ec9 mong, tr\u00f2n v\u00f2ng tay \u1ea5p \u1ee7\nCho t\u00ecnh y\u00eau th\u1eadt s\u1ef1 th\u0103ng hoa\nR\u1ed3i ng\u00e0y kia c\u00f3 v\u1ec1 c\u00f5i ta b\u00e0\nC\u0169ng th\u1ecfa nguy\u1ec7n: \u0110\u01b0\u1ee3c em y\u00eau, ch\u1ebft c\u01b0\u1eddi h\u1ea1nh ph\u00fac\nCu\u1ed9c s\u1ed1ng cho anh \u0111\u1ee7 \u0111\u1ea7y vinh nh\u1ee5c\nH\u00e0o quang, kh\u1ed1n kh\u00f3, xu\u1ed1ng ng\u1ef1a, l\u00ean xe\nM\u1ea5t d\u1ea7n \u0111i, gi\u00f3 cu\u1ed1n b\u1edd tre\nCh\u1ec9 c\u00f2n l\u1ea1i tr\u00e1i tim nh\u00e2n h\u1eadu\nCh\u1ec9 c\u00f2n l\u1ea1i t\u00ecnh qua y\u00eau b\u1eadu\nT\u1ea5m l\u00f2ng son b\u1ea7u m\u1edf r\u1ed9ng ch\u1edd qua\nH\u01b0\u01a1ng hoa th\u01a1m s\u01b0\u1edfi \u1ea5m l\u00f2ng ta\nCh\u1ec9 c\u1ea7n c\u00f3 v\u1eady, t\u00ecnh xa m\u00e0 g\u1ea7n.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Anh th\u01b0\u01a1ng em nhi\u1ec1u l\u1eafm bi\u1ebft h\u00f4ng\" v\u00e0 \"N\u00ean kh\u00f4ng th\u1ec3 th\u1ea3 bu\u00f4ng ra \u0111\u01b0\u1ee3c\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Ch\u1ec9 c\u1ea7n c\u00f3 v\u1eady, t\u00ecnh xa m\u00e0 g\u1ea7n.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "khoang-cach-vo-hinh",
    title: "Khoảng cách vô hình",
    tag: "Thơ tình",
    summary: "Nỗi nhớ dài theo một mối tình xa, nơi niềm tin được giữ lại giữa nhiều vết đau âm thầm.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 23/9/2018",
    cardImage: resolvePoemImageByTitle("Khoảng cách vô hình"),
    heroImage: resolvePoemImageByTitle("Khoảng cách vô hình"),
    content: "Nước mắt rơi vì đâu lên nỗi nhớ\nYêu thương nhiều nên hằn lại nỗi đau\nLúc mất nhau, biền biệt tâm hao\nTa vật vờ trong thương, trong nhớ\n\nRồi đến lúc “châu về hiệp phố”\nNgạch cửa cuộc đời chẳng thể bước qua\nBậu ơi! Qua không là người quen thói trăng hoa\nQua tim Bậu phải đâu mê tình ái\n\nVì nhớ mãi tình yêu thời thơ dại\nMột bóng hình, hương sắc một loài hoa\nChỉ mong sao Bậu hiểu tình Qua\nBiết có kẻ yêu xa vì Bậu\n\nBậu ơi!\nQua yêu Bậu, yêu nhiều đến nỗi\nViết bài thơ, chính Bậu nàng thơ\nLúc đêm về không còn thấy bơ vơ\nLòng ấm lại bởi một lời an ủi\n\nQua tin vào số duyên may rủi\nMặc cho đời sóng gió đẩy đưa\nNước mắt rơi không phải để tiễn đưa\nMà vì bởi có niềm tin vững chắc\n\nHi vọng lắm và tin đời không phụ bạc\nCũng như Bậu không nỡ lòng...\n... bỏ mặc, quên Qua.",
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đi từ day dứt chia xa sang một niềm tin bền bỉ vào duyên phận và sự chờ đợi.",
      standoutImages: "Nước mắt, ngạch cửa cuộc đời và hình bóng người thương tạo nên không gian vừa gần vừa xa.",
      meaning: "Khoảng cách ở đây không chỉ là địa lý, mà là thử thách của lòng chung thủy và sức bền cảm xúc.",
      memorableLine: "Nước mắt rơi vì đâu lên nỗi nhớ",
    },
    imageResearch: {
      moodKeywords: ["mưa đêm", "xa cách", "cửa sổ mờ nước", "cánh hoa rơi"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=m%C6%B0a%20%C4%91%C3%AAm%20xa%20c%C3%A1ch%20c%E1%BB%ADa%20s%E1%BB%95%20m%E1%BB%9D%20n%C6%B0%E1%BB%9Bc%20c%C3%A1nh%20hoa%20r%C6%A1i", "https://unsplash.com/s/photos/m%C6%B0a%20%C4%91%C3%AAm"],
      recommendedScene: "Khung cửa mưa chiều, ánh đèn vàng nhẹ và một khoảng tối đủ sâu để gợi nỗi nhớ.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "hoa-luc-binh",
    title: "Hoa lục bình",
    tag: "Thơ quê hương",
    summary: "Hình ảnh lục bình tím gợi một mối tình lênh đênh nhưng vẫn giữ được sự thủy chung và trong sáng.",
    author: "Lê Dũng",
    locationDate: "Tân Phong, ngày 12/12/2018",
    cardImage: resolvePoemImageByTitle("Hoa lục bình"),
    heroImage: resolvePoemImageByTitle("Hoa lục bình"),
    content: "Đầu sông nước lớn, anh gặp em\nCuối sông, nước ròng ta mình gặp lại\nCon sông tưởng dài ai ngờ ngắn vậy\nEm lênh đênh không bến đỗ cho mình\n\nEm gửi tình qua mắt phượng lung linh\nTím chờ đợi, thủy chung bền chặt\nDẫu con nước đầy vơi, chiều xuôi, sáng ngược\nMang em đi, sông nước xoay vòng\n\nEm vẫn giữ lòng tấc dạ sáng trong\nĐể cho anh ngẩn ngơ ngẩn nỗi nhớ\nMỗi bận sang sông lục bình tím ngát\nTím tình yêu, tím cả sự ước mong\n\nBài thơ tình dẫu đã viết xong\nVẫn nhớ mãi hoa lục bình tim tím.",
    status: "published",
    analysis: {
      emotionFlow: "Cảm xúc trôi theo con nước, lúc gặp gỡ lúc xa nhau, nhưng vẫn bền chặt ở chiều sâu nội tâm.",
      standoutImages: "Sắc tím lục bình, dòng sông xuôi ngược và ánh mắt đợi chờ là những điểm chạm nổi bật.",
      meaning: "Bài thơ ví tình yêu như lục bình: mong manh trước dòng đời nhưng không mất đi bản sắc.",
      memorableLine: "Vẫn nhớ mãi hoa lục bình tim tím.",
    },
    imageResearch: {
      moodKeywords: ["lục bình tím", "sông nước miền Tây", "chiều buông", "thuyền nhỏ trên sông"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=l%E1%BB%A5c%20b%C3%ACnh%20t%C3%ADm%20s%C3%B4ng%20n%C6%B0%E1%BB%9Bc%20mi%E1%BB%81n%20T%C3%A2y%20chi%E1%BB%81u%20bu%C3%B4ng%20thuy%E1%BB%81n%20nh%E1%BB%8F%20tr%C3%AAn%20s%C3%B4ng", "https://unsplash.com/s/photos/l%E1%BB%A5c%20b%C3%ACnh%20t%C3%ADm"],
      recommendedScene: "Dòng sông chiều có cụm lục bình tím trôi nhẹ, ánh nắng cuối ngày phủ gam nâu ấm.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "em-mua-xuan-ve",
    title: "Em - mùa xuân về",
    tag: "Thơ mùa xuân",
    summary: "Bài thơ chan hòa sắc xuân quê nhà, đan giữa tình yêu đôi lứa và niềm vui thanh bình của đất nước.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 7/10/2019",
    cardImage: resolvePoemImageByTitle("Em - mùa xuân về"),
    heroImage: resolvePoemImageByTitle("Em - mùa xuân về"),
    content: "Em đã về cùng cánh én chao nghiêng\nMai thướt tha, sắc vàng óng ánh\nRực cháy tình yêu, hoa hồng tròn vành vạnh\nKhóm cúc dậy lên, đời no ấm muôn phần\nVạn thọ vàng, dáng phụ mẫu tri ân\nHuệ trắng đượm hương, dẫn lối về thương nhớ\nLộc biếc, chồi non, tràn trề nhựa sống\nCỏ cây xanh, vàng hoa trải chân trời\nEm yêu về, đâu chỉ có hoa thôi\nCòn tiếng chim gù gọi bạn\nTrao trảo kêu bầy, chuồi bồi vàng chín tới\nÁo dệt thêm hoa, mang đẹp đến cho đời\nMỗi gương mặt người ngời sáng nụ cười tươi\nĐất nước bình yên lòng người an yên thế!\nNhìn thật sâu đôi mắt huyền lung liếng\nRạng ngời lên xao xuyến lòng người\n\nEm là em: Hồng, Lan, Mai, Huệ, Cúc\nMang đến cho anh những háo hức rất đời\nEm là em: Xuân của đất trời\nEm về đến làng quê vui mở hội\nMột năm thôi mà rất nhiều thay đổi\nBình dị đơn sơ, sao khách ngẩn ngơ lòng?\nĐiện giăng dây như khuôn nhạc kể đồng\nNgười người hát khúc ca mừng mùa xuân đến\nĐời thanh bình, nhà nhà no ấm\nHạnh phúc trong tay, đâu phải đi tìm\nEm yêu ơi, nắm chặt tay anh\nVề nhà văn hóa đón giao thừa trẩy hội\nDành phút tâm linh, bái Phật thiền môn\nCầu cho quốc thái, dân yên\nCầu đất nước nhà nhà phồn thịnh\nEm của anh, đóa hoa xuân đã nở\nCài tim anh, rạng rỡ một đời\nĐón em về, đón cả đất trời\nĐón đất nước với mùa xuân đẹp lạ.",
    status: "published",
    analysis: {
      emotionFlow: "Mạch thơ mở ra rộn ràng, tươi sáng, rồi lắng lại ở tình yêu và lời cầu mong bình an.",
      standoutImages: "Cánh én, mai vàng, hoa cúc, tiếng chim và không khí hội làng tạo nên bức tranh xuân đầy sức sống.",
      meaning: "Mùa xuân trong bài thơ là biểu tượng của đoàn tụ, yêu thương và niềm tin vào một năm mới tốt lành.",
      memorableLine: "Em là em: Xuân của đất trời",
    },
    imageResearch: {
      moodKeywords: ["mùa xuân quê nhà", "hoa nở", "nắng mới", "không khí Tết nhẹ"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=m%C3%B9a%20xu%C3%A2n%20qu%C3%AA%20nh%C3%A0%20hoa%20n%E1%BB%9F%20n%E1%BA%AFng%20m%E1%BB%9Bi%20kh%C3%B4ng%20kh%C3%AD%20T%E1%BA%BFt%20nh%E1%BA%B9", "https://unsplash.com/s/photos/m%C3%B9a%20xu%C3%A2n%20qu%C3%AA%20nh%C3%A0"],
      recommendedScene: "Con đường làng sáng nắng sớm, hoa nở rải ven đường và không khí hội xuân bình dị.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "em-trong-anh",
    title: "Em trong anh",
    tag: "Thơ tình",
    summary: "Một bản tình thơ nồng nàn, nơi người thương hiện lên như hương sắc không thể tách rời trong tim.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 21/8/2019",
    cardImage: resolvePoemImageByTitle("Em trong anh"),
    heroImage: resolvePoemImageByTitle("Em trong anh"),
    content: "Em hiện hiện trong anh như đóa hoa\nHương sắc ngát ngây khi nhìn ngắm\nThầm nhớ nhung trong giấc ngủ đêm dài\nAnh khát thèm em trong mơ đêm nay\nBao mơ nữa trong những ngày còn lại.\n\nBởi tình yêu ngụt cháy trong lòng\nMơ gặp em trong vòng tay ân ái\nNụ cười yêu đốt cháy môi hồng\nAnh chơi vơi trong mắt em diễm lệ.\n\nEm ngả nghiêng theo khúc hát ru tình\nAnh thấy mình đang ở giữa rừng xanh\nChỉ có em với hoa thơm cùng bướm\nMình hòa vào nhau, không thể tách rời.\n\nTa yêu nhau quên cả đất trời\nĐể vần thơ tình yêu xuất hiện\nCấu vào tim, rưng rức nhớ thương\nNhư sóng xô, dồn lên phía trước.\n\nThúc giục về mau, em tựa cửa chờ\nKhông biết bây giờ là tình hay mơ\nHương thịt da em thơm từng hơi thở\nNgả nghiêng say anh quên tuổi tên mình\nThèm gối đầu lên ngực em ngọt mịn giấc mơ\nThèm hôn em ấm mềm môi rực cháy\nMặc gió mưa, bão tố đầy trời.",
    status: "published",
    analysis: {
      emotionFlow: "Từ nhớ thương đến khát khao gần gũi, cảm xúc được đẩy dần lên bằng nhịp thơ thiết tha.",
      standoutImages: "Đóa hoa, rừng xanh, bướm và giấc mơ đêm tạo lớp hình ảnh mộng và thực giao thoa.",
      meaning: "Bài thơ cho thấy tình yêu như một vùng ký ức sống động, vừa dịu dàng vừa cháy bỏng.",
      memorableLine: "Ta yêu nhau quên cả đất trời",
    },
    imageResearch: {
      moodKeywords: ["hương hoa", "mềm dịu", "gần gũi", "mơ đêm"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=h%C6%B0%C6%A1ng%20hoa%20m%E1%BB%81m%20d%E1%BB%8Bu%20g%E1%BA%A7n%20g%C5%A9i%20m%C6%A1%20%C4%91%C3%AAm", "https://unsplash.com/s/photos/h%C6%B0%C6%A1ng%20hoa"],
      recommendedScene: "Vườn hoa tối nhẹ, ánh đèn vàng mờ và những khoảng tối mềm để gợi chiều sâu cảm xúc.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "anh-yeu-em",
    title: "Anh yêu em",
    tag: "Thơ tình",
    summary: "Lời yêu mộc mạc nhưng quyết liệt, nói về sự gắn bó trọn đời qua những hình ảnh đời thường chân chất.",
    author: "Lê Dũng",
    locationDate: "Tân Phong, ngày 15/12/2018",
    cardImage: resolvePoemImageByTitle("Anh yêu em"),
    heroImage: resolvePoemImageByTitle("Anh yêu em"),
    content: "Anh yêu em tình yêu tha thiết\nVòng tay ôm vóc ngọc, dáng ngà\nEm thon thả, đường cong mềm mại\nAnh đò theo mê mẩn cả một đời\n\nHương hoa ấy theo anh từ thuở ấy\nHoa chẳng tàn phai, hương chẳng nhạt nhòa\nGiữ em trong tay, lo em là sương khói\nXa em thì nhớ, sợ em buồn mắt ủ, mày chau\nAi có ba-lô ba gang? Bán cho tôi với\nTôi cõng em trên lưng, đi hết cả cuộc đời.",
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ giữ nhịp trực diện, chân thành, đi thẳng vào cảm giác thương nhớ và mong được chở che.",
      standoutImages: "Vòng tay ôm, hương hoa và hình ảnh cõng nhau qua đời tạo dấu ấn mộc mà đậm.",
      meaning: "Tình yêu trong bài thơ không bóng bẩy, mà là lời hứa đồng hành bền bỉ giữa đời thường.",
      memorableLine: "Tôi cõng em trên lưng, đi hết cả cuộc đời.",
    },
    imageResearch: {
      moodKeywords: ["tình yêu chân chất", "thơ tình mộc", "ấm áp", "nhẹ nhàng"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=t%C3%ACnh%20y%C3%AAu%20ch%C3%A2n%20ch%E1%BA%A5t%20th%C6%A1%20t%C3%ACnh%20m%E1%BB%99c%20%E1%BA%A5m%20%C3%A1p%20nh%E1%BA%B9%20nh%C3%A0ng", "https://unsplash.com/s/photos/t%C3%ACnh%20y%C3%AAu%20ch%C3%A2n%20ch%E1%BA%A5t"],
      recommendedScene: "Con đường quê chiều muộn với hai bóng người đi cạnh nhau trong ánh nắng nâu ấm.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "nho",
    title: "Nhớ",
    tag: "Thơ ký ức",
    summary: "Chỉ vài câu ngắn nhưng chạm vào nỗi nhớ sâu, về một mái nhà chung đã từng được mơ tới.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, 01/01/2018",
    cardImage: resolvePoemImageByTitle("Nhớ"),
    heroImage: resolvePoemImageByTitle("Nhớ"),
    content: "Giữa trăm người ta vẫn nhận ra nhau\nMơ có lúc ta về chung nhà sớm tối\nChăm chút cho nhau lúc nhức đầu sổ mũi\nAn ủi nhau lúc buồn vui, hờn dỗi\nVậy thôi mà, vọng hỏi trời cao\nCác cố chi đùa giỡn với nhau\nCho nỗi nhớ đầy lên thành nước mắt.",
    status: "published",
    analysis: {
      emotionFlow: "Nhịp thơ ngắn, dồn nén, chuyển từ mơ ước bình yên sang nghẹn ngào khi thực tại chia cách.",
      standoutImages: "Giữa trăm người, mái nhà chung và nước mắt là những hình ảnh vừa giản dị vừa ám ảnh.",
      meaning: "Bài thơ cho thấy nỗi nhớ bắt đầu từ những điều rất đời thường nhưng để lại dư vị rất lâu.",
      memorableLine: "Cho nỗi nhớ đầy lên thành nước mắt.",
    },
    imageResearch: {
      moodKeywords: ["bến sông chiều", "đường quê mờ nắng", "hoàng hôn miền Tây", "người chờ trong ký ức"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=b%E1%BA%BFn%20s%C3%B4ng%20chi%E1%BB%81u%20%C4%91%C6%B0%E1%BB%9Dng%20qu%C3%AA%20m%E1%BB%9D%20n%E1%BA%AFng%20ho%C3%A0ng%20h%C3%B4n%20mi%E1%BB%81n%20T%C3%A2y%20ng%C6%B0%E1%BB%9Di%20ch%E1%BB%9D%20trong%20k%C3%BD%20%E1%BB%A9c", "https://unsplash.com/s/photos/b%E1%BA%BFn%20s%C3%B4ng%20chi%E1%BB%81u"],
      recommendedScene: "Bến sông chiều vắng, nền trời vàng nhạt và một bóng người đứng lặng nhìn xa.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "tieng-keu-chim-le-ban",
    title: "Tiếng kêu chim lẻ bạn",
    tag: "Thơ đêm",
    summary: "Một tiếng gọi cô độc giữa đêm sông nước, nơi ánh trăng trở thành dấu hiệu để tìm lại nhau.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 16/01/20...",
    cardImage: resolvePoemImageByTitle("Tiếng kêu chim lẻ bạn"),
    heroImage: resolvePoemImageByTitle("Tiếng kêu chim lẻ bạn"),
    content: "Mỗi phút đi qua, một phút chạnh lòng\nSầu cô độc, buồn chim lẻ bạn\nGiận tạo hóa trêu người trần thế\nLỡ chuyến đò chiều biết tạm nương đâu\nTrở về ư? Đường xa ngái mịt mù\nĐi tiếp ư? Sông ngăn phía trước\nĐêm nay một mình ta chiếc bóng\nNgắm trăng lên, nhìn nước trôi xuôi\nLấy mảnh trăng vắt ở trên vai\nLàm dấu để tìm nhau mình nhé\nÁnh trăng sẽ theo anh bây giờ và kiếp nữa\nKiếp lai sinh dù lạc lối cũng đi tìm\nÁnh trăng ở đâu, mình tìm nhau ở đó\nĐố đừng để như chiều nay, chim lẻ bạn kêu buồn.",
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đậm chất chia ly, gấp gáp giữa ngã rẽ đi - về, rồi neo lại ở lời hẹn kiếp sau.",
      standoutImages: "Trăng, dòng nước trôi xuôi, chiếc bóng đơn và tiếng chim lẻ bạn dựng nên không gian cô tịch.",
      meaning: "Nỗi buồn trong bài không bế tắc, vì vẫn giữ một niềm tin mong gặp lại qua dấu trăng.",
      memorableLine: "Ánh trăng ở đâu, mình tìm nhau ở đó",
    },
    imageResearch: {
      moodKeywords: ["trăng trên sông", "đêm cô tịch", "chim lẻ bóng", "nước trôi và ánh trăng"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=tr%C4%83ng%20tr%C3%AAn%20s%C3%B4ng%20%C4%91%C3%AAm%20c%C3%B4%20t%E1%BB%8Bch%20chim%20l%E1%BA%BB%20b%C3%B3ng%20n%C6%B0%E1%BB%9Bc%20tr%C3%B4i%20v%C3%A0%20%C3%A1nh%20tr%C4%83ng", "https://unsplash.com/s/photos/tr%C4%83ng%20tr%C3%AAn%20s%C3%B4ng"],
      recommendedScene: "Dòng sông đêm ánh bạc, một vệt trăng trên mặt nước và không gian rất tĩnh.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "ngang-ben-song-xua",
    title: "Ngang bến sông xưa",
    tag: "Thơ hoài niệm",
    summary: "Đi ngang bến cũ để đối diện tình dang dở, bài thơ là tiếng gọi nghẹn ngào của một đời tình si.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, chiều mưa 22/6/07",
    cardImage: resolvePoemImageByTitle("Ngang bến sông xưa"),
    heroImage: resolvePoemImageByTitle("Ngang bến sông xưa"),
    content: "Dòng sông trôi hay lục bình trôi\nVề đâu mà thong dong, nhàn nhã\nMiền hạ có chi mà cứ xuôi về?\nCho theo với, còn gần - xa nữa\nỞ nơi này, buồn quá đi thôi\nPhía xa kia, chấp chới cánh chim trời\nĐò đưa khách sang sông chiều lặng lẽ\nMưa giăng giăng, gió xô ngả rặng bần già\nTự hỏi mình: Đừng ngắm dòng sông\nLục bình trôi, mưa giăng, gió giật\nThả theo dòng, nước chảy, gió trôi\nHay về thôi, chiều muộn lắm rồi\nAi chờ đợi, sao ai đi đâu xa biệt\nCúm núm kêu, da diết, bồi hồi\n\nThương một đời chìm nổi, dạt trôi\nThương người cũ mà tình thì không cũ\nNgười già đi tình mãi không già\nBởi yêu người nên yêu lắm loài hoa\nLúc xa cách, nhìn hoa nguôi thương nhớ\nChiều nay về quê, ngang qua dòng sông cũ\nBến nước xưa, giờ mất dạng đâu rồi\nEm ở nơi nao, gần đây hay thiệt xa xôi\nThương lắm em ơi tình yêu dang dở\nTiếng gọi đò ơi... Ngỡ ngẩn\n- Gọi gì?\nThương cho đời một gã tình si\nSao ngây dại đến là tội nghiệp.",
    status: "published",
    analysis: {
      emotionFlow: "Mạch thơ lửng lơ theo con nước, rồi dồn lại thành tiếc nuối khi đứng trước bến xưa đổi khác.",
      standoutImages: "Lục bình trôi, bến đò cũ, mưa giăng và tiếng gọi đò làm nổi rõ nỗi buồn miền sông nước.",
      meaning: "Bài thơ đặt người đọc trước câu hỏi về thời gian: cảnh còn đó nhưng người xưa đã xa.",
      memorableLine: "Thương cho đời một gã tình si",
    },
    imageResearch: {
      moodKeywords: ["bến đò cũ", "sông quê", "lục bình trôi", "buổi chiều cũ miền sông nước"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=b%E1%BA%BFn%20%C4%91%C3%B2%20c%C5%A9%20s%C3%B4ng%20qu%C3%AA%20l%E1%BB%A5c%20b%C3%ACnh%20tr%C3%B4i%20bu%E1%BB%95i%20chi%E1%BB%81u%20c%C5%A9%20mi%E1%BB%81n%20s%C3%B4ng%20n%C6%B0%E1%BB%9Bc", "https://unsplash.com/s/photos/b%E1%BA%BFn%20%C4%91%C3%B2%20c%C5%A9"],
      recommendedScene: "Bến đò cũ dưới mưa nhẹ, gam nâu trầm và một chiếc đò neo lặng ở xa.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "them",
    title: "Thêm",
    tag: "Thơ đêm",
    summary: "Một bản tình ca đêm trăng với nỗi nhớ càng thêm dày, càng thêm sâu qua từng nhịp thơ.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 12 giờ đêm, 5/3/2020",
    cardImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format\u0026fit=crop\u0026w=1200\u0026q=80",
    heroImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format\u0026fit=crop\u0026w=1600\u0026q=80",
    content: "Thêm nghe con nước vỗ bờ\nBóng bần rơi nhẹ, thẫn thờ dòng sông\nThêm nhìn đom đóm kết vòng\nMột miền sông nước bềnh bồng ngọc châu\nVẳng nghe thánh thót đàn bầu\nMênh mông câu hát, cung sầu cung thương\nNhìn trăng mà nhớ mà thương\nGởi theo con gió lời thương, ngọt ngào\nEm ơi trăng ở trên cao\nTrăng còn hiểu được vì sao anh buồn\nTrăng mang chín nhớ mười thương\nNhuộm má thêm mịn, môi hồng thêm thơm\nThèm gối đầu lên tay em\nXông hương tóc, khát thèm trần dáng\nĐêm nay anh gởi theo trăng\nTám thương, chín nhớ, mười mong cận kề\nTrăng ơi gởi cả lời thề\nMãi thương mãi nhớ, mãi chờ mãi mong.",
    status: "published",
    analysis: {
      emotionFlow: "Cảm xúc đi theo phép cộng của nhớ thương: càng nghe, càng nhìn, càng khao khát gần nhau.",
      standoutImages: "Con nước vỡ bờ, đom đóm, đàn bầu và ánh trăng là chuỗi hình ảnh vừa dân dã vừa mộng mị.",
      meaning: "Bài thơ làm rõ sự bền bỉ của tình yêu: nhớ không giảm theo thời gian mà mỗi lúc một đầy.",
      memorableLine: "Mãi thương mãi nhớ, mãi chờ mãi mong.",
    },
    imageResearch: {
      moodKeywords: ["con nước vỡ bờ", "đom đóm", "đêm trăng", "nỗi nhớ người thương"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=con%20n%C6%B0%E1%BB%9Bc%20v%E1%BB%A1%20b%E1%BB%9D%20%C4%91om%20%C4%91%C3%B3m%20%C4%91%C3%AAm%20tr%C4%83ng%20n%E1%BB%97i%20nh%E1%BB%9B%20ng%C6%B0%E1%BB%9Di%20th%C6%B0%C6%A1ng", "https://unsplash.com/s/photos/con%20n%C6%B0%E1%BB%9Bc%20v%E1%BB%A1%20b%E1%BB%9D"],
      recommendedScene: "Đêm sông có đom đóm và ánh trăng non, không gian mở nhưng vẫn giữ nét riêng tư.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  }
];

export const featuredPoem = poems.find((item) => item.status === "published") ?? poems[0];

export const publishedPoems = poems.filter((item) => item.status === "published");

export function getPoemBySlug(slug: string) {
  return poems.find((item) => item.slug === slug);
}
