// Packages require
const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');
const db = require('./config/connection');

// Initial port
const PORT = process.env.PORT || 3001;

// Create instance of express
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// THEN I am presented with a formatted table showing department names and department ids
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// THEN I am prompted to enter the name of the department and that department is added to the database
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

db.connect(function(err) {
    if (err) throw err;
   
    console.log("\n============>  WELCOME TO THE EMPLOYEE DATABASE  <============\n");
    
    // Call function to run the choices
    runChoices();
  });

function runChoices() {
    inquirer.prompt([
        {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
                "View All Employees", 
                "View All Departments",
                "View All Roles",
                "View All Employees by Department",
                "View All Employees by Role",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Exit"
                ]
        }])
        .then((answer) => {
            switch (answer.choice) {

                case "View All Employees":
                    console.log(answer.choice);
                break;

                case "View All Departments":
                    console.log(answer.choice);
                break;

                case  "View All Roles":
                    console.log(answer.choice);
                break;

                case "View All Employees by Department":
                    console.log(answer.choice);
                break;

                case "View All Employees by Role":
                    console.log(answer.choice);
                break;

                case "Add Department":
                    console.log(answer.choice);
                break;

                case "Add Role":
                    console.log(answer.choice);
                break;

                case "Add Employees":
                    console.log(answer.choice);
                break;

                case "Update Employee Role":
                    console.log(answer.choice);
                break;

                case "Exit":
                    db.end();
                break;
            };
        });
};
