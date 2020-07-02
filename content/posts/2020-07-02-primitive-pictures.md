---
title: 把網站圖片轉成 Primitive Pictures 吧
author: Log
type: post
date: "2020-07-02T21:13:13+08:00"
url: primitive-pictures
categories: 
    - Coding
tags: 
    - Primitive
    - Website
    - Blog
featured_image: "https://pic.iorz.cc/primitive-pictures/1.jpg"

---

身為一個懶人，很久沒寫文章也是一件很正常的事情。

身為一個懶人，用一堆圖片來充當文章的內容也是一件很正常的事情。

但是會不會網站圖片放太多，開個網頁變得很笨重啊？

來看看以前的文《[屍體派對：血之覆蓋 Chapter 2 食完心得 – 破「繭」而出的屍塊](https://iorz.cc/corpse-party-bloodcovered-repeated-fear-chapter-2/)》，稍微看了一下文件目錄下的圖片容量，竟然高達　100mb！只是看一篇小文章耗費這麼多流量好像不合道理。

身為一個懶人，實在懶得對網站的圖片優化，很想全部丟 Image optimized CDN，但仔細想想口袋好像不夠支持我這麼做。

反正整個 Blog 文章數目也不多，不如自己全轉成 WebP 格式上傳到圖床好了。後來發現，載入網頁不做 Lazy Loading 好像還是太笨重了些，尤其部分文章的圖片來源是相機，一張檔案大小很是可觀，於是又做了一些優化，這部分以後再說吧。 :)

以上都不是今天的重點，在做 Lazy Loading 的時候，我就在想怎樣的呈現方式會讓讀者有比教好一點的感受。

# Primitive Pictures

身為一個攻城獅，常常打開 Medium 看看廢文也是一件很正常的事情。

我觀察到 Medium 的作法是先 loading 一個模糊版圖片，這個圖片檔案相對於原圖來說很小，所以在 Render HTML 的階段可以立即載入完成，對瀏覽的體驗影響不大。

於是乎我就如法炮製了，但是我發現一個問題！在原圖檔案容量偏大的情況下（幾mbs），即使做了高比率的模糊處理，檔案容量仍舊佔用了幾百 kbs。

在東逛逛西逛逛的時候，我發現了 Primitive 這專案。

*source: [https://github.com/fogleman/primitive](https://github.com/fogleman/primitive)*

這類型的圖片，以各種三角形或圓形等等去拼裝成你輸入的原圖，聽起來很像蒙太奇對吧！

這個開源專案是以 Golang 寫成的，不過以使用來說其實你也不太需要懂 Golang。( ͡° ͜ʖ ͡°)

用法也很簡單，直接在 Commend Line 下指令就可以：

```
primitive -i input.png -o output.png -n 100
```

剩下的自己跑去 Github 看囉。

他支援輸出向量 svg 格式，在沒有 iterations 太多的情況下，檔案容量可以很輕鬆控制在 100kbs 內。

# Summary

我做了什麼？

 - 把網站圖片做了一份 Primitive Pictures 版，效果請見網站內各文章

Pros:

 - 做 Lazy Loading 的預覽圖有較好的體驗。

Cons:
 
 - 手工處理，懶人不適合。

Other options？

 - Nodejs:[https://ondras.github.io/primitive.js/](https://ondras.github.io/primitive.js/)
 - Python:[https://github.com/dyf/primopt](https://github.com/dyf/primopt)