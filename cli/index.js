#!/usr/bin/env node

// 脚本语言第一行，首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作

console.log('hello 666')

const { program } = require('commander'); //
const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

const params = {
    'webpack': {
        url: 'https://github.com/chengliu0508/demo#master',
        descript: 'cli create webpack demo-name'
    },
    "gulp": {
        url: 'https://github.com/chengliu0508/demo#master',
        descript: 'cli create gulp demo-name'
    }
}

program
    .version('0.1.0') //输出对应的版本号

program
    .command('init <template> <demoName>')
    .description('初始化项目模板')
    .action(function(template, project) {
        // 在下载前提示
        const spinner = ora('正在下载模板当中...').start()

        var downLoadUrl = params[template].url

        //   第一个参数：仓库地址#分支  注意需要改成所需要的格式，不要直接复制粘贴
        //   第二个参数： 项目名
        download(downLoadUrl, project, { clone: true }, err => {
            if (err) {
                spinner.fail()
                return console.log(logSymbols.error, chalk.red('下载失败，失败原因：' + err));
            } else {
                spinner.succeed();
                return console.log(logSymbols.success, chalk.yellow('下载成功'));
            }
        })
    });

program
    .command('help')
    .description('你可以执行以下命令')
    .action(function() {
        console.log(`
           cli init webpack demo-name,
           cli init gulp demo-name
        `);
    });

program.parse(process.argv);