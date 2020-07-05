const inquirer = require('inquirer') //命令行交互
const handlebars = require('handlebars') //填充模版
const fs = require('fs')

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