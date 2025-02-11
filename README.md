# CLAYN

**CLAYN**은 심플하고 감각적인 도자기 제품을 디자인하는 브랜드로,  
현대적이고 세련된 느낌을 추구하며, 패럴랙스 효과를 활용한 웹사이트를 통해  
브랜드 스토리와 제품을 더욱 몰입감 있게 전달하고자 합니다.  

## 🌟 프로젝트 개요
- 브랜드 컨셉: 미니멀 & 감성적인 도자기 디자인
- 컬러 톤: 뉴트럴 미니멀 (Off-White, Warm Gray, Deep Beige, Deep Blue)
- 기술 스택: HTML, CSS, JavaScript, GSAP ScrollTrigger, Lenis.js, Swiper.js
- 웹사이트 형식: 원페이지 디자인 (Apple TV 소개 페이지 참고)

## 🛠️ 사용 기술
- **GSAP ScrollTrigger**: 패럴랙스 애니메이션 적용
- **Lenis.js**: 부드러운 스크롤 효과
- **Swiper.js**: 제품 슬라이더 구현
- **Vanilla JavaScript**: 모달 및 인터랙션 기능 직접 구현

## 📌 목표
- 패럴랙스 효과를 활용하여 브랜드 스토리를 강조
- 부드러운 인터랙션을 통해 사용자 경험 향상
- 심플하고 직관적인 UI/UX 디자인 적용

---

📌 **CLAYN 웹사이트 개발 진행 중**  
추후 업데이트 예정! 🚀


**폴더 구조**
📂 project-CLAYN
├── 📂 assets/ // 디자인 리소스: Figma 파일, 참고자료 등
├── 📂 public/ // 정적 파일: 이미지, 폰트, 아이콘 등
│ ├── 📂 images/ // 로고, 제품 사진, 배경 이미지 등
│ ├── 📂 fonts/ // 조선일보명조 같은 커스텀 폰트
│ ├── 📂 icons/ // SVG 등 아이콘 파일
│ ├── 📂 videos/ // 인트로 영상이 있다면 여기에
├── 📂 src/ // 소스 코드
│ ├── 📂 css/ // 스타일 관련 파일
│ │ ├── global.css // 전역 스타일
│ │ ├── style.css // 미디어쿼리 외 전역 스타일
│ │ ├── responsive-desktop.css // 데스크탑 반응형 스타일 (1280px 이상)
│ │ ├── responsive-tablet.css // 태블릿 반응형 스타일 (769px ~ 1279px)
│ │ ├── responsive-mobile.css // 모바일 반응형 스타일 (0 ~ 768px)
│ │ ├── animations.css // GSAP 애니메이션 관련 스타일
│ │ ├── components.css // 버튼, 카드 등 UI 컴포넌트 스타일
│ │ ├── font-style.css // 폰트, 컬러 정의
│ │ ├── fonts.css // 커스텀 폰트 스타일 (다운로드 폰트 정의)
│ ├── 📂 js/ // 기능 관련 파일
│ │ ├── lenis.js // Lenis 스크롤 설정
│ │ ├── animations.js // GSAP 애니메이션 관련 스크립트
│ │ ├── components.js // 공통 UI 컴포넌트 관리
│ │ ├── main.js // 메인 스크립트 (페이지 초기화 및 이벤트 핸들링)
│ │ ├── utils.js // 공통 유틸 함수 (필요 시 추가 가능)
│ ├── 📂 html/ // 개별 페이지 HTML
│ │ ├── mainPage.html // 메인 페이지
│ │ ├── 404.html // 404 페이지
├── index.html // 프로젝트 루트 페이지
└── 파비콘들
