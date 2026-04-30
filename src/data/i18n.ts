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
  href: string;
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

export type ContactQuickLink = {
  id: "contact" | "bookcase" | "support";
  title: string;
  description: string;
  button: string;
};

export type FooterLink = {
  id: "home" | "poetry" | "stories" | "spiritual" | "contact" | "facebook" | "youtube" | "bookcase" | "support";
  label: string;
  href: string;
  external?: boolean;
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
    youtube: string;
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
    brandCardTitle: string;
    brandCardSlogan: string;
    brandCardDescription: string;
    brandCardTags: string[];
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
    quickLinksTitle: string;
    quickLinks: ContactQuickLink[];
  };
  footer: {
    description: string;
    decorativeNote: string;
    exploreTitle: string;
    companionTitle: string;
    exploreLinks: FooterLink[];
    companionLinks: FooterLink[];
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
    intro: string;
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
        { label: "Kể chuyện", href: "/ke-chuyen" },
        { label: "Tâm linh", href: "/tam-linh" },
        { label: "Cổ học", href: "/huyen-mon-tham-khao" },
        { label: "Liên hệ", href: "/#lien-he" },
      ],
      facebook: "Facebook",
      youtube: "YouTube",
    },
    hero: {
      eyebrow: "Sông nước quê · nắng cuối ngày · chạm vào ký ức",
      title: "Hồn Thơ",
      description:
        "Nơi câu chữ và giọng đọc cất lên giữa sắc chiều quê hương.",
      primaryCta: "Khám phá nội dung",
      secondaryCta: "Gửi lời nhắn",
    },
    intro: {
      eyebrow: "Tinh thần dự án",
      title: "Không gian mang hồn quê trong sắc chiều",
      description:
        "Hồn Thơ hướng đến một trải nghiệm yên, ấm và có chiều sâu. Từng mảng nội dung đều ưu tiên sự mộc mạc của thơ, chuyện và ký ức quê nhà, để người xem không chỉ đọc mà còn thật sự cảm được một nhịp sống chậm giữa ngày dài.",
      brandCardTitle: "Dấu ấn thương hiệu",
      brandCardSlogan: "Một miền sông nước cho câu thơ neo lại.",
      brandCardDescription:
        "Một không gian thơ mang hơi thở sông nước, quê hương và những rung động dịu dàng.",
      brandCardTags: ["sông nước", "chiều quê", "ký ức"],
    },
    contentPillars: {
      eyebrow: "Ba nhịp nội dung",
      title: "Những miền chữ giữ nhịp lắng cho Hồn Thơ",
      cta: "Xem thêm",
      items: [
        {
          id: "doc-tho",
          title: "Đọc thơ giữa chiều quê",
          description: "Những câu thơ mộc và sâu, neo lại ở nắng cuối ngày và hơi nước của miền sông cũ.",
          image:
            "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho",
        },
        {
          id: "ke-chuyen",
          title: "Kể chuyện bên dòng sông",
          description: "Những lát cắt đời thường được kể lại bằng giọng chậm, ấm và giàu tình người quê nhà.",
          image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
          href: "/ke-chuyen",
        },
        {
          id: "tam-linh",
          title: "Tâm linh giữa chiều lặng",
          description: "Một khoảng chiêm nghiệm nhẹ, nơi lòng người tìm về sự tĩnh tại qua chữ nghĩa và hơi thở chậm.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          href: "/tam-linh",
        },
      ],
    },
    featured: {
      eyebrow: "Nội dung nổi bật",
      title: "Những trang chữ đang được lắng nghe",
      description:
        "Ba mạch nội dung của Hồn Thơ gặp nhau trong những bài viết được bạn đọc tìm đến nhiều: một bài thơ, một câu chuyện và một góc chiêm nghiệm.",
      items: [
        {
          tag: "Đọc thơ",
          title: "Bến Đò",
          description:
            "Nhịp chèo chậm, tiếng gọi bến đợi và nỗi thương nhớ bền bỉ tạo nên một dư âm rất quê.",
          image: "/images/poems/ben-do.jpeg",
          href: "/doc-tho/ben-do",
        },
        {
          tag: "Kể chuyện",
          title: "Bến Đò Cũ Qua Một Mùa Mưa",
          description:
            "Một lát cắt miền sông nước đi từ cơn mưa chiều đến sự ấm áp của tình người bình dị.",
          image:
            "https://images.unsplash.com/photo-1470163395405-d2b80e7450ed?auto=format&fit=crop&w=1400&q=80",
          href: "/ke-chuyen/ben-do-cu-qua-mot-mua-mua",
        },
        {
          tag: "Tâm linh",
          title: "Mùa Chuông Chiều Trong Sân Chùa Nhỏ",
          description:
            "Âm chuông và mưa nhẹ mở ra một khoảng tĩnh, để lòng người tự dịu sau những ngày nhiều xao động.",
          image:
            "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?auto=format&fit=crop&w=1400&q=80",
          href: "/tam-linh/mua-chuong-chieu-trong-san-chua-nho",
        },
      ],
    },
    social: {
      eyebrow: "Theo dõi mạng xã hội",
      title: "Cùng đồng hành với Hồn Thơ trên Facebook",
      description: "Tụi mình cập nhật bài mới, lời đọc mới và những chia sẻ gần gũi hằng tuần tại fanpage chính thức.",
      button: "Theo dõi trên Facebook",
      note: "Mỗi tuần, mình hẹn nhau một khoảng lặng ở đó.",
    },
    contact: {
      eyebrow: "Một lời ghé lại",
      title: "Gửi một lời nhắn cho Hồn Thơ",
      description:
        "Nếu bạn muốn gửi lời nhắn hoặc chia sẻ một điều nhỏ, Hồn Thơ luôn trân trọng.",
      cardTitle: "Biểu mẫu liên hệ",
      cardDescription: "Điền vài dòng ngắn qua biểu mẫu liên hệ.",
      button: "Mở biểu mẫu liên hệ",
      helper: "Mở ở tab mới.",
      quickLinksTitle: "Chọn lối đi tiếp theo",
      quickLinks: [
        {
          id: "contact",
          title: "Gửi lời nhắn",
          description: "Chia sẻ điều bạn đang nghĩ qua biểu mẫu liên hệ.",
          button: "Mở biểu mẫu",
        },
        {
          id: "bookcase",
          title: "Tủ sách của nhà thơ",
          description: "Ghé xem những tập thơ đang được giới thiệu.",
          button: "Xem tủ sách",
        },
        {
          id: "support",
          title: "Ủng hộ Hồn Thơ",
          description: "Một lời đồng hành nhỏ để không gian này ở lại lâu hơn.",
          button: "Xem cách ủng hộ",
        },
      ],
    },
    footer: {
      description: "Nơi thơ, chuyện và những xúc cảm nhẹ nhàng tìm về nhau giữa sắc chiều quê hương.",
      decorativeNote: "Nhịp sông cũ vẫn cháy êm trong từng câu chữ.",
      exploreTitle: "Khám phá",
      companionTitle: "Đồng hành",
      exploreLinks: [
        { id: "home", label: "Trang chủ", href: "/#trang-chu" },
        { id: "poetry", label: "Đọc thơ", href: "/doc-tho" },
        { id: "stories", label: "Kể chuyện", href: "/ke-chuyen" },
        { id: "spiritual", label: "Tâm linh", href: "/tam-linh" },
      ],
      companionLinks: [
        { id: "contact", label: "Liên hệ", href: "/#lien-he" },
        { id: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61561724806320", external: true },
        { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@Hontho-BT", external: true },
        { id: "bookcase", label: "Tủ sách", href: "/tu-sach" },
        { id: "support", label: "Ủng hộ", href: "/ung-ho" },
      ],
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
            href: "/ke-chuyen/ben-do-cu-qua-mot-mua-mua",
          },
          {
            tag: "Tâm linh",
            title: "Đêm yên và lời ru của nước",
            description: "Một bài viết nhẹ, dành cho những ai muốn thở chậm và nghe lòng mình dịu lại.",
            href: "/tam-linh/mua-chuong-chieu-trong-san-chua-nho",
          },
          {
            tag: "Đọc thơ",
            title: "Mùa lúa chín và mùi khói bếp",
            description: "Sắc vàng cuối vụ chạm vào miền nhớ, gợi nên cảm giác ấm áp rất quê nhà.",
            href: "/doc-tho/ben-do",
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
      intro:
        "Mỗi bài thơ là một khoảng lặng nhỏ: có giọng quê, có chiều tà, có những xúc cảm được kể lại bằng nhịp điệu nhẹ nhàng.",
      featured: {
        tag: "Bài thơ nổi bật",
        title: "Chiều xuống bên bờ sông quê",
        description:
          "Bài thơ mở đầu cho tinh thần Hồn Thơ: chậm, ấm, sâu và giàu ký ức. Rất phù hợp để đọc trong những giờ chiều lặng.",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
        href: "/doc-tho/ben-do",
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
          href: "/doc-tho/ban-tay",
        },
        {
          tag: "Thơ ký ức",
          title: "Khói bếp chiều qua hiên",
          description: "Câu chữ mộc mạc gợi mùi bếp lửa và sự bình yên của buổi chiều quê.",
          image:
            "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/cam-hoa",
        },
        {
          tag: "Thơ chiêm nghiệm",
          title: "Ngồi nghe nước kể",
          description: "Bài thơ ngắn cho những ngày cần nghỉ lại giữa guồng quay vội.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/cam-on-tinh-yeu",
        },
        {
          tag: "Thơ tình quê",
          title: "Ánh nâu cuối trời",
          description: "Sắc trời hoàng hôn và nhịp lòng người gặp nhau trong một khoảng lặng đẹp.",
          image:
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/mot-thoang",
        },
        {
          tag: "Thơ đêm",
          title: "Lời ru bên cửa sổ",
          description: "Những câu thơ dành cho đêm muộn, khi ta muốn nghe lại tiếng lòng.",
          image:
            "https://images.unsplash.com/photo-1495563381401-ecfbcaaa67d1?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/hoa-buom",
        },
        {
          tag: "Thơ nhẹ",
          title: "Một vệt nắng trên sông",
          description: "Bài thơ dịu, ngắn và giàu hình ảnh, thích hợp để đọc trong vài phút yên tĩnh.",
          image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/hue-trang",
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
        { label: "Stories", href: "/ke-chuyen" },
        { label: "Spirituality", href: "/tam-linh" },
        { label: "Classical Studies", href: "/huyen-mon-tham-khao" },
        { label: "Contact", href: "/#lien-he" },
      ],
      facebook: "Facebook",
      youtube: "YouTube",
    },
    hero: {
      eyebrow: "Riverside homeland · late sunlight · touching memory",
      title: "Hồn Thơ",
      description:
        "A place where words and voice readings rise in the evening light of home.",
      primaryCta: "Explore content",
      secondaryCta: "Leave a message",
    },
    intro: {
      eyebrow: "Project spirit",
      title: "A space filled with the soul of home at dusk",
      description:
        "Hồn Thơ offers a calm, warm, and thoughtful experience. Each piece of content embraces the simplicity of poetry, storytelling, and memories of home, so readers do not only read, but truly feel a slower rhythm within the day.",
      brandCardTitle: "Brand signature",
      brandCardSlogan: "Where riverside memory lets every verse come to rest.",
      brandCardDescription:
        "A poetic space shaped by homeland textures, evening light, and gentle emotional depth.",
      brandCardTags: ["riverside", "dusk", "memory"],
    },
    contentPillars: {
      eyebrow: "Three content rhythms",
      title: "Three spaces of words that hold Hồn Thơ's gentle pace",
      cta: "Read more",
      items: [
        {
          id: "doc-tho",
          title: "Poetry at dusk",
          description: "Gentle, deep verses shaped by late sunlight and the riverside breath of home.",
          image:
            "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho",
        },
        {
          id: "ke-chuyen",
          title: "Stories by the river",
          description: "Everyday stories and old memories told in a warm, unhurried voice.",
          image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
          href: "/ke-chuyen",
        },
        {
          id: "tam-linh",
          title: "Spiritual stillness",
          description: "A quiet contemplative corner where words and breath return the heart to calm.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          href: "/tam-linh",
        },
      ],
    },
    featured: {
      eyebrow: "Featured content",
      title: "Pieces readers keep returning to",
      description:
        "These three pieces hold Hồn Thơ's core rhythm: one poem, one story, and one contemplative page.",
      items: [
        {
          tag: "Poetry",
          title: "Bến Đò",
          description: "A quiet ferry rhythm, a waiting shore, and a steady homesick tenderness.",
          image: "/images/poems/ben-do.jpeg",
          href: "/doc-tho/ben-do",
        },
        {
          tag: "Stories",
          title: "Old Dock Through a Rainy Season",
          description: "A riverside memory shaped by rain, familiar voices, and everyday kindness.",
          image:
            "https://images.unsplash.com/photo-1470163395405-d2b80e7450ed?auto=format&fit=crop&w=1400&q=80",
          href: "/ke-chuyen/ben-do-cu-qua-mot-mua-mua",
        },
        {
          tag: "Spirituality",
          title: "Evening Bell in a Small Pagoda Yard",
          description: "A gentle bell and light rain invite the heart back to stillness.",
          image:
            "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?auto=format&fit=crop&w=1400&q=80",
          href: "/tam-linh/mua-chuong-chieu-trong-san-chua-nho",
        },
      ],
    },
    social: {
      eyebrow: "Follow on social",
      title: "Stay close with Hồn Thơ on Facebook",
      description: "We share new pieces, new voice readings, and gentle weekly notes on our official page.",
      button: "Follow on Facebook",
      note: "A quiet weekly meeting place for readers and listeners.",
    },
    contact: {
      eyebrow: "A gentle return",
      title: "Leave a message for Hồn Thơ",
      description:
        "If you would like to leave a note or share a small thought, Hồn Thơ receives it with gratitude.",
      cardTitle: "Contact form",
      cardDescription: "Share a short note through the contact form.",
      button: "Open contact form",
      helper: "Opens in a new tab.",
      quickLinksTitle: "Choose your next step",
      quickLinks: [
        {
          id: "contact",
          title: "Leave a message",
          description: "Share what is on your mind through the contact form.",
          button: "Open form",
        },
        {
          id: "bookcase",
          title: "Poet's bookcase",
          description: "Browse the poetry books currently being introduced.",
          button: "View bookcase",
        },
        {
          id: "support",
          title: "Donate to Hồn Thơ",
          description: "A small gesture to help keep this space quietly alive.",
          button: "See donation options",
        },
      ],
    },
    footer: {
      description: "A place where poetry, stories, and gentle emotions meet in the light of dusk.",
      decorativeNote: "A slow riverline still glows beneath each quiet verse.",
      exploreTitle: "Explore",
      companionTitle: "Companion",
      exploreLinks: [
        { id: "home", label: "Home", href: "/#trang-chu" },
        { id: "poetry", label: "Poetry", href: "/doc-tho" },
        { id: "stories", label: "Stories", href: "/ke-chuyen" },
        { id: "spiritual", label: "Spirituality", href: "/tam-linh" },
      ],
      companionLinks: [
        { id: "contact", label: "Contact", href: "/#lien-he" },
        { id: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61561724806320", external: true },
        { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@Hontho-BT", external: true },
        { id: "bookcase", label: "Bookcase", href: "/tu-sach" },
        { id: "support", label: "Donate", href: "/ung-ho" },
      ],
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
            href: "/ke-chuyen/ben-do-cu-qua-mot-mua-mua",
          },
          {
            tag: "Spirituality",
            title: "A quiet night and water lullaby",
            description: "A gentle piece for slowing down and hearing your inner voice.",
            href: "/tam-linh/mua-chuong-chieu-trong-san-chua-nho",
          },
          {
            tag: "Poetry",
            title: "Harvest season and kitchen smoke",
            description: "Golden fields touch memory and return a warm feeling of home.",
            href: "/doc-tho/ben-do",
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
      intro:
        "Each poem is a gentle pause: carrying the voice of home, the light of dusk, and emotions told with calm rhythm.",
      featured: {
        tag: "Featured poem",
        title: "Evening by the riverside of home",
        description:
          "A leading piece that captures the spirit of Hồn Thơ: slow, warm, deep, and full of memory.",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
        href: "/doc-tho/ben-do",
        button: "Read",
      },
      gridTitle: "Poetry selections",
      items: [
        {
          tag: "Homeland poetry",
          title: "Bàn Tay",
          description: "A tender love poem that keeps the warmth of touch, home, and quiet devotion.",
          image:
            "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/ban-tay",
        },
        {
          tag: "Memory poetry",
          title: "Cắm Hoa",
          description: "A fragrant poem where white lily blossoms become memory, longing, and intimacy.",
          image:
            "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/cam-hoa",
        },
        {
          tag: "Reflective poetry",
          title: "Cảm Ơn Tình Yêu",
          description: "A reflective piece on love after midlife, calm in tone yet deeply luminous.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/cam-on-tinh-yeu",
        },
        {
          tag: "Rural love",
          title: "Một Thoáng",
          description: "A brief encounter that lingers as lifelong longing and unfinished affection.",
          image:
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/mot-thoang",
        },
        {
          tag: "Night poetry",
          title: "Hoa Bướm",
          description: "Flower and butterfly imagery weave a dreamy, aching portrait of devoted love.",
          image:
            "https://images.unsplash.com/photo-1495563381401-ecfbcaaa67d1?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/hoa-buom",
        },
        {
          tag: "Light verse",
          title: "Huệ Trắng",
          description: "The scent of lily revives old memory and carries a deeply nostalgic aftertaste.",
          image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
          href: "/doc-tho/hue-trang",
        },
      ],
      cardButton: "Read",
    },
  },
};
