"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Plus,
  RotateCcw,
  CheckCircle2,
  Utensils,
  Coins,
  Trash2,
  Edit3,
  Save,
  Layers,
  Zap,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MenuVarian {
  id: string;
  nama: string;
  harga: number;
  terjual: number;
}

interface ConfirmState {
  isOpen: boolean;
  type: "increment" | "reset";
  id: string;
  label: string;
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

  // State untuk Modal Konfirmasi Interaktif
  const [confirmModal, setConfirmModal] = useState<ConfirmState>({
    isOpen: false,
    type: "increment",
    id: "",
    label: "",
  });

  // LOGIKA MULTI-STEP UNDO (Struktur Data Stack)
  const [historyStack, setHistoryStack] = useState<MenuVarian[][]>([]);

  const saveToHistory = (currentData: MenuVarian[]) => {
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

  // [A] PEMICU DIALOG KONFIRMASI (Kasir Kilat)
  const triggerConfirm = (
    id: string,
    type: "increment" | "reset",
    label: string,
    e?: React.MouseEvent,
  ) => {
    if (e) e.stopPropagation(); // Mencegah bubbling click pada tombol reset
    setConfirmModal({
      isOpen: true,
      type,
      id,
      label,
    });
  };

  // Eksekusi final setelah disetujui di modal
  const handleExecuteAction = () => {
    const { type, id, label } = confirmModal;

    if (type === "increment") {
      saveToHistory(menuList);
      setMenuList((prev) =>
        prev.map((m) => (m.id === id ? { ...m, terjual: m.terjual + 1 } : m)),
      );
      triggerNotification(`Berhasil Menambah 1 ${label}`);
    } else if (type === "reset") {
      saveToHistory(menuList);
      setMenuList((prev) =>
        prev.map((m) => (m.id === id ? { ...m, terjual: 0 } : m)),
      );
      triggerNotification(`Catatan ${label} Dikosongkan`);
    }

    // Tutup kembali modal konfirmasi
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
  };

  // [B] AKSI MANAJEMEN CRUD MENU
  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaInput.trim() || !hargaInput) {
      triggerNotification("Nama menu dan harga tidak boleh kosong");
      return;
    }

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

    saveToHistory(menuList);
    setMenuList((prev) => prev.filter((m) => m.id !== id));
    triggerNotification(`Berhasil Menghapus Menu ${target.nama}`);
  };

  // [C] GLOBAL SAFETY CONTROLLER: UNDO
  const handleGlobalUndo = () => {
    if (historyStack.length === 0) return;
    const previousState = historyStack[historyStack.length - 1];
    setMenuList(previousState);
    setHistoryStack((prev) => prev.slice(0, -1));
    triggerNotification(
      `Perubahan Berhasil Dibatalkan (Sisa Undo: ${historyStack.length - 1}x)`,
    );
  };

  const slideVariants: Variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? "120%" : "-120%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 22 },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "120%" : "-120%",
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className="flex flex-col gap-8 pb-28 md:pb-24 font-sans select-none max-w-5xl mx-auto px-4 mt-20 md:mt-26 w-full">
      {/* BAR NAVIGASI SWITCHER SLIDER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-neutral-100 pb-6 text-left">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-bold text-[#4A3B32] tracking-wide">
            {activeTab === "jualan"
              ? "Catat Jualan Kilat"
              : "Kelola Varian Menu"}
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-normal">
            {activeTab === "jualan"
              ? "Ketuk kartu porsi untuk menambahkan data penjualan di warung secara jitu."
              : "Tambah variasi paket menu baru atau edit patokan harga jual batagor Abah."}
          </p>
        </div>

        {/* Tab Slide Button Switcher */}
        <div className="bg-neutral-100/80 p-1.5 rounded-2xl flex items-center relative gap-1 border border-neutral-200/40 shrink-0 shadow-inner">
          <button
            onClick={() => setActiveTab("jualan")}
            className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 relative z-10 ${activeTab === "jualan" ? "text-[#8C6239]" : "text-neutral-400 hover:text-neutral-600"}`}
          >
            <Zap size={13} />
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
            className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 relative z-10 ${activeTab === "kelola" ? "text-[#8C6239]" : "text-neutral-400 hover:text-neutral-600"}`}
          >
            <Layers size={13} />
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
              className="flex flex-col gap-6 w-full"
            >
              {/* Summary Pasif Live Update */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="bg-white border border-neutral-100 p-5 md:p-6 rounded-xl flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                  <div className="flex flex-col text-left gap-1">
                    <span className="text-[11px] md:text-xs font-normal text-neutral-400">
                      Total Porsi Terjual
                    </span>
                    <span className="text-xl md:text-2xl font-semibold text-[#4A3B32]">
                      {totalPorsiTerjual} Porsi
                    </span>
                  </div>
                  <div className="p-3 bg-[#8C6239]/10 text-[#8C6239] rounded-xl shrink-0">
                    <Utensils size={16} />
                  </div>
                </div>
                <div className="bg-white border border-neutral-100 p-5 md:p-6 rounded-xl flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                  <div className="flex flex-col text-left gap-1">
                    <span className="text-[11px] md:text-xs font-normal text-neutral-400">
                      Perkiraan Omset Masuk
                    </span>
                    <span className="text-xl md:text-2xl font-semibold text-emerald-600">
                      Rp {totalOmset.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl shrink-0">
                    <Coins size={16} />
                  </div>
                </div>
              </div>

              {/* Grid Tombol Kasir */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 w-full">
                {menuList.map((item) => (
                  <motion.div
                    key={item.id}
                    onClick={() =>
                      triggerConfirm(item.id, "increment", item.nama)
                    }
                    whileHover={{
                      scale: 1.01,
                      borderColor: "rgba(140, 98, 57, 0.15)",
                    }}
                    whileTap={{ scale: 0.99 }}
                    className="bg-white border border-neutral-100 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)] relative cursor-pointer group overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={(e) =>
                        triggerConfirm(item.id, "reset", item.nama, e)
                      }
                      title="Kosongkan hitungan varian ini"
                      className="absolute top-6 right-6 p-2 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="flex flex-col items-start gap-3 text-left">
                      <div className="p-3 bg-[#8C6239]/5 text-[#8C6239] rounded-xl">
                        <Utensils size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm md:text-base font-semibold text-[#4A3B32]">
                          {item.nama}
                        </span>
                        <span className="text-xs text-neutral-400 font-light">
                          Rp {item.harga.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    <div className="text-5xl md:text-6xl font-bold text-[#8C6239] my-1 text-left">
                      {item.terjual}
                    </div>

                    <div className="w-full bg-[#8C6239] group-hover:bg-[#734F2E] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium text-xs tracking-wide transition-colors">
                      <Plus size={15} className="stroke-[2.5]" />
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
              <div className="lg:col-span-4 bg-white border border-neutral-100 p-6 md:p-8 rounded-[2rem] flex flex-col gap-5 text-left shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
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
                      className="w-full h-11 bg-[#8C6239] hover:bg-[#734F2E] text-white text-xs font-medium rounded-xl flex items-center justify-center gap-2 shadow-sm"
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
              <div className="lg:col-span-8 flex flex-col gap-3.5 w-full">
                {menuList.map((item) => (
                  <div
                    key={item.id}
                    className="w-full bg-white border border-neutral-100 rounded-2xl p-5 flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-left hover:border-[#8C6239]/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#8C6239]/5 text-[#8C6239] rounded-xl">
                        <Utensils size={16} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs sm:text-sm font-semibold text-[#4A3B32]">
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
                        className="p-2 text-neutral-400 hover:text-[#8C6239] rounded-lg transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(item.id)}
                        className="p-2 text-neutral-400 hover:text-red-500 rounded-lg transition-colors"
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
      <div className="flex justify-center mt-4">
        <Button
          disabled={historyStack.length === 0}
          onClick={handleGlobalUndo}
          variant="outline"
          className="border-neutral-200 text-neutral-500 hover:text-[#8C6239] hover:bg-[#8C6239]/5 rounded-full px-7 py-5.5 text-xs font-medium transition-all flex items-center gap-2 disabled:opacity-30"
        >
          <RotateCcw size={13} />
          <span>Pulihkan Perubahan Terakhir ({historyStack.length})</span>
        </Button>
      </div>

      {/* ====================================================================== */}
      {/* MODAL POP-UP DIALOG KONFIRMASI (Anti-Salah Klik & Lembut) */}
      {/* ====================================================================== */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Latar Belakang Overlay Buram Halus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setConfirmModal((prev) => ({ ...prev, isOpen: false }))
              }
              className="absolute inset-0 bg-black/15 backdrop-blur-sm"
            />

            {/* Kartu Konten Dialog Konfirmasi */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="w-full max-w-xs bg-white border border-neutral-100/90 rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative z-10 text-left flex flex-col gap-4 text-[#4A3B32]"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${confirmModal.type === "increment" ? "bg-[#8C6239]/10 text-[#8C6239]" : "bg-red-50 text-red-500"}`}
                >
                  {confirmModal.type === "increment" ? (
                    <HelpCircle size={16} />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-bold tracking-wide">
                    Konfirmasi Pesanan?
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                    {confirmModal.type === "increment"
                      ? `Apakah Abah ingin mencatatkan penambahan 1 porsi untuk "${confirmModal.label}"?`
                      : `Apakah Abah yakin ingin mengosongkan seluruh hitungan "${confirmModal.label}" hari ini?`}
                  </p>
                </div>
              </div>

              {/* Kelompok Aksi Tombol */}
              <div className="flex items-center gap-2 mt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }))
                  }
                  className="flex-1 h-10 text-[11px] font-medium rounded-xl border-neutral-200 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  onClick={handleExecuteAction}
                  className={`flex-1 h-10 text-[11px] font-medium rounded-xl text-white shadow-sm transition-colors ${
                    confirmModal.type === "increment"
                      ? "bg-[#8C6239] hover:bg-[#734F2E]"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Ya, Setuju
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SNACKBAR NOTIFIKASI TOAST AUTOMATIC */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 md:bottom-8 right-8 z-50 bg-[#4A3B32] text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3 text-xs font-medium tracking-wide"
          >
            <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
