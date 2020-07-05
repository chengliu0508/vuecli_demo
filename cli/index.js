#!/usr/bin/env node

// 脚本语言第一行，首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作

console.log('hello 666')

const { program } = require('commander'); //获取用户命令行
const download = require('download-git-repo') //下载模版
const inquirer = require('inquirer') //命令行交互
const handlebars = require('handlebars') //填充模版
const ora = require('ora') //下载中样式
const chalk = require('chalk') //console.log的颜色
const logSymbols = require('log-symbols') //特殊字符，例如对勾和叉叉

const params = {
    'webpack': {
        url: 'https://github.com/chengliu0508/demo',
        descript: 'cli create webpack demo-name'
    },
    "gulp": {
        url: 'https://github.com/chengliu0508/demo',
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
                console.log(logSymbols.success, chalk.yellow('下载成功'));

                inquirer.prompt([{
                            type: 'input',
                            name: 'name',
                            message: '输入项目名'
                        }, {
                            type: 'input',
                            name: 'description',
                            message: '输入项目描述'
                        }

                    ])
                    .then(answers => {
                        console.log(answers)
                        const templatePath = './template.json'
                        const content = fs.readFileSync(templatePath, 'utf-8')
                        const result = handlebars.compile(content)(answers)
                        fs.writeFileSync('./template-bundle.json', result)
                    })
                    //把项目下的template.json文件读取起来，把用户输入填充到模版里面
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