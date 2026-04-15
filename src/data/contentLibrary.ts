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

const baseStoryPosts: ContentItem[] = [
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

const storyPostExpansions: Record<string, { readingTime: string; extraParagraphs: string[] }> = {
  "ben-do-cu-qua-mot-mua-mua": {
    readingTime: "9 phút",
    extraParagraphs: [
      "Đêm đó, tôi ở lại nhà bác Sáu thêm một lúc. Bếp lửa được nhóm lại cho ấm, ấm đến mức tiếng mưa ngoài sân cũng nghe hiền hơn. Bác kể chuyện cũ: ngày trước bến đông, có khi phải chờ ba bốn lượt mới tới lượt xuống đò. Người đi làm, người gánh lúa, người chở trái cây, người chỉ qua thăm một họ hàng bên kia sông. Đò đông, nhưng không ai chen. Họ biết nhìn nhau, nhường nhau, như cách người quê tự nhiên mà hiểu một trật tự không cần nói.",
      "Tôi hỏi bác có buồn không khi bây giờ người qua sông ít dần. Bác chống hai tay lên cán chèo, cười nhẹ: buồn thì có, nhưng buồn vừa phải thôi. Bởi bến đò cũng như người, có lúc trẻ lúc già. Quan trọng là khi còn ngồi ở đây, bác vẫn nhớ được tên từng nhà, vẫn nhận ra giọng gọi nhau giữa chiều mưa. Bác bảo tôi, nơi nào còn nhớ tên nhau, nơi đó chưa cũ.",
      "Khi trời tạnh hẳn, vài ánh đèn dầu bật lên dọc xóm nhỏ. Bến không ồn, chỉ còn tiếng nước đập vào mạn thuyền nghe khẽ như ai gõ cửa. Tôi chợt hiểu vì sao mình cứ tìm về đây: không phải để nhặt lại một tuổi thơ nguyên vẹn, mà để học lại cách sống chậm, sống đủ, sống bằng những điều không cần phô ra. Rời bến, tôi đi rất chậm trên con đường đất mềm. Sau lưng, tiếng bác Sáu gọi với theo: có dịp lại ghé. Câu nói đơn sơ ấy theo tôi suốt cả đoạn đường về.",
      "Mấy tuần sau, tôi quay lại đúng lúc chợ sớm vừa tan. Trên bến còn vài thúng rau, vài rổ cá và tiếng cười của những người quen mặt. Tôi nhận ra ở bến đò này, ký ức không nằm ở những câu chuyện quá lớn, mà nằm trong cách người ta chào nhau mỗi ngày. Một cái gật đầu, một tiếng hỏi thăm, một bàn tay đỡ giúp lúc bước xuống thuyền, tất cả gom lại thành cảm giác thân thuộc mà nơi khác khó có được.",
      "Trên đường về, tôi nghĩ đến những bến đò vô danh ở khắp miền sông nước. Có bến đông người, có bến chỉ còn vài chuyến mỗi ngày, nhưng điểm chung là vẫn giữ được nhịp sống không vội. Khi ai đó chờ ai đó qua sông, thời gian như chậm lại đúng phần cần thiết. Và có lẽ vì vậy, bến đò cũ không chỉ là một địa điểm trong bản đồ quê nhà, mà còn là một phần nhân hậu trong cách sống của người quê.",
      "Từ đó, mỗi khi thấy mình bị kéo vào những nhịp quá gấp, tôi lại nhớ hình ảnh bác Sáu ngồi bên bến, ung dung nhìn nước lớn nước ròng. Bác không giảng giải điều gì, chỉ sống vậy thôi mà đủ dạy tôi nhiều thứ. Dạy rằng cuộc đời có thể nhiều đổi thay, nhưng một người vẫn có thể giữ sự tử tế bằng cách bền bỉ ở lại đúng chỗ của mình, đúng vai trò của mình, với lòng hiền lành không phô trương.",
    ],
  },
  "dem-nghe-tieng-nuoc-chay": {
    readingTime: "8 phút",
    extraParagraphs: [
      "Tôi bước ra hiên, ngồi tựa cột gỗ, nghe đêm thở cùng mình. Xa xa, một ngọn đèn câu chao nhẹ, lúc rõ lúc mờ theo nhịp gió. Mỗi lần sóng lăn tăn vào bờ, tôi lại nhớ câu má từng dặn: đừng sợ đêm, đêm chỉ rộng hơn ban ngày thôi. Thực ra, cái làm người ta mỏi nhất không phải bóng tối, mà là những tiếng ồn chưa kịp tắt trong đầu.",
      "Có giai đoạn tôi sống ở thành phố, cửa kính đóng kín mà vẫn nghe tiếng máy, tiếng còi, tiếng bước chân dồn dập. Về quê, đêm tưởng như trống rỗng, nhưng ở lâu mới thấy nó đầy những âm thanh dịu: tiếng lá trở mình, tiếng mái tôn khô dần sau mưa, tiếng nước lùa qua cỏ. Đêm quê không bắt ta phải nghĩ thêm. Nó chỉ nhắc ta thở đúng nhịp và đặt mọi việc về đúng kích thước của nó.",
      "Gần sáng, tôi pha một ấm trà nhạt, ngồi nhìn mặt nước đổi màu. Từ đen sang xám, rồi từ xám sang ánh bạc mỏng. Tôi không có thêm đáp án nào cho những điều dang dở, nhưng trong lòng lại bớt gấp. Có lẽ vì tôi đã thôi ép mình phải hiểu hết mọi chuyện trong một đêm. Có những nỗi niềm cần đi qua nhiều con nước mới tự lắng. Và khi lắng rồi, ta mới nghe ra tiếng bình yên vốn ở ngay bên cạnh từ lâu.",
      "Tôi nhớ có lần đang sống trong chuỗi ngày rất áp lực, tôi đã thử nghe nhạc thật lớn để át đi cảm giác nặng nề. Nhưng càng mở to, đầu óc càng mỏi. Chỉ khi tắt hết, ngồi yên và nghe tiếng nước vỗ bờ như đêm nay, tôi mới thấy lòng nhẹ xuống. Có lẽ không phải âm thanh nào cũng giúp chữa lành. Chỉ những âm thanh khiến ta quay về với chính mình mới thật sự có tác dụng.",
      "Má từng nói, con người giống mặt sông, bề mặt có thể xao động nhưng đáy sông luôn có phần tĩnh. Lúc ấy tôi còn nhỏ, nghe rồi để đó. Đến bây giờ mới thấm. Khi đời sống có quá nhiều tin nhắn, cuộc gọi, lịch hẹn và đòi hỏi, phần đáy yên ấy dễ bị lãng quên. Đêm quê cho tôi một cơ hội hiếm để chạm lại phần yên đó, dù chỉ vài phút, cũng đã đủ để đi tiếp ngày mai.",
      "Trời sáng hẳn, hàng xóm bắt đầu dậy sớm quét sân, tiếng chổi tre sột soạt nghe rất gần. Tôi gấp chăn, mở cửa và hít một hơi dài. Đêm mất ngủ không còn là một đêm nặng nề nữa, mà trở thành một đêm học lại cách lắng nghe. Khi học được cách lắng nghe nước chảy, tôi cũng học được cách lắng nghe mình. Và đó có lẽ là món quà lặng lẽ nhất mà quê nhà đã trao cho tôi.",
    ],
  },
  "mui-khoi-bep-len-tu-xom-nho": {
    readingTime: "8 phút",
    extraParagraphs: [
      "Chiều hôm sau, tôi ghé qua nhà dì Ba ở cuối xóm. Dì đang ngồi quạt bếp, vừa quạt vừa kể chuyện lúa ngoài đồng năm nay trổ muộn. Mùi khói bếp quện với mùi lá dừa khô làm tôi bất giác đứng yên một lúc. Dì cười, nói mùi này bám áo lâu lắm, về thành phố chắc phải giặt mấy lần mới hết. Tôi bảo, nếu được, tôi muốn mùi này ở lại lâu thêm một chút.",
      "Bữa cơm quê giản dị: nồi canh rau, đĩa cá kho, chén nước mắm dằm ớt. Nhưng cách mọi người ngồi lại với nhau mới là điều khiến tôi nhớ. Không ai cầm điện thoại, không ai ăn vội. Câu chuyện xoay quanh chuyện nhỏ: con đường mới đổ đá, cây xoài đầu ngõ đã ra trái, đứa cháu ngoại vừa biết đọc. Những chuyện tưởng bình thường ấy, khi đi xa mới thấy là nền nhà vững nhất của đời sống.",
      "Đêm xuống, khói bếp tan dần, chỉ còn mùi ấm trên tà áo. Tôi trở về phòng, nhìn lên mái nhà cũ và nghĩ về quãng thời gian mình đã sống quá nhanh. Có lẽ ai cũng cần một mùi hương để nhận ra mình thuộc về đâu. Với tôi, đó là mùi khói bếp chiều. Nó không chỉ gợi nhớ tuổi thơ, mà còn nhắc rằng hạnh phúc thường bắt đầu từ những điều rất nhỏ: một bữa cơm đủ người, một tiếng gọi thân quen, một mái nhà vẫn chờ mình về.",
      "Ngày hôm sau, tôi đi ngang qua vài căn nhà mới xây, tường sáng màu và bếp đã chuyển sang kiểu hiện đại hơn. Quê cũng đổi thay, đó là điều tự nhiên. Nhưng khi đến gần giờ cơm, vẫn có đâu đó một làn khói mỏng bay lên, như một dấu lặng cũ chưa biến mất. Tôi nghĩ, truyền thống không nhất thiết phải giữ nguyên mọi hình thức, chỉ cần giữ được tinh thần quây quần, tinh thần biết gọi nhau về trong bữa tối, vậy là đủ.",
      "Dì Ba kể thêm rằng hồi xưa mỗi khi mưa lớn, cả xóm hay sang nhà nhau nấu chung một bếp để tiện nhóm lửa. Người thì xắt rau, người vo gạo, người trông trẻ con. Chuyện ấy bây giờ ít gặp, nhưng nghe lại vẫn thấy ấm. Bởi nó cho thấy người quê từng đi qua khó khăn bằng cách nương vào nhau. Khói bếp vì thế không chỉ là mùi thức ăn, mà là mùi của sự sẻ chia trong đời sống thường ngày.",
      "Khi trở lại nhịp làm việc, thỉnh thoảng tôi vẫn bất ngờ ngửi thấy mùi khói bếp trong ký ức và tự mỉm cười. Nó như một chiếc neo nhỏ giữ mình không trôi quá xa khỏi phần mềm của bản thân. Giữa những ngày căng, chỉ cần nhớ tới mâm cơm quê và tiếng người thân gọi nhau, tôi lại thấy lòng dịu xuống. Có lẽ ai cũng cần một hình ảnh như thế để chống lại sự cằn cỗi mà cuộc sống hiện đại dễ mang đến.",
    ],
  },
  "chuyen-nguoi-qua-cau-tre": {
    readingTime: "9 phút",
    extraParagraphs: [
      "Một sáng đầu mùa nước lớn, tôi đứng ở đầu cầu nhìn đám trẻ con tập đi xe đạp. Chúng chạy chậm, rồi dừng lại, rồi cười vang khi ai đó suýt ngã. Người lớn đứng xa xa, không can thiệp nhiều, chỉ đưa mắt theo dõi. Cây cầu tre nhỏ bỗng trở thành lớp học đầu tiên dạy lũ trẻ giữ thăng bằng, dạy chúng biết đi qua nỗi sợ bằng sự kiên nhẫn và vài tiếng gọi động viên.",
      "Buổi trưa, một bà cụ xách giỏ đi chợ về, chân bước chậm nhưng chắc. Một thanh niên đi ngang liền đỡ giỏ giúp, đưa cụ qua hết cầu rồi mới chào đi tiếp. Cảnh ấy diễn ra nhanh đến mức nếu không để ý sẽ bỏ qua. Nhưng chính những cử chỉ rất ngắn như vậy làm nên nền nếp của xóm làng: thấy người khác cần thì đưa tay, không cần nghĩ nhiều. Tình người ở quê thường không có lời mở đầu long trọng, chỉ có hành động vừa đủ.",
      "Chiều xuống, mặt cầu hắt ánh nâu, bóng người kéo dài trên mặt nước. Tôi ngồi bên bờ nhìn từng người đi qua mà chợt hiểu: cây cầu không giữ ai bằng dây buộc, nó giữ bằng thói quen trở lại. Bao năm rồi, nhịp đi của người qua cầu vẫn chậm như cũ, như thể ai cũng biết nơi đây không dành cho vội vã. Khi rời xóm, tôi ngoái nhìn cây cầu một lần nữa. Trong lòng có một cảm giác rất lạ: nhẹ mà đầy, như vừa mang theo một bài học cũ về cách sống tử tế trong ngày thường.",
      "Nhiều người từng khuyên xóm nên thay cầu tre bằng cầu bê tông để đi lại dễ hơn. Ý kiến ấy không sai, vì an toàn là điều quan trọng. Nhưng trước khi đổi, bà con vẫn tranh thủ sửa từng nhịp cầu cũ để dùng tạm. Mỗi lần thay tre, người này góp cây, người kia góp công, chẳng ai tính hơn thiệt. Nhìn họ làm, tôi thấy cây cầu không chỉ là hạ tầng, mà là một cái cớ để người trong xóm còn dịp cùng nhau làm việc chung.",
      "Chiều muộn, có một cặp vợ chồng trẻ dừng xe ở đầu cầu, bế con nhỏ xuống ngắm sông. Đứa bé chỉ vào mặt nước rồi cười khanh khách khi thấy đàn cá quẫy nhẹ gần bờ. Người cha cúi xuống buộc lại quai dép cho con, người mẹ đứng chắn gió. Cảnh tượng ấy yên bình đến mức tôi cứ nhìn mãi. Nó nhắc rằng hạnh phúc đôi khi không cần đi đâu xa, chỉ cần một cây cầu cũ, một dòng sông và vài phút cả nhà có mặt bên nhau.",
      "Tối đến, tôi ghi vào sổ tay một câu ngắn: giữ được nhịp chậm là giữ được nhau. Ở nơi nào ai cũng chỉ muốn đi nhanh hơn, hơn nhau một bước, nơi đó dễ mất đi sự dịu dàng. Cây cầu tre của xóm dạy tôi điều ngược lại: đi chậm để thấy người khác, đi chậm để không bỏ lỡ một bàn tay cần đỡ, đi chậm để lòng mình còn chỗ cho sự tử tế nảy mầm.",
    ],
  },
};

export const storyPosts: ContentItem[] = baseStoryPosts.map((item) => {
  const expansion = storyPostExpansions[item.slug];

  if (!expansion) return item;

  return {
    ...item,
    readingTime: expansion.readingTime,
    content: `${item.content}\n\n${expansion.extraParagraphs.join("\n\n")}`,
  };
});

const baseSpiritualPosts: ContentItem[] = [
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

const spiritualPostExpansions: Record<string, { readingTime: string; extraParagraphs: string[] }> = {
  "mua-chuong-chieu-trong-san-chua-nho": {
    readingTime: "8 phút",
    extraParagraphs: [
      "Sau thời kinh chiều, sân chùa thưa người dần. Tôi đi chậm quanh gốc bồ đề, nghe tiếng dép lạo xạo trên nền gạch ướt. Một cô bé theo mẹ đến chùa đứng nép ở hiên, hai tay chắp vụng về mà gương mặt rất sáng. Không ai dạy em những điều lớn lao. Em chỉ nhìn người lớn làm gì thì làm theo, vậy mà trong cử chỉ ấy đã có sẵn một sự thành kính tự nhiên.",
      "Thầy trụ trì rót cho tôi chén trà nóng, nói rằng mưa chiều thường giúp người ta dịu lại nhanh hơn. Tôi hỏi sao có những ngày lòng vẫn không yên dù đã cố ngồi im. Thầy cười: vì mình đang ngồi bằng thân mà chưa ngồi bằng tâm. Có khi thân đã ở sân chùa, nhưng tâm còn đi ngược xuôi với bao việc chưa xong. Nghe vậy, tôi không đáp, chỉ thử đặt chén trà xuống chậm hơn một chút, nhìn hơi nóng bay lên rồi tan đi.",
      "Trước lúc về, tôi đứng lại nghe thêm một tiếng chuông. Âm thanh ấy không lớn, nhưng kéo dài đủ lâu để mình nhận ra bên trong vẫn còn một vùng lặng chưa bị cuộc sống chạm tới. Tôi bước ra cổng chùa khi trời đã nhá nhem, lòng không còn nặng như lúc đến. Bài học của buổi chiều hôm ấy rất đơn giản: muốn tìm bình an, trước hết phải cho chính mình vài phút thật sự có mặt.",
      "Vài hôm sau, tôi thử mang thói quen đó vào đời sống hằng ngày. Trước khi trả lời một tin nhắn khó, tôi dừng lại đúng một hơi thở. Trước khi bước vào cuộc họp căng, tôi nhắm mắt vài giây như đang ngồi dưới mái hiên chùa. Nghe có vẻ nhỏ, nhưng sự khác biệt lại rõ. Giọng nói bớt gắt, quyết định bớt nóng và lòng bớt nghiêng về phía cực đoan. Có lẽ bình an không xa, chỉ là mình ít khi cho nó cơ hội xuất hiện.",
      "Tôi cũng nhận ra tiếng chuông chiều không chỉ vang trong sân chùa, mà có thể vang trong lòng mỗi người khi biết tự nhắc mình quay về. Một tiếng chuông nội tâm có khi là lúc ta chịu nhận lỗi, có khi là lúc ta thôi cãi để thắng, có khi chỉ là lúc ta đặt điện thoại xuống và ngồi cạnh người thân thêm mười phút. Những điều đó tưởng nhỏ nhưng chính là nền móng của một đời sống có chiều sâu.",
      "Chiều nào có dịp đi ngang cổng chùa, tôi vẫn dừng lại nhìn vào một chút, dù không phải lúc nào cũng bước vào. Chỉ nhìn thôi cũng đủ gợi lại nhịp chậm đã học. Trong những ngày nhiều xô lệch, tôi tin ai cũng cần một nơi để trở về bên trong. Với tôi, đó là tiếng chuông chiều trong sân chùa nhỏ, âm thầm mà bền bỉ, như một lời nhắc dịu rằng bình an luôn bắt đầu từ sự hiện diện.",
    ],
  },
  "dot-nhang-truoc-hien-nha": {
    readingTime: "8 phút",
    extraParagraphs: [
      "Có lần tôi hỏi bà ngoại vì sao mỗi buổi chiều vẫn thắp nhang đều đặn dù mắt đã kém, tay đã run. Bà nói, thắp nhang không phải để xin điều gì đặc biệt, mà để nhớ mình còn biết ơn. Biết ơn ngày còn đủ cơm ăn, biết ơn người thân còn gọi nhau bằng giọng gần, biết ơn cả những khó nhọc đã dạy mình mềm lòng hơn. Tôi nghe mà thấy chiếc bàn thờ nhỏ trước hiên bỗng trở thành một nơi rất sống, không hề xa cách.",
      "Từ đó, tôi tập đứng lại một chút trước khi bắt đầu bữa tối. Không cần nghi thức dài, chỉ là thắp một nén nhang, hít một hơi chậm, rồi tự hỏi hôm nay mình đã nói điều gì làm người khác nhẹ lòng hơn chưa. Câu hỏi ấy đôi khi làm tôi ngại vì câu trả lời không phải lúc nào cũng đẹp. Nhưng chính sự ngại đó lại giúp tôi sống cẩn trọng hơn, bớt những lời vội và bớt cái tôi nóng nảy.",
      "Tâm linh, với tôi, không tách rời khỏi đời thường. Nó nằm trong cách mình cúi thấp giọng khi người khác đang mệt, cách mình giữ lời hứa nhỏ, cách mình biết dừng trước khi làm ai đó tổn thương. Nén nhang chiều vì thế trở thành một lời nhắc mềm: sống sao để lúc đêm xuống, mình có thể ngồi yên với chính mình mà không phải quay mặt đi vì tiếc nuối.",
      "Có những bữa cơm gia đình tưởng rất bình thường, nhưng nếu để ý sẽ thấy đó là nơi tâm linh hiện diện rõ nhất. Khi cả nhà chắp tay trước bữa ăn, chỉ vài giây ngắn ngủi thôi, ai nấy đều chậm lại và ý thức hơn về sự có mặt của nhau. Không khí bàn ăn nhờ vậy dịu đi, bớt tranh cãi, bớt vội. Tôi dần tin rằng những nghi thức nhỏ có thể giữ cho một mái nhà bền hơn nhiều lời khuyên to tát.",
      "Một hôm tôi quên thắp nhang vì về trễ và quá mệt. Tối đó nằm xuống, tôi thấy lòng trống rỗng một cách kỳ lạ, như vừa bỏ quên điều gì quan trọng. Sáng hôm sau, tôi thắp một nén nhang bù, không phải vì sợ thiếu nghi lễ, mà vì nhớ cảm giác biết ơn đã mất đi tối qua. Khoảnh khắc ấy giúp tôi hiểu rằng thực hành tâm linh không phải gánh nặng, mà là một cách giữ cho tâm không bị khô cứng trước áp lực thường ngày.",
      "Bây giờ, dù ở đâu, tôi vẫn cố giữ một nghi thức rất nhỏ vào cuối ngày: dừng lại, thở sâu và cảm ơn những gì đã có. Có hôm chỉ là cảm ơn vì bữa cơm nóng, có hôm là vì một cuộc trò chuyện tử tế. Những lời cảm ơn thầm như vậy không làm đời sống bớt khó ngay lập tức, nhưng làm mình bớt cô đơn khi đi qua khó khăn. Và với tôi, đó chính là giá trị sâu nhất của nén nhang trước hiên nhà.",
    ],
  },
  "mot-ngay-im-lang-ben-song": {
    readingTime: "9 phút",
    extraParagraphs: [
      "Buổi trưa, tôi đi bộ dọc bờ kè, cố gắng không cầm điện thoại quá lâu. Mỗi lần tay chạm vào túi áo, tôi lại nhớ mình đang tập im lặng và buông xuống. Trên bãi bồi, vài người phụ nữ ngồi gỡ lưới, vừa làm vừa nói chuyện nhỏ đủ nghe. Những câu chuyện của họ không cầu kỳ: giá cá hôm nay, đứa nhỏ mới sốt đêm qua, ruộng bên kia đã rút nước chưa. Nghe tưởng rời rạc, nhưng lại có một nhịp đều đặn làm lòng tôi ổn định dần.",
      "Đến chiều, tôi ghé quán nước ven sông. Bà chủ già đưa ly trà đá, bảo hôm nay trông tôi hiền hơn mọi khi. Tôi bật cười. Có lẽ khi nói ít, mặt người ta cũng bớt căng. Tôi ngồi nhìn dòng người qua lại mà không còn muốn bình luận nhiều. Mỗi người mang một nỗi bận khác nhau, một câu chuyện khác nhau. Mình không cần hiểu hết. Chỉ cần bớt phán xét, tự nhiên trong lòng rộng ra.",
      "Tối về, tôi viết vài dòng ngắn vào sổ: một ngày nói ít không làm tôi mất đi điều gì, trái lại còn trả lại cho tôi nhiều khoảng trống. Khoảng trống ấy không rỗng. Nó chứa tiếng gió, tiếng nước, tiếng bước chân, và cả tiếng lòng vốn bị lấp bởi quá nhiều phản ứng nhanh. Tôi nghĩ mình sẽ không thể im lặng mọi ngày, nhưng sẽ cố giữ lại thói quen này như một cách vệ sinh tâm trí: mỗi tuần, dành một ngày để lắng nghe nhiều hơn nói.",
      "Ban đầu, sự im lặng làm tôi hơi sợ. Khi không còn tiếng nói để lấp đầy, nhiều suy nghĩ cũ cũng nổi lên rõ hơn: những điều mình từng làm chưa tốt, những lời nói khiến ai đó buồn, những lần mình quá gấp mà bỏ sót cảm xúc người khác. Nhưng thay vì né tránh, tôi học cách nhìn chúng như nhìn mặt sông có gợn. Gợn rồi sẽ qua nếu mình không tự tay khuấy thêm.",
      "Buổi tối, tôi gặp lại một người bạn cũ. Chúng tôi ngồi bên mé sông, nói chuyện chậm và có nhiều quãng ngừng. Kỳ lạ là những quãng ngừng ấy không hề gượng, trái lại rất dễ chịu. Bạn tôi bảo lâu lắm mới có một cuộc trò chuyện không ai cần chứng minh mình đúng. Tôi nghe và thấy đúng. Khi bớt nói để thắng, người ta có nhiều không gian hơn để thật sự hiểu nhau.",
      "Trước khi ngủ, tôi cất điện thoại sớm hơn thường lệ và tắt bớt đèn trong phòng. Căn nhà yên đến mức nghe rõ tiếng côn trùng ngoài vườn. Tôi nhận ra ngày im lặng này không phải để trốn đời, mà để quay lại đời với một nội tâm sạch hơn. Có thể ngày mai tôi vẫn phải đối diện công việc bộn bề, nhưng ít nhất tôi đã có một điểm tựa: biết rằng mình luôn có thể trở về với sự tĩnh khi cần.",
    ],
  },
  "hoc-tho-cham-giua-ngay-dai": {
    readingTime: "8 phút",
    extraParagraphs: [
      "Tôi bắt đầu ghi chú những thời điểm mình thở gấp nhất: trước cuộc họp, sau một cuộc gọi khó, lúc đọc tin nhắn chưa vui. Chỉ cần nhận ra thôi, nhịp thở đã tự chậm lại phần nào. Tôi học một cách rất đơn giản: đặt tay lên ngực, hít vào bốn nhịp, giữ hai nhịp, thở ra sáu nhịp. Làm ba lần. Mỗi lần chưa tới một phút, nhưng đủ để đầu óc bớt quay cuồng và giọng nói bớt gắt.",
      "Có hôm tôi quên, để cả ngày trôi trong gấp gáp. Tối đến mới thấy mệt rã, dễ cáu, dễ buồn không lý do. Những ngày như vậy nhắc tôi rằng bình an không tự đến vì mình muốn, nó cần được thực tập như một thói quen cơ thể. Cũng giống như chăm cây, không thể tưới một lần rồi bỏ đó. Muốn cây xanh phải chăm đều. Muốn lòng yên cũng vậy, phải quay về với hơi thở nhiều lần trong ngày.",
      "Dần dần, tôi nhận ra khi thở chậm, mình nghe người khác rõ hơn. Không còn cắt ngang quá nhanh, không còn vội phản biện để thắng. Trong những cuộc trò chuyện căng, chỉ cần giữ một hơi thở dài thêm một chút, câu chữ đi ra cũng mềm hơn. Có thể đó là điều quý nhất: thở chậm không chỉ giúp mình bình tĩnh, mà còn giúp mình giữ được sự tử tế trong lúc dễ đánh mất nhất.",
      "Tôi thử chia ngày thành những cột mốc nhỏ để nhắc mình thở: trước khi mở máy tính buổi sáng, trước khi ăn trưa và trước khi kết thúc công việc. Mỗi lần chỉ cần một phút, nhưng khi cộng lại, đó là vài phút hiếm hoi tôi thật sự có mặt với thân thể. Những phút ấy giúp tôi phân biệt rõ hơn đâu là việc khẩn cấp thật, đâu chỉ là cảm giác khẩn cấp do căng thẳng tạo ra.",
      "Một đồng nghiệp từng hỏi vì sao tôi dạo này ít nổi nóng hơn. Tôi không có bí quyết lớn, chỉ kể về ba nhịp thở. Bạn ấy thử làm theo trong một tuần rồi nhắn lại rằng buổi tối đỡ kiệt sức hơn trước. Tôi đọc tin nhắn đó và thấy vui. Những thực hành rất nhỏ, khi được chia sẻ đúng cách, có thể trở thành sợi dây nối nhẹ giữa người với người, nhất là trong môi trường ai cũng dễ rơi vào quá tải.",
      "Giờ đây, mỗi khi nghe ai than mệt, tôi không vội đưa lời khuyên dài. Tôi chỉ mời họ thử một hơi thở chậm ngay lúc này. Hít sâu, giữ nhẹ, thở dài. Đôi khi chỉ cần vậy thôi, ánh mắt đã dịu hơn. Tôi tin tâm linh không phải điều xa vời. Nó bắt đầu từ việc biết quay về thân mình, biết nghe nhịp thở và biết sống chậm lại một chút để giữ phần người tử tế trong mỗi ngày dài.",
    ],
  },
};

export const spiritualPosts: ContentItem[] = baseSpiritualPosts.map((item) => {
  const expansion = spiritualPostExpansions[item.slug];

  if (!expansion) return item;

  return {
    ...item,
    readingTime: expansion.readingTime,
    content: `${item.content}\n\n${expansion.extraParagraphs.join("\n\n")}`,
  };
});

export const poetryPosts: ContentItem[] = poetryBase.map((item) => {
  const fallbackRelated = poetryBase
    .filter((candidate) => candidate.slug !== item.slug)
    .slice(0, 3)
    .map((candidate) => candidate.slug);

  return {
    ...item,
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
