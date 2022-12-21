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


// Function view all employees
function allEmployees() {
    db.query("SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, departments.name AS Department, role.salary AS Salary, CONCAT(a.first_name, ' ', a.last_name) AS Manager FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN departments on  role.department_id = departments.id  LEFT JOIN employee a on employee.manager_id = a.id",

        function (err, res) {
            if (err) throw err;
            // Display json data in a table
            console.table(res);
            // Run the choices 
            runChoices();
        });
};


// Function add department
function addDepartment() {
    inquirer.prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "Department you want to add?",
            validate: (input) => {
                if (input) {
                    return true;
                } else {
                    console.log(' Please enter new department name!');
                    return false;
                }
            }
        }
    ]).then((answer) => {

        db.query("INSERT INTO departments(name) VALUE (?)", answer.newDepartment,

            function (err, res) {
                if (err) throw err;
                // Display department is added                
                console.log('\n"', answer.newDepartment, '" department added.\n');
                // Run the choices 
                runChoices();
            });
    })
};


// Function add department
function addRole() {
    inquirer.prompt([
        {
            name: "roleName",
            type: "input",
            message: "Role you want to add: ",
            validate: (input) => {
                if (input) {
                    return true;
                } else {
                    console.log(' Please enter new role!');
                    return false;
                }
            }
        },
        {
            name: "salary",
            type: "input",
            message: "Salary for new role: ",
            validate: (input) => {
                if (!isNaN(input)) {
                    return true;
                } else {
                    console.log(' Please enter new role salary!');
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "choice",
            message: "Department for new role: ",
            choices: getDepartments()

        }
    ]).then((answer) => {
        // Get department id
        const depID = getDepartments().indexOf(answer.choice) + 1;
        // Object with input title, salary and id
        const newRole = {
            title: answer.roleName,
            salary: answer.salary,
            department_id: depID,
        }

        db.query("INSERT INTO role SET ?", newRole,

            function (err, res) {
                if (err) throw err;
                // Display role name is added                
                console.log('\n"', answer.roleName, '" role is added.\n');
                // Run the choices 
                runChoices();
            });
    });
};


// Function add department
function addEmployee() {
    inquirer.prompt([
        {
            name: "employeeFirstName",
            type: "input",
            message: "Employee first name you want to add: ",
            validate: (input) => {
                if (input) {
                    return true;
                } else {
                    console.log(' Please enter new employee first name!');
                    return false;
                }
            }
        },
        {
            name: "employeeLastName",
            type: "input",
            message: "Employee last name you want to add: ",
            validate: (input) => {
                if (input) {
                    return true;
                } else {
                    console.log(' Please enter new employee last name!');
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "choiceRole",
            message: "Role for new employee: ",
            choices: getRole()
        },
        {
            type: "list",
            name: "choiceManager",
            message: "Manager for new employee: ",
            choices: getEmployeeName()

        }
    ]).then((answer) => {
        // Get role id and manager id
        const roleID = getRole().indexOf(answer.choiceRole) + 1;
        const managerID = getEmployeeName().indexOf(answer.choiceManager) + 1;

        // Object with input first name, last name, role id and manager id
        const newEmployee = {
            first_name: answer.employeeFirstName,
            last_name: answer.employeeLastName,
            role_id: roleID,
            manager_id: managerID
        }

        db.query("INSERT INTO employee SET ?", newEmployee,

            function (err, res) {
                if (err) throw err;
                // Display employee name is added                
                console.log('\n"', answer.employeeFirstName, ' ', answer.employeeLastName, '" is new employee added.\n');
                // Run the choices 
                runChoices();
            });
    });
};


// Function to delete department
function deleteDepartment() {
    inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "Delete department.(Press ENTER to continue) ", //Inquirer 8.2.4 doesn't allow a list type to be first prompt
        },
        {
            type: "list",
            name: "department",
            message: "Choose department: ",
            choices: getDepartments()

        }
    ]).then((answer) => {
        // Get department id
        const departmentID = getDepartments().indexOf(answer.department) + 1;

        db.query(`DELETE from departments WHERE id = ${departmentID}`,

            function (err, res) {
                if (err) throw err;
                // Display department deleted                
                console.log('\n"', answer.department, '" has been deleted', '.\n');
                // Run the choices 
                runChoices();
            });
    });
}


// Function to delete role
function deleteRole() {
    inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "Delete role.(Press ENTER to continue) ", //Inquirer 8.2.4 doesn't allow a list type to be first prompt
        },
        {
            type: "list",
            name: "role",
            message: "Choose role: ",
            choices: getRole()

        }
    ]).then((answer) => {
        // Get role id
        const roleID = getRole().indexOf(answer.role) + 1;

        db.query(`DELETE from role WHERE id = ${roleID}`,

            function (err, res) {
                if (err) throw err;
                // Display role deleted                
                console.log('\n"', answer.role, '" has been deleted', '.\n');
                // Run the choices 
                runChoices();
            });
    });
}


// Function to delete employee
function deleteEmployee() {
    inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "Delete employee.(Press ENTER to continue) ", //Inquirer 8.2.4 doesn't allow a list type to be first prompt
        },
        {
            type: "list",
            name: "employee",
            message: "Choose employee: ",
            choices: getEmployeeName()

        }
    ]).then((answer) => {
        // Get role id
        const employeeID = getEmployeeName().indexOf(answer.employee) + 1;

        db.query(`DELETE from employee WHERE id = ${employeeID}`,

            function (err, res) {
                if (err) throw err;
                // Display employee deleted                
                console.log('\n"', answer.employee, '" has been deleted', '.\n');
                // Run the choices 
                runChoices();
            });
    });
}



// Function update employees role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "Add a role for an employee.(Press ENTER to continue) ", //Inquirer 8.2.4 doesn't allow a list type to be first prompt
        },
        {
            type: "list",
            name: "roleUpdate",
            message: "Role you want to update: ",
            choices: getRole()
        },
        {
            type: "list",
            name: "employeeUpdate",
            message: "Employee you want to update the role: ",
            choices: getEmployeeName()

        }
    ]).then((answer) => {
        // Get role id and manager id
        const roleID = getRole().indexOf(answer.roleUpdate) + 1;
        const employeeID = getEmployeeName().indexOf(answer.employeeUpdate) + 1;

        db.query(`UPDATE employee SET role_id = ${roleID} WHERE  id = ${employeeID}`,

            function (err, res) {
                if (err) throw err;
                // Display role name is added                
                console.log('\n"', answer.employeeUpdate, '" role is update as ', answer.roleUpdate, '.\n');
                // Run the choices 
                runChoices();
            });
    });
}


// View All Employees by Role
function viewEmployeeByRole() {
    inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "View employee by role:(Press ENTER to continue) ", //Inquirer 8.2.4 doesn't allow a list type to be first prompt
        },
        {
            type: "list",
            name: "role",
            message: "Choose a role: ",
            choices: getRole()
        }
    ]).then((answer) => {
        // Get role id
        const roleID = getRole().indexOf(answer.role) + 1;

        db.query(`SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, departments.name AS Department, role.salary AS Salary, CONCAT(a.first_name, ' ', a.last_name) AS Manager FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN departments on  role.department_id = departments.id  LEFT JOIN employee a on employee.manager_id = a.id WHERE employee.role_id = ${roleID}`,
            function (err, res) {
                if (err) throw err;
                // Display employee id first and last name that have selected role
                console.table(`\n${answer.role}`, res);
                // Run the choices 
                runChoices();
            });
    });
};


// View All Employees by Department
function viewEmployeeByDepartment() {
    inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "View employee by departments:(Press ENTER to continue) ", //Inquirer 8.2.4 doesn't allow a list type to be first prompt
        },
        {
            type: "list",
            name: "department",
            message: "Choose a department: ",
            choices: getDepartments()
        }
    ]).then((answer) => {
        // Get department id
        const depID = getDepartments().indexOf(answer.department) + 1;

        db.query(`SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, role.salary AS Salary, CONCAT(a.first_name, ' ', a.last_name) AS Manager FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN departments on  role.department_id = departments.id  LEFT JOIN employee a on employee.manager_id = a.id WHERE departments.id = ${depID} `,
            function (err, res) {
                if (err) throw err;
                // Display employee id first and last name that have selected role
                console.table(`\n${answer.department}`, res);
                // Run the choices 
                runChoices();
            });
    });
}

// View All Employees by Manager
function viewEmployeeByManager() {
    inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "View employee by manager:(Press ENTER to continue) ", //Inquirer 8.2.4 doesn't allow a list type to be first prompt
        },
        {
            type: "list",
            name: "manager",
            message: "Choose a manager: ",
            choices: getEmployeeName()
        }
    ]).then((answer) => {
        // Get employee id
        const nameID = getEmployeeName().indexOf(answer.manager) + 1;

        selectByManager(answer, nameID);

        runChoices();

    });
}


// Function update employees role
function updateEmployeeManager() {
    inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "Add a manager for an employee.(Press ENTER to continue) ", //Inquirer 8.2.4 doesn't allow a list type to be first prompt
        },
        {
            type: "list",
            name: "employeeUpdate",
            message: "Choose the employee you want to update: ",
            choices: getEmployeeName()
        },
        {
            type: "list",
            name: "manager",
            message: "Choose the manager: ",
            choices: getEmployeeName()

        }
    ]).then((answer) => {
        // Get employee id and manager id
        const employeeID = getEmployeeName().indexOf(answer.employeeUpdate) + 1;
        const managerID = getEmployeeName().indexOf(answer.manager) + 1;

        db.query(`UPDATE employee SET manager_id = ${managerID} WHERE  id = ${employeeID}`,

            function (err, res) {
                if (err) throw err;
                // Display role name is added                
                console.log('\n"', answer.employeeUpdate, '" has "', answer.manager, '" as new manager.\n');
                // Run the choices 
                runChoices();
            });
    });
}




// Declare an array that will contain departments
var arrayDep = [];
// Function return the array of departments
function getDepartments() {
    db.query("SELECT * FROM departments",
        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                arrayDep.push(res[i].name);
            }
        });
    return arrayDep;
};


// Declare an array that will contain role
var arrayRole = [];
// Function return the array of role
function getRole() {
    db.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                arrayRole.push(res[i].title);
            }
        });
    return arrayRole;
};


// Declare an array that will contain role
var arrayEmployeeName = [];
// Function return the array of role
function getEmployeeName() {
    db.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                arrayEmployeeName.push(res[i].last_name + ' ' + res[i].first_name);
            }
        });
    return arrayEmployeeName;
};

// Function to select by Manager
function selectByManager(answer, nameID) {

    db.query('SELECT * FROM employee',
        function (err, res) {

            if (err) throw err;

            for (let i = 0; i < res.length; i++) {

                if (res.manager_id = nameID) {


                    db.query(`SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, role.salary AS Salary FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN departments on  role.department_id = departments.id  LEFT JOIN employee a on employee.manager_id = a.id  WHERE a.id = ${nameID} `,

                        function (err, res) {
                            if (err) throw err;
                            // Display employee id first and last name that have selected role
                            console.table(`\n${answer.manager}`, res);
                            // Run the choices                        
                        }
                    );
                    return;
                }
                return
            }
        });
}