import { storyPosts } from "../src/data/contentLibrary";

const slugs = ["mui-rom-moi-sau-ngay-gat", "dem-mua-trong-can-nha-la"];

for (const slug of slugs) {
  const item = storyPosts.find(x => x.slug === slug);
  if (!item) {
    console.error(`Missing item: ${slug}`);
    continue;
  }
  console.log(`Slug: ${slug}`);
  console.log(`  hasAudio: ${item.hasAudio}`);
  console.log(`  audioUrl: ${item.audioUrl}`);
}
