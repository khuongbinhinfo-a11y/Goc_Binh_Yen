export type PoemStatus = "published" | "upcoming";

export type PoemAnalysis = {
  emotionFlow: string;
  standoutImages: string;
  meaning: string;
  memorableLine: string;
};

export type PoemImageResearch = {
  moodKeywords: string[];
  referenceLinks: string[];
  recommendedScene: string;
  licenseNote: string;
};

export type PoemItem = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  author: string;
  locationDate: string;
  cardImage: string;
  heroImage: string;
  content: string;
  status: PoemStatus;
  analysis: PoemAnalysis;
  imageResearch: PoemImageResearch;
  audioUrl?: string;
  hasAudio?: boolean;
};

const POEM_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

const AVAILABLE_LOCAL_POEM_IMAGES = new Set([
  "anh-yeu-em.jpeg",
  "ban-tay.jpeg",
  "ben-do.jpeg",
  "ben-song-xua.jpeg",
  "cam-hoa.jpeg",
  "cam-on-tinh-yeu.jpeg",
  "chi-can-co-vay.jpeg",
  "cho-anh-goi.jpeg",
  "dau-can-noi-chi-em.jpeg",
  "em-mua-xuan-ve.jpeg",
  "em-trong-anh.jpeg",
  "hanh-phuc.jpeg",
  "hoa-buom.jpeg",
  "hoa-luc-binh.jpeg",
  "hue-trang.jpeg",
  "khoang-cach-vo-hinh.jpeg",
  "mo-tro-ve.jpeg",
  "mot-thoang.jpeg",
  "ngam.jpeg",
  "ngang-ben-song-xua.jpeg",
  "nhin-trang.jpeg",
  "nho.jpeg",
  "nho-lam-ngay-xua.jpeg",
  "qua-mien-thuong-nho.jpeg",
  "qua-voi-bau.jpeg",
  "tieng-keu-chim-le-ban.jpeg",
  "mua-hen.jpeg",
  "cho-trong.jpeg",
  "mo-uoc.jpeg",
  "muon-con-hon-khong.jpeg",
  "goi-lai-em.jpeg",
  "vu-vo.jpeg",
  "chuyen-do.jpeg",
  "mo-dao-vuon-xuan.jpeg",
  "ron-rang.jpeg",
]);

function normalizeVietnameseText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u0111\u0110\u00f0\u00d0]/g, "d")
    .toLowerCase();
}

function slugifyPoemTitle(title: string) {
  return normalizeVietnameseText(title)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function resolvePoemImageByTitle(title: string) {
  const baseName = slugifyPoemTitle(title);

  for (const ext of POEM_IMAGE_EXTENSIONS) {
    const fileName = `${baseName}${ext}`;
    if (AVAILABLE_LOCAL_POEM_IMAGES.has(fileName)) {
      return `/images/poems/${fileName}`;
    }
  }

  return "/images/logo-4.jpg";
}

export const poems: PoemItem[] = [
  {
    slug: "dong-song",
    title: "Dòng sông",
    tag: "Thơ quê",
    summary: "Cánh cỏ trắng, lục bình trôi. Dòng sông quê bên lở bên bồi.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 03/01/2019",
    cardImage: "/images/poems/dong-song.jpeg",
    heroImage: "/images/poems/dong-song.jpeg",
    audioUrl: "/audio/Dong-song.m4a",
    hasAudio: true,
    content:
      "Cánh cỏ trắng, lục bình trôi\nDòng sông quê bên lở bên bồi\nMiền đất ấy, nơi chôn rau, cắt rốn\nCả một đời, sông chảy trong tôi\nDòng sông yêu, em khơi nguồn đạo ấy\nMãi ngọt ngào, xuôi chảy miên man\nGột rửa cho anh bao nỗi muộn phiền\nKhi đắm mình giữa hai dòng sông ấy\nAnh nghe lòng: Sao ấm áp, bình yên\nQuê mình mỗi nhà có một bến sông\nNơi lũ trẻ nô đùa, hẹn nhau tắm mát\nNơi mẹ ngồi giặt áo những chiều buông\nNhững đêm trăng, ai ngồi đợi kẻ chèo xuồng\nChờ giọng hò lan trên sông vắng\nKhiến cả đời không quên được dòng sông\nKhiến cả đời xa ngóng, vắng trông\nCánh cò, dòng sông, lục bình trôi tận mạn\nDẫu bể cuộc đời nhớ mãi dòng sông.\n\nMỹ Tho, ngày 03/01/2019",
    status: "published",
    analysis: {
      emotionFlow:
        "Mạch thơ đi từ cảnh quê bình dị đến chiều sâu ký ức và sự neo đậu tinh thần trong tình đất, tình người.",
      standoutImages:
        "Hình ảnh lục bình, bến sông, giọng hò đêm trăng tạo nên không gian quê vừa cụ thể vừa giàu hoài niệm.",
      meaning:
        "Bài thơ khẳng định sông quê không chỉ là địa lý mà là mạch nguồn căn tính, nơi con người trở về để tìm sự bình yên.",
      memorableLine: "Dẫu bể cuộc đời nhớ mãi dòng sông.",
    },
    imageResearch: {
      moodKeywords: ["sông quê", "hoài niệm", "bình yên", "lục bình"],
      referenceLinks: [],
      recommendedScene: "Bến sông quê lúc chiều xuống, màu trời dịu, có cảm giác lặng và sâu.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "tam-long",
    title: "Tấm lòng",
    tag: "Thơ tình",
    summary: "Biển dù có rộng mênh mông mà sao sánh được tấm lòng của em.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 3/9/2019",
    cardImage: "/images/poems/tam-long.jpeg",
    heroImage: "/images/poems/tam-long.jpeg",
    audioUrl: "/audio/Tam-long.m4a",
    hasAudio: true,
    content:
      "Biển dù có rộng mênh mông\nMà sao sánh được tấm lòng của em\nLặng nghe hơi thở thơm mềm\nTưởng như em định nói gì phải không\nMôi tim môi ngọt lịm môi hồng\nTrái tim thổn thức nao lòng\nEm ơi! Ngày xưa dại một lần thôi\nRẽ đi, lạc ngã ngậm ngùi buồn trông\nBao năm én về tây, nhạn về đông\nMà em vẫn giữ đóa hồng cho anh\nĐất trời cao rộng mênh mông\nKhông sao sánh được tấm lòng của em.\n\nCai Lậy, ngày 3/9/2019",
    status: "published",
    analysis: {
      emotionFlow:
        "Mạch cảm xúc đi từ ngợi ca đến biết ơn, rồi lắng lại ở sự thủy chung bền bỉ qua năm tháng.",
      standoutImages:
        "Đối sánh biển rộng và tấm lòng tạo trục hình ảnh rõ, nhấn vào chiều sâu của tình cảm hơn mọi thước đo vật lý.",
      meaning:
        "Bài thơ tôn vinh sự son sắt, xem lòng người là giá trị nền tảng giữ cho tình yêu không bị bào mòn bởi thời gian.",
      memorableLine: "Không sao sánh được tấm lòng của em.",
    },
    imageResearch: {
      moodKeywords: ["thủy chung", "dịu dàng", "tri ân", "tình yêu"],
      referenceLinks: [],
      recommendedScene: "Không gian ấm, gần gũi, nhấn cảm giác tin cậy và bền lòng.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "long-trinh-nu",
    title: "Lòng trinh nữ",
    tag: "Thơ chiêm nghiệm",
    summary: "Không thuộc dòng kỳ hoa, dị thảo nên nép mình giữa ngàn sắc muôn hương.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, 4/2/2017",
    cardImage: "/images/poems/long-trinh-nu.jpeg",
    heroImage: "/images/poems/long-trinh-nu.jpeg",
    audioUrl: "/audio/Long-trinh-nu.m4a",
    hasAudio: true,
    content:
      "Không thuộc dòng kỳ hoa, dị thảo\nNên nép mình, giữa ngàn sắc muôn hương\nTự lạc trôi, yên phận chốn đời thường\nMiễn cỏ dại, vui vùng thôn dã\nÁp e, dịu dàng, giữ lòng trinh nữ\nPhận gái quê, quanh quẩn góc vườn quê\nMột ước mơ nho nhỏ: Giữ lấy lệ\nLòng trinh bạch giao duyên cùng quân tử\nTạo hóa thấu lòng, gió mưa, giông bão\nTrong khô cằn trinh nữ vẫn tròn hoa\nRồi mùa xuân trời đất giao hòa\nKhách lãng tử say tình cùng trinh nữ\nThơ tình yêu, lời ngọc, ngọt ngào trao\nĐất đầy hoa, trời lắm những vì sao\nMà chỉ thấy những toàn hoa trinh nữ\nQuay về thôi, gót chân lữ thứ\nTrinh nữ mở lòng, lãng tử về thôi.\n\nCai Lậy, 4/2/2017",
    status: "published",
    analysis: {
      emotionFlow:
        "Bài thơ mở bằng nét khiêm nhường, đi qua thử thách, rồi kết ở sự viên mãn và đồng điệu.",
      standoutImages:
        "Đối lập giữa khô cằn và tròn hoa làm nổi bật sức sống bền bỉ của vẻ đẹp kín đáo.",
      meaning:
        "Tác phẩm gợi suy ngẫm về phẩm hạnh, sự chờ đợi và giá trị của nét đẹp không ồn ào nhưng vững bền.",
      memorableLine: "Trong khô cằn trinh nữ vẫn tròn hoa.",
    },
    imageResearch: {
      moodKeywords: ["thanh khiết", "kín đáo", "bền bỉ", "thôn dã"],
      referenceLinks: [],
      recommendedScene: "Hoa trinh nữ trong không gian đồng nội, ánh sáng mềm và tĩnh.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "to-tinh",
    title: "Tỏ tình",
    tag: "Thơ tình",
    summary: "Trái tim với tấm lòng son gói vào đây cả cho tròn câu thơ.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 10/12/2004",
    cardImage: "/images/poems/to-tinh.jpeg",
    heroImage: "/images/poems/to-tinh.jpeg",
    audioUrl: "/audio/To-tinh.m4a",
    hasAudio: true,
    content:
      "Cánh liễu héo, khẽ mày chau\nCánh hồng rụng xuống, má đào lướt qua\nKhổ thân ai lắm người ta\nLiếc nhau một cái nghĩ là đã yêu\nTưởng tơ những sáng cùng chiều\nBâng khuâng, thờ thần, buồn hiu, cười thầm\nTa mơ xây chuyện trăm năm\nMong sao sớm được tay cầm tay nhau\nTa lo người mơ trên cao\nCòn ta dưới thấp làm sao đến gần\nTa lo trời đất xoay vần\nLỡ mà lạc lối biết lần đầu ra\nSợ rằng người chẳng hiểu ta\nNgười đi xa ngái, còn ta chết mòn\nTrái tim với tấm lòng son\nGói vào đây cả cho tròn câu thơ\nXin câu chín đợi mười chờ\nCho ta đánh tiếng bài thơ tỏ tình.\n\nCai Lậy, ngày 10/12/2004",
    status: "published",
    analysis: {
      emotionFlow:
        "Cảm xúc chuyển từ e dè, tự vấn đến dồn tụ thành lời ngỏ chân thành ở đoạn kết.",
      standoutImages:
        "Các cụm cánh liễu, cánh hồng, tay cầm tay nhau tạo nền hình ảnh mềm và giàu nhịp thổ lộ.",
      meaning:
        "Bài thơ khắc họa tâm thế người yêu trong khoảng giữa hy vọng và lo âu, chọn cách nói thật lòng qua thi ca.",
      memorableLine: "Cho ta đánh tiếng bài thơ tỏ tình.",
    },
    imageResearch: {
      moodKeywords: ["thổ lộ", "bâng khuâng", "chờ đợi", "tình yêu"],
      referenceLinks: [],
      recommendedScene: "Không gian chiều nhẹ, có sắc hoa và cảm giác ngập ngừng trước khi nói lời thật.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
{
    slug: "ben-do",
    title: "B\u1ebfn \u0110\u00f2",
    tag: "Th\u01a1 qu\u00ea",
    summary: "C\u00f3 m\u1ed9t con thuy\u1ec1n d\u1ecdc Ch\u1edf nh\u1eefng chuy\u1ebfn h\u00e0ng \u0111i",
    author: "L\u00ea D\u0169ng",
    locationDate: "T\u00e2n Phong, 13/10/2018",
    cardImage: resolvePoemImageByTitle("B\u1ebfn \u0110\u00f2"),
    heroImage: resolvePoemImageByTitle("B\u1ebfn \u0110\u00f2"),
    audioUrl: "/audio/Ben-\u0111o.m4a",
    hasAudio: true,
    content: "C\u00f3 m\u1ed9t con thuy\u1ec1n d\u1ecdc\nCh\u1edf nh\u1eefng chuy\u1ebfn h\u00e0ng \u0111i\nCh\u1edf bao ni\u1ec1m m\u01a1 \u01b0\u1edbc\nC\u1ee7a n\u00f4ng d\u00e2n, th\u00e1ng ng\u00e0y\nCon \u0111\u00f2 d\u1ecdc quen th\u1ea5y\nCh\u1ea1y tr\u00ean d\u00f2ng s\u00f4ng n\u00e0y\nCon \u0111\u00f2 trong l\u00f2ng anh\nCh\u1ea1y tr\u00ean d\u00f2ng th\u01b0\u01a1ng nh\u1edb\nCh\u1edf \u0111\u1ea7y bao y\u00eau th\u01b0\u01a1ng\n\u0110i t\u00ecm em b\u1ebfn \u0111\u1ed7\nSao m\u1ecbt m\u00f9 h\u01b0\u1edbng ph\u01b0\u01a1ng\nTh\u01b0\u01a1ng chi\u1ebfc thuy\u1ec1n xu\u00f4i d\u00f2ng c\u00f4 \u0111\u1ed9c\nKh\u00e1ch th\u01b0\u01a1ng h\u1ed3 g\u1ea1o ch\u1ee3, n\u01b0\u1edbc s\u00f4ng\nTh\u01b0\u01a1ng anh t\u00ecnh m\u00e3i long \u0111ong\nEm \u01a1i b\u1ebfn \u0111\u1eadu...\nEm \u01a1i b\u1ebfn \u0111\u1eadu...\nCho anh \u0111\u1eadu c\u00f9ng.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"C\u00f3 m\u1ed9t con thuy\u1ec1n d\u1ecdc\" v\u00e0 \"Ch\u1edf nh\u1eefng chuy\u1ebfn h\u00e0ng \u0111i\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Cho anh \u0111\u1eadu c\u00f9ng.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "ban-tay",
    title: "B\u00e0n Tay",
    tag: "Th\u01a1 t\u00ecnh",
    summary: "Anh \u0111\u00e3 h\u00f4n l\u00ean b\u00e0n tay \u1ea5y N\u00ean bi\u1ebft tay m\u1ec1m, \u1ea5m d\u01b0\u1eddng n\u00e0o",
    author: "L\u00ea D\u0169ng",
    locationDate: "M\u1ef9 Tho, ng\u00e0y 17/01/2019",
    cardImage: resolvePoemImageByTitle("B\u00e0n Tay"),
    heroImage: resolvePoemImageByTitle("B\u00e0n Tay"),
    audioUrl: "/audio/Ban-tay.m4a",
    hasAudio: true,
    content: "Anh \u0111\u00e3 h\u00f4n l\u00ean b\u00e0n tay \u1ea5y\nN\u00ean bi\u1ebft tay m\u1ec1m, \u1ea5m d\u01b0\u1eddng n\u00e0o\nBao \u0111\u00eam ve vu\u1ed1t, ru anh ng\u1ee7\nB\u1ea5y d\u1ecbu d\u00e0ng t\u1eeb \u1ea5y lan \u0111i\nKhi g\u1ed1i \u0111\u1ea7u l\u00ean b\u00e0n tay nh\u1ecf nh\u1eafn\nNghe \u00f9a v\u1ec1: H\u1ea1nh ph\u00fac, tin y\u00eau\nNh\u1eefng s\u1edbm mai, trong l\u00f2ng hoa n\u1edf\nV\u1eefng v\u00e0ng \u0111i, d\u1eabu m\u01b0a gi\u00f3 tr\u00e1i m\u00f9a\nNh\u00e0 l\u00e0 n\u01a1i v\u1ec1 sau h\u00e0nh tr\u00ecnh v\u1ea5t v\u1ea3\nV\u00f2ng tay em, s\u01b0\u1edfi \u1ea5m l\u00f2ng anh\nEm bi\u1ebft h\u00f4ng, anh th\u01b0\u01a1ng nhi\u1ec1u l\u1eafm \u0111\u00f3\nNh\u1eefng b\u00fap m\u0103ng, c\u0169ng c\u00f2i l\u1ea1 k\u1ef3\nD\u1ecbu t\u00ecnh ta th\u0103ng hoa h\u1ea1nh ph\u00fac\nD\u1eabu \u0111\u01b0\u1eddng c\u00f3 g\u1eadp gh\u1ec1nh ta v\u1eabn b\u01b0\u1edbc \u0111i\nAnh gi\u1eef m\u00e3i h\u01a1i \u1ea5m b\u00e0n tay \u1ea5y\nHoa mai v\u00e0ng tr\u00ean th\u1ea3m c\u1ecf xanh t\u01b0\u01a1i.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Anh \u0111\u00e3 h\u00f4n l\u00ean b\u00e0n tay \u1ea5y\" v\u00e0 \"N\u00ean bi\u1ebft tay m\u1ec1m, \u1ea5m d\u01b0\u1eddng n\u00e0o\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Hoa mai v\u00e0ng tr\u00ean th\u1ea3m c\u1ecf xanh t\u01b0\u01a1i.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "cam-hoa",
    title: "C\u1eafm Hoa",
    tag: "Th\u01a1 t\u00ecnh",
    summary: "Anh n\u00e2ng niu \u0111\u1eb7t em v\u00e0o b\u00ecnh pha-l\u00ea Say s\u01b0a ng\u1eafm em, t\u1ecfa h\u01b0\u01a1ng khoe s\u1eafc",
    author: "L\u00ea D\u0169ng",
    locationDate: "M\u1ef9 Tho, ng\u00e0y 18/6/2019",
    cardImage: resolvePoemImageByTitle("C\u1eafm Hoa"),
    heroImage: resolvePoemImageByTitle("C\u1eafm Hoa"),
    audioUrl: "/audio/Cam-hoa.m4a",
    hasAudio: true,
    content: "Anh n\u00e2ng niu \u0111\u1eb7t em v\u00e0o b\u00ecnh pha-l\u00ea\nSay s\u01b0a ng\u1eafm em, t\u1ecfa h\u01b0\u01a1ng khoe s\u1eafc\nH\u01b0\u01a1ng hoa hu\u1ec7 \u0111\u00e2u nh\u1eb9 nh\u00e0ng, \u0111\u1eb1m th\u1eafm\nM\u00e0 gi\u1eef h\u1ed3n \u1ee7 \u1ea5m l\u00f2ng anh\nC\u1ea3 m\u1ed9t th\u1eddi em c\u00f3 bi\u1ebft kh\u00f4ng\nAnh say h\u01b0\u01a1ng hoa, y\u00eau nh\u00e0nh hu\u1ec7 tr\u1eafng\nCh\u1ec9 l\u00e0 hoa th\u00f4i sao anh \u201csay n\u1eafng\u201d?\nS\u1eafc v\u00e0 h\u01b0\u01a1ng c\u0169ng b\u00ecnh d\u1ecb \u0111\u1eddi th\u01b0\u1eddng\nC\u00f9ng s\u1edbm chi\u1ec1u tho\u1ea3ng nh\u1eb9 s\u1eafc, h\u01b0\u01a1ng\nAi \u0111\u00e2u bi\u1ebft s\u1eafc, h\u01b0\u01a1ng v\u1eabn v\u01b0\u01a1ng n\u1ed7i nh\u1edb\nCh\u00e1y l\u00f2ng anh, m\u1ed9t g\u00e3 si t\u00ecnh\nAnh lang thang qua v\u00f9ng c\u00f3 v\u00e0 kh\u00f4ng\n\u0110\u1ec3 b\u1ea5t ch\u1ee3t g\u1eb7p h\u1eb9n h\u00f2 n\u0103m c\u0169\nEm nh\u00ecn anh ch\u01b0a bao gi\u1edd l\u1ea1\n\u00d4i \u0111\u1eb1m chi\u00eau xuy\u00ean th\u1ea5u tr\u00e1i tim n\u00e0y\nThi\u00ean \u0111\u01b0\u1eddng anh b\u00e0y s\u1eb5n trong tim \u0111\u00e2y\nCh\u1edd em \u0111\u1ebfn, v\u1ec1 v\u1edbi anh hu\u1ec7 nh\u00e9.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Anh n\u00e2ng niu \u0111\u1eb7t em v\u00e0o b\u00ecnh pha-l\u00ea\" v\u00e0 \"Say s\u01b0a ng\u1eafm em, t\u1ecfa h\u01b0\u01a1ng khoe s\u1eafc\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Ch\u1edd em \u0111\u1ebfn, v\u1ec1 v\u1edbi anh hu\u1ec7 nh\u00e9.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "cam-on-tinh-yeu",
    title: "C\u1ea3m \u01a0n T\u00ecnh Y\u00eau",
    tag: "Th\u01a1 chi\u00eam nghi\u1ec7m",
    summary: "Ng\u1ee1 ch\u1ebft r\u1ed3i t\u00ecnh y\u00eau ch\u00e1y b\u1ecfng Tu\u1ed5i b\u1ed1n m\u01b0\u01a1i qua n\u1eeda \u0111\u1eddi ng\u01b0\u1eddi",
    author: "L\u00ea D\u0169ng",
    locationDate: "",
    cardImage: resolvePoemImageByTitle("C\u1ea3m \u01a0n T\u00ecnh Y\u00eau"),
    heroImage: resolvePoemImageByTitle("C\u1ea3m \u01a0n T\u00ecnh Y\u00eau"),
    audioUrl: "/audio/Cam-on tinh yeu.m4a",
    hasAudio: true,
    content: "Ng\u1ee1 ch\u1ebft r\u1ed3i t\u00ecnh y\u00eau ch\u00e1y b\u1ecfng\nTu\u1ed5i b\u1ed1n m\u01b0\u01a1i qua n\u1eeda \u0111\u1eddi ng\u01b0\u1eddi\nThui th\u1ee7i b\u01b0\u1edbc d\u1ecdc \u0111\u01b0\u1eddng gi\u00f3 b\u1ee5i\nC\u1ed9i c\u00fac gi\u00e0 b\u1ed7ng n\u1edf \u0111\u00f3a v\u00e0ng t\u01b0\u01a1i\nAnh \u0111em m\u00f9a xu\u00e2n \u0111\u1ebfn b\u00ean em\nX\u1edbi tung th\u1ea3m l\u1eb7ng n\u1ea5p b\u00ean th\u1ec1m\nMang n\u1eafng \u1ea5m s\u01b0\u1edfi h\u1ed3n hoang l\u1ea1nh\nN\u1ee5 h\u00f4n d\u00e0i th\u00f4i th\u00fac h\u1ed3n xu\u00e2n\nCho m\u00f4i h\u1ed3ng r\u1ea1ng r\u1ee1 n\u1ee5 c\u01b0\u1eddi t\u01b0\u01a1i\n\u0110\u1ec3 m\u1eaft bi\u1ebfc s\u00f3ng t\u00ecnh d\u1ed3n d\u00e3\n\u0110\u1ebfn b\u00e2y gi\u1edd em m\u1edbi hi\u1ec3u ra\nT\u00ecnh y\u00eau \u0111\u00e2u xa l\u01a1 xa l\u1eafc\nM\u1ed9t ch\u00fat ki\u1ec3u k\u1ef3 hoa d\u1ea1i h\u00e9o h\u1eaft\nM\u1ed9t ch\u00fat \u201cd\u1ed7i\u201d th\u00f4i h\u1ea1nh ph\u00fac \u0111\u00e2m ch\u1ed3i\nHai n\u1eeda g\u1eb7p nhau \u0111\u01a1m \u0111\u1ea7y h\u01b0\u01a1ng hoa l\u1ea1\nKh\u00f4ng t\u00ecnh y\u00eau \u0111\u1eddi nh\u1ea1t nh\u1ebdo \u0111\u01a1n c\u00f4i.\n\n12/6/1999",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Ng\u1ee1 ch\u1ebft r\u1ed3i t\u00ecnh y\u00eau ch\u00e1y b\u1ecfng\" v\u00e0 \"Tu\u1ed5i b\u1ed1n m\u01b0\u01a1i qua n\u1eeda \u0111\u1eddi ng\u01b0\u1eddi\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "12/6/1999",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "mot-thoang",
    title: "M\u1ed9t Tho\u00e1ng",
    tag: "Th\u01a1 k\u00fd \u1ee9c",
    summary: "M\u1ed9t ph\u00fat th\u00f4i l\u00e0m c\u1ea3 \u0111\u1eddi v\u01b0\u01a1ng v\u1ea5n B\u1eaft g\u1eb7p em c\u01b0\u1eddi... \u00d4i \u0111\u00f4i m\u1eaft lung linh",
    author: "L\u00ea D\u0169ng",
    locationDate: "",
    cardImage: resolvePoemImageByTitle("M\u1ed9t Tho\u00e1ng"),
    heroImage: resolvePoemImageByTitle("M\u1ed9t Tho\u00e1ng"),
    audioUrl: "/audio/Mot-thoang.m4a",
    hasAudio: true,
    content: "M\u1ed9t ph\u00fat th\u00f4i l\u00e0m c\u1ea3 \u0111\u1eddi v\u01b0\u01a1ng v\u1ea5n\nB\u1eaft g\u1eb7p em c\u01b0\u1eddi... \u00d4i \u0111\u00f4i m\u1eaft lung linh\nR\u0103ng kh\u1ec3nh kia l\u00e0m r\u1ec9 m\u00e1u tim m\u00ecnh\nBao \u0111\u00eam th\u1ee9c v\u00e0 c\u1ea3 \u0111\u1eddi tr\u0103n tr\u1edf\nAnh \u0111i t\u00ecm em... C\u1ea3 m\u1ed9t tr\u1eddi th\u01b0\u01a1ng nh\u1edb\nV\u00f4 v\u1ecdng h\u00e3o huy\u1ec1n v\u1eabn m\u00e3i g\u1eafng \u0111i t\u00ecm\nEm c\u00f3 trong \u0111\u1eddi? L\u00e0 ch\u1eafc ch\u1eafn c\u00f3 trong tim\nD\u1eabu em c\u00f3 c\u00f2n... hay h\u00ecnh nh\u01b0 em \u0111\u00e3...\nAnh v\u1eabn t\u00ecm em, nh\u01b0 anh t\u1eebng \u0111\u00e3\nL\u1ea7n d\u1ea5u nh\u00e2n gian... L\u1ea7n theo c\u1ea3 cu\u1ed9c \u0111\u1eddi.\n\n4/9/2018",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"M\u1ed9t ph\u00fat th\u00f4i l\u00e0m c\u1ea3 \u0111\u1eddi v\u01b0\u01a1ng v\u1ea5n\" v\u00e0 \"B\u1eaft g\u1eb7p em c\u01b0\u1eddi... \u00d4i \u0111\u00f4i m\u1eaft lung linh\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "4/9/2018",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "hoa-buom",
    title: "Hoa B\u01b0\u1edbm",
    tag: "Th\u01a1 t\u00ecnh",
    summary: "M\u1ed9t \u0111\u00f3a hoa: V\u00e0o \u0111\u1ed9 m\u00e3n khai Ch\u1ec9 ng\u1eafm th\u00f4i, \u0111\u00e3 th\u1ed5n th\u1ee9c \u0111\u00eam d\u00e0i",
    author: "L\u00ea D\u0169ng",
    locationDate: "M\u1ef9 Tho, ng\u00e0y 8/10/19",
    cardImage: resolvePoemImageByTitle("Hoa B\u01b0\u1edbm"),
    heroImage: resolvePoemImageByTitle("Hoa B\u01b0\u1edbm"),
    audioUrl: "/audio/Hoa-buom.m4a",
    hasAudio: true,
    content: "M\u1ed9t \u0111\u00f3a hoa: V\u00e0o \u0111\u1ed9 m\u00e3n khai\nCh\u1ec9 ng\u1eafm th\u00f4i, \u0111\u00e3 th\u1ed5n th\u1ee9c \u0111\u00eam d\u00e0i\nEm ... c\u1ea3 tr\u1eddi m\u1ed9ng m\u1ecb\nAnh kh\u00f4ng c\u00f2n g\u00ec, ngo\u00e0i k\u1ebb t\u00ecnh si\nC\u00e1nh b\u01b0\u1edbm d\u1eebng bay, l\u1ee5y \u0111\u00f3a hoa xinh\nHoa \u01a1i, b\u01b0\u1edbm \u0111\u00e2u l\u00e0 k\u1ebb \u0111a t\u00ecnh\nB\u01b0\u1edbm \u0111\u00e3 t\u00ecm hoa gi\u1eefa ng\u00e0n c\u00e1nh gi\u00f3\nX\u00f4 \u0111\u1ea9y, d\u1eadp v\u00f9i b\u01b0\u1edbm m\u1ecfi g\u1ed1i, ch\u1ed3n ch\u00e2n\n\u0110\u1ec3 b\u00e2y gi\u1edd hoa r\u1ef1c s\u1eafc m\u00f9a xu\u00e2n\n\u0110\u1ec3 b\u00e2y gi\u1edd b\u01b0\u1edbm l\u01b0\u1ee3n say t\u00ecnh y\u00eau v\u0169 kh\u00fac\nEm \u01a1i h\u00e3y c\u01b0\u1eddi cho hoa khoe ngh\u00ecn s\u1eafc\nCho k\u1ebb si t\u00ecnh ch\u1ebft gi\u1eefa h\u1ed3 thu.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"M\u1ed9t \u0111\u00f3a hoa: V\u00e0o \u0111\u1ed9 m\u00e3n khai\" v\u00e0 \"Ch\u1ec9 ng\u1eafm th\u00f4i, \u0111\u00e3 th\u1ed5n th\u1ee9c \u0111\u00eam d\u00e0i\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Cho k\u1ebb si t\u00ecnh ch\u1ebft gi\u1eefa h\u1ed3 thu.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "hue-trang",
    title: "Hu\u1ec7 Tr\u1eafng",
    tag: "Th\u01a1 ho\u00e0i ni\u1ec7m",
    summary: "Anh \u0111i t\u00ecm em lo\u00e0i hoa hu\u1ec7 tr\u1eafng Tho\u1ea3ng h\u01b0\u01a1ng th\u00f4i m\u00e0 n\u1ed3ng \u1ea5m l\u1ea1 k\u1ef3",
    author: "L\u00ea D\u0169ng",
    locationDate: "M\u1ef9 Tho, ng\u00e0y 8/8 (kh\u00f4ng r\u00f5 n\u0103m)",
    cardImage: resolvePoemImageByTitle("Hu\u1ec7 Tr\u1eafng"),
    heroImage: resolvePoemImageByTitle("Hu\u1ec7 Tr\u1eafng"),
    audioUrl: "/audio/Hue-trang.m4a",
    hasAudio: true,
    content: "Anh \u0111i t\u00ecm em lo\u00e0i hoa hu\u1ec7 tr\u1eafng\nTho\u1ea3ng h\u01b0\u01a1ng th\u00f4i m\u00e0 n\u1ed3ng \u1ea5m l\u1ea1 k\u1ef3\nH\u01a1n ba m\u01b0\u01a1i n\u0103m r\u1ed3i, gi\u1eefa cu\u1ed9c chia ly\nL\u00f2ng t\u01a1 t\u01b0\u1edfng, th\u01b0\u01a1ng th\u01b0\u01a1ng, nh\u1edb nh\u1edb\n\u0110\u1eddi v\u00f4 th\u01b0\u1eddng ai m\u00e0 bi\u1ebft tr\u01b0\u1edbc\nCh\u1ec9 \u0111\u1ecbnh ninh: V\u00ec y\u00eau l\u1eafm \u0111\u00f3 m\u00e0\nN\u00e0o bi\u1ebft \u0111\u00e2u khi t\u00ecnh \u0111\u00e3 \u0111i xa\nMu\u1ed1n ngo\u00e1i l\u1ea1i, ng\u0103n ng\u1eafn, v\u1ea1n c\u00e1ch\nTh\u00f4i em c\u1ed1 cho anh v\u00e0i kh\u1eafc\nN\u00f3i h\u1ebft l\u00f2ng anh: Em nh\u1eadn - ch\u1ed1i t\u1eeb\nC\u0169ng \u0111\u00e0nh th\u00f4i, b\u1edfi ph\u1eadn ph\u01b0\u1edbc k\u00e9m tu\nDuy\u00ean v\u1edbi s\u1ed1, \u0111\u00e0nh m\u1ed9t \u0111\u1eddi dang d\u1edf\n\u00c9n b\u1eafc, nh\u1ea1n nam chi\u1ec1u thu \u1ee7 r\u0169\nTh\u01b0\u01a1ng ng\u01b0\u1eddi x\u01b0a, nh\u1edb h\u01b0\u01a1ng hu\u1ec7 tr\u1eafng, b\u1ea1c \u0111\u1ea7u.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Anh \u0111i t\u00ecm em lo\u00e0i hoa hu\u1ec7 tr\u1eafng\" v\u00e0 \"Tho\u1ea3ng h\u01b0\u01a1ng th\u00f4i m\u00e0 n\u1ed3ng \u1ea5m l\u1ea1 k\u1ef3\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Th\u01b0\u01a1ng ng\u01b0\u1eddi x\u01b0a, nh\u1edb h\u01b0\u01a1ng hu\u1ec7 tr\u1eafng, b\u1ea1c \u0111\u1ea7u.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "qua-mien-thuong-nho",
    title: "Qua Mi\u1ec1n Th\u01b0\u01a1ng Nh\u1edb",
    tag: "Th\u01a1 k\u00fd \u1ee9c",
    summary: "Gi\u00f3 xu\u00e2n d\u1ecbu d\u00e0ng mang \u0111i Nh\u1eefng \u0111i\u1ec1u anh ch\u01b0a th\u1ec3 n\u00f3i",
    author: "L\u00ea D\u0169ng",
    locationDate: "Kh\u00f4ng r\u00f5 ng\u00e0y th\u00e1ng",
    cardImage: resolvePoemImageByTitle("Qua Mi\u1ec1n Th\u01b0\u01a1ng Nh\u1edb"),
    heroImage: resolvePoemImageByTitle("Qua Mi\u1ec1n Th\u01b0\u01a1ng Nh\u1edb"),
    audioUrl: "/audio/Qua-mien-thuong-nho.m4a",
    hasAudio: true,
    content: "Gi\u00f3 xu\u00e2n d\u1ecbu d\u00e0ng mang \u0111i\nNh\u1eefng \u0111i\u1ec1u anh ch\u01b0a th\u1ec3 n\u00f3i\nHoa c\u00fac v\u1ea5n v\u01b0\u01a1ng th\u00e1ng Gi\u00eang\nMai v\u00e0ng, l\u00e1 xanh l\u1ed9c bi\u1ebfc\nHu\u1ec7 tr\u1eafng cho d\u1ea1 b\u00ecnh y\u00ean\nT\u00ecnh anh nh\u01b0 x\u01b0a: D\u1ecbu d\u00e0ng\nGi\u00f3 mang xu\u00e2n v\u1ec1 ph\u00eda em\nMang l\u1eddi t\u1ecf t\u00ecnh anh g\u1eedi\nTu\u1ed5i hai m\u01b0\u01a1i gi\u0103ng \u0111\u01b0\u1eddng thu\u1edf \u0111\u00f3\nT\u00e0 \u00e1o em bay, nghi\u00eang ng\u1ea3 h\u1ed3n anh\nTu\u1ed5i xanh \u0111i qua, t\u00e0 \u00e1o bay ho\u00e0i th\u01b0\u01a1ng nh\u1edb\nEm ch\u1eb3ng khi n\u00e0o qu\u00ean \u00e1nh m\u1eaft anh\nAnh kh\u00f4ng th\u1ec3 qu\u00ean chi\u1ebfc r\u0103ng kh\u1ec3nh \u1ea5y\nAnh kh\u00f4ng th\u1ec3 qu\u00ean su\u1ed1i t\u00f3c b\u1ed3ng b\u1ec1nh\nEm \u01a1i h\u00e3y nghe ti\u1ebfng y\u00eau trong gi\u00f3\nQua mi\u1ec1n th\u01b0\u01a1ng nh\u1edb, c\u1ecf d\u1ea1i sao c\u1ee9 qu\u1ea5n.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Gi\u00f3 xu\u00e2n d\u1ecbu d\u00e0ng mang \u0111i\" v\u00e0 \"Nh\u1eefng \u0111i\u1ec1u anh ch\u01b0a th\u1ec3 n\u00f3i\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Qua mi\u1ec1n th\u01b0\u01a1ng nh\u1edb, c\u1ecf d\u1ea1i sao c\u1ee9 qu\u1ea5n.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "chi-can-co-vay",
    title: "Ch\u1ec9 C\u1ea7n C\u00f3 V\u1eady",
    tag: "Th\u01a1 t\u00ecnh",
    summary: "Anh th\u01b0\u01a1ng em nhi\u1ec1u l\u1eafm bi\u1ebft h\u00f4ng N\u00ean kh\u00f4ng th\u1ec3 th\u1ea3 bu\u00f4ng ra \u0111\u01b0\u1ee3c",
    author: "L\u00ea D\u0169ng",
    locationDate: "M\u1ef9 Tho, \u0111\u00eam 7/01/2019",
    cardImage: resolvePoemImageByTitle("Ch\u1ec9 C\u1ea7n C\u00f3 V\u1eady"),
    heroImage: resolvePoemImageByTitle("Ch\u1ec9 C\u1ea7n C\u00f3 V\u1eady"),
    audioUrl: "/audio/Chi-can-co-vay.m4a",
    hasAudio: true,
    content: "Anh th\u01b0\u01a1ng em nhi\u1ec1u l\u1eafm bi\u1ebft h\u00f4ng\nN\u00ean kh\u00f4ng th\u1ec3 th\u1ea3 bu\u00f4ng ra \u0111\u01b0\u1ee3c\nAnh bi\u1ebft bao kh\u00f3 kh\u0103n \u0111ang ch\u1edd ph\u00eda tr\u01b0\u1edbc\nS\u1ee3 chi em, d\u1eabu ch\u1ebft c\u0169ng vui l\u00f2ng\nB\u1edfi khi y\u00eau l\u00e0 d\u00e1m \u0111\u1ebfn v\u1edbi t\u1eadn c\u00f9ng\nN\u00ean m\u1edbi c\u00f3 tr\u0103m thi\u00ean t\u00ecnh s\u1eed\nAnh ch\u1ec9 mong, tr\u00f2n v\u00f2ng tay \u1ea5p \u1ee7\nCho t\u00ecnh y\u00eau th\u1eadt s\u1ef1 th\u0103ng hoa\nR\u1ed3i ng\u00e0y kia c\u00f3 v\u1ec1 c\u00f5i ta b\u00e0\nC\u0169ng th\u1ecfa nguy\u1ec7n: \u0110\u01b0\u1ee3c em y\u00eau, ch\u1ebft c\u01b0\u1eddi h\u1ea1nh ph\u00fac\nCu\u1ed9c s\u1ed1ng cho anh \u0111\u1ee7 \u0111\u1ea7y vinh nh\u1ee5c\nH\u00e0o quang, kh\u1ed1n kh\u00f3, xu\u1ed1ng ng\u1ef1a, l\u00ean xe\nM\u1ea5t d\u1ea7n \u0111i, gi\u00f3 cu\u1ed1n b\u1edd tre\nCh\u1ec9 c\u00f2n l\u1ea1i tr\u00e1i tim nh\u00e2n h\u1eadu\nCh\u1ec9 c\u00f2n l\u1ea1i t\u00ecnh qua y\u00eau b\u1eadu\nT\u1ea5m l\u00f2ng son b\u1ea7u m\u1edf r\u1ed9ng ch\u1edd qua\nH\u01b0\u01a1ng hoa th\u01a1m s\u01b0\u1edfi \u1ea5m l\u00f2ng ta\nCh\u1ec9 c\u1ea7n c\u00f3 v\u1eady, t\u00ecnh xa m\u00e0 g\u1ea7n.",
    status: "published",
    analysis: {
      emotionFlow: "M\u1ea1ch c\u1ea3m x\u00fac m\u1edf ra t\u1eeb nh\u1eefng chi ti\u1ebft \u0111\u1eddi th\u01b0\u1eddng, r\u1ed3i l\u1eafng s\u00e2u trong m\u1ed9t n\u1ed7i ni\u1ec1m b\u1ec1n b\u1ec9.",
      standoutImages: "Hai c\u00e2u \"Anh th\u01b0\u01a1ng em nhi\u1ec1u l\u1eafm bi\u1ebft h\u00f4ng\" v\u00e0 \"N\u00ean kh\u00f4ng th\u1ec3 th\u1ea3 bu\u00f4ng ra \u0111\u01b0\u1ee3c\" t\u1ea1o l\u1edbp h\u00ecnh \u1ea3nh gi\u00e0u d\u01b0 \u00e2m cho to\u00e0n b\u00e0i.",
      meaning: "B\u00e0i th\u01a1 g\u1ee3i c\u1ea3m gi\u00e1c ch\u1eadm, \u1ea5m v\u00e0 m\u1ed9c; \u0111\u1ec3 ng\u01b0\u1eddi \u0111\u1ecdc t\u00ecm th\u1ea5y m\u1ed9t kho\u1ea3ng y\u00ean trong ch\u00ednh m\u00ecnh.",
      memorableLine: "Ch\u1ec9 c\u1ea7n c\u00f3 v\u1eady, t\u00ecnh xa m\u00e0 g\u1ea7n.",
    },
    imageResearch: {
      moodKeywords: ["th\u01a1", "chi\u1ec1u qu\u00ea", "s\u00f4ng n\u01b0\u1edbc", "h\u1ed3n Vi\u1ec7t"],
      referenceLinks: [],
      recommendedScene: "Khung c\u1ea3nh qu\u00ea nh\u1eb9 nh\u00e0ng v\u1edbi t\u00f4ng m\u00e0u \u1ea5m, ph\u00f9 h\u1ee3p tinh th\u1ea7n H\u1ed3n Th\u01a1.",
      licenseNote: "\u1ea2nh local c\u00f3 s\u1eb5n trong project, \u01b0u ti\u00ean d\u00f9ng tr\u1ef1c ti\u1ebfp cho n\u1ed9i dung \u0111\u00e3 xu\u1ea5t b\u1ea3n.",
    },
  },
{
    slug: "khoang-cach-vo-hinh",
    title: "Khoảng cách vô hình",
    tag: "Thơ tình",
    summary: "Nỗi nhớ dài theo một mối tình xa, nơi niềm tin được giữ lại giữa nhiều vết đau âm thầm.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 23/9/2018",
    cardImage: resolvePoemImageByTitle("Khoảng cách vô hình"),
    heroImage: resolvePoemImageByTitle("Khoảng cách vô hình"),
    audioUrl: "/audio/Khoang-cach-vo-hinh.m4a",
    hasAudio: true,
    content: "Nước mắt rơi vì đâu lên nỗi nhớ\nYêu thương nhiều nên hằn lại nỗi đau\nLúc mất nhau, biền biệt tâm hao\nTa vật vờ trong thương, trong nhớ\n\nRồi đến lúc “châu về hiệp phố”\nNgạch cửa cuộc đời chẳng thể bước qua\nBậu ơi! Qua không là người quen thói trăng hoa\nQua tim Bậu phải đâu mê tình ái\n\nVì nhớ mãi tình yêu thời thơ dại\nMột bóng hình, hương sắc một loài hoa\nChỉ mong sao Bậu hiểu tình Qua\nBiết có kẻ yêu xa vì Bậu\n\nBậu ơi!\nQua yêu Bậu, yêu nhiều đến nỗi\nViết bài thơ, chính Bậu nàng thơ\nLúc đêm về không còn thấy bơ vơ\nLòng ấm lại bởi một lời an ủi\n\nQua tin vào số duyên may rủi\nMặc cho đời sóng gió đẩy đưa\nNước mắt rơi không phải để tiễn đưa\nMà vì bởi có niềm tin vững chắc\n\nHi vọng lắm và tin đời không phụ bạc\nCũng như Bậu không nỡ lòng...\n... bỏ mặc, quên Qua.",
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đi từ day dứt chia xa sang một niềm tin bền bỉ vào duyên phận và sự chờ đợi.",
      standoutImages: "Nước mắt, ngạch cửa cuộc đời và hình bóng người thương tạo nên không gian vừa gần vừa xa.",
      meaning: "Khoảng cách ở đây không chỉ là địa lý, mà là thử thách của lòng chung thủy và sức bền cảm xúc.",
      memorableLine: "Nước mắt rơi vì đâu lên nỗi nhớ",
    },
    imageResearch: {
      moodKeywords: ["mưa đêm", "xa cách", "cửa sổ mờ nước", "cánh hoa rơi"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=m%C6%B0a%20%C4%91%C3%AAm%20xa%20c%C3%A1ch%20c%E1%BB%ADa%20s%E1%BB%95%20m%E1%BB%9D%20n%C6%B0%E1%BB%9Bc%20c%C3%A1nh%20hoa%20r%C6%A1i", "https://unsplash.com/s/photos/m%C6%B0a%20%C4%91%C3%AAm"],
      recommendedScene: "Khung cửa mưa chiều, ánh đèn vàng nhẹ và một khoảng tối đủ sâu để gợi nỗi nhớ.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "hoa-luc-binh",
    title: "Hoa lục bình",
    tag: "Thơ quê hương",
    summary: "Hình ảnh lục bình tím gợi một mối tình lênh đênh nhưng vẫn giữ được sự thủy chung và trong sáng.",
    author: "Lê Dũng",
    locationDate: "Tân Phong, ngày 12/12/2018",
    cardImage: resolvePoemImageByTitle("Hoa lục bình"),
    heroImage: resolvePoemImageByTitle("Hoa lục bình"),
    audioUrl: "/audio/Hoa-luc-binh.m4a",
    hasAudio: true,
    content: "Đầu sông nước lớn, anh gặp em\nCuối sông, nước ròng ta mình gặp lại\nCon sông tưởng dài ai ngờ ngắn vậy\nEm lênh đênh không bến đỗ cho mình\n\nEm gửi tình qua mắt phượng lung linh\nTím chờ đợi, thủy chung bền chặt\nDẫu con nước đầy vơi, chiều xuôi, sáng ngược\nMang em đi, sông nước xoay vòng\n\nEm vẫn giữ lòng tấc dạ sáng trong\nĐể cho anh ngẩn ngơ ngẩn nỗi nhớ\nMỗi bận sang sông lục bình tím ngát\nTím tình yêu, tím cả sự ước mong\n\nBài thơ tình dẫu đã viết xong\nVẫn nhớ mãi hoa lục bình tim tím.",
    status: "published",
    analysis: {
      emotionFlow: "Cảm xúc trôi theo con nước, lúc gặp gỡ lúc xa nhau, nhưng vẫn bền chặt ở chiều sâu nội tâm.",
      standoutImages: "Sắc tím lục bình, dòng sông xuôi ngược và ánh mắt đợi chờ là những điểm chạm nổi bật.",
      meaning: "Bài thơ ví tình yêu như lục bình: mong manh trước dòng đời nhưng không mất đi bản sắc.",
      memorableLine: "Vẫn nhớ mãi hoa lục bình tim tím.",
    },
    imageResearch: {
      moodKeywords: ["lục bình tím", "sông nước miền Tây", "chiều buông", "thuyền nhỏ trên sông"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=l%E1%BB%A5c%20b%C3%ACnh%20t%C3%ADm%20s%C3%B4ng%20n%C6%B0%E1%BB%9Bc%20mi%E1%BB%81n%20T%C3%A2y%20chi%E1%BB%81u%20bu%C3%B4ng%20thuy%E1%BB%81n%20nh%E1%BB%8F%20tr%C3%AAn%20s%C3%B4ng", "https://unsplash.com/s/photos/l%E1%BB%A5c%20b%C3%ACnh%20t%C3%ADm"],
      recommendedScene: "Dòng sông chiều có cụm lục bình tím trôi nhẹ, ánh nắng cuối ngày phủ gam nâu ấm.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "em-mua-xuan-ve",
    title: "Em - mùa xuân về",
    tag: "Thơ mùa xuân",
    summary: "Bài thơ chan hòa sắc xuân quê nhà, đan giữa tình yêu đôi lứa và niềm vui thanh bình của đất nước.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 7/10/2019",
    cardImage: resolvePoemImageByTitle("Em - mùa xuân về"),
    heroImage: resolvePoemImageByTitle("Em - mùa xuân về"),
    audioUrl: "/audio/Em-mua-xuan-ve.m4a",
    hasAudio: true,
    content: "Em đã về cùng cánh én chao nghiêng\nMai thướt tha, sắc vàng óng ánh\nRực cháy tình yêu, hoa hồng tròn vành vạnh\nKhóm cúc dậy lên, đời no ấm muôn phần\nVạn thọ vàng, dáng phụ mẫu tri ân\nHuệ trắng đượm hương, dẫn lối về thương nhớ\nLộc biếc, chồi non, tràn trề nhựa sống\nCỏ cây xanh, vàng hoa trải chân trời\nEm yêu về, đâu chỉ có hoa thôi\nCòn tiếng chim gù gọi bạn\nTrao trảo kêu bầy, chuồi bồi vàng chín tới\nÁo dệt thêm hoa, mang đẹp đến cho đời\nMỗi gương mặt người ngời sáng nụ cười tươi\nĐất nước bình yên lòng người an yên thế!\nNhìn thật sâu đôi mắt huyền lung liếng\nRạng ngời lên xao xuyến lòng người\n\nEm là em: Hồng, Lan, Mai, Huệ, Cúc\nMang đến cho anh những háo hức rất đời\nEm là em: Xuân của đất trời\nEm về đến làng quê vui mở hội\nMột năm thôi mà rất nhiều thay đổi\nBình dị đơn sơ, sao khách ngẩn ngơ lòng?\nĐiện giăng dây như khuôn nhạc kể đồng\nNgười người hát khúc ca mừng mùa xuân đến\nĐời thanh bình, nhà nhà no ấm\nHạnh phúc trong tay, đâu phải đi tìm\nEm yêu ơi, nắm chặt tay anh\nVề nhà văn hóa đón giao thừa trẩy hội\nDành phút tâm linh, bái Phật thiền môn\nCầu cho quốc thái, dân yên\nCầu đất nước nhà nhà phồn thịnh\nEm của anh, đóa hoa xuân đã nở\nCài tim anh, rạng rỡ một đời\nĐón em về, đón cả đất trời\nĐón đất nước với mùa xuân đẹp lạ.",
    status: "published",
    analysis: {
      emotionFlow: "Mạch thơ mở ra rộn ràng, tươi sáng, rồi lắng lại ở tình yêu và lời cầu mong bình an.",
      standoutImages: "Cánh én, mai vàng, hoa cúc, tiếng chim và không khí hội làng tạo nên bức tranh xuân đầy sức sống.",
      meaning: "Mùa xuân trong bài thơ là biểu tượng của đoàn tụ, yêu thương và niềm tin vào một năm mới tốt lành.",
      memorableLine: "Em là em: Xuân của đất trời",
    },
    imageResearch: {
      moodKeywords: ["mùa xuân quê nhà", "hoa nở", "nắng mới", "không khí Tết nhẹ"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=m%C3%B9a%20xu%C3%A2n%20qu%C3%AA%20nh%C3%A0%20hoa%20n%E1%BB%9F%20n%E1%BA%AFng%20m%E1%BB%9Bi%20kh%C3%B4ng%20kh%C3%AD%20T%E1%BA%BFt%20nh%E1%BA%B9", "https://unsplash.com/s/photos/m%C3%B9a%20xu%C3%A2n%20qu%C3%AA%20nh%C3%A0"],
      recommendedScene: "Con đường làng sáng nắng sớm, hoa nở rải ven đường và không khí hội xuân bình dị.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "em-trong-anh",
    title: "Em trong anh",
    tag: "Thơ tình",
    summary: "Một bản tình thơ nồng nàn, nơi người thương hiện lên như hương sắc không thể tách rời trong tim.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 21/8/2019",
    cardImage: resolvePoemImageByTitle("Em trong anh"),
    heroImage: resolvePoemImageByTitle("Em trong anh"),
    audioUrl: "/audio/Em-trong-anh.m4a",
    hasAudio: true,
    content: "Em hiện hiện trong anh như đóa hoa\nHương sắc ngát ngây khi nhìn ngắm\nThầm nhớ nhung trong giấc ngủ đêm dài\nAnh khát thèm em trong mơ đêm nay\nBao mơ nữa trong những ngày còn lại.\n\nBởi tình yêu ngụt cháy trong lòng\nMơ gặp em trong vòng tay ân ái\nNụ cười yêu đốt cháy môi hồng\nAnh chơi vơi trong mắt em diễm lệ.\n\nEm ngả nghiêng theo khúc hát ru tình\nAnh thấy mình đang ở giữa rừng xanh\nChỉ có em với hoa thơm cùng bướm\nMình hòa vào nhau, không thể tách rời.\n\nTa yêu nhau quên cả đất trời\nĐể vần thơ tình yêu xuất hiện\nCấu vào tim, rưng rức nhớ thương\nNhư sóng xô, dồn lên phía trước.\n\nThúc giục về mau, em tựa cửa chờ\nKhông biết bây giờ là tình hay mơ\nHương thịt da em thơm từng hơi thở\nNgả nghiêng say anh quên tuổi tên mình\nThèm gối đầu lên ngực em ngọt mịn giấc mơ\nThèm hôn em ấm mềm môi rực cháy\nMặc gió mưa, bão tố đầy trời.",
    status: "published",
    analysis: {
      emotionFlow: "Từ nhớ thương đến khát khao gần gũi, cảm xúc được đẩy dần lên bằng nhịp thơ thiết tha.",
      standoutImages: "Đóa hoa, rừng xanh, bướm và giấc mơ đêm tạo lớp hình ảnh mộng và thực giao thoa.",
      meaning: "Bài thơ cho thấy tình yêu như một vùng ký ức sống động, vừa dịu dàng vừa cháy bỏng.",
      memorableLine: "Ta yêu nhau quên cả đất trời",
    },
    imageResearch: {
      moodKeywords: ["hương hoa", "mềm dịu", "gần gũi", "mơ đêm"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=h%C6%B0%C6%A1ng%20hoa%20m%E1%BB%81m%20d%E1%BB%8Bu%20g%E1%BA%A7n%20g%C5%A9i%20m%C6%A1%20%C4%91%C3%AAm", "https://unsplash.com/s/photos/h%C6%B0%C6%A1ng%20hoa"],
      recommendedScene: "Vườn hoa tối nhẹ, ánh đèn vàng mờ và những khoảng tối mềm để gợi chiều sâu cảm xúc.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "anh-yeu-em",
    title: "Anh yêu em",
    tag: "Thơ tình",
    summary: "Lời yêu mộc mạc nhưng quyết liệt, nói về sự gắn bó trọn đời qua những hình ảnh đời thường chân chất.",
    author: "Lê Dũng",
    locationDate: "Tân Phong, ngày 15/12/2018",
    cardImage: resolvePoemImageByTitle("Anh yêu em"),
    heroImage: resolvePoemImageByTitle("Anh yêu em"),
    audioUrl: "/audio/Anh-yeu-em.m4a",
    hasAudio: true,
    content: "Anh yêu em tình yêu tha thiết\nVòng tay ôm vóc ngọc, dáng ngà\nEm thon thả, đường cong mềm mại\nAnh đò theo mê mẩn cả một đời\n\nHương hoa ấy theo anh từ thuở ấy\nHoa chẳng tàn phai, hương chẳng nhạt nhòa\nGiữ em trong tay, lo em là sương khói\nXa em thì nhớ, sợ em buồn mắt ủ, mày chau\nAi có ba-lô ba gang? Bán cho tôi với\nTôi cõng em trên lưng, đi hết cả cuộc đời.",
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ giữ nhịp trực diện, chân thành, đi thẳng vào cảm giác thương nhớ và mong được chở che.",
      standoutImages: "Vòng tay ôm, hương hoa và hình ảnh cõng nhau qua đời tạo dấu ấn mộc mà đậm.",
      meaning: "Tình yêu trong bài thơ không bóng bẩy, mà là lời hứa đồng hành bền bỉ giữa đời thường.",
      memorableLine: "Tôi cõng em trên lưng, đi hết cả cuộc đời.",
    },
    imageResearch: {
      moodKeywords: ["tình yêu chân chất", "thơ tình mộc", "ấm áp", "nhẹ nhàng"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=t%C3%ACnh%20y%C3%AAu%20ch%C3%A2n%20ch%E1%BA%A5t%20th%C6%A1%20t%C3%ACnh%20m%E1%BB%99c%20%E1%BA%A5m%20%C3%A1p%20nh%E1%BA%B9%20nh%C3%A0ng", "https://unsplash.com/s/photos/t%C3%ACnh%20y%C3%AAu%20ch%C3%A2n%20ch%E1%BA%A5t"],
      recommendedScene: "Con đường quê chiều muộn với hai bóng người đi cạnh nhau trong ánh nắng nâu ấm.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "nho",
    title: "Nhớ",
    tag: "Thơ ký ức",
    summary: "Chỉ vài câu ngắn nhưng chạm vào nỗi nhớ sâu, về một mái nhà chung đã từng được mơ tới.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, 01/01/2018",
    cardImage: resolvePoemImageByTitle("Nhớ"),
    heroImage: resolvePoemImageByTitle("Nhớ"),
    audioUrl: "/audio/nho.m4a",
    hasAudio: true,
    content: "Giữa trăm người ta vẫn nhận ra nhau\nMơ có lúc ta về chung nhà sớm tối\nChăm chút cho nhau lúc nhức đầu sổ mũi\nAn ủi nhau lúc buồn vui, hờn dỗi\nVậy thôi mà, vọng hỏi trời cao\nCác cố chi đùa giỡn với nhau\nCho nỗi nhớ đầy lên thành nước mắt.",
    status: "published",
    analysis: {
      emotionFlow: "Nhịp thơ ngắn, dồn nén, chuyển từ mơ ước bình yên sang nghẹn ngào khi thực tại chia cách.",
      standoutImages: "Giữa trăm người, mái nhà chung và nước mắt là những hình ảnh vừa giản dị vừa ám ảnh.",
      meaning: "Bài thơ cho thấy nỗi nhớ bắt đầu từ những điều rất đời thường nhưng để lại dư vị rất lâu.",
      memorableLine: "Cho nỗi nhớ đầy lên thành nước mắt.",
    },
    imageResearch: {
      moodKeywords: ["bến sông chiều", "đường quê mờ nắng", "hoàng hôn miền Tây", "người chờ trong ký ức"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=b%E1%BA%BFn%20s%C3%B4ng%20chi%E1%BB%81u%20%C4%91%C6%B0%E1%BB%9Dng%20qu%C3%AA%20m%E1%BB%9D%20n%E1%BA%AFng%20ho%C3%A0ng%20h%C3%B4n%20mi%E1%BB%81n%20T%C3%A2y%20ng%C6%B0%E1%BB%9Di%20ch%E1%BB%9D%20trong%20k%C3%BD%20%E1%BB%A9c", "https://unsplash.com/s/photos/b%E1%BA%BFn%20s%C3%B4ng%20chi%E1%BB%81u"],
      recommendedScene: "Bến sông chiều vắng, nền trời vàng nhạt và một bóng người đứng lặng nhìn xa.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "tieng-keu-chim-le-ban",
    title: "Tiếng kêu chim lẻ bạn",
    tag: "Thơ đêm",
    summary: "Một tiếng gọi cô độc giữa đêm sông nước, nơi ánh trăng trở thành dấu hiệu để tìm lại nhau.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 16/01/20...",
    cardImage: resolvePoemImageByTitle("Tiếng kêu chim lẻ bạn"),
    heroImage: resolvePoemImageByTitle("Tiếng kêu chim lẻ bạn"),
    audioUrl: "/audio/Tieng-keu-chim-le-ban.m4a",
    hasAudio: true,
    content: "Mỗi phút đi qua, một phút chạnh lòng\nSầu cô độc, buồn chim lẻ bạn\nGiận tạo hóa trêu người trần thế\nLỡ chuyến đò chiều biết tạm nương đâu\nTrở về ư? Đường xa ngái mịt mù\nĐi tiếp ư? Sông ngăn phía trước\nĐêm nay một mình ta chiếc bóng\nNgắm trăng lên, nhìn nước trôi xuôi\nLấy mảnh trăng vắt ở trên vai\nLàm dấu để tìm nhau mình nhé\nÁnh trăng sẽ theo anh bây giờ và kiếp nữa\nKiếp lai sinh dù lạc lối cũng đi tìm\nÁnh trăng ở đâu, mình tìm nhau ở đó\nĐố đừng để như chiều nay, chim lẻ bạn kêu buồn.",
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đậm chất chia ly, gấp gáp giữa ngã rẽ đi - về, rồi neo lại ở lời hẹn kiếp sau.",
      standoutImages: "Trăng, dòng nước trôi xuôi, chiếc bóng đơn và tiếng chim lẻ bạn dựng nên không gian cô tịch.",
      meaning: "Nỗi buồn trong bài không bế tắc, vì vẫn giữ một niềm tin mong gặp lại qua dấu trăng.",
      memorableLine: "Ánh trăng ở đâu, mình tìm nhau ở đó",
    },
    imageResearch: {
      moodKeywords: ["trăng trên sông", "đêm cô tịch", "chim lẻ bóng", "nước trôi và ánh trăng"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=tr%C4%83ng%20tr%C3%AAn%20s%C3%B4ng%20%C4%91%C3%AAm%20c%C3%B4%20t%E1%BB%8Bch%20chim%20l%E1%BA%BB%20b%C3%B3ng%20n%C6%B0%E1%BB%9Bc%20tr%C3%B4i%20v%C3%A0%20%C3%A1nh%20tr%C4%83ng", "https://unsplash.com/s/photos/tr%C4%83ng%20tr%C3%AAn%20s%C3%B4ng"],
      recommendedScene: "Dòng sông đêm ánh bạc, một vệt trăng trên mặt nước và không gian rất tĩnh.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "ngang-ben-song-xua",
    title: "Ngang bến sông xưa",
    tag: "Thơ hoài niệm",
    summary: "Đi ngang bến cũ để đối diện tình dang dở, bài thơ là tiếng gọi nghẹn ngào của một đời tình si.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, chiều mưa 22/6/07",
    cardImage: resolvePoemImageByTitle("Ngang bến sông xưa"),
    heroImage: resolvePoemImageByTitle("Ngang bến sông xưa"),
    audioUrl: "/audio/ngang-ben-song-xua.m4a",
    hasAudio: true,
    content: "Dòng sông trôi hay lục bình trôi\nVề đâu mà thong dong, nhàn nhã\nMiền hạ có chi mà cứ xuôi về?\nCho theo với, còn gần - xa nữa\nỞ nơi này, buồn quá đi thôi\nPhía xa kia, chấp chới cánh chim trời\nĐò đưa khách sang sông chiều lặng lẽ\nMưa giăng giăng, gió xô ngả rặng bần già\nTự hỏi mình: Đừng ngắm dòng sông\nLục bình trôi, mưa giăng, gió giật\nThả theo dòng, nước chảy, gió trôi\nHay về thôi, chiều muộn lắm rồi\nAi chờ đợi, sao ai đi đâu xa biệt\nCúm núm kêu, da diết, bồi hồi\n\nThương một đời chìm nổi, dạt trôi\nThương người cũ mà tình thì không cũ\nNgười già đi tình mãi không già\nBởi yêu người nên yêu lắm loài hoa\nLúc xa cách, nhìn hoa nguôi thương nhớ\nChiều nay về quê, ngang qua dòng sông cũ\nBến nước xưa, giờ mất dạng đâu rồi\nEm ở nơi nao, gần đây hay thiệt xa xôi\nThương lắm em ơi tình yêu dang dở\nTiếng gọi đò ơi... Ngỡ ngẩn\n- Gọi gì?\nThương cho đời một gã tình si\nSao ngây dại đến là tội nghiệp.",
    status: "published",
    analysis: {
      emotionFlow: "Mạch thơ lửng lơ theo con nước, rồi dồn lại thành tiếc nuối khi đứng trước bến xưa đổi khác.",
      standoutImages: "Lục bình trôi, bến đò cũ, mưa giăng và tiếng gọi đò làm nổi rõ nỗi buồn miền sông nước.",
      meaning: "Bài thơ đặt người đọc trước câu hỏi về thời gian: cảnh còn đó nhưng người xưa đã xa.",
      memorableLine: "Thương cho đời một gã tình si",
    },
    imageResearch: {
      moodKeywords: ["bến đò cũ", "sông quê", "lục bình trôi", "buổi chiều cũ miền sông nước"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=b%E1%BA%BFn%20%C4%91%C3%B2%20c%C5%A9%20s%C3%B4ng%20qu%C3%AA%20l%E1%BB%A5c%20b%C3%ACnh%20tr%C3%B4i%20bu%E1%BB%95i%20chi%E1%BB%81u%20c%C5%A9%20mi%E1%BB%81n%20s%C3%B4ng%20n%C6%B0%E1%BB%9Bc", "https://unsplash.com/s/photos/b%E1%BA%BFn%20%C4%91%C3%B2%20c%C5%A9"],
      recommendedScene: "Bến đò cũ dưới mưa nhẹ, gam nâu trầm và một chiếc đò neo lặng ở xa.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
{
    slug: "them",
    title: "Thèm",
    tag: "Thơ đêm",
    summary: "Một bản tình ca đêm trăng với nỗi nhớ càng thêm dày, càng thêm sâu qua từng nhịp thơ.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 12 giờ đêm, 5/3/2020",
    cardImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format\u0026fit=crop\u0026w=1200\u0026q=80",
    heroImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format\u0026fit=crop\u0026w=1600\u0026q=80",
    audioUrl: "/audio/Them.m4a",
    hasAudio: true,
    content: "Thèm nghe con nước vỗ bờ\nBóng bần rơi nhẹ, thẫn thờ dòng sông\nThèm nhìn đom đóm kết vòng\nMột miền sông nước bềnh bồng ngọc châu\nVẳng nghe thánh thót đàn bầu\nMênh mông câu hát, cung sầu cung thương\nNhìn trăng mà nhớ mà thương\nGởi theo con gió lời thương, ngọt ngào\nEm ơi trăng ở trên cao\nTrăng còn hiểu được vì sao anh buồn\nTrăng mang chín nhớ mười thương\nNhuộm má thèm mịn, môi hồng thèm thơm\nThèm gối đầu lên tay em\nXông hương tóc, khát thèm trần dáng\nĐêm nay anh gởi theo trăng\nTám thương, chín nhớ, mười mong cận kề\nTrăng ơi gởi cả lời thề\nMãi thương mãi nhớ, mãi chờ mãi mong.",
    status: "published",
    analysis: {
      emotionFlow: "Cảm xúc đi theo phép cộng của nhớ thương: càng nghe, càng nhìn, càng khao khát gần nhau.",
      standoutImages: "Con nước vỡ bờ, đom đóm, đàn bầu và ánh trăng là chuỗi hình ảnh vừa dân dã vừa mộng mị.",
      meaning: "Bài thơ làm rõ sự bền bỉ của tình yêu: nhớ không giảm theo thời gian mà mỗi lúc một đầy.",
      memorableLine: "Mãi thương mãi nhớ, mãi chờ mãi mong.",
    },
    imageResearch: {
      moodKeywords: ["con nước vỡ bờ", "đom đóm", "đêm trăng", "nỗi nhớ người thương"],
      referenceLinks: ["https://www.pinterest.com/search/pins/?q=con%20n%C6%B0%E1%BB%9Bc%20v%E1%BB%A1%20b%E1%BB%9D%20%C4%91om%20%C4%91%C3%B3m%20%C4%91%C3%AAm%20tr%C4%83ng%20n%E1%BB%97i%20nh%E1%BB%9B%20ng%C6%B0%E1%BB%9Di%20th%C6%B0%C6%A1ng", "https://unsplash.com/s/photos/con%20n%C6%B0%E1%BB%9Bc%20v%E1%BB%A1%20b%E1%BB%9D"],
      recommendedScene: "Đêm sông có đom đóm và ánh trăng non, không gian mở nhưng vẫn giữ nét riêng tư.",
      licenseNote: "Các link Pinterest / mạng xã hội chỉ dùng làm mood reference, chưa phải ảnh production.",
    },
  },
  {
    slug: "ben-song-xua",
    title: "Bến sông xưa",
    tag: "Thơ quê",
    summary: "Sông làm gương để trăng soi — lòng trinh sông trắng thấy hết rồi.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 3/11/2003",
    cardImage: "/images/poems/ben-song-xua.jpeg",
    heroImage: "/images/poems/ben-song-xua.jpeg",
    audioUrl: "/audio/Ben-song-xua.m4a",
    hasAudio: true,
    content:
      "Sông làm gương để trăng soi\nLòng trinh sông trắng thấy hết rồi\nHớt hoảng, buông mành, bận e thẹn\nLiễu xiêu, đỏng đảnh, lục bình trôi\nTịnh tang khúc nhạc lòng ta hát\nChơi vơi, chơi vơi, lòng chơi vơi\nLồng lộng trời cao, lồng lộng gió\nTrôi trôi, hun hút, nước trôi trôi\nTang bồng, hồ thủy lòng rũ sạch\nBến nước xưa, gội mái tóc bạc màu\nSông vẫn dịu dàng vuốt ve ai\nBãi bờ níu kéo gót ai hoài\nLắm người ra chợ quên quê cũ\nCó biết đâu quê chẳng đổi thay\nĐêm nay bầu trời đắm sắc mây\nNghiêng nghiêng hoa nhãn đượm hương đầy\nNgửa mặt nhẹ hôn làn thương ấy\nBến sông xưa, hiểu hết lòng này.\n\nCai Lậy, ngày 3/11/2003",
    status: "published",
    analysis: {
      emotionFlow:
        "Mạch thơ mở bằng hình ảnh sông trăng trong trẻo, lan dần vào hoài niệm quê cũ, kết lại bằng sự trở về nhẹ nhàng và trọn vẹn.",
      standoutImages:
        "Lục bình trôi, mái tóc bạc màu bến nước, hoa nhãn đượm hương — những hình ảnh bình dị mà khắc sâu ký ức làng quê.",
      meaning:
        "Bài thơ gọi về cái thuởa thanh xuân gắn với con sông quê, nơi mà dù xa bao năm, lòng người vẫn được rửa sạch và bình yên.",
      memorableLine: "Bến sông xưa, hiểu hết lòng này.",
    },
    imageResearch: {
      moodKeywords: ["bến sông quê", "trăng soi mặt nước", "lục bình trôi", "hoài cổ miền Tây"],
      referenceLinks: [],
      recommendedScene: "Bến sông quê mùa trăng, lục bình trôi nhẹ, ánh trăng phản chiếu mặt nước lặng.",
      licenseNote: "Ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "dau-can-noi-chi-em",
    title: "Đâu cần nói chi em",
    tag: "Thơ tình",
    summary: "Có một điều không cần nói ra — qua ánh mắt, bao điều mình hiểu hết.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 20/01/2017",
    cardImage: "/images/poems/dau-can-noi-chi-em.jpeg",
    heroImage: "/images/poems/dau-can-noi-chi-em.jpeg",
    audioUrl: "/audio/\u0110au-can-noi-chi-em.m4a",
    hasAudio: true,
    content:
      "Có một điều không cần nói ra\nQua ánh mắt, bao điều mình hiểu hết\nChiều sâu tấm lòng tri kỷ hồng nhan\nMấy mươi năm nào có tính toan\nXem hi sinh làm niềm vui hạnh phúc\nTấm tình này có thể nào quên\nDù cách chia xa mấy đoạn đường\nTình yêu vẫn lớn cùng năm tháng\nTrong trái tim anh, em như một tượng đài\nTình yêu trong đời son sắt không phai.\n\nMỹ Tho, ngày 20/01/2017",
    status: "published",
    analysis: {
      emotionFlow:
        "Bài thơ đi từ sự nhận ra thầm lặng đến lời khẳng định mạnh mẽ về tình yêu bền vững, không cần lời nói để minh chứng.",
      standoutImages:
        "Hình ảnh tượng đài trong trái tim và tình yêu son sắt không phai tạo nên chiều sâu cảm xúc vượt thời gian.",
      meaning:
        "Tình yêu chân thật không cần lời hoa mỹ — ánh mắt và sự hi sinh âm thầm mới là ngôn ngữ của trái tim.",
      memorableLine: "Tình yêu trong đời son sắt không phai.",
    },
    imageResearch: {
      moodKeywords: ["tình yêu lặng thầm", "ánh mắt tri kỷ", "son sắt", "thủy chung"],
      referenceLinks: [],
      recommendedScene: "Ánh mắt nhìn nhau đầy tin tưởng, gam màu ấm và dịu.",
      licenseNote: "Ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "hanh-phuc",
    title: "Hạnh phúc",
    tag: "Thơ chiêm nghiệm",
    summary: "Có một người để cho ta yêu, để thương, để nhớ những trưa chiều.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 9/4/2019",
    cardImage: "/images/poems/hanh-phuc.jpeg",
    heroImage: "/images/poems/hanh-phuc.jpeg",
    audioUrl: "/audio/Hanh-phuc.m4a",
    hasAudio: true,
    content:
      "Có một người để cho ta yêu\nĐể thương, để nhớ những trưa, chiều\nNgười ấy cũng đợi chờ ta tối\nNhững đêm về lòng bớt tịch liêu\nHạnh phúc giản đơn, đâu cần huyền bí\nTrọn vòng tay, ấm một nụ cười\nĐời vô thường, nước chảy, bèo trôi\nÁng mây trắng bay ngang qua cửa\nNíu được rồi đừng có buông xuôi.\n\nMỹ Tho, ngày 9/4/2019",
    status: "published",
    analysis: {
      emotionFlow:
        "Từ sự trân trọng giản đơn đến chiêm nghiệm về vô thường, rồi kết lại bằng lời nhắc nhở giữ chặt hạnh phúc hiện tại.",
      standoutImages:
        "Ảng mây trắng bay qua — hình ảnh vô thường gợi ra ngay lời kêu gọi níu giữ, tạo bước nhảy cảm xúc bất ngờ.",
      meaning:
        "Hạnh phúc không cần vĩ đại — chỉ cần một người đợi, một vòng tay, một nụ cười. Nhưng nó dễ mất nếu ta buông tay.",
      memorableLine: "Níu được rồi đừng có buông xuôi.",
    },
    imageResearch: {
      moodKeywords: ["hạnh phúc giản dị", "vòng tay ấm", "nụ cười", "vô thường"],
      referenceLinks: [],
      recommendedScene: "Khoảnh khắc bình yên đôi lứa, ánh sáng dịu, gam màu ấm.",
      licenseNote: "Ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "mo-tro-ve",
    title: "Mơ trở về",
    tag: "Thơ chiêm nghiệm",
    summary: "Nếu có thần tiên, phép màu, ông Bụt — cho tôi xin một vé trở về.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 8/10/2018",
    cardImage: "/images/poems/mo-tro-ve.jpeg",
    heroImage: "/images/poems/mo-tro-ve.jpeg",
    audioUrl: "/audio/Mo-tro-ve.m4a",
    hasAudio: true,
    content:
      "Nếu có thần tiên, phép màu, ông Bụt\nCho tôi xin một vé trở về\nThuở ấy, ngày xưa tuổi xanh mộng mị\nƯớc mơ hồng, dáng ngọc kiêu sa\nMỗi bước chân đi, chiếu ngọc, kiệu hoa\nQuân tử, thuyền uyên rước đưa, chào đón\nÔi cái thuở thanh xuân, ôi cái lúc chiều tà\nSắc vóc phôi pha, chùn chân mỏi bước\nNhững đêm buồn ngồi đếm ánh sao băng\nNghiên ngẫm câu thơ, nghe tiếng hát Thạch Sùng\nNhịp thời gian trên tường nhà rụng xuống\nTa không nỡ, ta nào đâu có muốn\nThời gian ơi sao cứ đi - về\nMang tuổi xuân bỏ nơi xa lắc ấy\nBiết làm sao, ta muốn quay về\nThần tiên ơi! Bụt ơi con đợi\nNhững đêm dài chẳng thấy tăm hao\nTrên trời cao chỉ có những vì sao\nƯớc mơ trở về bao giờ thành hiện thực.\n\nMỹ Tho, 8/10/2018",
    status: "published",
    analysis: {
      emotionFlow:
        "Từ khát vọng ngây thơ được quay về, qua tiếc nuối tuổi thanh xuân, đến câu hỏi treo lơ lửng giữa trời sao và những vì sao lạnh lẽo.",
      standoutImages:
        "Nhịp thời gian rụng xuống từ tường nhà và những vì sao trên trời cao — hai hình ảnh đối chiếu sự vô vọng và khát vọng.",
      meaning:
        "Ai cũng có một thuở thanh xuân muốn trở về. Nhưng thời gian chỉ tiến, không lùi — và bài thơ nằm lại trong khoảng không giữa ước mơ và thực tại.",
      memorableLine: "Ước mơ trở về bao giờ thành hiện thực.",
    },
    imageResearch: {
      moodKeywords: ["hoài niệm tuổi xuân", "sao băng", "thời gian trôi qua", "mơ về quá khứ"],
      referenceLinks: [],
      recommendedScene: "Đêm trời đầy sao, gam tối sâu, cảm giác cô độc và khát khao.",
      licenseNote: "Ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "nho-lam-ngay-xua",
    title: "Nhớ lắm ngày xưa",
    tag: "Thơ nhớ",
    summary: "Tán phượng già một màu rừng rực đỏ — sân trường kỉ niệm ngày xưa.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 21/11/2018",
    cardImage: "/images/poems/nho-lam-ngay-xua.jpeg",
    heroImage: "/images/poems/nho-lam-ngay-xua.jpeg",
    audioUrl: "/audio/Nho-lam-ngay-xua.m4a",
    hasAudio: true,
    content:
      "Thằng cu nào đem lửa đốt trên cao\nTán phượng già một màu rừng rực đỏ\nAi ngẫu hứng kéo đàn, tấu bài thương nhớ\nRả rích, nỉ non câu hẹn, lời chờ\nTiếng thở ai theo ngọn gió lùa\nNhuộm ánh thu vàng rơi theo sắc lá\nGóc sân trường cùng hàng ghế đá\nGiữ bao điều kỉ niệm mới vào yêu\nDấu chân ai in dưới lớp tần rêu\nNhư níu gọi đông về trên mái tóc\n\nMùa xuân đến, lá non tơ chen chúc\nNhớ lắm sân trường kỉ niệm ngày xưa\nDưới gốc me keo, anh ngóng đợi em về\nKhu nội trú đêm về, trong mơ anh vẫn đợi\nVà như thế suốt đời anh cứ nhớ\nMột lần giữ tay em, còn ấm mãi đến giờ\nThời thanh xuân chỉ biết ước mơ\nLúc hoàng hôn mong gì thỏa nguyện\nXin gởi vào thơ, trải lòng với bao phiền muộn\nEm hiểu lòng anh, hạnh phúc cả đời.\n\nMỹ Tho, 21/11/2018",
    status: "published",
    analysis: {
      emotionFlow:
        "Từ hình ảnh phượng nở rực rỡ của tuổi học trò, dòng cảm xúc chậm dần, lắng lại ở nỗi nhớ dai dẳng và ước mơ giản dị được hiểu.",
      standoutImages:
        "Tán phượng đỏ, ghế đá, dấu chân rêu phủ — những vật chứng của tuổi học trò giữ nguyên sức gợi nhớ.",
      meaning:
        "Một lần giữ tay em trong sân trường — khoảnh khắc nhỏ nhoi nhưng đủ để một đời mang theo.",
      memorableLine: "Một lần giữ tay em, còn ấm mãi đến giờ.",
    },
    imageResearch: {
      moodKeywords: ["sân trường phượng đỏ", "hoài niệm học trò", "mùa hè", "kỉ niệm"],
      referenceLinks: [],
      recommendedScene: "Sân trường mùa phượng nở, ghế đá cũ, ánh chiều nghiêng đổ bóng.",
      licenseNote: "Ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "cho-anh-goi",
    title: "Cho anh gởi",
    tag: "Thơ tình",
    summary: "Em có nghe, tiếng thì thầm trong gió, lời yêu đương những ve vuốt mơn man.",
    author: "Lê Dũng",
    locationDate: "Chiều, 14/02/2020",
    cardImage: "/images/poems/cho-anh-goi.jpeg",
    heroImage: "/images/poems/cho-anh-goi.jpeg",
    audioUrl: "/audio/Cho-anh-goi.m4a",
    hasAudio: true,
    content:
      "Em có nghe, tiếng thì thầm trong gió\nLời yêu đương, những ve vuốt mơn man\nHoa đã nở, bởi nắng vàng đã đủ\nTình đã nồng hương, bồi đắp ủ lâu rồi\nEm nghe không sự run rẩy của môi\nTim thổn thức, mặt dồn lên rạo rực\nNếp vào nhau, đôi ngực trần vô thức\nTrộn vào nhau, hai gương mặt đợi chờ\nTình yêu này gởi trọn vào thơ\nEm hãy giữ, yêu nhiều lắm đó!\n\nChiều, 14/02/2020",
    status: "published",
    analysis: {
      emotionFlow:
        "Bài thơ mở nhẹ nhàng như hơi gió rồi tăng dần nhiệt độ cảm xúc, kết lại bằng một lời trao gửi chân thành và rất mực dịu dàng.",
      standoutImages:
        "Hoa nở trong nắng vàng đủ, môi run rẩy, hai gương mặt đợi chờ — chuỗi hình ảnh bùng cháy từ tự nhiên sang con người.",
      meaning:
        "Tình yêu đến khi chín muồi không cần hô hào — nó tự bộc lộ qua từng run rẩy và hơi thở, rồi được giữ lại bằng thi ca.",
      memorableLine: "Tình yêu này gởi trọn vào thơ.",
    },
    imageResearch: {
      moodKeywords: ["tình yêu nồng nàn", "hoa nở mùa xuân", "run rẩy", "gởi thương"],
      referenceLinks: [],
      recommendedScene: "Chiều Valentine, hoa nở trong nắng, không gian ấm áp và gần gũi.",
      licenseNote: "Ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "ngam",
    title: "Ngẫm",
    tag: "Thơ chiêm nghiệm",
    summary: "Qua ngồi nhìn trời đất mênh mông — tỏ lòng người thương ghét quay vòng.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 4/8/2019",
    cardImage: "/images/poems/ngam.jpeg",
    heroImage: "/images/poems/ngam.jpeg",
    audioUrl: "/audio/Ngam.m4a",
    hasAudio: true,
    content:
      "Qua ngồi nhìn trời đất mênh mông\nTỏ lòng người, thương ghét quay vòng\nTự trong sâu thẳm lời ai nhủ\nGiữ gìn một chữ thủy cùng chung\nĐã hứa bậu ơi, nguyện sẽ giữ\nCả đời thương mãi, cứ vấn vương\nMênh mông trời đất rộng bao la\nMở rộng lòng ra, cõi ta bà\nVậy mà nhiều lúc còn rung chuyển\nNổi giận, hét gầm... cơn phong ba\nEm yêu anh cho hết cả hương hoa\nCho cả niềm tin, yêu thật thà\nVậy mà lắm bận không thèm nói\nGiận chi mà héo liễu, úa hoa\nAnh biết yêu nhiều nên hờn giận\nMỉm cười, hoa nở người yên an.\n\nCai Lậy, ngày 4/8/2019",
    status: "published",
    analysis: {
      emotionFlow:
        "Từ chiêm nghiệm thiên nhiên mênh mông, thu dần vào nội tâm bất ổn, rồi kết lại bằng nụ cười hòa giải nhẹ nhàng.",
      standoutImages:
        "Trời đất mênh mông mở ra không gian rộng, nhưng cơn phong ba nổi giận ở bên trong mới là trung tâm bài thơ.",
      meaning:
        "Yêu nhiều thì dễ giận — nhưng trí tuệ nằm ở chỗ biết mỉm cười để lòng an và hoa lại nở.",
      memorableLine: "Mỉm cười, hoa nở người yên an.",
    },
    imageResearch: {
      moodKeywords: ["chiêm nghiệm", "trời đất mênh mông", "tĩnh lặng nội tâm", "yêu và giận"],
      referenceLinks: [],
      recommendedScene: "Người ngồi nhìn trời rộng, gam xanh lơ trầm, cảm giác suy tư.",
      licenseNote: "Ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "qua-voi-bau",
    title: "Qua với bậu",
    tag: "Thơ tình",
    summary: "Qua với bậu tưởng rằng đã có — vậy rồi mà có có không không.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 16/8/2018",
    cardImage: "/images/poems/qua-voi-bau.jpeg",
    heroImage: "/images/poems/qua-voi-bau.jpeg",
    audioUrl: "/audio/Qua-voi-bau.m4a",
    hasAudio: true,
    content:
      "Qua với bậu tưởng rằng đã có\nVậy rồi mà có có không không\nDẫu rằng bậu đã có chồng\nNhưng qua vẫn cứ giữ lòng như xưa\nNhà ai vách mỏng rào thưa\nCửa phên bỏ khóa, ngõ vừa bước chân\nBậu ơi qua ngơ ngẩn tinh thần\nBởi qua nhìn bậu, nhớ hoài ngày xưa\nNgày xưa dù nắng dù mưa\nNgang qua mặt bậu, mặt qua đỏ bừng\nTrời ơi, hai đứa người dưng\nMà qua nhớ bậu rưng rưng mắt chiều\nQua thương bậu, hỡi bậu yêu\nNhớ thương đứt ruột mỗi chiều gió mưa.\n\nMỹ Tho, ngày 16/8/2018",
    status: "published",
    analysis: {
      emotionFlow:
        "Từ mơ hồ dang dở, bài thơ đi qua tiếc nuối lặng thầm rồi kết lại bằng nỗi nhớ cồn cào không tên không phận.",
      standoutImages:
        "Vách mỏng rào thưa, cửa phên bỏ khóa — không gian gần mà xa, chứa đựng toàn bộ sự dẫm chân giữa hai lòng.",
      meaning:
        "Có những tình đã lỡ không phải vì không yêu mà vì không kịp — và nó ở lại như mặt đỏ bừng mỗi khi gặp lại.",
      memorableLine: "Nhớ thương đứt ruột mỗi chiều gió mưa.",
    },
    imageResearch: {
      moodKeywords: ["tình lỡ", "miền Tây sông nước", "hoài nhớ", "vách thưa mái lá"],
      referenceLinks: [],
      recommendedScene: "Chiều miền Tây, hàng rào thưa, gió mưa nhẹ, gam nâu ấm và buồn.",
      licenseNote: "Ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "nhin-trang",
    title: "Nhìn trăng",
    tag: "Thơ đêm",
    summary: "Qua trải lòng vào thơ theo năm tháng — chỉ cốt mong bậu hiểu thấu lòng nhau.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 24 giờ ngày 12/8/2019",
    cardImage: "/images/poems/nhin-trang.jpeg",
    heroImage: "/images/poems/nhin-trang.jpeg",
    audioUrl: "/audio/Nhin-trang.m4a",
    hasAudio: true,
    content:
      "Qua trải lòng vào thơ theo năm tháng\nChỉ cốt mong bậu hiểu thấu lòng nhau!\nĐêm đêm chưa thể chung nhà, chung giường chiếu\nChung gạo, nhóm lò, thổi lửa, những chiều, trưa\nNhưng đêm nhìn trăng ta chung hướng\nƯớc mơ cuộc đời, chung một lối đi\nQua yêu thiệt lòng chẳng dối lừa chi bậu thấu lòng\nQua, đừng hồ nghi thầm nghĩ... Rưng rức lòng\nQua, bậu khổ, qua buồn đêm nay\nQua nhìn mãi ánh trăng suông\nNăm tám năm trước mẹ qua lâm bồn\nQua chào đời trong ánh trăng rực sáng\nQua nhớ mẹ, thương bậu cho\nQua tấm lòng bao dung, yêu và thua thiệt\nNhững tưởng đêm nay mình vui vầy duyên cá nước...\nQuanh qua chỉ có vầng trăng cao tuốt ở miền xa\nThôi qua xin lấy câu thơ này nói hộ lòng\nQua yêu nhiều lắm... Bậu ơi nhớ đó.\n\nMỹ Tho, 24 giờ ngày 12/8/2019",
    status: "published",
    analysis: {
      emotionFlow:
        "Bài thơ mở bằng lời giãi bày chân thành, đi qua nỗi cô đơn đêm trăng và ký ức về mẹ, kết lại bằng lời yêu thương giản dị mà sâu sắc.",
      standoutImages:
        "Ánh trăng suông và vầng trăng rực sáng lúc chào đời — hai hình ảnh trăng nối ký ức với hiện tại bằng sợi chỉ cảm xúc vô hình.",
      meaning:
        "Yêu là khi cô đơn vẫn nghĩ đến người kia, khi nhớ mẹ lại thương bậu — tình yêu và tình thân hòa quyện trong ánh trăng đêm.",
      memorableLine: "Qua yêu nhiều lắm... Bậu ơi nhớ đó.",
    },
    imageResearch: {
      moodKeywords: ["trăng đêm", "nhớ mẹ", "tình yêu thủy chung", "đêm một mình"],
      referenceLinks: [],
      recommendedScene: "Đêm khuya nhìn trăng một mình, gam xanh lạnh, vầng trăng to và cô tịch.",
      licenseNote: "Ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "mua-hen",
    title: "Mùa hẹn",
    tag: "Thơ quê",
    summary: "Anh vẫn đến vì thương, vì nhớ — cả một trời Chợ Gạo yêu thương.",
    author: "Lê Dũng",
    locationDate: "9/10/2019",
    cardImage: "/images/poems/mua-hen.jpeg",
    heroImage: "/images/poems/mua-hen.jpeg",
    audioUrl: "/audio/Mua-hen.m4a",
    hasAudio: true,
    content:
      "Đường dù xa, gió mưa lất phất\nTrời về đêm, đường vắng thưa người\nAnh vẫn đến vì thương, vì nhớ\nCả một trời Chợ Gạo yêu thương\nCầu Chợ Gạo trải mình như tấm lụa bay\nUốn cong cong một khúc cua dài\nẨn hiện bóng ai, người thôn nữ\nChếnh choáng lòng anh, say đắm say...\nCầu ở tầng cao, sông ở tầng sâu\nNặng hạt phù sa bồi đắp đôi bờ\nÔi! Thương lắm em, dòng sông Chợ Gạo\nCó loài hoa vàng, cánh mỏng mong manh\nThanh long đỏ thắm vào mùa hẹn\nMôi em hồng thơm vị ngọt yêu thương\nĐã xóa đi mưa gió, đêm trường\nChợ Gạo vào mùa, thanh long đỏ...\n... Em đón anh.\n\n9/10/2019",
    status: "published",
    analysis: {
      emotionFlow:
        "Mạch thơ đi từ hành trình vượt xa vì tình, qua cảnh quan Chợ Gạo sông nước, rồi lắng đọng trong hình ảnh người thôn nữ và mùa thanh long đỏ.",
      standoutImages:
        "Cầu Chợ Gạo trải mình như tấm lụa, môi em hồng thơm vị ngọt — hai hình ảnh nối phong cảnh và con người thành một.",
      meaning:
        "Tình yêu khiến người ta bất chấp đường xa mưa gió; quê hương và người thương hiện lên cùng một sắc màu.",
      memorableLine: "Cả một trời Chợ Gạo yêu thương.",
    },
    imageResearch: {
      moodKeywords: ["sông nước miền Tây", "thanh long", "thôn nữ", "tình quê"],
      referenceLinks: [],
      recommendedScene: "Cầu sông, hoa trái vùng đồng bằng, tông ấm chiều quê.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "cho-trong",
    title: "Chờ trông",
    tag: "Thơ tình",
    summary: "Anh trông từng giây mình gặp lại nhau — hoa sẽ nở vàng, hạnh phúc sẽ về thôi.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 16/10/2018",
    cardImage: "/images/poems/cho-trong.jpeg",
    heroImage: "/images/poems/cho-trong.jpeg",
    audioUrl: "/audio/Cho-trong.m4a",
    hasAudio: true,
    content:
      "Anh trông từng giây mình gặp lại nhau\nGió đông đã vụt vù ngang qua trước cửa\nChỉ chờ em gật đầu, thôi đừng lần lữa\nAnh sẽ mang theo hạnh phúc trở về!\nNgồi một mình, đêm dài lắm mỏi mê\nTiếng Thạch Sùng buồn hơn lời than vãn\nTiếng thời gian vỡ vụn, đến nao lòng\nNhư cứa vào tim người đi tìm hạnh phúc\nLời hứa với nhau về mái ấm cho mình\nKhoảng cách không gian, túng thiếu bạc tiền\nĐẩy hai đứa rời xa không mong ngày gặp lại\nƯớc mơ cõng em trên vai, vượt qua nghèo khó\nRu em trong chòi tranh, giấc ngủ yên bình\nEm nép vào lòng anh, nhẹ cười thủ thỉ\nNghèo mà vui, em hạnh phúc lắm rồi\nƯớc mơ mãi chỉ là ước mơ thôi\nCó nhiều đêm thức đếm ánh sao trời\nBao giờ cũng thấy lòng chông chênh lắm\nNhịp đập trái tim chưa lúc nào phẳng lặng,\nAnh yên ư? Phải có được nhau rồi\nGiờ chỉ biết chờ và đợi em thôi\nCái ngạch cửa cuộc đời em bước qua, đi tới\nHoa sẽ nở vàng, hạnh phúc sẽ về thôi.\n\nMỹ Tho, 16/10/2018",
    status: "published",
    analysis: {
      emotionFlow:
        "Bài thơ mở bằng nỗi trông đợi khắc khoải, đi qua những đêm cô đơn và ước mơ giản dị, kết ở niềm tin hạnh phúc rồi sẽ đến.",
      standoutImages:
        "Tiếng Thạch Sùng buồn, chòi tranh, ôm em trong giấc ngủ yên bình — những hình ảnh thực nhưng ấm.",
      meaning:
        "Chờ đợi trong yêu thương không phải khổ đau thuần túy, mà là nuôi dưỡng một hy vọng bền bỉ dù hoàn cảnh khó khăn.",
      memorableLine: "Hoa sẽ nở vàng, hạnh phúc sẽ về thôi.",
    },
    imageResearch: {
      moodKeywords: ["chờ đợi", "đêm một mình", "hy vọng", "tình nghèo"],
      referenceLinks: [],
      recommendedScene: "Đêm khuya lặng yên, ánh sao, bầu không khí vừa buồn vừa hy vọng.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "mo-uoc",
    title: "Mơ ước",
    tag: "Thơ tình",
    summary: "Anh bắt gặp nụ cười em trong bình minh — lòng dâng lên bao lớp sóng, vỡ òa.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 11/4/2017",
    cardImage: "/images/poems/mo-uoc.jpeg",
    heroImage: "/images/poems/mo-uoc.jpeg",
    audioUrl: "/audio/Mo-uoc.m4a",
    hasAudio: true,
    content:
      "Mỗi sớm mai nhìn ra cửa sổ\nBình minh lên, ui chim hót líu lo\nAnh bắt gặp nụ cười em trong đó\nLòng dâng lên bao lớp sóng, vỡ òa\nCay cay mắt, xót lòng ai thương nhớ\nTình yêu ơi sao xa lắc đôi bờ\nCho anh đổi quyển rơm đang có\nChút hư danh đời trang điểm cho mình\nĐể hôm sớm bên nhau khăng khít\nThỏa lòng yêu, mơ ước của đời người\nBao nhiêu nữa, thời gian còn lại\nCuộc sống vô thường vốn đi xưa nay\nGởi em hết khoảng đời còn lại\nÍch không đây! Sao anh thấy mình già!\n\nMỹ Tho, ngày 11/4/2017",
    status: "published",
    analysis: {
      emotionFlow:
        "Từ buổi sáng nhìn thấy bóng dáng em trong bình minh, mạch thơ chuyển qua nỗi nhớ, rồi lắng trong chiêm nghiệm về thời gian và dâng hiến.",
      standoutImages:
        "Nụ cười gặp trong ánh bình minh — hình ảnh vừa thực vừa mơ, gợi cảm giác tình yêu như một điều kỳ diệu thường nhật.",
      meaning:
        "Mơ ước không phải hoang đường; đó là khao khát đánh đổi tất cả để được bên nhau trong những buổi sáng bình thường.",
      memorableLine: "Cho anh đổi quyển rơm đang có — chút hư danh đời trang điểm cho mình.",
    },
    imageResearch: {
      moodKeywords: ["bình minh", "nhớ nhung", "hy sinh vì yêu", "chiêm nghiệm"],
      referenceLinks: [],
      recommendedScene: "Buổi sáng sớm, ánh sáng dịu, cảm giác vừa tỉnh dậy với nỗi nhớ người thương.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "muon-con-hon-khong",
    title: "Muộn còn hồn không",
    tag: "Thơ chiêm nghiệm",
    summary: "Một nụ mai muộn màng hé nở giữa mùa thu — tình yêu nhìn đâu cũng đẹp.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 3/9/2018",
    cardImage: "/images/poems/muon-con-hon-khong.jpeg",
    heroImage: "/images/poems/muon-con-hon-khong.jpeg",
    audioUrl: "/audio/Muon-con-hon-khong.m4a",
    hasAudio: true,
    content:
      "Một nụ mai muộn màng hé nở\nGiữa mùa thu vẫn vươn sắc tươi vàng\nHút lấy hồn qua, lãng tử lang thang\nVui muộn, khổ vay... cả đời lận đận\nBỗng một ngày nghe tim mình thổn thức\nGiọng cười ai và kí ức lại ùa về...\nVề đâu hỡi? Bậu mình én mang xách\nNỗi nhọc nhằn qua xin gánh sẻ chia\nDẫu biết rằng không còn tuổi đôi mươi\nVà vẫn biết lá vàng mùa thu rụng\nNhưng qua vẫn thấy mùa xuân đầy sức sống\nVà yêu đời vì hoa nở trên môi\n... Ôi hạnh phúc!\nTình yêu nhìn đâu cũng đẹp...\n\nMỹ Tho, 3/9/2018",
    status: "published",
    analysis: {
      emotionFlow:
        "Mở bằng hình ảnh nụ mai muộn — biểu tượng cho tình yêu đến trễ nhưng vẫn rực rỡ. Mạch thơ chuyển từ hoài niệm sang hiện tại đầy sức sống.",
      standoutImages:
        "Nụ mai vàng giữa mùa thu, hoa nở trên môi — hai hình ảnh gắn thiên nhiên với nụ cười người thương.",
      meaning:
        "Tình yêu dù đến muộn vẫn có giá trị; tuổi không xóa được cảm xúc, và hạnh phúc có thể nảy mầm từ những điều tưởng như đã qua.",
      memorableLine: "Tình yêu nhìn đâu cũng đẹp...",
    },
    imageResearch: {
      moodKeywords: ["mai vàng", "mùa thu", "tình muộn", "chiêm nghiệm"],
      referenceLinks: [],
      recommendedScene: "Hoa mai vàng trong không gian thu, ánh sáng ấm nhẹ, gợi cảm giác bình yên và tri ân.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "goi-lai-em",
    title: "Gởi lại em",
    tag: "Thơ tình",
    summary: "Anh gởi lại em con đường Lê Lợi và những góc phố Mỹ Tho mình từng đi qua.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, đêm 5/6/2019",
    cardImage: "/images/poems/goi-lai-em.jpeg",
    heroImage: "/images/poems/goi-lai-em.jpeg",
    audioUrl: "/audio/Goi-lai-em.m4a",
    hasAudio: true,
    content:
      "Anh gởi lại em con đường Lê Lợi\nHàng me non, ngun ngút ở trên đầu\nTa dìu nhau bao lần qua phố\nTay ủ trong tay, ấm áp trong lòng\nHương Ngọc Lan đưa ta về bến đò Tân Long\nCon đò reo cười, trôi ngang con nước\nNghe đôi tim mình bồng bềnh gõ nhịp\nVùng hạ Mê Kông, xao xuyến bến Lạc Hồng\nCầu Quay nối đôi bờ Bảo Định, bao mùa gió chướng, mưa giông\nKhông quay nữa, vẫn đứng trong lòng Mỹ Tho đại phố\nHủ tíu Mỹ Tho ăn một lần, suốt đời vẫn nhớ\nEm gái Mỹ Tho lỡ yêu rồi không thể nào quên\nCánh võng mẹ đưa câu hát chao nghiêng\n\"Đèn Sài Gòn ngọn xanh, ngọn đỏ\nĐèn Mỹ Tho ngọn tỏ, ngọn lu\nAnh về học lấy chữ nhu\nChín trăng em đợi, mười thu em chờ\"\nNgã vào lòng em, anh hát âu ơ\nEm vuốt má anh, mắt cười lúng liếng\nCó lắm người chết cười trong đáy mắt hồ thu\nAnh đi có xa, vẫn nhớ lời ru\nVẫn giữ trong tim lời yêu đã nói\nVẫn nhớ vòng tay, nụ hôn bối hối\nVẫn nhớ đêm yêu lòng dạ bồi hồi\nGiữ những vui buồn góc phố mãi thôi\nVề với phố bằng giấc mơ đêm nhớ\nMình vẫn bên nhau dầu Tương Giang cách trở\nVẫn bên nhau trong phố của mình\nRáng chiều ửng sắc nụ cười xinh\nĐón hoàng hôn, cuộc hẹn hò trên gối chiếc\nNhư mọi hôm: Ghế đá bến Lạc Hồng\nMình xa nhau: Cách mặt, chung lòng\nMắt cùng hướng về phố xưa Lê Lợi.\n\nCai Lậy, đêm 5/6/2019",
    status: "published",
    analysis: {
      emotionFlow:
        "Bài thơ như một chuyến đi bộ qua ký ức phố Mỹ Tho — từng địa danh gắn với từng khoảnh khắc yêu thương, kết bằng sự chia xa nhưng lòng vẫn chung hướng.",
      standoutImages:
        "Hàng me non Lê Lợi, hương Ngọc Lan, bến Lạc Hồng, câu ca dao võng đưa — những chi tiết địa phương làm bài thơ thành một bức tranh thành phố đậm tình.",
      meaning:
        "Khi xa nhau, ta gởi lại những nơi chốn từng đi qua — tình yêu không chỉ là giữa hai người mà còn được lưu giữ trong không gian, địa danh, hương vị.",
      memorableLine: "Mình xa nhau: Cách mặt, chung lòng.",
    },
    imageResearch: {
      moodKeywords: ["phố Mỹ Tho", "ký ức", "hoài hương", "tình yêu đôi lứa"],
      referenceLinks: [],
      recommendedScene: "Con phố cây xanh buổi chiều, ánh sáng vàng ấm, cảm giác hoài niệm và nhớ nhung.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "vu-vo",
    title: "Vu vơ",
    tag: "Thơ tình",
    summary: "Lời yêu đầy ắp không dám nói — xin nhờ mây gió tương tư.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 10/12/2004",
    cardImage: "/images/poems/vu-vo.jpeg",
    heroImage: "/images/poems/vu-vo.jpeg",
    audioUrl: "/audio/Vu-vo.m4a",
    hasAudio: true,
    content:
      "Yêu người, tôi góp nhặt ý thơ\nThầm mong ai hiểu dạ kẻ khờ\nLời yêu đầy ắp không dám nói\nXin nhờ mây gió tương tư\nGió là gió thơ là thơ\nThơ đâu theo gió được bao giờ\nKẻ uống rượu tình, say chếnh choáng\nSống giữa đời, mà cứ ngỡ trong mơ\nTrau chuốt tình yêu thành câu thơ\nCâu thương, câu nhớ, gọi câu chờ\nMong sao em hiểu lòng ai đó\nĐể thơ tình tôi hết vu vơ\nCâu thơ chắp nhặt bắc nhịp cầu\nNúi cao chẳng ngại mặc sông sâu\nThương cho thuyền mãi chưa bến đậu\nBến gọi thuyền về, ta có nhau.\n\nCai Lậy, ngày 10/12/2004",
    status: "published",
    analysis: {
      emotionFlow:
        "Từ e dè không dám nói, người thơ chuyển lòng mình vào câu chữ, rồi gởi hết vào hy vọng được đáp lại.",
      standoutImages:
        "Mây gió tương tư, kẻ uống rượu tình say chếnh choáng — những hình ảnh thể hiện trạng thái yêu nhưng không dám bày tỏ.",
      meaning:
        "Thơ là cách người nhút nhát nói điều không thể nói trực tiếp — và bài thơ này tự nó là lời tỏ bày.",
      memorableLine: "Bến gọi thuyền về, ta có nhau.",
    },
    imageResearch: {
      moodKeywords: ["e ấp", "thầm yêu", "mây gió", "thơ tình"],
      referenceLinks: [],
      recommendedScene: "Không gian nhẹ, gió thổi, cảm giác mơ màng và bẽn lẽn.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "chuyen-do",
    title: "Chuyến đò",
    tag: "Thơ suy tưởng",
    summary: "Con đò ngang chòng chành sông nước — hay lòng ta cứ mãi chòng chành.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 10/7/2019",
    cardImage: "/images/poems/chuyen-do.jpeg",
    heroImage: "/images/poems/chuyen-do.jpeg",
    audioUrl: "/audio/Chuyen-đo.m4a",
    hasAudio: true,
    content:
      "Chuyến đò ngang, chở anh sang sông\nTrái tim yêu cứ dùng dằng, ở lại\nEm mang về, ấp ủ giúp, qua cơn...\nCon đò đi sóng dậy, gió đón\nNhấp nhô, chòng chành, bến bờ xa lắc\nĐêm nay về, bến có chờ chăng\nNơi anh đi, người ở có chắc rằng\nSẽ chờ đợi, nếu anh về trở lại\nÔi cuộc sống, sao nhiều ngang trái\nCó không, được mất cứ quay vòng\nTưởng của mình nhưng hóa ra không\nTưởng đã mất nhưng trở về bất chợt\nCon đò ngang chòng chành sông nước\nHay lòng ta cứ mãi chòng chành.\n\nMỹ Tho, ngày 10/7/2019",
    status: "published",
    analysis: {
      emotionFlow:
        "Con đò là ẩn dụ cho cuộc đời và tình yêu — mỗi lần sang sông là một lần không chắc có bến đợi. Mạch thơ đi từ cụ thể đến triết lý.",
      standoutImages:
        "Trái tim dùng dằng ở lại, sóng dậy gió đón, bến bờ xa lắc — hình ảnh sông nước miền Tây mang chiều sâu tâm trạng.",
      meaning:
        "Cuộc sống bấp bênh như chuyến đò; được mất lòng người cũng chòng chành như sóng — câu hỏi không có lời đáp.",
      memorableLine: "Con đò ngang chòng chành sông nước — hay lòng ta cứ mãi chòng chành.",
    },
    imageResearch: {
      moodKeywords: ["chuyến đò", "sông nước", "bấp bênh", "chiêm nghiệm"],
      referenceLinks: [],
      recommendedScene: "Con đò nhỏ trên sông rộng, trời mờ, gợi cảm giác trôi nổi và chờ đợi.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "mo-dao-vuon-xuan",
    title: "Mơ dạo vườn xuân",
    tag: "Thơ quê",
    summary: "Về đây nghe lại câu hò — trăng thanh, gió mát, bến đò, cây đa.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 25/11/2019",
    cardImage: "/images/poems/mo-dao-vuon-xuan.jpeg",
    heroImage: "/images/poems/mo-dao-vuon-xuan.jpeg",
    audioUrl: "/audio/Mo-dao-vuon-xuan.m4a",
    hasAudio: true,
    content:
      "Khi nào anh thấy nhớ em\nThì về anh nhé một lần thăm quê\nThanh long, xoài, bưởi xum xuê\nMặc tình anh \"hái\" \"xin\" gì cũng cho\nVề đây nghe lại câu hò\nTrăng thanh, gió mát, bến đò, cây đa\nThương sao chiếc áo bà ba\nEo thon, một thoáng đến giờ chưa quên\nAnh đi ba nổi, bảy chìm\nLênh đênh kiếp nạn, duyên tình đa đoan\nĐau đời em thân phận lỡ làng\nĐau cho cái số hững hờ bạc phận\nChiều nay bưởi treo kín cả góc sân\nXoài đang vào độ vàng ươm góc vườn\nThanh long trêu khách thèm thuồng\nAnh mơ hái trái, dạo vườn mùa xuân.\n\nCai Lậy, ngày 25/11/2019",
    status: "published",
    analysis: {
      emotionFlow:
        "Lời mời về quê ân tình, chuyển qua những hình ảnh vườn quê sung túc, rồi lắng trong nỗi đau thân phận và giấc mơ dạo vườn xuân.",
      standoutImages:
        "Áo bà ba eo thon, thanh long trêu khách, bưởi treo kín góc sân — vườn cây miền Tây hiện lên tươi tắn và thương nhớ.",
      meaning:
        "Quê hương và người thương gắn liền nhau; nhớ em là nhớ cả mùa trái cây, câu hò bến đò — tình yêu thắm vào không gian làng quê.",
      memorableLine: "Anh mơ hái trái, dạo vườn mùa xuân.",
    },
    imageResearch: {
      moodKeywords: ["vườn quê", "mùa xuân", "trái cây miền Tây", "áo bà ba"],
      referenceLinks: [],
      recommendedScene: "Vườn cây xanh mướt buổi chiều, ánh sáng ấm, cảm giác bình yên và thương nhớ.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "ron-rang",
    title: "Rộn ràng",
    tag: "Thơ tình",
    summary: "Năm mươi lẻ vẫn rộn ràng như thế ấy — tình yêu em xưa nay vẫn vậy.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 5/01/2017",
    cardImage: "/images/poems/ron-rang.jpeg",
    heroImage: "/images/poems/ron-rang.jpeg",
    audioUrl: "/audio/Ron-rang.m4a",
    hasAudio: true,
    content:
      "Một đóa hồng anh gửi về em\nGửi theo đó tình yêu nỗi nhớ\nEm ở trong anh, dù xa xôi cách trở\nBởi tình yêu đủ ấm lòng mình\nEm! Em có nghe nhịp đập tim anh\nNăm mươi lẻ vẫn rộn ràng như thế ấy\nTình yêu em xưa nay vẫn vậy\nNăm mươi năm sau tim vẫn cứ rộn ràng.\n\nMỹ Tho, ngày 5/01/2017",
    status: "published",
    analysis: {
      emotionFlow:
        "Bài thơ ngắn và mạnh — từ lời gửi đóa hồng đến tuyên ngôn về sức sống của tình yêu qua năm tháng.",
      standoutImages:
        "Đóa hồng gửi về, nhịp tim rộn ràng ở tuổi năm mươi — hình ảnh giản dị nhưng đủ sức khẳng định tình yêu không già.",
      meaning:
        "Tình yêu không tính tuổi; năm mươi tuổi tim vẫn đập rộn ràng vì em — đó là điều kỳ diệu nhất của tình người.",
      memorableLine: "Năm mươi năm sau tim vẫn cứ rộn ràng.",
    },
    imageResearch: {
      moodKeywords: ["đóa hồng", "tình yêu bền", "tuổi trung niên", "rộn ràng"],
      referenceLinks: [],
      recommendedScene: "Một đóa hồng đỏ, ánh sáng ấm, cảm giác tươi và tràn đầy sức sống.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "ngay-ay",
    title: "Ngày ấy",
    tag: "Thơ tình",
    summary: "Ký ức buổi đầu gặp gỡ trên giảng đường mở ra một lời nguyện gắn bó rất mộc mạc và bền lòng.",
    author: "Lê Dũng",
    locationDate: "20/10/18",
    cardImage: "/images/poems/ngay-ay.png",
    heroImage: "/images/poems/ngay-ay.png",
    audioUrl: "/audio/ngay-ay.m4a",
    hasAudio: true,
    content: `Đôi mắt huyền lúng liếng
Đốt tim anh cháy rồi
Nụ cười duyên chúm chím
Khiến lòng anh chơi vơi
Mùa tựu trường năm ấy
Giảng đường mình gặp nhau
Em nhẹ nhàng như lụa
Em rực rỡ như đào
Nhìn em anh đã nghĩ
Mình sẽ là của nhau
Anh làm dù che nắng
Cho đời em bình lặng
Dịu dàng như ánh trăng
Anh nguyện là điểm tựa
Đứng bên em suốt đời
Chân có chùn, gối mỏi
Yêu em hoài không thôi.

20/10/18`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đi từ rung động đầu đời đến một lời hứa chở che kéo dài suốt cả quãng đời sau.",
      standoutImages: "Đôi mắt huyền, nụ cười chúm chím và giảng đường mùa tựu trường tạo nên nền ký ức rất sáng.",
      meaning: "Tình yêu được nhìn như một chốn nương tựa, nơi người nói muốn trở thành bóng mát và điểm tựa cho người mình thương.",
      memorableLine: "Anh nguyện là điểm tựa",
    },
    imageResearch: {
      moodKeywords: ["giảng đường", "tựu trường", "rung động đầu đời", "dịu dàng"],
      referenceLinks: [],
      recommendedScene: "Khung cảnh thanh xuân nhẹ nắng, gợi cảm giác lần đầu gặp gỡ và mến thương rất trong trẻo.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "giac-mo",
    title: "Giấc mơ",
    tag: "Thơ tình",
    summary: "Một giấc mộng tình ái bay bổng, nơi vòng tay, ánh mắt và hạnh phúc hòa vào nhau như tiên cảnh.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 29/8/2018",
    cardImage: "/images/poems/giac-mo.png",
    heroImage: "/images/poems/giac-mo.png",
    audioUrl: "/audio/giac-mo.m4a",
    hasAudio: true,
    content: `Trong giấc ngủ, mơ cùng chăn gối
Vòng tay ôm, ánh mắt mỉm cười
Con thác đổ, tình yêu hạnh phúc
Ngập một trời, hoa nở quanh tôi
Em thiên thần đôi cánh gõ bờ rồi
Nằm bên anh, ngoan như thỏ trắng
Đắp cho em, chăn tình yêu sâu thẳm
Rước em về nơi tiên cảnh bồng lai
Trong giấc ngủ mơ hồ bay bổng
Lửa tình yêu đốt cháy đời mình
Quyện vào nhau, cho tình yêu kết trái
Tình mộng rồi, nhớ mãi giấc mơ xinh.

Mỹ Tho, ngày 29/8/2018`,
    status: "published",
    analysis: {
      emotionFlow: "Cảm xúc mở ra trong mộng tưởng êm ái rồi dần đẩy lên cường độ nồng nàn của một giấc mơ tình yêu viên mãn.",
      standoutImages: "Thiên thần, thỏ trắng, hoa nở quanh trời và tiên cảnh bồng lai tạo nên không gian mơ hồ mà đắm say.",
      meaning: "Bài thơ xem giấc mơ như nơi những khát vọng yêu thương được sống trọn và để lại dư âm khi thức dậy.",
      memorableLine: "Rước em về nơi tiên cảnh bồng lai",
    },
    imageResearch: {
      moodKeywords: ["giấc mơ", "tiên cảnh", "hoa nở", "tình yêu"],
      referenceLinks: [],
      recommendedScene: "Không gian mơ màng với ánh sáng mềm, gợi cảm giác bay bổng và gần gũi.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "nguoi-dung",
    title: "Người dưng",
    tag: "Thơ tình",
    summary: "Từ hai kẻ xa lạ đến lời nguyện sống chết có nhau, bài thơ đi bằng nhịp nói mộc mạc mà tha thiết.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 26/06/17",
    cardImage: "/images/poems/nguoi-dung.png",
    heroImage: "/images/poems/nguoi-dung.png",
    audioUrl: "/audio/nguoi-dung.m4a",
    hasAudio: true,
    content: `Hai người dưng, lạ hươ lạ hoặc
Xa một ngày ngồi đứng không yên
Điện thoại reng, run rẩy con tim
Dấu câu hỏi bâng quơ, mắt cười rạng rỡ
Má hồng hơn, môi thắm sắc, say đời
Hai người dưng, nhà ai nấy ở
Người kia buồn, người nọ khổ đăm đăm
Người đứt tay, người xót dạ, khóc thầm
Người cảm sốt, người ngồi trên lửa

Kỳ hông, người dưng mà lo lắng làm gì
Hai người dưng về chung một cửa
Chia cho nhau chiếc gối kê đầu
Thì chia luôn buồn vui, sướng khổ
Ngày cuối đời, nằm xuống cạnh nhau
Anh với em, người dưng lạ hoặc
Nhớ thương nhau ruột thắt, gan bào
Nỗi nhớ, niềm yêu gói vào lá trầu, gói trong quả cau
Xin trầu cau xe duyên thắm lại
Để ngày xuân, đêm đông, ngày hè, đêm thu buồn bã
Giàu nghèo, sướng khổ mình ở bên nhau
Để mình là chồng và của nhau
Hai người dưng, không là người dưng nữa.

Cai Lậy, ngày 26/06/17`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đi từ bối rối, lo lắng của buổi đầu đến ước nguyện gắn bó trọn đời rất rõ ràng và mạnh mẽ.",
      standoutImages: "Điện thoại reng, chiếc gối kê đầu, lá trầu quả cau là những chi tiết đời thường làm tình cảm trở nên gần và thật.",
      meaning: "Tình yêu làm tan đi khoảng cách người dưng, biến sự xa lạ thành một mái nhà chung và một cam kết bền lâu.",
      memorableLine: "Hai người dưng, không là người dưng nữa.",
    },
    imageResearch: {
      moodKeywords: ["trầu cau", "se duyên", "người dưng thành người thương", "mộc mạc"],
      referenceLinks: [],
      recommendedScene: "Không khí miền Tây gần gũi, gợi cảm giác duyên quê và tình cảm chân chất.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "trong-trai",
    title: "Trống trải",
    tag: "Thơ đêm",
    summary: "Một đêm mưa gió và căn phòng cô quạnh mở ra tiếng than dài của nỗi cô liêu chưa thể nguôi.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 28/9/2018",
    cardImage: "/images/poems/trong-trai.png",
    heroImage: "/images/poems/trong-trai.png",
    audioUrl: "/audio/trong-trai.m4a",
    hasAudio: true,
    content: `Mưa giăng, gió lùa lòng lạnh lắm
Căn phòng đơn sao mà rộng lạ kỳ
Thèm vô cùng, được uống đôi ly
Lòng ấm lại, phòng thôi không rộng nữa
Dẫu có giăng mưa, gió lùa qua cửa
Rượu mềm môi, mặc kệ cho đời
Bồ Tát ơi! Con nguyện, xin người
Trong ba cõi, về đâu mong chỉ dạy
Con muốn người quay thời gian trở lại
Chuyện ngày xưa, dài mãi đến bây giờ
Để đêm dài, trong những giấc mơ
Không buồn tẻ, chim sâu kêu lẻ bạn
Ta muốn đâu những lời than vãn
Ta chỉ mong hoa nở, ngạt ngào hương
Ta đâu màng chi thế giới vô thường
Nhưng tình si nên vương nhiều sầu lụy
Chén rượu đầy, mong rửa nỗi cô liêu
Ta mong vòng tay ôm dáng yêu kiều
Mong... mong lắm câu thơ buồn buồn lắm.

Mỹ Tho, 28/9/2018`,
    status: "published",
    analysis: {
      emotionFlow: "Từ cái lạnh vật lý của đêm mưa, cảm xúc trượt sâu vào nỗi cô đơn, hoài niệm rồi dừng lại ở một tiếng mong rất buồn.",
      standoutImages: "Căn phòng rộng lạ kỳ, chén rượu đầy, chim sâu lẻ bạn và vòng tay mong nhớ nối thành một chuỗi cô tịch rõ nét.",
      meaning: "Bài thơ cho thấy cô đơn không chỉ vì thiếu người ở cạnh mà còn vì ký ức cũ cứ kéo dài mãi trong hiện tại.",
      memorableLine: "Chén rượu đầy, mong rửa nỗi cô liêu",
    },
    imageResearch: {
      moodKeywords: ["mưa đêm", "căn phòng vắng", "rượu", "cô liêu"],
      referenceLinks: [],
      recommendedScene: "Nội thất đêm mưa với ánh đèn ấm yếu, nhấn cảm giác vắng lặng và nhớ thương.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "di-nguoc-mat-troi",
    title: "Đi ngược mặt trời",
    tag: "Thơ chiêm nghiệm",
    summary: "Hào quang, cơm áo và tình yêu được đặt cạnh nhau để soi lại điều gì thật sự còn ở lại với con người.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 12/3/2019",
    cardImage: "/images/poems/di-nguoc-mat-troi.png",
    heroImage: "/images/poems/di-nguoc-mat-troi.png",
    audioUrl: "/audio/di-nguoc-mat-troi.m4a",
    hasAudio: true,
    content: `Qua đi ngược ánh sáng mặt trời
Tìm: Hào quang, chén cơm, tấm áo
Trong góc tim mình, tình yêu bao năm ẩn náu
Đã bao đêm thổn thức, trở trăn
Nghe vời vợi: Tiếng ai than thở, khóc thầm
Ai lẻ bạn, ai chìm trong thương nhớ
Ánh hào quang như rau xanh giữa chợ
Cố góp gom cũng héo rũ cuối chợ chiều
Chén cơm, tấm áo cũng trả cho đời, khi về với đất
Chuyện giấu trong tim, mang xuống mộ phần
Qua giữ cho qua, bậu có biết không
Cũng có nghĩa: Không bao giờ quên bậu
Thương đóa hoa mận khai, thương người thiếu phụ
Tay nâng hoa, rần rần lệ đời dâng
Qua còn đây cả một tấm lòng
Bậu giữ lấy, cười tươi thêm chút nữa.

Mỹ Tho, ngày 12/3/2019`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ mở bằng hành trình truy tìm những giá trị đời sống, rồi dần gạn bỏ phù hoa để neo lại ở một tấm lòng không quên.",
      standoutImages: "Hào quang như rau xanh giữa chợ và chén cơm tấm áo trả lại cho đời là những đối sánh rất đời mà sắc.",
      meaning: "Sau cùng, điều còn lại không phải danh lợi hay vật chất mà là tình nghĩa người giữ trong tim đến tận cuối đời.",
      memorableLine: "Qua còn đây cả một tấm lòng",
    },
    imageResearch: {
      moodKeywords: ["chiêm nghiệm", "ánh sáng", "chợ chiều", "tấm lòng"],
      referenceLinks: [],
      recommendedScene: "Khung cảnh nghiêng nắng cuối ngày, giàu chiều sâu suy tư hơn là phô trương.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "anh-mai-ben-em",
    title: "Anh mãi bên em",
    tag: "Thơ tình",
    summary: "Bài thơ như một lời ru và lời hứa làm thảm cỏ, chiếc ô, bờ vai để người thương được yên giấc.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 29/7/2019",
    cardImage: "/images/poems/anh-mai-ben-em.png",
    heroImage: "/images/poems/anh-mai-ben-em.png",
    audioUrl: "/audio/anh-mai-ben-em.m4a",
    hasAudio: true,
    content: `Trái tim ấm nhờ tình yêu ủ ấm
Cuộc đời vui nhờ có những niềm vui
Bao bon chen mệt mỏi lắm rồi
Em hãy ngủ để giấc mơ đẹp nhất
Đôi cánh thiên thần đưa em khắp nhân gian
Trải lòng giữa rừng núi đại ngàn
Sông dài rộng, đồng bằng mênh mông quá
Những cỏ hoa, những tấm lòng thơm thảo
Để ngày vui thức dậy dưới mặt trời
Mỗi khi lòng mệt mỏi chơi vơi
Ai có gọi, em cũng đừng thức nhé
Đời có làm em đau, em cứ nở nụ cười
Dưới chân em, có anh là thảm cỏ
Là chiếc ô che nắng ở trên đầu
Là đóa hồng đứng chờ bên cửa sổ
Là bờ vai, em cứ tựa hẳn vào
Mặc cho giông gió thét gào
Em cứ ngủ ngoan, hoa hồng chúm chím.

Cai Lậy, ngày 29/7/2019`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đi từ xoa dịu mệt mỏi đến một lời hứa đồng hành rất dịu dàng, như ru ngủ người mình thương.",
      standoutImages: "Đôi cánh thiên thần, thảm cỏ, chiếc ô, đóa hồng và bờ vai làm nên chuỗi hình ảnh che chở liên tục.",
      meaning: "Yêu ở đây là hiện diện làm nơi nương tựa, để người kia có thể nghỉ ngơi giữa mọi giông gió của đời sống.",
      memorableLine: "Là bờ vai, em cứ tựa hẳn vào",
    },
    imageResearch: {
      moodKeywords: ["che chở", "giấc ngủ yên", "bờ vai", "dịu dàng"],
      referenceLinks: [],
      recommendedScene: "Hình ảnh ấm áp, tạo cảm giác an toàn và được chở che.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "xuan",
    title: "Xuân",
    tag: "Thơ mùa xuân",
    summary: "Một bài thơ xuân nhiều hân hoan, nơi tình yêu và cảm giác đoàn viên được đẩy lên thành lễ hội trong lòng.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 13/9/2018",
    cardImage: "/images/poems/xuan.png",
    heroImage: "/images/poems/xuan.png",
    audioUrl: "/audio/xuan.m4a",
    hasAudio: true,
    content: `Tự trong lòng anh, ngào ngạt hương xuân
Nên từng ý, từng lời kết từ mật ngọt
Trong mắt anh ngàn hoa đua khoe sắc
Nghe tim mình, thổn thức suốt đêm xuân
Câu nói: Yêu em dềnh lên tràn như sóng nước
Lan tỏa đi từ phía trái tim mình
Anh nói yêu em, gởi vào đó niềm tin
Sự san sẻ, chứ nào trêu hoa ghẹo nguyệt
Anh đâu muốn: Đã thề còn thiếp
Đâu dẻo bông, đâu phải lắm tham lam
Nhớ cho anh từ thuở: Lạc chốn địa đàng
Anh đã yêu em với tình yêu say đắm

Anh mắc tội (?) nên vuốt tay em... xa dần, xa lắm
Đến bây giờ mới “hợp phố” đoàn viên
Anh yêu em từ thuở thanh niên
Mà đến lúc già mới cầm tay nhau đặng
Câu nói yêu nhau giờ mới trao tròn chặng
Bậu nói yêu qua giờ mới đậu ở môi hồng
Đêm nay qua mơ ngồi giữa ngai rồng
Bên là bậu, hoàng hậu lòng ta mặt hoa, da phấn
Ôm bậu vào lòng, nước mắt rưng rưng
Qua vui, bời bậu đang xuân
Bậu vui, trời đất tràn xuân hết mà
Vang vang câu hát hoan ca
Qua ôm hôn bậu đóa hoa mỉm cười.

Mỹ Tho, ngày 13/9/2018`,
    status: "published",
    analysis: {
      emotionFlow: "Cảm xúc dâng lên từ nồng nàn, chờ đợi đến hân hoan đoàn viên, mang sắc thái lễ hội của tình yêu gặp lại.",
      standoutImages: "Hương xuân, ngàn hoa, sóng nước, ngai rồng và trời đất tràn xuân làm cho mạch thơ rực rỡ, tưng bừng.",
      meaning: "Mùa xuân trong bài không chỉ là mùa của đất trời mà còn là mùa của tình yêu sau nhiều năm chờ đợi.",
      memorableLine: "Bậu vui, trời đất tràn xuân hết mà",
    },
    imageResearch: {
      moodKeywords: ["mùa xuân", "đoàn viên", "hoa nở", "hân hoan"],
      referenceLinks: [],
      recommendedScene: "Sắc xuân rực rỡ nhưng vẫn giữ nét dân dã và thân tình.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "mua-thu-la-do",
    title: "Mùa thu lá đỏ",
    tag: "Thơ tình",
    summary: "Một buổi chiều trên phố cũ hóa thành sân khấu của si mê, khi sắc lá đỏ làm mọi thứ ngưng lại trước dáng người thương.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 7/11/2019",
    cardImage: "/images/poems/mua-thu-la-do.png",
    heroImage: "/images/poems/mua-thu-la-do.png",
    audioUrl: "/audio/mua-thu-la-do.m4a",
    hasAudio: true,
    content: `Chiều rơi dần, ta đi dọc dài phố cũ
Chiếc lá xanh, thay áo mới bao giờ
Hôm qua mơn mởn mượt mà màu của ngọc
Mà bây giờ vàng rực ánh hoàng hôn
Em kiêu sa đứng ngắm chiều buông
Anh hồn phách lạc vào vùng huyền bí
Giữa đời thực anh tự mình ma mị
Gom ngũ sắc mây xây tuyệt mỹ lâu đài
Để giai nhân ngự trị trên ngai
Chị Hằng phải ngẩn ngơ nhìn đắm đuối
Hoa ngần ngại, nửa chừng không nở nữa
Chim cũng thôi sải cánh giữa lưng trời
Mặt hồ thu lặng lẽ, cá lặn mất tăm hơi
Anh phủ phục kề bên chờ truyền lệnh
Tình yêu lên ngôi, vỡ òa hạnh phúc
Nghe tim mình thổn thức thăng hoa
Bởi yêu rồi dáng đứng kiêu sa
Ta nhớ mãi, nhớ hoài màu lá ấy...

Mỹ Tho, ngày 7/11/2019`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ trôi từ quan sát mùa thu sang trạng thái mê đắm, nơi mọi cảnh vật đều quy phục trước vẻ đẹp người thương.",
      standoutImages: "Lá đỏ, ngũ sắc mây, lâu đài, chị Hằng, mặt hồ thu và dáng đứng kiêu sa nối nhau thành một bức tranh huyền ảo.",
      meaning: "Tình yêu làm thế giới chung quanh đổi sắc; một màu lá cũng đủ trở thành ký hiệu khó quên của một lần rung động.",
      memorableLine: "Ta nhớ mãi, nhớ hoài màu lá ấy...",
    },
    imageResearch: {
      moodKeywords: ["lá đỏ", "phố cũ", "chiều thu", "si mê"],
      referenceLinks: [],
      recommendedScene: "Chiều thu có chuyển màu rõ, giàu chất lãng mạn và hơi hướng mộng tưởng.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "neu-co-mot-ngay",
    title: "Nếu có một ngày",
    tag: "Thơ quê hương",
    summary: "Bài thơ mở một con đường trở về quê nhà như một nơi ôm lấy con người khi niềm vui trong thành phố đã cạn.",
    author: "Lê Dũng",
    locationDate: "Tân Phong, ngày 25/8/2019",
    cardImage: "/images/poems/neu-co-mot-ngay.png",
    heroImage: "/images/poems/neu-co-mot-ngay.png",
    audioUrl: "/audio/neu-co-mot-ngay.m4a",
    hasAudio: true,
    content: `Nếu có một ngày em mất hết niềm vui
Thành phố chẳng còn là nơi đi về, trú ngụ
Thì hãy theo anh về nơi chôn nhau, cắt rốn
Ở nơi này đầy những ngày hạnh phúc, bình yên
Khói lam chiều theo gió cuộn, mây trôi
Gian nhà lá, mẹ quê hiền, nhơn hậu
Cơm canh rau ngọt ngất những tiếng cười
Nếu một ngày em cần một bàn tay
Để vịn vào, bước qua những ngày giông bão
Để giúp em gạt sầu làm héo nụ tầm xuân
Thì em nhớ quê hương luôn bảo bọc mình
Quê hương nơi ta sinh ra, cho ta cơm rau, tình người thân thiết
Quê hương sẽ nhận ta về, để hòa vào cỏ cây, trả nợ cuộc đời
Gửi cho em nụ cười, tình người đẹp nhất đó em ơi
Giữ lấy để vui, dù cuộc sống có điều chưa như ý.

Tân Phong, ngày 25/8/2019`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ dịu dàng mở ra từ nỗi mỏi mệt của đời sống đô thị rồi dẫn người đọc về một miền quê an ủi và chở che.",
      standoutImages: "Khói lam chiều, gian nhà lá, mẹ quê hiền và cơm canh rau dựng lên một quê hương rất cụ thể và ấm áp.",
      meaning: "Quê hương hiện ra như nơi cưu mang cuối cùng, không chỉ nuôi thân mà còn hồi phục niềm vui và phẩm giá của con người.",
      memorableLine: "Thì em nhớ quê hương luôn bảo bọc mình",
    },
    imageResearch: {
      moodKeywords: ["quê nhà", "khói lam chiều", "mẹ quê", "bình yên"],
      referenceLinks: [],
      recommendedScene: "Miền quê ấm áp, có khói bếp và cảm giác trở về sau những bão giông.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "tien-ai",
    title: "Tiễn ai",
    tag: "Thơ chia xa",
    summary: "Tiếng ve, hoa phượng và bến đò chở nỗi chia tay học trò thành một khúc buồn ngắn mà đậm.",
    author: "Lê Dũng",
    locationDate: "Cai Lậy, ngày 27/11/2006",
    cardImage: "/images/poems/tien-ai.png",
    heroImage: "/images/poems/tien-ai.png",
    audioUrl: "/audio/tien-ai.m4a",
    hasAudio: true,
    content: `Ai về ai ở lại đây
Khi nhìn hoa phượng nở mũi cay, mắt nhòe
Giận mình lòng muốn và e
Hát câu cây cải về trời gió đưa
Lặng lòng ve gọi hè trưa
Lắc lư rơi xuống vàng mơ lá bàng
Đò đã cập bến, người sang
Áo ai khuất dạng cuối đàng xa xa
Nhớ nhau nhìn mãi cánh hoa
Thương nhau lẩm bẩm khúc ca “Đừng về”
Trữ tình gắn với chữ mê
Tình rơi rụng xuống, lòng tê tái sầu
Ai đi, ai biết về đâu
Nỗi buồn dậy sóng, nỗi sầu dâng cao.

Cai Lậy, ngày 27/11/2006`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ ngắn nhưng dồn dập, đi từ nghèn nghẹn lúc chia tay sang nỗi sầu dâng cao khi bóng người khuất hẳn.",
      standoutImages: "Hoa phượng, ve hè, lá bàng, bến đò và tà áo xa xa chạm đúng mạch chia ly của tuổi trẻ.",
      meaning: "Chia tay luôn là khoảnh khắc vừa muốn giữ vừa phải buông, và bài thơ giữ lại chính sự lưỡng lự đau ấy.",
      memorableLine: "Đò đã cập bến, người sang",
    },
    imageResearch: {
      moodKeywords: ["hoa phượng", "ve hè", "chia tay", "bến đò"],
      referenceLinks: [],
      recommendedScene: "Không gian mùa hè chia tay, gợi cảm giác nghẹn ngào và lưu luyến.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "buon",
    title: "Buồn",
    tag: "Thơ buồn",
    summary: "Ta cứ dõi về phía trời đông, nơi mặt trời và gương mặt em từng là chỗ dựa cho một đời phong trần.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 11/10/2019",
    cardImage: "/images/poems/buon.png",
    heroImage: "/images/poems/buon.png",
    audioUrl: "/audio/buon.m4a",
    hasAudio: true,
    content: `Ta cứ dõi về phía trời đông
Mong nhìn mặt trời vào mỗi sáng
Vầng dương mang niềm tin, ước mơ cuộc sống
Như gương mặt em suốt đời mà ta không thể nào quên
Hơi ấm tỏa từ vòng tay em, xiết chặt trái tim
Lời yêu thuở thì bên tai, mang ngàn nỗi nhớ
Những lúc chơi vơi giữa cuộc đời gian khó
Ta muốn buông xuôi, mặc trời đất xoay vần
Nghĩ về em, ta ưỡn ngực đón bão táp, phong trần
Nụ hôn của em, bến bờ bình an, quên đời lãng tử

Phương đông không chỗ để về, bến bờ neo đậu
Vòng tay, hơi ấm mất đi... sao yên được tấc lòng
Ta mất em rồi! Em có biết không
Đời vô nghĩa, ta đâu cần hiện diện
Ta về thôi với chuông chùa, tụng niệm
Về với hoang vu, chờ nẻo vô thường
Liêu xiêu bước, gặm nỗi buồn dằn vặt
Ta giận ta, ta giận đời, bầm gan tím mặt
Ta cười ta, âm thanh méo xệch theo thời gian
Ta giữ mãi trong lòng một nhành hoa trắng
Hoa trắng lắm mà đời thì đen lắm.

Mỹ Tho, ngày 11/10/2019`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ mở bằng một điểm tựa yêu thương rất sáng rồi rơi mạnh vào mất mát, cay đắng và cảm giác đời sống trống rỗng.",
      standoutImages: "Trời đông, mặt trời, vòng tay hơi ấm, chuông chùa và nhành hoa trắng tạo nên những đối cực giữa hy vọng và tuyệt vọng.",
      meaning: "Nỗi buồn ở đây không chỉ là chia lìa tình yêu mà còn là cuộc va chạm trực diện với cảm giác vô nghĩa khi chỗ dựa tinh thần biến mất.",
      memorableLine: "Hoa trắng lắm mà đời thì đen lắm.",
    },
    imageResearch: {
      moodKeywords: ["buồn sâu", "trời đông", "hoa trắng", "mất mát"],
      referenceLinks: [],
      recommendedScene: "Không gian lạnh và trống, nhấn tương phản giữa ánh sáng phương đông và nỗi buồn đậm đặc.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "xa-nhau-qua",
    title: "Xa nhau quá",
    tag: "Thơ tình",
    summary: "Dẫu không thể sống gần nhau, bài thơ vẫn giữ một lời hẹn đi tiếp qua mơ, qua luân hồi và duyên phước.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 6/4/2018",
    cardImage: "/images/poems/xa-nhau-qua.png",
    heroImage: "/images/poems/xa-nhau-qua.png",
    audioUrl: "/audio/xa-nhau-qua.m4a",
    hasAudio: true,
    content: `Em ơi!
Cuộc đời nếu ví như một chuyến đi
Bao nhiêu lần mỏi chân, dừng lại
Bao nhiêu lần bước thấp, cao, té ngã
Bao lần nhìn lại... khóc cười cho nhẹ lòng, nhẹ dạ
Trời không cho mình đặng sống gần nhau
Bởi kiếp trước mình vụng tu em ạ
Dẫu có xa mà luôn nhớ về nhau là đủ
Ngày không thuộc về nhau ta mơ bên nhau lúc ngủ

Ở trong mơ ta chỉ có đôi mình
Hãy hôn nhau cho thỏa tâm tình
Cho nhau hết yêu thương nồng cháy
Trộn lẫn vào nhau những sướng khổ cuộc đời
Lúc tỉnh ra thì tạm chia xa
Rồi sẽ gặp trong mơ, giấc ngủ
Ta luôn nhớ về nhau là đủ
Chuyện đời này chưa thể thuộc về nhau
Thì em ơi mình hẹn lại chuyến sau
Nhân sinh, luân hồi kiếp sau, kiếp trước
Cố gắng tạo duyên, tịnh tâm, tích phước
Kiếp sau bên nhau đến bạc mái.

Mỹ Tho, 6/4/2018`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đi từ chấp nhận xa cách sang dựng nên một miền gặp gỡ trong mơ, rồi khép lại ở lời hẹn rất dài với kiếp sau.",
      standoutImages: "Chuyến đi, giấc mơ, nụ hôn, luân hồi và mái đầu bạc là các hình ảnh kéo tình yêu vượt khỏi hiện tại.",
      meaning: "Tác phẩm xem tình yêu như một mối duyên chưa trọn, có thể không thành ở kiếp này nhưng vẫn được giữ bằng niềm tin vào tương lai.",
      memorableLine: "Ta luôn nhớ về nhau là đủ",
    },
    imageResearch: {
      moodKeywords: ["xa cách", "giấc mơ", "luân hồi", "hẹn kiếp sau"],
      referenceLinks: [],
      recommendedScene: "Không khí mềm, hơi mờ, gợi cảm giác vừa xa xôi vừa ấm áp của một lời hẹn bền lòng.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "dau-chua",
    title: "Dẫu chưa",
    tag: "Thơ tình",
    summary: "Dẫu chưa nên phu thê, bài thơ vẫn xem tình yêu như một mối gắn bó đã được định sẵn từ lâu.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 9/11/2018",
    cardImage: "/images/poems/dau-chua.png",
    heroImage: "/images/poems/dau-chua.png",
    audioUrl: "/audio/dau-chua.m4a",
    hasAudio: true,
    content: `Chưa nói: Lời sơn minh thề hải
Quì lạy nhau, kết nghĩa phu thê
Mỗi hoàng hôn ngóng bước chân về
Giấc ngủ mơ bên nhau đời chồng vợ
Mình đã là của nhau từ thuở đó
Và của nhau đến hết cuộc đời này
Hỡi vầng trăng, hỡi những áng mây
Làn gió đêm, sương khuya lạnh ướt
Tiếng nỉ non khúc thụy du buồn
Xót cho người lỡ chuyến yêu thương

Ôi tạo hóa khéo trêu hoa, giỡn bướm
Nụ cười khô, mắt ướt khép mi sầu
Mình đi đâu, mình về đâu, trú ở đâu
Trời đất bao la, lòng người bao dung tế độ
Đón lấy tình ta, lời yêu thổ lộ
Cả khối tình si xin gởi hết cho người
Trời cao, đất rộng, đêm khuya ơi
Phía xa kia, người ta yêu ơi
Thèm những nụ hôn cháy bỏng môi
Vòng tay ấm, ôm nhau tròn thương nhớ
Nhớ thương đi quay quắt cả một đời
Đêm khuya ơi nghe lạnh lắm rồi
Nụ hôn nào sưởi ấm lòng tôi.

Mỹ Tho, 9/11/2018`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đi từ niềm tin hai người đã thuộc về nhau sang nỗi xót xa vì lỡ chuyến yêu thương và khao khát được sưởi ấm.",
      standoutImages: "Vầng trăng, áng mây, sương khuya, khúc thụy du và nụ hôn cháy bỏng làm cảm xúc trải từ cao rộng đến rất gần thân thể.",
      meaning: "Tình yêu chưa thành danh phận nhưng đã thành một sự thật nội tâm, vừa thiêng liêng vừa đau đớn vì không thể chạm đến trọn vẹn.",
      memorableLine: "Nụ hôn nào sưởi ấm lòng tôi.",
    },
    imageResearch: {
      moodKeywords: ["đêm khuya", "thương nhớ", "lỡ duyên", "sương lạnh"],
      referenceLinks: [],
      recommendedScene: "Cảnh đêm có trăng và sương, nhấn cảm giác lạnh ngoài trời và lạnh trong lòng.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "co-nhieu-luc",
    title: "Có nhiều lúc",
    tag: "Thơ tình",
    summary: "Một bài thơ về nỗi đau khi phải đứng lại nhìn người mình yêu đi thẳng, nhưng vẫn cố giữ máu nóng để sống tiếp.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 17/10/2018",
    cardImage: "/images/poems/co-nhieu-luc.png",
    heroImage: "/images/poems/co-nhieu-luc.png",
    audioUrl: "/audio/co-nhieu-luc.m4a",
    hasAudio: true,
    content: `Có nhiều lúc anh điếng người, đau chết được
Đất dưới chân như cứ lún dần thêm
Gió thì luôn chạy về phía trước
Mây phải bay sao cản được bây giờ
Nên bình thản cho hết những gì có được
Chỉ giữ cho mình máu nóng trong tim
Anh đứng lại, em thẳng đường cứ bước
Lo lắng chi, anh đứng được trên chân mình
Đau lắm chứ, nhưng rồi phải sống
Vẫn phải cười dù nước mắt chực chờ rơi
Giữa dòng đời, nước chảy, bèo trôi
Câu hát xưa: Đò chiều, gác mái
Anh yêu em đến khờ đến dại
Ước mơ sao có lúc được thành đôi
Có gì vui khi không được sánh đôi
Có gì buồn hơn đầu non, góc bể
Nên ước gì... hai đứa chung đôi.

Mỹ Tho, ngày 17/10/2018`,
    status: "published",
    analysis: {
      emotionFlow: "Cảm xúc mở bằng cú sốc đau đớn rồi chuyển thành một nỗ lực tự giữ mình đứng vững giữa cảnh chia lìa.",
      standoutImages: "Đất lún dưới chân, gió chạy về phía trước, mây phải bay và đò chiều gác mái khiến nỗi buồn có chiều chuyển động rất rõ.",
      meaning: "Bài thơ ghi lại khoảnh khắc người ở lại buộc phải học cách chịu đựng và tiếp tục sống dù ước mơ thành đôi không thành.",
      memorableLine: "Anh đứng lại, em thẳng đường cứ bước",
    },
    imageResearch: {
      moodKeywords: ["chia xa", "đau đớn", "đứng lại", "ước mơ dang dở"],
      referenceLinks: [],
      recommendedScene: "Không gian mở với gió và mây, gợi cảm giác lệch nhịp giữa hai hướng đời.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "khi-yeu-nguoi-ta-ra-sao",
    title: "Khi yêu người ta ra sao",
    tag: "Thơ tình",
    summary: "Bài thơ tự trêu cái ngây ngô của người đang yêu, từ thao thức đêm khuya đến khát khao ôm hôn rất thật người.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 11/01/2019",
    cardImage: "/images/poems/khi-yeu-nguoi-ta-ra-sao.png",
    heroImage: "/images/poems/khi-yeu-nguoi-ta-ra-sao.png",
    audioUrl: "/audio/khi-yeu-nguoi-ta-ra-sao.m4a",
    hasAudio: true,
    content: `Người ta ước lệ, làm gì có thiệt
Tình yêu làm gì có ở trong tim
Nếu mà có, anh lấy em xem cho rõ
Anh yêu em nhiều cỡ bao chừng
Biết bao đêm anh nằm thao thức
Nghe thời gian, gõ nhịp trên tường
Câu thương nhớ, gió lùa qua khuôn cửa
Thèm ấp yêu, trăng gác bóng qua thềm
Bao nhiêu tuổi, lúc yêu đều vụng dại
Cứ ngây ngô như té giếng mất hồn
Cứ nói mãi anh yêu em nhiều lắm
Anh thèm ôm, hôn thân thể ngọc ngà
Ngồi một mình, ngắm phía trời xa
Khi tưng từng là yêu nhiều lắm đó.

Mỹ Tho, ngày 11/01/2019`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đi từ lối hỏi đùa, giễu nhẹ đến thao thức và bộc lộ rất thẳng thắn cái ngây ngô của người đang yêu.",
      standoutImages: "Nhịp thời gian trên tường, gió qua khuôn cửa, trăng qua thềm và cú té giếng mất hồn làm tình yêu hiện lên vừa vui vừa dại.",
      meaning: "Khi yêu, con người trở nên trẻ lại, nói mãi điều mình nhớ và thấy khát khao trở thành một phản xạ rất tự nhiên.",
      memorableLine: "Bao nhiêu tuổi, lúc yêu đều vụng dại",
    },
    imageResearch: {
      moodKeywords: ["thao thức", "vụng dại", "đêm khuya", "khát khao"],
      referenceLinks: [],
      recommendedScene: "Khung đêm riêng tư, có trăng và cửa sổ, để nhấn nét chân thật của nỗi tương tư.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "em-huong-xua",
    title: "Em - hương xưa",
    tag: "Thơ hoài niệm",
    summary: "Một mối tình cũ trở lại qua mưa xuân, hương quen và những ký ức chìm dưới đáy sông chưa bao giờ thật mất.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 9/7/2019",
    cardImage: "/images/poems/em-huong-xua.png",
    heroImage: "/images/poems/em-huong-xua.png",
    audioUrl: "/audio/em-huong-xua.m4a",
    hasAudio: true,
    content: `Em cùng tên với một loài hoa
Cũng ủ mùa xuân, môi cười rạng rỡ
Mỗi lúc em về xuân vỡ òa trước cửa
Ngơ ngẩn nhìn xuân, mơ chuyện đôi mình
Dòng sông quê tím ngắt lục bình
Đom đóm giăng giăng ngọn bần bãi bờ
Dạo ấy thuyền hoa em đi, chưa một lần quay lại
Những lời yêu, chìm dưới đáy sông rồi
Thương em đành nhìn nước chảy trôi xuôi
Nhặt kỉ niệm chép thành thơ để khóc
Thương em đứt đường tơ, anh cung đàn lỗi nhịp
Thương ước mơ xưa thành mây gió lang thang

Tóc còn xanh, em góa phụ... Thương nàng!
Anh viết câu thơ buồn, uống chén rượu tình đã mất
Chiều nay rắc hạt mưa xuân
Lão mai bung ra ngàn nụ hoa xanh mướt
Khóm cúc vàng nảy chồi non xanh biếc
Chén rượu thất tình uống thấy ngọt hơn xưa
Có cái chi lạ lạ trong mưa
Thoảng mùi hương quen, một thời ru ta mê mẩn
Nghe tiếng chân ai nhẹ nhàng, thở than
Áp mặt vào hoa gợi nhớ lắm tình riêng
Rũ bỏ đi và quên hết ưu phiền
Gửi trao nhau những nụ hôn nồng ấm
Không thể nào quên, một tình yêu đằm thắm
Hạnh phúc trào dâng, mùi hương cũ quay về...

Mỹ Tho, ngày 9/7/2019`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ bắt đầu ở hồi ức lỡ làng rồi dịch dần sang cảm giác hồi sinh khi hương cũ và xúc cảm cũ bất ngờ quay lại.",
      standoutImages: "Lục bình tím, đom đóm bãi bờ, thuyền hoa, mưa xuân và mùi hương quen làm ký ức hiện về rất dày và sống động.",
      meaning: "Tình cũ có thể trôi đi trong đời sống, nhưng chỉ một mùi hương hay một cơn mưa cũng đủ làm cả miền cảm xúc trỗi dậy trở lại.",
      memorableLine: "Hạnh phúc trào dâng, mùi hương cũ quay về...",
    },
    imageResearch: {
      moodKeywords: ["hương xưa", "mưa xuân", "lục bình", "tình cũ"],
      referenceLinks: [],
      recommendedScene: "Cảnh quê mưa xuân, có hoa và hơi nước, gợi ký ức quay về qua mùi hương.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "co-don",
    title: "Cô đơn",
    tag: "Thơ đêm",
    summary: "Nhìn trăng nhìn sao để nghe từng giọt buồn rơi, bài thơ chạm vào sự cô độc của tuổi tác và chiếc giường đơn quá rộng.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 12/3/2017",
    cardImage: "/images/poems/co-don.png",
    heroImage: "/images/poems/co-don.png",
    audioUrl: "/audio/co-don.m4a",
    hasAudio: true,
    content: `Có nhiều đêm nhìn trăng, nhìn sao
Nghe trong tim giọt buồn rưng rức
Rơi cứ rơi, giọt ngắn giọt dài
Trăng bấy ngàn năm mãi rực sắc vàng tươi
Ta bao tuổi tóc bạc màu sương gió
Có mấy nửa đầu đã về cùng thế giới người hiền
Những đêm buồn nhìn bóng nghiêng nghiêng
Ấm ức hỏi: Bóng kia đi đâu mất
Chiếc giường đơn sao rộng vô cùng
Tiếng thời gian cứ nhẹ nhẹ buông
Tiếng thở dài buông nghe nhẹ nhẹ
Ta thương mình, thương lắm cả ta
Thương cuộc đời... gió táp mưa sa
Thương cuộc tình, thương một loài hoa.

Mỹ Tho, ngày 12/3/2017`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ lặng lẽ mở ra từ cảnh đêm nhìn trăng sao rồi dồn vào cảm giác trống trải của thân phận và thời gian trôi đi.",
      standoutImages: "Giọt buồn, tóc bạc sương gió, bóng nghiêng, chiếc giường đơn và tiếng thời gian buông rất nhẹ làm nỗi cô đơn trở nên hữu hình.",
      meaning: "Cô đơn ở đây là sự đối diện với chính mình, với mất mát của tình yêu và với tuổi đời đã đi qua nhiều gió táp.",
      memorableLine: "Chiếc giường đơn sao rộng vô cùng",
    },
    imageResearch: {
      moodKeywords: ["cô đơn", "đêm", "trăng sao", "thời gian"],
      referenceLinks: [],
      recommendedScene: "Đêm tĩnh, ánh trăng lạnh, không gian rộng để nhấn sự lẻ loi và tiếng thở dài.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "bi-ngan-hoa",
    title: "Bỉ ngạn hoa",
    tag: "Thơ chiêm nghiệm",
    summary: "Mượn biểu tượng bỉ ngạn hoa và Vong Xuyên, bài thơ nói về tình yêu bị ngăn bởi những khoảng cách không thể vượt qua.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 9/7/2019",
    cardImage: "/images/poems/bi-ngan-hoa.png",
    heroImage: "/images/poems/bi-ngan-hoa.png",
    audioUrl: "/audio/bi-ngan-hoa.m4a",
    hasAudio: true,
    content: `Bỉ Ngạn hoa chia hai miền sinh - tử
Vong Xuyên giang đỏ rực cả dòng
Mạnh Bà canh xóa đi vùng thương nhớ
Ôi chữ tình sao quá mong manh
Bồ Tát ơi sao không thương cho trót
Lá và hoa hạnh ngộ chung cành
Khi yêu nhau, không xa dù nửa tấc
Sống đồng sàng, thác phải đồng quan
Tôi yêu em mà sao cứ trái ngang
Gần bên đó mà trùng trùng cách biệt
Bỉ Ngạn hoa ơi, bỉ đến bao giờ.

Mỹ Tho, ngày 9/7/2019`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ dồn nén, đi thẳng từ biểu tượng sinh tử tới câu hỏi đau đáu về một tình yêu gần mà không chạm tới.",
      standoutImages: "Bỉ ngạn hoa, Vong Xuyên giang, Mạnh Bà canh, lá và hoa không hạnh ngộ dựng nên một không gian truyền kỳ đậm màu chia cách.",
      meaning: "Tác phẩm dùng điển tích để nói về nỗi trái ngang của tình yêu: khao khát hợp nhất nhưng luôn bị ngăn bởi số phận.",
      memorableLine: "Gần bên đó mà trùng trùng cách biệt",
    },
    imageResearch: {
      moodKeywords: ["bỉ ngạn", "sinh tử", "trái ngang", "truyền kỳ"],
      referenceLinks: [],
      recommendedScene: "Không khí huyền ảo, gam đỏ sẫm và đen, nhấn cảm giác ngăn cách định mệnh.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "dung-than-nhien-nhu-the",
    title: "Đừng thản nhiên như thế",
    tag: "Thơ tình",
    summary: "Bài thơ là lời van nài sau một cuộc rời đi quá nhẹ của người kia, trong khi lòng người ở lại vỡ vụn vì những gì vừa chạm tới.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 26/9/2018",
    cardImage: "/images/poems/dung-than-nhien-nhu-the.png",
    heroImage: "/images/poems/dung-than-nhien-nhu-the.png",
    audioUrl: "/audio/dung-than-nhien-nhu-the.m4a",
    hasAudio: true,
    content: `Thản nhiên như chút gió tạt ngoài hiên
Thản nhiên đến - đi mặc người đón nhận
Không ở lại đâu, không đi về một hướng
Ôi chút gió vô tình, quật ngã đời tôi
Em cứ thản nhiên đi! Anh quen khóc lâu rồi
Giờ thêm chút nữa, cũng không nhiều, đừng sợ
Hương huệ ơi một đời ta nhớ
Tìm lại được rồi giờ sắp mất nữa sao
Ta đêm nay, nhớ lại đêm nào
Dưới gốc me keo, sân trường cao đẳng
Sợ em ngã, anh qua bàn tay nhỏ nhắn
Tưởng từ đây tay ở trong tay
Vậy mà rồi tay về tay người khác
Hôm qua em cho anh vòng tay xiết chặt
Nụ hôn ấm nồng, để chiều lại thản nhiên đi
Chuyến đi này dài khoảng mấy triệu dặm đây
Đôi ba vạn dặm em ơi chỉ là truyền thuyết
Anh tìm em cực khổ lắm mà
Đừng thản nhiên như thế lòng anh tan vụn hết.

Mỹ Tho, ngày 26/9/2018`,
    status: "published",
    analysis: {
      emotionFlow: "Cảm xúc dâng từ chua xót, trách móc đến gần như van nài, bởi người ở lại không chịu nổi sự bình thản của kẻ ra đi.",
      standoutImages: "Chút gió ngoài hiên, gốc me keo sân trường, bàn tay nhỏ nhắn, vòng tay xiết chặt và cuộc đi dài mấy triệu dặm làm vết thương rất cụ thể.",
      meaning: "Điều đau nhất không chỉ là mất nhau mà là cách một người rời đi quá nhẹ, như thể những gì vừa có chưa từng là gì cả.",
      memorableLine: "Đừng thản nhiên như thế lòng anh tan vụn hết.",
    },
    imageResearch: {
      moodKeywords: ["thản nhiên", "mất nhau", "sân trường", "tan vỡ"],
      referenceLinks: [],
      recommendedScene: "Gió nhẹ nhưng sắc, có cảm giác mong manh và đổ vỡ trong cùng một khung hình.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems.",
    },
  },
  {
    slug: "nho-mot-chut-gio-nhe",
    title: "Nhớ",
    tag: "Thơ nhớ",
    summary: "Một cơn gió nhẹ, tà áo và mùi hương đưa người thơ lạc vào tiên cảnh rồi quay lại với nỗi buồn chẳng thành đôi.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, ngày 17/4/2017",
    cardImage: "/images/poems/nho.png",
    heroImage: "/images/poems/nho.png",
    hasAudio: false,
    content: `Một chút gió nhẹ lướt qua
Lay lay khóm cúc trước hiên nhà
Mỏng tang cánh bướm, nghiêng, chấp chới
Khe khẽ cười, bối rối lòng ai
Rượu chưa kề môi mà sao say!
Chếnh choáng, bồng bềnh, ngửa nghiêng, bồi hồi
Một giấc mơ hoa, e ấp nụ cười
Mơ chiều chiều tóc bay theo gió
Chảy về anh quấn quýt chẳng rời ra
Tà áo dài cũng xô về một phía
Mang theo hương em ủ ngọt mê hồn

Để anh lạc vào vùng tiên cảnh
Lòng chơi vơi, cùng câu hát chơi vơi
"Em ơi, vì lỡ chẳng thành đôi:
Đêm đông bếp lửa tắt lịm rồi
Dốc bầu, rượu cạn, buồn hiu hắt
Lòng anh xót lắm hỡi em ơi"
Xin một chút, ơn trời mưa móc
Cho tình yêu có đất thăng hoa
Cho người luôn ở bên ta
Đời người có mấy mà xa nhau hoài.

Mỹ Tho, ngày 17/4/2017`,
    status: "published",
    analysis: {
      emotionFlow: "Bài thơ đi từ bối rối say men hương sắc đến mộng tưởng ngọt ngào, rồi lắng xuống trong nỗi tiếc một cuộc tình không thành.",
      standoutImages: "Khóm cúc, cánh bướm, tà áo dài, mùi hương và bếp lửa tắt lịm kết nối rất đẹp giữa mê say và hụt hẫng.",
      meaning: "Nỗi nhớ ở đây mang hai mặt: vừa nâng con người lên một tiên cảnh tình yêu, vừa kéo về thực tại rằng đời người ngắn mà vẫn cứ xa nhau.",
      memorableLine: "Đời người có mấy mà xa nhau hoài.",
    },
    imageResearch: {
      moodKeywords: ["nỗi nhớ", "gió nhẹ", "tà áo dài", "tiên cảnh"],
      referenceLinks: [],
      recommendedScene: "Ánh sáng mềm, có gió và hoa trước hiên, gợi cảm giác nhớ thương vừa ngọt vừa buồn.",
      licenseNote: "Dùng ảnh local đã có trong thư mục poems. Audio chưa gắn vì repo hiện chỉ có file nho.m4a của bài Nhớ cũ; nếu audio bài này là nội dung khác, dùng basename nho_2.m4a.",
    },
  },
];

export const featuredPoem = poems.find((item) => item.status === "published") ?? poems[0];

export const publishedPoems = poems.filter((item) => item.status === "published");

export function getPoemBySlug(slug: string) {
  return poems.find((item) => item.slug === slug);
}
