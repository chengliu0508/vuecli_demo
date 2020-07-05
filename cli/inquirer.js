const inquirer = require('inquirer') //命令行交互

inquirer
    .prompt([{
            type: 'input',
            name: 'author',
            message: '输入用户名'
        }, {
            type: 'confirm',
            name: 'agree',
            message: '同意用户协议么？'
        }

    ])
    .then(answers => {
        // Use user feedback for... whatever!!
        console.log(answers)
    })
    .catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
        }
    });


// ? 输入用户名 xiaoming
// ? 同意用户协议么？ Yes
// { author: 'xiaoming', agree: true }