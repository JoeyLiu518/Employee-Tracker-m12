USE company_db;

INSERT INTO departments (dept_name)
VALUES('Support'),
('Engineering'),
('Sales'),
('Company Execs')

INSERT INTO roles (salary, title, department_id)
VALUES(50000,'customer support',1),
(100000,'engineer',2),
(100000,'engineer',2)
(150000,'ceo',3),
(70000,'sales',4),
(70000,'sales',4),

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Joey', 'Liu', '15', NULL),
('Jack', 'Smith', '5', 2),
('John', 'Doe', '3', NULL),
('Alexis', 'Ish', '2', 4)