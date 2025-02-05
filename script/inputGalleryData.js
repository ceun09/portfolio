window.addEventListener('load', ()=> {
  galleryFunc()
})

function galleryFunc() {
  const gallery = document.querySelector('.mainPortfolio .gallery-wrap');
  const galleryItems = gallery.querySelectorAll('.item');
  let name, path, thumb;
  
  galleryItems.forEach((item) => {
    thumb = item.querySelector('.img-area');

    // data-name 받아옴
    name = item.getAttribute('data-name');

    // thumbnail 경로 지정
    if(name) {
      path = "../images/thumbnail/th_"+name+".jpg";
    }

    // data-name이 지정되고, 경로가 유효한 경우만 실행
    if(path) {
      thumb.style.backgroundImage = 'url('+path+')';
    }

    thumb = null;
    name = null;
    path = null;
  })

}


