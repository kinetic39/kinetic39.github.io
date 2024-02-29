
document.addEventListener('DOMContentLoaded', function() {
  const message = document.getElementById('message');
  const textCount = document.getElementById('textCount');

  let count = 0;
  message.addEventListener('input', function(){
    count = this.value.length;
    textCount.textContent = count
  })


  document.getElementById('send').addEventListener('click', function(e){
    e.preventDefault(); // フォームのデフォルトの送信を防ぐ

    if (count > 0) {
      // リンク生成
      console.log(message.value);

      const encodedMessege = encodeURIComponent(message.value);

      const blueSky = document.getElementById('bluesky');
      const twitter = document.getElementById('twitter');
      const vocalodon = document.getElementById('vocalodon');

      blueSky.href = 'https://bsky.app/intent/compose?text=' + encodedMessege;
      twitter.href = 'https://twitter.com/intent/tweet?text=' + encodedMessege;
      vocalodon.href = 'https://vocalodon.net/share?text=' + encodedMessege;
     
      document.getElementById('sendmsgbtns').style.display = 'block';
      


    }
  })
})
