"use client";

import { motion, Variants } from "framer-motion";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Calendar,
  UtensilsCrossed,
  Clock,
  Sparkles,
} from "lucide-react";

const porsiTerjualData = [
  {
    id: "porsi-01",
    nama: "Satu Porsi Penuh",
    harga: "Rp 10.000",
    terjual: "22 Porsi",
    totalNominal: "Rp 220.000",
    persentase: "70%",
  },
  {
    id: "porsi-02",
    nama: "Setengah Porsi",
    harga: "Rp 5.000",
    terjual: "21 Porsi",
    totalNominal: "Rp 105.000",
    persentase: "65%",
  },
];

const trenPenjualanJam = [
  { jam: "09:00", porsi: 4, tinggi: "h-[30%]" },
  { jam: "11:00", porsi: 8, tinggi: "h-[60%]" },
  { jam: "13:00", porsi: 12, tinggi: "h-[95%]" },
  { jam: "15:00", porsi: 6, tinggi: "h-[45%]" },
  { jam: "17:00", porsi: 9, tinggi: "h-[75%]" },
  { jam: "19:00", porsi: 4, tinggi: "h-[30%]" },
];

const logTransaksiTerakhir = [
  {
    id: "TX-1004",
    waktu: "3 menit lalu",
    item: "1x Porsi Penuh",
    total: "Rp 10.000",
    tipe: "Baru",
  },
  {
    id: "TX-1003",
    waktu: "12 menit lalu",
    item: "2x Setengah Porsi",
    total: "Rp 10.000",
    tipe: "Selesai",
  },
  {
    id: "TX-1002",
    waktu: "25 menit lalu",
    item: "3x Porsi Penuh",
    total: "Rp 30.000",
    tipe: "Selesai",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 22 } as const,
  },
};

const greetingVariants: Variants = {
  hidden: { opacity: 0, y: -15, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
      staggerChildren: 0.08,
    },
  },
};

const textFadeVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AdminDashboard() {
  return (
    // PERBAIKAN: Mengurangi gap-6 ke gap-4 di mobile, px-2 agar tidak mepet tengah, dan mt-16 agar pas posisi atas
    <div className="flex flex-col gap-4 md:gap-8 pb-28 md:pb-24 font-sans select-none max-w-5xl mx-auto px-1 md:px-2 sm:px-6 mt-5 md:mt-26 w-full">
      {/* ================= HEADER SAPAAN INTERAKTIF FUTURISTIK ================= */}
      <motion.div
        variants={greetingVariants}
        initial="hidden"
        animate="show"
        className="w-full bg-white border border-neutral-100 p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-[0_4px_30px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6 text-left relative overflow-hidden group"
      >
        {/* Ornamen Partikel Ambien */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#8C6239]/5"
              style={{
                width: i == 0 ? 140 : i == 1 ? 90 : 180,
                height: i == 0 ? 140 : i == 1 ? 90 : 180,
                top: i == 0 ? "-20%" : i == 1 ? "40%" : "-10%",
                right: i == 0 ? "5%" : i == 1 ? "15%" : "30%",
              }}
              animate={{
                y: [0, i == 0 ? -20 : 15, -10, 0],
                x: [0, i == 1 ? -15 : 10, -5, 0],
                scale: [1, 1.08, 0.92, 1],
              }}
              transition={{
                duration: i == 0 ? 9 : i == 1 ? 11 : 13,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Konten Teks Kiri */}
        <div className="flex items-center gap-3 md:gap-5 relative z-10 flex-1 min-w-0">
          <motion.div
            className="p-3 bg-[#8C6239]/10 text-[#8C6239] rounded-xl md:rounded-2xl hidden xs:block relative overflow-hidden shadow-inner border border-[#8C6239]/5 shrink-0"
            whileHover={{ scale: 1.03 }}
          >
            <Sparkles size={18} className="md:size-6 relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <motion.h1
              variants={textFadeVariants}
              className="text-lg md:text-3xl font-semibold text-[#4A3B32] tracking-wide"
            >
              Selamat Datang Kembali, Abah
            </motion.h1>
            <motion.p
              variants={textFadeVariants}
              className="text-[11px] md:text-sm text-neutral-400 font-normal truncate"
            >
              Kelola sistem pencatatan Abah di sini. Semua data finansial
              disesuaikan otomatis hari ini.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* ================= 1. KELOMPOK KARTU RINGKASAN KEUANGAN ================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
      >
        {/* Pendapatan Hari Ini */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between transition-all"
        >
          <div className="flex flex-col text-left gap-1">
            <span className="text-[10px] md:text-xs font-normal text-neutral-400">
              Pendapatan Hari Ini
            </span>
            <span className="text-base md:text-2xl font-semibold text-[#4A3B32]">
              Rp 325.000
            </span>
          </div>
          <div className="p-2 md:p-3.5 bg-emerald-50 text-emerald-500 rounded-lg md:rounded-xl shrink-0 hidden sm:block">
            <DollarSign size={16} className="md:size-[18px]" />
          </div>
        </motion.div>

        {/* Total Porsi */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between transition-all"
        >
          <div className="flex flex-col text-left gap-1">
            <span className="text-[10px] md:text-xs font-normal text-neutral-400">
              Total Porsi Terjual
            </span>
            <span className="text-base md:text-2xl font-semibold text-[#4A3B32]">
              43 Porsi
            </span>
          </div>
          <div className="p-2 md:p-3.5 bg-[#8C6239]/10 text-[#8C6239] rounded-lg md:rounded-xl shrink-0 hidden sm:block">
            <ShoppingBag size={16} className="md:size-[18px]" />
          </div>
        </motion.div>

        {/* Modal Belanja */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between transition-all"
        >
          <div className="flex flex-col text-left gap-1">
            <span className="text-[10px] md:text-xs font-normal text-neutral-400">
              Modal Belanja Harian
            </span>
            <span className="text-base md:text-2xl font-semibold text-[#4A3B32]">
              Rp 150.000
            </span>
          </div>
          <div className="p-2 md:p-3.5 bg-blue-50 text-blue-500 rounded-lg md:rounded-xl shrink-0 hidden sm:block">
            <Calendar size={16} className="md:size-[18px]" />
          </div>
        </motion.div>

        {/* Untung Bersih */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between transition-all"
        >
          <div className="flex flex-col text-left gap-1">
            <span className="text-[10px] md:text-xs font-normal text-neutral-400">
              Untung Bersih
            </span>
            <span className="text-base md:text-2xl font-semibold text-emerald-600">
              Rp 175.000
            </span>
          </div>
          <div className="p-2 md:p-3.5 bg-emerald-50 text-emerald-600 rounded-lg md:rounded-xl shrink-0 hidden sm:block">
            <TrendingUp size={16} className="md:size-[18px]" />
          </div>
        </motion.div>
      </motion.div>

      {/* ================= 2. STRUKTUR UTAMA TUMPUKAN VERTIKAL ================= */}
      {/* PERBAIKAN: Jarak gap dikurangi dari gap-8 menjadi gap-5 agar tidak terlalu renggang di mobile */}
      <div className="flex flex-col gap-5 md:gap-8">
        {/* BAGIAN UTAMA A: PAPAN PROGRESS PORSI TERJUAL */}
        <div className="flex flex-col gap-2.5 md:gap-4">
          <div className="text-left px-1">
            <h2 className="text-xs md:text-base font-semibold text-[#4A3B32] tracking-wide">
              Perbandingan Porsi Terjual Hari Ini
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-2.5 md:gap-4"
          >
            {porsiTerjualData.map((porsi) => (
              <motion.div
                key={porsi.id}
                variants={itemVariants}
                className="flex flex-col sm:grid sm:grid-cols-12 bg-white border border-neutral-100 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] items-start sm:items-center gap-2 sm:gap-0 hover:border-[#8C6239]/20 transition-all"
              >
                <div className="sm:col-span-4 flex items-center gap-3 text-left w-full">
                  <div className="p-1.5 bg-[#8C6239]/5 rounded-lg text-[#8C6239] shrink-0">
                    <UtensilsCrossed size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-semibold text-neutral-700">
                      {porsi.nama}
                    </span>
                    <span className="text-[10px] md:text-[11px] font-mono text-neutral-400">
                      {porsi.harga}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-4 w-full pr-0 sm:pr-8 my-1 sm:my-0">
                  <div className="w-full h-1.5 md:h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#8C6239] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: porsi.persentase }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 text-left text-xs md:text-sm font-medium text-neutral-600 w-full sm:pl-4 flex justify-between sm:block">
                  <span className="inline sm:hidden text-neutral-400 font-normal">
                    Terjual
                  </span>
                  <span>{porsi.terjual}</span>
                </div>

                <div className="sm:col-span-2 text-left sm:text-right text-xs md:text-sm font-semibold text-emerald-600 w-full flex justify-between sm:block mt-0.5 sm:mt-0">
                  <span className="inline sm:hidden text-neutral-400 font-normal">
                    Subtotal
                  </span>
                  <span>{porsi.totalNominal}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BAGIAN UTAMA B: DIAGRAM & LOG AKTIVITAS TERBARU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
          {/* KOLOM KIRI: Diagram Batang Penjualan per Jam */}
          <div className="flex flex-col gap-2.5 md:gap-4 h-full">
            <div className="text-left px-1">
              <h2 className="text-xs md:text-base font-semibold text-[#4A3B32] tracking-wide">
                Tren Penjualan Terkini (per Jam)
              </h2>
            </div>
            <div className="bg-white border border-neutral-100 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col gap-4 md:gap-6 text-left flex-1 justify-between">
              <div className="flex items-end justify-between h-32 md:h-40 w-full pt-2 px-1 border-b border-neutral-100 items-stretch gap-1.5 sm:gap-2">
                {trenPenjualanJam.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-end h-full w-full group gap-1"
                  >
                    <span className="text-[9px] md:text-[10px] font-bold text-[#8C6239] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-0.5">
                      {item.porsi}
                    </span>
                    <div className="w-full bg-[#8C6239]/5 rounded-t-[4px] flex items-end h-full max-w-[28px] sm:max-w-[32px]">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: item.tinggi
                            .replace("h-[", "")
                            .replace("]", ""),
                        }}
                        transition={{
                          duration: 0.8,
                          delay: idx * 0.04,
                          ease: "easeOut",
                        }}
                        className="w-full bg-[#8C6239]/20 group-hover:bg-[#8C6239] rounded-t-[4px] transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] md:text-xs text-neutral-400 font-medium px-0.5">
                {trenPenjualanJam.map((item, idx) => (
                  <span
                    key={idx}
                    className="w-full text-center max-w-[28px] sm:max-w-[32px]"
                  >
                    {item.jam}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Log Aktivitas Riwayat Transaksi Terkini */}
          <div className="flex flex-col gap-2.5 md:gap-4 h-full">
            <div className="text-left px-1">
              <h2 className="text-xs md:text-base font-semibold text-[#4A3B32] tracking-wide">
                Log Transaksi Terakhir
              </h2>
            </div>
            <div className="bg-white border border-neutral-100 rounded-xl md:rounded-2xl p-3 md:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col text-left flex-1 justify-start gap-2.5">
              {logTransaksiTerakhir.map((tx, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 md:p-3 rounded-xl border border-neutral-50 bg-neutral-50/20 hover:bg-neutral-50/60 transition-all group"
                >
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="p-1.5 md:p-2 bg-neutral-100 text-neutral-500 rounded-lg group-hover:bg-[#8C6239]/10 group-hover:text-[#8C6239] transition-colors">
                      <Clock size={13} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#4A3B32]">
                        {tx.id}
                      </span>
                      <span className="text-[9px] md:text-[10px] text-neutral-400 font-light">
                        {tx.item} • {tx.waktu}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-600">
                      {tx.total}
                    </span>
                    <span
                      className={`text-[8px] md:text-[9px] px-1.5 py-0.5 rounded font-medium ${tx.tipe === "Baru" ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-neutral-100 text-neutral-500"}`}
                    >
                      {tx.tipe}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
