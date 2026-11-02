# 프로젝트 작업 규칙 (Project Guidelines)

이 프로젝트는 Vanilla JavaScript 기반의 Vite 프로젝트이며, GitHub를 통해 Netlify로 배포됩니다.
모든 코드 작성 및 수정 시 아래 규칙을 준수합니다.

## 1. 파일 분리 및 디렉터리 구조
- **HTML, CSS, JavaScript 분리**: 각 코드는 인라인으로 혼용하지 않고 별도의 파일로 분리하여 작성합니다.
- **루트 디렉터리 (`/`)**:
  - 진입점 HTML 파일인 `index.html`을 위치시킵니다.
  - `vite.config.js`, `package.json` 등 프로젝트 설정 파일을 위치시킵니다.
- **소스 디렉터리 (`/src`)**:
  - 애플리케이션의 모든 CSS 파일과 JavaScript 파일을 `src` 폴더 내부에 작성합니다.

## 2. 모듈 연결 및 번들링 방식
- **JavaScript (ES Modules)**: `index.html`에서 `<script type="module" src="/src/main.js"></script>` 형태로 연결하며, JS 파일 간에도 ES 모듈(`import` / `export`) 방식을 사용합니다.
- **CSS Import**: CSS 파일은 HTML의 `<link>` 태그 대신 JavaScript 진입 파일(`src/main.js`)에서 `import './style.css'` 형태로 불러와 Vite 빌드 파이프라인에 포함되도록 합니다.

## 3. 외부 라이브러리 관리
- 외부 JavaScript 라이브러리는 반드시 `npm install`을 통해 설치한 후 ES 모듈 `import` 구문으로 불러와 사용합니다.
- HTML 내 CDN `<script>` 또는 `<link>` 방식은 사용하지 않습니다.

## 4. 코드 수정 원칙
- 작업 전 기존 파일과 설정(`package.json`, `vite.config.js`, `index.html`, `src/*`)을 먼저 확인하고, 필요한 부분만 최소한으로 수정합니다.

## 5. 빌드 및 배포 (Netlify)
- **Build command**: `npm run build`
- **Publish directory**: `dist`

