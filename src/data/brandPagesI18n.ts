import { CONTACT_FORM_URL } from "@/data/homepageData";
import { Locale } from "@/data/i18n";
import { LOCAL_IMAGE_MAP } from "@/lib/image";

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
  authorTitle: string;
  authorName: string;
  authorImage: string;
  authorImageAlt: string;
  authorParagraphs: string[];
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
        "Tủ sách đang được cập nhật theo dữ liệu ấn phẩm mới. Thông tin chi tiết sẽ được bổ sung khi hoàn chỉnh.",
      heroImage: "/images/poems/em-mua-xuan-ve.jpeg",
      heroAlt: "Không gian tủ sách thơ trong ánh chiều ấm",
      introTitle: "Tủ sách đang được cập nhật",
      introDescription:
        "Hồn Thơ đang hoàn thiện thông tin từng ấn phẩm để gửi đến bạn một cách đầy đủ và trân trọng.",
      closingButton: "Liên hệ cùng Hồn Thơ",
      authorTitle: "Tác giả",
      authorName: "Nhà thơ Lê Dũng",
      authorImage: "/images/poems/tac-gia.png",
      authorImageAlt: "Chân dung tác giả Lê Dũng",
      authorParagraphs: [
        "Nhà thơ Lê Dũng (SN-1961), sinh ra và lớn lên tại miền quê sông nước (Cai Lậy - Tiền Giang).",
        "Ông là người yêu thơ, yêu quê hương miền Tây và luôn mang trong lòng một tình cảm sâu nặng với những kỷ niệm đã đi qua trong đời. Với ông, thơ không chỉ là những câu chữ để đọc, mà là nơi gìn giữ bóng hình quê cũ, giữ lại tiếng lòng của một thời, của những thương yêu, những nhớ nhung và những điều rất đỗi bình dị mà càng đi xa càng thấy quý.",
        "Ông viết từ tình yêu dành cho đất và người miền Tây, từ những mùa nắng mưa, những dòng sông, bến nước, những con đường cũ, những cuộc gặp gỡ, chia xa và những rung động âm thầm trong lòng người. Mỗi bài thơ là một mảnh ký ức, một chút tâm sự, một điều muốn giữ lại trước khi thời gian lặng lẽ cuốn đi.",
        "Nhưng trong thời đại hôm nay, khi nhịp sống ngày một vội vàng, việc ngồi xuống thật yên để cầm một cuốn thơ lên đọc dường như đã trở thành điều hiếm hoi, thậm chí xa xỉ với nhiều người. Chính điều đó càng khiến ông trăn trở. Bởi thơ vẫn còn đó, tình vẫn còn đó, ký ức vẫn còn đó, chỉ là lòng người ít có dịp dừng lại để lắng nghe.",
        "Vì vậy, Hồn Thơ được gìn giữ như một cách để đưa thơ đến gần hơn với mọi người, bằng một con đường nhẹ nhàng hơn, gần gũi hơn với cuộc sống hôm nay. Đó không chỉ là nơi lưu giữ những áng thơ của tác giả, mà còn là nơi gửi gắm nỗi lòng của một người yêu thơ, yêu quê hương, yêu những gì chân thành và sâu lắng trong đời sống con người.",
        "Nếu ở đâu đó, giữa bộn bề thường nhật, bạn dừng lại đôi phút và thấy lòng mình lắng xuống trước một câu thơ, một hình ảnh, một kỷ niệm cũ, thì có lẽ đó cũng chính là điều mà tác giả luôn mong mỏi: những vần thơ không chỉ được đọc, mà còn được đồng cảm, được giữ lại trong tim như một chút hơi ấm của đời người.",
      ],
    },
    support: {
      heroEyebrow: "Một lời đồng hành",
      heroTitle: "Ủng hộ Hồn Thơ",
      heroDescription:
        "Nếu bạn muốn góp một phần nhỏ để gìn giữ không gian này, Hồn Thơ luôn trân trọng.",
      heroImage: LOCAL_IMAGE_MAP.heroSupport.src,
      heroAlt: "Khoảng lặng chiều quê với ánh sáng dịu",
      companionTitle: "Một lời ghé lại",
      companionDescription:
        "Một lời đồng hành nhẹ, để những câu chữ nơi đây ở lại lâu hơn.",
      companionImage: "/images/poems/ngang-ben-song-xua.jpeg",
      companionAlt: "Mặt sông chiều lặng với ánh nắng ấm nhẹ",
      qrCardDescription: "Hồn Thơ luôn trân trọng từng lời đồng hành của bạn.",
      qrCardImage: LOCAL_IMAGE_MAP.supportQr.src,
      qrCardAlt: "Mã quét đồng hành cùng Hồn Thơ",
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
      helperText: "Xin cảm ơn sự đồng hành của bạn.",
      closingTitle: "Gửi một lời nhắn đến Hồn Thơ",
      closingDescription: "",
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
        "The bookcase is being updated with new edition details. Full information will be added once finalized.",
      heroImage: "/images/poems/em-mua-xuan-ve.jpeg",
      heroAlt: "A warm evening poetry shelf",
      introTitle: "The bookcase is being updated",
      introDescription:
        "Hồn Thơ is preparing complete information for each printed edition.",
      closingButton: "Contact Hồn Thơ",
      authorTitle: "Author",
      authorName: "Poet Le Dung",
      authorImage: "/images/poems/tac-gia.png",
      authorImageAlt: "Portrait of poet Le Dung",
      authorParagraphs: [
        "Poet Le Dung was born and raised in Cai Lay, Tien Giang, in the riverland of Southern Vietnam.",
        "His poems preserve memories of home, people, and the quiet emotions of everyday life.",
      ],
    },
    support: {
      heroEyebrow: "A gentle contribution",
      heroTitle: "Donate to Hồn Thơ",
      heroDescription:
        "If you wish to offer a small contribution to keep this space alive, Hồn Thơ is deeply grateful.",
      heroImage: LOCAL_IMAGE_MAP.heroSupport.src,
      heroAlt: "A calm evening scene with soft light",
      companionTitle: "A quiet note of kindness",
      companionDescription:
        "A gentle gesture helps keep this corner of words alive a little longer.",
      companionImage: "/images/poems/ngang-ben-song-xua.jpeg",
      companionAlt: "A quiet riverside in warm evening light",
      qrCardDescription: "Hồn Thơ receives every kind gesture with gratitude.",
      qrCardImage: LOCAL_IMAGE_MAP.supportQr.src,
      qrCardAlt: "Donation QR code for Hồn Thơ",
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
      helperText: "Thank you for your donation.",
      closingTitle: "Send a short note to Hồn Thơ",
      closingDescription: "If you would like to leave a message after your donation, we would be grateful to hear from you.",
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
