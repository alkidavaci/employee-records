const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: '',
      user: '',
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

module.exports = db;
  