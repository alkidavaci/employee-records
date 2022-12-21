// Packages require
const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');
const db = require('./config/connection');
const cTable = require('console.table')

// Initial port
const PORT = process.env.PORT || 3001;

// Create instance of express
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

db.connect(function (err) {
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
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Role",
                "View All employees by manager",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Delete Department",
                "Delete Role",
                "Delete Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View total budget of departments",
                "Exit"
            ]
        }])
        .then((answer) => {
            switch (answer.choice) {

                case "View All Departments":
                    console.log("\n", answer.choice, "\n");
                    allDepartments();
                    break;

                case "View All Roles":
                    console.log("\n", answer.choice, "\n");
                    allRoles();
                    break;

                case "View All Employees":
                    console.log("\n", answer.choice, "\n");
                    allEmployees()
                    break;

                case "View All Employees by Department":
                    console.log(answer.choice);
                    viewEmployeeByDepartment()
                    break;

                case "View All Employees by Role":
                    console.log("\n", answer.choice, "\n");
                    viewEmployeeByRole();
                    break;

                case "View All employees by manager":
                    console.log("\n", answer.choice, "\n");
                    viewEmployeeByManager();
                    break;

                case "Add Department":
                    console.log("\n", answer.choice, "\n");
                    addDepartment();
                    break;

                case "Add Role":
                    console.log("\n", answer.choice, "\n");
                    addRole();
                    break;

                case "Add Employee":
                    console.log("\n", answer.choice, "\n");
                    addEmployee();
                    break;

                case "Delete Department":
                    console.log("\n", answer.choice, "\n");
                    deleteDepartment();
                    break;

                case "Delete Role":
                    console.log("\n", answer.choice, "\n");
                    deleteRole();
                    break;

                case "Delete Employee":
                    console.log("\n", answer.choice, "\n");
                    deleteEmployee();
                    break;

                case "Update Employee Role":
                    console.log("\n", answer.choice, "\n");
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    console.log("\n", answer.choice, "\n");
                    updateEmployeeManager();
                    break;

                case "View total budget of departments":
                    console.log("\n", answer.choice, "\n");
                    viewBudget();
                    break;

                case "Exit":
                    db.end();
                    break;
            };
        });
};

// Function view all departments
function allDepartments() {
    db.query("SELECT departments.id AS ID, departments.name AS Department FROM departments",

        function (err, res) {
            if (err) throw err;
            // Display json data in a table
            console.table(res);
            // Run the choices 
            runChoices();
        });
};


// Function view all roles
function allRoles() {
    db.query("SELECT role.id AS ID, role.title AS Title, departments.name AS Department FROM role LEFT JOIN departments on departments.id = role.department_id",

        function (err, res) {
            if (err) throw err;
            // Display json data in a table
            console.table(res);
            // Run the choices 
            runChoices();
        });
};
