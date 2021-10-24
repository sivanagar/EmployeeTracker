const db = require("../db/connection");

class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.first_name=first_name;
        this.last_name=last_name;
        this.role_id=role_id;
        this.manager_id=manager_id;
    }

    async save() {
        const sql= `
        INSERT INTO employees (first_name, last_name, role_id, manager_id) 
        VALUES ('${this.first_name}', '${this.last_name}', ${this.role_id}, ${this.manager_id});
        `
        const [newEmployee, _]= await db.execute(sql);
        return newEmployee;
       
    }

    static async findAll() {
        const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, departments.name AS department ,roles.salary, concat(M.first_name, ' ', M.last_name) AS Manager
        FROM employees 
        LEFT JOIN roles ON employees.role_id=roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees as M ON employees.manager_id=M.id;`;
        const [result,_] = await db.execute(sql);
        return  result;

    }

    static async deleteOne(id) {
        const sql =`DELETE FROM employees WHERE id = ${id}`;
        const [result,_] = await db.execute(sql);
        return result;
    }

    static async updateRole(role_id, employee_id) {
        const sql = `UPDATE employees SET role_id =${role_id} WHERE id=${employee_id};`;
        const [result,_] = await db.execute(sql);
        return result;
    }
}

module.exports = Employee;