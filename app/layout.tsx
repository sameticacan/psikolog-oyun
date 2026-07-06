import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terapi Odası | Mini Vaka Simülatörü",
  description:
    "Çocuk, ergen ve genç yetişkin vakalarıyla etik yaklaşım farkındalığı geliştiren eğitici mini simülasyon.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
