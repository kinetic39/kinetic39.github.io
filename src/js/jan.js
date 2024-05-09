function displayJAN() {
  // フォームから入力値を取得
  var janInput = document.getElementById('janInput').value;

  // 入力値の検証（指定された形式に一致するか確認）
  var pattern = /^\d{4}\s?-\s?\d{4}\s?-\s?\d{5}$/;
  if (!pattern.test(janInput)) {
    alert('入力形式が正しくありません。正しい形式: 1234-5678-90123');
    return;
  }

  var cleanInput = janInput.replace(/[\s-]/g, '');

  // 番号表示
  document.getElementById('janCode').innerText = '番号: ' + janInput + 'のバーコードを表示します。';
    
  // 画像としてのバーコードを表示
  var barcodeImageUrl = `https://inticket.sej.co.jp/order/barcode?Code=${cleanInput}`;
  var barcodeImage = document.getElementById('barcodeImage');
  var barcodeZones = document.querySelectorAll('.barcode-zone');
  barcodeImage.src = barcodeImageUrl;

  // 画像のロードを待ってから表示
  barcodeImage.onload = function() {
    barcodeZones.forEach(function(zone) {
      zone.style.display = 'unset'; // 画像が正しくロードされたら表示
  });
  };
  barcodeImage.onerror = function() {
    alert('バーコードの生成に失敗しました。');
  };
}

function resetForm() {
  window.location.reload(); // ページのリロード
}

document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('brightness-btn');
  if (btn) {
      btn.addEventListener('click', function() {
          try {
              // 画面の明るさを設定するAPIを使用しますが、このAPIはまだ実験段階であり、
              // すべてのブラウザやデバイスで利用可能ではないことに注意してください。
              navigator.wakeLock.request('screen').then(() => {
                  console.log('画面の明るさが最大に設定されました。');
              }).catch((error) => {
                  console.error('画面の明るさを調整できませんでした:', error);
              });
          } catch (error) {
              console.error('このブラウザでは画面の明るさの調整をサポートしていません。', error);
          }
      });
  } else {
      console.error('ボタン要素が見つかりません。');
  }
});
