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
};

export const poems: PoemItem[] = [
  {
    slug: "khoang-cach-vo-hinh",
    title: "Khoảng cách vô hình",
    tag: "Thơ tình",
    summary: "Nỗi nhớ dài theo một mối tình xa, nơi niềm tin được giữ lại giữa nhiều vết đau âm thầm.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 23/9/2018",
    cardImage: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format\u0026fit=crop\u0026w=1200\u0026q=80",
    heroImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format\u0026fit=crop\u0026w=1600\u0026q=80",
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
    cardImage: "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format\u0026fit=crop\u0026w=1200\u0026q=80",
    heroImage: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format\u0026fit=crop\u0026w=1600\u0026q=80",
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
    cardImage: "/images/4.webp",
    heroImage: "/images/4.webp",
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
    cardImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format\u0026fit=crop\u0026w=1200\u0026q=80",
    heroImage: "https://images.unsplash.com/photo-1457364559154-aa2644600ebb?auto=format\u0026fit=crop\u0026w=1600\u0026q=80",
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
    cardImage: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format\u0026fit=crop\u0026w=1200\u0026q=80",
    heroImage: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format\u0026fit=crop\u0026w=1600\u0026q=80",
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
    cardImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format\u0026fit=crop\u0026w=1200\u0026q=80",
    heroImage: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format\u0026fit=crop\u0026w=1600\u0026q=80",
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
    cardImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format\u0026fit=crop\u0026w=1200\u0026q=80",
    heroImage: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format\u0026fit=crop\u0026w=1600\u0026q=80",
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
    cardImage: "https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format\u0026fit=crop\u0026w=1200\u0026q=80",
    heroImage: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format\u0026fit=crop\u0026w=1600\u0026q=80",
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
    title: "Thêm",
    tag: "Thơ đêm",
    summary: "Một bản tình ca đêm trăng với nỗi nhớ càng thêm dày, càng thêm sâu qua từng nhịp thơ.",
    author: "Lê Dũng",
    locationDate: "Mỹ Tho, 12 giờ đêm, 5/3/2020",
    cardImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format\u0026fit=crop\u0026w=1200\u0026q=80",
    heroImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format\u0026fit=crop\u0026w=1600\u0026q=80",
    content: "Thêm nghe con nước vỗ bờ\nBóng bần rơi nhẹ, thẫn thờ dòng sông\nThêm nhìn đom đóm kết vòng\nMột miền sông nước bềnh bồng ngọc châu\nVẳng nghe thánh thót đàn bầu\nMênh mông câu hát, cung sầu cung thương\nNhìn trăng mà nhớ mà thương\nGởi theo con gió lời thương, ngọt ngào\nEm ơi trăng ở trên cao\nTrăng còn hiểu được vì sao anh buồn\nTrăng mang chín nhớ mười thương\nNhuộm má thêm mịn, môi hồng thêm thơm\nThèm gối đầu lên tay em\nXông hương tóc, khát thèm trần dáng\nĐêm nay anh gởi theo trăng\nTám thương, chín nhớ, mười mong cận kề\nTrăng ơi gởi cả lời thề\nMãi thương mãi nhớ, mãi chờ mãi mong.",
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
  }
];

export const featuredPoem = poems.find((item) => item.status === "published") ?? poems[0];

export const publishedPoems = poems.filter((item) => item.status === "published");

export function getPoemBySlug(slug: string) {
  return poems.find((item) => item.slug === slug);
}
