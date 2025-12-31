CREATE DATABASE board_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE board_db;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id int not null,
  foreign key user_id references users(id)
);

-- 1. users 테이블 생성 (이미 존재하면 생략 가능)
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 2. 사용자 'apple' 삽입 (비밀번호: 1234)
-- 실제 서비스에서는 반드시 비밀번호를 해시 처리해야 합니다! (예: bcrypt)
-- 여기서는 예제이므로 평문으로 삽입합니다.
INSERT INTO users (username, password) 
VALUES ('apple', '1234');

-- 확인용 조회
SELECT * FROM users;
