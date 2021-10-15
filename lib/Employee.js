const inquirer = require('inquirer');

export const employeeRoles = [
    'Employee',
    'Manager',
    'Engineer',
    'Intern',
];

export class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    };
    
    getName() {
        return inquirer.prompt({
            type: 'input',
            message: 'Please enter name of employee',
            name: 'name',
        })
    };

    getId() {
        console.log(`Id: ${this.id}`);
        return `Id: ${this.id}`
    };

    getEmail(){
        console.log(`Email: ${this.email}`)
        return `Email: ${this.email}`
    };

    getRole(){
        console.log(employeeRoles[0])
        return employeeRoles[0]
    };
};

