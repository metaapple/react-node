- 윈도우에서 테스트시 다음과 같은 port충돌이 있을 수 있음. <br>
<img width="733" height="435" alt="2025-12-31 12 26 31" src="https://github.com/user-attachments/assets/f3bbc607-e999-421d-a416-8e978e5cdf57" />

<img width="1900" height="980" alt="image" src="https://github.com/user-attachments/assets/4064ff29-4021-45c2-b477-6a7d927e4aff" />


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

```
C:\Users\Administrator\Desktop\react-node>docker-compose down       
time="2025-12-31T14:45:01+09:00" level=warning msg="C:\\Users\\Administrator\\Desktop\\react-node\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] Running 3/3
 ✔ Container react-node-frontend-1  Removed                                                                                                                          0.1s 
 ✔ Container react-node-backend-1   Removed                                                                                                                          0.1s 
 ✔ Network react-node_default       Removed                                                                                                                          0.4s 

C:\Users\Administrator\Desktop\react-node>docker-compose build --no-cache         
time="2025-12-31T14:45:14+09:00" level=warning msg="C:\\Users\\Administrator\\Desktop\\react-node\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] Building 16.9s (27/27) FINISHED
 => [internal] load local bake definitions                                                                                                                           0.1s 
 => => reading from stdin 1.10kB                                                                                                                                     0.1s 
 => [backend internal] load build definition from Dockerfile                                                                                                         0.0s 
 => => transferring dockerfile: 522B                                                                                                                                 0.0s 
 => [frontend internal] load build definition from Dockerfile                                                                                                        0.0s 
 => => transferring dockerfile: 1.04kB                                                                                                                               0.0s 
 => [frontend internal] load metadata for docker.io/library/nginx:alpine                                                                                             1.8s 
 => [backend internal] load metadata for docker.io/library/node:20-alpine                                                                                            1.8s 
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                          0.0s 
 => [auth] library/nginx:pull token for registry-1.docker.io                                                                                                         0.0s 
 => [frontend internal] load .dockerignore                                                                                                                           0.0s 
 => => transferring context: 2B                                                                                                                                      0.0s 
 => [backend internal] load .dockerignore                                                                                                                            0.0s 
 => => transferring context: 90B                                                                                                                                     0.0s 
 => [backend 1/5] FROM docker.io/library/node:20-alpine@sha256:658d0f63e501824d6c23e06d4bb95c71e7d704537c9d9272f488ac03a370d448                                      0.2s 
 => => resolve docker.io/library/node:20-alpine@sha256:658d0f63e501824d6c23e06d4bb95c71e7d704537c9d9272f488ac03a370d448                                              0.2s 
 => [backend internal] load build context                                                                                                                            0.1s 
 => => transferring context: 741B                                                                                                                                    0.0s 
 => [frontend internal] load build context                                                                                                                           0.4s 
 => => transferring context: 394.38kB                                                                                                                                0.3s 
 => CACHED [frontend stage-1 1/3] FROM docker.io/library/nginx:alpine@sha256:8491795299c8e739b7fcc6285d531d9812ce2666e07bd3dd8db00020ad132295                        0.2s 
 => => resolve docker.io/library/nginx:alpine@sha256:8491795299c8e739b7fcc6285d531d9812ce2666e07bd3dd8db00020ad132295                                                0.2s 
 => CACHED [backend 2/5] WORKDIR /app                                                                                                                                0.0s 
 => [backend 3/5] COPY package*.json ./                                                                                                                              0.1s 
 => [backend 4/5] RUN npm install --production                                                                                                                       4.2s 
 => [frontend build 3/6] COPY frontend/package*.json ./                                                                                                              0.1s 
 => [frontend build 4/6] RUN npm install                                                                                                                             7.5s 
 => [backend 5/5] COPY . .                                                                                                                                           0.2s 
 => [backend] exporting to image                                                                                                                                     2.2s 
 => => exporting layers                                                                                                                                              1.1s 
 => => exporting manifest sha256:627b5d2980c3a0dff81767ebf402cb3708a6dcfe2883089045ca6f369be02846                                                                    0.0s 
 => => exporting config sha256:f9f8f52b97c03c9c5a2ac8b02d6ce9151c2fb98bb64bdd080cba9a58a9b187a0                                                                      0.0s 
 => => exporting attestation manifest sha256:f55c5f346f06745ae2e6f8a1b94d5f817e57c241a297db684774ad40ea5c5900                                                        0.1s 
 => => exporting manifest list sha256:cdcce61a0824f33e6afbedd0b5f4817689c6405611b87bb8ff988df2f41bd0b6                                                               0.0s 
 => => naming to docker.io/library/react-node-backend:latest                                                                                                         0.0s 
 => => unpacking to docker.io/library/react-node-backend:latest                                                                                                      0.7s 
 => [backend] resolving provenance for metadata file                                                                                                                 0.0s 
 => [frontend build 5/6] COPY ./frontend .                                                                                                                           1.8s 
 => [frontend build 6/6] RUN npm run build                                                                                                                           3.1s 
 => [frontend stage-1 2/3] COPY --from=build /app/dist /usr/share/nginx/html                                                                                         0.1s 
 => [frontend stage-1 3/3] COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf                                                                                   0.0s 
 => [frontend] exporting to image                                                                                                                                    0.4s 
 => => exporting layers                                                                                                                                              0.1s 
 => => exporting manifest sha256:aab1e16cf1b23577174f08e38b8cd710b71e2333fa2ce978e52abbffd759f853                                                                    0.0s 
 => => exporting config sha256:ee6f3a2491705f997618850ada18cc4d8fe1b19bad0d854260ce1e15f386d0db                                                                      0.0s 
 => => exporting attestation manifest sha256:5eb235d73ada0b5e87aeb9a198dbb197837c4049012bf2d188c598b0c26395ef                                                        0.0s 
 => => exporting manifest list sha256:8d9da0257518ec65a79154dfce763769efb27088ba4f0e96057b83a591838be7                                                               0.0s 
 => => naming to docker.io/library/react-node-frontend:latest                                                                                                        0.0s 
 => => unpacking to docker.io/library/react-node-frontend:latest                                                                                                     0.1s 
 => [frontend] resolving provenance for metadata file                                                                                                                0.0s 
[+] Building 2/2
 ✔ react-node-backend   Built                                                                                                                                        0.0s 
 ✔ react-node-frontend  Built                                                                                                                                        0.0s 

C:\Users\Administrator\Desktop\react-node>docker-compose up              
time="2025-12-31T14:46:02+09:00" level=warning msg="C:\\Users\\Administrator\\Desktop\\react-node\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] Running 3/3
 ✔ Network react-node_default       Created                                                                                                                          0.1s 
 ✔ Container react-node-frontend-1  Created                                                                                                                          0.1s 
 ✔ Container react-node-backend-1   Created                                                                                                                          0.2s 
Attaching to backend-1, frontend-1
frontend-1  | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
frontend-1  | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
frontend-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
frontend-1  | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
frontend-1  | 10-listen-on-ipv6-by-default.sh: info: /etc/nginx/conf.d/default.conf differs from the packaged version
frontend-1  | /docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
frontend-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
frontend-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
frontend-1  | /docker-entrypoint.sh: Configuration complete; ready for start up
frontend-1  | 2025/12/31 05:46:04 [notice] 1#1: using the "epoll" event method
frontend-1  | 2025/12/31 05:46:04 [notice] 1#1: nginx/1.29.4
frontend-1  | 2025/12/31 05:46:04 [notice] 1#1: built by gcc 15.2.0 (Alpine 15.2.0)
frontend-1  | 2025/12/31 05:46:04 [notice] 1#1: OS: Linux 6.6.87.2-microsoft-standard-WSL2
frontend-1  | 2025/12/31 05:46:04 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
frontend-1  | 2025/12/31 05:46:04 [notice] 1#1: start worker processes
frontend-1  | 2025/12/31 05:46:04 [notice] 1#1: start worker process 29
frontend-1  | 2025/12/31 05:46:04 [notice] 1#1: start worker process 30
frontend-1  | 2025/12/31 05:46:04 [notice] 1#1: start worker process 31
frontend-1  | 2025/12/31 05:46:04 [notice] 1#1: start worker process 32
backend-1   |
backend-1   | > board-server@1.0.0 start
backend-1   | > node index.js
backend-1   |
backend-1   | Warning: connect.session() MemoryStore is not
backend-1   | designed for a production environment, as it will leak
backend-1   | memory, and will not scale past a single process.
backend-1   | 서버 실행 중: http://localhost:5000


v View in Docker Desktop   o View Config   w Enable Watch


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
