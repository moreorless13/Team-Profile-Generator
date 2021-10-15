const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

let teamMembers = [];

class Team {
    constructor(){
        this.teamSize = teamMembers.length;
    }

    manage() {
        this.getManager();
    }

    getManager() {
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
                teamMembers.push(manager)
            })
        .catch(err => console.error(err));
    }

    addAnotherTeamMember() {
        inquirer.prompt([
            {
                type: 'confirm',
                message: 'Add another team member?',
                name: 'choice',
            }
        ])
        .then(val => {
            if (val.choice){
                this.addTeamMember();
            } else {
                this.quit();
            }
        });
    }
    addTeamMember() {
        
    }

    quit() {
        console.log("\n Generating Team Page");
        process.exit(0);
    }


}





const init = () => {
    console.log("Ignition...");
    getManager();

}