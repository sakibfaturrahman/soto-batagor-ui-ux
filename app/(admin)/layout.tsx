"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Memeriksa jika halaman saat ini adalah halaman login
  const isLoginPage = pathname === "/admin/login";

  // Jika di halaman login, render kontennya saja tanpa sidebar dan header
  if (isLoginPage) {
    return (
      <div className="w-full min-h-screen bg-[#FDFBF7] flex font-sans antialiased text-[#4A3B32]">
        <main className="flex-1 w-full">{children}</main>
      </div>
    );
  }

  // Jika bukan halaman login, render struktur dashboard lengkap seperti biasa
  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex font-sans antialiased text-[#4A3B32]">
      {/* 1. Komponen Navigasi Samping Tetap */}
      <Sidebar />

      {/* 2. Area Konten Utama Kanan */}
      <div className="flex-1 flex flex-col pl-64">
        {/* Atas: Bar Informasi Kontrol Tetap */}
        <Header />

        {/* Bawah: Ruang Pendaratan Konten Halaman Dinamis */}
        <main className="flex-1 p-8 pt-24 w-full max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
