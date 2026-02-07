/**
 * Utils
 */

// Throttle
//
const throttle = (callback, limit) => {
  let timeoutHandler = null;
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        callback();
        timeoutHandler = null;
      }, limit);
    }
  };
};

// addEventListener Helper
//
const listen = (ele, e, callback) => {
  if (document.querySelector(ele) !== null) {
    document.querySelector(ele).addEventListener(e, callback);
  }
}

/**
 * Functions
 */

// Auto Hide Header
//
let header = document.getElementById('site-header');
let lastScrollPosition = window.pageYOffset;

const autoHideHeader = () => {
  let currentScrollPosition = Math.max(window.pageYOffset, 0);
  if (currentScrollPosition > lastScrollPosition) {
    header.classList.remove('slideInUp');
    header.classList.add('slideOutDown');
  } else {
    header.classList.remove('slideOutDown');
    header.classList.add('slideInUp');
  }
  lastScrollPosition = currentScrollPosition;
}

// Mobile Menu Toggle
//
let mobileMenuVisible = false;

const toggleMobileMenu = () => {
  let mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuVisible == false) {
    mobileMenu.style.animationName = 'bounceInRight';
    mobileMenu.style.webkitAnimationName = 'bounceInRight';
    mobileMenu.style.display = 'block';
    mobileMenuVisible = true;
  } else {
    mobileMenu.style.animationName = 'bounceOutRight';
    mobileMenu.style.webkitAnimationName = 'bounceOutRight'
    mobileMenuVisible = false;
  }
}

// Featured Image Toggle
//
const showImg = () => {
  document.querySelector('.bg-img').classList.add('show-bg-img');
}

const hideImg = () => {
  document.querySelector('.bg-img').classList.remove('show-bg-img');
}

// ToC Toggle
//
const toggleToc = () => {
  document.getElementById('toc').classList.toggle('show-toc');
}


if (header !== null) {
  listen('#menu-btn', "click", toggleMobileMenu);
  listen('#toc-btn', "click", toggleToc);
  listen('#img-btn', "click", showImg);
  listen('.bg-img', "click", hideImg);

  document.querySelectorAll('.post-year').forEach((ele) => {
    ele.addEventListener('click', () => {
      window.location.hash = '#' + ele.id;
    });
  });

  window.addEventListener('scroll', throttle(() => {
    autoHideHeader();

    if (mobileMenuVisible == true) {
      toggleMobileMenu();
    }
  }, 250));
}


// Native
// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}

function eventHandler() {


  // 處理圖片
  processImg();
  processYoutube();


}


function processYoutube() {

  let div, n,
    v = document.getElementsByClassName("youtube-player");
  for (n = 0; n < v.length; n++) {
    div = document.createElement("div");
    div.setAttribute("data-id", v[n].dataset.id);
    div.innerHTML = labnolThumb(v[n].dataset.id);
    div.onclick = labnolIframe;
    v[n].appendChild(div);
  }

  function labnolThumb(id) {
    let thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
      play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
  }
  function labnolIframe() {
    let iframe = document.createElement("iframe");
    let embed = "https://www.youtube-nocookie.com/embed/ID?autoplay=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
  }

}

async function WebpIsSupported() {
  // If the browser doesn't has the method createImageBitmap, you can't display webp format
  if (!self.createImageBitmap) return false;

  // Base64 representation of a white point image
  const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';

  // Retrieve the Image in Blob Format
  const blob = await fetch(webpData).then(r => r.blob());

  // If the createImageBitmap method succeeds, return true, otherwise false
  return createImageBitmap(blob).then(() => true, () => false);
}

// 初始化圖片，並隱藏
async function processImg() {


  let supportsWebP = await WebpIsSupported()

  let imgArr = document.querySelectorAll('.site-main .image-container');
  const options = {
    rootMargin: '300px 100px 300px'
  }
  const io = new IntersectionObserver(callback, options);


  function callback(entries) {
    entries.forEach((item) => { // 遍历entries数组
      if (item.isIntersecting) { // 当前元素可见
        let size = item.target.getBoundingClientRect()

        let url = "https://cf.jare.io/?u=";

        // let url = "https://cdn.statically.io/img/"
        // let url = "https://wsrv.nl/?url="

        let temp = item.target.dataset.src.replace("https://", "")
        // item.target.dataset.src = item.target.dataset.src.replace("https://", "")
        // supportsWebP ? url += item.target.dataset.src.replace("jpg", "webp") : url += item.target.dataset.src
        url += item.target.dataset.src // for cf
        // url += temp + "?w=" + size.width + "&h=" + size.height + "f=auto" // for staticly
        // url += temp + "&w=" + size.width + "&h=" + size.height + "&output=webp" // for wsrv.nl
        // item.target.src = url // 替换src

        io.unobserve(item.target)  // 停止观察当前元素 避免不可见时候再次调用callback函数

        let imgLarge = new Image();
        imgLarge.src = url;
        // imgLarge.onload = function () {
        //   imgLarge.classList.add('image-loaded');  
        // };
        imgLarge.onload = e => {
          // avoid blocking the main thread
          const onDecode = () => {
            imgLarge.classList.add('image-loaded');
          };
          if (typeof imgLarge.decode === 'function') {
            // Safari currently throws exceptions when decoding svgs.
            // We want to catch that error and allow the load handler
            // to be forwarded to the onLoad handler in this case
            imgLarge.decode().then(onDecode, () => {
              console.log("Decoded failed!")
              onDecode()
            });
          } else {
            setTimeout(onDecode, 0);
          }
        };
        imgLarge.onerror = function () {
          imgLarge.src = "./404.jpg"
        }
        imgLarge.classList.add('image-picture');
        item.target.appendChild(imgLarge);
        // 顯示SPINNER並隱藏圖片
        // item.target.style.display = "none";
        // let spinner = document.querySelector('div#' + item.target.id)
        // spinner.style.display = "block";
        // checkImgLoad(item.target.getAttribute("src"), item.target.id, returnOriginalImg);
      }
    })
  }

  imgArr.forEach((item, index) => {  // io.observe接受一个DOM元素，添加多个监听 使用forEach


    item.id = "img" + index;


    // const spinner = document.createElement('div');
    // const bounce1 = document.createElement('div');
    // const bounce2 = document.createElement('div');
    // spinner.id = "img" + index;
    // spinner.className = 'spinner';
    // bounce1.className = 'double-bounce1';
    // bounce2.className = 'double-bounce2';
    // spinner.appendChild(bounce1);
    // spinner.appendChild(bounce2);

    // // 插入在圖片前面 並隱藏SPINNER
    // if (item.parentNode) {
    //   item.parentNode.insertBefore(spinner, item);
    //   // spinner.style.display = "none";
    // }

    io.observe(item)
  })

}
