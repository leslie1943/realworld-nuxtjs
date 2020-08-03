#### RealWorld
- github `https://github.com/gothinkster/realworld`
- online demo: `https://demo.realworld.io/#/`
- 页面模板 `https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md`
- 接口文档 `https://github.com/gothinkster/realworld/tree/master/api`


#### 部署步骤
- 配置 Host + Port
- 压缩发布包
- 把发布包传到服务端
- 解压
- 安装依赖
- 启动服务


#### PM2
- github: `https://github.com/Unitech/pm2`
- 官网: `https://pm2.io`
- 安装: `npm install -global pm2`
- 启动: `pm2 start path`
- 在项目根目录执行 `npm install -global pm2`
- 执行命令: `pm2 start npm -- start` 给`npm`传参
- 关闭: `pm2 stop 6(id)`
- Git Token: `87a29283d4114db5ac95c1d2ccf63599c5a15029`
- `git tag v0.1.1`
- `git push origin v0.1.0`


#### 完成功能 - 文章详情页面
- `followingUser`: 关注用户 `url: /api/profiles/${username}/follow | POST`
- `unfollowingUser`: 取消关注用户 `url: /api/profiles/${username}/follow | DELETE`,
- `删除按钮`: 展示
- `addComment`: 添加评论 `url: api/articles/${slug}/comments  | POST`
- `deleteComment`: 删除评论 `url: /api/articles/${slug}/comments/${id} | DELETE` => `Array.filter方法设置删除后的页面数据`

#### 完成功能 - Profile
