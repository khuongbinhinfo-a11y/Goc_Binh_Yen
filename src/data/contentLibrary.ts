import { poems as rawPoems } from "@/data/poems";

export type ContentType = "poem" | "story" | "spiritual";

export type ContentAnalysis = {
  emotionFlow: string;
  standoutImages: string;
  meaning: string;
  memorableLine: string;
};

export type ContentItem = {
  title: string;
  slug: string;
  contentType: ContentType;
  category: string;
  excerpt: string;
  coverImage: string;
  author?: string;
  voiceBy: string;
  readingTime: string;
  publishedAt: string;
  content: string;
  analysis: ContentAnalysis;
  relatedPosts: string[];
  audioUrl?: string;
  youtubeUrl?: string;
  hasAudio: boolean;
  hasVideo: boolean;
  isFeatured: boolean;
};

export function shouldRenderAuthor(content: Pick<ContentItem, "contentType" | "author">) {
  return content.contentType === "poem" && Boolean(content.author?.trim());
}

function estimateReadingTime(content: string) {
  const words = content
    .replace(/\n/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(2, Math.round(words / 170));
  return `${minutes} phút`;
}

const poetryBase: ContentItem[] = rawPoems
  .filter((item) => item.status === "published")
  .map((item, index, source) => ({
    title: item.title,
    slug: item.slug,
    contentType: "poem",
    category: "Đọc thơ",
    excerpt: item.summary,
    coverImage: item.cardImage,
    author: item.author,
    voiceBy: "Hồng Tâm",
    readingTime: estimateReadingTime(item.content),
    publishedAt: item.locationDate,
    content: item.content,
    analysis: item.analysis,
    relatedPosts: source
      .filter((candidate) => candidate.slug !== item.slug && candidate.status === "published")
      .slice(0, 3)
      .map((candidate) => candidate.slug),
    hasAudio: false,
    hasVideo: false,
    isFeatured: index === 0,
  }));

const poemCoverOverrides: Record<string, string> = {
  "khoang-cach-vo-hinh": "/images/poems/khoang-cach-vo-hinh.jpeg",
  "hoa-luc-binh": "/images/poems/hoa-luc-binh.jpeg",
  "em-mua-xuan-ve": "/images/poems/em-mua-xuan-ve.jpeg",
  "em-trong-anh": "/images/poems/em-trong-anh.jpeg",
  "anh-yeu-em": "/images/poems/anh-yeu-em.jpeg",
  nho: "/images/poems/nho.jpeg",
  "tieng-keu-chim-le-ban": "/images/poems/tieng-keu-chim-le-ban.jpeg",
  "ngang-ben-song-xua": "/images/poems/ngang-ben-song-xua.jpeg",
};

export const storyPosts: ContentItem[] = [
  {
    title: "Bến đò cũ qua một mùa mưa",
    slug: "ben-do-cu-qua-mot-mua-mua",
    contentType: "story",
    category: "Kể chuyện",
    excerpt:
      "Một buổi chiều mưa, người kể chuyện trở lại bến đò xưa để tìm lại những gương mặt đã từng đi qua tuổi thơ.",
    coverImage: "https://images.unsplash.com/photo-1470163395405-d2b80e7450ed?auto=format&fit=crop&w=1400&q=80",
    voiceBy: "Hồng Tâm",
    readingTime: "6 phút",
    publishedAt: "Mỹ Tho, tháng 10/2020",
    content:
      "Mưa xuống từ trưa, mảnh như tơ nhưng bền bỉ. Con đường đất dẫn ra bến đò cũ đã mềm hơn, in rõ từng dấu dép của những người đi chợ muộn.\n\nTôi đứng nép dưới mái hiên nhà bác Sáu, nhìn con nước dâng chậm. Cái bến năm xưa vẫn còn đó, chỉ khác là tiếng gọi đò đã nhỏ đi rất nhiều. Người chèo đò cũ nay đã yếu tay, chèo được vài chuyến là dừng. Nhưng bác vẫn nói, chừng nào còn người muốn qua sông, bác còn chống sào.\n\nChiều buông nhanh trong mưa. Một cô bé ôm cặp sách chạy qua, ngoái lại hỏi: 'Mai nước ròng không bác?' Bác Sáu cười, nụ cười hiền như đất: 'Ròng hay lớn cũng phải đi học nghe con.' Câu nói bình dị ấy làm tôi nhớ mẹ mình, mỗi sáng vẫn dặn như vậy từ khi tôi còn nhỏ.\n\nCó những nơi không giữ người bằng vẻ lớn lao. Bến đò cũ chỉ giữ ta bằng những câu nói rất ngắn, bằng mùi bùn sau mưa, bằng một bàn tay từng đỡ ta bước xuống thuyền.\n\nLúc rời đi, tôi ngoái lại. Mưa vẫn rơi. Bác Sáu vẫn ngồi đó, nhìn dòng nước như nhìn một người bạn cũ chưa bao giờ thất hẹn.",
    analysis: {
      emotionFlow:
        "Câu chuyện mở bằng nhịp mưa chậm, đi qua các chi tiết đời thường rồi lắng lại ở cảm giác biết ơn quê cũ.",
      standoutImages:
        "Bến đò, con đường đất sau mưa và tiếng gọi qua sông tạo nên lớp hình ảnh giàu ký ức miền sông nước.",
      meaning:
        "Điều giữ người ở lại với quê nhà không phải sự hào nhoáng, mà là tình người bình dị và những lời dặn rất nhỏ.",
      memorableLine:
        "Có những nơi không giữ người bằng vẻ lớn lao.",
    },
    relatedPosts: ["dem-nghe-tieng-nuoc-chay", "mui-khoi-bep-len-tu-xom-nho", "chuyen-nguoi-qua-cau-tre"],
    hasAudio: true,
    hasVideo: false,
    audioUrl: "https://www.facebook.com/profile.php?id=61561724806320",
    isFeatured: true,
  },
  {
    title: "Đêm nghe tiếng nước chảy",
    slug: "dem-nghe-tieng-nuoc-chay",
    contentType: "story",
    category: "Kể chuyện",
    excerpt:
      "Một đêm mất ngủ bên hiên nhà, tiếng nước vỗ bờ đã kéo người kể trở về với những ngày tháng yên lành nhất.",
    coverImage: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1400&q=80",
    voiceBy: "Hồng Tâm",
    readingTime: "5 phút",
    publishedAt: "Cai Lậy, tháng 02/2021",
    content:
      "Đêm ở quê có nhiều khoảng lặng hơn thành phố. Khi mọi nhà đã tắt bớt đèn, tiếng nước ngoài bờ mương hiện ra rõ như một bản nhạc nền quen thuộc.\n\nTôi nằm nghe tiếng nước chạm vào bờ cỏ, đều đều như lời ru. Hồi nhỏ, mỗi lần khó ngủ, má thường mở hé cửa sổ để gió và tiếng nước vào phòng. Má bảo, nghe nước chảy thì lòng đỡ nóng.\n\nNhiều năm sau, tôi mới hiểu. Tiếng nước không làm mọi buồn phiền biến mất. Nó chỉ nhắc ta rằng mọi thứ đều có nhịp của nó. Có lúc đầy, lúc vơi, lúc lặng, lúc xao. Chỉ cần mình không cố cưỡng lại, lòng sẽ tự tìm được chỗ yên.\n\nĐêm ấy tôi ngủ muộn, nhưng thức dậy rất nhẹ. Ngoài sân, trời vừa hửng. Con nước vẫn chảy như hôm qua, như bao ngày trước đó.",
    analysis: {
      emotionFlow:
        "Mạch kể đi từ mất ngủ cá nhân sang hồi ức gia đình, rồi kết lại bằng một nhận ra nhẹ nhàng về nhịp sống.",
      standoutImages:
        "Hiên nhà đêm, cửa sổ hé và tiếng nước vỗ bờ làm nên không khí chữa lành rõ rệt.",
      meaning:
        "Sự bình an không đến từ việc xóa mọi lo âu, mà đến từ khả năng hòa mình vào nhịp tự nhiên của đời sống.",
      memorableLine:
        "Tiếng nước không làm mọi buồn phiền biến mất.",
    },
    relatedPosts: ["ben-do-cu-qua-mot-mua-mua", "mui-khoi-bep-len-tu-xom-nho", "chuyen-nguoi-qua-cau-tre"],
    hasAudio: false,
    hasVideo: false,
    isFeatured: false,
  },
  {
    title: "Mùi khói bếp lên từ xóm nhỏ",
    slug: "mui-khoi-bep-len-tu-xom-nho",
    contentType: "story",
    category: "Kể chuyện",
    excerpt:
      "Chỉ một làn khói bếp chiều cũng đủ kéo cả tuổi thơ trở về: tiếng gọi cơm, tiếng chén đũa và bàn tay mẹ.",
    coverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=1400&q=80",
    voiceBy: "Hồng Tâm",
    readingTime: "5 phút",
    publishedAt: "Tân Phong, tháng 08/2021",
    content:
      "Chiều nào đi qua đầu xóm, tôi cũng bắt gặp một làn khói bếp mỏng bay lên sau mái nhà tôn cũ. Mùi rơm cháy nhẹ trộn với mùi cơm mới thành một thứ hương không nơi nào có thể bắt chước.\n\nNgày nhỏ, cứ thấy khói bếp là biết sắp đến giờ ăn. Mẹ hay gọi vọng ra sân, giọng không to mà đủ để cả nhà nghe. Chúng tôi chạy ùa vào, tay còn dính đất, miệng còn cười chuyện ngoài ngõ.\n\nBây giờ nhiều nhà đã nấu bằng bếp khác. Khói bếp ít dần. Nhưng mỗi lần bắt gặp, tôi vẫn thấy tim mình mềm lại. Như có ai vừa mở một ngăn ký ức cũ, cho mùi quê tràn ra đầy căn phòng đang sống.\n\nCó lẽ quê hương ở lại trong ta bằng những điều như vậy: một làn khói mỏng, một tiếng gọi cơm, một bàn tay đặt nhẹ bát canh nóng trước mặt.",
    analysis: {
      emotionFlow:
        "Bài kể mở từ quan sát đời thường, chuyển sang ký ức gia đình rồi chốt bằng một định nghĩa dịu dàng về quê hương.",
      standoutImages:
        "Làn khói bếp, mái nhà cũ và tiếng gọi cơm là ba hình ảnh neo cảm xúc xuyên suốt.",
      meaning:
        "Những chi tiết nhỏ nhất lại là thứ bền nhất trong ký ức, giúp con người giữ được cảm giác thuộc về.",
      memorableLine:
        "Có lẽ quê hương ở lại trong ta bằng những điều như vậy.",
    },
    relatedPosts: ["ben-do-cu-qua-mot-mua-mua", "dem-nghe-tieng-nuoc-chay", "chuyen-nguoi-qua-cau-tre"],
    hasAudio: false,
    hasVideo: true,
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isFeatured: false,
  },
  {
    title: "Chuyện người qua cầu tre",
    slug: "chuyen-nguoi-qua-cau-tre",
    contentType: "story",
    category: "Kể chuyện",
    excerpt:
      "Một cây cầu tre nhỏ nối hai bờ không chỉ đưa người qua sông, mà còn giữ lại cách người ta đợi nhau và thương nhau.",
    coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    voiceBy: "Hồng Tâm",
    readingTime: "7 phút",
    publishedAt: "Mỹ Tho, tháng 03/2022",
    content:
      "Cầu tre đầu xóm mỗi mùa lại đổi một lần màu. Mùa nắng thì vàng nhạt, mùa mưa thì sẫm lại như có thêm tuổi.\n\nHồi trước, ai qua cầu cũng đi chậm. Không chỉ vì cầu nhỏ, mà vì bên này luôn có người đứng đợi bên kia. Có hôm là mẹ đợi con. Có hôm là vợ đợi chồng. Cũng có hôm chỉ là một người hàng xóm đứng xem trời tối đến đâu rồi gọi với theo một câu nhắc đường trơn.\n\nNhiều người trẻ lớn lên rời quê đi làm xa. Cầu tre dần ít dấu chân hơn. Nhưng mỗi lần về, họ vẫn ghé qua, đứng một lúc, như để chắc rằng con đường cũ vẫn còn đợi mình.\n\nTôi tin những cây cầu nhỏ ở làng quê không chỉ để đi qua. Chúng giữ lại cách người ta nhìn nhau, gọi nhau và thương nhau trong những ngày bình thường nhất.",
    analysis: {
      emotionFlow:
        "Câu chuyện dẫn từ cảnh vật theo mùa đến nhịp sống cộng đồng, rồi kết ở tầng ý nghĩa nhân văn.",
      standoutImages:
        "Cầu tre đổi màu theo mùa, người đứng đợi hai đầu cầu và dấu chân thưa dần là những hình ảnh giàu sức gợi.",
      meaning:
        "Kết nối của làng quê không nằm ở công trình lớn mà ở cách con người kiên nhẫn đợi nhau trong đời thường.",
      memorableLine:
        "Những cây cầu nhỏ ở làng quê không chỉ để đi qua.",
    },
    relatedPosts: ["ben-do-cu-qua-mot-mua-mua", "dem-nghe-tieng-nuoc-chay", "mui-khoi-bep-len-tu-xom-nho"],
    hasAudio: false,
    hasVideo: false,
    isFeatured: false,
  },
];

export const spiritualPosts: ContentItem[] = [
  {
    title: "Mùa chuông chiều trong sân chùa nhỏ",
    slug: "mua-chuong-chieu-trong-san-chua-nho",
    contentType: "spiritual",
    category: "Tâm linh",
    excerpt:
      "Một buổi chiều mưa nhẹ, tiếng chuông ngân đã kéo người kể trở về với cảm giác tĩnh tâm lâu rồi mới gặp lại.",
    coverImage: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?auto=format&fit=crop&w=1400&q=80",
    voiceBy: "Hồng Tâm",
    readingTime: "5 phút",
    publishedAt: "Mỹ Tho, tháng 06/2022",
    content:
      "Cơn mưa đi qua rất nhẹ. Sân chùa còn ướt, lá bồ đề đọng nước và rung khẽ trong gió chiều.\n\nTôi ngồi dưới mái hiên, nghe tiếng chuông buông từng nhịp. Mỗi tiếng ngân như mở thêm một khoảng trống trong lòng, để những điều nặng nề có chỗ đi qua.\n\nNgày trước, tôi cứ nghĩ bình an là phải giải quyết xong mọi thứ. Sau này mới hiểu, bình an có khi chỉ là ngồi yên vài phút, nghe một âm thanh quen, và chấp nhận rằng có những chuyện cần thời gian hơn mình muốn.\n\nChiều xuống dần. Mưa cũng thưa. Tiếng chuông cuối cùng khép lại, nhưng dư âm của nó còn ở lại rất lâu trong ngực.",
    analysis: {
      emotionFlow:
        "Mạch kể đi từ cảnh mưa và tiếng chuông đến một sự nhận ra sâu hơn về bình an nội tâm.",
      standoutImages:
        "Sân chùa ướt mưa, lá bồ đề và tiếng chuông chiều là những điểm neo cảm xúc xuyên suốt.",
      meaning:
        "Bình an không phải đích đến vội, mà là khả năng dừng lại và ở cùng hiện tại trong một nhịp thở chậm.",
      memorableLine:
        "Bình an có khi chỉ là ngồi yên vài phút.",
    },
    relatedPosts: ["dot-nhang-truoc-hien-nha", "mot-ngay-im-lang-ben-song", "hoc-tho-cham-giua-ngay-dai"],
    hasAudio: false,
    hasVideo: false,
    isFeatured: true,
  },
  {
    title: "Đốt nhang trước hiên nhà",
    slug: "dot-nhang-truoc-hien-nha",
    contentType: "spiritual",
    category: "Tâm linh",
    excerpt:
      "Một nén nhang chiều không cầu điều lớn, chỉ là lời nhắc sống hiền và giữ lòng sáng giữa bao bộn bề.",
    coverImage: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=1400&q=80",
    voiceBy: "Hồng Tâm",
    readingTime: "4 phút",
    publishedAt: "Cai Lậy, tháng 10/2022",
    content:
      "Chiều nào má cũng châm một nén nhang trước bàn thờ nhỏ cạnh hiên. Khói nhang mảnh, đi lên chậm rồi tan vào khoảng trời vừa sẫm.\n\nTôi từng hỏi má cầu gì. Má cười: 'Cầu cho nhà mình sống cho phải đạo, vậy là đủ.'\n\nCâu trả lời ấy đi theo tôi rất lâu. Tâm linh ở quê không tách khỏi đời sống. Nó nằm trong cách người ta nhường nhịn nhau một câu, nói nhẹ hơn một lời, và giữ lòng ngay cả khi chẳng ai nhìn thấy.\n\nMỗi lần châm nhang, tôi không xin thêm điều gì lớn. Chỉ tự nhắc mình sống tử tế hơn hôm qua một chút.",
    analysis: {
      emotionFlow:
        "Bài viết bắt đầu từ thói quen gia đình, rồi mở ra tầng nghĩa đạo sống rất gần gũi.",
      standoutImages:
        "Khói nhang mảnh, hiên nhà chiều và nụ cười của má tạo nên không khí tâm linh đời thường.",
      meaning:
        "Tâm linh không nằm ở điều huyền bí, mà ở cách sống có trước có sau và giữ lòng ngay thẳng.",
      memorableLine:
        "Chỉ tự nhắc mình sống tử tế hơn hôm qua một chút.",
    },
    relatedPosts: ["mua-chuong-chieu-trong-san-chua-nho", "mot-ngay-im-lang-ben-song", "hoc-tho-cham-giua-ngay-dai"],
    hasAudio: true,
    hasVideo: false,
    audioUrl: "https://www.facebook.com/profile.php?id=61561724806320",
    isFeatured: false,
  },
  {
    title: "Một ngày im lặng bên sông",
    slug: "mot-ngay-im-lang-ben-song",
    contentType: "spiritual",
    category: "Tâm linh",
    excerpt:
      "Giữa nhiều âm thanh của cuộc sống, người kể chọn một ngày nói ít hơn để nghe rõ tiếng lòng mình.",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80",
    voiceBy: "Hồng Tâm",
    readingTime: "6 phút",
    publishedAt: "Tân Phong, tháng 03/2023",
    content:
      "Sáng đó tôi ra bờ sông sớm hơn thường lệ, ngồi xuống bậc đá cũ và tự hứa sẽ nói ít trong ngày.\n\nBan đầu thật khó. Trong đầu vẫn có quá nhiều câu trả lời, quá nhiều điều muốn chứng minh. Nhưng càng ngồi lâu, tôi càng thấy rõ một chuyện: phần lớn mệt mỏi đến từ việc ta luôn muốn phản ứng ngay lập tức.\n\nCon nước chảy không vội. Mây trôi cũng không vội. Chỉ có mình thường tự đẩy mình đi nhanh hơn mức cần thiết.\n\nĐến cuối ngày, tôi vẫn chưa giải quyết hết mọi việc. Nhưng lòng nhẹ hơn. Và tôi biết, im lặng đúng lúc cũng là một cách tự thương mình.",
    analysis: {
      emotionFlow:
        "Mạch cảm xúc chuyển từ căng thẳng nội tâm sang sự thả lỏng khi người kể học được cách chậm lại.",
      standoutImages:
        "Bậc đá ven sông, con nước chảy và mây trôi tạo cảm giác chiêm nghiệm nhẹ nhàng.",
      meaning:
        "Im lặng không phải trốn tránh, mà là khoảng nghỉ cần thiết để chọn phản hồi sáng suốt hơn.",
      memorableLine:
        "Im lặng đúng lúc cũng là một cách tự thương mình.",
    },
    relatedPosts: ["mua-chuong-chieu-trong-san-chua-nho", "dot-nhang-truoc-hien-nha", "hoc-tho-cham-giua-ngay-dai"],
    hasAudio: false,
    hasVideo: false,
    isFeatured: false,
  },
  {
    title: "Học thở chậm giữa ngày dài",
    slug: "hoc-tho-cham-giua-ngay-dai",
    contentType: "spiritual",
    category: "Tâm linh",
    excerpt:
      "Một bài chiêm nghiệm ngắn về việc trở về hơi thở, để giữ tâm thế sáng và vững giữa nhịp sống nhiều xáo động.",
    coverImage: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1400&q=80",
    voiceBy: "Hồng Tâm",
    readingTime: "5 phút",
    publishedAt: "Mỹ Tho, tháng 11/2023",
    content:
      "Có những ngày lịch làm việc dày đến mức ta quên mất mình đã thở gấp từ bao giờ.\n\nTôi tập một thói quen nhỏ: cứ mỗi khi thấy lòng bắt đầu nóng, dừng lại ba nhịp thở thật chậm. Hít vào sâu một chút, giữ yên một chút, rồi thở ra dài hơn.\n\nBa nhịp thở không làm công việc biến mất. Nhưng nó giúp tôi trở lại với thân và tâm trong hiện tại, trước khi nói một lời hay đưa ra một quyết định.\n\nSau nhiều lần như vậy, tôi nhận ra bình tĩnh cũng là một kỹ năng. Và kỹ năng ấy bắt đầu từ một việc rất đơn giản: thở chậm lại.",
    analysis: {
      emotionFlow:
        "Bài viết đi từ nhịp sống căng đến giải pháp nhỏ, rồi kết ở một nhận thức thực hành hằng ngày.",
      standoutImages:
        "Ba nhịp thở được mô tả cụ thể, tạo điểm bám rõ ràng cho người đọc áp dụng ngay.",
      meaning:
        "Tâm linh trong đời sống hiện đại có thể bắt đầu từ các thực hành nhỏ, đều và chân thật.",
      memorableLine:
        "Bình tĩnh cũng là một kỹ năng.",
    },
    relatedPosts: ["mua-chuong-chieu-trong-san-chua-nho", "dot-nhang-truoc-hien-nha", "mot-ngay-im-lang-ben-song"],
    hasAudio: false,
    hasVideo: true,
    youtubeUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    isFeatured: false,
  },
];

export const poetryPosts: ContentItem[] = poetryBase.map((item) => {
  const fallbackRelated = poetryBase
    .filter((candidate) => candidate.slug !== item.slug)
    .slice(0, 3)
    .map((candidate) => candidate.slug);

  return {
    ...item,
    coverImage: poemCoverOverrides[item.slug] ?? item.coverImage,
    relatedPosts: item.relatedPosts.length > 0 ? item.relatedPosts : fallbackRelated,
  };
});

export function getPoetryPostBySlug(slug: string) {
  return poetryPosts.find((item) => item.slug === slug);
}

export function getStoryPostBySlug(slug: string) {
  return storyPosts.find((item) => item.slug === slug);
}

export function getSpiritualPostBySlug(slug: string) {
  return spiritualPosts.find((item) => item.slug === slug);
}

export function getContentBySlug(type: ContentType, slug: string) {
  if (type === "poem") return getPoetryPostBySlug(slug);
  if (type === "story") return getStoryPostBySlug(slug);
  return getSpiritualPostBySlug(slug);
}
