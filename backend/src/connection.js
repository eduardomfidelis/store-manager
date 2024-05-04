const { createPool } = require('mysql2/promise');

const connection = createPool({
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  port: process.env.MYSQL_PORT,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
});

module.exports = connection; 