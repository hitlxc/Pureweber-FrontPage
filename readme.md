# 哈工大Pureweber项目组官网


### 施工中

### 使用方法
1. `git clone https://github.com/hitlxc/Pureweber-FrontPage.git`
2. `cd /Pureweber-FrontPage`
3. `npm install`
4. `npm run build`
5. `npm start` or `supervisor ./bin/www`
6. visit localhost:3000

### 前端编译
`npm run build/npm run build-dev`

### 配置

修改conf/db.js.bak里的配置项，另存为一份db.js即可

修改conf/mail.js.bak里的配置项，另存为一份mail.js即可

### 其他说明

routes/index.js 前端路由
routes/api.js 各api导入，api路由
routes/lib.js 公共函数库