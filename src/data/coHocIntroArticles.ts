export type CoHocIntroArticle = {
  slug: string;
  title: string;
  coverImage: string;
  /** Hiển thị trên listing và dưới tiêu đề bài chi tiết khi có */
  description?: string;
  disclaimer?: string;
  reflectionQuestions?: string[];
};

export const coHocIntroArticles: CoHocIntroArticle[] = [
  {
    slug: "01-huyen-hoc-phuong-dong-la-gi",
    title: "Huyền học phương Đông là gì?",
    coverImage: "/images/articles/huyen-mon-tham-khao/bai-nen/huyen-hoc-phuong-dong-la-gi.png",
  },
  {
    slug: "02-vi-sao-huyen-hoc-nghiem-tuc-khac-voi-me-tin-giat-gan",
    title: "Vì sao huyền học nghiêm túc khác với mê tín giật gân?",
    coverImage:
      "/images/articles/huyen-mon-tham-khao/bai-nen/vi-sao-huyen-hoc-nghiem-tuc-khac-voi-me-tin-giat-gan.png",
  },
  {
    slug: "03-ngu-thuat-la-gi-trong-truyen-thong-phuong-dong",
    title: "Ngũ thuật là gì trong truyền thống phương Đông?",
    coverImage:
      "/images/articles/huyen-mon-tham-khao/bai-nen/ngu-thuat-la-gi-trong-truyen-thong-phuong-dong.png",
  },
  {
    slug: "04-ranh-gioi-giua-bieu-tuong-kinh-nghiem-va-niem-tin-tuyet-doi",
    title: "Ranh giới giữa biểu tượng, kinh nghiệm và niềm tin tuyệt đối",
    coverImage:
      "/images/articles/huyen-mon-tham-khao/bai-nen/ranh-gioi-giua-bieu-tuong-kinh-nghiem-va-niem-tin-tuyet-doi.png",
  },
  {
    slug: "co-nen-ung-dung-co-hoc-vao-chon-ngay-gio-khong",
    title: "Có nên ứng dụng cổ học vào chọn ngày giờ không?",
    coverImage:
      "/images/articles/huyen-mon-tham-khao/bai-nen/co-nen-ung-dung-co-hoc-vao-chon-ngay-gio-khong.png",
    description:
      "Cổ học có thể nhắc ta chuẩn bị chu đáo hơn, nhưng không nên biến ngày giờ thành nỗi sợ — nền tảng vẫn là điều kiện thực tế, đạo đức và sự tỉnh táo.",
    disclaimer:
      "Bài viết mang tính tham khảo văn hóa và tự quan sát; không thay cho quyết định chuyên môn, pháp lý hay lời khuyên y tế khi bạn cần.",
    reflectionQuestions: [
      "Khi chọn thời điểm cho một việc quan trọng, bạn đang cần thêm sự chu đáo hay đang tìm một lý do để trì hoãn?",
      "Điều kiện thực tế (sức khỏe, thời gian, trách nhiệm với người khác) hiện đang nói gì với bạn?",
      "Nếu bỏ hết áp lực “ngày giờ”, bạn còn đủ bình tĩnh để chuẩn bị không?",
    ],
  },
  {
    slug: "co-hoc-co-the-ho-tro-tu-quan-sat-ban-than-den-dau",
    title: "Cổ học có thể hỗ trợ tự quan sát bản thân đến đâu?",
    coverImage:
      "/images/articles/huyen-mon-tham-khao/bai-nen/co-hoc-co-the-ho-tro-tu-quan-sat-ban-than-den-dau.png",
    description:
      "Cổ học có thể như chiếc gương mềm để nhìn nhịp sống và thói quen; nó không thay trị liệu, y học hay trách nhiệm tự chọn lựa của mỗi người.",
    disclaimer:
      "Bài viết không chẩn đoán hay điều trị; khi có triệu chứng bệnh lý hoặc khủng hoảng tinh thần kéo dài, hãy tìm hỗ trợ chuyên môn phù hợp.",
    reflectionQuestions: [
      "Bạn đang dùng cổ học để hiểu mình rõ hơn, hay để tránh đối diện điều cần làm trong đời thực?",
      "Điều gì trong đời sống của bạn đang cần chuyên môn (y tế, tâm lý, pháp lý) hơn là một lớp biểu tượng?",
      "Một thói quen nhỏ bạn có thể chỉnh trong tuần này, không phụ thuộc vào bất kỳ “lời phán” nào?",
    ],
  },
  {
    slug: "vi-sao-khong-nen-dung-co-hoc-de-hu-doa-nguoi-khac",
    title: "Vì sao không nên dùng cổ học để hù dọa người khác?",
    coverImage:
      "/images/articles/huyen-mon-tham-khao/bai-nen/vi-sao-khong-nen-dung-co-hoc-de-hu-doa-nguoi-khac.png",
    description:
      "Tri thức cổ học thiếu lòng nhân dễ thành áp lực; người học nên giữ sự tử tế, biết dừng và không gieo sợ hãi bằng lời phán hay biểu tượng khó kiểm chứng.",
    disclaimer:
      "Bài viết nhấn mạnh đạo đức đối thoại; không khuyến khích dùng biểu tượng cổ học để thay thế tư vấn chuyên môn khi người khác đang nguy cơ hoặc cần can thiệp.",
    reflectionQuestions: [
      "Có lần nào bạn vô tình làm người khác hoảng hơn vì một cách diễn đạt “nặng” không?",
      "Bạn có thể nói lại cùng một ý bằng ngôn ngữ nhẹ hơn, rõ giới hạn hơn không?",
      "Khi người đối diện đang lo, điều hữu ích nhất họ cần là gì ngoài một lời phán?",
    ],
  },
  {
    slug: "giua-loi-khuyen-thuc-te-va-loi-phan-doan-co-hoc-nen-dat-trong-tam-o-dau",
    title: "Giữa lời khuyên thực tế và lời phán đoán cổ học, nên đặt trọng tâm ở đâu?",
    coverImage:
      "/images/articles/huyen-mon-tham-khao/bai-nen/giua-loi-khuyen-thuc-te-va-loi-phan-doan-co-hoc-nen-dat-trong-tam-o-dau.png",
    description:
      "Việc lớn cần đặt trên dữ kiện thực tế, sức khỏe, tài chính, pháp lý và đạo đức; cổ học chỉ nên là lớp tham khảo mềm, không phải tiếng nói cuối cùng.",
    disclaimer:
      "Bài viết không thay cho tư vấn pháp lý, tài chính hay y tế; quyết định quan trọng cần dựa trên thông tin có thể kiểm chứng và trách nhiệm cá nhân.",
    reflectionQuestions: [
      "Trong việc bạn đang cân nhắc, những dữ kiện nào là có thể kiểm tra được?",
      "Một lớp diễn giải cổ học đang giúp bạn đặt câu hỏi hay đang thay thế việc thu thập thông tin?",
      "Nếu bỏ phần biểu tượng, bạn vẫn thấy lý do của quyết định đứng vững không?",
    ],
  },
  {
    slug: "vai-tro-cua-dao-duc-nguoi-hoc-co-hoc",
    title: "Vai trò của đạo đức người học cổ học",
    coverImage: "/images/articles/huyen-mon-tham-khao/bai-nen/vai-tro-cua-dao-duc-nguoi-hoc-co-hoc.png",
    description:
      "Người học cổ học càng cần khiêm tốn và kín lời: không tự cho quyền định đoạt đời người khác; đạo đức giữ tri thức khỏi phô trương, phán xét hay gieo lệ thuộc.",
    disclaimer:
      "Bài viết bàn về thái độ học và chia sẻ; không đại diện cho một trường phái cụ thể hay một quy chuẩn hành xử duy nhất.",
    reflectionQuestions: [
      "Bạn đang chia sẻ để người khác sáng hơn, hay để họ phụ thuộc vào lời bạn hơn?",
      "Giới hạn của hiểu biết hiện tại của bạn là gì — và bạn nói ra điều đó chưa?",
      "Một cách nói trung thực hơn hôm nay có thể là gì khi ai đó hỏi bạn một điều ngoài phạm vi của bạn?",
    ],
  },
  {
    slug: "hoc-co-hoc-de-sang-hon-hay-de-le-thuoc-hon",
    title: "Học cổ học để sáng hơn hay để lệ thuộc hơn?",
    coverImage: "/images/articles/huyen-mon-tham-khao/bai-nen/hoc-co-hoc-de-sang-hon-hay-de-le-thuoc-hon.png",
    description:
      "Học cổ học khả dĩ giúp ta bình tĩnh và tự quan sát hơn; nếu càng học càng sợ hay chờ lời phán, có lẽ ta cần dừng và chỉnh lại cách đọc.",
    disclaimer:
      "Bài viết mang tính chiêm nghiệm; nếu lo âu ảnh hưởng sinh hoạt, hãy tìm hỗ trợ từ người tin cậy hoặc chuyên gia phù hợp.",
    reflectionQuestions: [
      "Sau khi đọc, bạn thấy lòng nhẹ hơn hay nặng hơn — và vì sao?",
      "Bạn có đang dùng cổ học để né một việc thực tế cần làm không?",
      "Một thói quen nhỏ giúp bạn “đứng vững” trở lại mà không cần thêm một lớp giải thích nữa là gì?",
    ],
  },
];
