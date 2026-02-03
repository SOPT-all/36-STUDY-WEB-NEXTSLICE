import "./globals.css";

export const metadata = {
  title: "Next.js 캐싱 테스트",
  description: "Next.js의 다양한 캐싱 메커니즘을 테스트하는 앱",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
