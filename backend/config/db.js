const mysql = require('mysql2');
require('dotenv').config();


const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

if (process.env.DB_SOCKET) {
  dbConfig.socketPath = process.env.DB_SOCKET;
  console.log('Using MySQL socket:', process.env.DB_SOCKET);
} else {
  dbConfig.host = process.env.DB_HOST;
  dbConfig.port = process.env.DB_PORT || 10050;
}

const pool = mysql.createPool(dbConfig);

// Test DB connection and log success
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connection successful!');
    connection.release();
  }
});

module.exports = pool.promise();