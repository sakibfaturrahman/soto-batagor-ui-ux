"use client";

import Navbar from "@/components/landing/navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A3B32] selection:bg-[#8C6239] selection:text-white antialiased overflow-x-hidden">
      {/* Navbar melayang di bagian atas halaman */}
      <Navbar />

      {/* Konten utama halaman landing */}
      <main className="relative z-0">{children}</main>
    </div>
  );
}
