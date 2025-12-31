# 1. Build stage - Node 20 사용 (Vite 7 호환)
FROM node:20-alpine AS build
WORKDIR /app

# package.json과 lock 파일만 먼저 복사 (캐시 활용)
# docker compose시
COPY frontend/package*.json ./
# dockerfile시
# COPY package*.json ./
RUN npm install

# 전체 소스 코드 복사 (context가 ./frontend이므로 바로 .으로 복사)
# 도커 이미지로
COPY ./frontend .

# dockerfile시
# COPY . .

# Vite production 빌드 실행 → /app/dist 생성됨
RUN npm run build

# 2. Production stage - Nginx로 정적 파일 서빙
FROM nginx:alpine

# build 스테이지에서 만들어진 dist 폴더를 Nginx 위치로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# nginx.conf 복사 (frontend 폴더 안에 있는 파일)
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf 
# --> docker compose시
# dockerfile시
# COPY nginx.conf /etc/nginx/conf.d/default.conf 

# 포트 80 노출
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]