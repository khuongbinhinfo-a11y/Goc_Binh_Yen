export const CLOUD_AUDIO_BASE_URL = "https://pub-a9e671dd309348caa85e940ff8ac8226.r2.dev" as const;

export const CLOUD_AUDIO_SLUGS = {
  poem: [
  "cua-thien",
  "anh-mai-ben-em",
  "anh-yeu-em",
  "ban-tay",
  "bat-canh-rau",
  "ben-do",
  "ben-song-xua",
  "bi-ngan-hoa",
  "buon",
  "cam-hoa",
  "cam-on-tinh-yeu",
  "cay-roi-may",
  "chi-can-co-vay",
  "cho-anh-goi",
  "cho-trong",
  "chuyen-do",
  "co-don",
  "co-nhieu-luc",
  "dau-can-noi-chi-em",
  "dau-chua",
  "di-nguoc-mat-troi",
  "dong-song",
  "dung-than-nhien-nhu-the",
  "em-huong-xua",
  "em-mua-xuan-ve",
  "em-trong-anh",
  "giac-mo",
  "goi-lai-em",
  "hanh-phuc",
  "hoa-buom",
  "hoa-luc-binh",
  "hue-trang",
  "khi-yeu-nguoi-ta-ra-sao",
  "khoang-cach-vo-hinh",
  "khoc-cuoi",
  "long-trinh-nu",
  "mo-dao-vuon-xuan",
  "mo-tro-ve",
  "mo-uoc",
  "mot-thoang",
  "mua-hen",
  "mua-thu-la-do",
  "muon-con-hon-khong",
  "neu-co-mot-ngay",
  "ngam",
  "ngang-ben-song-xua",
  "ngay-ay",
  "nguoi-dung",
  "nhin-trang",
  "nho",
  "nho-lam-ngay-xua",
  "qua-mien-thuong-nho",
  "qua-voi-bau",
  "ron-rang",
  "tam-long",
  "them",
  "tien-ai",
  "tieng-keu-chim-le-ban",
  "to-tinh",
  "trong-trai",
  "vu-vo",
  "xa-nhau-qua",
  "xin-loi",
  "xuan"
],
  story: [
  "nguoi-dua-thu-qua-nhung-xom-nho",
  "ben-do-cu-qua-mot-mua-mua",
  "chuyen-nguoi-qua-cau-tre",
  "dem-nghe-tieng-nuoc-chay",
  "ba-ban-banh-it-o-goc-cho-xua",
  "mui-khoi-bep-len-tu-xom-nho",
  "nguoi-va-xuong-o-me-song",
  "tieng-ga-trua-ben-mai-nha-cu",
  "chiec-xuong-neo-duoi-ben-xua",
  "cho-som-ben-dong-kenh-nho",
  "con-duong-dat-sau-mua-nuoc-noi",
  "mui-rom-moi-sau-ngay-gat",
  "dem-mua-trong-can-nha-la"
],
  spiritual: [
  "dot-nhang-truoc-hien-nha",
  "hoc-tho-cham-giua-ngay-dai",
  "bot-mot-loi-nang-long-nhe-hon",
  "mot-ngay-im-lang-ben-song",
  "mot-sang-quet-la-trong-san-chua",
  "mua-chuong-chieu-trong-san-chua-nho",
  "nhan-qua-khong-o-dau-xa",
  "nhan-qua-trong-mot-bua-com",
  "ngoi-yen-nghe-mua-cham-mai-hien",
  "thap-den-nho-truoc-khi-ngu",
  "co-nhung-ngay-chi-can-ngoi-yen",
  "song-hien-khong-phai-la-yeu-duoi",
  "lay-phat-khong-chi-o-chua"
],
} as const;

export type CloudAudioType = keyof typeof CLOUD_AUDIO_SLUGS;

const slugSets: Record<CloudAudioType, Set<string>> = {
  poem: new Set(CLOUD_AUDIO_SLUGS.poem),
  story: new Set(CLOUD_AUDIO_SLUGS.story),
  spiritual: new Set(CLOUD_AUDIO_SLUGS.spiritual),
};

function branchByType(type: CloudAudioType) {
  if (type === "poem") return "doc-tho";
  if (type === "story") return "ke-chuyen";
  return "tam-linh";
}

const storyM4aSlugs = new Set<string>([
  "tieng-ga-trua-ben-mai-nha-cu",
]);

const spiritualM4aSlugs = new Set<string>([
  "dot-nhang-truoc-hien-nha",
  "nhan-qua-khong-o-dau-xa",
]);

const poemM4aSlugs = new Set<string>([
  "cay-roi-may",
  "khoc-cuoi",
]);

function extBySlug(type: CloudAudioType, slug: string) {
  if (type === "story" && storyM4aSlugs.has(slug)) return "m4a";
  if (type === "spiritual" && spiritualM4aSlugs.has(slug)) return "m4a";
  if (type === "poem" && poemM4aSlugs.has(slug)) return "m4a";
  return "mp3";
}

export function hasCloudAudio(type: CloudAudioType, slug: string) {
  return slugSets[type].has(slug);
}

export function getCloudAudioUrl(type: CloudAudioType, slug: string) {
  if (!hasCloudAudio(type, slug)) return undefined;
  return CLOUD_AUDIO_BASE_URL + "/audio/" + branchByType(type) + "/" + slug + "." + extBySlug(type, slug);
}
