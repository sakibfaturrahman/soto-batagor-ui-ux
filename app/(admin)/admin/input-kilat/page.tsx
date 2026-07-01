"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Plus,
  RotateCcw,
  CheckCircle2,
  Utensils,
  TrendingUp,
  Coins,
  Trash2,
  Edit3,
  Save,
  X,
  Layers,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MenuVarian {
  id: string;
  nama: string;
  harga: number;
  terjual: number;
}

export default function InputKilatDanMenu() {
  // 1. STATE MANAGEMENT DATA UTAMA
  const [menuList, setMenuList] = useState<MenuVarian[]>([
    { id: "menu-1", nama: "Satu Porsi Penuh", harga: 10000, terjual: 0 },
    { id: "menu-2", nama: "Setengah Porsi", harga: 5000, terjual: 0 },
  ]);

  const [activeTab, setActiveTab] = useState<"jualan" | "kelola">("jualan");
  const [namaInput, setNamaInput] = useState("");
  const [hargaInput, setHargaInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notification, setNotification] = useState("");

  // ======================================================================
  // LOGIKA MULTI-STEP UNDO (Struktur Data Stack Array untuk Simpan Riwayat)
  // ======================================================================
  const [historyStack, setHistoryStack] = useState<MenuVarian[][]>([]);

  // Fungsi pembantu untuk mengamankan data sebelum dimutasi
  const saveToHistory = (currentData: MenuVarian[]) => {
    // Melakukan deep copy data agar riwayat referensinya terisolasi dengan aman
    const snapshot = currentData.map((item) => ({ ...item }));
    setHistoryStack((prev) => [...prev, snapshot]);
  };

  const triggerNotification = (text: string) => {
    setNotification(text);
    setTimeout(() => setNotification(""), 2000);
  };

  // --- LOGIKA PASIF KASIR ---
  const totalPorsiTerjual = menuList.reduce(
    (acc, item) => acc + item.terjual,
    0,
  );
  const totalOmset = menuList.reduce(
    (acc, item) => acc + item.terjual * item.harga,
    0,
  );

  // [A] AKSI KASIR JUALAN KILAT
  const handleIncrement = (id: string) => {
    const target = menuList.find((m) => m.id === id);
    if (!target) return;

    // Simpan snapshot sebelum angka bertambah
    saveToHistory(menuList);

    setMenuList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, terjual: m.terjual + 1 } : m)),
    );
    triggerNotification(`Berhasil Menambah 1 ${target.nama}`);
  };

  const handleResetCounter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const target = menuList.find((m) => m.id === id);
    if (!target) return;

    // Simpan snapshot sebelum angka dikosongkan
    saveToHistory(menuList);

    setMenuList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, terjual: 0 } : m)),
    );
    triggerNotification(`Catatan ${target.nama} Hari Ini Dikosongkan`);
  };

  // [B] AKSI MANAJEMEN CRUD MENU
  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaInput.trim() || !hargaInput) {
      triggerNotification("Nama menu dan harga tidak boleh kosong");
      return;
    }

    // Simpan snapshot sebelum list menu bertambah atau berubah struktural
    saveToHistory(menuList);

    if (editingId) {
      setMenuList((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? { ...m, nama: namaInput, harga: Number(hargaInput) }
            : m,
        ),
      );
      setEditingId(null);
      triggerNotification("Varian menu berhasil diperbarui");
    } else {
      const newMenu: MenuVarian = {
        id: `menu-${Date.now()}`,
        nama: namaInput,
        harga: Number(hargaInput),
        terjual: 0,
      };
      setMenuList((prev) => [...prev, newMenu]);
      triggerNotification("Varian menu baru berhasil terdaftar");
    }
    setNamaInput("");
    setHargaInput("");
  };

  const handleDeleteMenu = (id: string) => {
    const target = menuList.find((m) => m.id === id);
    if (!target) return;

    // Simpan snapshot sebelum menu dibuang dari array
    saveToHistory(menuList);

    setMenuList((prev) => prev.filter((m) => m.id !== id));
    triggerNotification(`Berhasil Menghapus Menu ${target.nama}`);
  };

  // [C] GLOBAL SAFETY CONTROLLER: UNLIMITED REVERSAL (POP FROM STACK)
  const handleGlobalUndo = () => {
    if (historyStack.length === 0) return;

    // Ambil riwayat snapshot paling terakhir (paling atas dalam stack)
    const previousState = historyStack[historyStack.length - 1];

    // Kembalikan data utama ke status snapshot tersebut
    setMenuList(previousState);

    // Keluarkan riwayat tersebut dari tumpukan registry
    setHistoryStack((prev) => prev.slice(0, -1));

    triggerNotification(
      `Perubahan Berhasil Dibatalkan (Sisa Undo: ${historyStack.length - 1}x)`,
    );
  };

  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? "120%" : "-120%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 22 } as const,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "120%" : "-120%",
      opacity: 0,
      transition: { duration: 0.2 } as const,
    }),
  };

  return (
    <div className="flex flex-col gap-8 pb-24 font-sans select-none max-w-5xl mx-auto px-2 mt-26">
      {/* BAR NAVIGASI SWITCHER SLIDER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-neutral-100 pb-6 text-left">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-semibold text-[#4A3B32] tracking-wide">
            {activeTab === "jualan"
              ? "Catat Jualan Kilat"
              : "Kelola Varian Menu Batagor"}
          </h2>
          <p className="text-sm text-neutral-400 font-normal">
            {activeTab === "jualan"
              ? "Ketuk kartu porsi untuk menambahkan data penjualan di warung secara kilat."
              : "Tambah variasi paket menu baru atau edit patokan harga jual batagor Abah."}
          </p>
        </div>

        {/* Tab Slide Button Switcher */}
        <div className="bg-neutral-100/80 p-1.5 rounded-2xl flex items-center relative gap-1 border border-neutral-200/40 shrink-0 self-start sm:self-auto shadow-inner">
          <button
            onClick={() => setActiveTab("jualan")}
            className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 relative z-10 ${activeTab === "jualan" ? "text-[#8C6239]" : "text-neutral-400 hover:text-neutral-600"}`}
          >
            <Zap size={14} />
            <span>Mode Kasir Kilat</span>
            {activeTab === "jualan" && (
              <motion.div
                layoutId="activeSliderTab"
                className="absolute inset-0 bg-white shadow-sm border border-neutral-200/30 rounded-xl -z-10"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("kelola")}
            className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 relative z-10 ${activeTab === "kelola" ? "text-[#8C6239]" : "text-neutral-400 hover:text-neutral-600"}`}
          >
            <Layers size={14} />
            <span>Mode Kelola Menu</span>
            {activeTab === "kelola" && (
              <motion.div
                layoutId="activeSliderTab"
                className="absolute inset-0 bg-white shadow-sm border border-neutral-200/30 rounded-xl -z-10"
              />
            )}
          </button>
        </div>
      </div>

      {/* VIEW SLIDER LAYOUT WRAPPER ANIMATION */}
      <div className="w-full relative min-h-[450px]">
        <AnimatePresence mode="wait" custom={activeTab === "jualan" ? -1 : 1}>
          {activeTab === "jualan" && (
            <motion.div
              key="jualan-tab"
              custom={-1}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-8 w-full"
            >
              {/* Summary Pasif Live Update */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                <div className="bg-white border border-neutral-100 p-6 rounded-2xl flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                  <div className="flex flex-col text-left gap-1.5">
                    <span className="text-xs font-normal text-neutral-400">
                      Total Porsi Terjual
                    </span>
                    <span className="text-2xl font-semibold text-[#4A3B32]">
                      {totalPorsiTerjual} Porsi
                    </span>
                  </div>
                  <div className="p-3.5 bg-[#8C6239]/10 text-[#8C6239] rounded-xl shrink-0">
                    <Utensils size={18} />
                  </div>
                </div>
                <div className="bg-white border border-neutral-100 p-6 rounded-2xl flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                  <div className="flex flex-col text-left gap-1.5">
                    <span className="text-xs font-normal text-neutral-400">
                      Perkiraan Omset Masuk
                    </span>
                    <span className="text-xl font-semibold text-emerald-600">
                      Rp {totalOmset.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="p-3.5 bg-emerald-50 text-emerald-500 rounded-xl shrink-0">
                    <Coins size={18} />
                  </div>
                </div>
              </div>

              {/* Grid Tombol Kasir */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {menuList.map((item) => (
                  <motion.div
                    key={item.id}
                    onClick={() => handleIncrement(item.id)}
                    whileHover={{
                      scale: 1.01,
                      borderColor: "rgba(140, 98, 57, 0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border border-neutral-100 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)] relative cursor-pointer group select-none overflow-hidden"
                  >
                    <button
                      onClick={(e) => handleResetCounter(item.id, e)}
                      title="Kosongkan hitungan varian ini"
                      className="absolute top-8 right-8 p-2.5 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="flex flex-col items-start gap-4 text-left">
                      <div className="p-4 bg-[#8C6239]/5 text-[#8C6239] rounded-xl">
                        <Utensils size={22} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-base font-semibold text-[#4A3B32]">
                          {item.nama}
                        </span>
                        <span className="text-xs text-neutral-400 font-light">
                          Rp {item.harga.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    <div className="text-6xl font-bold text-[#8C6239] my-2 text-left">
                      {item.terjual}
                    </div>

                    <div className="w-full bg-[#8C6239] group-hover:bg-[#734F2E] text-white py-4 rounded-xl flex items-center justify-center gap-2.5 font-medium text-xs tracking-wide transition-colors shadow-sm">
                      <Plus size={16} className="stroke-[2.5]" />
                      <span>Tambah Data Jualan (+1)</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ANTARMUKA KELOLA CRUD MENU */}
          {activeTab === "kelola" && (
            <motion.div
              key="kelola-tab"
              custom={1}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full"
            >
              {/* Form Input */}
              <div className="lg:col-span-4 bg-white border border-neutral-100 p-8 rounded-[2.5rem] flex flex-col gap-5 text-left shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                <div>
                  <h3 className="text-sm font-semibold text-[#4A3B32]">
                    {editingId ? "Ubah Varian Menu" : "Tambah Varian Baru"}
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-light mt-0.5">
                    Konfigurasi nama porsi dan nominal dasar harga jualan.
                  </p>
                </div>

                <form onSubmit={handleSaveMenu} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-medium text-neutral-400 pl-1">
                      Nama Porsi / Varian
                    </label>
                    <Input
                      type="text"
                      placeholder="Contoh: Porsi Jumbo"
                      value={namaInput}
                      onChange={(e) => setNamaInput(e.target.value)}
                      className="h-11 text-xs rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-medium text-neutral-400 pl-1">
                      Harga Satuan (Rp)
                    </label>
                    <Input
                      type="number"
                      placeholder="Contoh: 12000"
                      value={hargaInput}
                      onChange={(e) => setHargaInput(e.target.value)}
                      className="h-11 text-xs rounded-xl"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <Button
                      type="submit"
                      className="w-full h-11 bg-[#8C6239] text-white text-xs font-medium rounded-xl flex items-center justify-center gap-2"
                    >
                      {editingId ? <Save size={14} /> : <Plus size={14} />}
                      <span>
                        {editingId ? "Simpan Perubahan" : "Tambahkan Menu"}
                      </span>
                    </Button>
                    {editingId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setNamaInput("");
                          // setFileI(""); // Removed or commented out as setFileI is not defined
                          setHargaInput("");
                        }}
                        className="w-full h-11 text-xs rounded-xl"
                      >
                        Batalkan Edit
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              {/* List Data */}
              <div className="lg:col-span-8 flex flex-col gap-4 w-full">
                {menuList.map((item) => (
                  <div
                    key={item.id}
                    className="w-full bg-white border border-neutral-100 rounded-2xl p-6 flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-left hover:border-[#8C6239]/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#8C6239]/5 text-[#8C6239] rounded-xl">
                        <Utensils size={18} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-[#4A3B32]">
                          {item.nama}
                        </span>
                        <span className="text-[11px] text-[#8C6239] font-mono mt-0.5">
                          Rp {item.harga.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setNamaInput(item.nama);
                          setHargaInput(item.harga.toString());
                        }}
                        className="p-2.5 text-neutral-400 hover:text-[#8C6239] rounded-lg transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(item.id)}
                        className="p-2.5 text-neutral-400 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SAFETY BAR CONTROL: BUTTON UNDO GLOBAL UNLIMITED */}
      <div className="flex justify-center mt-6">
        <Button
          disabled={historyStack.length === 0}
          onClick={handleGlobalUndo}
          variant="outline"
          className="border-neutral-200 text-neutral-500 hover:text-[#8C6239] hover:bg-[#8C6239]/5 rounded-full px-8 py-6 text-xs font-medium transition-all flex items-center gap-2.5 disabled:opacity-30"
        >
          <RotateCcw size={14} />
          <span>Pulihkan Perubahan Terakhir ({historyStack.length})</span>
        </Button>
      </div>

      {/* SNACKBAR NOTIFIKASI OTOMATIS */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#4A3B32] text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 text-xs font-medium tracking-wide"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
