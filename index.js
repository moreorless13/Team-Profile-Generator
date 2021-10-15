const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt({
        checkbox: 'input',
        message: 'What is the role of the new employee?', 
        name: 'role',
        choices: ['Employee', 'Manager', 'Engineer', 'Intern'],
    },);
};

