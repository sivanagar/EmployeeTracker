INSERT INTO departments (name)
VALUES ('Sales'),('Finance') ,('Develop');

INSERT INTO roles (title , salary, department_id)
VALUES ('Sales Manager', 65000.00 , 1),
    ('Sales Lead', 35000.00 , 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Jane','Doh',1,NULL),
        ('John','Doh',2,1);