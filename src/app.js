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























