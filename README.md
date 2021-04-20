# chatadmin
网页在线聊天系统管理员端

## Front-end Stack

> `React`、`Axios`、`Antd`、`React-redux`、`Redux-thunk`等。

## Description
- 拉取本项目，执行`yarn install`命令安装项目所需依赖，然后执行`yarn start`即启动项目。
- 打包部署：在`package.json`中添加一个键值对：`"homepage": "/backend/",`表示生成的静态文件路径的前缀都会加上这个`/backend/` 。全局搜索关键字：`IMG_BASE_URL`，将出现的文件中内容处根据提示进行替换。修改`pages/Login/index.scss`中`background-image`，根据该处的提示进行内容替换。
- `Nginx`配置`React`等多个前端项目：[传送门](https://www.jianshu.com/p/83b76e62976b)（注：参照方法二）

## Available Scripts

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:4000
yarn start

# build for production with minification
yarn build
```
