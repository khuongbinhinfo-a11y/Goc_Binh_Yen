import { ContentType } from "@/data/contentLibrary";
import { Locale } from "@/data/i18n";
import { LOCAL_IMAGE_MAP } from "@/lib/image";

type ListingCopy = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  intro: string;
  featuredTag: string;
  gridTitle: string;
  readButton: string;
  fallbackNotice: string;
};

type DetailCopy = {
  breadcrumb: string;
  notFound: string;
  notFoundBack: string;
  metaAuthor: string;
  metaVoice: string;
  metaReadTime: string;
  metaDate: string;
  actionRead: string;
  actionListen: string;
  actionWatch: string;
  actionShare: string;
  mediaEyebrow: string;
  mediaTitle: string;
  audioTitle: string;
  audioButton: string;
  videoTitle: string;
  videoButton: string;
  relatedTitle: string;
  readButton: string;
  contactEyebrow: string;
  contactTitle: string;
  contactDescription: string;
  contactButton: string;
  fallbackNotice: string;
  analysisTitle?: string;
  analysisEmotion?: string;
  analysisImages?: string;
  analysisMeaning?: string;
  analysisLine?: string;
};

type BranchCopy = {
  listing: ListingCopy;
  detail: DetailCopy;
};

type ReadingTranslation = Record<ContentType, BranchCopy>;

const readingTranslations: Record<Locale, ReadingTranslation> = {
  vi: {
    poem: {
      listing: {
        eyebrow: "Thư viện thơ",
        title: "Đọc thơ",
        description:
          "Những bài thơ mang nhịp chậm của chiều quê, nơi ký ức và cảm xúc được nâng niu bằng câu chữ mộc mạc.",
        heroImage: LOCAL_IMAGE_MAP.heroPoetry.src,
        heroAlt: "Bến sông quê trong ánh chiều",
        intro:
          "Mỗi bài thơ là một khoảng lặng nhỏ: có giọng quê, có chiều tà, có những xúc cảm được kể lại bằng nhịp điệu nhẹ nhàng.",
        featuredTag: "Bài thơ nổi bật",
        gridTitle: "Tuyển chọn thơ",
        readButton: "Đọc bài",
        fallbackNotice:
          "Một số bài đang được hoàn thiện bản dịch Anh, nên hiện có thể còn hiển thị tiếng Việt.",
      },
      detail: {
        breadcrumb: "Đọc thơ",
        notFound: "Bài thơ này chưa sẵn sàng hiển thị.",
        notFoundBack: "Quay về Đọc thơ",
        metaAuthor: "Tác giả",
        metaVoice: "Giọng đọc",
        metaReadTime: "Thời gian đọc",
        metaDate: "Ngày đăng",
        actionRead: "Đọc bài",
        actionListen: "Nghe bản đọc",
        actionWatch: "Xem bản kể",
        actionShare: "Chia sẻ",
        mediaEyebrow: "Nghe và xem",
        mediaTitle: "Nghe và xem nội dung này",
        audioTitle: "Nghe bản đọc",
        audioButton: "Mở bản nghe",
        videoTitle: "Xem bản kể",
        videoButton: "Mở video",
        relatedTitle: "Bài thơ liên quan",
        readButton: "Đọc bài",
        contactEyebrow: "Lời mời tương tác",
        contactTitle: "Gửi lời nhắn hoặc chia sẻ cảm nhận của bạn cùng Hồn Thơ",
        contactDescription:
          "Nếu bạn muốn gửi góp ý, đề xuất chủ đề hoặc chia sẻ những câu chữ đồng điệu, hãy mở biểu mẫu liên hệ để để lại thông tin.",
        contactButton: "Mở biểu mẫu liên hệ",
        fallbackNotice:
          "Bản dịch tiếng Anh của bài này đang được bổ sung, nên hiện có phần nội dung hiển thị tiếng Việt.",
        analysisTitle: "Phân tích bài thơ",
        analysisEmotion: "Mạch cảm xúc",
        analysisImages: "Hình ảnh nổi bật",
        analysisMeaning: "Ý nghĩa / dư vị",
        analysisLine: "Câu thơ đáng nhớ",
      },
    },
    story: {
      listing: {
        eyebrow: "Thư viện kể chuyện",
        title: "Kể chuyện",
        description:
          "Những câu chuyện mộc mạc từ đời sống sông nước, nơi ký ức, tình người và nhịp sống chậm còn được giữ nguyên.",
        heroImage: LOCAL_IMAGE_MAP.heroStory.src,
        heroAlt: "Bến đò cũ trong cơn mưa chiều",
        intro:
          "Mỗi bài kể là một lát cắt gần gũi của quê nhà, được kể bằng giọng nhẹ, ấm và đủ sâu để người đọc dừng lại.",
        featuredTag: "Câu chuyện nổi bật",
        gridTitle: "Tuyển chọn kể chuyện",
        readButton: "Đọc bài",
        fallbackNotice:
          "Một số bài đang được hoàn thiện bản dịch Anh, nên hiện có thể còn hiển thị tiếng Việt.",
      },
      detail: {
        breadcrumb: "Kể chuyện",
        notFound: "Bài kể chuyện này chưa sẵn sàng hiển thị.",
        notFoundBack: "Quay về Kể chuyện",
        metaAuthor: "",
        metaVoice: "Giọng đọc",
        metaReadTime: "Thời gian đọc",
        metaDate: "Ngày đăng",
        actionRead: "Đọc bài",
        actionListen: "Nghe bản đọc",
        actionWatch: "Xem bản kể",
        actionShare: "Chia sẻ",
        mediaEyebrow: "Nghe và xem",
        mediaTitle: "Nghe và xem nội dung này",
        audioTitle: "Nghe bản đọc",
        audioButton: "Mở bản nghe",
        videoTitle: "Xem bản kể",
        videoButton: "Mở video",
        relatedTitle: "Nội dung liên quan",
        readButton: "Đọc bài",
        contactEyebrow: "Lời mời tương tác",
        contactTitle: "Gửi lời nhắn hoặc chia sẻ câu chuyện của bạn",
        contactDescription:
          "Nếu bạn muốn gửi góp ý, đề xuất chủ đề hoặc kể lại một câu chuyện quê nhà, hãy mở biểu mẫu liên hệ để để lại thông tin.",
        contactButton: "Mở biểu mẫu liên hệ",
        fallbackNotice:
          "Bản dịch tiếng Anh của bài này đang được bổ sung, nên hiện có phần nội dung hiển thị tiếng Việt.",
      },
    },
    spiritual: {
      listing: {
        eyebrow: "Thư viện tâm linh",
        title: "Tâm linh",
        description:
          "Những bài viết lắng sâu cho khoảng chiêm nghiệm nhẹ, nơi nhịp thở chậm lại và lòng người tìm được sự an tĩnh.",
        heroImage: LOCAL_IMAGE_MAP.heroSpiritual.src,
        heroAlt: "Khoảng sân chùa yên tĩnh lúc cuối ngày",
        intro:
          "Mỗi nội dung là một khoảng dừng vừa đủ để nhìn vào bên trong, giữ tinh thần chậm, ấm và sâu của Hồn Thơ.",
        featuredTag: "Nội dung nổi bật",
        gridTitle: "Tuyển chọn tâm linh",
        readButton: "Đọc bài",
        fallbackNotice:
          "Một số bài đang được hoàn thiện bản dịch Anh, nên hiện có thể còn hiển thị tiếng Việt.",
      },
      detail: {
        breadcrumb: "Tâm linh",
        notFound: "Nội dung tâm linh này chưa sẵn sàng hiển thị.",
        notFoundBack: "Quay về Tâm linh",
        metaAuthor: "",
        metaVoice: "Giọng đọc",
        metaReadTime: "Thời gian đọc",
        metaDate: "Ngày đăng",
        actionRead: "Đọc bài",
        actionListen: "Nghe bản đọc",
        actionWatch: "Xem bản kể",
        actionShare: "Chia sẻ",
        mediaEyebrow: "Nghe và xem",
        mediaTitle: "Nghe và xem nội dung này",
        audioTitle: "Nghe bản đọc",
        audioButton: "Mở bản nghe",
        videoTitle: "Xem bản kể",
        videoButton: "Mở video",
        relatedTitle: "Nội dung liên quan",
        readButton: "Đọc bài",
        contactEyebrow: "Lời mời tương tác",
        contactTitle: "Gửi lời nhắn hoặc chia sẻ một góc chiêm nghiệm của bạn",
        contactDescription:
          "Nếu bạn muốn gửi góp ý, chia sẻ cảm nhận hoặc đề xuất chủ đề tâm linh, hãy mở biểu mẫu liên hệ để để lại thông tin.",
        contactButton: "Mở biểu mẫu liên hệ",
        fallbackNotice:
          "Bản dịch tiếng Anh của bài này đang được bổ sung, nên hiện có phần nội dung hiển thị tiếng Việt.",
      },
    },
  },
  en: {
    poem: {
      listing: {
        eyebrow: "Poetry library",
        title: "Poetry",
        description:
          "A collection of poems shaped by the slow rhythm of dusk, where memory and feeling are held with gentle words.",
        heroImage: LOCAL_IMAGE_MAP.heroPoetry.src,
        heroAlt: "Riverside dusk in warm evening light",
        intro:
          "Each poem is a gentle pause: carrying the voice of home, the light of dusk, and emotions told with calm rhythm.",
        featuredTag: "Featured poem",
        gridTitle: "Poetry selections",
        readButton: "Read poem",
        fallbackNotice:
          "Some entries are still being translated, so parts may appear in Vietnamese for now.",
      },
      detail: {
        breadcrumb: "Poetry",
        notFound: "This poem is not available yet.",
        notFoundBack: "Back to Poetry",
        metaAuthor: "Author",
        metaVoice: "Voice",
        metaReadTime: "Reading time",
        metaDate: "Published",
        actionRead: "Read",
        actionListen: "Listen",
        actionWatch: "Watch",
        actionShare: "Share",
        mediaEyebrow: "Listen and watch",
        mediaTitle: "Listen to or watch this piece",
        audioTitle: "Voice reading",
        audioButton: "Open audio",
        videoTitle: "Visual storytelling",
        videoButton: "Open video",
        relatedTitle: "Related poems",
        readButton: "Read poem",
        contactEyebrow: "Stay connected",
        contactTitle: "Share your reflection or message with Hồn Thơ",
        contactDescription:
          "If you would like to send feedback, suggest a theme, or share a resonant piece of writing, please use the contact form.",
        contactButton: "Open contact form",
        fallbackNotice:
          "This piece is partially shown in Vietnamese while the English translation is being prepared.",
        analysisTitle: "Poem reflection",
        analysisEmotion: "Emotional flow",
        analysisImages: "Key imagery",
        analysisMeaning: "Meaning and aftertaste",
        analysisLine: "Memorable line",
      },
    },
    story: {
      listing: {
        eyebrow: "Story library",
        title: "Stories",
        description:
          "Simple stories from riverside life, where memory, compassion, and a slower rhythm remain close.",
        heroImage: LOCAL_IMAGE_MAP.heroStory.src,
        heroAlt: "An old dock in gentle evening rain",
        intro:
          "Each piece keeps a gentle storytelling voice, drawing from familiar details of homeland evenings and everyday care.",
        featuredTag: "Featured story",
        gridTitle: "Story selections",
        readButton: "Read story",
        fallbackNotice:
          "Some entries are still being translated, so parts may appear in Vietnamese for now.",
      },
      detail: {
        breadcrumb: "Stories",
        notFound: "This story is not available yet.",
        notFoundBack: "Back to Stories",
        metaAuthor: "",
        metaVoice: "Voice",
        metaReadTime: "Reading time",
        metaDate: "Published",
        actionRead: "Read",
        actionListen: "Listen",
        actionWatch: "Watch",
        actionShare: "Share",
        mediaEyebrow: "Listen and watch",
        mediaTitle: "Listen to or watch this piece",
        audioTitle: "Voice reading",
        audioButton: "Open audio",
        videoTitle: "Visual storytelling",
        videoButton: "Open video",
        relatedTitle: "Related stories",
        readButton: "Read story",
        contactEyebrow: "Stay connected",
        contactTitle: "Share your story or message with Hồn Thơ",
        contactDescription:
          "If you have a story, memory, or a gentle note you would like to send, please use the contact form.",
        contactButton: "Open contact form",
        fallbackNotice:
          "This piece is partially shown in Vietnamese while the English translation is being prepared.",
      },
    },
    spiritual: {
      listing: {
        eyebrow: "Spiritual library",
        title: "Spirituality",
        description:
          "Quiet pieces for contemplation, where breath slows down and the heart finds stillness.",
        heroImage: LOCAL_IMAGE_MAP.heroSpiritual.src,
        heroAlt: "A quiet pagoda yard at dusk",
        intro:
          "Each piece is a gentle pause for reflection, carrying the calm tone of riverside evenings and inward listening.",
        featuredTag: "Featured piece",
        gridTitle: "Spiritual selections",
        readButton: "Read piece",
        fallbackNotice:
          "Some entries are still being translated, so parts may appear in Vietnamese for now.",
      },
      detail: {
        breadcrumb: "Spirituality",
        notFound: "This piece is not available yet.",
        notFoundBack: "Back to Spirituality",
        metaAuthor: "",
        metaVoice: "Voice",
        metaReadTime: "Reading time",
        metaDate: "Published",
        actionRead: "Read",
        actionListen: "Listen",
        actionWatch: "Watch",
        actionShare: "Share",
        mediaEyebrow: "Listen and watch",
        mediaTitle: "Listen to or watch this piece",
        audioTitle: "Voice reading",
        audioButton: "Open audio",
        videoTitle: "Visual storytelling",
        videoButton: "Open video",
        relatedTitle: "Related pieces",
        readButton: "Read piece",
        contactEyebrow: "Stay connected",
        contactTitle: "Leave a reflection or message for Hồn Thơ",
        contactDescription:
          "If you would like to share a thought, a reflection, or a calm note, please use the contact form.",
        contactButton: "Open contact form",
        fallbackNotice:
          "This piece is partially shown in Vietnamese while the English translation is being prepared.",
      },
    },
  },
};

export function getReadingCopy(locale: Locale, contentType: ContentType) {
  return readingTranslations[locale][contentType];
}
