import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";

function Header() {
  // Zustand에서 상태와 액션 가져오기
  const { user, login, logout, loading, error } = useAuthStore();

  // 로컬 상태 (폼 입력용)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(username, password);

    if (result?.success) {
      setUsername("");
      setPassword("");
    }

  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="header-left">
        <img src="/assets/img/image2.png" width="300" height="200"/>
        </div>

        <div className="header-right">
          {user ? (
            <div className="user-info">
              <strong>{user.username}</strong>님 환영합니다!
              <button onClick={handleLogout} className="btn-logout">
                로그아웃
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
              </button>
            </form>
          )}

          {error && <p className="login-error">{error}</p>}
        </div>
      </div>
    </header>
  );
}

export default Header;
