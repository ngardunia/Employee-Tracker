const connection = require('./db/connection')
const inquirer = require('inquirer')
require('console.table') 

if (connection) {
    console.log("Datebase is running")
    mainQuestion()
}

function mainQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainQuestion',
            message: "What would you like to do?",
            choices : ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles',
            'Add Role', 'View All Departments', 'Add Department', 'Quit']
        }
    ]).then(answer => {
        switch (answer.mainQuestion) {
            case 'View All Employees':
                viewEmployees()
                break;
            case 'Add Employee':
                addEmployee()
                break;
            case 'Update Employee':
                updateEmployeeRole()
                break;
            case 'View All Roles':
                viewRoles()
                break;
            case 'Add Role':
                addRole()
                break;
            case 'View All Departments':
                viewDeparments()
                break;
            case 'Add Department':
                addDepartment()
                break;
            default:
                connection.end()
        }
    })
}

function viewRoles() {
    console.log('view all tables in a join')
    connection.query("SELECT role.title, role.salary, department.name FROM role JOIN department ON role.departement_id = department.id", (err, data) => {
        if (err) throw err;
        console.table(data)
    })
    mainQuestion()
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log(" ")
        console.table(data)
    })
    mainQuestion()
}

function viewDeparments() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log(" ")
        console.table(data)
    })
    mainQuestion()
}

function addDepartment() {
    inquirer.prompt([
        {
        type: 'input',
        name: 'newDepartment',
        message: "What is your new department's name?"
        }
    ])
    .then(answer => {
        console.log(answer);
        connection.query(`INSERT INTO department (name) VALUES('${answer.newDepartment}')`, (err, data) => {
            if (err) throw err;
            console.log(" ")
            console.table(data)
            mainQuestion()
            })
        })
    };


function addRole() {
    inquirer.promp ([
        {
            type: 'input',
            name: 'role',
            message: "What is the title for your new role?"
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this new role?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the department id for your new role?"
        }
    ])
    .then(answer => {
        connect.query`(INSERT INTO role(id, ${answer.role}, ${answer.salary}, ${answer.id})`, (err,data) => {
            if(err) throw err;
            console.log(" ")
            mainQuestion()
        }
    })
}


function addEmployee() {
    console.log('addEmployee')
    mainQuestion()
}


function updateEmployeeRole() {
    console.log('updateEmployee')
    mainQuestion()
}