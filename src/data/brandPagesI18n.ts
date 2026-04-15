import { CONTACT_FORM_URL } from "@/data/homepageData";
import { Locale } from "@/data/i18n";

type LinkAction = {
  label: string;
  href: string;
  external?: boolean;
};

type BookcaseCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroAlt: string;
  introTitle: string;
  introDescription: string;
  closingButton: string;
};

type SupportDetail = {
  label: string;
  value: string;
};

type SupportCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroAlt: string;
  companionTitle: string;
  companionDescription: string;
  companionImage: string;
  companionAlt: string;
  qrCardTitle: string;
  qrCardDescription: string;
  qrCardImage: string;
  qrCardAlt: string;
  transferDetails: SupportDetail[];
  accountNumber: string;
  copyButton: string;
  copiedButton: string;
  helperText: string;
  closingTitle: string;
  closingDescription: string;
  closingButton: string;
  closingAction: LinkAction;
};

type BrandPagesCopy = {
  bookcase: BookcaseCopy;
  support: SupportCopy;
};

const brandPagesI18n: Record<Locale, BrandPagesCopy> = {
  vi: {
    bookcase: {
      heroEyebrow: "Ấn phẩm của Hồn Thơ",
      heroTitle: "Tủ sách",
      heroDescription:
        "Nơi những tập thơ in được gìn giữ theo nhịp chậm của Hồn Thơ, để người yêu thơ có thể mang một phần ký ức quê nhà về gần hơn.",
      heroImage: "/images/poems/em-mua-xuan-ve.jpeg",
      heroAlt: "Không gian tủ sách thơ trong ánh chiều ấm",
      introTitle: "Tủ sách đang được cập nhật",
      introDescription:
        "Thông tin về các ấn phẩm sẽ được bổ sung khi hoàn chỉnh.",
      closingButton: "Liên hệ cùng Hồn Thơ",
    },
    support: {
      heroEyebrow: "Một lời đồng hành",
      heroTitle: "Ủng hộ Hồn Thơ",
      heroDescription:
        "Nếu bạn muốn góp một phần nhỏ để gìn giữ không gian này, Hồn Thơ luôn trân trọng.",
      heroImage: "/images/4.webp",
      heroAlt: "Khoảng lặng chiều quê với ánh sáng dịu",
      companionTitle: "Một lời ghé lại",
      companionDescription:
        "Giữa những ngày nhiều xao động, một sự đồng hành nhỏ cũng đủ làm ấm một khoảng thơ.",
      companionImage: "/images/poems/ngang-ben-song-xua.jpeg",
      companionAlt: "Mặt sông chiều lặng với ánh nắng ấm nhẹ",
      qrCardTitle: "Mã QR ủng hộ",
      qrCardDescription: "Mã QR dành cho một lời đồng hành nhẹ cùng Hồn Thơ.",
      qrCardImage: "/images/support/qr-bank.jpg",
      qrCardAlt: "Mã QR ủng hộ Hồn Thơ",
      transferDetails: [
        {
          label: "Số tài khoản",
          value: "100870892731",
        },
        {
          label: "Chủ tài khoản",
          value: "Nguyễn Ngọc Kim Ngân",
        },
        {
          label: "Ngân hàng",
          value: "VietinBank",
        },
      ],
      accountNumber: "100870892731",
      copyButton: "Sao chép số tài khoản",
      copiedButton: "Đã sao chép",
      helperText: "Hồn Thơ luôn trân trọng tấm lòng của bạn.",
      closingTitle: "Gửi một lời nhắn cho Hồn Thơ",
      closingDescription:
        "Nếu bạn muốn chia sẻ đôi dòng sau khi ủng hộ, Hồn Thơ luôn trân trọng và lắng nghe.",
      closingButton: "Liên hệ cùng Hồn Thơ",
      closingAction: {
        label: "Liên hệ cùng Hồn Thơ",
        href: CONTACT_FORM_URL,
        external: true,
      },
    },
  },
  en: {
    bookcase: {
      heroEyebrow: "Printed editions from Hồn Thơ",
      heroTitle: "Bookcase",
      heroDescription:
        "A quiet shelf of printed poetry from Hồn Thơ, for readers who want to keep a piece of homeland memory close.",
      heroImage: "/images/poems/em-mua-xuan-ve.jpeg",
      heroAlt: "A warm evening poetry shelf",
      introTitle: "The bookcase is being updated",
      introDescription:
        "Information about the printed editions will be added when ready.",
      closingButton: "Contact Hồn Thơ",
    },
    support: {
      heroEyebrow: "A gentle contribution",
      heroTitle: "Support Hồn Thơ",
      heroDescription:
        "If you wish to offer a small contribution to keep this space alive, Hồn Thơ is deeply grateful.",
      heroImage: "/images/4.webp",
      heroAlt: "A calm evening scene with soft light",
      companionTitle: "A quiet note of kindness",
      companionDescription:
        "In restless days, even a small gesture can keep this corner of poetry warm.",
      companionImage: "/images/poems/ngang-ben-song-xua.jpeg",
      companionAlt: "A quiet riverside in warm evening light",
      qrCardTitle: "Support QR code",
      qrCardDescription: "A gentle QR option for those who wish to stand with Hồn Thơ.",
      qrCardImage: "/images/support/qr-bank.jpg",
      qrCardAlt: "Support QR code for Hồn Thơ",
      transferDetails: [
        {
          label: "Account number",
          value: "100870892731",
        },
        {
          label: "Account name",
          value: "Nguyễn Ngọc Kim Ngân",
        },
        {
          label: "Bank",
          value: "VietinBank",
        },
      ],
      accountNumber: "100870892731",
      copyButton: "Copy account number",
      copiedButton: "Copied",
      helperText: "Thank you for keeping this space alive with care.",
      closingTitle: "Send a short note to Hồn Thơ",
      closingDescription: "If you would like to leave a message after your support, we would be grateful to hear from you.",
      closingButton: "Contact Hồn Thơ",
      closingAction: {
        label: "Contact Hồn Thơ",
        href: CONTACT_FORM_URL,
        external: true,
      },
    },
  },
};

export function getBrandPagesCopy(locale: Locale) {
  return brandPagesI18n[locale];
}
