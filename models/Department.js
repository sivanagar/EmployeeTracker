const db = require("../db/connection");

class Department {
    constructor(name) {
        this.name=name;
    }

    async save() {
        const sql= `
        INSERT INTO departments (name)
            VALUES ('${this.name}')
        `
        const [newDepartment, _]= await db.execute(sql);
        console.log("added department: "+ this.name);
        return newDepartment;
    }

    static async findAll() {
        const sql = `SELECT * FROM departments;`
        const [result,_] = await db.execute(sql);
        return  result;
    }

    static async deleteOne(id) {
        const sql =`DELETE FROM departments WHERE id = ${id}`;
        const [result,_] = await db.execute(sql);
        return result;
    }

}

module.exports = Department;