# GraphQL VueJS 2.0 

This is the simple example VueJS/GraphQL demo.

## Installation

Clone the repository and run `npm install`:

```
git clone https://github.com/rainpure/graphql-vue.git
cd graphql-vue
npm install
```

## Starting the demo

server, available here: https://github.com/rainpure/graphql-vue-server.git

Once you've installed and started that server, start this demo with:

```
npm start
```

It will open a browser window, or you can browse to http://localhost:3000.


## Build the app to production

```
npm run build
```

## Server ##

`http://localhost:8080/graphql`

### 调试平台 ###

`http://localhost:8080/graphiql`

## Client ##

`http://localhost:3000/`


## 通过ip访问解决方案：

```
"dev": "webpack-dev-server --inline --hot --port 3000"
修改成
"dev": "webpack-dev-server --open --env dev --host 192.168.0.168"
```

参考：http://blog.csdn.net/u011102843/article/details/73839366

配置后访问：`http://172.16.2.221:8081/`

当本机ip更换时，需要同步package.json里的ip地址
宿舍：`192.168.1.23` 公司： `172.16.2.221`