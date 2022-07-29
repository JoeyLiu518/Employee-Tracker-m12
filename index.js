const inquirer = require('inquirer')
const mysql = require('mysql2')
require('console.table')

const appConnection = mysql.createConnection ({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "company_db"
});

function start(){
    inquirer.prompt({
        name:'Question1',
        type:'list',
        message:"What would you like to do?",
        choices:['View Departments', 'View Roles', 'Add Role', 'Update Role', 'View Employees', 'Add Employee', 'Done']
    }).then (function (answer) {
        switch (answer.Question1) {
            case "View Departments":
                viewDepartments();
                break;
            
            case "View Roles":
                viewRoles();
                break;
            
            case "Add Role":
                addRole();
                break;

            case "Update Role":
                updateRole();
                break;

            case "View Employees":
                viewEmployees();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Exit":
                console.log("Have a great day.");
                appConnection.end();
                break;

        }
    })
}

const viewDepartments = () =>
    appConnection.query(`SELECT * FROM department`, (err, results) => {
        console.log('\n');
        console.table(results);
        console.log('---------------------------------------\n');
        exitOrNo();
        console.log('---------------------------------------\n');
    });


const viewRoles = () => {
        appConnection.query(`SELECT * FROM roles`, (err, results) => {
            console.log('\n')
            console.table(results);
            console.log('---------------------------------------\n');
            exitOrNo();
            console.log('---------------------------------------\n');
        })
    };


const addRole = () => {
        appConnection.query(`SELECT * FROM department`, function (err, results) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: 'newRole',
                    type: 'input',
                    message: 'What is this the name of this new role'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of the new role?'
                },
                {
                    name: 'department',
                    type: 'list',
                    message: 'What department does the new role belong to?',
                    choices: function () {
                        let Departments = [];
    
                        for (var i = 0; i < results.length; i++) {
                            Departments.push(results[i].dept_name);
                        }
    
                        return Departments;
                    }
                }
            ]).then(function (answer) {
                appConnection.query("SELECT * FROM department WHERE ?", { dept_name: answer.department}, function (err, results) {
                    if (err) throw err;
                    appConnection.query("INSERT INTO roles SET ?", {
                        title: answer.newRole,
                        salary: parseInt(answer.salary), 
                        department_id: results[0].id
                    });
                    console.log('\n You have added new Role.');
                });
                exitOrNo();
            })
        });
    };

const viewEmployees = () => {
        appConnection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.dept_name AS department, roles.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees manager ON employees.manager_id = manager.id`, (err, results) => {
            console.log('\n');
            console.table(results);
            console.log('---------------------------------------\n');
            exitOrNo();
            console.log('---------------------------------------\n');
        });
    };

const addEmployee = () => {
        appConnection.query(`SELECT * FROM roles`, function (err, results) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the employees first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the employees last name?'
                },
                {
                    name: 'employeeRole',
                    type: 'list',
                    message: 'What is the employees role?',
                    choices: function () {
                        let possibleRoles = [];
    
                        for (var i = 0; i < results.length; i++) {
                            possibleRoles.push(results[i].title);
                        }
    
                        return possibleRoles;
                    }
                }
            ]).then(function (answer) {
                appConnection.query("SELECT * FROM roles WHERE ?", { title: answer.employeeRole}, function (err, results) {
                    if (err) throw err;
                    appConnection.query("INSERT INTO employees SET ?", {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: results[0].id,
                        manager_id: results[0].id 
                    }); 
                    console.log('\n Employee Added');
                });
                exitOrNo();
            });
        });
    };

    function exitOrNo() {
        inquirer.prompt( {
            name: 'AreYouDone',
            type: `list`,
            message: `Anything else you want to do?`,
            choices: [`Yes`, `No`]
        }).then (function (answer) {
            switch (answer.AreYouDone) {
                case "Yes":
                    start();
                    break;
                case "No":
                    console.log("Have a great day.");
                    appConnection.end();
                    break;
            }
        })
    }