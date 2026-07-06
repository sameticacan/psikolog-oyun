import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terapi Odası | Mini Vaka Simülatörü",
  description:
    "Çocuk, ergen ve genç yetişkin vakalarıyla etik yaklaşım farkındalığı geliştiren eğitici mini simülasyon.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
