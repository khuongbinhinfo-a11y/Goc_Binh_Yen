export const CLOUD_AUDIO_BASE_URL = "https://pub-a9e671dd309348caa85e940ff8ac8226.r2.dev" as const;

export const CLOUD_AUDIO_FILES = {
  poem: {
    "anh-mai-ben-em": "mp3",
    "anh-yeu-em": "mp3",
    "ban-tay": "mp3",
    "bat-canh-rau": "mp3",
    "ben-do": "mp3",
    "ben-song-xua": "mp3",
    "bi-ngan-hoa": "mp3",
    "buon": "mp3",
    "cam-hoa": "mp3",
    "cam-on-tinh-yeu": "mp3",
    "cay-roi-may": "m4a",
    "chi-can-co-vay": "mp3",
    "cho-anh-goi": "mp3",
    "cho-trong": "mp3",
    "chuyen-do": "mp3",
    "co-don": "mp3",
    "co-nhieu-luc": "mp3",
    "dau-can-noi-chi-em": "mp3",
    "dau-chua": "mp3",
    "di-nguoc-mat-troi": "mp3",
    "dong-song": "mp3",
    "dung-than-nhien-nhu-the": "mp3",
    "em-huong-xua": "mp3",
    "em-mua-xuan-ve": "mp3",
    "em-trong-anh": "mp3",
    "giac-mo": "mp3",
    "goi-lai-em": "mp3",
    "hanh-phuc": "mp3",
    "hoa-buom": "mp3",
    "hoa-luc-binh": "mp3",
    "hue-trang": "mp3",
    "khi-yeu-nguoi-ta-ra-sao": "mp3",
    "khoang-cach-vo-hinh": "mp3",
    "long-trinh-nu": "mp3",
    "mo-dao-vuon-xuan": "mp3",
    "mo-tro-ve": "mp3",
    "mo-uoc": "mp3",
    "mot-thoang": "mp3",
    "mua-hen": "mp3",
    "mua-thu-la-do": "mp3",
    "muon-con-hon-khong": "mp3",
    "neu-co-mot-ngay": "mp3",
    "ngam": "mp3",
    "ngang-ben-song-xua": "mp3",
    "ngay-ay": "mp3",
    "nguoi-dung": "mp3",
    "nhin-trang": "mp3",
    "nho": "mp3",
    "nho-lam-ngay-xua": "mp3",
    "qua-mien-thuong-nho": "mp3",
    "qua-voi-bau": "mp3",
    "ron-rang": "mp3",
    "tam-long": "mp3",
    "them": "mp3",
    "tien-ai": "mp3",
    "tieng-keu-chim-le-ban": "mp3",
    "to-tinh": "mp3",
    "trong-trai": "mp3",
    "vu-vo": "mp3",
    "xa-nhau-qua": "mp3",
    "xin-loi": "mp3",
    "xuan": "mp3"
  },
  story: {
    "ben-do-cu-qua-mot-mua-mua": "mp3",
    "chuyen-nguoi-qua-cau-tre": "mp3",
    "dem-nghe-tieng-nuoc-chay": "mp3",
    "ba-ban-banh-it-o-goc-cho-xua": "m4a",
    "mui-khoi-bep-len-tu-xom-nho": "mp3",
    "nguoi-va-xuong-o-me-song": "mp3",
    "ong-ngoai-va-chiec-vong-duoi-hang-dua": "m4a",
    "bua-com-chieu-co-mam-kho": "m4a"
  },
  spiritual: {
    "dot-nhang-truoc-hien-nha": "mp3",
    "hoc-tho-cham-giua-ngay-dai": "mp3",
    "bot-mot-loi-nang-long-nhe-hon": "m4a",
    "mot-ngay-im-lang-ben-song": "mp3",
    "mot-sang-quet-la-trong-san-chua": "mp3",
    "mua-chuong-chieu-trong-san-chua-nho": "mp3",
    "nhan-qua-khong-o-dau-xa": "mp3",
    "ngoi-yen-nghe-mua-cham-mai-hien": "mp3",
    "thap-den-nho-truoc-khi-ngu": "mp3",
    "khi-khong-con-muon-hon-thua": "m4a",
    "buong-xuong-mot-chuyen-khong-the-giu": "m4a"
  }
} as const;

export type CloudAudioType = keyof typeof CLOUD_AUDIO_FILES;

export function hasCloudAudio(type: CloudAudioType, slug: string) {
  return Boolean(CLOUD_AUDIO_FILES[type]?.[slug as keyof typeof CLOUD_AUDIO_FILES[typeof type]]);
}

export function getCloudAudioUrl(type: CloudAudioType, slug: string) {
  const ext = CLOUD_AUDIO_FILES[type]?.[slug as keyof typeof CLOUD_AUDIO_FILES[typeof type]];
  if (!ext) return undefined;

  const branch =
    type === "poem" ? "doc-tho" :
    type === "story" ? "ke-chuyen" :
    "tam-linh";

  return `${CLOUD_AUDIO_BASE_URL}/audio/${branch}/${slug}.${ext}`;
}
