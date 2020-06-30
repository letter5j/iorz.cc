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
  // 處理 MENU
  let menuBtn = document.querySelector('.hamburger');
  let menuContainer = document.querySelector('.menu-container');
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('is-active');
    menuContainer.classList.contains('d-hide') ? fadeIn(menuContainer, 1, true) : fadeOut(menuContainer, 1, false);
  });

}

// 初始化圖片，並隱藏
function processImg() {
  let imgArr = document.querySelectorAll('.card img');
  const io = new IntersectionObserver(callback);
  // let ings = document.querySelectorAll('[data-src]') // 将图片的真实url设置为data-src src属性为占位图 元素可见时候替换src
  
  function callback(entries){  
    entries.forEach((item) => { // 遍历entries数组
      if(item.isIntersecting){ // 当前元素可见
        item.target.src = item.target.dataset.src  // 替换src
        io.unobserve(item.target)  // 停止观察当前元素 避免不可见时候再次调用callback函数


        // 顯示SPINNER並隱藏圖片
        item.target.style.display = "none";
        let spinner = document.querySelector('div#' + item.target.id)
        spinner.style.display = "block";
        checkImgLoad(item.target.getAttribute("src"), item.target.id, returnOriginalImg);
      }	
    })
  }
  
  imgArr.forEach((item, index)=>{  // io.observe接受一个DOM元素，添加多个监听 使用forEach
    item.dataset.src = item.src  // 替换src
    item.src = ""
    
    item.id = "img" + index;


    const spinner = document.createElement('div');
    const bounce1 = document.createElement('div');
    const bounce2 = document.createElement('div');
    spinner.id = "img" + index;
    spinner.className = 'spinner';
    bounce1.className = 'double-bounce1';
    bounce2.className = 'double-bounce2';
    spinner.appendChild(bounce1);
    spinner.appendChild(bounce2);

    // 插入在圖片前面 並隱藏SPINNER
    if (item.parentNode) {
      item.parentNode.insertBefore(spinner, item);
      spinner.style.display = "none";
    }
    io.observe(item)
  })
    
}

// 判斷是否載入完成圖片  
function checkImgLoad(url, imgid, callback) {
  let img = new Image();

  img.onload = function () {
    if (img.complete == true) {
      callback(img, imgid);
    }
  }
  //如果因為網路原因發生異常，則載入圖片
  img.onerror = function () {
    img.src = "./img/404.jpg"
  }
  img.src = url;
}

//顯示圖片 移除Spin  
function returnOriginalImg(obj, imgid) {
  let img = document.querySelector('img#' + imgid)
  img.style.display = "block";
  img.classList.add('animated', 'fast', 'jackInTheBox')

  document.querySelector('div#' + imgid).parentNode.removeChild(document.querySelector('div#' + imgid));
}


function fadeIn(elem, iterations, isHide) {
  isHide ? elem.classList.toggle('d-hide') : null;

  let keyframes = [{
      opacity: '0',
      offset: 0
    },
    {
      opacity: '1',
      offset: 1
    }
  ];
  let timing = {
    duration: 300,
    iterations: iterations
  };
  elem.animate(keyframes, timing);
  return true;
}

function fadeOut(elem, iterations, isHide) {
  let keyframes = [{
      opacity: '1',
      offset: 0
    },
    {
      opacity: '0',
      offset: 1
    }
  ];
  let timing = {
    duration: 300,
    iterations: iterations
  };
  elem.animate(keyframes, timing).onfinish = () => {
    isHide ? null : elem.classList.toggle('d-hide');
  };
  return true;
}