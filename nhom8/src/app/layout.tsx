import type { Metadata } from "next";
import "./globals.css";  // ← giờ đúng rồi vì cùng thư mục

export const metadata: Metadata = {
  title: "Đăng ký thành viên",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}