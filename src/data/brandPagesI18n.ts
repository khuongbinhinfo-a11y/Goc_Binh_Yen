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
        "Nếu bạn muốn góp một phần nhỏ để gìn giữ không gian này, Hồn Thơ luôn trân trọng từng lời nhắn và sự đồng hành chân thành.",
      introTitle: "Vì sao có thể ủng hộ?",
      introDescription:
        "Sự ủng hộ giúp Hồn Thơ duy trì nhịp xuất bản đều đặn, hoàn thiện bản đọc và chăm chút thêm cho những ấn phẩm in về sau.",
      waysTitle: "Những cách đồng hành nhẹ nhàng",
      ways: [
        {
          title: "Gửi một lời nhắn đồng hành",
          description:
            "Để lại đôi dòng chia sẻ, góp ý hoặc lời động viên để Hồn Thơ biết bạn đang ở đây cùng chúng tôi.",
          action: {
            label: "Mở biểu mẫu liên hệ",
            href: CONTACT_FORM_URL,
            external: true,
          },
        },
        {
          title: "Lan tỏa nội dung bạn yêu thích",
          description:
            "Chia sẻ một bài thơ hay câu chuyện bạn thấy chạm lòng tới người thân và bạn bè.",
          action: {
            label: "Đến trang Facebook",
            href: FACEBOOK_URL,
            external: true,
          },
        },
        {
          title: "Ngỏ ý ủng hộ ấn phẩm in",
          description:
            "Nếu bạn muốn góp một phần nhỏ cho các đợt in tiếp theo, hãy gửi lời ngỏ qua biểu mẫu liên hệ.",
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
          description: "Pass along a poem or story that touched you to friends and loved ones.",
          action: {
            label: "Visit Facebook",
            href: FACEBOOK_URL,
            external: true,
          },
        },
        {
          title: "Express support for print editions",
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
