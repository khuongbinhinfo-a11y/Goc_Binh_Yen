export type CoHocUngDungGioiHanArticle = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  disclaimer: string;
  reflectionQuestions: string[];
};

const COVER_PREFIX = "/images/articles/huyen-mon-tham-khao/ung-dung-va-gioi-han" as const;

export const coHocUngDungGioiHanArticles: CoHocUngDungGioiHanArticle[] = [
  {
    slug: "co-hoc-va-cach-giu-minh-giua-doi-nhieu-bien-dong",
    title: "Cổ học và cách giữ mình giữa đời nhiều biến động",
    description:
      "Biến động là phần của đời thường; cổ học có thể giúp ta nhịp lại suy nghĩ, nhưng không thay cho việc giữ giới hạn và chăm sóc thực tại.",
    coverImage: `${COVER_PREFIX}/co-hoc-va-cach-giu-minh-giua-doi-nhieu-bien-dong.png`,
    disclaimer:
      "Bài viết mang tính tham khảo đời sống và tự quan sát; không thay cho hỗ trợ chuyên môn khi bạn đang khủng hoảng hoặc cần can thiệp.",
    reflectionQuestions: [
      "Khi mọi thứ xô đẩy, điều gì giúp bạn giữ được nhịp thở và lời nói dịu hơn?",
      "Bạn đang dùng một lớp tri thức để hiểu mình, hay để tránh đối diện việc cần làm?",
      "Một việc nhỏ trong tầm tay bạn có thể làm hôm nay để “neo” lại không?",
    ],
  },
  {
    slug: "khi-gap-viec-khong-thuan-nen-nhin-lai-dieu-gi",
    title: "Khi gặp việc không thuận, nên nhìn lại điều gì?",
    description:
      "Việc không thuận thường gọi ta nhìn lại điều kiện, mối quan hệ và cách phản ứng — cổ học chỉ là một góc nhìn phụ, không phải lời kết án.",
    coverImage: `${COVER_PREFIX}/khi-gap-viec-khong-thuan-nen-nhin-lai-dieu-gi.png`,
    disclaimer:
      "Bài viết không chẩn đoán hay quyết định thay bạn; trong tình huống nhạy cảm về pháp lý, sức khỏe hay an toàn, hãy ưu tiên dữ kiện và chuyên gia.",
    reflectionQuestions: [
      "Ngoài cảm giác “trật”, bạn còn thấy dữ kiện khách quan nào đang hiển hiện?",
      "Phản ứng của bạn đang giúp giảm căng hay đang làm vết thêm sâu?",
      "Ai có thể giúp bạn nhìn rõ hơn mà không thêm áp lực?",
    ],
  },
  {
    slug: "co-hoc-va-nghe-thuat-song-cham",
    title: "Cổ học và nghệ thuật sống chậm",
    description:
      "Sống chậm không phải ngừng lại hết; đôi là học nhịp — nhận ra đâu là vội thật và đâu chỉ là tiếng ồn trong đầu.",
    coverImage: `${COVER_PREFIX}/co-hoc-va-nghe-thuat-song-cham.png`,
    disclaimer:
      "Bài viết gợi ý thói quen và chiêm nghiệm cá nhân; không thần bí hóa việc nghỉ ngơi hay thay cho điều trị khi cần.",
    reflectionQuestions: [
      "Điều gì trong ngày khiến bạn cảm thấy đang bị kéo đi quá nhanh?",
      "Một khoảnh khắc chậm nhỏ nào bạn có thể giữ lại mà không làm đảo lộn sinh hoạt?",
      "Bạn đọc cổ học để thêm gánh nặng hay để nhẹ lòng hơn?",
    ],
  },
  {
    slug: "tu-biet-minh-den-biet-cach-doi-nhan-xu-the",
    title: "Từ biết mình đến biết cách đối nhân xử thế",
    description:
      "Hiểu mình là nền để cư xử dịu hơn với người khác; cổ học có thể là ngôn ngữ phụ, nhưng phép nhân vẫn là lòng và sự rõ ràng.",
    coverImage: `${COVER_PREFIX}/tu-biet-minh-den-biet-cach-doi-nhan-xu-the.png`,
    disclaimer:
      "Bài viết không khuyên lấy cổ học để phán người khác hay né trách nhiệm trong quan hệ gia đình và công việc.",
    reflectionQuestions: [
      "Điểm yếu của bạn thường “lộ” ra trong kiểu tình huống nào?",
      "Khi hiểu điểm yếu đó, bạn có thể xin lỗi hoặc điều chỉnh cử chỉ ra sao?",
      "Có khi nào bạn mong người khác hiểu mình mà chưa chọn nói rõ điều mình cần?",
    ],
  },
  {
    slug: "vi-sao-nguoi-xua-coi-trong-thoi-diem-va-hoan-canh",
    title: "Vì sao người xưa coi trọng thời điểm và hoàn cảnh?",
    description:
      "Thời điểm và hoàn cảnh là khung để nhận ra nhịp đời sống và giới hạn con người — học để thêm cảnh giác, không phải để cố định một kết cục.",
    coverImage: `${COVER_PREFIX}/vi-sao-nguoi-xua-coi-trong-thoi-diem-va-hoan-canh.png`,
    disclaimer:
      "Bài viết diễn giải văn hóa mang tính tham khảo; không khẳng định một cách đọc duy nhất cho mọi trường phái.",
    reflectionQuestions: [
      "Trong đời bạn, “thời điểm” thực tế đang là gì: sức khỏe, công việc hay quan hệ?",
      "Điều gì trong hoàn cảnh hiện tại bạn có thể điều chỉnh được một phần?",
      "Bạn có đang nhầm một biểu tượng với một lý do để không hành động không?",
    ],
  },
  {
    slug: "dung-lay-van-han-lam-cai-co-de-tron-trach-nhiem",
    title: "Đừng lấy vận hạn làm cái cớ để trốn trách nhiệm",
    description:
      "Trách nhiệm là phần lành của trưởng thành; gán hết cho “vận” sẽ làm ta nhẹ tạm thời nhưng nặng về lâu trong lòng và trong quan hệ.",
    coverImage: `${COVER_PREFIX}/dung-lay-van-han-lam-cai-co-de-tron-trach-nhiem.png`,
    disclaimer:
      "Bài viết nhấn mạnh đạo đức cá nhân; không mang tính phán xét cộng đồng hay phủ nhận hoàn toàn vai trò của các lớp biểu tượng trong đời sống văn hóa.",
    reflectionQuestions: [
      "Việc bạn đang né có phải là việc chỉ mình bạn có thể làm phần cốt lõi không?",
      "Nếu bỏ chữ “vận”, bạn còn giữ được lý do trì hoãn không?",
      "Một bước nhỏ có trách nhiệm hôm nay có thể là gì?",
    ],
  },
  {
    slug: "co-hoc-va-su-binh-tinh-truoc-thang-thua-duoc-mat",
    title: "Cổ học và sự bình tĩnh trước thắng thua được mất",
    description:
      "Thắng thua trong đời thường thường lẫn lộn với cảm xúc; cổ học có thể như tiếng nhắc đặt lại câu hỏi: điều gì còn giá trị sau khi bề mặt đổi màu.",
    coverImage: `${COVER_PREFIX}/co-hoc-va-su-binh-tinh-truoc-thang-thua-duoc-mat.png`,
    disclaimer:
      "Bài viết không thay cho hỗ trợ tâm lý khi bạn đang suy sụp kéo dài; khi cần, hãy tìm người có chuyên môn phù hợp.",
    reflectionQuestions: [
      "Bạn đang buồn vì mất mát thật, hay vì hình ảnh “phải được như ý”?",
      "Điều gì trong lòng bạn vẫn đứng vững khi bề ngoài thay đổi?",
      "Một lời nói nhẹ với chính mình có thể là gì trước khi phản ứng vội?",
    ],
  },
  {
    slug: "hoc-cach-nghe-long-minh-truoc-khi-hoi-mot-loi-phan",
    title: "Học cách nghe lòng mình trước khi hỏi một lời phán",
    description:
      "Lời phán bên ngoài đôi khi tiện, nhưng nếu ta chưa nghe được tiếng trong lòng, ta dễ nhận nhầm một gợi ý thành một định mệnh.",
    coverImage: `${COVER_PREFIX}/hoc-cach-nghe-long-minh-truoc-khi-hoi-mot-loi-phan.png`,
    disclaimer:
      "Bài viết khuyến khích suy ngẫm cá nhân; không khuyên thay các quyết định pháp lý, y tế hay tài chính bằng một lời diễn giải cổ học.",
    reflectionQuestions: [
      "Trước khi hỏi ai đó, bạn đã viết ra điều mình thực sự lo và điều mình mong không?",
      "Bạn đang tìm một lời khẳng định hay một không gian để suy xét?",
      "Nếu không có lời phán ngoài, bạn vẫn thấy con đường an toàn cho mình chứ?",
    ],
  },
  {
    slug: "khi-nao-nen-tham-khao-co-hoc-khi-nao-nen-gap-chuyen-gia",
    title: "Khi nào nên tham khảo cổ học, khi nào nên gặp chuyên gia?",
    description:
      "Phân biệt nhẹ giữa chiêm nghiệm văn hóa và nhu cầu chuyên môn giúp ta khỏi lệ thuộc và khỏi lẫn lộn ranh giới an toàn.",
    coverImage: `${COVER_PREFIX}/khi-nao-nen-tham-khao-co-hoc-khi-nao-nen-gap-chuyen-gia.png`,
    disclaimer:
      "Bài viết chỉ là khung suy nghĩ; trong khủng hoảng, triệu chứng bệnh lý, rủi ro pháp lý hay bạo lực, hãy ưu tiên dịch vụ chuyên trách và cứu hộ.",
    reflectionQuestions: [
      "Việc bạn đang đối diện cần dữ kiện có thể kiểm chứng hay cần một góc nhìn biểu tượng?",
      "Có dấu hiệu nào cho thấy bạn đang cần người được đào tạo trong một lĩnh vực cụ thể không?",
      "Bạn có đang trì hoãn gặp chuyên gia vì mong một lời “nhẹ” hơn không?",
    ],
  },
  {
    slug: "giu-long-thien-luong-khi-hoc-nhung-dieu-sau-kin",
    title: "Giữ lòng thiên lương khi học những điều sâu kín",
    description:
      "Tri thức sâu dễ cuốn; lòng thiên lương là chỗ neo để họ mà không biến hiểu biết thành quyền lực lạnh với người khác và với chính mình.",
    coverImage: `${COVER_PREFIX}/giu-long-thien-luong-khi-hoc-nhung-dieu-sau-kin.png`,
    disclaimer:
      "Bài viết nhấn mạnh đạo đức học tập; không khuyến khích dùng kiến thức để thao túng, hù dọa hay phân loại phẩm giá con người.",
    reflectionQuestions: [
      "Điều gì giúp bạn nhớ rằng người đối diện là một đời người, không phải một “case”?",
      "Bạn có đang học để chia sẻ hay để “trên” ai đó?",
      "Khi động lòng muốn phán, bạn có thể chọn im một nhịp không?",
    ],
  },
  {
    slug: "co-hoc-trong-gia-dinh-noi-nhe-de-hieu-nhau-hon",
    title: "Cổ học trong gia đình: nói nhẹ để hiểu nhau hơn",
    description:
      "Trong nhà, ngôn ngữ cổ học có thể là chủ đề lành nếu được đặt trong khung tham khảo; điều quý nhất vẫn là lời nói không làm người thân thêm sợ.",
    coverImage: `${COVER_PREFIX}/co-hoc-trong-gia-dinh-noi-nhe-de-hieu-nhau-hon.png`,
    disclaimer:
      "Bài viết không khuyên dùng cổ học để kiểm soát người thân hay thay cho đối thoại trực tiếp và cầu cứu chuyên gia khi có bạo lực hoặc khủng hoảng.",
    reflectionQuestions: [
      "Ai trong nhà hay mang nỗi lo về những chữ “nặng”?",
      "Bạn có thể chọn một cách diễn đạt nhẹ hơn mà vẫn giữ được ý không?",
      "Sự hiểu nhau hôm nay cần điều gì hơn một cuộc luận đúng sai?",
    ],
  },
  {
    slug: "dung-bien-niem-tin-thanh-soi-day-troi-minh",
    title: "Đừng biến niềm tin thành sợi dây trói mình",
    description:
      "Niềm tin có thể là nơi nương nhờ; nhưng khi nó biến thành xiềng, ta nên nhìn lại — có phải ta đang dùng học để tránh sống trong đời thực?",
    coverImage: `${COVER_PREFIX}/dung-bien-niem-tin-thanh-soi-day-troi-minh.png`,
    disclaimer:
      "Bài viết khuyến khích tự quan sát; nếu tinh thần bất ổn kéo dài, hãy tìm hỗ trợ phù hợp thay vì tự siết chặt trong một khung giải thích duy nhất.",
    reflectionQuestions: [
      "Niềm tin của bạn có đang giúp bạn mềm hơn hay cứng và sợ hơn?",
      "Điều gì bạn ngừng làm vì “tin” thay vì vì lý do có thể kiểm chứng?",
      "Một bước nhỏ trở lại đời thường có trách nhiệm có thể là gì?",
    ],
  },
];

export function getCoHocUngDungRelatedArticles(slug: string, limit = 4): CoHocUngDungGioiHanArticle[] {
  const list = coHocUngDungGioiHanArticles;
  const ix = list.findIndex((a) => a.slug === slug);
  if (ix < 0) return [];

  const out: CoHocUngDungGioiHanArticle[] = [];
  for (let step = 1; step < list.length && out.length < limit; step++) {
    const item = list[(ix + step) % list.length];
    if (item.slug !== slug) out.push(item);
  }
  return out;
}
