import { Locale } from "@/data/i18n";

type HomepageBrandCopy = {
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  closing: {
    eyebrow: string;
    title: string;
    description: string;
    poetBookcase: {
      title: string;
      description: string;
      button: string;
    };
    support: {
      title: string;
      description: string;
      button: string;
    };
  };
};

const homepageBrandI18n: Record<Locale, HomepageBrandCopy> = {
  vi: {
    intro: {
      eyebrow: "Tinh thần Hồn Thơ",
      title: "Không gian mang hồn quê trong sắc chiều",
      description:
        "Hồn Thơ hướng đến một trải nghiệm yên, ấm và có chiều sâu. Từng mảng nội dung đều ưu tiên sự mộc mạc của thơ, chuyện và ký ức quê nhà, để người xem không chỉ đọc mà còn thật sự cảm được một nhịp sống chậm giữa ngày dài.",
    },
    closing: {
      eyebrow: "Một nhịp lắng trước khi rời trang",
      title: "Mang một chút chiều quê về cùng bạn",
      description:
        "Nếu một bài thơ hay một câu chuyện vừa chạm vào lòng bạn, hãy ghé lại thêm một lát. Ở Hồn Thơ, câu chữ không chỉ để đọc, mà còn để giữ lại một khoảng lặng cho những ngày nhiều xao động.",
      poetBookcase: {
        title: "Tủ sách của nhà thơ",
        description: "Những tập thơ và ấn phẩm có thể mang về như một phần ký ức nhỏ.",
        button: "Xem tủ sách",
      },
      support: {
        title: "Ủng hộ Hồn Thơ",
        description: "Nếu bạn muốn góp một phần nhỏ để gìn giữ không gian này, Hồn Thơ luôn trân trọng.",
        button: "Gửi một lời ủng hộ",
      },
    },
  },
  en: {
    intro: {
      eyebrow: "The spirit of Hồn Thơ",
      title: "A space filled with the soul of home at dusk",
      description:
        "Hồn Thơ offers a calm, warm, and thoughtful experience. Each piece of content embraces the simplicity of poetry, storytelling, and memories of home, so readers do not only read, but truly feel a slower rhythm within the day.",
    },
    closing: {
      eyebrow: "A quiet close before you leave",
      title: "Carry a little evening of home with you",
      description:
        "If a poem or story has just touched your heart, stay a little longer. At Hồn Thơ, words are not only for reading, but for holding a quiet pause through restless days.",
      poetBookcase: {
        title: "The poet's bookshelf",
        description: "Poetry collections and printed pieces you may keep as a small memory.",
        button: "Explore the bookshelf",
      },
      support: {
        title: "Donate to Hồn Thơ",
        description: "If you wish to offer a small contribution to sustain this space, Hồn Thơ is grateful.",
        button: "Send a donation",
      },
    },
  },
};

export function getHomepageBrandCopy(locale: Locale) {
  return homepageBrandI18n[locale];
}
