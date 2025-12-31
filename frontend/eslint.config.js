// ESLint 기본 추천 규칙 가져오기
import js from '@eslint/js'

// 브라우저 전역 변수 (window, document 등) 가져오기
import globals from 'globals'

// React Hooks 규칙 플러그인
import reactHooks from 'eslint-plugin-react-hooks'

// React Fast Refresh (Vite용) 규칙 플러그인
import reactRefresh from 'eslint-plugin-react-refresh'

// 새 ESLint 설정 방식에서 사용되는 함수들
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // 빌드 폴더(dist)는 린트 검사에서 제외
  globalIgnores(['dist']),

  {
    // .js 와 .jsx 파일만 검사 대상
    files: ['**/*.{js,jsx}'],

    // 추천 설정들 적용
    extends: [
      js.configs.recommended,              // 기본 JavaScript 추천 규칙
      reactHooks.configs.flat.recommended, // React Hooks 규칙 (useState, useEffect 등)
      reactRefresh.configs.vite,           // Vite에서 React Fast Refresh 잘 되게 하는 규칙
    ],

    // 언어 옵션 설정
    languageOptions: {
      ecmaVersion: 2020,              // ES2020 문법 지원
      globals: globals.browser,       // 브라우저 환경 전역 변수 허용
      parserOptions: {
        ecmaVersion: 'latest',         // 최신 JS 문법 사용
        ecmaFeatures: { jsx: true },  // JSX 문법 지원
        sourceType: 'module',         // import/export 사용 (module 방식)
      },
    },

    // 커스텀 규칙
    rules: {
      // 사용 안 하는 변수는 에러로 표시 (단, 대문자나 _로 시작하는 건 무시 → React 컴포넌트 등)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])