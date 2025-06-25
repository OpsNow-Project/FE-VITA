# VITA (Visual & Intelligent Telemetry Assistant)

## 📁 전체 폴더 구조

```
├── assets/ # 정적 자산 (이미지, 폰트, 스타일 등)
├── components/ # 재사용 가능한 UI 컴포넌트
├── constants/ # 전역 상수 정의
├── context/ # 전역 상태 공유용 React Context
├── data/ # 더미 데이터 또는 정적 데이터
├── lang/ # 다국어(i18n) 설정 및 번역 파일
├── pages/ # 페이지 단위 컴포넌트 (라우트에 매핑됨)
├── route/ # 라우팅 설정 및 보호된 라우트 구성
├── service/ # API 호출 등 비즈니스 로직
├── store/ # 전역 상태 관리 (예: Redux, Zustand 등)
├── utils/ # 공통 유틸 함수 모음
├── App.jsx # 최상위 앱 컴포넌트
└── main.jsx # 앱의 진입점 (ReactDOM 렌더링)
```

---

## 📂 폴더 설명

### `assets/`
- 이미지, 아이콘, 폰트, 전역 CSS/SCSS 등 정적 리소스를 저장합니다.

### `components/`
- 버튼, 카드, 모달 등 재사용 가능한 UI 컴포넌트를 구성합니다.

### `constants/`
- 라우트 경로, 에러 메시지, enum 등 고정 값들을 모아둡니다.

### `context/`
- React Context를 활용한 전역 상태 관리 (예: 테마, 사용자 정보 등) 폴더입니다.

### `data/`
- JSON 형식의 더미 데이터나 임시 테스트용 데이터를 저장합니다.

### `lang/`
- 다국어 처리를 위한 번역 파일이 포함됩니다.
- 보통 `en.json`, `ko.json`, `i18n.js` 형태로 구성됩니다.

### `pages/`
- 실제 화면 단위 페이지 컴포넌트를 구성합니다.
- 각 페이지는 라우팅과 연결됩니다. (예: `/home`, `/login`)

### `route/`
- React Router 기반의 라우팅 설정 파일을 포함합니다.
- 예: `AppRoutes.jsx`, `PrivateRoute.jsx` 등

### `service/`
- 백엔드 API 통신 및 비즈니스 로직을 담당하는 서비스 모듈입니다.
- Axios 등을 통해 서버와 데이터 교환을 수행합니다.

### `store/`
- 전역 상태 관리 관련 파일이 들어갑니다.
- Redux의 경우 `store.js`, `userSlice.js` 등으로 구성됩니다.

### `utils/`
- 날짜 포맷팅, 유효성 검사, 텍스트 처리 등 재사용 가능한 유틸리티 함수들을 모아둡니다.

### `App.jsx`
- 전체 앱의 최상위 컴포넌트입니다.
- Context Provider, 라우터, 레이아웃 등을 구성합니다.

### `main.jsx`
- 앱의 시작점(entry point)입니다.
- `ReactDOM.createRoot(...).render(<App />)`을 통해 `App.jsx`를 렌더링합니다.

---

## 📌 참고사항
- UI 요소는 `components/`에서, 페이지 단위는 `pages/`에서 관리합니다.
- 라우트 경로 및 메시지는 `constants/`를 통해 일괄 관리합니다.
- 전역 상태는 `context/` 또는 `store/`를 통해 공유합니다.
- 서비스 로직은 `service/`에 분리하여 유지보수성을 높입니다.

---
