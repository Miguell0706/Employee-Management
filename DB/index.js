const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  //Functions for creating 
  createEmployee(values) {
    return this.connection.query("INSERT INTO employee SET ?", values);
  }
  createRole(values) {
    return this.connection.query("INSERT INTO role SET ?", values);
  }
  createDepartment(values) {
    return this.connection.query("INSERT INTO department SET ?", values);
  }
  //Find all functions
  findAllEmployees() {
    return this.connection.query(
      "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id"
    );
  }
  findAllRoles() {
    return this.connection.query(
      "SELECT *, role.id AS id FROM role LEFT JOIN department ON role.department_id = department.id"
    );
  }
  findAllDepartments() {
    return this.connection.query(
      "SELECT * FROM department"
    );
  }
  //Update Employee Role Function
  updateEmployeeRole(values) {
    return this.connection.query("UPDATE employee SET ? WHERE ?", values);
  }
}
module.exports = new DB(connection);
