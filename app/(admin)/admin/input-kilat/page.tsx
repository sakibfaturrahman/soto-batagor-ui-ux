"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Plus,
  RotateCcw,
  CheckCircle2,
  Utensils,
  Sun,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InputKilat() {
  // State untuk menyimpan hitungan porsi terjual (statis untuk keperluan demo)
  const [porsiPenuh, setPorsiPenuh] = useState(22);
  const [setengahPorsi, setSetengahPorsi] = useState(21);
  const [showNotification, setShowNotification] = useState(false);
  const [lastAction, setLastAction] = useState<{
    type: "penuh" | "setengah";
    prevValue: number;
  } | null>(null);

  // Fungsi tambah porsi cepat (Feedback otomatis)
  const handleIncrement = (type: "penuh" | "setengah") => {
    if (type === "penuh") {
      setLastAction({ type: "penuh", prevValue: porsiPenuh });
      setPorsiPenuh((prev) => prev + 1);
    } else {
      setLastAction({ type: "setengah", prevValue: setengahPorsi });
      setSetengahPorsi((prev) => prev + 1);
    }

    // Pemicu feedback notifikasi sukses di pojok layar
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  // Fungsi pembatalan aksi jika salah pencet (Reversal of Actions)
  const handleUndo = () => {
    if (!lastAction) return;
    if (lastAction.type === "penuh") {
      setPorsiPenuh(lastAction.prevValue);
    } else {
      setSetengahPorsi(lastAction.prevValue);
    }
    setLastAction(null);
  };

  // Varian animasi futuristik untuk sapaan pembuka
  const greetingVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans select-none relative">
      {/* HEADER MENYAPA INTERAKTIF & FUTURISTIK (Ambient Greeting Badge) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={greetingVariants}
        className="w-full bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex items-center justify-between relative overflow-hidden group"
      >
        {/* Efek Ambient Glow Bergerak di Latar Belakang (Idle Animation) */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.07, 0.03],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-12 -top-12 w-48 h-48 bg-[#8C6239] rounded-full blur-2xl pointer-events-none"
        />

        <div className="flex items-center gap-4 relative z-10 text-left">
          {/* Lingkaran Ikon dengan Rotasi Lambat Kontinu */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-2xl bg-[#8C6239]/5 border border-dashed border-[#8C6239]/20"
            />
            <div className="p-3.5 rounded-2xl bg-[#8C6239]/10 text-[#8C6239] relative z-10 m-1">
              <Sun size={20} className="stroke-[1.8]" />
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            {/* Animasi teks menyapa bertahap */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-[#8C6239] tracking-wider uppercase bg-[#8C6239]/10 px-2 py-0.5 rounded-md">
                sistem aktif
              </span>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={12} className="text-amber-400 fill-amber-400" />
              </motion.div>
            </div>
            <h1 className="text-lg font-semibold text-[#4A3B32] lowercase">
              selamat bertugas kembali, abah
            </h1>
            <p className="text-[10px] text-neutral-400 font-light lowercase">
              panel siap menerima input. semua data tersinkronisasi otomatis ke
              ringkasan usaha.
            </p>
          </div>
        </div>
      </motion.div>

      {/* HEADER SECTION BAWAHAN */}
      <div className="text-left px-1 mt-2">
        <h2 className="text-sm font-semibold text-[#4A3B32] lowercase tracking-wide">
          catat jualan kilat
        </h2>
        <p className="text-[10px] text-neutral-400 font-light mt-0.5 lowercase">
          ketuk tombol porsi di bawah setiap kali ada transaksi di warung fisik.
          tanpa mengetik, instan, dan anti ribet.
        </p>
      </div>

      {/* DUA TOMBOL UTAMA SAKLAR KILAT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mt-2">
        {/* KARTU 1: SATU PORSI PENUH */}
        <motion.div
          onClick={() => handleIncrement("penuh")}
          whileHover={{ scale: 1.01, borderColor: "rgba(140, 98, 57, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-between gap-6 cursor-pointer group transition-all"
        >
          <div className="p-4 rounded-2xl bg-[#8C6239]/5 text-[#8C6239] group-hover:bg-[#8C6239]/10 transition-colors">
            <Utensils size={24} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-base font-semibold text-[#4A3B32] lowercase">
              satu porsi penuh
            </span>
            <span className="text-xs text-neutral-400 font-light lowercase">
              rp 10.000
            </span>
          </div>
          <div className="text-5xl font-bold text-[#8C6239] my-2">
            {porsiPenuh}
          </div>
          <div className="w-full bg-[#8C6239] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-medium text-xs tracking-wide shadow-sm group-hover:bg-[#734F2E] transition-colors">
            <Plus size={14} className="stroke-[2.5]" />
            <span>tambah 1 porsi</span>
          </div>
        </motion.div>

        {/* KARTU 2: SETENGAH PORSI */}
        <motion.div
          onClick={() => handleIncrement("setengah")}
          whileHover={{ scale: 1.01, borderColor: "rgba(140, 98, 57, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col items-center justify-between gap-6 cursor-pointer group transition-all"
        >
          <div className="p-4 rounded-2xl bg-[#8C6239]/5 text-[#8C6239] group-hover:bg-[#8C6239]/10 transition-colors">
            <Utensils size={24} className="scale-x-[-1]" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-base font-semibold text-[#4A3B32] lowercase">
              setengah porsi
            </span>
            <span className="text-xs text-neutral-400 font-light lowercase">
              rp 5.000
            </span>
          </div>
          <div className="text-5xl font-bold text-[#8C6239] my-2">
            {setengahPorsi}
          </div>
          <div className="w-full bg-[#8C6239] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-medium text-xs tracking-wide shadow-sm group-hover:bg-[#734F2E] transition-colors">
            <Plus size={14} className="stroke-[2.5]" />
            <span>tambah 1 porsi</span>
          </div>
        </motion.div>
      </div>

      {/* EMERGENCY BUTTON */}
      <div className="flex justify-center mt-6">
        <Button
          disabled={!lastAction}
          onClick={handleUndo}
          variant="outline"
          className="border-neutral-200 text-neutral-500 hover:text-red-500 hover:bg-red-50 rounded-full px-6 py-5 text-xs font-medium transition-all flex items-center gap-2 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-neutral-500"
        >
          <RotateCcw size={12} />
          <span>batal pencet porsi terakhir</span>
        </Button>
      </div>

      {/* POP-UP FEEDBACK NOTIFIKASI OTOMATIS */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#4A3B32] text-white px-5 py-3.5 rounded-xl shadow-lg border border-white/5 flex items-center gap-3 text-xs font-medium lowercase"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>data porsi berhasil diperbarui hari ini</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
