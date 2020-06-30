---
title: DigitalOcean VPS 黑函悄悄的搬進來了
author: Log
type: post
date: "2017-02-05T22:34:13+08:00"
url: digitalocean-vps
categories: 
    - Coding
tags: 
    - DigitalOcean
    - Virtual Private Server
    - VPS
featured_image: "https://pic.iorz.cc/digitalocean-vps/00.jpg"

---

手邊剛好有 $55 的 DigitalOcean 額度可以使用，於是我開始使用了它的 VPS 服務。

DigitalOcean 算是一家有名的 VPS 主機商，他價格不貴，且全採用 SSD 固態硬碟，後臺設定也算是完整，以入門的角度來說非常適合第一次接觸VPS的人使用。

<!--more-->

我來稍微介紹一下 DigitalOcean VPS 的使用。

# Signup

## **[我的推薦連結][1]**

（我的推廣註冊連結，註冊會獲得 $10 的額度，當然我也會獲得一些好處。）

# Droplets

DigitalOcean VPS 以 Droplets為單位，可根據每一個 Droplets 自行設定不同系統或設定。

## Create Droplets

### Distributions OR One-click apps

DigitalOcean VPS 很方便了許多一鍵安裝的功能。Distributions 選項裡擁有幾項熱門的 Linux 系統，可根據自己使用習慣去安裝。One-click apps 則提供了許多常見的軟體，包含了常見的 LAMP、LEMP 與 Node.js等，甚至可直接安裝Wordpress（不過我沒去研究它是基於 Apache 還是 Nginx），不過這些方便的一鍵安裝都是在 Ubuntu 上運行的。

![https://pic.iorz.cc/digitalocean-vps/01.jpg](https://pic.iorz.cc/digitalocean-vps/01.jpg)

![https://pic.iorz.cc/digitalocean-vps/02.jpg](https://pic.iorz.cc/digitalocean-vps/02.jpg)

&nbsp;

### Choose a size

此處可設定欲建立的 Droplet 方案，如果是基本的網站，最小的方案足以應付，另外有高記憶體的方案可供使用。

![https://pic.iorz.cc/digitalocean-vps/03.jpg](https://pic.iorz.cc/digitalocean-vps/03.jpg)

&nbsp;

### Add block storage

DigitalOcean VPS 特別提供了一些儲存方案 Volume，適合需要大量儲存空間的使用者使用。

目前大容量儲存方案僅限於 FRA1、NYC1、SFO2這三處伺服器使用。

![https://pic.iorz.cc/digitalocean-vps/04.jpg](https://pic.iorz.cc/digitalocean-vps/04.jpg)

&nbsp;

&nbsp;

### Choose a datacenter region

有許多伺服器位置可供選擇，可依照網站的來源提供較好的連線使用，亞洲網站較適合使用美國或新加坡的主機。

![https://pic.iorz.cc/digitalocean-vps/05.jpg](https://pic.iorz.cc/digitalocean-vps/05.jpg)

&nbsp;

### Select additional options

細部有內部網路連線與備份、IPv6、User data（分析資料）可供使用。

需要注意的是，備份功能需要支付額外 20% 的月額，可於之後在後台開起功能。

![https://pic.iorz.cc/digitalocean-vps/06.jpg](https://pic.iorz.cc/digitalocean-vps/06.jpg)

&nbsp;

### Add your SSH keys

可在建立 Droplet 時，直接加入 SSH Keys 使用，不用進入系統再加入，非常方便。

當然你也可以選擇在進入系統後加入自己的公鑰。

![https://pic.iorz.cc/digitalocean-vps/07.jpg](https://pic.iorz.cc/digitalocean-vps/07.jpg)

&nbsp;

&nbsp;

## Complete

可在 Droplets 看見自己建立的 Droplet。

![https://pic.iorz.cc/digitalocean-vps/08.jpg](https://pic.iorz.cc/digitalocean-vps/08.jpg)

而進入詳細資訊有提供許多圖表與設定。

![https://pic.iorz.cc/digitalocean-vps/09.jpg](https://pic.iorz.cc/digitalocean-vps/09.jpg)

# 後記

前陣子把黑函轉回 WordPress 搬到了此處住宿（當然可以繼續用 Hexo，但是手癢又轉回 WordPress，但又是另一個故事了）。當然這不一定是永久的住宿。至於目前 DigitalOcean 使用體驗還算是不錯。

為什麼會突然用 VPS 呢？其實除了手癢無聊用一下以外，因為本上有運行部分專案包含了 PHP 與 Node.js，一般的虛擬主機不太好勝任，再加上免費的服務較不安全與不穩，手邊有免費的使用金額，當然就順手使用一下 DigitalOcean。

將來會陸續說一些關於 VPS 使用的事情，歡迎繼續關注。

&nbsp;

&nbsp;

最後

## **[我的推薦連結][1]**

麻煩各位了，哈哈哈。

 [1]: https://m.do.co/c/570958d3e7ff