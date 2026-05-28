import { chromium } from 'playwright';

async function checkPageImages() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({
    // Clear cache before each page load
    storageState: undefined
  });
  const page = await context.newPage();

  // Listen for failed requests (excluding non-image resources)
  const failedRequests = [];
  page.on('requestfailed', request => {
    const url = request.url();
    // Only track image failures
    if (/\.(png|jpg|jpeg|gif|webp|svg|ico)(\?|$)/i.test(url)) {
      failedRequests.push({
        url: url,
        failure: request.failure()?.errorText
      });
    }
  });

  const routes = [
    { path: '/ke-chuyen', name: 'Ke Chuyen Listing' },
    { path: '/tam-linh', name: 'Tam Linh Listing' },
  ];

  for (const route of routes) {
    const url = `https://www.hontho.com${route.path}`;
    console.log(`\n=== ${route.name} (${url}) ===`);

    failedRequests.length = 0;
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });

    // Wait for all images to be loaded
    await page.waitForTimeout(3000);

    // Get all images
    const images = await page.evaluate(() => {
      return [...document.querySelectorAll("img")].map(img => ({
        alt: img.alt,
        src: img.currentSrc || img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        loaded: img.complete && img.naturalWidth > 0
      }));
    });

    console.log(`\nTotal images: ${images.length}`);

    // Check domain patterns
    const r2Images = images.filter(img => img.src.includes('pub-a9e') && img.src.includes('r2.dev'));
    const localImages = images.filter(img => img.src.includes('www.hontho.com/images'));
    const nextImages = images.filter(img => img.src.includes('/_next/image'));
    const otherImages = images.filter(img => !img.src.includes('pub-a9e') && !img.src.includes('www.hontho.com/images') && !img.src.includes('/_next/image'));

    console.log(`R2 (pub-a9e...r2.dev): ${r2Images.length}`);
    console.log(`Local (www.hontho.com/images): ${localImages.length}`);
    console.log(`Next.js Image (/_next/image): ${nextImages.length}`);
    console.log(`Other: ${otherImages.length}`);

    // Images with naturalWidth = 0 (broken/not loaded)
    const brokenImages = images.filter(img => img.naturalWidth === 0);
    console.log(`\nImages with naturalWidth = 0: ${brokenImages.length}`);
    if (brokenImages.length > 0) {
      brokenImages.forEach(img => {
        console.log(`  - ${img.alt || '(no alt)'}: ${img.src}`);
        console.log(`    complete: ${img.complete}, naturalWidth: ${img.naturalWidth}, naturalHeight: ${img.naturalHeight}`);
      });
    }

    // Show all image details
    console.log(`\nAll images:`);
    images.forEach((img, i) => {
      const domain = img.src.includes('pub-a9e') && img.src.includes('r2.dev') ? 'R2' :
                    img.src.includes('www.hontho.com/images') ? 'LOCAL' :
                    img.src.includes('/_next/image') ? 'NEXT' : 'OTHER';
      console.log(`  ${i+1}. [${domain}] ${img.alt?.substring(0, 50) || '(no alt)'}: ${img.naturalWidth}x${img.naturalHeight}`);
    });

    // Show failed requests
    if (failedRequests.length > 0) {
      console.log(`\nFailed requests: ${failedRequests.length}`);
      failedRequests.forEach(req => {
        console.log(`  ✗ ${req.url}`);
        console.log(`    Error: ${req.failure}`);
      });
    } else {
      console.log(`\nFailed requests: 0`);
    }
  }

  await browser.close();
  console.log('\nDone.');
}

checkPageImages().catch(console.error);