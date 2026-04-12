import { introKeywords } from "@/data/homepageData";

export default function IntroSection() {
  return (
    <section className="py-20">
      <div className="site-shell">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <p className="eyebrow">Tinh thần dự án</p>
            <h2 className="mb-4 text-4xl text-[#3f2b20] sm:text-5xl">
              Không gian mang hồn quê trong sắc chiều
            </h2>
            <p className="text-base leading-8 text-[#604536] sm:text-lg">
              Góc Bình Yên hướng đến một trải nghiệm yên, ấm và có chiều sâu. Từng mảng nội dung đều ưu tiên sự
              mộc mạc của thơ, chuyện và ký ức quê nhà, để người xem không chỉ đọc mà còn thật sự cảm được một nhịp
              sống chậm giữa ngày dài.
            </p>
          </div>

          <aside className="soft-panel bg-[#eddccb] p-6">
            <h3 className="mb-4 text-3xl text-[#4c3123]">Từ khóa thương hiệu</h3>
            <ul className="grid gap-2 text-sm leading-7 text-[#5a4030] sm:text-base">
              {introKeywords.map((keyword) => (
                <li key={keyword} className="flex items-center gap-2">
                  <span className="text-[#8b5e3c]">•</span>
                  <span>{keyword}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
