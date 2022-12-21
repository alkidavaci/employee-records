-- Drop and create database
DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

-- Use database
USE employees_db;

-- Create table departments
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

-- Create table role
CREATE TABLE role (
    id INT  PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
    ON DELETE SET NULL
);
);

-- Create table employee
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE,
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);