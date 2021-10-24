const db = require("../db/connection");

class Role {
    constructor(title , salary, department_id) {
        this.title=title;
        this.salary=salary;
        this.department_id=department_id;
    }

    async save() {
        const sql= `
        INSERT INTO roles (title , salary, department_id)
            VALUES ('${this.title}', '${this.salary}', ${this.department_id})
        `
        const [newRole, _]= await db.execute(sql);
        console.log("added role")
        return newRole;
    }

    static async findAll() {
        const sql = `SELECT roles.id, roles.title, roles.salary,departments.name AS department FROM roles 
        LEFT JOIN departments 
        ON roles.department_id = departments.id;`
        const [result,_] = await db.execute(sql);
        return  result;
    }

    static async deleteOne(id) {
        const sql =`DELETE FROM roles WHERE id = ${id}`;
        const [result,_] = await db.execute(sql);
        return result;
    }

}

module.exports = Role;