export type NguThuatGroupId = "son" | "y" | "menh" | "boc" | "tuong";

export type CoHocNguThuatArticle = {
  slug: string;
  title: string;
  group: NguThuatGroupId;
  description: string;
  coverImage: string;
  content: {
    intro: string;
    sections: { heading: string; body: string }[];
  };
  reflectionQuestions: string[];
};

export const nguThuatGroupDisclaimer: Record<NguThuatGroupId, string> = {
  son:
    "Nội dung nhóm Sơn đi theo hướng tu dưỡng và nếp sống chậm, không thần bí hóa trải nghiệm thân tâm và không thay thế hỗ trợ trị liệu/chuyên môn khi cần.",
  y:
    "Nội dung nhóm Y chỉ gợi ý dưỡng sinh nhẹ và nếp sống điều độ, không chẩn đoán, không kê toa và không thay thế tư vấn y khoa.",
  menh:
    "Nội dung nhóm Mệnh dùng ngôn ngữ mệnh lý như một cách tự hiểu mình trong bối cảnh văn hóa, không phải bản án tuyệt đối về đời người.",
  boc:
    "Nội dung nhóm Bốc xem quẻ như lời gợi ý chiêm nghiệm và cách chậm lại trước lựa chọn, không thay cho dữ kiện thực tế hay quyết định chuyên môn.",
  tuong:
    "Nội dung nhóm Tướng bàn về phong thái và sự tự tu dưỡng, không dùng diện mạo để phán nhân phẩm, giá trị hay số phận của bất kỳ ai.",
};

export const nguThuatGroupListingMeta: Record<
  NguThuatGroupId,
  { pageTitle: string; heroImage: string; intro: string }
> = {
  son: {
    pageTitle: "Sơn — dưỡng thân, dưỡng khí, dưỡng tâm",
    heroImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/son-card-bg.png",
    intro:
      "Trong khung Ngũ thuật, Sơn là trục tu dưỡng thân — khí — tâm theo tinh thần điềm tĩnh: không thần bí hóa, không rút Sơn thành vài động tác rời rạc. Các bài dưới đây đi từ hơi thở, im lặng và nếp sống điều hòa, đọc được và nghe được.",
  },
  y: {
    pageTitle: "Y trong Ngũ thuật — dưỡng sinh đời thường",
    heroImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/y-card-bg.png",
    intro:
      "Chữ Y ở đây là vùng tri thức truyền thống về nhịp sống, giấc ngủ, vận động và sự điều độ theo hệ quy chiếu Đông phương; không đồng nhất với y học hiện đại, không thay cho chẩn đoán hay điều trị. Bài viết giữ giọng sáng, gần đời sống.",
  },
  menh: {
    pageTitle: "Mệnh — đọc xu hướng để hiểu mình",
    heroImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/menh-card-bg.png",
    intro:
      "Mệnh học trong không gian này được dùng để soi khuynh hướng và nhận diện thiên lệch tương đối, như một ngôn ngữ văn hóa, không phải lời phán khép kín tương lai. Can chi, ngũ hành được đọc như lớp biểu tượng và nhịp thời gian, không phải nhãn dán cố định.",
  },
  boc: {
    pageTitle: "Bốc — quẻ như gương soi, câu hỏi như la bàn",
    heroImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/boc-card-bg.png",
    intro:
      "Bốc ở đây được hiểu như cách đặt câu hỏi đúng và đọc hình thế trước bất định: quẻ là chất liệu chiêm nghiệm, không thay cho dữ kiện thực tế hay trách nhiệm cá nhân. Giữ thái độ chậm, rõ ranh giới giữa biểu tượng và quyết định.",
  },
  tuong: {
    pageTitle: "Tướng — quan sát phong thái, giữ nhân hậu",
    heroImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/tuong-card-bg.png",
    intro:
      "Tướng được viết như nghệ thuật quan sát thần thái, khí sắc và nếp sống phía sau biểu hiện, nhằm tự tu dưỡng và hiểu người mà không áp nhãn hay phán số. Không dùng diện mạo để kết luận nhân phẩm hay vận hạn của ai.",
  },
};

export function nguThuatArticleHref(group: NguThuatGroupId, slug: string) {
  return `/huyen-mon-tham-khao/ngu-thuat/${group}/${slug}`;
}

export function nguThuatGroupLabel(group: NguThuatGroupId) {
  const map: Record<NguThuatGroupId, string> = {
    son: "Sơn",
    y: "Y",
    menh: "Mệnh",
    boc: "Bốc",
    tuong: "Tướng",
  };
  return map[group];
}

export function getNguThuatArticlesByGroup(group: NguThuatGroupId) {
  return coHocNguThuatArticles.filter((a) => a.group === group);
}

export function getNguThuatArticle(group: NguThuatGroupId, slug: string) {
  return coHocNguThuatArticles.find((a) => a.group === group && a.slug === slug);
}

export function getRelatedNguThuatArticles(current: CoHocNguThuatArticle, limit = 3) {
  return coHocNguThuatArticles.filter((a) => a.group === current.group && a.slug !== current.slug).slice(0, limit);
}

export const coHocNguThuatArticles: CoHocNguThuatArticle[] = [
  {
    slug: "hoc-tho-cham-giua-ngay-dai",
    title: "Học thở chậm giữa ngày dài",
    group: "son",
    description:
      "Giữ nhịp thở đều như một chỗ bám nhỏ khi công việc và thông báo kéo tâm đi liên tục — không hứa điều kỳ diệu, chỉ nhắc về điều lành có thể làm ngay.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/son/hoc-tho-cham-giua-ngay-dai.png",
    content: {
      intro:
        "Ngày dài thường đầy tiếng động: máy rung, tin nhắn, cuộc họp, việc nhà chồng lên nhau. Trong khung Sơn, “học thở chậm” không phải kỹ thuật kín đáo mà là một lần chọn nhỏ: trả thân về nhịp chậm hơn một chút trước khi phản ứng. Không cần chỗ yên tuyệt đối; chỉ cần một khoảng ngắn để nhận ra mình đang thở nông vì căng. Đó là thực hành đời thường, đọc được khi đi làm, khi đứng xếp hàng, khi ngồi xe.",
      sections: [
        {
          heading: "Thở chậm là gì ở đây",
          body:
            "Ở đây thở chậm không có nghĩa là kéo hơi như một màn biểu diễn. Nó gần với việc kéo dài phần thở ra, để phần vào theo tự nhiên, để ngực và vai bớt cứng dần. Khi thân mềm một chút, tâm thường dễ khớp theo — không phải lúc nào cũng vậy, nhưng đủ để ta nhận ra “đang vội” là một trạng thái, không phải lệnh buộc.",
        },
        {
          heading: "Vì sao không gắn vào lời hứa đặc biệt",
          body:
            "Sơn học trong không gian Hồn Thơ không hướng về việc biến một hơi thở thành phép lạ. Tránh những câu kiểu “chắc chắn sẽ khỏe ngay” hay “làm đúng là đổi vận”, vì như thế dễ đẩy người đọc vào chờ đợi phi lý. Thay vào đó là một lời mời khiêm tốn: thử vài phút mỗi ngày, quan sát thân mình như người làm ruộng quan sát đất — không phán, chỉ chỉnh nhẹ.",
        },
        {
          heading: "Một gợi ý thực hành nhỏ",
          body:
            "Chọn hai điểm neo trong ngày: trước khi mở cửa đi làm, và lúc ngồi xuống ăn cơm tối. Mỗi lần chỉ vài phút: ấn lòng bàn chân xuống sàn, để vai rơi, thở ra dài hơn một nhịp so với thói quen. Không cần đếm đủ mấy giây; chỉ cần đủ để biết mình đã về với thân.",
        },
      ],
    },
    reflectionQuestions: [
      "Khoảnh khắc nào trong ngày bạn hay thở nông và vai cứng nhất?",
      "Nếu chỉ giữ một “neo thở” duy nhất, bạn muốn đặt nó lúc nào?",
    ],
  },
  {
    slug: "ngoi-yen-truoc-hien-nha",
    title: "Ngồi yên trước hiên nhà",
    group: "son",
    description:
      "Hiên nhà là ranh giới mềm giữa trong và ngoài — chỗ ngồi im ít phút để nhìn ánh sáng, nghe tiếng quen, không biến không gian thành phép màu.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/son/ngoi-yen-truoc-hien-nha.png",
    content: {
      intro:
        "Ở nhiều nhà Việt, hiên là nơi cởi dép, phơi nắng, ngồi uống nước, nhìn mưa chạy mái. Ngồi yên trước hiên không nhất thiết gắn với nghi lễ nào; đó có thể chỉ là một kiểu “chậm lại” mang mùi gạch, lá, và tiếng láng giềng xa gần. Bài này viết về thói quen ngồi nhẹ để tâm có chỗ đặt — không phải để cầu điều siêu nhiên, mà để nhớ mình đang sống trong một thân thể có nhịp.",
      sections: [
        {
          heading: "Hiên như một khung nhỏ của ngày",
          body:
            "Khung cửa và mép mái tạo một vạch sáng thay đổi theo giờ. Ngồi đủ lâu để nhận ra sự đổi màu đó là một dạng thiền đời thường: không cần đặt tên, chỉ cần để mắt không chạy theo điện thoại liên tục. Nếu không có hiên, một mép cửa sổ, một ghế ban công nhỏ cũng có thể đóng vai trò tương tự.",
        },
        {
          heading: "Không biến không gian thành áp lực",
          body:
            "Đôi khi người ta gắn vào “chỗ ngồi thiền” một kỳ vọng quá lớn: phải an tĩnh tuyệt đối, phải giải quyết lo âu ngay. Ranh giới an toàn là ngược lại: hiên chỉ là hiên; ngồi yên chỉ là một lựa chọn nhỏ. Không ai bị đo vận hay đo đạo qua việc đã ngồi bao lâu.",
        },
        {
          heading: "Thực hành nhẹ",
          body:
            "Chọn mười phút không mục đích: không podcast, không kế hoạch. Để tay buông trên đùi hoặc trên lan can, nhìn một điểm bất kỳ cho đến khi mắt mỏi rồi nhìn xa lại. Hết thời gian thì đứng dậy làm việc tiếp — không cần kết luận hay bài học lớn.",
        },
      ],
    },
    reflectionQuestions: [
      "Ở nhà bạn, chỗ nào giống một “hiên” nhất — dù chỉ là một ô cửa?",
      "Điều gì khiến bạn khó ngồi yên dù chỉ vài phút?",
    ],
  },
  {
    slug: "song-cham-khong-phai-song-lui",
    title: "Sống chậm không phải sống lùi",
    group: "son",
    description:
      "Phân biệt giữa giảm tốc có chủ đích và lùi bước trước đời — chậm để khớp nhịp, không phải để trốn.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/son/song-cham-khong-phai-song-lui.png",
    content: {
      intro:
        "“Sống chậm” dễ bị hiểu nhầm là lười, là tụt hậu, là không theo kịp người khác. Trong Sơn học, chậm gần với việc giảm hao tổn: ít phản ứng vội, ít đốt ngày bằng lo âu vô hình. Không có nghĩa là bỏ trách nhiệm hay từ chối tiến bộ; chỉ là đặt câu hỏi xem ta đang chạy vì cần hay vì quen.",
      sections: [
        {
          heading: "Chậm là chỉnh nhịp",
          body:
            "Người làm ruộng biết lúc gieo, lúc nước; không phải chậm vì thụ động mà vì nhận ra đất và trời có nhịp riêng. Trong đời phố cũng vậy: có việc cần gấp, có việc chỉ thêm sai nếu làm vội. Chậm ở đây là nhường chỗ cho suy nghĩ và cho thân — không phải biện minh cho việc trốn tránh.",
        },
        {
          heading: "Khi “chậm” thành cớ",
          body:
            "Ranh giới cần giữ: không dùng khẩu hiệu sống chậm để thoái thác những việc đã cam kết, không lấy tinh thần Đông phương làm lớp áo cho sự buông xuôi có chủ ý. Nếu trong lòng bất an vì chậm lại, đó là tín hiệu cần nhìn kỹ hoàn cảnh — không phải lý do để tự trách.",
        },
        {
          heading: "Một cách thử nhỏ",
          body:
            "Tuần này chọn một việc thường làm vội — ví dụ trả lời tin nhắn — và hoãn lại hai phút trước khi gõ. Không phải để làm khó ai, mà để xem cảm giác “phải đáp ngay” đến từ đâu. Chậm hai phút đôi khi đủ để câu trả lời bớt gai.",
        },
      ],
    },
    reflectionQuestions: [
      "Việc gì bạn hay làm quá nhanh chỉ vì quen, không phải vì cần?",
      "“Chậm” với bạn đang mang nghĩa an toàn hay đang kéo bạn tránh né?",
    ],
  },
  {
    slug: "di-cham-qua-mot-con-gian",
    title: "Đi chậm qua một con giận",
    group: "son",
    description:
      "Nói về khoảnh khắc nóng trong người như một dòng nước muốn tràn — có thể học đi qua bằng nhịp chậm và nhận biết, không kết án bản thân.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/son/di-cham-qua-mot-con-gian.png",
    content: {
      intro:
        "“Con giận” ở đây là ẩn dụ cho cơn nóng đến nhanh: nghe một câu, thấy một việc, là muốn đáp trả ngay. Sơn học không dạy nén giận bằng lý thuyết cao sang; nó nhắc rằng thân và hơi thở đổi trước khi lời ra. Đi chậm qua không có nghĩa là nuốt hết — chỉ là cho phép một khoảng nhỏ để không làm vỡ điều sau đó.",
      sections: [
        {
          heading: "Giận là sóng, không phải bản chất",
          body:
            "Sóng nổi vì gió và vì đáy. Khi nhận ra mình đang lên sóng, đôi khi đủ để không nhảy theo ngay. Không ai bị định danh bằng một cơn giận duy nhất; nhưng ta có thể để cơn giận định hình hành động nếu không có một nhịp chậm xen vào.",
        },
        {
          heading: "Không dùng “tu tập” để chụp mũ",
          body:
            "Nếu đang giận vì bị tổn thương thật, việc “thở chậm” không có nghĩa là bảo người đó phải cam chịu. Ranh giới an toàn là tách việc chăm nhịp thân — để không phá vỡ điều quan trọng — khỏi việc quyết định xử lý bất công. Không khuyên ai im tiếng khi cần nói đúng lúc.",
        },
        {
          heading: "Thực hành một bước",
          body:
            "Khi thấy nóng: đặt hai bàn chân xuống đất, nhìn một vật cố định năm giây, rồi mới cho phép miệng mở. Năm giây không phải phép màu; chỉ là ranh giới nhỏ giữa phản xạ và lựa chọn.",
        },
      ],
    },
    reflectionQuestions: [
      "Cơn giận thường kéo bạn làm điều gì mà sau đó bạn không muốn nhận là mình?",
      "Đâu là ranh giới giữa “đi chậm” và “bị đè nén”?",
    ],
  },
  {
    slug: "giu-gio-ngu-deu-nhu-giu-mot-ben-neo",
    title: "Giữ giờ ngủ đều như giữ một bến neo",
    group: "y",
    description:
      "Giấc ngủ đều như nhịp neo giữ thuyền: không hứa chữa bệnh, chỉ nhắc về điều độ và sự cần có của chỗ dừng.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/y/giu-gio-ngu-deu-nhu-giu-mot-ben-neo.png",
    content: {
      intro:
        "Ở nhóm Y, giấc ngủ được nói như một phần của “khí” và nhịp sống: không phải nhãn dán y học, mà là kinh nghiệm đời thường phổ quát — khi ngủ lệch lâu ngày, người dễ nóng, dễ căng, dễ quyết định vội. Bài này không đưa giờ “chuẩn” cho mọi người; chỉ gợi ý giữ một khoảng điều độ mà bản thân có thể theo dõi được.",
      sections: [
        {
          heading: "Đều không có nghĩa máy móc",
          body:
            "Đều là xu hướng: đêm nào cũng cố đúng phút giây sẽ thất vọng dễ hơn là ngủ ngon. Thực tế là giảm độ lệch: nếu hay thức khuya, có thể rút dần mười phút mỗi tuần thay vì nhảy một bước lớn. Mục tiêu là giảm xung đột giữa “cơ thể muốn” và “việc đời bắt”.",
        },
        {
          heading: "Không thay cho bác sĩ",
          body:
            "Mất ngủ kéo dài, ngủ ngáy nặng, ngủ nhưng vẫn kiệt sức… là những chuyện cần được nhìn trong chăm sóc y tế khi cần. Phần Y trong Ngũ thuật không chẩn đoán và không khuyên bỏ điều trị; chỉ đứng ở lớp văn hóa dưỡng sinh và nhịp sống.",
        },
        {
          heading: "Một thói quen nhỏ",
          body:
            "Chọn một hành động báo hiệu cho cơ thể là “tối rồi”: tắt đèn chính, pha nước ấm, gập chăn sớm mười phút. Giữ đủ đơn giản để những ngày bận vẫn làm được — neo chỉ cần giữ thuyền không trôi tự do suốt đêm.",
        },
      ],
    },
    reflectionQuestions: [
      "Tuần qua giấc ngủ của bạn “neo” được mấy đêm gần như nhau?",
      "Điều gì hay đẩy giờ ngủ của bạn trễ nhất?",
    ],
  },
  {
    slug: "an-cham-de-nghe-co-the",
    title: "Ăn chậm để nghe cơ thể",
    group: "y",
    description:
      "Ăn là khoảnh khắc có thể trở thành quan sát: vị, no, khát — không kê thực đơn, không chữa bệnh qua bài.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/y/an-cham-de-nghe-co-the.png",
    content: {
      intro:
        "Ăn chậm không phải mốt nhà hàng; ở đây là để miệng và bụng kịp trao đổi. Trong ngôn ngữ dưỡng sinh, người ta hay nhắc “tỉnh khi ăn”: không vừa cắn vừa chạy timeline. Bài viết không khuyên kiêng tuyệt đối hay thêm thực phẩm lạ; chỉ gợi một thái độ — nghe xem hôm nay cơ thể muốn ấm hay mát, no hay nhẹ.",
      sections: [
        {
          heading: "No là cảm giác trễ một nhịp",
          body:
            "Tín hiệu no đến sau khi ăn một lúc. Nếu ăn quá nhanh, ta có thể vượt ngưỡng trước khi kịp nhận. Chậm lại một chút là cho phép dạ dày và đầu óc cùng nhận tin — không phải kỷ luật sắt, chỉ là chỉnh nhịp.",
        },
        {
          heading: "Không đọc “ăn đúng” thành phép tắc",
          body:
            "Mỗi miền mỗi mùa có khác; mỗi người có bệnh nền khác nhau. Không có một món “nhất định tốt cho mọi người”. Nếu có dị ứng, bệnh chuyển hóa, đang điều trị — phần quyết định thuộc người có chuyên môn y khoa và chính bạn trong phòng khám.",
        },
        {
          heading: "Thử trong một bữa",
          body:
            "Đặt đũa xuống sau mỗi miếng lớn, nhìn ra cửa sổ ba nhịp thở. Không cần im phăng phắc; chỉ cần đủ để biết mình đang nhai hay đang lo chuyện khác.",
        },
      ],
    },
    reflectionQuestions: [
      "Bữa nào bạn hay ăn mà không nhớ mình đã ăn gì?",
      "“Nghe cơ thể” với bạn là cảm giác hay suy nghĩ?",
    ],
  },
  {
    slug: "di-bo-sau-mot-ngay-nhieu-tieng-dong",
    title: "Đi bộ sau một ngày nhiều tiếng động",
    group: "y",
    description:
      "Đưa thân trở lại nhịp chậm bằng bước chân — không hứa chữa đau, chỉ nhắc về kết nối nhẹ với mặt đất và hơi thở.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/y/di-bo-sau-mot-ngay-nhieu-tieng-dong.png",
    content: {
      intro:
        "Ngày làm việc với máy tính và họp trực tuyến thường kéo vai lên, thở nông, mắt mỏi. Đi bộ sau giờ không cần thành bài tập thể thao; có thể chỉ là vòng nhỏ quanh khu phố. Trọng tâm là để chân chạm đất có ý thức, để tai nghe được ít nhất một âm thanh không phát ra từ loa.",
      sections: [
        {
          heading: "Đi bộ như xả áp",
          body:
            "Không cần đủ mười ngàn bước mới “hợp lệ”. Đôi khi mười lăm phút đủ để tuần hoàn và tâm trí đổi nhịp. Quan trọng là không biến đi bộ thành một chỉ số để tự phạt nếu không đạt.",
        },
        {
          heading: "Khi cơ thể có bệnh lý",
          body:
            "Đau khớp, tim mạch, huyết áp… là chuyện cần bác sĩ biết. Bài này không khuyên gắng sức — chỉ mô tả một lựa chọn nhẹ cho người đang được phép vận động vừa sức.",
        },
        {
          heading: "Gợi ý nhỏ",
          body:
            "Ra khỏi nhà không mang tai nghe một lần; để tiếng xe, tiếng còi, tiếng cười trẻ là phần của thành phố — mình chỉ là người đi ngang, không phải người phải giải quyết hết.",
        },
      ],
    },
    reflectionQuestions: [
      "Lần cuối bạn đi bộ mà không cần đếm bước là khi nào?",
      "Điều gì khiến bạn khó rời màn hình dù đã mệt?",
    ],
  },
  {
    slug: "duong-sinh-khong-bat-dau-tu-thuoc",
    title: "Dưỡng sinh không bắt đầu từ thuốc",
    group: "y",
    description:
      "Nhắc rằng nếp sống và giấc ngủ là lớp nền; thuốc và thực phẩm chức năng là chuyện cần người có chuyên môn — không tự kê tại nhà qua bài đọc.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/y/duong-sinh-khong-bat-dau-tu-thuoc.png",
    content: {
      intro:
        "“Dưỡng sinh” dễ bị quảng cáo thành một viên, một loại trà, một lộ trình mua hàng. Trong Ngũ thuật, lớp Y nhấn nền trước: ăn đủ bữa, ngủ có chừng, giảm căng, vận động vừa sức. Thuốc và thực phẩm chức năng có chỗ của chúng — nhưng không phải điểm xuất phát của kênh nội dung này.",
      sections: [
        {
          heading: "Nền là nhịp",
          body:
            "Một người thiếu ngủ lâu ngày khó “bổ” bằng vài viên. Không phải phủ nhận y học — chỉ nhắc thứ tự: chỉnh nhịp trước, cân nhắc can thiệp sau, và luôn có người đọc được chỉ số thật khi cần.",
        },
        {
          heading: "Không kê toa qua bài viết",
          body:
            "Mỗi cơ địa một khác; ranh giới an toàn là không đưa liều lượng, không khuyên thay thuốc đang dùng, không biến cổ học thành cửa hàng trực tuyến.",
        },
        {
          heading: "Một câu hỏi tự soi",
          body:
            "Trước khi tìm thêm “thứ bổ sung”, hỏi: mình đã cho cơ thể đủ ngủ, đủ nước, đủ lúc không bị dí sát chưa? Đôi khi câu trả lời nằm ở lịch lành, không nằm ở chai lọ.",
        },
      ],
    },
    reflectionQuestions: [
      "Bạn đang cần “bổ sung” hay đang cần “bớt hao” trong ngày?",
      "Khi nào bạn nên nhờ người có chuyên môn thay vì tự đọc mạng?",
    ],
  },
  {
    slug: "menh-khong-phai-ban-an",
    title: "Mệnh không phải bản án",
    group: "menh",
    description:
      "Can chi và các chỉ dấu mệnh lý là ngôn ngữ tham khảo — không khép kín tương lai, không ra lệnh cho đời người.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/menh/menh-khong-phai-ban-an.png",
    content: {
      intro:
        "Nhiều người nghe “mệnh” là nghĩ tới kết luận một lần cho cả đời: giàu nghèo, hạn, may. Trong cách đọc mà Hồn Thơ chọn, mệnh gần với “thiên hướng” và “độ lệch có thể nhận ra” — như bản đồ địa hình, không phải lệnh bắt buộc. Không có chữ “nhất định”, không có “số này chắc chắn xấu”.",
      sections: [
        {
          heading: "Bản đồ không phải đường ray",
          body:
            "Bản đồ cho biết chỗ dốc, chỗ bùn; nhưng người cầm lái vẫn là mình — với giới hạn hoàn cảnh và trách nhiệm. Đọc mệnh như học ngôn ngữ để hiểu mình rõ hơn, không phải để buông tay trước thói quen xấu.",
        },
        {
          heading: "Giữ ngôn ngữ mềm",
          body:
            "Khi kể cho người khác nghe, tránh cách nói hù dọa hay cam đoan. Nếu một diễn giải khiến người nghe chỉ còn sợ hoặc chờ “đúng ngày đúng giờ”, đó là dấu hiệu đã trượt khỏi ranh giới văn hóa an toàn.",
        },
        {
          heading: "Một hướng đọc lành",
          body:
            "Thay vì hỏi “tôi sẽ giàu không”, có thể hỏi “tôi hay lệch về đâu khi căng” — câu sau mở chỗ tự chỉnh, câu trước dễ biến thành trò đợi.",
        },
      ],
    },
    reflectionQuestions: [
      "Bạn từng nghe câu nói về “mệnh” nào khiến bạn bất an dài ngày?",
      "Nếu mệnh là ngôn ngữ tự hiểu, bạn muốn hiểu điều gì trước tiên?",
    ],
  },
  {
    slug: "can-chi-nhu-chiec-lich-cua-thoi-gian",
    title: "Can chi như chiếc lịch của thời gian",
    group: "menh",
    description:
      "Can chi giúp đánh dấu nhịp năm tháng ngày giờ trong văn hóa — không phải xiềng xích khóa người vào một kết cục.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/menh/can-chi-nhu-chiec-lich-cua-thoi-gian.png",
    content: {
      intro:
        "Nếu coi can chi như một hệ lịch cổ, ta thấy chúng giúp đặt sự kiện vào vòng quay lớn: mùa, vòng năm, vòng mười hai. Đó là cách người xưa tổ chức trí nhớ và ý nghĩa — không đồng nghĩa mỗi người sinh cùng canh đều có cùng một kết số. Tránh đọc như “nhãn dán định mệnh”.",
      sections: [
        {
          heading: "Lịch là khung, không phải phán quyết",
          body:
            "Lịch báo khi nào gieo, khi nào dự trữ; nhưng mùa màng còn phụ thuộc đất, nước, tay người. Can chi khi dùng để suy ngẫm bản thân cũng vậy: cho khung thời gian để nhìn xu hướng, không thay cho quyết định đạo đức và chăm sóc đời sống.",
        },
        {
          heading: "Tránh cực đoan",
          body:
            "Không nên biến một vài ký hiệu thành lý do để phán người khác hay phán chính mình một cách cứng nhắc. Ngôn ngữ mệnh lý dễ bị lạm dụng khi thiếu nuông chiều ngữ cảnh.",
        },
        {
          heading: "Gợi mở nhẹ",
          body:
            "Thử đọc can chi như tên những “mùa nội tâm” có thể lặp — không phải để biết trước điều gì, mà để hiểu vì sao có lúc mình nhạy hơn, có lúc cần chậm hơn.",
        },
      ],
    },
    reflectionQuestions: [
      "Bạn hay dùng thời gian để nhìn lại mình theo ngày, tuần, hay năm?",
      "Điều gì giúp bạn nhớ rằng “lịch” chỉ là khung, không phải lệnh?",
    ],
  },
  {
    slug: "ngu-hanh-de-soi-thien-huong-khong-de-dong-khung",
    title: "Ngũ hành để soi thiên hướng, không để đóng khung",
    group: "menh",
    description:
      "Kim Mộc Thủy Hỏa Thổ là ngôn ngữ quan hệ — nhắc xu hướng và tương tác, không khóa một con người vào một hạng duy nhất.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/menh/ngu-hanh-de-soi-thien-huong-khong-de-dong-khung.png",
    content: {
      intro:
        "Ngũ hành trong triết học truyền thống thường được dạy như quan hệ sinh — khắc — chuyển hóa, không phải như năm loại “bản chất cứng” dán lên người. Khi đọc để hiểu mình, ta quan tâm đến xu hướng cân bằng và chỗ lệch — không viết câu kiểu “mệnh này nhất định khắc kia”.",
      sections: [
        {
          heading: "Thiên hướng là gợn sóng",
          body:
            "Có người dễ nóng, có người dễ trầm — có thể diễn tả bằng ngôn ngữ hành để tự quan sát. Đó là vùng tham khảo nội tâm, không phải xếp hạng đạo đức hay thành bại.",
        },
        {
          heading: "Không đóng khung người khác",
          body:
            "Gắn nhãn “họ thuộc hành này nên như thế” là cách nhanh nhưng thiếu nhân hậu và thường sai. Mỗi người sống trong bối cảnh — sức khỏe, gia đình, công việc — làm đổi cách biểu hiện của “khí” hơn là một nhãn tĩnh.",
        },
        {
          heading: "Một hướng đọc lành",
          body:
            "Hỏi: mình đang quá “thắng” hay quá “tắc” trong một mối quan hệ hay một việc — để tìm chỗ điều chỉnh nhẹ, không để tìm cớ buông.",
        },
      ],
    },
    reflectionQuestions: [
      "Bạn từng thấy ngũ hành được dùng để “đóng khung” ai đó chưa?",
      "Thiên hướng nào bạn muốn hiểu rõ hơn mà không cần một nhãn cố định?",
    ],
  },
  {
    slug: "dung-dung-menh-de-buong-xuoi",
    title: "Đừng dùng mệnh để buông xuôi",
    group: "menh",
    description:
      "Nếu mệnh là ngôn ngữ hiểu xu hướng thì trách nhiệm vẫn thuộc lựa chọn — không biến cổ học thành lý do trì hoãn điều cần làm.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/menh/dung-dung-menh-de-buong-xuoi.png",
    content: {
      intro:
        "Có hai hiểm họa đối xứng: một là tin vào mệnh để sợ hãi; hai là tin vào mệnh để buông tay với những việc vẫn thuộc về đạo đức và chăm sóc. Bài này đứng về phía thứ hai: ngôn ngữ mệnh lý không nên trở thành lớp vỏ cho sự trì hoãn có chủ ý hay trách nhiệm bị đẩy đi.",
      sections: [
        {
          heading: "Xu hướng không xóa trách nhiệm",
          body:
            "Hiểu mình hay lệch không có nghĩa là được phép làm tổn thương người khác rồi đổ cho “tính khí”. Hiểu vận nhịp không có nghĩa là không cần học hành, chữa bệnh đúng lúc, hay xin lỗi khi sai.",
        },
        {
          heading: "Phân biệt “nhận ra” và “biện minh”",
          body:
            "Nhận ra mình dễ nản trong một giai đoạn là một việc; lấy đó làm lý do không cố gắng trong việc có thể làm được là việc khác. Mệnh học nghiêm túc không nuôi biện minh dễ dàng.",
        },
        {
          heading: "Một câu tự hỏi",
          body:
            "Trước khi nói “số vậy”, hỏi: nếu không dùng từ mệnh, mình vẫn chọn cách này chưa? Nếu câu trả lời là không, có thể đang cần chỉnh hành động hơn là chỉnh nhãn.",
        },
      ],
    },
    reflectionQuestions: [
      "Lần gần nhất bạn dùng “duyên/số/mệnh” để giải thích một việc — đó là nhận ra hay biện minh?",
      "Điều gì thuộc về lựa chọn của bạn dù khó?",
    ],
  },
  {
    slug: "khi-long-roi-que-chi-nen-la-cau-hoi-mo",
    title: "Khi lòng rối, quẻ chỉ nên là câu hỏi mở",
    group: "boc",
    description:
      "Trước bất định, quẻ có thể giúp đặt câu hỏi đúng hơn là đòi một đáp số chắc chắn — không thay cho dữ kiện hay trách nhiệm.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/boc/khi-long-roi-que-chi-nen-la-cau-hoi-mo.png",
    content: {
      intro:
        "Lòng rối thường muốn một câu trả lời dứt khoát. Bốc học trong không gian này được đặt chậm lại: quẻ như một gương soi hình thế — giúp thấy chỗ mâu thuẫn, chỗ cần dời bước — chứ không ban một phán quyết “nhất định xảy ra”. Nếu một cách đọc biến quẻ thành lệnh sống tuyệt đối, đó là lúc nên nghi ngờ cách đọc.",
      sections: [
        {
          heading: "Câu hỏi mở là gì",
          body:
            "Thay vì “tôi có nên bỏ không”, có thể thành “điều gì đang khiến tôi chỉ nhìn một phương án”. Câu mở không cho đáp đúng sai ngay; nó cho chỗ suy ngẫm — phù hợp với việc chiêm nghiệm hơn là với việc đặt cược.",
        },
        {
          heading: "Quẻ không thay dữ kiện",
          body:
            "Nếu việc liên quan pháp lý, y khoa, tài chính nghiêm trọng — cần người có chuyên môn và tài liệu thật. Quẻ không phải hợp đồng, không phải xét nghiệm — và không nên được dùng để trì hoãn những bước cần làm rõ.",
        },
        {
          heading: "Giữ nhịp chậm",
          body:
            "Sau khi đọc, cho phép mình một đêm ngủ trước khi quyết — không phải vì mê tín, mà vì quyết định lớn cần thân và tâm cùng có mặt.",
        },
      ],
    },
    reflectionQuestions: [
      "Câu hỏi nào bạn đang cố nhét vào quẻ mà thực ra thuộc về dữ kiện và trách nhiệm?",
      "Khi lòng rối, điều gì giúp bạn “mở” thay vì “chốt” quá sớm?",
    ],
  },
  {
    slug: "doc-mot-que-nhu-soi-lai-chinh-minh",
    title: "Đọc một quẻ như soi lại chính mình",
    group: "boc",
    description:
      "Hình thế quẻ có thể là gương phản chiếu thái độ — không phải phép tiên tri về người khác.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/boc/doc-mot-que-nhu-soi-lai-chinh-minh.png",
    content: {
      intro:
        "Nhiều người mang câu hỏi về người khác vào quẻ: “họ có yêu không”, “họ có ác không”. Một hướng đọc lành là đưa câu hỏi về phần mình đang tham, đang sợ, đang muốn kiểm soát điều không thuộc tay mình. Quẻ khi đó như soi lại góc khuất của chính mình — không phải camera theo dõi người ngoài.",
      sections: [
        {
          heading: "Gương và trách nhiệm",
          body:
            "Gương không đổi được người trong phòng khác; nó chỉ giúp chỉnh dây áo cho người đứng trước nó. Đọc quẻ như gương là nhận phần trách nhiệm có thể nhận — không phán giá trị người khác qua một hình thế.",
        },
        {
          heading: "Tránh ngôn ngữ chắc chắn",
          body:
            "Không dùng kiểu “quẻ này nói họ nhất định…”. Ngôn ngữ nặng dễ sinh hận và hù — trái với ranh giới Bốc mà Hồn Thơ giữ.",
        },
        {
          heading: "Một thực hành nhỏ",
          body:
            "Sau khi đọc, viết ba dòng: tôi đang sợ điều gì; tôi đang muốn điều gì; tôi có thể làm gì trong phạm vi đạo đức và khả năng. Ba dòng đó thường quan trọng hơn một câu “đoán”.",
        },
      ],
    },
    reflectionQuestions: [
      "Gần đây bạn hay hỏi quẻ về ai nhiều hơn về chính mình?",
      "Điều gì bạn sợ nhìn nếu soi thật vào gương?",
    ],
  },
  {
    slug: "que-khong-thay-ban-song-ho",
    title: "Quẻ không thay bạn sống hộ",
    group: "boc",
    description:
      "Quẻ có thể gợi ý thế cục và thái độ — việc bước đi, nói lời, xin giúp đỡ vẫn là của bạn.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/boc/que-khong-thay-ban-song-ho.png",
    content: {
      intro:
        "Có lúc người ta mong một quẻ “tốt” để được phép yên tâm, hoặc một quẻ “xấu” để được phép trốn. Ranh giới lành nhắc: quẻ không đăng ký hộ khẩu thay bạn, không nộp đơn thay bạn, không xin lỗi thay bạn. Đời sống vẫn đòi hành động và đối diện — phần chiêm nghiệm chỉ là một lớp, không phải toàn bộ.",
      sections: [
        {
          heading: "Khi quẻ thành chỗ trốn",
          body:
            "Nếu cứ chờ “đúng ngày” mới dám bắt đầu việc cần làm, có thể đang nhầm giữa chiêm nghiệm và trì hoãn. Phân biệt bằng việc nhỏ có thể làm hôm nay — không cần phép thuận từ bên ngoài.",
        },
        {
          heading: "Không hù ai bằng quẻ",
          body:
            "Đọc cho người khác mà làm họ sợ “tai họa” là phá ranh giới. Quẻ không nên trở thành roi đánh lòng người.",
        },
        {
          heading: "Một gợi ý",
          body:
            "Sau khi chiêm nghiệm, chọn một việc nhỏ trong tầm tay: một cuộc gọi, một email, một bước đi — để đời không chỉ nằm trong trang giải quẻ.",
        },
      ],
    },
    reflectionQuestions: [
      "Lần nào bạn muốn quẻ “cho phép” thay vì tự cho phép mình?",
      "Việc nhỏ nào bạn có thể làm mà không cần chờ thêm ý từ bên ngoài?",
    ],
  },
  {
    slug: "mot-cau-hoi-dung-da-la-nua-cau-tra-loi",
    title: "Một câu hỏi đúng đã là nửa câu trả lời",
    group: "boc",
    description:
      "Đặt câu hỏi rõ ràng trước bất định — phần Bốc ở đây nhấn chất lượng câu hỏi hơn là kỳ vọng một lời phán chắc nịch.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/boc/mot-cau-hoi-dung-da-la-nua-cau-tra-loi.png",
    content: {
      intro:
        "Bất định đôi khi đến từ câu hỏi mơ hồ: “tôi có nên hay không” trong khi không định nghĩa “nên” theo tiêu chí nào. Một câu hỏi đúng thường kèm phạm vi, thời gian, và giá trị mình không muốn bán rẻ. Khi câu hỏi được làm rõ, một phần lớn sương mù đã tan — dù chưa gieo quẻ.",
      sections: [
        {
          heading: "Câu hỏi đẹp là câu trung thực",
          body:
            "Hỏi sao cho không lẫn mong muốn với sự thật có thể kiểm chứng. Ví dụ tách “tôi sợ cô đơn” khỏi “tôi có nên ở lại” — để thấy phần nào là nhu cầu, phần nào là quyết định.",
        },
        {
          heading: "Quẻ đi sau câu hỏi",
          body:
            "Nếu câu hỏi còn lộn xộn, quẻ dễ thành gương mờ. Đừng vội đòi hình thế “trả lời hộ” khi phần đầu câu chưa ngồi xuống được.",
        },
        {
          heading: "Thực hành",
          body:
            "Viết câu hỏi dài nhất có thể, rồi cắt bớt cho đến khi còn một câu ngắn nhưng trung thực — đó là chỗ Bốc có thể đứng cạnh mà không lấn át.",
        },
      ],
    },
    reflectionQuestions: [
      "Câu hỏi bạn hay đặt cho cuộc đời có đang quá rộng để ai cũng không trả lời được?",
      "Tiêu chí nào bạn chưa dám ghi ra khi hỏi “có nên không”?",
    ],
  },
  {
    slug: "than-thai-di-truoc-guong-mat",
    title: "Thần thái đi trước gương mặt",
    group: "tuong",
    description:
      "Ánh mắt, nhịp thở, dáng đứng mang tín hiệu trước đường nét — quan sát phong thái, không phán nhân phẩm qua một đường nét.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/tuong/than-thai-di-truoc-guong-mat.png",
    content: {
      intro:
        "Người ta thường nhìn mặt trước, nhưng nhiều khi điều chạm ta trước là nhịp: người đó có đang lắng không, có đang vội không, có đang phòng thủ không. Tướng học trong không gian này là quan sát phong thái và sự tự tu dưỡng phía sau — không biến gương mặt thành bảng điểm đạo đức hay vận hạn.",
      sections: [
        {
          heading: "Thần thái là thời điểm",
          body:
            "Cùng một gương mặt có thể mệt, có thể sáng — tùy đêm ngủ, tùy tin vui buồn. Vì vậy nhìn người qua một khoảnh khắc để kết luận dài hạn là điều nên tránh.",
        },
        {
          heading: "Không đọc “tướng tốt/xấu” cho nhân phẩm",
          body:
            "Ranh giới an toàn: không nối đặc điểm ngoại hình với phẩm chất hay “số phận”. Không dùng ngôn ngữ hù hay kỳ thị.",
        },
        {
          heading: "Thực hành cho chính mình",
          body:
            "Trước gương, thử nhận ra vai đang cứng hay môi đang mím — không để chê bai bản thân, chỉ để chỉnh nhẹ: thở, buông vai, nhìn mềm hơn. Đó là Tướng như tự học phong thái.",
        },
      ],
    },
    reflectionQuestions: [
      "Khi gặp người lạ, bạn hay bắt đầu từ mặt hay từ nhịp?",
      "Phong thái nào bạn muốn nuôi thêm mà không cần đổi khuôn?",
    ],
  },
  {
    slug: "dung-voi-doc-nguoi-qua-khuon-mat",
    title: "Đừng vội đọc người qua khuôn mặt",
    group: "tuong",
    description:
      "Ấn tượng đầu có thể nhanh — chừng lại một nhịp để không biến một đường nét thành kết luận về con người.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/tuong/dung-voi-doc-nguoi-qua-khuon-mat.png",
    content: {
      intro:
        "Tâm lý học hiện đại cho thấy con người có thể hình thành ấn tượng rất nhanh từ gương mặt — nhưng điều đó không biến ấn tượng ấy thành căn cứ đạo đức để xét người. Bài này nhắc chừng nhịp: nhìn được, nhưng không vội khép án; để lại chỗ cho lời nói, việc làm và bối cảnh.",
      sections: [
        {
          heading: "Mặt là một phần, không phải toàn bộ",
          body:
            "Ốm, ngủ kém, căng thẳng đều có thể đổi sắc mặt — không liên quan tới “tốt xấu” nhân cách. Hiểu như vậy để khỏi vô tình làm người khác nhỏ đi trong mắt mình.",
        },
        {
          heading: "Giữ phép lịch sự",
          body:
            "Không nhận xét ngoại hình người khác như một trò đoán vận — đặc biệt trước đám đông. Phép lịch sự cũng là biên an toàn của nhóm Tướng.",
        },
        {
          heading: "Một thử thách nhỏ",
          body:
            "Khi nảy ra một nhận xét tức thì về ai đó, giữ trong đầu ba phút làm điều khác rồi hỏi lại: suy nghĩ đó đến từ đâu — kinh nghiệm cũ hay điều người đó vừa làm?",
        },
      ],
    },
    reflectionQuestions: [
      "Bạn có hay tin vào “cảm giác đầu tiên” đến mức khó sửa không?",
      "Điều gì giúp bạn nhìn người lâu hơn một khoảnh khắc?",
    ],
  },
  {
    slug: "phong-thai-hien-lanh-khong-pho-truong",
    title: "Phong thái hiền lành không phô trương",
    group: "tuong",
    description:
      "Hiền có thể là nhẹ nhàng và rõ ràng — không cần diễn, không cần phô để chứng minh mình “tốt”.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/tuong/phong-thai-hien-lanh-khong-pho-truong.png",
    content: {
      intro:
        "Phong thái không phải trang phục để khoe; nhiều khi hiền lành nhất là giọng nói đủ nghe, tay đủ nhẹ, mắt đủ dừng. Trong văn hóa đọc Tướng lành, ta quan tâm đến sự đỡ cho người khác — không biến “hiền” thành mặt nạ hay đạo đức giả.",
      sections: [
        {
          heading: "Hiền không phải nhược",
          body:
            "Hiền có thể kèm ranh giới rõ: không đồng ý nhưng không làm nhục người khác. Phong thái là cách giữ nhịp đó qua lời nói và cử chỉ.",
        },
        {
          heading: "Không phô không có nghĩa giấu giếm",
          body:
            "Không phô là không cần chứng minh liên tục; vẫn có thể thẳng thắn khi cần. Ranh giới là không lấy “vẻ hiền” để đè người khác hoặc để tránh trách nhiệm.",
        },
        {
          heading: "Nuôi phong thái hằng ngày",
          body:
            "Ăn đủ ngủ đủ, nói ít hơn một chút khi đang nóng, nhìn người đối diện đủ một nhịp trước khi trả lời — những việc nhỏ đó đổi khí sắc dễ hơn là một “cách làm mặt”.",
        },
      ],
    },
    reflectionQuestions: [
      "Khi nào bạn hay “phô” để được xem là người tốt?",
      "Hiền lành với bạn có bao gồm việc nói không một cách rõ ràng không?",
    ],
  },
  {
    slug: "mot-nu-cuoi-co-hoc-tu-nam-thang",
    title: "Một nụ cười có học từ năm tháng",
    group: "tuong",
    description:
      "Nụ cười mang phần diễn tả và phần lịch sử — có thể học để nhẹ hơn mà không giả tạo.",
    coverImage: "/images/articles/huyen-mon-tham-khao/ngu-thuat/tuong/mot-nu-cuoi-co-hoc-tu-nam-thang.png",
    content: {
      intro:
        "Nụ cười không chỉ là cơ mặt; nó là điều một người học được sau những lần giữ lời, nhịn đúng chỗ, và buông đúng chỗ. Trong khung Tướng lành, ta không đọc “nụ cười tốt/xấu” để đoán phúc họa — chỉ nhận ra nụ cười có thể là chỗ dịu cho người khác và cho chính mình.",
      sections: [
        {
          heading: "Học không phải giả",
          body:
            "Học ở đây là luyện nhẹ: nhếch mép trước khi chữ nặng thoát ra — không phải đeo nụ cười như mặt nạ trong giao tiếp độc hại.",
        },
        {
          heading: "Không đánh giá người khác qua nụ cười",
          body:
            "Người không cười có thể đang đau hoặc đang giữ im lặng có chủ đích — không suy diễn nhân phẩm từ một biểu hiện.",
        },
        {
          heading: "Thực hành",
          body:
            "Trước khi vào cửa nhà sau ngày căng, thử thở một hơi và nhẹ lòng hoàn một chút — không để gia đình nhận hết phần cứng của ngày làm.",
        },
      ],
    },
    reflectionQuestions: [
      "Nụ cười của bạn đang đến từ đâu hôm nay — mệt nhưng nhẹ, hay đang che một điều chưa nói?",
      "Khi nào im lặng là hiền hơn cười?",
    ],
  },
];
