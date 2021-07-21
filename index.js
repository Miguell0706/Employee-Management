//For each add/view functions: 1.Use inquirer to prompt questions where each question corresponds to a column in the table, such as role, name, salary, etc...
//Next using npm mysql package to interact with the database (.query(String Value, PlaceHolder Values,))
const inquirer = require("inquirer");
const { connection } = require("./db");
const db = require("./db");

async function init() {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "what would you like to do?",
      choices: [
        "Add new employee",
        "View all employees",
        "Add new role",
        "View all roles",
        "Add new department",
        "View all departments",
        "Update employee role",
        "Exit",
      ],
    },
  ]);

  switch (choice) {
    case "Add new employee":
      return newEmployee();
    case "View all employees":
      return viewEmployees();
    case "Add new role":
      return newRole();
    case "View all roles":
      return viewRoles();
    case "Add new department":
      return newDepartment();
    case "View all departments":
      return viewDepartments();
    case "Update employee role":
      return updateEmployeeRole();
    case "Exit":
      process.exit();
  }
}
//Function for adding an employee
async function newEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();
  const employeeQuestions = await inquirer.prompt([
    {
      name: "first_Name",
      message: "What is your employee's first name?",
    },
    {
      name: "last_Name",
      message: "What is your employee's last name?",
    },
  ]);

  const role = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "what is the role of the employee?",
    choices: role,
  });

  employeeQuestions.role_id = roleId;

  const manChoices = employees.map(({ id, first_Name, last_Name }) => ({
    name: `${first_Name} ${last_Name}`,
    value: id,
  }));

  const { managerId } = await inquirer.prompt({
    type: "list",
    name: "managerId",
    message: "who is their manager?",
    choices: manChoices,
  });

  employeeQuestions.manager_id = managerId;

  await db.createEmployee(employeeQuestions);

  console.log(employeeQuestions);
}
//Function for adding a role !!!!!NOT FINISHED!!!!
async function newRole() {
  const roleQuestions = await inquirer.prompt([
    {
      name: "Name",
      message: "What is the role called?",
    },
    {
        name: "Salary",
        message: "What is the salary of this new role?",
    },
    {  
         name: "DepartmentId",
         message: "What is the department ID?"
    },
]); 
  const role = roles.map(({ id, title }) => ({
    name: title, 
    value: id,
  }));

  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "what is the role of the employee?",
    choices: role,
  });

  roleQuestions.role_id = roleId;

  const manChoices = employees.map(({ id, first_Name, last_Name }) => ({
    name: `${first_Name} ${last_Name}`,
    value: id,
  }));

  const { managerId } = await inquirer.prompt({
    type: "list",
    name: "managerId",
    message: "who is their manager?",
    choices: manChoices,
  });

  roleQuestions.manager_id = managerId;

  await db.createDepartment(roleQuestions);

  console.log(roleQuestions);
}
//Function for adding new department !!!!NOT FINISHED!!!
async function newDepartment() {
  const roles = await db.findAllRoles();
  const roleQuestions = await inquirer.prompt([
    {
      name: "role_Name",
      message: "What is the role called?",
    },
  ]);

  const role = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "what is the role of the employee?",
    choices: role,
  });

  employeeQuestions.role_id = roleId;

  const manChoices = employees.map(({ id, first_Name, last_Name }) => ({
    name: `${first_Name} ${last_Name}`,
    value: id,
  }));

  const { managerId } = await inquirer.prompt({
    type: "list",
    name: "managerId",
    message: "who is their manager?",
    choices: manChoices,
  });

  employeeQuestions.manager_id = managerId;

  await db.createEmployee(employeeQuestions);

  console.log(employeeQuestions);
}
//Function for updating Employee Role !!!NOT FINISHED!!!
async function updateEmployeeRole(){

}
//Functions for viewing employes, roles, and departments
async function viewEmployees() {
  const employees = await db.findAllEmployees();
  console.table(employees);
  init();
}
async function viewRoles() {
  const roles = await db.findAllRoles();
  console.table(roles);
  init();
}
async function viewDepartments() {
  const departments = await db.findAllDepartments();
  console.table(departments);
  init();
}

init();
