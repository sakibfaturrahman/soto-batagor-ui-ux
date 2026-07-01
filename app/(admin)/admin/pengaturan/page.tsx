"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, User, Lock, Eye, EyeOff, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PengaturanAkun() {
  // ======================================================================
  // STATE & DATA IDENTITAS UTAMA (Pengaturan Akun Abah Dadan)
  // ======================================================================
  const [profileName, setProfileName] = useState("Abah Dadan");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // State Sistem Notifikasi Feedback Instan
  const [notification, setNotification] = useState("");

  const triggerNotification = (text: string) => {
    setNotification(text);
    setTimeout(() => setNotification(""), 2000);
  };

  // Handler Kirim Aksi Update Profil & Sandi Keamanan
  const handleSaveAkun = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi Kolom Kosong (Error Prevention)
    if (!profileName.trim()) {
      triggerNotification("Nama Pengelola Tidak Boleh Kosong");
      return;
    }

    // Alur Validasi Jika Mengubah Kata Sandi
    if (oldPassword || newPassword) {
      if (oldPassword !== "tenggiri5tahun") {
        triggerNotification("Kata Sandi Lama Salah");
        return;
      }
      if (newPassword.length < 5) {
        triggerNotification("Kata Sandi Baru Minimal 5 Karakter");
        return;
      }
      triggerNotification("Profil dan Kata Sandi Berhasil Diperbarui");
    } else {
      triggerNotification("Nama Profil Berhasil Diperbarui");
    }

    // Reset status form password setelah disimpan
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="flex flex-col gap-8 pb-16 font-sans select-none relative w-full max-w-2xl mx-auto px-4 md:px-0 mt-26">
      {/* HEADER UTAMA AREA KERJA */}
      <div className="text-left w-full">
        <h2 className="text-lg font-bold text-[#4A3B32] tracking-wide">
          Pengaturan Keamanan Akun
        </h2>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Ubah identitas nama panggilan pengelola atau perbarui kata sandi masuk
          untuk mengamankan data panel pembukuan batagor.
        </p>
      </div>

      {/* PANEL UTAMA FORMULIR KONTROL */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="w-full bg-white border border-neutral-100 p-6 md:p-8 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.01)] text-left"
      >
        <form onSubmit={handleSaveAkun} className="flex flex-col gap-6">
          {/* BAGIAN 1: IDENTITAS NAMA PROFIL */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-neutral-500 pl-1">
              Nama Pengelola (Kasir Utama)
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <Input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="pl-11 h-13 text-xs sm:text-sm rounded-xl border-neutral-200 text-[#4A3B32]"
              />
            </div>
          </div>

          {/* PEMBATAS GARIS HORIZONTAL */}
          <div className="w-full h-[1px] bg-neutral-100/80 my-1" />

          {/* BAGIAN 2: SUB-HEADER PASSWORD */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#4A3B32]">
              Perbarui Kata Sandi Masuk
            </span>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              Biarkan kolom sandi di bawah ini tetap kosong jika kamu tidak
              berniat memperbarui kata sandi keamanan saat ini.
            </p>
          </div>

          {/* KOLOM KATA SANDI LAMA */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-medium text-neutral-400 pl-1">
              Kata Sandi Saat Ini
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <Input
                type={showOldPass ? "text" : "password"}
                placeholder="Masukkan kata sandi lama (tenggiri5tahun)"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="pl-11 pr-12 h-13 text-xs rounded-xl border-neutral-200"
              />
              <button
                type="button"
                onClick={() => setShowOldPass(!showOldPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#8C6239] transition-colors"
              >
                {showOldPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* KOLOM KATA SANDI BARU */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-medium text-neutral-400 pl-1">
              Kata Sandi Pengaman Baru
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <Input
                type={showNewPass ? "text" : "password"}
                placeholder="Masukkan kombinasi kata sandi baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-11 pr-12 h-13 text-xs rounded-xl border-neutral-200"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#8C6239] transition-colors"
              >
                {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* TOMBOL EKSEKUSI PENYIMPANAN DATA UTAMA */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="mt-4"
          >
            <Button
              type="submit"
              className="w-full h-13 bg-[#8C6239] hover:bg-[#734F2E] text-white text-xs font-medium rounded-xl flex items-center justify-center gap-2.5 shadow-sm transition-colors"
            >
              <Save size={14} />
              <span>Simpan Konfigurasi Akun</span>
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* POP-UP REAL-TIME NOTIFIKASI TOAST */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 md:bottom-8 right-8 z-50 bg-[#4A3B32] text-white px-6 py-4 rounded-xl shadow-lg border border-white/5 flex items-center gap-3 text-xs font-medium tracking-wide"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
