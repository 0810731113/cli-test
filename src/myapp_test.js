#! /usr/bin/env node

const program = require("commander");
const inquirer = require('inquirer');
const chalk = require("chalk");
const figlet = require("figlet");
const ora = require('ora');
// node src/app.js -n libo -a 33 -e 大炮
const question = require("./question")

program
    .version("0.0.1")
    .description("a test cli program")
    .option("-n, --name <name>","your name","zhl")
.option("-a, --age <age>", "your age", "22")
.option("-e, --enjoy [enjoy]", "your enjoy")
.action(option => {
    // const process = ora('正在操作');
    // process.start();
    // process.succeed('操作完成')
    console.log("name: ", option.name);
    console.log("age: ", option.age);
    console.log("enjoy: ", option.enjoy);
    console.log(chalk.green("欢迎使用 cli-test, 轻松构建 cli"));
    console.log(chalk.red(figlet.textSync('CLI-TEST',{horizontalLayout:'full'})));
    inquirer.prompt(question).then((answer) => {
        if(answer.conf){
            console.log('answer: ',answer);
            console.log('answer.conf: ', answer.conf);
        }
    });

})

program.parse(process.argv);