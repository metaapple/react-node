# Stage 1: React 빌드
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: 백엔드 + Nginx (React 정적 파일 서빙)
FROM node:20-alpine

# 백엔드 준비
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --production
COPY backend/ ./

# React 빌드 파일 복사
COPY --from=frontend-build /app/frontend/build /app/frontend/build

# Nginx 설치 (React 정적 파일 서빙용)
RUN apk add --no-cache nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 80 5000

# 환경 변수 (docker-compose에서 덮어쓰기 가능)
ENV PORT=5000

# 컨테이너 시작 시 백엔드 + Nginx 동시 실행
CMD ["sh", "-c", "nginx && node src/server.js"]