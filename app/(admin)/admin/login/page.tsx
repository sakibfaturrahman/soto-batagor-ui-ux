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
      setError("nama pengguna dan kata sandi wajib diisi");
      return;
    }

    if (username === "abah_batagor" && password === "tenggiri5tahun") {
      setError("");
      router.push("/admin/dashboard");
    } else {
      setError("nama pengguna atau kata sandi salah, silakan cek kembali");
    }
  };

  const handleAutoLogin = () => {
    setError("");
    setIsAutoLoggingIn(true);

    setUsername("abah_batagor");
    setPassword("tenggiri5tahun");

    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 md:p-6 font-sans select-none relative overflow-hidden">
      {/* TOMBOL PEMICU MODAL (Floating Action Button - Hanya muncul jika helper ditutup) */}
      <AnimatePresence>
        {!showHelper && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowHelper(true)}
            className="fixed top-4 right-4 z-50 bg-[#4A3B32] text-amber-400 p-3 rounded-full shadow-lg border border-white/10 flex items-center gap-2 text-xs font-medium lowercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HelpCircle size={16} />
            <span className="hidden sm:inline text-white">bantuan akun</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* KOTAK KONTEN UTAMA LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white border border-neutral-100 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.01)] relative z-10 my-auto"
      >
        {/* Header Form */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-8 gap-1">
          <span className="text-[10px] font-semibold text-[#8C6239] tracking-wider uppercase bg-[#8C6239]/10 px-3 py-1 rounded-full mb-2">
            keamanan sistem
          </span>
          <h1 className="text-xl font-semibold text-[#4A3B32] lowercase">
            panel masuk abah
          </h1>
          <p className="text-[11px] text-neutral-400 font-light lowercase px-4">
            akses khusus pemilik untuk mencatatkan pembukuan jualan
          </p>
        </div>

        {/* FEEDBACK PESAN EROR */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5 text-left text-[11px] text-red-500 font-medium lowercase"
          >
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* FORM INTERAKSI INPUT */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Input 1: Username */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-medium text-neutral-400 pl-1 lowercase">
              nama pengguna
            </label>
            <div className="relative">
              <User
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <Input
                type="text"
                placeholder="masukkan nama pengguna"
                value={username}
                disabled={isAutoLoggingIn}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-11 h-12 rounded-xl bg-neutral-50/50 border-neutral-200/80 text-xs text-[#4A3B32] placeholder:text-neutral-400/80 focus-visible:ring-[#8C6239]/20 focus-visible:border-[#8C6239] lowercase transition-all duration-300 disabled:opacity-80"
              />
            </div>
          </div>

          {/* Input 2: Password */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-medium text-neutral-400 pl-1 lowercase">
              kata sandi
            </label>
            <div className="relative">
              <Lock
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="masukkan kata sandi"
                value={password}
                disabled={isAutoLoggingIn}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 pr-11 h-12 rounded-xl bg-neutral-50/50 border-neutral-200/80 text-xs text-[#4A3B32] placeholder:text-neutral-400/80 focus-visible:ring-[#8C6239]/20 focus-visible:border-[#8C6239]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isAutoLoggingIn}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#8C6239] transition-colors disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Tombol Submit Akses Masuk */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="mt-2 md:mt-4"
          >
            <Button
              type="submit"
              disabled={isAutoLoggingIn}
              className="w-full h-12 bg-[#8C6239] hover:bg-[#734F2E] text-white font-medium rounded-xl text-xs tracking-wide transition-colors shadow-sm disabled:bg-[#734F2E]/80 flex items-center justify-center gap-2"
            >
              {isAutoLoggingIn ? "memproses masuk..." : "masuk ke dashboard"}
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* POP-UP MODAL INFORMASI PANDUAN DEMO DOSEN (Responsif di Mobile & Desktop) */}
      <AnimatePresence>
        {showHelper && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-6 md:right-6 z-50 w-auto md:w-full md:max-w-xs bg-[#4A3B32] text-white p-5 rounded-2xl shadow-xl border border-white/5 flex flex-col gap-3 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold lowercase">
                <HelpCircle size={14} />
                <span>panduan demo dosen</span>
              </div>
              <button
                onClick={() => setShowHelper(false)}
                className="text-neutral-400 hover:text-white text-[11px] font-medium transition-colors bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 md:bg-transparent md:p-0 md:border-none"
              >
                tutup
              </button>
            </div>

            <p className="text-[10px] text-neutral-300 font-light leading-relaxed lowercase">
              klik tombol uji coba di bawah untuk mengisi formulir secara instan
              dan langsung dialihkan ke ruang panel admin.
            </p>

            {/* Tombol CTA Pengisian Otomatis */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleAutoLogin}
                disabled={isAutoLoggingIn}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 text-[11px] py-4 h-10 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-colors"
              >
                <span>pilih akun & masuk instan</span>
                <ArrowRight size={12} className="mt-0.5" />
              </Button>
            </motion.div>

            <div className="bg-black/10 p-2.5 rounded-xl border border-white/5 flex flex-col gap-0.5 font-mono text-[9px] text-neutral-400">
              <div>user: abah_batagor</div>
              <div>pass: tenggiri5tahun</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
