const db = './schema.sql';
const testDB = './testSchema.sql';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reviews',
});

connection.connect();


module.exports = connection;
