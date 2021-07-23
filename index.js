//For eacthe database (.query(String Value, PlaceHolder Values,))
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

  const roleChoices = roles.map((roleObject) => ({
    name: roleObject.title,
    value: roleObject.id,
  }));

  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "what is the role of the employee?",
    choices: roleChoices,
  });

  employeeQuestions.role_id = roleId;

  const managerChoices = employees.map((employeeObject) => ({
    name: `${employeeObject.first_Name} ${employeeObject.last_Name}`,
    value: employeeObject.id,
  }));

  const { managerId } = await inquirer.prompt({
    type: "list",
    name: "managerId",
    message: "who is their manager?",
    choices: managerChoices,
  });

  employeeQuestions.manager_id = managerId;

  await db.createEmployee(employeeQuestions);

  console.log(employeeQuestions);

  init()
}
//Function for adding a role
async function newRole() {
  const department = await db.findAllDepartments();
  const roleQuestions = await inquirer.prompt([
    {
      name: "title",
      message: "What is the role called?",
    },
    {
      name: "salary",
      message: "What is the salary of this new role?",
    },
  ]);

  const departmentChoices = department.map((departmentObject) => ({
    name: departmentObject.name,
    value: departmentObject.id,
  }));

  const { departmentId } = await inquirer.prompt({
    type: "list",
    name: "departmentId",
    message: "what is the department associated to the new role?",
    choices: departmentChoices,
  });

  roleQuestions.department_id = departmentId;

  db.createRole(roleQuestions);

  console.log(roleQuestions);
  init()
}
//Function for adding new department
async function newDepartment() {
  const departmentQuestions = await inquirer.prompt([
    {
      name: "name",
      message: "What is the department called?",
    },
  ]);

  await db.createDepartment(departmentQuestions);

  console.log(departmentQuestions);
  init()
}
//Function for updating Employee Role !!!NOT FINISHED!!!
async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();
  const roles = await db.findAllRoles();
  
  const employeeChoices = employees.map((employeeObject) => ({
    name: `${employeeObject.first_Name} ${employeeObject.last_Name}`,
    value: employeeObject.id,
  }));
  const { employeeName } = await inquirer.prompt({
    type: "list",
    name: "employeeName",
    message: "what is the name of the employee?",
    choices: employeeChoices,
  });

  const roleChoices = roles.map((roleObject) => ({
    name: roleObject.title,
    value: roleObject.id,


  }));

  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "what is the new role of the employee?",
    choices: roleChoices,
  });
  
  const updateChoices = [ { role_id: roleId },{ id: employeeName }];
  await db.updateEmployeeRole(updateChoices);
  console.log(updateChoices);
  init();
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
