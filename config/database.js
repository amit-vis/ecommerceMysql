const mysql = require('mysql2/promise')
const secure = require('./secure');

const connection = mysql.createPool({
    host: secure.host,
    database: secure.database,
    password: secure.password,
    user: secure.user
})

if (connection) {
  console.log('Connected to the database');
}

module.exports = connection;
