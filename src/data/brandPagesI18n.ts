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
  readingSuggestion: string;
  coverImage: string;
  format: string;
  status: string;
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
  formatLabel: string;
  statusLabel: string;
  readingSuggestionLabel: string;
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
        "Nơi những tập thơ in được gìn giữ theo nhịp chậm của Hồn Thơ, để người yêu thơ có thể mang một phần ký ức quê nhà về gần hơn.",
      introTitle: "Những cuốn thơ được gửi đi bằng sự trân trọng",
      introDescription:
        "Mỗi ấn phẩm là một khoảng chữ đã đi qua nhiều mùa cảm xúc. Nếu bạn muốn giữ thơ trên tay như một món quà dịu dành cho chính mình hoặc người thương, đây là nơi để bắt đầu.",
      featuredLabel: "Cuốn thơ nổi bật",
      featuredBook: {
        title: "Bến Đò",
        shortDescription:
          "Một tập thơ gói trong đó nhịp sông chậm, bến đợi cũ và sự thủy chung của người ở lại với miền quê mình.",
        readingSuggestion: "Dành cho những ai còn giữ trong lòng một bến sông cũ và tiếng gọi đò xa.",
        coverImage: "/images/poems/ben-do.jpeg",
        format: "Tập thơ",
        status: "Nhận đặt",
        action: {
          label: "Liên hệ đặt sách",
          href: CONTACT_FORM_URL,
          external: true,
        },
      },
      gridTitle: "Các cuốn đang giới thiệu",
      formatLabel: "Định dạng",
      statusLabel: "Tình trạng",
      readingSuggestionLabel: "Gợi ý đọc",
      books: [
        {
          title: "Bàn Tay",
          shortDescription:
            "Những bài thơ tình mộc mạc, đi từ cái nắm tay đầu tiên đến sự gắn bó bền bỉ của tình yêu qua năm tháng.",
          readingSuggestion: "Hợp với người thích câu chữ mềm, chân thành và không ồn ào.",
          coverImage: "/images/poems/ban-tay.jpeg",
          format: "Tập thơ",
          status: "Còn sách",
          action: {
            label: "Liên hệ đặt sách",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Cắm Hoa",
          shortDescription:
            "Một tập thơ giàu mùi hương ký ức, nơi mỗi bông hoa mở ra một miền thương nhớ rất riêng.",
          readingSuggestion: "Nên đọc chậm vào cuối ngày, khi lòng cần một khoảng dịu xuống.",
          coverImage: "/images/poems/cam-hoa.jpeg",
          format: "Tập thơ",
          status: "Nhận đặt",
          action: {
            label: "Liên hệ đặt sách",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Cảm Ơn Tình Yêu",
          shortDescription:
            "Nhịp thơ chiêm nghiệm về tình yêu sau nhiều mùa đời, không bi lụy mà sâu và ấm.",
          readingSuggestion: "Phù hợp cho người từng đi qua tổn thương và muốn đọc lại bằng lòng biết ơn.",
          coverImage: "/images/poems/cam-on-tinh-yeu.jpeg",
          format: "Tập thơ",
          status: "Nhận đặt",
          action: {
            label: "Liên hệ đặt sách",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Một Thoáng",
          shortDescription:
            "Những câu thơ về khoảnh khắc gặp gỡ ngắn ngủi nhưng để lại dư âm dài, như ánh chiều còn vương trên mặt nước.",
          readingSuggestion: "Dành cho những buổi chiều yên khi bạn muốn đọc ít mà cảm nhiều.",
          coverImage: "/images/poems/mot-thoang.jpeg",
          format: "Tập thơ",
          status: "Sắp ra mắt",
        },
        {
          title: "Hoa Bướm",
          shortDescription:
            "Một ấn phẩm mềm mại về vẻ đẹp mong manh của tình yêu, hoa cỏ và những rung động không gọi thành tên.",
          readingSuggestion: "Hợp cho người thích hình ảnh thơ bay bổng nhưng vẫn giữ chiều sâu cảm xúc.",
          coverImage: "/images/poems/hoa-buom.jpeg",
          format: "Tập thơ",
          status: "Còn sách",
          action: {
            label: "Liên hệ đặt sách",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Huệ Trắng",
          shortDescription:
            "Những trang thơ nghiêng về hoài niệm, nơi hương huệ trở thành nhịp cầu nối giữa hiện tại và ký ức.",
          readingSuggestion: "Dành cho người yêu những câu thơ lắng, trong và có dư vị của nhớ thương.",
          coverImage: "/images/poems/hue-trang.jpeg",
          format: "Tuyển thơ",
          status: "Nhận đặt",
          action: {
            label: "Liên hệ đặt sách",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
      ],
      closingTitle: "Bạn muốn biết thêm về từng cuốn thơ?",
      closingDescription:
        "Hồn Thơ luôn sẵn lòng gửi thông tin chi tiết về mỗi ấn phẩm, lịch phát hành và cách nhận sách theo từng đợt.",
      closingButton: "Liên hệ đặt sách",
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
        "A quiet shelf of printed poetry from Hồn Thơ, for readers who want to keep a piece of homeland memory close.",
      introTitle: "Poetry books shared with care",
      introDescription:
        "Each edition gathers words that have stayed through many seasons. If you want to hold poetry as a gentle keepsake, this is where you can begin.",
      featuredLabel: "Featured title",
      featuredBook: {
        title: "Bến Đò",
        shortDescription:
          "A poetry book shaped by riverside rhythm, old waiting docks, and the faithful tenderness of home.",
        readingSuggestion: "For readers who still carry an old dock and a distant ferry call in memory.",
        coverImage: "/images/poems/ben-do.jpeg",
        format: "Poetry collection",
        status: "Pre-order",
        action: {
          label: "Contact to order",
          href: CONTACT_FORM_URL,
          external: true,
        },
      },
      gridTitle: "Currently featured books",
      formatLabel: "Format",
      statusLabel: "Status",
      readingSuggestionLabel: "Reading suggestion",
      books: [
        {
          title: "Bàn Tay",
          shortDescription:
            "Tender love poems moving from first touch to long-lasting companionship.",
          readingSuggestion: "A good fit if you prefer warm, sincere lines with quiet depth.",
          coverImage: "/images/poems/ban-tay.jpeg",
          format: "Poetry collection",
          status: "Available",
          action: {
            label: "Contact to order",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Cắm Hoa",
          shortDescription:
            "A fragrant arc of memory where flowers open into longing and intimacy.",
          readingSuggestion: "Best read slowly in late afternoon when the heart needs soft quiet.",
          coverImage: "/images/poems/cam-hoa.jpeg",
          format: "Poetry collection",
          status: "Pre-order",
          action: {
            label: "Contact to order",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Cảm Ơn Tình Yêu",
          shortDescription:
            "Reflective poems on love after many seasons of life: calm, warm, and luminous.",
          readingSuggestion: "For readers who have known loss and want to return through gratitude.",
          coverImage: "/images/poems/cam-on-tinh-yeu.jpeg",
          format: "Poetry collection",
          status: "Pre-order",
          action: {
            label: "Contact to order",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Một Thoáng",
          shortDescription:
            "Poems about brief encounters that echo far beyond the moment.",
          readingSuggestion: "A gentle companion for quiet evenings when you want to feel more with fewer words.",
          coverImage: "/images/poems/mot-thoang.jpeg",
          format: "Poetry collection",
          status: "Coming soon",
        },
        {
          title: "Hoa Bướm",
          shortDescription:
            "A soft, visual collection where flowers and butterflies hold delicate affection.",
          readingSuggestion: "For those who enjoy lyrical imagery with a calm emotional undertone.",
          coverImage: "/images/poems/hoa-buom.jpeg",
          format: "Poetry collection",
          status: "Available",
          action: {
            label: "Contact to order",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Huệ Trắng",
          shortDescription:
            "Nostalgic pages where white lily scent becomes a bridge between present and memory.",
          readingSuggestion: "For readers who love quiet, clear lines with a lingering aftertaste.",
          coverImage: "/images/poems/hue-trang.jpeg",
          format: "Poetry anthology",
          status: "Pre-order",
          action: {
            label: "Contact to order",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
      ],
      closingTitle: "Need details about a specific book?",
      closingDescription:
        "Hồn Thơ is always ready to share publishing updates and ways to receive each printed edition.",
      closingButton: "Contact to order",
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
