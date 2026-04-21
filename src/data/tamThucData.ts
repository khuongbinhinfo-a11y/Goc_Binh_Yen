export type TamThucSection = {
  title: string;
  href: string;
  description: string;
  imageBasename: string;
};

const TAM_THUC_IMAGE_DIR = "/images/sections/tam-thuc";
export const TAM_THUC_FALLBACK_IMAGE = "/images/co-hoc/tam-thuc.jpeg";

function buildTamThucImageCandidates(basename: string) {
  return [
    `${TAM_THUC_IMAGE_DIR}/${basename}.jpg`,
    `${TAM_THUC_IMAGE_DIR}/${basename}.webp`,
    `${TAM_THUC_IMAGE_DIR}/fallback-tam-thuc.jpg`,
    `${TAM_THUC_IMAGE_DIR}/fallback-tam-thuc.webp`,
  ];
}

export function getTamThucImageProps(basename: string) {
  const candidates = buildTamThucImageCandidates(basename);

  return {
    src: candidates[0],
    srcCandidates: candidates.slice(1),
    fallbackSrc: TAM_THUC_FALLBACK_IMAGE,
  };
}

export const tamThucFoundationSections: TamThucSection[] = [
  {
    title: "Nhập môn Tam thức",
    href: "/huyen-mon-tham-khao/tam-thuc/nhap-mon-tam-thuc",
    description: "Nền tảng khái niệm, phạm vi đọc hiểu và lối bắt đầu phù hợp cho người mới tiếp cận Tam thức.",
    imageBasename: "tam-thuc-nhap-mon",
  },
  {
    title: "Cách tiếp cận đúng",
    href: "/huyen-mon-tham-khao/tam-thuc/cach-tiep-can",
    description: "Phân biệt tri thức nền, diễn giải và giới hạn áp dụng để tránh rơi vào niềm tin tuyệt đối.",
    imageBasename: "tam-thuc-cach-tiep-can",
  },
  {
    title: "So sánh và định vị",
    href: "/huyen-mon-tham-khao/tam-thuc/so-sanh-va-dinh-vi",
    description: "Định vị Tam thức trong tương quan với Ngũ thuật và làm rõ khác biệt giữa ba hệ quan sát.",
    imageBasename: "tam-thuc-so-sanh",
  },
];

export const tamThucSystemSections: TamThucSection[] = [
  {
    title: "Thái Ất Thần Kinh",
    href: "/huyen-mon-tham-khao/tam-thuc/thai-at-than-kinh",
    description: "Hệ quan sát thiên về chiều rộng của thời cuộc, bối cảnh và vận động vĩ mô.",
    imageBasename: "tam-thuc-thai-at",
  },
  {
    title: "Kỳ Môn Độn Giáp",
    href: "/huyen-mon-tham-khao/tam-thuc/ky-mon-don-giap",
    description: "Hệ nhìn tình huống theo thời điểm, không gian và thế cục để tham khảo thời cơ hành động.",
    imageBasename: "tam-thuc-ky-mon",
  },
  {
    title: "Lục Nhâm Thần Khóa",
    href: "/huyen-mon-tham-khao/tam-thuc/luc-nham-than-khoa",
    description: "Hệ quan sát diễn biến và quan hệ giữa các dấu hiệu, đòi hỏi thái độ học tập rất cẩn trọng.",
    imageBasename: "tam-thuc-luc-nham",
  },
];

export const tamThucAdvancedSections: TamThucSection[] = [
  {
    title: "Ứng dụng và giới hạn",
    href: "/huyen-mon-tham-khao/tam-thuc/ung-dung-va-gioi-han-tam-thuc",
    description: "Giữ ranh giới giữa tham khảo và lệ thuộc, giữa soi sáng nhận thức và quyết định thay con người.",
    imageBasename: "tam-thuc-ung-dung",
  },
  {
    title: "Chuyên sâu định hướng nghiên cứu",
    href: "/huyen-mon-tham-khao/tam-thuc/chuyen-sau-dinh-huong",
    description: "Đi sâu vào biểu tượng, dị bản, cổ thư và những lớp nghĩa cần được nghiên cứu trong bối cảnh hiện đại.",
    imageBasename: "tam-thuc-nghien-cuu",
  },
];