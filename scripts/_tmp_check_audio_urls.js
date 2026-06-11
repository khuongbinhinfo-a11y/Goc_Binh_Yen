const { getCloudAudioUrl, hasCloudAudio } = require('../src/data/cloudAudioManifest');
const slugs = [
  { type: 'spiritual', slug: 'nhan-qua-trong-mot-bua-com' },
  { type: 'story', slug: 'con-duong-dat-sau-mua-nuoc-noi' },
];
for (const item of slugs) {
  console.log(item.type, item.slug, hasCloudAudio(item.type, item.slug), getCloudAudioUrl(item.type, item.slug));
}
