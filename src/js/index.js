function formatDateWithoutZeroPadding(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0から始まるため+1する
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

   // ゼロ埋め関数
   const zeroPad = (num) => num.toString().padStart(2, '0');

  // 組み立て
  return `${year}年${zeroPad(month)}月${zeroPad(day)}日 ${zeroPad(hours)}:${zeroPad(minutes)}`;
}

async function fetchRSSAndDisplay() {
  const rssUrl = 'https://corsproxy.io/?https%3A%2F%2Fnote.com%2Ftouch_wkm%2Frss';
  try {
    const response = await fetch(rssUrl);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const items = xmlDoc.querySelectorAll("item");
    let html = '';
    items.forEach(item => {
      const title = item.querySelector("title").textContent;

      if (!title.match('.*\\.\\.\\.')) {
        // 名前空間とタグ名を指定して要素を取得
        let thumbnail = item.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "thumbnail");
        if (thumbnail.length > 0) {
          thumbnail = thumbnail[0].textContent;
        } else {
          thumbnail = "src/image/no_images.png"
        }
        
        const link = item.querySelector("link").textContent;
        const pubDate = new Date(item.querySelector("pubDate").textContent);
        html += `
          <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="card" style="width: 18rem;">
                  <img src="${thumbnail}" loading="lazy" class="card-img-top" alt="『${title}』のサムネイル画像">
                  <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${formatDateWithoutZeroPadding(pubDate)}</h6>
                      <a href="${link}" class="card-link">記事を読む</a>
                  </div>
              </div>
          </div>
        `; 
      }
    });
    document.getElementById('rssFeed').innerHTML = DOMPurify.sanitize(html);
  } catch (error) {
    console.error('RSSフィードの取得に失敗しました:', error);
    document.getElementById('rssFeed').innerHTML = '記事一覧を取得できませんでした。';
  }
}

// ページの読み込みが完了したらRSSを取得
document.addEventListener('DOMContentLoaded', fetchRSSAndDisplay);
