const connection = require("./connection")

class DB {
    constructor(connection) {
        this.connection = connection
        
      }
  //create function
  createEmployee(values) {
    return this.connection.query("INSERT INTO employee SET ?", values)
  }
  
  findAllEmployees() {
    return this.connection.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id")
  }
  findAllRoles() {
    return this.connection.query("SELECT * FROM role LEFT JOIN department ON role.department_id = department.id")
    
  }
}
module.exports = new DB(connection)