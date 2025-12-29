import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CacheProvider } from "./context/CacheContext";
import CachePanel from "./components/CachePanel";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 15 캐시 관찰소",
  description: "Next.js 15의 4계층 캐싱 시스템을 실시간으로 관찰하고 학습하는 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        <CacheProvider>
          {children}
          <CachePanel />
        </CacheProvider>
      </body>
    </html>
  );
}
