# 🔍 진행상황

- 📍 **처음에는 애드센스가 사이트를 확인할 수 없다고 함.**
![image](https://github.com/user-attachments/assets/de2e44e5-c450-4fd5-afc0-488e8919a8c4)

- 📍 **애드센스 코드 스니펫을 `layout.js`에 환경변수 사용해 추가**
![image](https://github.com/user-attachments/assets/fb1250db-3786-42d8-a3c9-feb5e1019624)

- 📍 **배포한 Vercel App에서 Environment Variables -> Environments를 Production으로 체크하고 -> 구글에서 제공한 Key와 Value 추가 (ca-pub-xxxxxxxxx)**
![image](https://github.com/user-attachments/assets/a39208b9-329a-4d48-b668-0c224d33198f)

- 📍 **애드센스 코드 스니펫을 확인했던 페이지로 가서 `코드를 삽입했습니다.`를 체크하고 `확인`을 누르면 이전과는 달리 `사이트가 확인되었습니다`라는 문구가 보임.**
![image](https://github.com/user-attachments/assets/5c4b6eb3-728a-461a-b88d-a23a98629a89)

- 📍 **모든 단계를 완료했다며 광고 게재 가능 여부를 검토합니다.**
![image](https://github.com/user-attachments/assets/2a82d8bb-3b95-493f-9b0a-7b81a0666e88)

- 📍 **Vercel 배포 성공화면**
![image](https://github.com/user-attachments/assets/7bf7e5db-109c-4d82-97c0-ba9fb3c725d5)

- 📍 **배포시 개발자도구의 `Network`탭과 `Console`탭에 별다른 오류가 발생하지 않음.**
![image](https://github.com/user-attachments/assets/2615e1fb-546b-4077-8020-30b72a77a8d8)

- 📍 **광고가 로드되지는 않지만 구글 애드센스 API 연결을 성공한 것으로 보입니다. 다만 구글 애드센스가 아직 광고를 허용해주지 않은 상황으로 판단됨. (2~4주까지 소요될 수 있다는 문구 확인)**

---

# 💻 Next.js 블로그 프로젝트 with Google AdSense

이 프로젝트는 Next.js App Router를 기반으로 Google AdSense 광고를 통합한 기본적인 블로그 형태를 제공합니다.

### 프로젝트 구조

```
src/
├── app/
│   ├── layout.js         // 전체 레이아웃
│   ├── page.js           // 홈페이지 (포스트 목록)
│   └── posts/
│       └── [slug]/
│           └── page.js     // 개별 포스트 페이지
├── components/
│   ├── AdSense.js        // AdSense 광고 컴포넌트
│   └── common/
│       ├── Header.js       // 공통 헤더 컴포넌트 (선택 사항)
│       └── Footer.js       // 공통 푸터 컴포넌트 (선택 사항)
└── lib/
    └── posts.js          // 포스트 데이터 처리 로직
```

### 설정 방법

1.  **프로젝트 생성:** Next.js 프로젝트가 없다면 새로 생성합니다.

    ```bash
    npx create-next-app@latest nextjs-blog-adsense
    cd nextjs-blog-adsense
    ```

2.  **파일 및 폴더 생성:** 위 프로젝트 구조에 따라 필요한 폴더(`components`, `components/common`, `lib`, `app/posts/[slug]`)와 파일을 생성합니다.

3.  **`components/AdSense.js`:** 이전 질문에서 사용했던 `AdSense` 컴포넌트 코드를 이 파일에 복사합니다.

4.  **`lib/posts.js`:** 제공된 `lib/posts.js` 코드를 이 파일에 복사하고, 실제 포스트 데이터를 관리하는 방식으로 수정합니다. (JSON 데이터, Markdown 파일 연동, 데이터베이스 연동 등)

5.  **`app/page.js`:** 제공된 `app/page.js` 코드를 이 파일에 복사합니다.

6.  **`app/posts/[slug]/page.js`:** 제공된 `app/posts/[slug]/page.js` 코드를 이 파일에 복사합니다.

7.  **`app/layout.js`:** Google AdSense 스크립트를 `<head>` 섹션에 추가합니다. `.env` 파일에서 `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` 환경 변수를 읽어와 사용하도록 설정합니다.

    ```javascript
    // app/layout.js
    import { Inter } from "next/font/google";
    import "./globals.css";
    import Header from "@/components/common/Header"; // 선택 사항
    import Footer from "@/components/common/Footer"; // 선택 사항

    const inter = Inter({ subsets: ["latin"] });

    export const metadata = {
      title: "나의 블로그",
      description: "Next.js와 Google AdSense를 통합한 블로그 예시입니다.",
    };

    export default function RootLayout({ children }) {
      const adSenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || "";

      return (
        <html lang="ko">
          <head>
            {adSenseId && (
              <script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`}
                crossOrigin="anonymous"
              ></script>
            )}
          </head>
          <body className={inter.className}>
            {/* <Header /> */}
            <main className="container mx-auto py-8">{children}</main>
            {/* <Footer /> */}
          </body>
        </html>
      );
    }
    ```

8.  **.env 파일 설정:** 프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 Google AdSense 게시자 ID를 환경 변수로 설정합니다.

    ```
    NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-your-publisher-id
    ```

    **주의:** 실제 배포 환경에서는 Vercel 프로젝트 설정의 "Environment Variables"에 `NEXT_PUBLIC_GOOGLE_ADSENSE_ID`를 Production 스코프로 설정해야 합니다.

9.  **광고 단위 ID 변경:** `app/page.js`와 `app/posts/[slug]/page.js` 파일 내의 `<AdSense>` 컴포넌트의 `adSlot` prop 값을 실제 Google AdSense 광고 단위 ID로 변경합니다.

    ```javascript
    <AdSense adSlot="YOUR_AUTO_AD_SLOT_ID" adFormat="auto" ... />
    <AdSense adSlot="YOUR_RESPONSIVE_AD_SLOT_ID_TOP" adFormat="auto" ... />
    <AdSense adSlot="YOUR_BANNER_AD_SLOT_ID" adFormat="banner" ... />
    ```

10. **선택 사항: 공통 컴포넌트:** `components/common/Header.js`와 `components/common/Footer.js` 파일을 생성하고 필요한 공통 UI 요소를 추가합니다. `app/layout.js`에서 해당 컴포넌트를 import하여 사용할 수 있습니다.

11. **이미지 폴더:** `public` 폴더 내에 `images` 폴더를 생성하고 예시 이미지(`example.jpg`)를 추가합니다.

### 실행 방법

```bash
npm run dev
# 또는
yarn dev
```

개발 서버를 실행한 후 `http://localhost:3000`에서 블로그를 확인할 수 있습니다.

### 배포 방법

Vercel 플랫폼을 사용하여 배포하는 것을 권장합니다.

1.  Vercel 계정에 깃허브 저장소를 연결합니다.
2.  Vercel 프로젝트 설정에서 환경 변수(`NEXT_PUBLIC_GOOGLE_ADSENSE_ID`)를 Production 스코프로 추가합니다.
3.  Vercel이 자동으로 빌드 및 배포를 진행합니다.

### 주의 사항

- **고품질 콘텐츠:** Google AdSense 승인을 위해서는 웹사이트에 충분하고 가치 있는 고품질 콘텐츠를 게시해야 합니다. 단순히 예시 텍스트만으로는 승인을 받을 수 없습니다.
- **AdSense 정책 준수:** Google AdSense 프로그램 정책을 철저히 준수해야 합니다.
- **광고 단위 ID:** `<AdSense>` 컴포넌트의 `adSlot`에는 실제 AdSense 광고 단위 ID를 사용해야 합니다.
- **환경 변수:** 개발 환경과 배포 환경의 환경 변수 설정을 올바르게 관리해야 합니다.

이 README 파일은 기본적인 블로그 형태를 구축하고 AdSense를 통합하는 과정을 안내합니다. 실제 운영 환경에서는 데이터 관리 방식, 디자인, 추가 기능 등을 필요에 따라 확장해야 합니다.
