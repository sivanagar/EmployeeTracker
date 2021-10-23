const inquirer = require('inquirer');
const db = require("./db/connection");
var Table = require('cli-table');
const cTable = require('console.table');

console.log('=================================================================================================================================');
console.log('Welcome to:');
console.log(`
███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████     ████████ ██████   █████   ██████ ██   ██ ███████ ██████  
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██             ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██ 
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████          ██    ██████  ███████ ██      █████   █████   ██████  
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██             ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██ 
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████        ██    ██   ██ ██   ██  ██████ ██   ██ ███████ ██   ██ 
`)

function viewAllDepartments() {
    const sql = `SELECT * FROM departments;`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        } else {
            console.table(rows);
        }
        //promptMenu();
    });
}

function viewAllEmployees() {
    const sql= `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, departments.name AS department ,roles.salary, concat(M.first_name, ' ', M.last_name) AS Manager
            FROM employees 
            LEFT JOIN roles ON employees.role_id=roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees as M ON employees.manager_id=M.id;`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        } else {
            console.table(rows);
        }
        //promptMenu();
    })
}

function viewAllRoles() {
    const sql = `SELECT roles.id,  roles.title, roles.salary, departments.name AS department  
                FROM roles 
                LEFT JOIN departments ON roles.department_id = departments.id;`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        } else {
            console.table(rows);
        }
        //promptMenu();
    });
}

function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        message: 'Please enter the name of the new department:',
        name: 'department',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter new department name');
                return false;
            }
        }
    }])
        .then((name) => {
            const sql = `INSERT INTO departments (name)
            VALUES (?)`;
            db.query(sql,name.department ,(err, result) => {
                if (err) {
                    console.log(err.message);
                    return;
                } else {
                    console.log(name.department+ ' added to departments table');
                    console.log(result.affectedRows);
                }
                //promptMenu();
            });
        })
}


function addRole() {
    let departmentList=""
    const sql= `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        } else {
            departmentList = rows.map(item => {
                return { name: item.name, value: item.id.toString() };
              });
            console.log(departmentList);
            console.log(typeof departmentList)
        }
    })
  inquirer.prompt([{
        type: 'input',
        message: 'Please enter the new role name',
        name: 'role',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter new role name');
                return false;
            }
        }
    },{
        type: 'input',
        message: 'Please enter salary for this role',
        name: 'salary',
        //needs to be decimals or numbers
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter salary for this role');
                return false;
            }
        }
    }
    ,{
        type:'list',
        message: 'Please select department for this role',
        name: 'department',
        choices: [{ name: 'Sales', value: '1' },
        { name: 'Finance', value: '2' },
        { name: 'Develop', value: '3' },
        { name: 'New', value: '4' },
        { name: 'AddedDepartment', value: '5' }]
    }
    ])
        .then((data) => {
            console.log(data)
            // const sql = `INSERT INTO roles (title , salary, department_id)
            // VALUES (?, ? , ?)`;
            // const paramas = [title,salary ,department_id];
            // db.query(sql,paramas ,(err, rows) => {
            //     if (err) {
            //         console.log(err.message);
            //         return;
            //     } else {
            //         console.log(name.department+ ' added to departments table');
            //     }
            //     //promptMenu();
            // });
        })
}



function promptMenu() {
    inquirer.prompt([{
        type: 'list',
        message: `what do you want to do?`,
        name: 'action',
        choices:[new inquirer.Separator(),'view all departments', 'view all roles', 'view all employees',new inquirer.Separator(), 'add a department', 'add a role', 'add an employee', new inquirer.Separator(),'update an employee role']
    
    }])
        .then((data) => {
            console.log(data)
            //viewAllDepartments();
            //viewAllRoles();
            //viewAllEmployees();
            //addDepartment();
            addRole();
        })
} 

promptMenu()