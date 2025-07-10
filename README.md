# [VITA] 프론트엔드 가이드

---

##  프로젝트 소개

**VITA**는 Kubernetes 클러스터 모니터링 및 관리 대시보드입니다. 실시간 메트릭 시각화와 AI 기반 챗봇 상담 기능을 제공하는 현대적인 웹 애플리케이션입니다.

### 시스템 요구사항

- **Node.js**: 18.0.0 이상
- **npm**: 9.0.0 이상
- **브라우저**: Chrome, Firefox, Safari, Edge 최신 버전

---

##  설치 방법

### 1. 저장소 클론

```bash
git clone https://github.com/OpsNow-Project/FE-VITA.git
cd FE-VITA
```

### 2. 의존성 설치

```bash
# 기본 의존성 설치
npm install

# 추가 필수 패키지 설치
npm install -D vite-plugin-svgr
npm install recharts
npm install ag-grid-react@latest ag-grid-community@latest
```

### 3. 환경 설정 (선택사항)

프로젝트 루트에 `.env` 파일을 생성하여 환경 변수를 설정할 수 있습니다:

```bash
# .env
VITE_API_BASE_URL=http://api.your.svr.com
VITE_GRAFANA_BASE_URL=http://your.grafana.addr
```


**다른 환경 설정 예시**:
```bash
# 개발 환경
VITE_API_BASE_URL=http://localhost:8080

# 프로덕션 환경  
VITE_API_BASE_URL=https://api.yourdomain.com
```

---

##  실행 방법

### 개발 서버 실행

```bash
# 개발 모드로 실행 (기본 포트: 5173)
npm run dev

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 린팅 검사
npm run lint
```

### 실행 확인

개발 서버가 정상적으로 실행되면 다음 URL에서 접근할 수 있습니다:

- **로컬 접근**: http://localhost:5173
- **네트워크 접근**: http://[your-ip]:5173

---

##  폴더 구조 목록 & 항목 설명

```
├───assets         # 정적이나 이미지 자료 포함
│   └───img        # PNG, SVG, logo 등의 이미지 파일 경로
├───components     # 다음과 같은 UI 요소: Button, Badge, Card, TableRow...
├───layouts        # DashboardLayout...
├───pages          # 목적에 따른 Routing Page (예: Dashboard, Login, Setting)
├───types          # TypeScript 타입 정의 (interface, type alias 등)
├───api
├───hooks
└───utils          # 공통 함수, date formatter 등 기능 함수

```


