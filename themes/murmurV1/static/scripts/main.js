// Native
// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}

function eventHandler() {

  /* 處理 navbar */

  let hamburger = document.querySelector(".hamburger");

  if (!hamburger.getAttribute("data-reload")) {
    let navside = document.querySelector("nav.side");
    let nav = document.querySelector(".navbar")
    let main = document.querySelector("main");
    let footer = document.querySelector("footer");
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle("is-active");
      nav.classList.toggle("nav-side-open");
      main.classList.toggle("nav-side-open");
      footer.classList.toggle("nav-side-open");
      navside.classList.toggle("nav-side-open");
      hamburger.setAttribute("data-reload", "true")

    });

    let navClass = document.querySelector(".navbar").classList;
    let navbarStart = document.querySelector(".navbar-start")

    window.addEventListener('scroll', function () {
      if (this.scrollY != 0) {
        if (navClass.contains('is-top')) {
          navClass.remove('is-top')

          navClass.add('not-top')
          navbarStart.classList.add("animated")
          navbarStart.classList.add("pulse")
        }
      } else {
        navClass.add('is-top')
        navClass.remove('not-top')
        navbarStart.classList.remove("animated")
        navbarStart.classList.remove("pulse")
      }

    });
  } else {
    let navside = document.querySelector("nav.side");
    let nav = document.querySelector(".navbar")
    let main = document.querySelector("main");
    let footer = document.querySelector("footer");
    hamburger.classList.remove("is-active");
    nav.classList.remove("nav-side-open");
    main.classList.remove("nav-side-open");
    footer.classList.remove("nav-side-open");
    navside.classList.remove("nav-side-open");

  }



  // 處理title-block 的 HOVER
  let title_block = document.querySelector(".title-block");
  let title_bg = document.querySelector(".banner-bg");
  if (isObject(title_block)) {
    title_block.addEventListener('mouseenter', function () {
      title_bg.classList.contains("banner-filter") ? title_bg.classList.remove("banner-filter") : null;

    });
    title_block.addEventListener('mouseleave', function () {
      title_bg.classList.contains("banner-filter") ? null : title_bg.classList.add("banner-filter");

    });

  }

  // 處理圖片
  processImg();
  processYoutube();
  // processComment();

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

// comment

function processComment() {
  /* reinit comment */

  let comment = document.querySelector("#commentblock")
  if (comment) {

    const io = new IntersectionObserver(callback);
    io.observe(comment)
    function callback(entries) {
      entries.forEach((item) => { // 遍历entries数组
        if (item.isIntersecting) { // 当前元素可见
          let commentScriptOri = document.body.querySelector("#comment-script")
          if (commentScriptOri) commentScriptOri.parentNode.removeChild(commentScriptOri);
          let commentScriptNew = document.createElement('script');
          commentScriptNew.setAttribute("id", "comment-script")
          commentScriptNew.setAttribute('data-timestamp', +new Date());
          // commentScriptNew.setAttribute("src", "/scripts/App.7b6824656b.js")
          var disqus_config = function () {
            this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
            };
          commentScriptNew.setAttribute("src", "https://murmurlog.disqus.com/embed.js")
          

          document.body.appendChild(commentScriptNew);
          io.unobserve(item.target)  // 停止观察当前元素 避免不可见时候再次调用callback函数
          
        }
      })
    }

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

  let imgArr = document.querySelectorAll('.card .image-container');
  const io = new IntersectionObserver(callback);

  function callback(entries) {
    entries.forEach((item) => { // 遍历entries数组
      if (item.isIntersecting) { // 当前元素可见

        let url = "https://cf.jare.io/?u=";
        supportsWebP ? url += item.target.dataset.src.replace("jpg", "webp") : url += item.target.dataset.src
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
            imgLarge.decode().then(onDecode, ()=>{
              console.log("Decoded failed!")
              onDecode()
            });
          } else {
            setTimeout(onDecode, 0);
          }
        };
        imgLarge.onerror = function () {
          imgLarge.src = "./images/404.jpg"
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

// 判斷是否載入完成圖片  
function checkImgLoad(url, imgid, callback) {
  let img = new Image();


  img.onload = e => {
    // avoid blocking the main thread
    const onDecode = () => callback(img, imgid);
    if (typeof img.decode === 'function') {
      // Safari currently throws exceptions when decoding svgs.
      // We want to catch that error and allow the load handler
      // to be forwarded to the onLoad handler in this case
      img.decode().then(onDecode, onDecode);
    } else {
      setTimeout(onDecode, 0);
    }
  };
  //如果因為網路原因發生異常，則載入圖片
  img.onerror = function () {
    img.src = "./images/404.jpg"
  }
  img.src = url;
}

//顯示圖片 移除Spin  
function returnOriginalImg(obj, imgid) {
  let img = document.querySelector('img#' + imgid)
  img.style.display = "block";
  if (!img.classList.contains('featured-image')) img.classList.add('animated', 'fast', 'jackInTheBox')

  document.querySelector('div#' + imgid).parentNode.removeChild(document.querySelector('div#' + imgid));
}

function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}