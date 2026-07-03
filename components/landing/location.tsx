"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Location() {
  return (
    <section
      id="lokasi"
      className="w-full py-20 bg-[#FDFBF7] text-[#4A3B32] font-sans select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12">
        {/* HEADER SECTION */}
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-[#8C6239] tracking-wider uppercase bg-[#8C6239]/10 px-4 py-1.5 rounded-full w-fit mx-auto">
            Lokasi Warung
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
            Kunjungi Batagor Abah
          </h2>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Nikmati kelezatan batagor tahu sutra asli yang renyah dan hangat
            langsung di lokasi strategis kami.
          </p>
        </div>

        {/* AREA KONTEN GRID UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          {/* SISI KIRI: INFORMASI DETIL ALAMAT (5 Kolom) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="lg:col-span-5 bg-white border border-neutral-100 p-8 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between text-left gap-8"
          >
            <div className="flex flex-col gap-6">
              <div className="p-3.5 bg-[#8C6239]/10 text-[#8C6239] rounded-2xl w-fit">
                <MapPin size={22} className="stroke-[1.8]" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold tracking-wide">
                  Batagor dan Teh Manis Abah Gerbang Unper Tasikmalaya
                </h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  Batagor Dan Teh Manis Abah terletak tepat di area gerbang
                  Universitas Perjuangan, memudahkan para mahasiswa dan pencinta
                  kuliner lokal untuk singgah beristirahat.
                </p>
              </div>
            </div>

            {/* Kotak Detail Jam & Alamat Ringkas */}
            <div className="flex flex-col gap-3 border-t border-neutral-50 pt-6 font-medium text-xs text-neutral-400">
              <div className="flex justify-between items-center">
                <span>Alamat Lengkap</span>
                <span className="text-[#4A3B32] font-semibold">
                  Jl. Peta No.39, Kahuripan, Kec. Tawang, Kab. Tasikmalaya, Jawa
                  Barat 46115
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Jam Operasional</span>
                <span className="text-[#8C6239] font-semibold">
                  10:00 - 22:00 WIB
                </span>
              </div>
            </div>
          </motion.div>

          {/* SISI KANAN: EMBED GOOGLE MAPS RESPONSIF (7 Kolom) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="lg:col-span-7 w-full h-[350px] lg:h-auto min-h-[350px] rounded-[2rem] overflow-hidden border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] relative"
          >
            {/* Menggunakan tag iframe maps milik Abah dengan integrasi class tailwind w-full h-full */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15828.019449707232!2d108.2245441!3d-7.3533488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f57a19d277229%3A0x36517c1edca0310d!2sBatagor%20dan%20Teh%20Manis%20Abah%20Gerbang%20Unper%20Tasik!5e0!3m2!1sid!2sid!4v1783087100272!5m2!1sid!2sid"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
