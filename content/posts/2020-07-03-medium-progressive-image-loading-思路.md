---
title: Medium Progressive Image Loading 思路
author: Log
type: post
date: 2020-07-03T12:56:34.382Z
url: medium-progressive-image-loading
categories:
  - coding
tags:
  - blog
  - website
  - lazy-loading
featured_image: XD
---
不知道要打什麼內容，就用幾張圖來占版面好了。( ͡° ͜ʖ ͡°)
一個頁面太多圖片的話，載入網頁一定會很卡，Lazy Loading 就是一個很常用的小技巧，讓使用者快看到圖片的時候才進行載入，這樣效果會好很多。
在 [Page Load Optimization by Progressive Image Loading (like Medium)](https://www.botreetechnologies.com/blog/page-load-optimization-by-progressive-image-loading-like-medium) 文內提到有三種 Image Render 方式：

1. [Medium Progressive Image Loading](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)
2. [Lazy Loading](https://en.wikipedia.org/wiki/Lazy_loading)
3. [Facebook’s 200 bytes Technique](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/)

# Native Lazy Loading

Lazy loading 其實它主要做的事情只有三件：

1. 不載入圖片
2. 監視圖片元件，判斷是否進入到畫面
3. 元素進入畫面後，再載入圖片

目前  [Can I Use](https://caniuse.com/#feat=loading-lazy-attr)  網站顯示幾間主流的瀏覽器除了 Safari 外，皆以支援 Native tag 方式啟用此功能，但手機端與 IE 的支援就不知道會等到何時了。

## 啟用功能

這項功能沒有預設開啟，必須由使用者手動啟用才行。Chrome 或新版 edge 到網址輸入  `chrome://flags`，接著搜尋「lazy image」，再啟用這功能：

* Enable lazy image loading  *(#enable-lazy-image-loading)*

甚至可以對所有圖片強制開啟呢！

## 使用方法

在 HTML 的  `<img>`  標籤加上  `loading="lazy"`  ：

```
<img src="my-image.jpg" loading="lazy">
```

## 判斷瀏覽器是否支援

```
if ('loading' in HTMLImageElement.prototype) {  
    // 支援原生 lazy loading  
} else {  
    // 不支援，改用其他備案  
}
```

# Medium Progressive Image Loading

逛 Medium 時候會發現他做的 Lazy Loading 好像不太一樣，會有一個模糊圖片，漸進式的變清晰顯示出來，在使用者體驗上感覺比較直覺，本質事實上還是 Lazy Loading。看上去很複雜，但就三個步驟：

1. 將圖片另存一份低品質或極小容量的圖片在原區塊裡
2. 監視畫面捕捉到低品質圖片，載入原圖
3. 原圖讀取完成時候透明度為 0，在區塊放入原圖，此時再調整透明度並覆蓋低品質圖片。

## Step 1

此步驟很多人會另存一份 10kb的小圖片之類的，但我是一個比較~~浪費流量~~無聊的人。（･ω･）

面對日益臃腫肥胖的圖片目錄（？），我將網站圖片分成三個格式：

* jpg: 經過無損壓縮的 jpg 檔案原圖
* webp: 用來呈現於網頁上的圖片，不支援的時候就呈現 jpg 圖
* svg: 遮羞布、取代的小圖片，作法詳見「[把網站圖片轉成 Primitive Pictures 吧](https://iorz.cc/primitive-pictures/)」

其他作法就因人而異了。

而因為 Lazy Loading 的首要步驟就是**不載入原圖**，原本的 `<img>` 標籤不能用於放入原圖，僅能放入我們剛產生的 svg。再來，應對 Medium 的作法，我們得先把這個 svg 塞入原圖應該存在的容器中，讓他大小跟原圖一樣大，後續還原原圖時，才能無縫接軌。這裡我們容器用一個  `<div>` 標籤，並在上面用 `data-src` 標示了原圖的位置：

```
<div class="image-container" data-src="temp.jpg">
	<img class="image-placeholder" src="temp.svg" class="img-small">
</div>
```

## Step 2

監視畫面元素實作的方式很多，我這邊採用 Vanilla JavaScript 的 IntersectionObserver 方式。概念基本上就是觀測 HTML 上的 Element 有無進入顯示畫面，有的話載入原圖，用 `io.observe(item)` 來觀測目標。

```
const io = new IntersectionObserver(callback);
function callback(entries) {
    entries.forEach((item) => { 
        if (item.isIntersecting) { // Current element is intersecting

            let url = item.target.dataset.src
            io.unobserve(item.target)  // Stop observing element to avoid callback redundancy

            let imgLarge = new Image(); // Original Image
            imgLarge.src = url;
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
            imgLarge.src = "./404.jpg"
        }
        imgLarge.classList.add('image-picture');
        item.target.appendChild(imgLarge);
        
      }
    })
  }
```

## Step 3

調整一下 CSS

```
.image-container {
	position: relative;
	overflow: hidden;
}
.image-placeholder {
	position: relative;
	width: 100%;
}
.image-picture {
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	width: 100%;
	height: 100%;
	transition: opacity 1s linear;
}
.image-picture.image-loaded {
	opacity: 1;
}
```

大功告成！

# Summary

我做了什麼？

* Lazy Loading Image
* Optimization

Pros:

* 減少網頁讀取時間 > 加速網頁
* 減少網頁消耗流量 > 節省 $

Cons:

* 懶人不適合 ~~直接丟 CDN 啦( ﾟдﾟ)~~
* 多一份原圖小檔

有超多圖的網站基本上一定至少要做 Lazy Loading 啦。ಠ_ಠ