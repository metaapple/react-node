# ============ Stage 1: Frontend Build (Vite + React) ============
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

# 패키지 파일 먼저 복사 (레이어 캐싱 최적화)
COPY frontend/package*.json ./
RUN npm ci --silent

# 소스 코드 복사
COPY frontend/ ./

# Vite 빌드 실행 (dist 폴더 생성 ← Vite는 build 시 dist 폴더 생성!)
RUN npm run build

# 빌드 결과 확인 (디버깅용, 실패 시 로그에 출력)
RUN ls -la dist/


# ============ Stage 2: Production Server (Backend + Nginx) ============
FROM node:20-alpine

# Nginx 설치
RUN apk add --no-cache nginx

# 작업 디렉토리 설정
WORKDIR /app/backend

# 백엔드 의존성 설치 (production only)
COPY backend/package*.json ./
RUN npm ci --production

# 백엔드 소스 코드 복사
COPY backend/ ./

# 프론트엔드 빌드 결과 복사 (Vite는 dist 폴더 생성!)
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/http.d/default.conf

# 포트 노출
EXPOSE 8080

# 환경 변수 기본값
ENV NODE_ENV=production
ENV PORT=5000

# Nginx와 Node.js 동시에 실행
# 백그라운드로 Nginx 실행 후 Node 서버 실행
CMD nginx && node index.js