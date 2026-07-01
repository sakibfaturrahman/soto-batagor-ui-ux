"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showHelper, setShowHelper] = useState(true);
  const [isAutoLoggingIn, setIsAutoLoggingIn] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!username || !password) {
      setError("Nama Pengguna dan Kata Sandi Wajib Diisi");
      return;
    }

    if (username === "abah_batagor" && password === "tenggiri5tahun") {
      setError("");
      router.push("/admin/dashboard");
    } else {
      setError("Nama Pengguna atau Kata Sandi Salah, Silakan Cek Kembali");
    }
  };

  const handleAutoLogin = () => {
    setError("");
    setIsAutoLoggingIn(true);

    setUsername("abah_batagor");
    setPassword("tenggiri5tahun");

    setTimeout(() => {
      // Pastikan helper ditutup sebelum pindah halaman agar tidak meninggalkan jejak state melayang
      setShowHelper(false);
      router.push("/admin/dashboard");
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 md:p-6 font-sans select-none relative overflow-hidden">
      {/* 1. POP-UP MODAL PANDUAN AKUN: Diisolasi penuh dalam lingkup internal halaman login saja */}
      <AnimatePresence>
        {showHelper && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-4 right-4 md:left-auto md:top-6 md:right-6 z-50 w-auto md:w-full md:max-w-sm bg-[#4A3B32] text-white p-6 rounded-2xl shadow-xl border border-white/5 flex flex-col gap-4 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-semibold">
                <HelpCircle size={16} />
                <span>Panduan Demo Dosen</span>
              </div>
              <button
                type="button"
                onClick={() => setShowHelper(false)}
                className="text-neutral-400 hover:text-white text-xs font-medium transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 md:bg-transparent md:p-0 md:border-none"
              >
                Tutup
              </button>
            </div>

            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Klik Tombol Uji Coba Di Bawah Untuk Mengisi Formulir Secara Instan
              dan Langsung Dialihkan Ke Ruang Panel Admin.
            </p>

            {/* Tombol CTA Pengisian Otomatis */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleAutoLogin}
                disabled={isAutoLoggingIn}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs py-5 h-11 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-colors"
              >
                <span>Pilih Akun & Masuk Instan</span>
                <ArrowRight size={14} className="mt-0.5" />
              </Button>
            </motion.div>

            <div className="bg-black/10 p-3 rounded-xl border border-white/5 flex flex-col gap-1 font-mono text-xs text-neutral-400">
              <div>User: abah_batagor</div>
              <div>Pass: tenggiri5tahun</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KOTAK KONTEN UTAMA LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-white border border-neutral-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.01)] relative z-10 my-auto"
      >
        {/* Header Form */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-10 gap-2">
          <h1 className="text-2xl font-bold text-[#4A3B32]">
            Panel Masuk Abah
          </h1>
          <p className="text-xs text-neutral-400 font-light px-4 leading-relaxed">
            Akses Khusus Pemilik Untuk Mencatatkan Pembukuan Jualan
          </p>
        </div>

        {/* FEEDBACK PESAN EROR */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5 text-left text-xs text-red-500 font-medium"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* FORM INTERAKSI INPUT */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Input 1: Username */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-semibold text-neutral-500 pl-1">
              Nama Pengguna
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <Input
                type="text"
                placeholder="Masukkan Nama Pengguna"
                value={username}
                disabled={isAutoLoggingIn}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-12 h-14 rounded-xl bg-neutral-50/50 border-neutral-200/80 text-sm text-[#4A3B32] placeholder:text-neutral-400/80 focus-visible:ring-[#8C6239]/20 focus-visible:border-[#8C6239] transition-all duration-300 disabled:opacity-80"
              />
            </div>
          </div>

          {/* Input 2: Password */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-semibold text-neutral-500 pl-1">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Kata Sandi"
                value={password}
                disabled={isAutoLoggingIn}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12 h-14 rounded-xl bg-neutral-50/50 border-neutral-200/80 text-sm text-[#4A3B32] placeholder:text-neutral-400/80 focus-visible:ring-[#8C6239]/20 focus-visible:border-[#8C6239]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isAutoLoggingIn}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#8C6239] transition-colors disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Tombol Submit Akses Masuk */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="mt-4"
          >
            <Button
              type="submit"
              disabled={isAutoLoggingIn}
              className="w-full h-14 bg-[#8C6239] hover:bg-[#734F2E] text-white font-medium rounded-xl text-sm tracking-wide transition-colors shadow-sm disabled:bg-[#734F2E]/80 flex items-center justify-center gap-2"
            >
              {isAutoLoggingIn ? "Memproses Masuk..." : "Masuk Ke Dashboard"}
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* 2. TOMBOL PEMICU BANTUAN: Terkunci penuh di file ini, dijamin hilang ketika pindah rute */}
      <AnimatePresence>
        {!showHelper && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={() => setShowHelper(true)}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-[#4A3B32] text-amber-400 p-4 rounded-xl shadow-lg border border-white/10 flex items-center gap-2 text-xs font-semibold"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <HelpCircle size={16} />
            <span className="text-white">Bantuan Akun</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
