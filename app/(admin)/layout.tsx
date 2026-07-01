"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Otomatis menutup sidebar ketika Abah berpindah halaman via mobile (User Control)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const isLoginPage = pathname === "/admin/login";

  // Kondisi bersih untuk halaman login
  if (isLoginPage) {
    return (
      <div className="w-full min-h-screen bg-[#FDFBF7] flex font-sans antialiased text-[#4A3B32]">
        <main className="flex-1 w-full">{children}</main>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex font-sans antialiased text-[#4A3B32] relative">
      {/* 1. SIDEBAR DENGAN RESPONSIVE WRAPPER */}
      {/* Di desktop tetap muncul (md:translate-x-0), di mobile bersembunyi melayang sesuai state */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <Sidebar />
      </div>

      {/* Gelap Latar Belakang (Overlay) saat sidebar mobile aktif */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* 2. AREA KONTEN UTAMA */}
      {/* pl-0 di mobile, pl-64 di desktop agar tidak bentrok dengan sidebar */}
      <div className="flex-1 flex flex-col pl-0 md:pl-64 min-w-0">
        {/* Atas: Bar Informasi Kontrol Tetap */}
        <Header />

        {/* TOMBOL HAMBURGER MOBILE (Visibility & User Control) */}
        {/* Tombol melayang khusus mobile untuk memicu buka/tutup laci menu */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed bottom-6 right-6 z-50 p-3.5 bg-[#8C6239] text-white rounded-full shadow-lg md:hidden hover:bg-[#734F2E] active:scale-95 transition-all"
          aria-label="kontrol menu"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Bawah: Ruang Pendaratan Konten Halaman Dinamis */}
        {/* Penyesuaian padding p-4 di mobile agar tidak terlalu sesak, p-8 di desktop */}
        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-24 w-full max-w-[1600px] mx-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
