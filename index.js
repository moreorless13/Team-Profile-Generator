const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./src/page-template.js');


let teamMembers = [];
let idArray = [];

const getManager = () => {
    console.log('Please build your team');
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter Manager's Employee Id",
            name: "managerId",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }

                return "Please enter a positive number."
            }
        },
        {
            type: 'input',
            message: "Please input Team Manager's Name: ",
            name: "managerName",
            validate: answer => {
                if (answer !== '') {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            message: "Please enter Manager's Email Address: ",
            name: 'managerEmail',
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },
        {
            type: 'input',
            message: "Please Enter the Manager's Office Number: ",
            name: 'officeNumber',
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a positive number greater than zero.";
            }
        }
    ])
    .then(answers => {
            let manager = new Manager(answers.managerId, answers.managerName, answers.managerEmail, answers.officeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            console.log(teamMembers);
            expandTeam();
        })
    .catch(err => console.error(err));
};


const getEngineerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter Engineer's Employee Id",
            name: "engineerId",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }

                return "Please enter a positive number."
            },
        },
        {
            type: 'input',
            message: "Please input Engineer's Name: ",
            name: "engineerName",
            validate: answer => {
                if (answer !== '') {
                    return true;
                }
                return "Please enter at least one character.";
            },
        },
        {
            type: "input",
            message: "Please enter Engineer's Email Address: ",
            name: 'engineerEmail',
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address.";
            },
        },
        {
            type: 'input',
            message: "Please Enter the Engineers's GitHub Username: ",
            name: 'engineerUsername',
            validate: answer => {
                if (answer !== '') {
                    return true;
                }
                return "Please enter at least one character.";
            },
        }
    ])
    .then(answers => {
            let engineer = new Engineer(answers.engineerId, answers.engineerName, answers.engineerEmail, answers.engineerUsername);
            teamMembers.push(engineer)
            idArray.push(answers.engineerId)
            console.log(teamMembers);
            expandTeam();
        })
    .catch(err => console.error(err));
}

const getInternQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter Intern's Employee Id",
            name: "internId",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }

                return "Please enter a positive number."
            },
        },
        {
            type: 'input',
            message: "Please input Intern's Name: ",
            name: "internName",
            validate: answer => {
                if (answer !== '') {
                    return true;
                }
                return "Please enter at least one character.";
            },
        },
        {
            type: "input",
            message: "Please enter Intern's Email Address: ",
            name: 'internEmail',
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address.";
            },
        },
        {
            type: 'input',
            message: "Please Enter the Intern's school: ",
            name: 'internSchool',
        }
    ])
    .then(answers => {
            let intern = new Intern(answers.internId, answers.internName, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            console.log(teamMembers);
            expandTeam();
        })
    .catch(err => console.error(err));
}

const expandTeam = () => {
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

const addTeamMember = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: "What is the new team member's role?",
            name: 'role',
            choices: ['Engineer', 'Intern', "I don't want to add any more team members."],
        }
    ])
    .then(answer => {
        if (answer.role == 'Engineer') {
            return getEngineerQuestions();
        } else if (answer.role === 'Intern') {
            return getInternQuestions();
        } else {
            return buildTeam();
        }
    })
}

const buildTeam = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
}



const init = () => {
    console.log("Ignition...");
    getManager();
    console.log(teamMembers);
}

init();