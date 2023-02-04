const connection = require('./db/connection')
const inquirer = require('inquirer')
const logo = require('asciiart-logo');
const config = require('./package.json');
require('console.table') 

if (connection) {
    console.log(
        logo({
            name: 'Employee Tracker',
            font: 'ANSI Shadow',
            lineChars: 8,
            padding: 2,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'bold-green'
        })
        .right('version 1.0')
        .render()
    );
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
    connection.query("SELECT role.title, role.salary, department.name FROM role JOIN department ON role.departement_id = department.id`", (err, data) => {
        if (err) throw err;
        console.log(" ");
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
    inquirer.prompt ([
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
        connect.query(`INSERT INTO role(id, ${answer.role}, ${answer.salary}, ${answer.id}`), (err,data) => {
            if(err) throw err;
            console.log(" ")
            mainQuestion()
        }
    })
}


function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee you want to add:'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee you want to add:'
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter the new Employee role:'
            },
            {
                type: 'input',
                name: 'newManager',
                message: 'Enter the manager: (Press Enter if Employee is a manager)'
            },
        ])
        .then(answers => {
            const { firstName, lastName, newRole, newManager } = answers;

            let updateStatement = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${newRole}, ${newManager})`;

            connection.query(updateStatement, (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Successfully created ${firstName} ${lastName} to role ID# ${newRole}`);
                }
            });
            mainQuestion()
        });
}


function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter the new Employee role:'
            },
        ])
        .then(answers => {
            const { firstName, lastName, newRole } = answers;

            let updateStatement = `UPDATE employee SET role_id = '${newRole}' WHERE first_name = '${firstName}' AND last_name = '${lastName}'`;
            connection.query(updateStatement, (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Successfully updated ${firstName} ${lastName} to role ID# ${newRole}`);
                }
            });
            mainQuestion()
        });
}