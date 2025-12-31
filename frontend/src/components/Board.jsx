import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * API 기본 경로
 * - 개발(로컬): vite proxy를 통해 /api -> http://localhost:5000
 * - 배포: 같은 도메인에서 서비스하면 기본값(/api)로 동작
 * - 별도 도메인/포트로 백엔드 운영 시: .env에 VITE_API_URL=http://<host>:5000/api 지정
 */
const API_URL = import.meta.env.VITE_API_URL || "/api";

function Board({ title = "자유 게시판" }) {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/posts`);
      console.log(res.data)
      setPosts(res.data);
    } catch (err) {
      alert("게시글을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return alert("제목을 입력하세요.");

    try {
      const res = await axios.post(`${API_URL}/posts`, {
        title: newTitle.trim(),
        content: newContent.trim(),
      });
      setPosts([res.data, ...posts]);
      setNewTitle("");
      setNewContent("");
    } catch (err) {
      alert("글 작성에 실패했습니다.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      alert("삭제 실패");
    }
  };

  return (
    <div className="board container">
      <h2>{title}</h2>

      <form onSubmit={handleAddPost} className="write-form">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="내용 (선택사항)"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows="4"
        />
        <button type="submit">글쓰기</button>
      </form>

      {loading && <p className="loading">로딩 중...</p>}

      <ul className="post-list">
        {posts.length === 0 && !loading && (
          <li className="empty">아직 게시글이 없습니다. 첫 글을 작성해보세요!</li>
        )}
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <div className="post-content">
              <strong>{post.title}</strong>
              {post.content && <p>{post.content}</p>}
              <small>{new Date(post.created_at).toLocaleString("ko-KR")}</small>
            </div>
            <button onClick={() => handleDelete(post.id)} className="btn-delete">
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Board;
