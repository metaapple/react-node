```markdown
# React + Node.js Fullstack Project

이 프로젝트는 **React**를 사용한 프론트엔드와 **Node.js** (Express)를 사용한 백엔드로 구성된 기본적인 풀스택 웹 애플리케이션 템플릿입니다.  
프론트엔드와 백엔드를 별도의 폴더로 분리하여 관리하며, 각각 독립적으로 개발 및 실행이 가능하도록 설계되었습니다.

https://github.com/metaapple/react-node

## 프로젝트 개요

- **프론트엔드**: React (Create React App 기반)로 구현된 SPA(Single Page Application)
- **백엔드**: Node.js + Express를 사용한 RESTful API 서버
- **목적**: 풀스택 개발 학습, 실제 서비스 프로토타이핑, 배포 연습 등에 활용 가능한 기본 구조 제공
- **주요 특징**:
  - 프론트엔드와 백엔드 완전 분리 (Monorepo 구조)
  - CORS 설정으로 프론트엔드에서 백엔드 API 호출 가능
  - 환경 변수(.env) 지원
  - Docker 지원 (옵션)

## 기술 스택

### Frontend (`frontend/`)
- React 18+
- React Router (클라이언트 라우팅)
- Axios (API 호출)
- ESLint + Prettier (코드 포맷팅 및 린팅)
- Create React App 또는 Vite (프로젝트에 따라 다름)

### Backend (`backend/`)
- Node.js (v18 이상 추천)
- Express.js
- CORS 미들웨어
- dotenv (환경 변수 관리)
- nodemon (개발 시 자동 재시작)

### 공통
- JavaScript (또는 TypeScript 옵션 가능)
- Git 기반 버전 관리

## 프로젝트 구조

```
react-node/
├── frontend/                 # React 프론트엔드
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── pages/           # 페이지 컴포넌트 (라우팅 기준)
│   │   ├── services/        # API 호출 로직 (axios 인스턴스 등)
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   └── .env                     # REACT_APP_ 접두사 환경 변수
│
├── backend/                  # Node.js 백엔드
│   ├── src/
│   │   ├── routes/          # 라우트 정의
│   │   ├── controllers/     # 비즈니스 로직
│   │   ├── models/          # 데이터 모델 (예: Mongoose 등)
│   │   ├── middleware/      # 커스텀 미들웨어
│   │   ├── server.js        # Express 서버 엔트리 포인트
│   │   └── ...
│   ├── package.json
│   └── .env                     # 서버 환경 변수 (PORT, DB_URL 등)
│
├── Dockerfile                # 전체 프로젝트 도커라이징 (옵션)
├── docker-compose.yml        # 프론트 + 백엔드 + DB 동시 실행 (옵션)
└── README.md                 # 이 파일
```

## 설치 및 실행 방법

### 사전 요구사항
- Node.js v18 이상 설치
- npm 또는 yarn 패키지 매니저
- Git

### 1. 리포지토리 클론
```bash
git clone https://github.com/metaapple/react-node.git
cd react-node
```

### 2. 백엔드 설치 및 실행
```bash
cd backend
npm install

# 개발 모드 (nodemon 사용)
npm run dev

# 또는 프로덕션 모드
npm start
```
- 기본 포트: `5000` (`.env` 파일에서 `PORT` 변경 가능)
- 예시 API: `http://localhost:5000/api/health` → {"status": "OK"}

### 3. 프론트엔드 설치 및 실행
```bash
cd ../frontend
npm install

# 개발 서버 실행
npm start
```
- 기본 포트: `3000`
- 브라우저에서 `http://localhost:3000` 접속
- 프론트엔드에서 API 호출 시 `http://localhost:5000`으로 요청 (CORS 허용 설정 필요)

### 4. 동시에 실행 (루트에서)
루트 디렉토리에 `concurrently`를 설치하여 한 번에 실행할 수 있습니다.

```bash
# 루트에서
npm install -g concurrently

# 패키지 설치 후
concurrently "cd backend && npm run dev" "cd frontend && npm start"
```

## 환경 변수 설정

### backend/.env 예시
```
PORT=5000
NODE_ENV=development
DB_URL=mongodb://localhost:27017/myapp  # MongoDB 사용 시
JWT_SECRET=your_strong_secret
```

### frontend/.env 예시
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API 예시 (백엔드에서 구현 가능)

| Method | Endpoint          | 설명              |
|--------|-------------------|-------------------|
| GET    | /api/health       | 서버 상태 확인    |
| GET    | /api/users        | 사용자 목록       |
| POST   | /api/auth/login   | 로그인            |
| POST   | /api/auth/register| 회원가입          |

## 배포 가이드 (간단 예시)

### 프론트엔드
- `npm run build` → `build/` 폴더 생성
- Vercel, Netlify, GitHub Pages 등에 배포

### 백엔드
- Render, Railway, Heroku, AWS EC2 등에 Node.js 서버 배포
- PM2 사용 추천: `pm2 start src/server.js`

### 전체 배포 (Docker 사용 시)
```bash
docker-compose up --build
```

## 기여하기 (Contributing)
1. Fork the repository
2. 새로운 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경 사항 커밋 (`git commit -m 'Add some amazing feature'`)
4. Push 후 Pull Request 생성

## 라이선스
MIT License (자유롭게 사용 및 수정 가능)

---

문의사항은 Issues에 남겨주세요!  
Happy Coding! 🚀
```