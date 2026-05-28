import { chromium } from 'playwright';

async function checkOgImages() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext();
  const page = await context.newPage();

  const routes = [
    { path: '/', name: 'Homepage' },
    { path: '/doc-tho', name: 'Doc Tho Listing' },
    { path: '/ke-chuyen', name: 'Ke Chuyen Listing' },
    { path: '/tam-linh', name: 'Tam Linh Listing' },
    { path: '/doc-tho/dong-song', name: 'Doc Tho Detail' },
    { path: '/ke-chuyen/ben-do-cu-qua-mot-mua-mua', name: 'Ke Chuyen Detail' },
    { path: '/tam-linh/mot-ngay-im-lang-ben-song', name: 'Tam Linh Detail' },
  ];

  const results = [];

  for (const route of routes) {
    const url = `https://www.hontho.com${route.path}`;
    console.log(`\nChecking: ${route.name} (${url})`);

    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Get og:image meta tag
      const ogImage = await page.$eval('meta[property="og:image"]', el => el.content).catch(() => 'NOT FOUND');
      const twitterImage = await page.$eval('meta[name="twitter:image"]', el => el.content).catch(() => 'NOT FOUND');

      console.log(`  og:image: ${ogImage}`);
      console.log(`  twitter:image: ${twitterImage}`);

      // Check if R2 URL
      const isR2 = ogImage.startsWith('https://pub-a9e671dd309348caa85e940ff8ac8226.r2.dev');
      const isLocal = ogImage.startsWith('https://www.hontho.com/images');
      const isNextImage = ogImage.includes('/_next/image');

      console.log(`  Domain: ${isR2 ? 'R2 (pub-a9e...)' : isLocal ? 'LOCAL (www.hontho.com/images)' : isNextImage ? 'Next.js Image' : 'OTHER'}`);

      // Check if og:image is accessible
      if (ogImage.startsWith('http')) {
        try {
          const imageResponse = await page.goto(ogImage, { timeout: 10000 });
          const status = imageResponse?.status();
          console.log(`  og:image status: ${status} ${status === 200 ? '✓' : '✗ FAIL'}`);
        } catch (e) {
          console.log(`  og:image: ERROR - ${e.message}`);
        }
      }

      results.push({
        route: route.name,
        ogImage,
        isR2,
        isLocal,
      });
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
      results.push({ route: route.name, error: e.message });
    }
  }

  await browser.close();

  console.log('\n=== SUMMARY ===');
  console.log('Routes using R2 domain:');
  results.filter(r => r.isR2).forEach(r => console.log(`  ✓ ${r.route}: ${r.ogImage}`));

  console.log('\nRoutes still using local www.hontho.com/images:');
  results.filter(r => r.isLocal).forEach(r => console.log(`  ✗ ${r.route}: ${r.ogImage}`));

  console.log('\nErrors:');
  results.filter(r => r.error).forEach(r => console.log(`  ✗ ${r.route}: ${r.error}`));
}

checkOgImages().catch(console.error);