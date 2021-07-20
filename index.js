const inquirer= require("inquirer");
const db = require("./DB");


function init(){
 const {choice}=  inquirer.prompt([
     {
         type: "list",
         name: "choice",
         message: "what would you like to do?",
         choices: [
             {
                 name: "Add new Employee",
                 value: "new_employee"
             }, 
             {
                 name: "view all employees",
                 value: "all_employees"
             }
         ]
     }
 ]);

switch(choice){
    case "new_employee":
        return console.log("adding new employee");
    case "all_employees":
        return console.log("viewing all emps")
}

}


async function newEmployee() {
//   const roles = db.findAllRoles();
  //const employees = db.findAllEmployees();
  const employeeQuestions = await inquirer.prompt([
    { 
     
      name: "fName",
      message: "What is your employee's first name?"
    },
    {   
      
        name: "lName",
        message: "What is your employee's last name?"
    }
  ]);
//   const role = roles.map(({id, title}) => ({
//       name: title,
//       value: id
//   })
// )

// const {roleId} = await prompt({
//     type: "list",
//     name:"roleId",
//     message: "what is the role of the employee?",
//     choices: role
// })

// employeeQuestions.role_id = roleId

// await db.createEmployee(employeeQuestions)

 console.log(employeeQuestions)
}

init();

