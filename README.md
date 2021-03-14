# 手写一个 cli

puppeteer案例

## 需求说明

- 实现截取百度图片
- 实现抓起京东书单


## 依赖安装

```bash
$ yarn
```

- 依赖说明：
  - puppeteer 
## 初始化

- 新建文件夹： `ddb`


```json
"name": "cli-test",
"bin": {
    "cli-test": "./src/app.js"
  },
```

- 绑定软连接：`npm link`， 这里如果报错了，可能是 `"./src/app"` 没有加 `.js` 后缀

到这里，配置部分就完成了，接下来开始编写代码吧

## Hello,World

第一步，我们先写一个 Hello，World

- 在 `/src/app.js` 中编写代码如下

```js
#!/usr/bin/env node
'use strict';

const puppeteer = require("puppeteer");
const fs = require("fs");

const getScreenShot = async() => {
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();
await page.goto("https://baidu.com");
const res = await page.screenshot({path:"baidu.png"});
fs.writeFile(`${__dirname}/baidu.jpg`,res,(err) => {
    if(err){
        throw err;
    }
    console.log("file saved!");
    console.log(res);
})
await page.close();
}

getScreenShot();
```

- 在终端输入命令：`cli-test -V`，是否显示对应的版本号，如果有，则说明前面我们的配置都是成功的

- 编写 `/src/app.js` 文件如下：

参考资料：

- [how-to-build-a-cli-with-node-js](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js) 推荐！！
- [command-line-app-with-nodejs](https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs)
- [Node.js 命令行程序开发教程-阮一峰](https://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)
- [如何从零开始开发一个 node.js 命令行(cli)工具](https://juejin.cn/post/6883070890130145288) 推荐
- [手把手教你用Node.js创建CLI](https://segmentfault.com/a/1190000022721056) 推荐
- [开课吧夏老师-cli代码资料](https://github.com/su37josephxia/kaikeba-cli/blob/master/bin/miku.js)
- [从零开发一个node命令行工具 ](https://www.sohu.com/a/275486462_495695)
- [手把手教你写命令行工具-JavaScript,NodeJs](http://isweety.me/blog/2018/how-to-write-cli-tool/)
- [私人定制 CLI 工具](https://www.infoq.cn/article/j6ohpzleoccbaf8yhgnv)
- [从零开始开发一个Node交互式命令行应用](http://kmanong.top/kmn/qxw/form/article?id=7569&cate=58) 这是一个结合爬虫和node命令行的工具，牛逼！