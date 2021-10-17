const inquirer = require('inquirer');

console.log('================================');
console.log('Welcome to employees Tracker');

inquirer.prompt([{
    type: 'input',
    message: `what do you want to do?`,
    name: 'action'
}])
    .then((data) => {
        console.log(data)
    })