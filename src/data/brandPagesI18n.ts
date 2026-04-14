import { CONTACT_FORM_URL, FACEBOOK_URL } from "@/data/homepageData";
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

type SupportWay = {
  title: string;
  description: string;
  action: LinkAction;
};

type SupportCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  introTitle: string;
  introDescription: string;
  waysTitle: string;
  ways: SupportWay[];
  closingTitle: string;
  closingDescription: string;
  closingButton: string;
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
        "Mỗi đầu sách là một lát ký ức: có sông nước, có khói chiều, có những điều nhỏ mà bền trong lòng người đọc.",
      featuredLabel: "Đầu sách nổi bật",
      featuredBook: {
        title: "Em - mùa xuân về",
        shortDescription:
          "Tập thơ nghiêng về mùa tái sinh của cảm xúc, đi qua thương nhớ và dừng lại ở những điều dịu dàng nhất.",
        coverImage: "/images/poems/em-mua-xuan-ve.jpeg",
        format: "Tập thơ",
        yearOrStatus: "Ấn bản 2025",
        action: {
          label: "Liên hệ nhận thông tin",
          href: CONTACT_FORM_URL,
          external: true,
        },
      },
      gridTitle: "Các ấn phẩm đang giới thiệu",
      books: [
        {
          title: "Khoảng cách vô hình",
          shortDescription: "Những bài thơ về khoảng lặng giữa người với người, nơi yêu thương cần thêm một nhịp thấu hiểu.",
          coverImage: "/images/poems/khoang-cach-vo-hinh.jpeg",
          format: "Tập thơ",
          yearOrStatus: "Ấn bản 2024",
        },
        {
          title: "Hoa lục bình",
          shortDescription: "Một tuyển tập mang màu nước nổi và ký ức miền Tây, mềm mà sâu như tiếng gió qua bến cũ.",
          coverImage: "/images/poems/hoa-luc-binh.jpeg",
          format: "Tuyển tập",
          yearOrStatus: "Ấn bản 2023",
        },
        {
          title: "Em trong anh",
          shortDescription: "Những bài thơ tình quê mộc mạc, giữ nhịp ấm áp và bền bỉ của một mối duyên dài.",
          coverImage: "/images/poems/em-trong-anh.jpeg",
          format: "Tập thơ",
          yearOrStatus: "Ấn bản 2025",
        },
        {
          title: "Anh yêu em",
          shortDescription: "Một tập thơ ngắn giàu nhạc tính, đi từ rung động ban đầu đến bình yên sau nhiều mùa mưa nắng.",
          coverImage: "/images/poems/anh-yeu-em.jpeg",
          format: "Ấn phẩm",
          yearOrStatus: "Bản chọn lọc",
        },
        {
          title: "Tiếng kêu chim lẻ bạn",
          shortDescription: "Những câu thơ về nỗi cô tịch và sự trở về, dành cho lúc lòng người cần được nâng đỡ.",
          coverImage: "/images/poems/tieng-keu-chim-le-ban.jpeg",
          format: "Tập thơ",
          yearOrStatus: "Ấn bản 2022",
        },
      ],
      closingTitle: "Bạn muốn tìm hiểu thêm về từng ấn phẩm?",
      closingDescription:
        "Hồn Thơ luôn sẵn lòng gửi thông tin chi tiết về các đầu sách, lịch in và cách nhận sách theo từng đợt.",
      closingButton: "Liên hệ để biết thêm",
    },
    support: {
      heroEyebrow: "Một lời đồng hành",
      heroTitle: "Ủng hộ Hồn Thơ",
      heroDescription:
        "Nếu bạn muốn góp một phần nhỏ để gìn giữ không gian này, Hồn Thơ luôn trân trọng từng lời nhắn và sự đồng hành chân thành.",
      introTitle: "Vì sao có thể ủng hộ?",
      introDescription:
        "Sự ủng hộ giúp Hồn Thơ duy trì nhịp xuất bản đều đặn, hoàn thiện các bản đọc và chăm chút thêm cho những ấn phẩm in sau này.",
      waysTitle: "Những cách đồng hành nhẹ nhàng",
      ways: [
        {
          title: "Gửi một lời nhắn đồng hành",
          description: "Để lại đôi dòng chia sẻ, góp ý hoặc lời động viên để Hồn Thơ biết bạn đang ở đây cùng chúng tôi.",
          action: {
            label: "Mở biểu mẫu liên hệ",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Lan tỏa nội dung bạn yêu thích",
          description: "Chia sẻ một bài thơ hoặc câu chuyện bạn thấy chạm lòng tới người thân và bạn bè.",
          action: {
            label: "Đến trang Facebook",
            href: FACEBOOK_URL,
            external: true,
          },
        },
        {
          title: "Ngỏ ý ủng hộ ấn phẩm in",
          description: "Nếu bạn muốn góp một phần nhỏ cho các đợt in tiếp theo, hãy gửi lời ngỏ qua biểu mẫu liên hệ.",
          action: {
            label: "Gửi một lời ủng hộ",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
      ],
      closingTitle: "Mỗi sự nâng đỡ đều được trân quý",
      closingDescription:
        "Dù là một lời chia sẻ hay một đóng góp nhỏ, Hồn Thơ luôn ghi nhận bằng sự biết ơn và trách nhiệm gìn giữ không gian này.",
      closingButton: "Gửi một lời ủng hộ",
    },
  },
  en: {
    bookcase: {
      heroEyebrow: "Printed pieces from Hồn Thơ",
      heroTitle: "Bookcase",
      heroDescription:
        "Poetry collections and printed editions curated in Hồn Thơ's calm rhythm, for readers who want to carry a piece of homeland dusk with them.",
      introTitle: "Printed pages that hold the breath of home",
      introDescription:
        "Each title keeps a small memory: riverside light, evening smoke, and the gentle details that stay with the heart.",
      featuredLabel: "Featured title",
      featuredBook: {
        title: "Em - Spring Returns",
        shortDescription:
          "A poetry collection about emotional renewal, moving through longing and resting in tenderness.",
        coverImage: "/images/poems/em-mua-xuan-ve.jpeg",
        format: "Poetry collection",
        yearOrStatus: "2025 edition",
        action: {
          label: "Request details",
          href: CONTACT_FORM_URL,
          external: true,
        },
      },
      gridTitle: "Current featured editions",
      books: [
        {
          title: "Invisible Distance",
          shortDescription:
            "Poems about quiet distances between people, where understanding becomes another form of love.",
          coverImage: "/images/poems/khoang-cach-vo-hinh.jpeg",
          format: "Poetry collection",
          yearOrStatus: "2024 edition",
        },
        {
          title: "Water Hyacinth",
          shortDescription:
            "A selected volume with floating-season imagery and riverside memory, soft yet deep in aftertaste.",
          coverImage: "/images/poems/hoa-luc-binh.jpeg",
          format: "Selected volume",
          yearOrStatus: "2023 edition",
        },
        {
          title: "You Within Me",
          shortDescription:
            "Rural love poems with a gentle cadence and the warmth of long-held affection.",
          coverImage: "/images/poems/em-trong-anh.jpeg",
          format: "Poetry collection",
          yearOrStatus: "2025 edition",
        },
        {
          title: "I Love You",
          shortDescription:
            "A concise lyrical set moving from first tenderness to the peace that arrives after many seasons.",
          coverImage: "/images/poems/anh-yeu-em.jpeg",
          format: "Printed edition",
          yearOrStatus: "Curated release",
        },
        {
          title: "The Cry of a Lonely Bird",
          shortDescription:
            "Poems of solitude and return, for moments when the heart needs a quiet place to rest.",
          coverImage: "/images/poems/tieng-keu-chim-le-ban.jpeg",
          format: "Poetry collection",
          yearOrStatus: "2022 edition",
        },
      ],
      closingTitle: "Would you like more details about these editions?",
      closingDescription:
        "Hồn Thơ is always ready to share information on each title, upcoming print cycles, and how to receive a copy.",
      closingButton: "Contact for more details",
    },
    support: {
      heroEyebrow: "A gentle way to stand with us",
      heroTitle: "Support Hồn Thơ",
      heroDescription:
        "If you would like to offer a small contribution to sustain this space, Hồn Thơ receives every message with gratitude.",
      introTitle: "Why support matters",
      introDescription:
        "Your support helps Hồn Thơ maintain a steady publishing rhythm, improve voice readings, and care for future print editions.",
      waysTitle: "Quiet ways to support",
      ways: [
        {
          title: "Send a message of encouragement",
          description:
            "Leave a short note, reflection, or suggestion so we know you are accompanying this journey.",
          action: {
            label: "Open contact form",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Share a piece you love",
          description:
            "Pass along a poem or story that touched you to friends and loved ones.",
          action: {
            label: "Visit Facebook",
            href: FACEBOOK_URL,
            external: true,
          },
        },
        {
          title: "Express support for printed editions",
          description:
            "If you wish to contribute to future print runs, leave your intention through the contact form.",
          action: {
            label: "Send support",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
      ],
      closingTitle: "Every gesture is deeply appreciated",
      closingDescription:
        "Whether it is a kind note or a small contribution, Hồn Thơ receives it with care and responsibility.",
      closingButton: "Send a support message",
    },
  },
};

export function getBrandPagesCopy(locale: Locale) {
  return brandPagesI18n[locale];
}
