# Restaurant-List
此專案提供使用者紀錄餐廳清單(包含:餐廳類別、地址、評分、描述等...)

## 功能列表
* 可以`註冊帳號`及使用`Facebook第三方登入方式`及`登出`
* 可以`新增餐廳`(包含餐廳名稱、類別、地址、評分等資料)
* 可以`修改`已建立之餐廳資料
* 可以`刪除`已建立之餐廳資料
* 可以輸入關鍵字`搜尋`餐廳
* 可以使用不同`排序`方式檢視餐廳列表(例如:地區、類別...)

## 安裝流程
* 利用終端機(Terminal)，Clone專案至目標位置

  ```
  git clone https://github.com/TimZXJ/Restaurant-List-1.0.git
  ```
  
* 進入專案資料夾

  ```
  cd Restaurant-List-1.0
  ```

* 安裝 npm packages

  ```
  npm install
  ```
  
* 載入種子資料

  ```
  npm run seed
  ```
  
* 開啟伺服器

  ```
  npm run dev
  ```
  * 當終端機(Terminal)出現`Express is listening on localhost:3000`表示伺服器已成功開啟。
   
* 在瀏覽器中入輸入網址:http://localhost:3000

## 種子資料
```
name: user1
email: user1@example.com
password: 12345678
```

```
name: user2
email: user2@example.com
password: 12345678
```

## 環境建置與需求
* @handlebars/allow-prototype-access: ^1.0.5
* bcryptjs: ^2.4.3
* connect-flash": ^0.1.1
* dotenv": ^10.0.0
* express": ^4.17.1
* express-handlebars: ^5.3.3
* express-session: ^1.17.2
* handlebars: ^4.7.7
* method-override: ^3.0.0
* mongoose: ^5.13.7
* passport: ^0.5.0
* passport-facebook: ^3.0.0
* passport-local: ^1.0.0