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

  return "/images/4.webp";
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
    content: "C\u00f3 m\u1ed9t con thuy\u1ec1n d\u1ecdc\\nCh\u1edf nh\u1eefng chuy\u1ebfn h\u00e0ng \u0111i\\nCh\u1edf bao ni\u1ec1m m\u01a1 \u01b0\u1edbc\\nC\u1ee7a n\u00f4ng d\u00e2n, th\u00e1ng ng\u00e0y\\nCon \u0111\u00f2 d\u1ecdc quen th\u1ea5y\\nCh\u1ea1y tr\u00ean d\u00f2ng s\u00f4ng n\u00e0y\\nCon \u0111\u00f2 trong l\u00f2ng anh\\nCh\u1ea1y tr\u00ean d\u00f2ng th\u01b0\u01a1ng nh\u1edb\\nCh\u1edf \u0111\u1ea7y bao y\u00eau th\u01b0\u01a1ng\\n\u0110i t\u00ecm em b\u1ebfn \u0111\u1ed7\\nSao m\u1ecbt m\u00f9 h\u01b0\u1edbng ph\u01b0\u01a1ng\\nTh\u01b0\u01a1ng chi\u1ebfc thuy\u1ec1n xu\u00f4i d\u00f2ng c\u00f4 \u0111\u1ed9c\\nKh\u00e1ch th\u01b0\u01a1ng h\u1ed3 g\u1ea1o ch\u1ee3, n\u01b0\u1edbc s\u00f4ng\\nTh\u01b0\u01a1ng anh t\u00ecnh m\u00e3i long \u0111ong\\nEm \u01a1i b\u1ebfn \u0111\u1eadu...\\nEm \u01a1i b\u1ebfn \u0111\u1eadu...\\nCho anh \u0111\u1eadu c\u00f9ng.",
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
    content: "Anh \u0111\u00e3 h\u00f4n l\u00ean b\u00e0n tay \u1ea5y\\nN\u00ean bi\u1ebft tay m\u1ec1m, \u1ea5m d\u01b0\u1eddng n\u00e0o\\nBao \u0111\u00eam ve vu\u1ed1t, ru anh ng\u1ee7\\nB\u1ea5y d\u1ecbu d\u00e0ng t\u1eeb \u1ea5y lan \u0111i\\nKhi g\u1ed1i \u0111\u1ea7u l\u00ean b\u00e0n tay nh\u1ecf nh\u1eafn\\nNghe \u00f9a v\u1ec1: H\u1ea1nh ph\u00fac, tin y\u00eau\\nNh\u1eefng s\u1edbm mai, trong l\u00f2ng hoa n\u1edf\\nV\u1eefng v\u00e0ng \u0111i, d\u1eabu m\u01b0a gi\u00f3 tr\u00e1i m\u00f9a\\nNh\u00e0 l\u00e0 n\u01a1i v\u1ec1 sau h\u00e0nh tr\u00ecnh v\u1ea5t v\u1ea3\\nV\u00f2ng tay em, s\u01b0\u1edfi \u1ea5m l\u00f2ng anh\\nEm bi\u1ebft h\u00f4ng, anh th\u01b0\u01a1ng nhi\u1ec1u l\u1eafm \u0111\u00f3\\nNh\u1eefng b\u00fap m\u0103ng, c\u0169ng c\u00f2i l\u1ea1 k\u1ef3\\nD\u1ecbu t\u00ecnh ta th\u0103ng hoa h\u1ea1nh ph\u00fac\\nD\u1eabu \u0111\u01b0\u1eddng c\u00f3 g\u1eadp gh\u1ec1nh ta v\u1eabn b\u01b0\u1edbc \u0111i\\nAnh gi\u1eef m\u00e3i h\u01a1i \u1ea5m b\u00e0n tay \u1ea5y\\nHoa mai v\u00e0ng tr\u00ean th\u1ea3m c\u1ecf xanh t\u01b0\u01a1i.",
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
    content: "Anh n\u00e2ng niu \u0111\u1eb7t em v\u00e0o b\u00ecnh pha-l\u00ea\\nSay s\u01b0a ng\u1eafm em, t\u1ecfa h\u01b0\u01a1ng khoe s\u1eafc\\nH\u01b0\u01a1ng hoa hu\u1ec7 \u0111\u00e2u nh\u1eb9 nh\u00e0ng, \u0111\u1eb1m th\u1eafm\\nM\u00e0 gi\u1eef h\u1ed3n \u1ee7 \u1ea5m l\u00f2ng anh\\nC\u1ea3 m\u1ed9t th\u1eddi em c\u00f3 bi\u1ebft kh\u00f4ng\\nAnh say h\u01b0\u01a1ng hoa, y\u00eau nh\u00e0nh hu\u1ec7 tr\u1eafng\\nCh\u1ec9 l\u00e0 hoa th\u00f4i sao anh \u201csay n\u1eafng\u201d?\\nS\u1eafc v\u00e0 h\u01b0\u01a1ng c\u0169ng b\u00ecnh d\u1ecb \u0111\u1eddi th\u01b0\u1eddng\\nC\u00f9ng s\u1edbm chi\u1ec1u tho\u1ea3ng nh\u1eb9 s\u1eafc, h\u01b0\u01a1ng\\nAi \u0111\u00e2u bi\u1ebft s\u1eafc, h\u01b0\u01a1ng v\u1eabn v\u01b0\u01a1ng n\u1ed7i nh\u1edb\\nCh\u00e1y l\u00f2ng anh, m\u1ed9t g\u00e3 si t\u00ecnh\\nAnh lang thang qua v\u00f9ng c\u00f3 v\u00e0 kh\u00f4ng\\n\u0110\u1ec3 b\u1ea5t ch\u1ee3t g\u1eb7p h\u1eb9n h\u00f2 n\u0103m c\u0169\\nEm nh\u00ecn anh ch\u01b0a bao gi\u1edd l\u1ea1\\n\u00d4i \u0111\u1eb1m chi\u00eau xuy\u00ean th\u1ea5u tr\u00e1i tim n\u00e0y\\nThi\u00ean \u0111\u01b0\u1eddng anh b\u00e0y s\u1eb5n trong tim \u0111\u00e2y\\nCh\u1edd em \u0111\u1ebfn, v\u1ec1 v\u1edbi anh hu\u1ec7 nh\u00e9.",
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
    content: "Ng\u1ee1 ch\u1ebft r\u1ed3i t\u00ecnh y\u00eau ch\u00e1y b\u1ecfng\\nTu\u1ed5i b\u1ed1n m\u01b0\u01a1i qua n\u1eeda \u0111\u1eddi ng\u01b0\u1eddi\\nThui th\u1ee7i b\u01b0\u1edbc d\u1ecdc \u0111\u01b0\u1eddng gi\u00f3 b\u1ee5i\\nC\u1ed9i c\u00fac gi\u00e0 b\u1ed7ng n\u1edf \u0111\u00f3a v\u00e0ng t\u01b0\u01a1i\\nAnh \u0111em m\u00f9a xu\u00e2n \u0111\u1ebfn b\u00ean em\\nX\u1edbi tung th\u1ea3m l\u1eb7ng n\u1ea5p b\u00ean th\u1ec1m\\nMang n\u1eafng \u1ea5m s\u01b0\u1edfi h\u1ed3n hoang l\u1ea1nh\\nN\u1ee5 h\u00f4n d\u00e0i th\u00f4i th\u00fac h\u1ed3n xu\u00e2n\\nCho m\u00f4i h\u1ed3ng r\u1ea1ng r\u1ee1 n\u1ee5 c\u01b0\u1eddi t\u01b0\u01a1i\\n\u0110\u1ec3 m\u1eaft bi\u1ebfc s\u00f3ng t\u00ecnh d\u1ed3n d\u00e3\\n\u0110\u1ebfn b\u00e2y gi\u1edd em m\u1edbi hi\u1ec3u ra\\nT\u00ecnh y\u00eau \u0111\u00e2u xa l\u01a1 xa l\u1eafc\\nM\u1ed9t ch\u00fat ki\u1ec3u k\u1ef3 hoa d\u1ea1i h\u00e9o h\u1eaft\\nM\u1ed9t ch\u00fat \u201cd\u1ed7i\u201d th\u00f4i h\u1ea1nh ph\u00fac \u0111\u00e2m ch\u1ed3i\\nHai n\u1eeda g\u1eb7p nhau \u0111\u01a1m \u0111\u1ea7y h\u01b0\u01a1ng hoa l\u1ea1\\nKh\u00f4ng t\u00ecnh y\u00eau \u0111\u1eddi nh\u1ea1t nh\u1ebdo \u0111\u01a1n c\u00f4i.\\n\\n12/6/1999",
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
    content: "M\u1ed9t ph\u00fat th\u00f4i l\u00e0m c\u1ea3 \u0111\u1eddi v\u01b0\u01a1ng v\u1ea5n\\nB\u1eaft g\u1eb7p em c\u01b0\u1eddi... \u00d4i \u0111\u00f4i m\u1eaft lung linh\\nR\u0103ng kh\u1ec3nh kia l\u00e0m r\u1ec9 m\u00e1u tim m\u00ecnh\\nBao \u0111\u00eam th\u1ee9c v\u00e0 c\u1ea3 \u0111\u1eddi tr\u0103n tr\u1edf\\nAnh \u0111i t\u00ecm em... C\u1ea3 m\u1ed9t tr\u1eddi th\u01b0\u01a1ng nh\u1edb\\nV\u00f4 v\u1ecdng h\u00e3o huy\u1ec1n v\u1eabn m\u00e3i g\u1eafng \u0111i t\u00ecm\\nEm c\u00f3 trong \u0111\u1eddi? L\u00e0 ch\u1eafc ch\u1eafn c\u00f3 trong tim\\nD\u1eabu em c\u00f3 c\u00f2n... hay h\u00ecnh nh\u01b0 em \u0111\u00e3...\\nAnh v\u1eabn t\u00ecm em, nh\u01b0 anh t\u1eebng \u0111\u00e3\\nL\u1ea7n d\u1ea5u nh\u00e2n gian... L\u1ea7n theo c\u1ea3 cu\u1ed9c \u0111\u1eddi.\\n\\n4/9/2018",
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
    content: "M\u1ed9t \u0111\u00f3a hoa: V\u00e0o \u0111\u1ed9 m\u00e3n khai\\nCh\u1ec9 ng\u1eafm th\u00f4i, \u0111\u00e3 th\u1ed5n th\u1ee9c \u0111\u00eam d\u00e0i\\nEm ... c\u1ea3 tr\u1eddi m\u1ed9ng m\u1ecb\\nAnh kh\u00f4ng c\u00f2n g\u00ec, ngo\u00e0i k\u1ebb t\u00ecnh si\\nC\u00e1nh b\u01b0\u1edbm d\u1eebng bay, l\u1ee5y \u0111\u00f3a hoa xinh\\nHoa \u01a1i, b\u01b0\u1edbm \u0111\u00e2u l\u00e0 k\u1ebb \u0111a t\u00ecnh\\nB\u01b0\u1edbm \u0111\u00e3 t\u00ecm hoa gi\u1eefa ng\u00e0n c\u00e1nh gi\u00f3\\nX\u00f4 \u0111\u1ea9y, d\u1eadp v\u00f9i b\u01b0\u1edbm m\u1ecfi g\u1ed1i, ch\u1ed3n ch\u00e2n\\n\u0110\u1ec3 b\u00e2y gi\u1edd hoa r\u1ef1c s\u1eafc m\u00f9a xu\u00e2n\\n\u0110\u1ec3 b\u00e2y gi\u1edd b\u01b0\u1edbm l\u01b0\u1ee3n say t\u00ecnh y\u00eau v\u0169 kh\u00fac\\nEm \u01a1i h\u00e3y c\u01b0\u1eddi cho hoa khoe ngh\u00ecn s\u1eafc\\nCho k\u1ebb si t\u00ecnh ch\u1ebft gi\u1eefa h\u1ed3 thu.",
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
    content: "Anh \u0111i t\u00ecm em lo\u00e0i hoa hu\u1ec7 tr\u1eafng\\nTho\u1ea3ng h\u01b0\u01a1ng th\u00f4i m\u00e0 n\u1ed3ng \u1ea5m l\u1ea1 k\u1ef3\\nH\u01a1n ba m\u01b0\u01a1i n\u0103m r\u1ed3i, gi\u1eefa cu\u1ed9c chia ly\\nL\u00f2ng t\u01a1 t\u01b0\u1edfng, th\u01b0\u01a1ng th\u01b0\u01a1ng, nh\u1edb nh\u1edb\\n\u0110\u1eddi v\u00f4 th\u01b0\u1eddng ai m\u00e0 bi\u1ebft tr\u01b0\u1edbc\\nCh\u1ec9 \u0111\u1ecbnh ninh: V\u00ec y\u00eau l\u1eafm \u0111\u00f3 m\u00e0\\nN\u00e0o bi\u1ebft \u0111\u00e2u khi t\u00ecnh \u0111\u00e3 \u0111i xa\\nMu\u1ed1n ngo\u00e1i l\u1ea1i, ng\u0103n ng\u1eafn, v\u1ea1n c\u00e1ch\\nTh\u00f4i em c\u1ed1 cho anh v\u00e0i kh\u1eafc\\nN\u00f3i h\u1ebft l\u00f2ng anh: Em nh\u1eadn - ch\u1ed1i t\u1eeb\\nC\u0169ng \u0111\u00e0nh th\u00f4i, b\u1edfi ph\u1eadn ph\u01b0\u1edbc k\u00e9m tu\\nDuy\u00ean v\u1edbi s\u1ed1, \u0111\u00e0nh m\u1ed9t \u0111\u1eddi dang d\u1edf\\n\u00c9n b\u1eafc, nh\u1ea1n nam chi\u1ec1u thu \u1ee7 r\u0169\\nTh\u01b0\u01a1ng ng\u01b0\u1eddi x\u01b0a, nh\u1edb h\u01b0\u01a1ng hu\u1ec7 tr\u1eafng, b\u1ea1c \u0111\u1ea7u.",
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
    content: "Gi\u00f3 xu\u00e2n d\u1ecbu d\u00e0ng mang \u0111i\\nNh\u1eefng \u0111i\u1ec1u anh ch\u01b0a th\u1ec3 n\u00f3i\\nHoa c\u00fac v\u1ea5n v\u01b0\u01a1ng th\u00e1ng Gi\u00eang\\nMai v\u00e0ng, l\u00e1 xanh l\u1ed9c bi\u1ebfc\\nHu\u1ec7 tr\u1eafng cho d\u1ea1 b\u00ecnh y\u00ean\\nT\u00ecnh anh nh\u01b0 x\u01b0a: D\u1ecbu d\u00e0ng\\nGi\u00f3 mang xu\u00e2n v\u1ec1 ph\u00eda em\\nMang l\u1eddi t\u1ecf t\u00ecnh anh g\u1eedi\\nTu\u1ed5i hai m\u01b0\u01a1i gi\u0103ng \u0111\u01b0\u1eddng thu\u1edf \u0111\u00f3\\nT\u00e0 \u00e1o em bay, nghi\u00eang ng\u1ea3 h\u1ed3n anh\\nTu\u1ed5i xanh \u0111i qua, t\u00e0 \u00e1o bay ho\u00e0i th\u01b0\u01a1ng nh\u1edb\\nEm ch\u1eb3ng khi n\u00e0o qu\u00ean \u00e1nh m\u1eaft anh\\nAnh kh\u00f4ng th\u1ec3 qu\u00ean chi\u1ebfc r\u0103ng kh\u1ec3nh \u1ea5y\\nAnh kh\u00f4ng th\u1ec3 qu\u00ean su\u1ed1i t\u00f3c b\u1ed3ng b\u1ec1nh\\nEm \u01a1i h\u00e3y nghe ti\u1ebfng y\u00eau trong gi\u00f3\\nQua mi\u1ec1n th\u01b0\u01a1ng nh\u1edb, c\u1ecf d\u1ea1i sao c\u1ee9 qu\u1ea5n.",
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
    content: "Anh th\u01b0\u01a1ng em nhi\u1ec1u l\u1eafm bi\u1ebft h\u00f4ng\\nN\u00ean kh\u00f4ng th\u1ec3 th\u1ea3 bu\u00f4ng ra \u0111\u01b0\u1ee3c\\nAnh bi\u1ebft bao kh\u00f3 kh\u0103n \u0111ang ch\u1edd ph\u00eda tr\u01b0\u1edbc\\nS\u1ee3 chi em, d\u1eabu ch\u1ebft c\u0169ng vui l\u00f2ng\\nB\u1edfi khi y\u00eau l\u00e0 d\u00e1m \u0111\u1ebfn v\u1edbi t\u1eadn c\u00f9ng\\nN\u00ean m\u1edbi c\u00f3 tr\u0103m thi\u00ean t\u00ecnh s\u1eed\\nAnh ch\u1ec9 mong, tr\u00f2n v\u00f2ng tay \u1ea5p \u1ee7\\nCho t\u00ecnh y\u00eau th\u1eadt s\u1ef1 th\u0103ng hoa\\nR\u1ed3i ng\u00e0y kia c\u00f3 v\u1ec1 c\u00f5i ta b\u00e0\\nC\u0169ng th\u1ecfa nguy\u1ec7n: \u0110\u01b0\u1ee3c em y\u00eau, ch\u1ebft c\u01b0\u1eddi h\u1ea1nh ph\u00fac\\nCu\u1ed9c s\u1ed1ng cho anh \u0111\u1ee7 \u0111\u1ea7y vinh nh\u1ee5c\\nH\u00e0o quang, kh\u1ed1n kh\u00f3, xu\u1ed1ng ng\u1ef1a, l\u00ean xe\\nM\u1ea5t d\u1ea7n \u0111i, gi\u00f3 cu\u1ed1n b\u1edd tre\\nCh\u1ec9 c\u00f2n l\u1ea1i tr\u00e1i tim nh\u00e2n h\u1eadu\\nCh\u1ec9 c\u00f2n l\u1ea1i t\u00ecnh qua y\u00eau b\u1eadu\\nT\u1ea5m l\u00f2ng son b\u1ea7u m\u1edf r\u1ed9ng ch\u1edd qua\\nH\u01b0\u01a1ng hoa th\u01a1m s\u01b0\u1edfi \u1ea5m l\u00f2ng ta\\nCh\u1ec9 c\u1ea7n c\u00f3 v\u1eady, t\u00ecnh xa m\u00e0 g\u1ea7n.",
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
];

export const featuredPoem = poems.find((item) => item.status === "published") ?? poems[0];

export const publishedPoems = poems.filter((item) => item.status === "published");

export function getPoemBySlug(slug: string) {
  return poems.find((item) => item.slug === slug);
}
