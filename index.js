const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

let teamMembers = [];

const getManager = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter Manager's Employee Id",
            name: "id",
        },
        {
            type: 'input',
            message: "Please input Team Manager's Name: ",
            name: "name",
        },
        {
            type: "input",
            message: "Please enter Manager's Email Address: ",
            name: 'email',
        },
        {
            type: 'input',
            message: "Please Enter the Manager's Office Number: ",
            name: 'officeNumber',
        }
    ])
    .then(answers => {
            let manager = new Manager(answers.id, answers.name, answers.email, answers.officeNumber);
            teamMembers.push(manager);
            console.log(teamMembers);
            addAnotherTeamMember();
        })
    .catch(err => console.error(err));
};

const addTeamMember = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: "What is the new team member's role?",
            name: 'role',
            choices: ['Engineer', 'Intern'],
        }
    ])
    .then(answer => {
        if (answer.role == 'Engineer') {
            return getEngineerQuestions();
        } else {
            return getInternQuestions();
        }
    })
}

const getEngineerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter Engineer's Employee Id",
            name: "id",
        },
        {
            type: 'input',
            message: "Please input Engineer's Name: ",
            name: "name",
        },
        {
            type: "input",
            message: "Please enter Engineer's Email Address: ",
            name: 'email',
        },
        {
            type: 'input',
            message: "Please Enter the Engineers's GitHub Username: ",
            name: 'username',
        }
    ])
    .then(answers => {
            let engineer = new Engineer(answers.id, answers.name, answers.email, answers.username);
            teamMembers.push(engineer)
            console.log(teamMembers);
            addAnotherTeamMember();
        })
    .catch(err => console.error(err));
}

const getInternQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter Intern's Employee Id",
            name: "id",
        },
        {
            type: 'input',
            message: "Please input Intern's Name: ",
            name: "name",
        },
        {
            type: "input",
            message: "Please enter Intern's Email Address: ",
            name: 'email',
        },
        {
            type: 'input',
            message: "Please Enter the Intern's school: ",
            name: 'school',
        }
    ])
    .then(answers => {
            let intern = new Intern(answers.id, answers.name, answers.email, answers.school);
            teamMembers.push(intern);
            console.log(teamMembers);
            addAnotherTeamMember();
        })
    .catch(err => console.error(err));
}

const addAnotherTeamMember = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Add another team member?',
            name: 'choice',
        }
    ])
    .then(val => {
        if (val.choice){
            addTeamMember();
        } else {
            return;
        }
    });
};

const init = () => {
    console.log("Ignition...");
    getManager();
    console.log(teamMembers);
}

init();