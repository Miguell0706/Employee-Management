const mysql = require('mysql');
const util = require('util')

const connection = mysql.createConnection({
  host: 'localhost',


  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employee_db',
});

// Connect to the DB
connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;