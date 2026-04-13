import { FACEBOOK_URL } from "@/data/homepageData";

export default function SocialSection() {
  return (
    <section className="py-16">
      <div className="site-shell">
        <article className="soft-panel bg-[#4a2f20] px-6 py-10 text-[#f8ead8] sm:px-8">
          <p className="eyebrow text-[#ddb897]">Theo dõi mạng xã hội</p>
          <h2 className="mb-3 text-4xl font-semibold leading-tight text-[#fbe9d5] sm:text-5xl">
            Cùng đồng hành với Góc Bình Yên trên Facebook
          </h2>
          <p className="max-w-3xl text-sm leading-8 text-[#efd9c5] sm:text-base">
            Tụi mình cập nhật bài mới, lời đọc mới và những chia sẻ gần gũi hằng tuần tại fanpage chính thức.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="soft-button">
              Theo dõi trên Facebook
            </a>
            <p className="text-sm text-[#e4c9af]">Các kênh khác sẽ được cập nhật sau.</p>
          </div>
        </article>
      </div>
    </section>
  );
}