import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "블로그",
  description: "블로그",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-gray-100 items-center">
          <Header />
          <main className="flex-1 container px-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
