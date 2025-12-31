아래는 이전에 만든 README.md를 최신 상태로 업데이트한 버전입니다.  
Docker와 Docker Compose 지원 내용을 상세히 추가하고, 프로젝트 구조에도 새로 추가된 파일들(Dockerfile, docker-compose.yml, nginx.conf)을 반영했습니다.

```markdown
# React + Node.js Fullstack Project

이 프로젝트는 **React**를 사용한 프론트엔드와 **Node.js** (Express)를 사용한 백엔드로 구성된 풀스택 웹 애플리케이션 템플릿입니다.  
프론트엔드와 백엔드를 별도의 폴더로 분리하여 관리하며, 각각 독립적으로 개발 및 실행이 가능하도록 설계되었습니다.

https://github.com/metaapple/react-node

## 프로젝트 개요

- **프론트엔드**: React (Create React App 또는 Vite 기반) SPA
- **백엔드**: Node.js + Express RESTful API 서버
- **목적**: 풀스택 개발 학습, 프로토타이핑, 배포 연습용 기본 구조 제공
- **주요 특징**:
  - 프론트엔드와 백엔드 완전 분리 (Monorepo 구조)
  - CORS 설정으로 로컬 개발 시 원활한 API 호출
  - 환경 변수(.env) 지원
  - **Docker & Docker Compose 완전 지원** (단일 컨테이너 또는 멀티 컨테이너 배포 가능)
  - Nginx를 통한 React 정적 파일 서빙 + API 프록시

## 기술 스택

### Frontend (`frontend/`)
- React 18+
- React Router
- Axios
- ESLint + Prettier

### Backend (`backend/`)
- Node.js (v18 이상 추천)
- Express.js
- CORS, dotenv
- nodemon (개발 시)

### 공통 / 배포
- JavaScript
- Docker
- Docker Compose
- Nginx (프로덕션 서빙)

## 프로젝트 구조

```plaintext
react-node/
├── frontend/                 # React 프론트엔드
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/      # 재사용 컴포넌트
│   │   ├── pages/           # 페이지 컴포넌트
│   │   ├── services/        # API 호출 로직
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
│   │   ├── models/          # 데이터 모델 (예: Mongoose)
│   │   ├── middleware/      # 커스텀 미들웨어
│   │   ├── server.js        # Express 엔트리 포인트
│   │   └── ...
│   ├── package.json
│   └── .env                     # 서버 환경 변수 (PORT, DB_URL 등)
│
├── Dockerfile                # 멀티스테이지 빌드 (React 빌드 → Nginx + Node)
├── nginx.conf                # Nginx 설정 (React 정적 파일 + API 프록시)
├── docker-compose.yml        # Docker Compose 정의 (app + mongo)
└── README.md                 # 이 파일
```

## 설치 및 실행 방법

### 1. 일반 로컬 개발 (Docker 없이)

```bash
git clone https://github.com/metaapple/react-node.git
cd react-node
```

#### 백엔드
```bash
cd backend
npm install
npm run dev    # 또는 npm start
# → http://localhost:5000
```

#### 프론트엔드
```bash
cd ../frontend
npm install
npm start
# → http://localhost:3000
```

### 2. Docker Compose로 한 번에 실행 (추천)

```bash
# 프로젝트 루트에서
docker-compose up --build

# 백그라운드 실행
docker-compose up -d --build
```

- **프론트엔드**: http://localhost (포트 80 → Nginx)
- **백엔드 API**: http://localhost/api/... (Nginx가 /api/ 를 백엔드로 프록시)
- **MongoDB** (옵션): mongodb://localhost:27017/myapp

로그 확인 및 종료
```bash
docker-compose logs -f
docker-compose down
```

## 환경 변수 설정

### backend/.env 예시
```
PORT=5000
NODE_ENV=production
DB_URL=mongodb://mongo:27017/myapp
JWT_SECRET=your_strong_secret
```

### frontend/.env 예시 (로컬 개발 시)
```
REACT_APP_API_URL=http://localhost:5000/api
```

Docker 실행 시에는 `docker-compose.yml`의 `environment` 또는 `.env` 파일 마운트로 설정 가능

## API 예시

| Method | Endpoint            | 설명           |
|--------|---------------------|----------------|
| GET    | /api/health         | 서버 상태 확인 |
| GET    | /api/users          | 사용자 목록    |
| POST   | /api/auth/login     | 로그인         |
| POST   | /api/auth/register  | 회원가입       |

## 배포 가이드

### 로컬/서버 직접 배포
- 프론트엔드: `npm run build` → build 폴더를 Nginx나 정적 호스팅에 배포
- 백엔드: PM2 등으로 프로세스 관리 (`pm2 start src/server.js`)

### Docker 기반 배포 (Render, Railway, Fly.io, AWS 등)
```bash
docker-compose up --build -d
```
또는 멀티스테이지 Dockerfile만 사용해 단일 컨테이너로 배포 가능

## 기여하기 (Contributing)

1. 리포지토리 Fork
2. 새 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 및 푸시
4. Pull Request 생성

## 라이선스

MIT License — 자유롭게 사용 및 수정 가능

---

문의사항은 Issues에 남겨주세요!  
Happy Coding! 🚀
```
