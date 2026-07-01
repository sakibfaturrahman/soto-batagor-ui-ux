import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// Inisialisasi font Plus Jakarta Sans
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Batagor Abah  — Kelezatan Autentik",
  description: "Landing page pengenalan kuliner tradisional batagor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("h-full antialiased", jakarta.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
