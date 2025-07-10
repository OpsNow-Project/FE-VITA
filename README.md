# 🧑‍💻 [VITA] 프론트엔드 가이드

---

## 폴더 구조 목록 & 항목 설명

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

---

## 설치 항목

```bash
npm install -D vite-plugin-svgr
npm install recharts
npm install ag-grid-react@latest ag-grid-community@latest
```

(설치해야 할 것 있으면 추가해주세요!)

---

## 🎨 Tailwind CSS 사용 가이드

### 📁 설정 위치

- Tailwind 설정 파일: `tailwind.config.js`

### ✅ 원하는 색상 등록 예시

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        chatblue: "#5E81AC",
        chatblueHover: "#3C567B",
        danger: "#BF616A",
      },
    },
  },
};
```

사용 예시:

```tsx
<div className="bg-chatblue text-white">Chat</div>
```

---

## 🖼️ SVG 파일 불러오기

### ⚙️ vite.config.ts 설정

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
});
```

### ✅ SVG 불러오기 (React 컨텐츠로 불러오기)

```tsx
import ChatIcon from "../assets/img/chat.svg?react";

<ChatIcon className="w-6 h-6 text-white" />;
```

- 바로 `?react` 키워보드를 별도로 추가해야 컨텐츠로 인식
- 색상 변경 시 SVG 내부 `fill="currentColor"` 설정을 해야 Tailwind의 `text-white` 등으로 색상 적용 가능

---
