"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  TrendingUp,
  Sparkles,
  AlertCircle,
  ChevronDown,
  BarChart3,
  Wallet,
  PieChart,
  Download,
  Utensils,
  TrendingDown,
  History,
} from "lucide-react";

// Struktur Data Komprehensif Historis Sejak 2020 s.d 2026
const dataPembukuanMaster = [
  // --- TAHUN 2026 ---
  {
    id: "FIN-78",
    tahun: "2026",
    bulan: "06",
    namaBulan: "Juni",
    omset: 9450000,
    modal: 4500000,
    porsiTerlaris: "Satu Porsi Penuh (120 unit)",
    status: "Paling Laris",
  },
  {
    id: "FIN-77",
    tahun: "2026",
    bulan: "05",
    namaBulan: "Mei",
    omset: 8200000,
    modal: 4350000,
    porsiTerlaris: "Satu Porsi Penuh (98 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-76",
    tahun: "2026",
    bulan: "04",
    namaBulan: "April",
    omset: 7900000,
    modal: 4200000,
    porsiTerlaris: "Setengah Porsi (110 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-75",
    tahun: "2026",
    bulan: "03",
    namaBulan: "Maret",
    omset: 6100000,
    modal: 4000000,
    porsiTerlaris: "Setengah Porsi (85 unit)",
    status: "Perlu Evaluasi",
  },
  {
    id: "FIN-74",
    tahun: "2026",
    bulan: "02",
    namaBulan: "Februari",
    omset: 8500000,
    modal: 4100000,
    porsiTerlaris: "Satu Porsi Penuh (102 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-73",
    tahun: "2026",
    bulan: "01",
    namaBulan: "Januari",
    omset: 9100000,
    modal: 4400000,
    porsiTerlaris: "Satu Porsi Penuh (115 unit)",
    status: "Paling Laris",
  },

  // --- TAHUN 2025 ---
  {
    id: "FIN-72",
    tahun: "2025",
    bulan: "12",
    namaBulan: "Desember",
    omset: 9800000,
    modal: 4600000,
    porsiTerlaris: "Satu Porsi Penuh (130 unit)",
    status: "Paling Laris",
  },
  {
    id: "FIN-71",
    tahun: "2025",
    bulan: "11",
    namaBulan: "November",
    omset: 8100000,
    modal: 4200000,
    porsiTerlaris: "Satu Porsi Penuh (95 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-70",
    tahun: "2025",
    bulan: "10",
    namaBulan: "Oktobeer",
    omset: 7600000,
    modal: 4100000,
    porsiTerlaris: "Setengah Porsi (100 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-69",
    tahun: "2025",
    bulan: "09",
    namaBulan: "September",
    omset: 8300000,
    modal: 4300000,
    porsiTerlaris: "Satu Porsi Penuh (105 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-68",
    tahun: "2025",
    bulan: "08",
    namaBulan: "Agustus",
    omset: 8900000,
    modal: 4400000,
    porsiTerlaris: "Satu Porsi Penuh (112 unit)",
    status: "Paling Laris",
  },
  {
    id: "FIN-67",
    tahun: "2025",
    bulan: "07",
    namaBulan: "Juli",
    omset: 6400000,
    modal: 3900000,
    porsiTerlaris: "Setengah Porsi (90 unit)",
    status: "Perlu Evaluasi",
  },
  {
    id: "FIN-66",
    tahun: "2025",
    bulan: "06",
    namaBulan: "Juni",
    omset: 9200000,
    modal: 4500000,
    porsiTerlaris: "Satu Porsi Penuh (118 unit)",
    status: "Paling Laris",
  },
  {
    id: "FIN-65",
    tahun: "2025",
    bulan: "05",
    namaBulan: "Mei",
    omset: 7900000,
    modal: 4200000,
    porsiTerlaris: "Setengah Porsi (105 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-64",
    tahun: "2025",
    month: "04",
    namaBulan: "April",
    omset: 7500000,
    modal: 4000000,
    porsiTerlaris: "Setengah Porsi (98 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-63",
    tahun: "2025",
    bulan: "03",
    namaBulan: "Maret",
    omset: 5900000,
    modal: 3800000,
    porsiTerlaris: "Setengah Porsi (80 unit)",
    status: "Perlu Evaluasi",
  },
  {
    id: "FIN-62",
    tahun: "2025",
    bulan: "02",
    namaBulan: "Februari",
    omset: 8200000,
    modal: 4100000,
    porsiTerlaris: "Satu Porsi Penuh (100 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-61",
    tahun: "2025",
    bulan: "01",
    namaBulan: "Januari",
    omset: 8800000,
    modal: 4300000,
    porsiTerlaris: "Satu Porsi Penuh (110 unit)",
    status: "Stabil",
  },

  // --- TAHUN 2024 ---
  {
    id: "FIN-60",
    tahun: "2024",
    bulan: "12",
    namaBulan: "Desember",
    omset: 9500000,
    modal: 4500000,
    porsiTerlaris: "Satu Porsi Penuh (125 unit)",
    status: "Paling Laris",
  },
  {
    id: "FIN-59",
    tahun: "2024",
    bulan: "11",
    namaBulan: "November",
    omset: 7800000,
    modal: 4100000,
    porsiTerlaris: "Setengah Porsi (112 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-48",
    tahun: "2024",
    bulan: "06",
    namaBulan: "Juni",
    omset: 8900000,
    modal: 4300000,
    porsiTerlaris: "Satu Porsi Penuh (114 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-43",
    tahun: "2024",
    bulan: "01",
    namaBulan: "Januari",
    omset: 8400000,
    modal: 4100000,
    porsiTerlaris: "Satu Porsi Penuh (108 unit)",
    status: "Stabil",
  },

  // --- TAHUN 2023 ---
  {
    id: "FIN-36",
    tahun: "2023",
    bulan: "12",
    namaBulan: "Desember",
    omset: 9100000,
    modal: 4400000,
    porsiTerlaris: "Satu Porsi Penuh (120 unit)",
    status: "Paling Laris",
  },
  {
    id: "FIN-25",
    tahun: "2023",
    bulan: "01",
    namaBulan: "Januari",
    omset: 7900000,
    modal: 4000000,
    porsiTerlaris: "Setengah Porsi (100 unit)",
    status: "Stabil",
  },

  // --- TAHUN 2022 ---
  {
    id: "FIN-24",
    tahun: "2022",
    bulan: "12",
    namaBulan: "Desember",
    omset: 8800000,
    modal: 4200000,
    porsiTerlaris: "Satu Porsi Penuh (115 unit)",
    status: "Paling Laris",
  },
  {
    id: "FIN-13",
    tahun: "2022",
    bulan: "01",
    namaBulan: "Januari",
    omset: 7500000,
    modal: 3900000,
    porsiTerlaris: "Setengah Porsi (95 unit)",
    status: "Stabil",
  },

  // --- TAHUN 2021 ---
  {
    id: "FIN-12",
    tahun: "2021",
    bulan: "12",
    namaBulan: "Desember",
    omset: 8200000,
    modal: 4000000,
    porsiTerlaris: "Satu Porsi Penuh (110 unit)",
    status: "Stabil",
  },
  {
    id: "FIN-02",
    tahun: "2021",
    bulan: "01",
    namaBulan: "Januari",
    omset: 6800000,
    modal: 3700000,
    porsiTerlaris: "Setengah Porsi (88 unit)",
    status: "Stabil",
  },

  // --- TAHUN 2020 ---
  {
    id: "FIN-01",
    tahun: "2020",
    bulan: "12",
    namaBulan: "Desember",
    omset: 7900000,
    modal: 3900000,
    porsiTerlaris: "Satu Porsi Penuh (105 unit)",
    status: "Stabil",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 22 } as const,
  },
};

export default function LaporanFinancePro() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [filteredData, setFilteredData] = useState(dataPembukuanMaster);
  const [isExporting, setIsExporting] = useState(false);

  // Jalankan filter otomatis
  useEffect(() => {
    let result = dataPembukuanMaster.filter(
      (item) => item.tahun === selectedYear,
    );
    if (selectedMonth !== "all") {
      result = result.filter((item) => item.bulan === selectedMonth);
    }
    setFilteredData(result);
  }, [selectedYear, selectedMonth]);

  // Kalkulasi agregat data terfilter
  const totalOmset = filteredData.reduce((sum, item) => sum + item.omset, 0);
  const totalModal = filteredData.reduce((sum, item) => sum + item.modal, 0);
  const totalUntung = totalOmset - totalModal;

  // Analisis Agregat Tahunan Makro khusus untuk kolum kiri desktop
  const totalOmsetSatuTahun = dataPembukuanMaster
    .filter((item) => item.tahun === selectedYear)
    .reduce((sum, item) => sum + item.omset, 0);

  const totalModalSatuTahun = dataPembukuanMaster
    .filter((item) => item.tahun === selectedYear)
    .reduce((sum, item) => sum + item.modal, 0);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 pb-28 md:pb-16 font-sans select-none text-left px-4 md:px-8 mt-20 md:mt-26 w-full max-w-7xl mx-auto">
      {/* ====================================================================== */}
      {/* 1. SECTION HEADER & PANEL KONTROL FILTER DATA (PRESISE & SEJAJAR) */}
      {/* ====================================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl md:text-2xl font-bold text-[#4A3B32] tracking-wide">
            Pembukuan Untung Rugi Abah
          </h2>
          <p className="text-xs text-neutral-400 font-light">
            Analisis kalkulasi profit murni, akumulasi belanja harian, beserta
            penelusuran arsip riwayat omset sejak tahun 2020.
          </p>
        </div>

        {/* PERBAIKAN: Menggunakan sm:flex-nowrap agar di desktop tombol dipaksa naik berdampingan sejajar rapi */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-start lg:self-auto w-full lg:w-auto">
          {/* Dropdown Tahun */}
          <div className="relative flex-1 sm:flex-initial sm:min-w-[120px]">
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedMonth("all");
              }}
              className="w-full appearance-none bg-white border border-neutral-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-semibold text-[#4A3B32] shadow-sm hover:border-[#8C6239]/40 focus:outline-none focus:border-[#8C6239] cursor-pointer h-10"
            >
              {["2026", "2025", "2024", "2023", "2022", "2021", "2020"].map(
                (y) => (
                  <option key={y} value={y}>
                    Tahun {y}
                  </option>
                ),
              )}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
          </div>

          {/* Dropdown Bulan */}
          <div className="relative flex-1 sm:flex-initial sm:min-w-[130px]">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full appearance-none bg-white border border-neutral-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-semibold text-[#4A3B32] shadow-sm hover:border-[#8C6239]/40 focus:outline-none focus:border-[#8C6239] cursor-pointer h-10"
            >
              <option value="all">Semua Bulan</option>
              <option value="12">Desember</option>
              <option value="11">November</option>
              <option value="10">Oktober</option>
              <option value="09">September</option>
              <option value="08">Agustus</option>
              <option value="07">Juli</option>
              <option value="06">Juni</option>
              <option value="05">Mei</option>
              <option value="04">April</option>
              <option value="03">Maret</option>
              <option value="02">Februari</option>
              <option value="01">Januari</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
          </div>

          {/* PERBAIKAN: Tombol Cetak diberikan w-full active di mobile, tapi md:w-auto & shrink-0 di desktop */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 bg-[#8C6239] hover:bg-[#734F2E] disabled:bg-neutral-300 text-white text-xs font-medium px-5 rounded-xl transition-colors shadow-sm cursor-pointer w-full sm:w-auto shrink-0 h-10 mt-0"
          >
            <Download size={14} />
            <span className="whitespace-nowrap">
              {isExporting ? "Memproses..." : "Cetak Laporan / PDF"}
            </span>
          </button>
        </div>
      </div>
      {/* ====================================================================== */}
      {/* 2. AGREGAT SUMMARY KARTU UTAMA */}
      {/* ====================================================================== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-5"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between"
        >
          <div className="flex flex-col gap-1.5 text-left">
            <span className="text-[11px] font-medium text-neutral-400">
              Total Omset Kotor Terfilter
            </span>
            <span className="text-xl md:text-2xl font-bold text-[#4A3B32]">
              Rp {totalOmset.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="p-3.5 bg-neutral-50 text-neutral-500 rounded-xl">
            <BarChart3 size={18} />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between"
        >
          <div className="flex flex-col gap-1.5 text-left">
            <span className="text-[11px] font-medium text-neutral-400">
              Akumulasi Modal Belanja
            </span>
            <span className="text-xl md:text-2xl font-bold text-neutral-400">
              Rp {totalModal.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="p-3.5 bg-neutral-50 text-neutral-400 rounded-xl">
            <Wallet size={18} />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`bg-white border p-6 rounded-2xl ${totalUntung >= 0 ? "border-emerald-100 bg-emerald-50/10" : "border-red-100 bg-red-50/10"}`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1.5 text-left">
              <span
                className={`text-[11px] font-medium ${totalUntung >= 0 ? "text-emerald-700" : "text-red-700"}`}
              >
                Keuntungan Bersih Murni
              </span>
              <span
                className={`text-xl md:text-2xl font-bold ${totalUntung >= 0 ? "text-emerald-600" : "text-red-500"}`}
              >
                {totalUntung >= 0 ? "+" : "-"} Rp{" "}
                {Math.abs(totalUntung).toLocaleString("id-ID")}
              </span>
            </div>
            <div
              className={`p-3.5 rounded-xl ${totalUntung >= 0 ? "bg-emerald-100/50 text-emerald-600" : "bg-red-100/50 text-red-500"}`}
            >
              {totalUntung >= 0 ? (
                <PieChart size={18} />
              ) : (
                <TrendingDown size={18} />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ====================================================================== */}
      {/* 3. LAYOUT GRID DUA KOLOM KOMPREHENSIF (TAMPILAN WEB MAKSIMAL) */}
      {/* ====================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* KOLOM KIRI: AGREGAT GRAFIK MAKRO TAHUNAN (3 Kolom dari 12) */}
        <div className="lg:col-span-4 flex flex-col gap-4 h-full">
          <div className="px-1">
            <h3 className="text-sm font-semibold text-[#4A3B32]">
              Rangkuman Makro
            </h3>
            <p className="text-[10px] text-neutral-400 font-light mt-0.5">
              Akumulasi performa sepanjang Tahun {selectedYear}.
            </p>
          </div>

          <div className="bg-white border border-neutral-100 p-5 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 text-left h-full justify-between">
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between border-b border-neutral-50 pb-2.5">
                <span className="text-xs font-medium text-neutral-500 flex items-center gap-2">
                  <History size={12} /> Total Omset ({selectedYear})
                </span>
                <span className="text-xs font-semibold text-[#4A3B32]">
                  Rp {totalOmsetSatuTahun.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-50 pb-2.5">
                <span className="text-xs font-medium text-neutral-500 flex items-center gap-2">
                  <Wallet size={12} /> Total Modal ({selectedYear})
                </span>
                <span className="text-xs font-semibold text-neutral-400">
                  Rp {totalModalSatuTahun.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500 flex items-center gap-2">
                  <TrendingUp size={12} /> Estimasi Margin Bersih
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  +
                  {(
                    ((totalOmsetSatuTahun - totalModalSatuTahun) /
                      (totalOmsetSatuTahun || 1)) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>

            {/* Visual Mini Progress Bar */}
            <div className="flex flex-col gap-1.5 mt-4 border-t border-neutral-50 pt-4">
              <div className="flex justify-between text-[10px] text-neutral-400 font-medium">
                <span>Rasio Alokasi Modal</span>
                <span>
                  {(
                    (totalModalSatuTahun / (totalOmsetSatuTahun || 1)) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(totalModalSatuTahun / (totalOmsetSatuTahun || 1)) * 100}%`,
                  }}
                  className="h-full bg-[#8C6239] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: TABEL SCROLL DETAIL BULANAN (8 Kolom dari 12) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="px-1 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold text-[#4A3B32]">
                Berkas Catatan Bulanan
              </h3>
              <p className="text-[10px] text-neutral-400 font-light mt-0.5">
                Menampilkan log riwayat data transaksi terarsip.
              </p>
            </div>
            <span className="text-[10px] bg-neutral-100 text-neutral-500 font-medium px-2.5 py-1 rounded-full">
              {filteredData.length} Laporan Terfilter
            </span>
          </div>

          {/* Penerapan Max Height & Overflow Y agar Tabel Tidak Rusak Memanjang Berantakan */}
          <div className="max-h-[520px] overflow-y-auto rounded-2xl border border-neutral-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.01)] scrollbar-thin scrollbar-thumb-neutral-200">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
                <tr className="text-[11px] font-semibold text-neutral-400 bg-neutral-50/80 backdrop-blur-sm">
                  <th className="px-5 py-3.5">ID</th>
                  <th className="px-5 py-3.5">Periode Bulan</th>
                  <th className="px-5 py-3.5">Omset (Kotor)</th>
                  <th className="px-5 py-3.5">Belanja Modal</th>
                  <th className="px-5 py-3.5">Untung Bersih</th>
                  <th className="px-5 py-3.5">Menu Terbanyak</th>
                  <th className="px-5 py-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <AnimatePresence mode="popLayout">
                  {filteredData.length > 0 ? (
                    filteredData.map((report) => {
                      const untungBaris = report.omset - report.modal;
                      return (
                        <motion.tr
                          key={report.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b border-neutral-100/60 last:border-none hover:bg-neutral-50/30 transition-colors"
                        >
                          <td className="px-5 py-4 font-mono font-bold text-neutral-400 text-[11px]">
                            {report.id}
                          </td>
                          <td className="px-5 py-4 font-semibold text-[#4A3B32]">
                            {report.namaBulan} {report.tahun}
                          </td>
                          <td className="px-5 py-4 text-neutral-600 font-medium">
                            Rp {report.omset.toLocaleString("id-ID")}
                          </td>
                          <td className="px-5 py-4 text-neutral-400 font-medium">
                            Rp {report.modal.toLocaleString("id-ID")}
                          </td>
                          <td
                            className={`px-5 py-4 font-bold ${untungBaris >= 0 ? "text-emerald-600" : "text-red-500"}`}
                          >
                            Rp {untungBaris.toLocaleString("id-ID")}
                          </td>
                          <td className="px-5 py-4 text-neutral-500 font-medium flex items-center gap-1.5">
                            <Utensils size={11} className="text-neutral-300" />
                            <span>{report.porsiTerlaris}</span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span
                              className={`text-[9px] px-2 py-0.5 rounded font-semibold ${
                                report.status === "Paling Laris"
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                  : report.status === "Perlu Evaluasi"
                                    ? "bg-red-50 text-red-500 border border-red-100"
                                    : "bg-neutral-50 text-neutral-500 border border-neutral-200/50"
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-12 text-xs text-neutral-400 font-light"
                      >
                        Data pembukuan untuk periode filter ini belum tersedia
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 4. HIGHLIGHT SUMMARY & CATATAN STRATEGIS OPERASIONAL */}
      {/* ====================================================================== */}
      <motion.div
        variants={itemVariants}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#F5EFEA] border border-[#8C6239]/15 rounded-2xl p-6 flex items-start gap-4 max-w-3xl mt-2 text-left shadow-sm"
      >
        <div className="p-3.5 bg-white rounded-xl text-[#8C6239] shrink-0 shadow-sm mt-0.5">
          <TrendingUp size={16} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[#4A3B32]">
            Rekomendasi Distribusi Bahan Baku Abah
          </span>
          <p className="text-xs text-neutral-600 font-normal leading-relaxed">
            Berdasarkan tren volume porsi historis multi-tahun sejak 2020, menu{" "}
            <strong className="text-[#8C6239]">Satu Porsi Penuh</strong>{" "}
            mendominasi secara repetitif di kuartal kedua tahun berjalan. Abah
            disarankan meningkatkan efisiensi stok bumbu kacang sebesar 12%
            untuk memaksimalkan margin keuntungan bersih bulanan.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
