import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "코드잇로그",
  description: "Next.js App Router 인증인가 적용한 코드잇 블로그",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Providers>
            <Header />
            <main className="flex-1 container px-4">{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
