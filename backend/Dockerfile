# Node 20 사용 추천 (18도 가능하지만 최신 보안 패치 적용)
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 lock 파일 먼저 복사 (캐시 활용)
COPY package*.json ./

# production 모드에서만 의존성 설치
RUN npm install --production

# 나머지 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 5000

# 실행 명령어 – Exec form으로 정확히 작성 (이게 핵심!)
CMD ["npm", "start"]