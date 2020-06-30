---
title: ThisIsOrz 颯爽登場，Material Design 的佈景主題
author: Log
type: post
date: "2017-03-06T17:31:13+08:00"
url: thisisorz
categories: 
    - Coding
tags: 
    - Material
    - Materialize
    - php
    - Theme
    - ThisIsOrz
    - Wordpress
featured_image: "https://pic.iorz.cc/thisisorz/01.jpg"

---

好吧，最近花了一些休閒時間研究了一下 WordPress ，原本一直寄居在其他開發者的佈景主題之下實在覺得很不好受，經過輾轉反側一個個難熬的夜晚，我決定自己開發一個 Theme 專屬給自己的網誌專用。

最近第一版本可上線版終於完成了，這個版本如同你們所見實在是一個非常簡潔的版本，且整體樣式參考了許多佈景主題，但主題就跟開發者一樣，簡單又快速。（呃？）

<!--more-->

事實上，我對於 PHP 語言並不是很熟悉，畢竟之前都是在純寫 JavaScript 等，但對於  Wordpress 主題開發而言，PHP 的熟稔程度並不是非常重要，<del>重要的是我愛妳</del>重要的是要有耐心一步步帶領你的佈景主題開發完成。

# 概覽

> 主題名稱：ThisIsOrz
> 
> 版本：1.0
> 
> 格局：首頁兩欄式、其他頁面單欄式、全站 RWD 自行調整顯示風格
> 
> 使用框架：[Materialize][1]
> 
> 字體：信黑體*、[Google Fonts 思源字體][2]
> 
> <span style="font-size: 8pt;"><del>*信黑體為商業字體，窮學生的我是偷渡版本的不要吉我，然後因為本地端載入很慢我強烈考慮要拿掉</del></span>

&nbsp;

我來說說開發這個佈景主題用到的設計框架好了。

在開發主題的時候，我實在是很懶得慢慢雕刻 Css 很想撿現成的前端設計框架使用，然而靈機一動，好像沒弄過什麼 Material 風格的網站，這真是令我難以忍受，立馬搜尋相關框架。

事實上很多大神們發布了許多關於 Material 的框架，在此也不多價贅述，我使用的是 Materialize 這款框架，原因無他，只要載入一個 Css 與 js 檔即可開始使用。

[![][image2]][image2]

&nbsp;

# 首頁

首頁採雙欄式設計，為一般網誌常見的設計樣式，方便第一次進入網站的使用者獲取新文章或分類，並立刻理解網站的目的與內容，在低解析度時候，自動調整為單欄式頁面，方面讀者閱讀。

[![][image3]][image3]

&nbsp;

# 邊攔

好吧因為之前頗少使用雙欄式設計，老實說邊欄一直都不知道放些什麼，不過在連結的 `Hover`、`Focus` 屬性上做過樣式調整，整體看起來比較舒服。之後會慢慢增加邊欄的資訊內容。

[![][image4]][image4]

&nbsp;

# 文章底部＆作者資訊欄位＆留言區塊

文章底部提供了分類與標籤的 chips，不得不說，為了取得文章的標籤或分類，Wordpress 並沒有內建提供直接增加 `<a>` class 的 API，所以必須自行重寫取得印出的方式。<del>作者資訊欄位我還在思考可以放些什麼來招搖撞騙</del>。文章底部的留言區塊引進了 Facebook 的應用程式，節省了網站流量與降低效能，並可以直接提供最基本的垃圾留言防護，還能同步粉絲團呢！

[![][image5]][image5]

&nbsp;

# 分類頁面

好啦這頁有點醜我在改改看。不過主要想法是提供一小個一小個區塊。方便快速瀏覽。

[![][image6]][image6]

&nbsp;

&nbsp;

# 下載分享？

都說了是自用版本，別跟我請求感謝～

等 2.0 版本問世，說不定就會開放大家使用了。

&nbsp;

以上謝謝大家<del>，這篇文章與主題都是趁著上班時間弄出來的哈哈哈哈哈，叫我偷懶王</del>。

 [1]: http://materializecss.com/
 [2]: https://fonts.googleapis.com/earlyaccess/notosanstc.css
 [image1]: https://pic.iorz.cc/thisisorz/01.jpg
 [image2]: https://pic.iorz.cc/thisisorz/02.jpg
 [image3]: https://pic.iorz.cc/thisisorz/03.jpg
 [image4]: https://pic.iorz.cc/thisisorz/04.jpg
 [image5]: https://pic.iorz.cc/thisisorz/05.jpg
 [image6]: https://pic.iorz.cc/thisisorz/06.jpg

