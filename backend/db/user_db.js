// server/db_layer/user_db.js
const pool = require("./db");

/**
 * username + password로 사용자 조회
 * - 로그인용
 * - 반환: { id, username, created_at } 또는 null
 */
async function findUserByCredentials(username, password) {
  const [rows] = await pool.query(
    "SELECT id, username, created_at FROM users WHERE username = ? AND password = ?",
    [username, password]
  );

  if (!rows || rows.length === 0) return null;
  return rows[0];
}

module.exports = {
  findUserByCredentials,
};