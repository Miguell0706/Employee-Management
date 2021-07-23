CREATE DATABASE employee_db;
USE DATABASE employee_db;


CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
 
    id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  CONSTRAINT foreign_key_id FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
 id INT AUTO_INCREMENT PRIMARY KEY,
 first_Name VARCHAR(100) NOT NULL,
 last_Name VARCHAR(100) NOT NULL, 
 role_id INT NOT NULL, 
 CONSTRAINT foreign_key_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
 manager_id INT,
 CONSTRAINT foreign_key_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
 );

