const inquirer = require('inquirer');
const Department = require('./models/Department')
const Role = require('./models/Role')
const Employee = require('./models/Employee')
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
    Department.findAll()
        .then(department => {
            console.table(department);
            promptMenu();
        })
}

function viewAllEmployees() {
    Employee.findAll()
        .then(employees => {
            console.table(employees);
            promptMenu();
        })
}

function viewAllRoles() {
    Role.findAll()
        .then(roles => {
            console.table(roles);
            promptMenu();
        })
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
            let department = new Department(name.department);
            department.save()
                .then(() => {
                    promptMenu();
                })
        })
}

function addRole(departmentList) {
    inquirer.prompt([{
        type: 'input',
        message: 'Please enter the new role name',
        name: 'title',
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
        choices: departmentList
    }
    ]).then((data) => {
        let role = new Role(data.title,data.salary , data.department)
        role.save()
            .then(role => promptMenu())
    }); 
}

function deleteDepartment(departmentList) {
    inquirer.prompt([{
        type:'list',
        message: 'Please select which department to delete',
        name: 'department',
        choices: departmentList
    }])
        .then(data => {
            Department.deleteOne(data.department)
                .then(() => promptMenu());

        });
}

function deleteRole(roleList) {
    inquirer.prompt([{
        type:'list',
        message: 'Please select which role to delete',
        name: 'role',
        choices: roleList
    }])
        .then(data => {
            Role.deleteOne(data.role)
                .then(() => promptMenu());

        });
}

function deleteEmployee(employeeList) {
    inquirer.prompt([{
        type:'list',
        message: 'Please select which employee to delete',
        name: 'employee',
        choices: employeeList
    }])
        .then(data => {
            Employee.deleteOne(data.employee)
                .then(() => promptMenu());

        });
}

function addEmployee(roleList) {
    inquirer.prompt([{
        type: 'input',
        message: 'Please enter employee first name',
        name: 'first_name',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter employee first name');
                return false;
            }
        }
    },{
        type: 'input',
        message: 'Please enter employee last name',
        name: 'last_name',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter employee last name');
                return false;
            }
        }
    }
    ,{
        type:'list',
        message: 'Please select role for this employee',
        name: 'role',
        choices: roleList
    },{
        type: 'input',
        message: 'please enter employee manager id number if exists',//by id- no list
        name: 'manager'
    }
    ]).then(data => {
        let employee = new Employee(data.first_name, data.last_name, data.role , data.manager ? data.manager: null)
        employee.save()
            .then(employee => {
                console.log("Employee Added Successfully")
                promptMenu();
            })
    })
}

function updateEmployeeRole (roleList,employeeList) {
    inquirer.prompt([{
        type:'list',
        message: 'Please select Employee to update',
        name: 'employee',
        choices: employeeList
        },{
        type:'list',
        message: 'Please select role for this employee',
        name: 'role',
        choices: roleList
        }])
    .then(data => {
        Employee.updateRole(data.role,data.employee)
        .then(employee => {
            console.log("Employee Updated Successfully")
            promptMenu();
        })
    })

}

function promptMenu() {
    inquirer.prompt([{
        type: 'list',
        message: `what do you want to do?`,
        name: 'action',
        choices:[new inquirer.Separator(),
            'view all departments', 
            'view all roles', 
            'view all employees',
            new inquirer.Separator(), 
            'add a department', 
            'add a role', 
            'add an employee', 
            new inquirer.Separator(),
            'update an employee role',
            new inquirer.Separator(),
            'delete department',
            'delete role',
            'delete employee',
            new inquirer.Separator(),
            'Quit']
    
    }])
        .then((data) => {
            switch(data.action) {
                case 'view all departments':
                    viewAllDepartments();
                    break;
                case 'view all roles':
                    viewAllRoles();
                    break;
                case 'view all employees':
                    viewAllEmployees();
                    break;
                case 'add a department':
                    addDepartment();
                    break;
                case 'add a role':
                    Department.findAll()
                        .then(departments => {
                            const departmentList = departments.map(item => {
                                return { name: item.name, value: item.id };
                            });
                            return departmentList;
                        })
                        .then((data) => addRole(data))
                    break;
                case 'add an employee':
                    Role.findAll()
                        .then(roles => {
                            const roleList = roles.map(item => {
                                return { name: item.title, value: item.id };
                            });
                            return roleList;
                        })
                        .then((roleList) => addEmployee(roleList))
                    break;
                case 'update an employee role':
                    Role.findAll()
                        .then(roles => {
                            const roleList = roles.map(item => {
                                return { name: item.title, value: item.id };
                            });
                            return roleList;
                        })
                        .then(roleList => {
                            Employee.findAll()
                            .then(employees => {
                                const employeeList = employees.map(item => {
                                    return { name: item.first_name.concat(' ', item.last_name) , value: item.id };
                                   });
                                   
                                return ([roleList,employeeList]);
                            })
                            .then((lists) => {
                                updateEmployeeRole(lists[0],lists[1])
                            })
                        })
                        
                    break;
                
                case 'delete department':
                    Department.findAll()
                        .then(departments => {
                            const departmentList = departments.map(item => {
                                return { name: item.name, value: item.id };
                            });
                            return departmentList;
                        })
                        .then((departmentList) => deleteDepartment(departmentList))
                    break;
                case 'delete role':
                    Role.findAll()
                        .then(roles => {
                            const roleList = roles.map(item => {
                                return { name: item.title, value: item.id };
                            });
                            return roleList;
                        })
                        .then((roleList) => deleteRole(roleList))
                    break;
                case 'delete employee':
                    Employee.findAll()
                        .then(employees => {
                            const employeeList = employees.map(item => {
                                return { name: item.first_name.concat(' ', item.last_name) , value: item.id };
                            });
                            return employeeList;
                        })
                        .then((employeeList) => deleteEmployee(employeeList))
                    break;
                case 'Quit':
                    break;
           }
        })
} 

promptMenu()