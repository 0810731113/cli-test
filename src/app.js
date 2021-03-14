#! /usr/bin/env node
const puppeteer = require("puppeteer");
const program = require("commander");
const inquirer = require('inquirer');
const chalk = require("chalk");
const figlet = require("figlet");
const ora = require('ora');
// node src/app.js -n libo -a 33 -e 大炮
// const question = require("./question")
const {convert2Img,autoScroll} = require('./baiduImg');
const fs = require('fs');
const os = require('os');
const path = require('path');
console.log(chalk.cyan('从我开始了'));
console.log(chalk.green("欢迎使用 cli-test, 轻松构建 cli"));
console.log(chalk.red(figlet.textSync('CLI-TEST',{horizontalLayout:'full'})));

program
    .version("0.0.1","-v --version")
    .description("a test cli program")
    .option("-k, --key [key]", "input the image keywords to download")
    .option("-i, --interval [interval]", "input the operation interval(ms,default 200)", parseFloat)
    .option("-n, --number [number]", "input the operation interval(ms,default 200)", parseInt)
    .option("-m, --headless [headless]", "choose whether the program is running in headless mode")
    .action(option => {
        var config = Object.assign(
            {
                key: "",
                interval: 0,
                number: 0,
                head: false
            },
            option
        );
        var promps = [];

        console.log(chalk.yellow("================================================================"));
        console.log(chalk.green ("Image spider version 1.2.0 designed by tuobaye0711 "));
        console.log(chalk.yellow("================================================================"));
        if (!config.key) {
            promps.push({
                type: "input",
                name: "key",
                default:"美女",
                message: "Please input the image keywords to download",
                validate: function(input) {
                    if (!input) {
                        return "Can't be empty!";
                    }
                    return true;
                }
            });
        }

        if (config.interval === 0) {
            promps.push({
                type: "input",
                name: "interval",
                default: 200,
                message: "Please input the operation interval(ms)"
            });
        }

        if (config.number === 0) {
            promps.push({
                type: "input",
                name: "number",
                default: 20,
                message: "Please input the download numbers(1-1000)"
            });
        }

        if (config.head === false) {
            promps.push({
                type: "confirm",
                name: "headless",
                default: true,
                message: "Is the program running in headless mode?"
            });
        }

        inquirer.prompt(promps).then(function(answers) {
            const { key, interval, number, headless } = answers;
            // const home = os.homedir();
            const home = process.cwd();
            const folder = 'img-spd';
            const base = path.join(home, folder);
            const target = path.join(base, key)
            if (!fs.existsSync(base)) {
                fs.mkdirSync(base);
            }
            if (!fs.existsSync(target)) {
                fs.mkdirSync(target);
            }
            const spider = async () => {
                const browser = await puppeteer.launch({ headless: headless });
                const page = await browser.newPage();
                await page.setViewport({ width: 2000, height: 800, });
                await page.goto("https://image.baidu.com");
                console.log(chalk.yellow("go to https://image.baidu.com"));

                await page.focus("#kw");
                await page.keyboard.sendCharacter(key);
                await page.waitFor(".s_btn_wr");
                await page.click(".s_btn_wr");
                console.log(chalk.blue("go to search list"));

                page.on("load", async () => {
                    if (number * 1 > 20) {
                        await autoScroll(page);
                    }
                    console.log(chalk.magenta("page loading done, start fetch..."));

                    const srcs = await page.evaluate(() => {
                        const images = document.querySelectorAll("img.main_img");
                        return Array.prototype.map.call(images, img => img.src);
                    });
                    console.log(
                        chalk.redBright(
                            `Get ${srcs.length} images totally, start download the first ${number *
                            1} images`
                        )
                    );

                    for (let i = 0; i < srcs.length && i < number * 1; i++) {
                        // sleep
                        await page.waitFor(interval * 1);
                        await convert2Img(srcs[i], target);
                        console.log(
                            chalk.greenBright(
                                `finished ${i + 1}/${Math.min(srcs.length, number * 1)} images`
                            )
                        );
                    }

                    console.log(chalk.green.bold(`job finished! The images are stored in ${target}`));
                    await browser.close();
                });
            };

            spider();
        });
    });

program.parse(process.argv);