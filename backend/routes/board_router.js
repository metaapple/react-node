// server/routes/posts.js
const express = require("express");
const {
  getAllPosts,
  createPost,
  getPostById,
  deletePostById,
  getPostAuthorId, // 필요 시 추가: 게시글의 user_id를 조회하는 함수
} = require("../db/board_db");

const router = express.Router();

// ==================== 인증 미들웨어 ====================
function requireAuth(req, res, next) {
  if (!req.session?.user?.id) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }
  next();
}

// ==================== 게시글 목록 ====================
router.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();
    return res.json(posts);
  } catch (err) {
    console.error("게시글 목록 조회 오류:", err);
    return res.status(500).json({ error: "서버 오류" });
  }
});

// ==================== 게시글 작성 ====================
router.post("/", requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.session.user.id; // 로그인된 사용자 ID

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "제목은 필수이며 공백만 입력할 수 없습니다." });
  }

  const normTitle = title.trim();
  const normContent = content && typeof content === "string" ? content.trim() : null;

  try {
    const insertId = await createPost(normTitle, normContent, userId);

    // 생성된 게시글 조회해서 반환 (클라이언트에 최신 정보 제공)
    const newPost = await getPostById(insertId);

    if (!newPost) {
      return res.status(500).json({ error: "게시글 생성 후 조회에 실패했습니다." });
    }

    return res.status(201).json(newPost);
  } catch (err) {
    console.error("게시글 작성 오류:", err);
    return res.status(500).json({ error: "서버 오류" });
  }
});

// ==================== 게시글 삭제 ====================
router.delete("/:id", requireAuth, async (req, res) => {
  const postId = Number(req.params.id);

  // ID 유효성 검사
  if (!Number.isInteger(postId) || postId <= 0) {
    return res.status(400).json({ error: "유효하지 않은 게시글 ID입니다." });
  }

  const userId = req.session.user.id;

  try {
    // 1. 게시글 존재 여부 + 작성자 확인
    const post = await getPostById(postId);

    if (!post) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }

    // 2. 본인 게시글이 아닌 경우 차단
    if (post.user_id !== userId && post.userid !== userId) { // DB 컬럼명에 따라 둘 중 하나 사용
      return res.status(403).json({ error: "본인이 작성한 게시글만 삭제할 수 있습니다." });
    }

    // 3. 실제 삭제
    const affected = await deletePostById(postId);

    if (affected === 0) {
      return res.status(404).json({ error: "삭제할 게시글이 없습니다." });
    }

    return res.json({ success: true, message: "게시글이 삭제되었습니다." });
  } catch (err) {
    console.error("게시글 삭제 오류:", err);
    return res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;