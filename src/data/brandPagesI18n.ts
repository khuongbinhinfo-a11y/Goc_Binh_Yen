import { CONTACT_FORM_URL } from "@/data/homepageData";
import { Locale } from "@/data/i18n";

type LinkAction = {
  label: string;
  href: string;
  external?: boolean;
};

type BookItem = {
  title: string;
  shortDescription: string;
  coverImage: string;
  format: string;
  yearOrStatus: string;
  action?: LinkAction;
};

type BookcaseCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  introTitle: string;
  introDescription: string;
  featuredLabel: string;
  featuredBook: BookItem;
  gridTitle: string;
  books: BookItem[];
  closingTitle: string;
  closingDescription: string;
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
  companionTitle: string;
  companionDescription: string;
  qrCardTitle: string;
  qrCardDescription: string;
  qrCardImage: string;
  qrCardAlt: string;
  transferInfoTitle: string;
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
        "Những tập thơ và ấn phẩm in được gìn giữ theo nhịp nhẹ của Hồn Thơ, dành cho người muốn mang một phần chiều quê về cùng mình.",
      introTitle: "Những trang giấy giữ hơi thở quê nhà",
      introDescription:
        "Mỗi đầu sách là một lát ký ức có sông nước, có khói chiều và có những điều nhỏ mà bền trong lòng người đọc.",
      featuredLabel: "Đầu sách nổi bật",
      featuredBook: {
        title: "Bến Đò",
        shortDescription:
          "Một tập thơ đi dọc miền sông nước, nơi nhịp chèo, bến đợi và tình quê hòa vào nhau trong giọng điệu chậm, ấm.",
        coverImage: "/images/poems/ben-do.jpeg",
        format: "Tập thơ",
        yearOrStatus: "Ấn bản tuyển chọn",
        action: {
          label: "Liên hệ để biết thêm",
          href: CONTACT_FORM_URL,
          external: true,
        },
      },
      gridTitle: "Những ấn phẩm đang giới thiệu",
      books: [
        {
          title: "Bàn Tay",
          shortDescription:
            "Những bài thơ tình mộc mạc, dịu ấm, viết về sự gắn bó và hạnh phúc bình yên trong đời thường.",
          coverImage: "/images/poems/ban-tay.jpeg",
          format: "Tập thơ",
          yearOrStatus: "Ấn bản tuyển chọn",
        },
        {
          title: "Cắm Hoa",
          shortDescription:
            "Một nhánh thơ đầy hương ký ức, đi từ rung động tuổi trẻ đến những bền sâu của nỗi nhớ.",
          coverImage: "/images/poems/cam-hoa.jpeg",
          format: "Tập thơ",
          yearOrStatus: "Ấn bản tuyển chọn",
        },
        {
          title: "Cảm Ơn Tình Yêu",
          shortDescription:
            "Nhịp thơ chiêm nghiệm về tình yêu sau nhiều mùa đời, nhẹ giọng mà vẫn sáng lòng.",
          coverImage: "/images/poems/cam-on-tinh-yeu.jpeg",
          format: "Tập thơ",
          yearOrStatus: "Ấn bản tuyển chọn",
        },
        {
          title: "Một Thoáng",
          shortDescription:
            "Những câu thơ về khoảnh khắc gặp gỡ ngắn ngủi nhưng để lại dư âm dài trong ký ức.",
          coverImage: "/images/poems/mot-thoang.jpeg",
          format: "Tập thơ",
          yearOrStatus: "Ấn bản tuyển chọn",
        },
        {
          title: "Hoa Bướm",
          shortDescription:
            "Một tập thơ giàu hình ảnh, mềm mại giữa hoa cỏ và tình cảm chân thành của người viết.",
          coverImage: "/images/poems/hoa-buom.jpeg",
          format: "Tập thơ",
          yearOrStatus: "Ấn bản tuyển chọn",
        },
        {
          title: "Huệ Trắng",
          shortDescription:
            "Những trang thơ nghiêng về hoài niệm, nơi hương hoa trở thành chiếc cầu nối của lòng người.",
          coverImage: "/images/poems/hue-trang.jpeg",
          format: "Tập thơ",
          yearOrStatus: "Ấn bản tuyển chọn",
        },
      ],
      closingTitle: "Bạn muốn biết thêm về các ấn phẩm này?",
      closingDescription:
        "Hồn Thơ luôn sẵn lòng gửi thông tin chi tiết về từng đầu sách, lịch in và cách nhận sách theo từng đợt.",
      closingButton: "Liên hệ để biết thêm",
    },
    support: {
      heroEyebrow: "Một lời đồng hành",
      heroTitle: "Ủng hộ Hồn Thơ",
      heroDescription:
        "Nếu bạn muốn góp một phần nhỏ để gìn giữ không gian này, Hồn Thơ luôn trân trọng.",
      companionTitle: "Một lời đồng hành dịu dàng",
      companionDescription:
        "Mỗi sự ủng hộ, dù nhỏ, đều là một cách để những câu chữ, giọng đọc và khoảng lặng nơi đây được ở lại lâu hơn.",
      qrCardTitle: "Biểu mẫu ủng hộ",
      qrCardDescription:
        "Quét mã để gửi một phần ủng hộ cho Hồn Thơ theo cách thuận tiện nhất dành cho bạn.",
      qrCardImage: "/images/support/qr-bank.jpg",
      qrCardAlt: "Mã QR ủng hộ Hồn Thơ",
      transferInfoTitle: "Thông tin chuyển khoản",
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
      helperText: "Bạn có thể dùng ứng dụng ngân hàng để quét mã và xác nhận chuyển khoản.",
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
        "Poetry collections and printed editions curated in Hồn Thơ's calm rhythm, for readers who want to carry a piece of homeland dusk with them.",
      introTitle: "Printed pages that hold the breath of home",
      introDescription:
        "Each title keeps a small memory of riverside light, evening smoke, and simple things that stay in the heart.",
      featuredLabel: "Featured edition",
      featuredBook: {
        title: "Bến Đò",
        shortDescription:
          "A key collection rooted in riverside memory, where waiting shores and slow ferries become a language of affection.",
        coverImage: "/images/poems/ben-do.jpeg",
        format: "Poetry collection",
        yearOrStatus: "Curated print edition",
        action: {
          label: "Request details",
          href: CONTACT_FORM_URL,
          external: true,
        },
      },
      gridTitle: "Current featured editions",
      books: [
        {
          title: "Bàn Tay",
          shortDescription:
            "A warm sequence of love poems about touch, devotion, and everyday tenderness.",
          coverImage: "/images/poems/ban-tay.jpeg",
          format: "Poetry collection",
          yearOrStatus: "Curated print edition",
        },
        {
          title: "Cắm Hoa",
          shortDescription:
            "A lyrical arc of fragrance and memory, moving from youthful wonder to mature longing.",
          coverImage: "/images/poems/cam-hoa.jpeg",
          format: "Poetry collection",
          yearOrStatus: "Curated print edition",
        },
        {
          title: "Cảm Ơn Tình Yêu",
          shortDescription:
            "Reflective poems on love after midlife, quiet in voice yet deeply luminous.",
          coverImage: "/images/poems/cam-on-tinh-yeu.jpeg",
          format: "Poetry collection",
          yearOrStatus: "Curated print edition",
        },
        {
          title: "Một Thoáng",
          shortDescription:
            "A brief encounter turned into long memory, written in a soft and lingering tone.",
          coverImage: "/images/poems/mot-thoang.jpeg",
          format: "Poetry collection",
          yearOrStatus: "Curated print edition",
        },
        {
          title: "Hoa Bướm",
          shortDescription:
            "A visual and tender set of poems where flowers, butterflies, and affection move together.",
          coverImage: "/images/poems/hoa-buom.jpeg",
          format: "Poetry collection",
          yearOrStatus: "Curated print edition",
        },
        {
          title: "Huệ Trắng",
          shortDescription:
            "Nostalgic pages where the scent of white lily opens old memory with gentle grace.",
          coverImage: "/images/poems/hue-trang.jpeg",
          format: "Poetry collection",
          yearOrStatus: "Curated print edition",
        },
      ],
      closingTitle: "Would you like more details about these editions?",
      closingDescription:
        "Hồn Thơ is always ready to share information on each title, print schedule, and ways to receive a copy.",
      closingButton: "Contact for details",
    },
    support: {
      heroEyebrow: "A gentle contribution",
      heroTitle: "Support Hồn Thơ",
      heroDescription:
        "If you wish to offer a small contribution to keep this space alive, Hồn Thơ is deeply grateful.",
      companionTitle: "A gentle way to stand with us",
      companionDescription:
        "Every contribution, however small, helps keep these words, voice readings, and quiet pauses alive a little longer.",
      qrCardTitle: "Support form",
      qrCardDescription: "Scan the code to send your support in the way that feels most convenient for you.",
      qrCardImage: "/images/support/qr-bank.jpg",
      qrCardAlt: "Support QR code for Hồn Thơ",
      transferInfoTitle: "Transfer details",
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
      helperText: "Use your banking app to scan the code and complete the transfer.",
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
