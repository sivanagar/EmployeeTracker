/*view all departments
view all roles
view all employees
add a department
add a role
add an employee
update an employee role

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
INSERT INTO departments (name) VALUES ?,? ,?;
INSERT INTO roles (title , salary, department_id) VALUES (?, ? , ?);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);

UPDATE employees SET role_id =? WHERE id=?;

*/
SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, departments.name AS department ,roles.salary, concat(M.first_name, ' ', M.last_name) AS Manager
                FROM employees 
                LEFT JOIN roles ON employees.role_id=roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees as M ON employees.manager_id=M.id;

                