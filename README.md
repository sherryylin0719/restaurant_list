# 我的餐廳清單

此專案提供使用者註冊自己的帳號，並藉由餐廳名稱及餐廳類別查詢餐廳的資訊，例如:餐廳類別、地址、評分、描述等等

## 功能列表

依照餐廳名稱及餐廳類別搜尋

點擊餐廳圖卡檢視餐廳詳細資訊包含類別、地址、電話、評分及圖片

使用者可以新增一家餐廳

使用者可以瀏覽一家餐廳的詳細資訊

使用者可以修改一家餐廳的資訊

使用者可以刪除一家餐廳

使用者可以註冊自己的帳號，或用 Facebook 登入

使用者可以瀏覽自己的餐廳

### 環境建置

Node.js v14.16.0

MongoDB

Mongoose: v5.9.7

Express": v4.17.1

### 安裝

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

git clone
https://github.com/sherryylin0719/restaurant_list.git

2.初始

cd restaurant_list //切至專案資料夾

npm install //安裝套件

3.設定環境變數

藉由.env.example 來新增並完成一個.env 檔

4.產生預設使用者及餐廳資料至 MongoDB

npm run seed //終端顯示 '所有使用者與餐廳資料創建完成' 即完成新增資料

5.開啟程式

npm run dev

終端顯示 Express is listening on localhost:3000! 即啟動完成，請至 http://localhost:3000 開始使用程式

## 使用工具

Visual Studio Code - 開發環境

Express - 應用程式架構

Express-Handlebars - 模板引擎

Bootstrap - 前端框架

MongoDB

Mongoose

## 致謝

![Eason](https://github.com/Eason0in/Restaurant-CRUD)
