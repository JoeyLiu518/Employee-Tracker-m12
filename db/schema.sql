DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    salary DECIMAL,
    title VARCHAR(30),
    dep_id INT NOT NULL,
    FOREIGN KEY dep_id 
    REFERENCES departments(id)
    ON DELETE SET NULL
);
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY role_id
    REFERENCES departments(id)
    ON DELETE SET NULL,
    FOREIGN KEY manager_id
    REFERENCES roles(id)
    ON DELETE SET NULL
);