"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
const LOGOS = [
  { src: "/universities/logos/UD.png", alt: "University of Dar es Salaam" },
  { src: "/universities/logos/AAU.png", alt: "Ardhi University" },
  { src: "/universities/logos/AKU.png", alt: "Sokoine University of Agriculture" },
  { src: "/universities/logos/AMUCT.png", alt: "Mzumbe University" },
  { src: "/universities/logos/AU.png", alt: "Muhimbili University of Health & Allied Sciences" },
  { src: "/universities/logos/CBE.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/CUHAS.png", alt: "Dar es Salaam Institute of Technology" },
  { src: "/universities/logos/DIT.png", alt: "Institute of Finance Management" },
  { src: "/universities/logos/DMI.png", alt: "St. Augustine University of Tanzania" },
  { src: "/universities/logos/DUCE.png", alt: "Tumaini University Makumira" },
  { src: "/universities/logos/ETU.png", alt: "Nelson Mandela African Institution of Science and Technology" },
  { src: "/universities/logos/IFM.png", alt: "Open University of Tanzania" },
  { src: "/universities/logos/JUCO.png", alt: "Jordan University of Science and Technology" },
  { src: "/universities/logos/KAIRUKI.png", alt: "Mbeya University of Science and Technology" },
  { src: "/universities/logos/KIUT.png", alt: "Sokoine University of Agriculture" },
  { src: "/universities/logos/MCU.png", alt: "Mbeya University of Science and Technology" },
  { src: "/universities/logos/MJKNUA.png", alt: "Muhimbili University of Health & Allied Sciences" },
  { src: "/universities/logos/MMU.png", alt: "Open University of Tanzania" },
  { src: "/universities/logos/MOCU.png", alt: "Mbeya University of Science and Technology" },
  { src: "/universities/logos/MUC.png", alt: "Sokoine University of Agriculture" },
  { src: "/universities/logos/MUHAS.png", alt: "Mbeya University of Science and Technology" },
  { src: "/universities/logos/MUM.png", alt: "Mbeya University of Science and Technology" },
  { src: "/universities/logos/MUST.png", alt: "Mbeya University of Science and Technology" },
  { src: "/universities/logos/MZUMBE.png", alt: "Mzumbe University" },
  { src: "/universities/logos/PUT.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/RUCU.png", alt: "Sokoine University of Agriculture" },
  { src: "/universities/logos/SKMU.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/SMMUC.png", alt: "Tumaini University Makumira" },
  { src: "/universities/logos/ST AUT.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/ST JUT.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/ST UCHAS.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/SUA.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/SUZA.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/TUMAINI.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/TKU.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/UA.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/UAUT.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/UB.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/UD.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/UDOM.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/UOI.png", alt: "State University of Zanzibar" },
  { src: "/universities/logos/ZU.png", alt: "State University of Zanzibar" },
];

const GROUP_SIZE = 6;
const INTERVAL_MS = 3000;

export default function UniversityCarousel() {
  const groupCount = Math.max(1, Math.ceil(LOGOS.length / GROUP_SIZE));
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (groupCount <= 1) return;
    const id = setInterval(() => {
      setPage((p) => (p + 1) % groupCount);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [groupCount]);

  const start = page * GROUP_SIZE;
  const current = LOGOS.slice(start, start + GROUP_SIZE);
  const padded = [...current];
  let fillIndex = 0;
  while (padded.length < GROUP_SIZE && LOGOS.length > 0) {
    padded.push(LOGOS[fillIndex % LOGOS.length]);
    fillIndex++;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 gap-4 sm:grid-cols-6 sm:gap-6"
        >
          {padded.map((logo, i) => (
            <div
              key={`${page}-${i}-${logo.src}`}
              className="flex h-40 items-center justify-center rounded-xl p-3"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={104}
                loading="eager"
                className="h-full w-auto object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {groupCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {Array.from({ length: groupCount }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-[#F0B429]" : "w-1.5 bg-[#10201A]/15 dark:bg-[#F4F1E6]/15"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}