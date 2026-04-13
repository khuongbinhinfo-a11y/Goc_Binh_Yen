import Image from "next/image";
import Link from "next/link";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { CONTACT_FORM_URL } from "@/data/homepageData";

const relatedPosts = [
  {
    title: "Gió sớm trên bến đò cũ",
    description: "Những lát cắt nhỏ của tuổi thơ, nơi tiếng mái chèo còn vang trong ký ức.",
    tag: "Kể chuyện",
  },
  {
    title: "Đêm yên và lời ru của nước",
    description: "Một bài viết nhẹ, dành cho những ai muốn thở chậm và nghe lòng mình dịu lại.",
    tag: "Góc chữa lành",
  },
  {
    title: "Mùa lúa chín và mùi khói bếp",
    description: "Sắc vàng cuối vụ chạm vào miền nhớ, gợi nên cảm giác ấm áp rất quê nhà.",
    tag: "Đọc thơ",
  },
];

export default function SampleArticlePage() {
  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/4.webp" alt="Chiều xuống bên bờ sông quê" fill priority className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#5a3a28]/36 via-[#4c3022]/48 to-[#2b1b14]/78" />

          <div className="site-shell relative z-10 py-16 sm:py-20 lg:py-24">
            <article className="max-w-4xl rounded-[2rem] border border-[#f2dcc3]/35 bg-[#4b2f20]/38 p-6 text-[#f6eadb] shadow-[0_24px_56px_rgba(34,22,16,0.38)] backdrop-blur-[5px] sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[#f3ddc2]">
                <Link href="/" className="transition hover:text-white">
                  Trang chủ
                </Link>
                <span aria-hidden="true">/</span>
                <span>Bài viết mẫu</span>
              </div>

              <p className="mb-3 inline-flex rounded-full border border-[#f7e3cb]/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4dcc0]">
                Đọc thơ
              </p>

              <h1 className="mb-4 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                Chiều xuống bên bờ sông quê
              </h1>

              <p className="max-w-3xl text-base leading-8 text-[#f6e8d8] sm:text-lg">
                Một bài viết dành cho những ai muốn thả nhịp sống chậm lại, lắng nghe tiếng nước chảy qua ký ức và tìm
                thấy sự bình yên trong những điều rất đỗi giản dị.
              </p>

              <div className="mt-6 grid gap-2 text-sm text-[#f2dbc2] sm:grid-cols-2 lg:grid-cols-4">
                <p>
                  <span className="font-semibold text-[#f8e8d5]">Tác giả:</span> Lê Dũng
                </p>
                <p>
                  <span className="font-semibold text-[#f8e8d5]">Giọng đọc:</span> Hồng Tâm
                </p>
                <p>
                  <span className="font-semibold text-[#f8e8d5]">Thời gian đọc:</span> 7 phút
                </p>
                <p>
                  <span className="font-semibold text-[#f8e8d5]">Ngày đăng:</span> 13.04.2026
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="border-y border-[#dfc3a8] bg-[#efe0cf] py-4">
          <div className="site-shell">
            <nav className="flex flex-wrap gap-2" aria-label="Hành động bài viết">
              <a
                href="#noi-dung-bai"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                Đọc bài
              </a>
              <a
                href="#nghe-xem"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                Nghe bản đọc
              </a>
              <a
                href="#nghe-xem"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                Xem bản kể
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgoc-binh-yen.vercel.app%2Fbai-viet-mau"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                Chia sẻ
              </a>
            </nav>
          </div>
        </section>

        <section id="noi-dung-bai" className="py-16">
          <div className="site-shell">
            <article className="mx-auto max-w-3xl rounded-[1.8rem] border border-[#d9ba9d] bg-[#fffaf4] p-6 shadow-soft sm:p-8 lg:p-10">
              <p className="text-lg leading-9 text-[#51392b]">
                Chiều xuống rất chậm trên mặt sông. Ánh nắng cuối ngày rơi thành những vệt mảnh, lấp lánh rồi tan đi như
                một lời chào nhẹ. Bên bờ cỏ, tiếng gió sột soạt qua hàng cây khiến lòng người tự nhiên dịu lại, như thể
                mọi mệt mỏi cũng biết tìm chỗ để lắng xuống.
              </p>

              <p className="mt-6 text-lg leading-9 text-[#51392b]">
                Có những ngày, ta không cần đi đâu xa để chữa lành. Chỉ cần ngồi yên trước một khoảng nước quen, nghe
                tiếng chim gọi nhau về tổ, nhớ mùi khói bếp từ căn nhà cũ, là đã thấy trái tim mình bớt chông chênh.
                Quê hương đôi khi không chỉ là nơi ta sinh ra, mà còn là nơi ta có thể trở về trong trí nhớ mỗi khi lòng
                chùng xuống.
              </p>

              <blockquote className="mt-8 rounded-2xl border-l-4 border-[#b87b50] bg-[#f7ede1] px-5 py-4 text-lg leading-8 text-[#5a3f2f]">
                “Có những chiều không cần nói gì nhiều, chỉ nghe tiếng nước chảy cũng đủ thấy lòng mình yên lại.”
              </blockquote>

              <h2 className="mt-10 text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">
                Khi ký ức trở thành một nơi trú ngụ
              </h2>

              <p className="mt-4 text-lg leading-9 text-[#51392b]">
                Những câu thơ, những câu chuyện nhẹ nhàng không cố gắng làm điều gì quá lớn. Chúng chỉ âm thầm mở ra một
                góc nhỏ để người đọc ngồi lại với chính mình. Trong nhịp sống vội, đôi khi một đoạn chữ vừa đủ cũng đã
                là một bàn tay đặt nhẹ lên vai, nhắc ta thở sâu hơn và đi chậm lại.
              </p>
            </article>
          </div>
        </section>

        <section id="nghe-xem" className="bg-[#e9dac9] py-16">
          <div className="site-shell">
            <div className="mb-6">
              <p className="eyebrow">Đa nền tảng nội dung</p>
              <h2 className="text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">Nghe và xem nội dung này</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="soft-panel bg-[#fffaf5] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#916448]">Nghe bản đọc</p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#4a2f20]">Một giọng đọc chậm và ấm</h3>
                <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">
                  Dành cho lúc chiều muộn hoặc trước giờ nghỉ, khi bạn muốn lắng lại và nghe câu chữ chạm vào ký ức.
                </p>
                <p className="mt-2 text-sm font-medium text-[#7b563c]">Thời lượng: 08:20</p>
                <a
                  href="#"
                  className="mt-5 inline-flex rounded-full bg-[#8b5e3c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#75492c]"
                >
                  Mở bản nghe
                </a>
              </article>

              <article className="soft-panel bg-[#fffaf5] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#916448]">Xem bản kể</p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#4a2f20]">Khung hình kể chuyện quê</h3>
                <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">
                  Phiên bản kể chuyện bằng hình ảnh chuyển động nhẹ, giữ trọn tinh thần chậm, sâu và bình yên.
                </p>
                <p className="mt-2 text-sm font-medium text-[#7b563c]">Thời lượng: 10:05</p>
                <a
                  href="#"
                  className="mt-5 inline-flex rounded-full bg-[#8b5e3c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#75492c]"
                >
                  Mở video
                </a>
              </article>
            </div>
          </div>
        </section>

        <section id="lien-quan" className="py-16">
          <div className="site-shell">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">Nội dung liên quan</h2>
              <Link href="/" className="text-sm font-semibold text-[#8b5e3c] transition hover:text-[#6e442b]">
                Về trang chủ
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedPosts.map((post) => (
                <article key={post.title} className="soft-panel bg-white/80 p-5">
                  <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#82573a]">
                    {post.tag}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#4a2f20]">{post.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#654939]">{post.description}</p>
                  <a href="#" className="mt-4 inline-flex text-sm font-semibold text-[#8b5e3c] transition hover:text-[#70472f]">
                    Xem chi tiết
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <div className="rounded-[1.8rem] border border-[#d8b89b] bg-[#f8efe5] p-7 shadow-soft sm:p-9">
              <p className="eyebrow mb-2">Kết nối cùng Góc Bình Yên</p>
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">
                Gửi lời nhắn hoặc chia sẻ nội dung bạn muốn chúng tôi lắng nghe
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#654939] sm:text-base">
                Nếu bạn muốn gửi góp ý, đề xuất nội dung hoặc chia sẻ thơ và truyện của mình, hãy mở biểu mẫu liên hệ để
                điền thông tin.
              </p>
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#764a2f]"
              >
                Mở biểu mẫu liên hệ
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}