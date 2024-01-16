---
title: Hello Hexo！
author: Hsin
date: "2017-01-24T15:39:28+08:00"
url: hello-hexo
categories: 
    - Coding
tags: 
    - Blog
    - Hexo
    - Wordpress
featured_image: "https://spaces.hightail.com/space/T5CLZ/files/fi-2171be9c-c13d-4105-8bd1-055815b9e6ba/fv-225a66b6-6672-4001-8ba4-7a449816f702/hello-hexo-0.jpg"


---

# 最近換換病又發作了啊！

From **WordPress** to **Hexo**.

我並不是對 WordPress 不滿意，只是想換。

寫這篇用來記錄一下 Blog 搬家的過程。

然後順便適應一下節儉到爆的 **Markdown** 語法。

<!--more-->

關於 Hexo

其實我滿久以前曾經使用過 **Hexo** 這個網誌框架，但那時候多半年少輕狂，對於程式語言所知甚少（雖然現在也不怎樣），但仍憑著熱血的青春嘗試著安裝了一次，然後覺得**「哇靠！不過是寫個部落格，幹嘛把自己搞得這麼麻煩？」**。

那時原以為初生之犢不畏虎，沒想到隔天嫌麻煩還是裝回了 **WordPress**。

**啊為什麼我離開了又回來？我在幹嘛？欲擒故縱？**

先來看看 **Hexo** 在幹嘛：

> 官網：<https://hexo.io/>
  
> 簡介：
  
> &#8211; Blazing Fast
  
> &#8211; Markdown Support
  
> &#8211; One-Command Deployment
  
> &#8211; Various Plugins

嗯，基本上有說跟沒說其實是一樣的 。

首先，他是基於 **node.js** 開發的，而這麼巧的是我最近也在研究 **nodejs**，真是巧呢。

安裝的過程利用 **npm** 套件管理工具其實非常的方便，基本上完全不用怎麼動腦就完成了。

```
$ npm install hexo-cli -g
$ hexo init blog
$ cd blog
$ npm install
$ hexo server
```

基本上輸入以上的指令，一個基本的 **Hexo** 網誌就這麼產生了。

不過，我們要從 WordPress 搬家的話，需要增加一些手續。

### 1. 首先安裝 hexo-migrator-wordpress ：

    $ npm install hexo-migrator-wordpress --save

### 2. 進入 WordPress 後臺管理，在「設定」-「匯出」可以把文章匯出成XML檔案

    $ hexo migrate wordpress <source>
    
    source 是 XML 檔案的存放目錄。

### 3. 生成靜態檔案：

    $ hexo generate ( hexo g )

### 4. 啟動 local server：

    $ hexo server

只能說 Hexo 搬家功能真的太方便了。

至於 Themes 的挑選我就不多說了，我覺得被主題設計更改折騰了有點久。

## Deploy

那麼要怎麼 deploy 你的網站呢？

老實說我覺得 Hexo 最大的優勢就是在於它可以輕鬆的部屬你的網誌在 Github 之類的免費穩定強大的服務，對於小資學生這實在是一大福音啊啊啊啊啊！！

### Hexo 提供了一鍵佈署到 Github 的功能。

如果使用 git 方式部署，執行 `npm install hexo-deployer-git --save` 指令來安裝插件。

去 Github 創建一個 repository，利用 GitHub Pages 要 bind 你的帳號還是 project 就隨你了。

開啟`_config.yml`，找到 `Deployment`，修改設定：

```
deploy:
type: git
repo: your git repo
branch: master //注意如果希望可以把整個 Hexo 備份上去的話建議這邊填 gh-pages<br />
```

因為我想順便把 Hexo 還有 Themes 等檔案一併備份，所以我 branch 是填 gh-pages ，而本地Git remote repository 則是 master。

之後只要執行

`$ hexo deploy`

就完成佈署了。

而現在，**黑函**就是佈署在 Github 上的哦。（其實我在 deploy 時候有遇到奇怪的 Bug 最後莫名其妙解決了。）

# 關於Markdown

老實說我超級不習慣啊啊啊啊啊啊啊啊啊。

寫這篇就是用 Markdown 的語法完成的，之前太習慣所見及所得的按鈕，現在要回歸原始，少了一堆方便的功能，需要自己寫 html 語法真的好麻煩。

更何況 Markdown 會自動清除空白行，所以以前濫用空白行來排版的壞習慣也該改一改了，也讓我得更認真面對自己寫的文字。

先這樣啦，主題布景之類的之後再慢慢調整好了。

[![](https://spaces.hightail.com/space/T5CLZ/files/fi-2171be9c-c13d-4105-8bd1-055815b9e6ba/fv-225a66b6-6672-4001-8ba4-7a449816f702/hello-hexo-0.jpg)](https://spaces.hightail.com/space/T5CLZ/files/fi-2171be9c-c13d-4105-8bd1-055815b9e6ba/fv-225a66b6-6672-4001-8ba4-7a449816f702/hello-hexo-0.jpg)

<!-- 
不過有些參數是不必要的，留下有用的就好了

 [![](/path/to/image.jpg "Image Title (optional)")](http://example.com/)
想用reference-style syntax方法如下

 [![][Image]][Link]
[Picture]: "/path/to/image.jpg" "Image Title (optional)"
[Link]: http://example.com/
-->