import https from 'https';

const urls = [
  'https://pub-a9e671dd309348caa85e940ff8ac8226.r2.dev/audio/tam-linh/nhan-qua-trong-mot-bua-com.mp3',
  'https://pub-a9e671dd309348caa85e940ff8ac8226.r2.dev/audio/ke-chuyen/con-duong-dat-sau-mua-nuoc-noi.mp3',
];

function head(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({ url, status: res.statusCode, headers: res.headers });
    });
    req.on('error', (err) => resolve({ url, error: String(err) }));
    req.end();
  });
}

(async () => {
  for (const u of urls) {
    const r = await head(u);
    console.log(r);
  }
})();
