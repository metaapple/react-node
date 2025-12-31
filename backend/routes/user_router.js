// server/routes/users.js
const express = require("express");
const { findUserByCredentials } = require("../db/user_db");

const router = express.Router();

// POST /api/users/login - 로그인
router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "아이디와 비밀번호를 입력해주세요." });
  }

  username = username.trim();
  password = password.trim();

  if (!username || !password) {
    return res.status(400).json({ error: "아이디와 비밀번호를 입력해주세요." });
  }

  try {
    const user = await findUserByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ error: "아이디 또는 비밀번호가 일치하지 않습니다." });
    }

    // 세션 저장
    req.session.user = {
      id: user.id,
      username: user.username,
      created_at: user.created_at,
    };

    return res.json({
      success: true,
      message: "로그인 성공",
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error("로그인 오류:", err);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// GET /api/users/me - 로그인된 사용자 정보
router.get("/me", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  const { id, username, created_at } = req.session.user;

  return res.json({
    success: true,
    user: { id, username, created_at },
  });
});

// POST /api/users/logout - 로그아웃
router.post("/logout", (req, res) => {
  if (!req.session) {
    return res.json({ success: true, message: "이미 로그아웃 상태입니다." });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("세션 삭제 오류:", err);
      return res.status(500).json({ error: "로그아웃 실패" });
    }

    res.clearCookie("connect.sid"); // 기본 세션 쿠키 이름
    return res.json({ success: true, message: "로그아웃 되었습니다." });
  });
});

module.exports = router;