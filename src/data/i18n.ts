export type Locale = "vi" | "en";

export const DEFAULT_LOCALE: Locale = "vi";
export const LOCALE_STORAGE_KEY = "goc-binh-yen-locale";

export type NavItem = {
  href: string;
  label: string;
};

export type ContentCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  href?: string;
};

export type FeaturedCard = {
  tag: string;
  title: string;
  description: string;
  image: string;
};

export type MoodboardItem = {
  title: string;
  image: string;
};

export type ArticleMediaCard = {
  label: string;
  title: string;
  description: string;
  duration: string;
  button: string;
};

export type RelatedItem = {
  tag: string;
  title: string;
  description: string;
  href: string;
};

export type PoetryListItem = {
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export type TranslationSchema = {
  brandName: string;
  signature: {
    poetry: string;
    voice: string;
  };
  nav: {
    items: NavItem[];
    facebook: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
    keywordTitle: string;
    keywords: string[];
  };
  contentPillars: {
    eyebrow: string;
    title: string;
    cta: string;
    items: ContentCard[];
  };
  featured: {
    eyebrow: string;
    title: string;
    description: string;
    items: FeaturedCard[];
  };
  moodboard: {
    eyebrow: string;
    title: string;
    items: MoodboardItem[];
  };
  googleSearch: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
    button: string;
    hints: {
      empty: string;
      blocked: string;
      opened: string;
    };
  };
  social: {
    eyebrow: string;
    title: string;
    description: string;
    button: string;
    note: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    cardTitle: string;
    cardDescription: string;
    button: string;
    helper: string;
  };
  footer: {
    description: string;
    facebook: string;
    rights: string;
    by: string;
  };
  articleSample: {
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    category: string;
    title: string;
    summary: string;
    meta: {
      authorLabel: string;
      voiceLabel: string;
      readTimeLabel: string;
      publishDateLabel: string;
      authorValue: string;
      voiceValue: string;
      readTimeValue: string;
      publishDateValue: string;
    };
    actionBar: {
      read: string;
      listen: string;
      watch: string;
      share: string;
    };
    body: {
      paragraph1: string;
      paragraph2: string;
      quote: string;
      subheading: string;
      paragraph3: string;
    };
    media: {
      eyebrow: string;
      title: string;
      cards: ArticleMediaCard[];
    };
    related: {
      title: string;
      backHome: string;
      readMore: string;
      items: RelatedItem[];
    };
    closing: {
      eyebrow: string;
      title: string;
      description: string;
      button: string;
    };
  };
  poetryPage: {
    heroEyebrow: string;
    title: string;
    description: string;
    featured: {
      tag: string;
      title: string;
      description: string;
      image: string;
      href: string;
      button: string;
    };
    gridTitle: string;
    items: PoetryListItem[];
    cardButton: string;
  };
};

export const translations: Record<Locale, TranslationSchema> = {
  vi: {
    brandName: "Hồn Thơ",
    signature: {
      poetry: "Thơ · Lê Dũng",
      voice: "Giọng đọc · Hồng Tâm",
    },
    nav: {
      items: [
        { label: "Trang chủ", href: "/#trang-chu" },
        { label: "Đọc thơ", href: "/doc-tho" },
        { label: "Kể chuyện", href: "/#ke-chuyen" },
        { label: "Góc chữa lành", href: "/#chua-lanh" },
        { label: "Liên hệ", href: "/#lien-he" },
      ],
      facebook: "Facebook",
    },
    hero: {
      eyebrow: "Sông nước quê · nắng cuối ngày · chạm vào ký ức",
      title: "Một góc lắng lại giữa dòng đời vội",
      description:
        "Hồn Thơ là nơi thơ, chuyện và những xúc cảm nhẹ được cất lên trong sắc chiều bên dòng sông quê, để mỗi người có thể thở chậm và tìm lại một khoảng yên cho riêng mình.",
      primaryCta: "Khám phá nội dung",
      secondaryCta: "Gửi lời nhắn",
    },
    intro: {
      eyebrow: "Tinh thần dự án",
      title: "Không gian mang hồn quê trong sắc chiều",
      description:
        "Hồn Thơ hướng đến một trải nghiệm yên, ấm và có chiều sâu. Từng mảng nội dung đều ưu tiên sự mộc mạc của thơ, chuyện và ký ức quê nhà, để người xem không chỉ đọc mà còn thật sự cảm được một nhịp sống chậm giữa ngày dài.",
      keywordTitle: "Từ khóa thương hiệu",
      keywords: ["sông nước", "chiều tà", "quê hương", "bình yên", "chữa lành"],
    },
    contentPillars: {
      eyebrow: "Ba trụ nội dung",
      title: "Những khoảng nội dung giữ nhịp cảm xúc cho toàn bộ website",
      cta: "Xem thêm",
      items: [
        {
          id: "doc-tho",
          title: "Đọc thơ giữa chiều quê",
          description: "Những bài thơ nhẹ, sâu và mộc như hơi thở buổi chiều trên mặt sông quê nhà.",
          image:
            "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho",
        },
        {
          id: "ke-chuyen",
          title: "Kể chuyện bên dòng sông",
          description: "Chuyện đời thường, chuyện cũ và những ký ức chạm vào lòng người bằng giọng kể ấm.",
          image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
          href: "/#ke-chuyen",
        },
        {
          id: "chua-lanh",
          title: "Góc chữa lành bằng câu chữ",
          description: "Một khoảng lặng để đọc, nghe và thở chậm hơn giữa guồng quay bận rộn mỗi ngày.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          href: "/#chua-lanh",
        },
      ],
    },
    featured: {
      eyebrow: "Nội dung nổi bật",
      title: "Những điểm chạm cảm xúc giữa trang",
      description:
        "Khối này giúp khách nhìn vào là hiểu rõ website có gì: thơ, chuyện và chuyên mục nghe nhẹ nhàng để giữ sự kết nối lâu dài.",
      items: [
        {
          tag: "Thơ quê hương",
          title: "Bài thơ nổi bật",
          description:
            "Một bài thơ về con nước, bến đò và nỗi nhớ nhà len vào sắc nâu cam của hoàng hôn.",
          image:
            "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1400&q=80",
        },
        {
          tag: "Kể chuyện",
          title: "Câu chuyện mới",
          description:
            "Một câu chuyện tuổi thơ miền sông nước, nơi nhịp sống chậm và tình người luôn ấm áp.",
          image:
            "https://images.unsplash.com/photo-1533049022226-84f52f1ff4bd?auto=format&fit=crop&w=1400&q=80",
        },
        {
          tag: "Chữa lành",
          title: "Nghe trong đêm",
          description: "Chuyên mục giọng đọc dịu, hợp để nghe khi chiều xuống hoặc trước khi nghỉ ngơi.",
          image:
            "https://images.unsplash.com/photo-1495563381401-ecfbcaaa67d1?auto=format&fit=crop&w=1400&q=80",
        },
      ],
    },
    moodboard: {
      eyebrow: "Mood quê hương",
      title: "Những nhóm hình ảnh chốt hồn thương hiệu",
      items: [
        {
          title: "Sông nước quê hương lúc chiều tà",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Bến đò cũ trong ánh nắng hoàng hôn",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Cánh đồng dưới nền trời nâu cam",
          image:
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Khói bếp chiều và mặt nước lặng",
          image:
            "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    },
    googleSearch: {
      eyebrow: "Tìm kiếm với Google",
      title: "Tìm nhanh trên Google",
      description: "Bạn có thể tìm nhanh các bài viết, chủ đề hoặc nội dung liên quan qua Google.",
      placeholder: "Ví dụ: thơ chiều tà, truyện chữa lành, quê hương...",
      button: "Tìm trên Google",
      hints: {
        empty: "Vui lòng nhập từ khóa trước khi tìm kiếm.",
        blocked: "Trình duyệt đang chặn tab mới. Vui lòng cho phép pop-up để tiếp tục.",
        opened: "Đã mở Google ở tab mới.",
      },
    },
    social: {
      eyebrow: "Theo dõi mạng xã hội",
      title: "Cùng đồng hành với Hồn Thơ trên Facebook",
      description: "Tụi mình cập nhật bài mới, lời đọc mới và những chia sẻ gần gũi hằng tuần tại fanpage chính thức.",
      button: "Theo dõi trên Facebook",
      note: "Các kênh khác sẽ được cập nhật sau.",
    },
    contact: {
      eyebrow: "Lời mời tương tác",
      title: "Gửi lời nhắn, góp ý hoặc chia sẻ thơ và truyện của bạn",
      description:
        "Nếu bạn muốn gửi lời nhắn, góp ý hoặc chia sẻ những nội dung ý nghĩa, hãy để lại thông tin qua biểu mẫu liên hệ. Chúng tôi sẽ ghi nhận và phản hồi khi phù hợp.",
      cardTitle: "Biểu mẫu liên hệ",
      cardDescription: "Hãy để lại thông tin và lời nhắn của bạn qua biểu mẫu liên hệ.",
      button: "Mở biểu mẫu liên hệ",
      helper: "Biểu mẫu sẽ mở ở tab mới để bạn điền thông tin.",
    },
    footer: {
      description: "Nơi thơ, chuyện và những xúc cảm nhẹ nhàng tìm về nhau giữa sắc chiều quê hương.",
      facebook: "Facebook chính thức",
      rights: "All rights reserved.",
      by: "By Khương Bình",
    },
    articleSample: {
      breadcrumbHome: "Trang chủ",
      breadcrumbCurrent: "Bài viết mẫu",
      category: "Đọc thơ",
      title: "Chiều xuống bên bờ sông quê",
      summary:
        "Một bài viết dành cho những ai muốn thả nhịp sống chậm lại, lắng nghe tiếng nước chảy qua ký ức và tìm thấy sự bình yên trong những điều rất đỗi giản dị.",
      meta: {
        authorLabel: "Tác giả",
        voiceLabel: "Giọng đọc",
        readTimeLabel: "Thời gian đọc",
        publishDateLabel: "Ngày đăng",
        authorValue: "Lê Dũng",
        voiceValue: "Hồng Tâm",
        readTimeValue: "7 phút",
        publishDateValue: "13.04.2026",
      },
      actionBar: {
        read: "Đọc bài",
        listen: "Nghe bản đọc",
        watch: "Xem bản kể",
        share: "Chia sẻ",
      },
      body: {
        paragraph1:
          "Chiều xuống rất chậm trên mặt sông. Ánh nắng cuối ngày rơi thành những vệt mảnh, lấp lánh rồi tan đi như một lời chào nhẹ. Bên bờ cỏ, tiếng gió sột soạt qua hàng cây khiến lòng người tự nhiên dịu lại, như thể mọi mệt mỏi cũng biết tìm chỗ để lắng xuống.",
        paragraph2:
          "Có những ngày, ta không cần đi đâu xa để chữa lành. Chỉ cần ngồi yên trước một khoảng nước quen, nghe tiếng chim gọi nhau về tổ, nhớ mùi khói bếp từ căn nhà cũ, là đã thấy trái tim mình bớt chông chênh. Quê hương đôi khi không chỉ là nơi ta sinh ra, mà còn là nơi ta có thể trở về trong trí nhớ mỗi khi lòng chùng xuống.",
        quote:
          "Có những chiều không cần nói gì nhiều, chỉ nghe tiếng nước chảy cũng đủ thấy lòng mình yên lại.",
        subheading: "Khi ký ức trở thành một nơi trú ngụ",
        paragraph3:
          "Những câu thơ, những câu chuyện nhẹ nhàng không cố gắng làm điều gì quá lớn. Chúng chỉ âm thầm mở ra một góc nhỏ để người đọc ngồi lại với chính mình. Trong nhịp sống vội, đôi khi một đoạn chữ vừa đủ cũng đã là một bàn tay đặt nhẹ lên vai, nhắc ta thở sâu hơn và đi chậm lại.",
      },
      media: {
        eyebrow: "Đa nền tảng nội dung",
        title: "Nghe và xem nội dung này",
        cards: [
          {
            label: "Nghe bản đọc",
            title: "Một giọng đọc chậm và ấm",
            description: "Dành cho lúc chiều muộn hoặc trước giờ nghỉ, khi bạn muốn lắng lại và nghe câu chữ chạm vào ký ức.",
            duration: "Thời lượng: 08:20",
            button: "Mở bản nghe",
          },
          {
            label: "Xem bản kể",
            title: "Khung hình kể chuyện quê",
            description: "Phiên bản kể chuyện bằng hình ảnh chuyển động nhẹ, giữ trọn tinh thần chậm, sâu và bình yên.",
            duration: "Thời lượng: 10:05",
            button: "Mở video",
          },
        ],
      },
      related: {
        title: "Nội dung liên quan",
        backHome: "Về trang chủ",
        readMore: "Xem chi tiết",
        items: [
          {
            tag: "Kể chuyện",
            title: "Gió sớm trên bến đò cũ",
            description: "Những lát cắt nhỏ của tuổi thơ, nơi tiếng mái chèo còn vang trong ký ức.",
            href: "#",
          },
          {
            tag: "Góc chữa lành",
            title: "Đêm yên và lời ru của nước",
            description: "Một bài viết nhẹ, dành cho những ai muốn thở chậm và nghe lòng mình dịu lại.",
            href: "#",
          },
          {
            tag: "Đọc thơ",
            title: "Mùa lúa chín và mùi khói bếp",
            description: "Sắc vàng cuối vụ chạm vào miền nhớ, gợi nên cảm giác ấm áp rất quê nhà.",
            href: "#",
          },
        ],
      },
      closing: {
        eyebrow: "Kết nối cùng Hồn Thơ",
        title: "Gửi lời nhắn hoặc chia sẻ nội dung bạn muốn chúng tôi lắng nghe",
        description:
          "Nếu bạn muốn gửi góp ý, đề xuất nội dung hoặc chia sẻ thơ và truyện của mình, hãy mở biểu mẫu liên hệ để điền thông tin.",
        button: "Mở biểu mẫu liên hệ",
      },
    },
    poetryPage: {
      heroEyebrow: "Thư viện thơ",
      title: "Đọc thơ",
      description:
        "Những bài thơ mang nhịp chậm của chiều quê, nơi ký ức và cảm xúc được nâng niu bằng câu chữ mộc mạc.",
      featured: {
        tag: "Bài thơ nổi bật",
        title: "Chiều xuống bên bờ sông quê",
        description:
          "Bài thơ mở đầu cho tinh thần Hồn Thơ: chậm, ấm, sâu và giàu ký ức. Rất phù hợp để đọc trong những giờ chiều lặng.",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
        href: "/bai-viet-mau",
        button: "Đọc bài",
      },
      gridTitle: "Tuyển chọn thơ",
      items: [
        {
          tag: "Thơ quê hương",
          title: "Mùa gió cũ qua bến đò",
          description: "Một đoạn thơ nhỏ về con nước, bến cũ và nỗi nhớ nhà sau những ngày xa.",
          image:
            "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
        {
          tag: "Thơ ký ức",
          title: "Khói bếp chiều qua hiên",
          description: "Câu chữ mộc mạc gợi mùi bếp lửa và sự bình yên của buổi chiều quê.",
          image:
            "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
        {
          tag: "Thơ chữa lành",
          title: "Ngồi nghe nước kể",
          description: "Bài thơ ngắn cho những ngày cần nghỉ lại giữa guồng quay vội.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
        {
          tag: "Thơ tình quê",
          title: "Ánh nâu cuối trời",
          description: "Sắc trời hoàng hôn và nhịp lòng người gặp nhau trong một khoảng lặng đẹp.",
          image:
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
        {
          tag: "Thơ đêm",
          title: "Lời ru bên cửa sổ",
          description: "Những câu thơ dành cho đêm muộn, khi ta muốn nghe lại tiếng lòng.",
          image:
            "https://images.unsplash.com/photo-1495563381401-ecfbcaaa67d1?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
        {
          tag: "Thơ nhẹ",
          title: "Một vệt nắng trên sông",
          description: "Bài thơ dịu, ngắn và giàu hình ảnh, thích hợp để đọc trong vài phút yên tĩnh.",
          image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
      ],
      cardButton: "Đọc bài",
    },
  },
  en: {
    brandName: "Hồn Thơ",
    signature: {
      poetry: "Poetry · Lê Dũng",
      voice: "Voice · Hồng Tâm",
    },
    nav: {
      items: [
        { label: "Home", href: "/#trang-chu" },
        { label: "Poetry", href: "/doc-tho" },
        { label: "Stories", href: "/#ke-chuyen" },
        { label: "Healing Corner", href: "/#chua-lanh" },
        { label: "Contact", href: "/#lien-he" },
      ],
      facebook: "Facebook",
    },
    hero: {
      eyebrow: "Riverside homeland · late sunlight · touching memory",
      title: "A quiet pause in the rush of life",
      description:
        "Hồn Thơ is a place for poetry, stories, and gentle emotions held in the light of evening by the riverside, so each person may breathe more slowly and find a quiet space within.",
      primaryCta: "Explore content",
      secondaryCta: "Leave a message",
    },
    intro: {
      eyebrow: "Project spirit",
      title: "A space filled with the soul of home at dusk",
      description:
        "Hồn Thơ offers a calm, warm, and thoughtful experience. Each piece of content embraces the simplicity of poetry, storytelling, and memories of home, so readers do not only read, but truly feel a slower rhythm within the day.",
      keywordTitle: "Brand keywords",
      keywords: ["riverside", "dusk", "homeland", "peace", "healing"],
    },
    contentPillars: {
      eyebrow: "Three content pillars",
      title: "Core spaces that hold the emotional rhythm of the website",
      cta: "Read more",
      items: [
        {
          id: "doc-tho",
          title: "Poetry at dusk",
          description: "Soft, deep poems that feel like evening breath over the water back home.",
          image:
            "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho",
        },
        {
          id: "ke-chuyen",
          title: "Stories by the river",
          description: "Everyday tales and old memories told in a warm, familiar voice.",
          image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
          href: "/#ke-chuyen",
        },
        {
          id: "chua-lanh",
          title: "Healing through words",
          description: "A gentle corner to read, listen, and breathe more slowly in busy days.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          href: "/#chua-lanh",
        },
      ],
    },
    featured: {
      eyebrow: "Featured content",
      title: "Emotional highlights across the page",
      description:
        "This block helps visitors quickly understand the site: poetry, stories, and soft listening pieces that keep them connected.",
      items: [
        {
          tag: "Homeland poetry",
          title: "Featured poem",
          description: "A poem of river water, old docks, and homesickness under amber dusk light.",
          image:
            "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1400&q=80",
        },
        {
          tag: "Stories",
          title: "New story",
          description: "A short story from a riverside childhood, with a slow pace and warm hearts.",
          image:
            "https://images.unsplash.com/photo-1533049022226-84f52f1ff4bd?auto=format&fit=crop&w=1400&q=80",
        },
        {
          tag: "Healing",
          title: "Listening at night",
          description: "A gentle voice series for late afternoons and quiet moments before rest.",
          image:
            "https://images.unsplash.com/photo-1495563381401-ecfbcaaa67d1?auto=format&fit=crop&w=1400&q=80",
        },
      ],
    },
    moodboard: {
      eyebrow: "Homeland mood",
      title: "Image groups that define the brand soul",
      items: [
        {
          title: "Riverside homeland at dusk",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "An old ferry dock in sunset light",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Fields beneath an amber sky",
          image:
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Evening kitchen smoke and still water",
          image:
            "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    },
    googleSearch: {
      eyebrow: "Search with Google",
      title: "Quick search on Google",
      description: "You can quickly look up related topics, writings, or themes through Google.",
      placeholder: "For example: evening poems, healing stories, homeland...",
      button: "Search on Google",
      hints: {
        empty: "Please enter a keyword before searching.",
        blocked: "Your browser blocked the new tab. Please allow pop-ups to continue.",
        opened: "Google has opened in a new tab.",
      },
    },
    social: {
      eyebrow: "Follow on social",
      title: "Stay close with Hồn Thơ on Facebook",
      description: "We share new pieces, new voice readings, and gentle weekly notes on our official page.",
      button: "Follow on Facebook",
      note: "Other channels will be added later.",
    },
    contact: {
      eyebrow: "An invitation to connect",
      title: "Leave a message, share your thoughts, or send us your poems and stories",
      description:
        "If you would like to leave a message, share feedback, or send meaningful writing, please use the contact form. We will receive it and respond when appropriate.",
      cardTitle: "Contact form",
      cardDescription: "Leave your information and message through the contact form.",
      button: "Open contact form",
      helper: "The form will open in a new tab for you to fill in.",
    },
    footer: {
      description: "A place where poetry, stories, and gentle emotions meet in the light of dusk.",
      facebook: "Official Facebook",
      rights: "All rights reserved.",
      by: "By Khương Bình",
    },
    articleSample: {
      breadcrumbHome: "Home",
      breadcrumbCurrent: "Sample article",
      category: "Poetry",
      title: "Evening by the riverside of home",
      summary:
        "A piece for those who want to slow down, listen to flowing water through memory, and find peace in simple things.",
      meta: {
        authorLabel: "Author",
        voiceLabel: "Voice",
        readTimeLabel: "Reading time",
        publishDateLabel: "Published",
        authorValue: "Lê Dũng",
        voiceValue: "Hồng Tâm",
        readTimeValue: "7 min",
        publishDateValue: "Apr 13, 2026",
      },
      actionBar: {
        read: "Read",
        listen: "Listen",
        watch: "Watch",
        share: "Share",
      },
      body: {
        paragraph1:
          "Evening settles slowly over the river. The last sunlight breaks into small glints, then fades like a soft goodbye. Along the grassy bank, the wind passing through trees makes the heart grow quieter, as if every fatigue has found a place to rest.",
        paragraph2:
          "Some days, we do not need to go far to heal. Sitting before familiar water, hearing birds return to their nests, remembering kitchen smoke from an old home is enough to steady the heart. Homeland is not only where we were born, but also where memory lets us return when life feels heavy.",
        quote:
          "Some evenings need no words; the sound of water is enough to calm the heart.",
        subheading: "When memory becomes a place to rest",
        paragraph3:
          "Poems and stories like these do not try to be grand. They quietly open a small corner where readers can sit with themselves. In a hurried life, a short passage can be a gentle hand on the shoulder, reminding us to breathe deeply and slow down.",
      },
      media: {
        eyebrow: "Multi-format content",
        title: "Listen to or watch this piece",
        cards: [
          {
            label: "Listen",
            title: "A slow and warm voice",
            description: "For late afternoons or before rest, when you want words to settle gently inside.",
            duration: "Duration: 08:20",
            button: "Open audio",
          },
          {
            label: "Watch",
            title: "A visual storytelling frame",
            description: "A visual version that keeps the same slow, deep, and peaceful spirit.",
            duration: "Duration: 10:05",
            button: "Open video",
          },
        ],
      },
      related: {
        title: "Related pieces",
        backHome: "Back to home",
        readMore: "Read details",
        items: [
          {
            tag: "Stories",
            title: "Morning wind by the old dock",
            description: "Small slices of childhood where the rowing rhythm still echoes.",
            href: "#",
          },
          {
            tag: "Healing Corner",
            title: "A quiet night and water lullaby",
            description: "A gentle piece for slowing down and hearing your inner voice.",
            href: "#",
          },
          {
            tag: "Poetry",
            title: "Harvest season and kitchen smoke",
            description: "Golden fields touch memory and return a warm feeling of home.",
            href: "#",
          },
        ],
      },
      closing: {
        eyebrow: "Connect with Hồn Thơ",
        title: "Leave a message or share what you would like us to hear",
        description:
          "If you want to send feedback, propose topics, or share your poems and stories, open the contact form and leave your information.",
        button: "Open contact form",
      },
    },
    poetryPage: {
      heroEyebrow: "Poetry library",
      title: "Poetry",
      description:
        "A collection of poems shaped by the slow rhythm of dusk, where memory and feeling are held with gentle words.",
      featured: {
        tag: "Featured poem",
        title: "Evening by the riverside of home",
        description:
          "A leading piece that captures the spirit of Hồn Thơ: slow, warm, deep, and full of memory.",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
        href: "/bai-viet-mau",
        button: "Read",
      },
      gridTitle: "Poetry selections",
      items: [
        {
          tag: "Homeland poetry",
          title: "Old winds by the ferry dock",
          description: "A short poem about water, old docks, and homesickness after long days away.",
          image:
            "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
        {
          tag: "Memory poetry",
          title: "Evening smoke by the porch",
          description: "Simple lines that recall kitchen fire and the peace of home at dusk.",
          image:
            "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
        {
          tag: "Healing poetry",
          title: "Listening to the water",
          description: "A short, soothing poem for days when you need to pause.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
        {
          tag: "Rural love",
          title: "Amber sky at sunset",
          description: "The dusk sky and the human heart meet in a beautiful still moment.",
          image:
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
        {
          tag: "Night poetry",
          title: "Lullaby by the window",
          description: "Lines written for quiet nights when you want to listen inward.",
          image:
            "https://images.unsplash.com/photo-1495563381401-ecfbcaaa67d1?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
        {
          tag: "Light verse",
          title: "A line of sun on water",
          description: "A brief poem rich in image, for a few peaceful minutes.",
          image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
          href: "/bai-viet-mau",
        },
      ],
      cardButton: "Read",
    },
  },
};