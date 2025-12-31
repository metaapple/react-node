const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  port : 3307,
  user: "root",
  password: "1234",  // 본인 MySQL 비밀번호로 변경
  database: "board_db",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;