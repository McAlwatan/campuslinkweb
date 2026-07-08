"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, IBM_Plex_Mono, Kalam } from "next/font/google";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { RoughNotation } from "react-rough-notation";
import {
  MessageCircle,
  UsersRound,
  FileText,
  ShoppingBag,
  Award,
  ShieldCheck,
  MessageSquareMore,
  TrendingUp,
  Files,
  Tag,
  Lock,
  Heart,
  Star,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import UniversityCarousel from "@/components/landing/UniversityCarousel";

/**
 * PALETTE (reference only — Tailwind needs literal hex in classNames)
 * Ink      #10201A  deep pine-ink   -> dark bg / light-mode text
 * Paper    #F5F1E4  warm parchment  -> light bg / dark-mode text
 * Marigold #F0B429  sunlit amber    -> primary accent
 * Coral    #FF6B57  warm coral-red  -> secondary accent / marketplace
 * Mint     #4FD1AE  fresh teal      -> trust / verified accent
 *
 * NOTE: a real global.css is coming next — once it's shared these hardcoded
 * hex values should get swapped for the actual design tokens, same as the
 * dashboard pass.
 */

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-display",
});
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});
const hand = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-hand",
});

const TYPEWRITER_PHRASES = [
  "chat with your class",
  "sell your old textbooks",
  "find your next study group",
  "get verified in under a minute",
];

const UNIVERSITIES = [
  "University of Dar es Salaam",
  "Ardhi University",
  "Sokoine University of Agriculture",
  "Mzumbe University",
  "Muhimbili University of Health & Allied Sciences",
  "State University of Zanzibar",
  "Dar es Salaam Institute of Technology",
  "Institute of Finance Management",
  "St. Augustine University of Tanzania",
];

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "Verified with your university email" },
  { icon: Globe, label: "Built for East African campuses" },
  { icon: Heart, label: "Free for students, always" },
  { icon: Lock, label: "Your data is never sold" },
];

const FEATURES = [
  {
    icon: MessageCircle,
    title: "Campus chat",
    desc: "Real-time messaging for classmates, departments, and study groups with file sharing built in.",
  },
  {
    icon: UsersRound,
    title: "Groups",
    desc: "Create and discover groups by course, club, faculty, or interest across your university.",
  },
  {
    icon: FileText,
    title: "Documents",
    desc: "Share notes, past papers, and resources. Everything is searchable and organized by subject.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    desc: "Buy, sell, and swap textbooks, equipment, and services with verified students only.",
  },
  {
    icon: Award,
    title: "Skills",
    desc: "Build a campus portfolio and connect with peers whose expertise complements yours.",
  },
  {
    icon: ShieldCheck,
    title: "Verified community",
    desc: "Every account is tied to a real university identity. A trusted space, by design.",
  },
];

const DOCS = [
  { name: "STAT 201 Past Paper 2023.pdf" },
  { name: "Kiswahili Fasihi Notes.docx" },
  { name: "Macroeconomics Week 7.pptx" },
  { name: "Law of Torts Summary.pdf" },
];

const STEPS = [
  {
    num: "1",
    title: "Sign up with your university / normal email",
    desc: "Use your institutional email address to verify your student identity. Takes under 60 seconds.",
  },
  {
    num: "2",
    title: "Join your campus community",
    desc: "Your university, faculty, and year group are automatically suggested. Join groups that match your interests.",
  },
  {
    num: "3",
    title: "Connect, share, and thrive",
    desc: "Chat, access documents, trade in the marketplace, and build your campus network from day one.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Found my entire study group for final exams in one afternoon. We shared notes and past papers all in the same place.",
    name: "Amina Mwangi",
    role: "2nd year, Computer Science",
    initials: "AM",
  },
  {
    quote:
      "Sold my first-year textbooks and bought all my second-year ones through the marketplace. Saved so much money.",
    name: "Joseph Kiprotich",
    role: "3rd year, Business Admin",
    initials: "JK",
  },
  {
    quote:
      "The skills section helped me find a partner for my final project who knew exactly what I needed. Game changer.",
    name: "Fatuma Omar",
    role: "Final year, Engineering",
    initials: "FO",
  },
];

const PRICING_FEATURES = [
  "Campus chat with file sharing",
  "Study groups & communities",
  "Document library access",
  "Student marketplace",
  "Skills profile & discovery",
  "University-verified identity",
  "Unlimited messages",
  "All future features included",
];

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Community", href: "#community" },
  { label: "Pricing", href: "#pricing" },
];

function useTypewriter(words: string[], typingSpeed = 55, deletingSpeed = 30, pause = 1500) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (!deleting && subIndex === words[index].length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(t);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((v) => !v), 480);
    return () => clearInterval(blinkInterval);
  }, []);

  return `${words[index].substring(0, subIndex)}${blink ? "|" : " "}`;
}

/** Wraps RoughNotation so the sketch draws itself on when it scrolls into view. */
function SketchOn({
  children,
  ...props
}: {
  children: React.ReactNode;
  type: "underline" | "box" | "circle" | "highlight" | "strike-through" | "bracket";
  color?: string;
  strokeWidth?: number;
  padding?: number | [number, number] | [number, number, number, number];
  animationDelay?: number;
  multiline?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className="inline-block">
      <RoughNotation show={inView} {...props}>
        {children}
      </RoughNotation>
    </span>
  );
}

function Eyebrow({ children, rotate = -2 }: { children: React.ReactNode; rotate?: number }) {
  return (
    <p
      className="handwritten mb-2 inline-block text-lg text-[#F0B429]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </p>
  );
}

// function SketchArrow({ className = "" }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 60 50" fill="none" className={className} aria-hidden="true">
//       <path
//         d="M6 8C22 4 38 14 46 30"
//         stroke="currentColor"
//         strokeWidth="2.5"
//         strokeLinecap="round"
//         style={{ filter: "url(#sketchy)" }}
//       />
//       <path
//         d="M46 30L38 26M46 30L40 38"
//         stroke="currentColor"
//         strokeWidth="2.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={{ filter: "url(#sketchy)" }}
//       />
//     </svg>
//   );
// }

// Option A
function SketchArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 170" fill="none" className={className} aria-hidden="true">
      <path
        d="M60 80 C110 78 160 82 188 152"
        stroke="currentColor"
        strokeWidth="2.5" 
        strokeLinecap="round"
        style={{ filter: "url(#sketchy)" }}
      />
      <path
        d="M180 148 L166 138 M180 148 L184 132"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "url(#sketchy)" }}
      />
    </svg>
  );
}

function SketchStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 3L23.5 15.5L36 16L26 24L29.5 36L20 28.5L10.5 36L14 24L4 16L16.5 15.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{ filter: "url(#sketchy)" }}
      />
    </svg>
  );
}

function SketchCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 16L14 27L37 4"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "url(#sketchy)" }}
      />
    </svg>
  );
}

const EASE_OUT_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: EASE_OUT_QUART },
  };
}

function IdCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 22 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="relative mx-auto w-full max-w-sm" style={{ perspective: 1200 }}>
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-[28px] border-2 border-dashed border-[#10201A]/20 bg-[#F5F1E4] p-6 shadow-[0_30px_60px_-25px_rgba(16,32,26,0.45)] dark:border-[#F4F1E6]/25 dark:bg-[#152922]"
      >
        {/* ticket-stub notches */}
        <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#EEF0E9] dark:bg-[#0E1B16]" />
        <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#EEF0E9] dark:bg-[#0E1B16]" />

        {/* hand-drawn grade stamp */}
        <div className="absolute -right-4 -top-4 flex h-14 w-14 -rotate-12 items-center justify-center rounded-full border-2 border-[#FF6B57] text-[#FF6B57]">
          <span className="handwritten text-sm font-bold">A+</span>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono-alt text-[10px] uppercase tracking-[2px] text-[#10201A]/50 dark:text-[#F4F1E6]/50">
            Digital campus ID
          </span>
          <span className="font-display text-sm font-bold text-[#10201A] dark:text-[#F4F1E6]">
            Campus<span className="text-[#F0B429]">Link</span>
          </span>
        </div>

        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#FF6B57] font-display text-xl font-bold text-[#10201A]">
            AM
          </div>
          <div>
            <p className="font-display text-lg font-bold leading-tight text-[#10201A] dark:text-[#F4F1E6]">
              Amina Mwangi
            </p>
            <p className="text-[13px] text-[#10201A]/55 dark:text-[#F4F1E6]/55">
              University of Dar es Salaam
            </p>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between font-mono-alt text-[11px] text-[#10201A]/45 dark:text-[#F4F1E6]/45">
          <span>ID · TZ-UDSM-04521</span>
          <span>EXP 2027</span>
        </div>

        <div className="flex items-end justify-between border-t border-dashed border-[#10201A]/15 pt-4 dark:border-[#F4F1E6]/15">
          <div className="flex gap-1">
            {[3, 5, 2, 6, 4, 2, 5, 3, 6, 2, 4].map((h, i) => (
              <span
                key={i}
                className="w-[3px] bg-[#10201A]/70 dark:bg-[#F4F1E6]/70"
                style={{ height: `${h * 4}px` }}
              />
            ))}
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[#4FD1AE]/20 px-3 py-1 text-[11px] font-semibold text-[#0E8C6C] dark:text-[#4FD1AE]">
            <SketchCheck className="h-3 w-3" />
            Verified
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const typed = useTypewriter(TYPEWRITER_PHRASES);
  const typedRef = useRef<HTMLParagraphElement>(null);
  const typedInView = useInView(typedRef, { once: true });

  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} ${hand.variable} font-body min-h-screen overflow-x-hidden bg-[#F5F1E4] text-[#10201A] dark:bg-[#0E1B16] dark:text-[#F4F1E6]`}
    >
      {/* hidden filter that gives our doodles a hand-drawn wobble */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="sketchy">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
        </filter>
      </svg>

      <style>{`
        .font-display { font-family: var(--font-display), sans-serif; }
        .font-mono-alt { font-family: var(--font-mono), monospace; }
        .handwritten { font-family: var(--font-hand), cursive; }
        .notebook-lines {
          background-image: repeating-linear-gradient(
            to bottom,
            transparent, transparent 27px,
            rgba(16,32,26,0.07) 28px
          );
        }
        .dark .notebook-lines {
          background-image: repeating-linear-gradient(
            to bottom,
            transparent, transparent 27px,
            rgba(244,241,230,0.06) 28px
          );
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 34s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid #F0B429;
          outline-offset: 3px;
          border-radius: 6px;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#10201A]/10 bg-[#F5F1E4]/85 backdrop-blur-md dark:border-[#F4F1E6]/10 dark:bg-[#0E1B16]/85">
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <span className="font-display text-lg font-bold">
            Campus<span className="text-[#F0B429]">Link</span>.
          </span>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-[#10201A]/60 transition-colors hover:text-[#10201A] dark:text-[#F4F1E6]/55 dark:hover:text-[#F4F1E6]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/login"
              className="handwritten hidden text-base text-[#10201A]/70 transition-colors hover:text-[#10201A] dark:text-[#F4F1E6]/70 dark:hover:text-[#F4F1E6] sm:inline-block"
            >
              sign in
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-lg border border-[#10201A]/15 p-2 dark:border-[#F4F1E6]/15 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border-t border-[#10201A]/10 bg-[#F5F1E4] px-5 py-4 dark:border-[#F4F1E6]/10 dark:bg-[#0E1B16] lg:hidden"
            >
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-1.5 text-sm text-[#10201A]/70 dark:text-[#F4F1E6]/70"
                  >
                    {l.label}
                  </a>
                ))}
                <Link
                  href="/login"
                  className="handwritten py-1.5 text-lg text-[#10201A]/70 dark:text-[#F4F1E6]/70"
                >
                  sign in
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero — notebook page */}
      <section className="notebook-lines relative z-10 overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:px-10">
        <div className="pointer-events-none absolute inset-y-0 left-8 hidden w-px bg-[#FF6B57]/30 sm:block lg:left-14" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 pl-0 sm:pl-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pl-14">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
              <Eyebrow>roll call — verified students only</Eyebrow>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="relative font-display font-extrabold leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}
            >
              Campus
              <SketchOn type="circle" color="#F0B429" strokeWidth={2} padding={6} animationDelay={400}>
                <span>Link</span>
              </SketchOn>
              .
              <SketchStar className="absolute -right-2 -top-6 h-8 w-8 rotate-12 text-[#FF6B57] sm:-right-8 sm:h-10 sm:w-10" />
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              ref={typedRef}
              className="mt-6 min-h-[3.5em] text-xl leading-snug text-[#10201A]/75 dark:text-[#F4F1E6]/75 sm:text-2xl"
            >
              One verified place to{" "}
              <RoughNotation type="underline" show={typedInView} color="#10201A" strokeWidth={2} animationDelay={600}>
                <span className="handwritten font-bold">{typed}</span>
              </RoughNotation>
            </motion.p>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="mt-3 max-w-md text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55"
            >
              No fake accounts, no spam, no strangers — just your university,
              online.
            </motion.p>

            {/* CTA — hand-annotated, not a button row */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="relative mt-12 flex flex-col items-start gap-6 sm:mt-14 sm:flex-row sm:items-end sm:gap-10"
            >
              <div className="relative">
                <span className="handwritten absolute -top-8 left-2 -rotate-6 whitespace-nowrap text-base text-[#FF6B57]">
                  start here
                </span>
                <SketchArrow className="absolute -top-12 left-20 h-9 w-11 rotate-[10deg] text-[#FF6B57] sm:left-28" />
                <SketchOn type="box" color="#F0B429" strokeWidth={2.5} padding={[12, 18]} animationDelay={900}>
                  <Link
                    href="/register"
                    className="handwritten inline-block text-2xl font-bold text-[#10201A] dark:text-[#F4F1E6]"
                  >
                    Create free account
                  </Link>
                </SketchOn>
              </div>

              <SketchOn type="underline" color="#10201A" strokeWidth={2} animationDelay={1300}>
                <a
                  href="#how-it-works"
                  className="handwritten text-lg text-[#10201A]/70 dark:text-[#F4F1E6]/70"
                >
                  or see how it works
                </a>
              </SketchOn>
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="mt-6 text-xs text-[#10201A]/40 dark:text-[#F4F1E6]/35"
            >
              No credit card required. Free for all students.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <IdCard />
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative z-10 overflow-hidden border-y border-[#10201A]/10 bg-[#10201A] py-3.5 dark:border-[#F4F1E6]/10 dark:bg-[#F4F1E6]/5">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...UNIVERSITIES, ...UNIVERSITIES].map((u, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-mono-alt text-[13px] text-[#F5F1E4]/70 dark:text-[#F4F1E6]/60"
            >
              {u}
              <span className="text-[#F0B429]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 grid grid-cols-2 gap-px border-b border-[#10201A]/10 bg-[#10201A]/10 dark:border-[#F4F1E6]/10 dark:bg-[#F4F1E6]/10 sm:grid-cols-4">
        {TRUST_POINTS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 bg-[#F5F1E4] px-4 py-8 text-center dark:bg-[#0E1B16]"
          >
            <Icon size={18} className="text-[#F0B429]" />
            <p className="text-[12.5px] leading-snug text-[#10201A]/60 dark:text-[#F4F1E6]/55">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Features */}
      <section id="features" className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <motion.div {...fadeUp()} className="mx-auto mb-14 max-w-lg text-center">
          <Eyebrow rotate={1}>lesson plan</Eyebrow>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Everything campus life needs
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
            Six core tools built around how students actually live and study.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              {...fadeUp((i % 3) * 0.08)}
              className="group relative rounded-2xl border-2 border-[#10201A]/12 bg-[#F5F1E4] p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-[#F4F1E6]/12 dark:bg-[#152922]"
            >
              <span className="absolute -top-2 left-8 h-3 w-3 rounded-full bg-[#FF6B57] shadow" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#F0B429]/30 bg-[#F0B429]/15">
                <Icon size={18} className="text-[#B8860B] dark:text-[#F0B429]" />
              </div>
              <p className="mb-1.5 font-display text-[15px] font-bold">
                {title === "Verified community" ? (
                  <SketchOn type="box" color="#4FD1AE" strokeWidth={2} padding={4}>
                    <span>{title}</span>
                  </SketchOn>
                ) : (
                  title
                )}
              </p>
              <p className="text-[13px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bento */}
      <section id="community" className="relative z-10 bg-[#EEF0E9] px-5 py-20 dark:bg-[#0B1712] sm:px-8 sm:py-24 lg:px-10">
        <motion.div {...fadeUp()} className="mx-auto mb-14 max-w-lg text-center">
          <Eyebrow rotate={-1}>field trip</Eyebrow>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Designed around student life
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
            Every feature is purpose-built for the rhythms of campus — from
            exam season to the marketplace.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          <motion.div
            {...fadeUp()}
            className="rounded-2xl border-2 border-[#10201A]/12 bg-[#F5F1E4] p-6 transition-colors hover:border-[#F0B429]/50 dark:border-[#F4F1E6]/12 dark:bg-[#152922] md:col-span-2"
          >
            <MessageSquareMore size={22} className="mb-3 text-[#F0B429]" />
            <p className="mb-1.5 font-display text-[15px] font-bold">Study group chat</p>
            <p className="mb-4 text-[12.5px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
              Persistent group threads with file drops, polls, and @mentions.
              Stay in sync for assignments and exams.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { msg: "Has anyone finished the stats assignment?", out: false },
                { msg: "Almost done — sharing my notes now", out: true },
                { msg: "You're a lifesaver, thank you", out: false },
              ].map((b, i) => (
                <div key={i} className={`flex ${b.out ? "justify-end" : "justify-start"}`}>
                  <span
                    className={`max-w-[75%] rounded-xl px-3 py-1.5 text-[11px] ${
                      b.out
                        ? "bg-[#F0B429] text-[#10201A]"
                        : "bg-[#10201A]/8 text-[#10201A]/75 dark:bg-[#F4F1E6]/10 dark:text-[#F4F1E6]/75"
                    }`}
                  >
                    {b.msg}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="rounded-2xl border-2 border-[#10201A]/12 bg-[#F5F1E4] p-6 transition-colors hover:border-[#F0B429]/50 dark:border-[#F4F1E6]/12 dark:bg-[#152922] md:row-span-2"
          >
            <Files size={22} className="mb-3 text-[#F0B429]" />
            <p className="mb-1.5 font-display text-[15px] font-bold">Document library</p>
            <p className="mb-4 text-[12.5px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
              Past papers, lecture notes, and study guides — organized,
              searchable, shared by real students.
            </p>
            <div className="flex flex-col gap-2">
              {DOCS.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center gap-2 rounded-lg bg-[#10201A]/6 px-3 py-2 text-[11px] text-[#10201A]/60 dark:bg-[#F4F1E6]/8 dark:text-[#F4F1E6]/55"
                >
                  <FileText size={13} className="flex-shrink-0 text-[#F0B429]" />
                  <span className="truncate">{d.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.15)}
            className="rounded-2xl border-2 border-[#10201A]/12 bg-[#F5F1E4] p-6 transition-colors hover:border-[#F0B429]/50 dark:border-[#F4F1E6]/12 dark:bg-[#152922]"
          >
            <TrendingUp size={22} className="mb-3 text-[#F0B429]" />
            <p className="mb-1.5 font-display text-[15px] font-bold">Skills profile</p>
            <p className="text-[12.5px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
              List what you know and what you can offer — visible to your
              whole campus.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.2)}
            className="rounded-2xl border-2 border-[#10201A]/12 bg-[#F5F1E4] p-6 transition-colors hover:border-[#F0B429]/50 dark:border-[#F4F1E6]/12 dark:bg-[#152922]"
          >
            <Tag size={22} className="mb-3 text-[#FF6B57]" />
            <p className="mb-1.5 font-display text-[15px] font-bold">Student marketplace</p>
            <p className="text-[12.5px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
              Textbooks, lab coats, laptops — listed by students, bought by
              students, no middleman.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <motion.div {...fadeUp()} className="mx-auto mb-14 max-w-lg text-center">
          <Eyebrow rotate={2}>syllabus</Eyebrow>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Up and running in minutes
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
            Three steps is all it takes to join your campus community.
          </p>
        </motion.div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div key={s.num} {...fadeUp(i * 0.12)} className="relative text-center">
              {i < STEPS.length - 1 && (
                <div className="absolute left-[calc(50%+28px)] right-0 top-6 hidden h-px border-t-2 border-dashed border-[#10201A]/20 dark:border-[#F4F1E6]/20 sm:block" />
              )}
              <div className="handwritten mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#F0B429] text-lg font-bold text-[#B8860B] dark:text-[#F0B429]">
                {s.num}
              </div>
              <p className="mb-2 text-[15px] font-semibold">{s.title}</p>
              <p className="text-[13px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 border-t border-[#10201A]/10 bg-[#EEF0E9] px-5 py-20 dark:border-[#F4F1E6]/10 dark:bg-[#0B1712] sm:px-8 sm:py-24 lg:px-10">
        <motion.div {...fadeUp()}>
          <Eyebrow rotate={-2}>
            <span className="mx-auto block w-fit">notes passed in class</span>
          </Eyebrow>
        </motion.div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp(i * 0.1)}
              style={{ rotate: i === 1 ? "0.6deg" : i === 0 ? "-1deg" : "1deg" }}
              className="relative rounded-2xl border-2 border-[#10201A]/12 bg-[#F5F1E4] p-5 shadow-sm dark:border-[#F4F1E6]/12 dark:bg-[#152922]"
            >
              <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#F0B429] shadow" />
              <div className="mb-3 flex gap-0.5">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} size={13} className="fill-[#F0B429] text-[#F0B429]" />
                ))}
              </div>
              <p className="mb-4 text-[13px] leading-relaxed text-[#10201A]/70 dark:text-[#F4F1E6]/70">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#F0B429]/25 text-[11px] font-semibold text-[#B8860B] dark:text-[#F0B429]">
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold">{t.name}</p>
                  <p className="text-[11px] text-[#10201A]/45 dark:text-[#F4F1E6]/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <motion.div {...fadeUp()} className="mx-auto mb-14 max-w-lg text-center">
          <Eyebrow rotate={1}>tuition</Eyebrow>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Free. Always.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
            CampusLink is built for students, not investors. No trials, no
            paywalls, no hidden fees.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="relative mx-auto max-w-sm">
          <span className="absolute -left-3 top-24 h-6 w-6 rounded-full bg-[#F5F1E4] dark:bg-[#0E1B16]" />
          <span className="absolute -right-3 top-24 h-6 w-6 rounded-full bg-[#F5F1E4] dark:bg-[#0E1B16]" />
          <div className="rounded-3xl border-2 border-dashed border-[#F0B429]/50 bg-[#F5F1E4] p-8 dark:bg-[#152922]">
            <div className="mb-1 flex items-end gap-2">
              <SketchOn type="circle" color="#FF6B57" strokeWidth={2.5} padding={8}>
                <span className="font-display text-6xl font-extrabold">0</span>
              </SketchOn>
              <span className="mb-3 text-xl text-[#10201A]/45 dark:text-[#F4F1E6]/45">/= Tsh</span>
            </div>
            <p className="mb-8 text-sm text-[#10201A]/50 dark:text-[#F4F1E6]/45">per month, forever</p>

            <div className="mb-8 flex flex-col gap-3">
              {PRICING_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <SketchCheck className="h-4 w-4 flex-shrink-0 text-[#B8860B] dark:text-[#F0B429]" />
                  <span className="text-sm text-[#10201A]/70 dark:text-[#F4F1E6]/70">{f}</span>
                </div>
              ))}
            </div>

            <SketchOn type="box" color="#10201A" strokeWidth={2} padding={[10, 16]}>
              <Link
                href="/register"
                className="handwritten flex w-full items-center justify-center text-xl font-bold text-[#10201A] dark:text-[#F4F1E6]"
              >
                get started for free
              </Link>
            </SketchOn>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <motion.div {...fadeUp()} className="mx-auto mb-14 max-w-lg text-center">
          <Eyebrow rotate={-1}>office hours</Eyebrow>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Built for students, not advertisers
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
            CampusLink is private by default. We don&rsquo;t sell your data or show
            you ads. Your campus is yours.
          </p>
        </motion.div>
      </section>

      {/* University logos */}
      <section className="relative z-10 px-5 pb-20 sm:px-8 lg:px-10">
        <p className="mb-10 text-center font-mono-alt text-[11px] uppercase tracking-[2px] text-[#10201A]/40 dark:text-[#F4F1E6]/35">
          50+ Universities. <Eyebrow rotate={-1}>1 platform.</Eyebrow>
        </p>
        <UniversityCarousel />
      </section>

      {/* CTA */}
      <section className="notebook-lines relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <motion.div
          {...fadeUp()}
          className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border-2 border-dashed border-[#10201A]/20 bg-[#F0B429] px-8 py-14 text-center dark:border-[#10201A]/30"
        >
          <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-[#10201A] sm:text-3xl">
            Join your campus today
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-[#10201A]/70">
            Thousands of students are already connecting, sharing, and
            building together on CampusLink. Your community is waiting.
          </p>
          <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <SketchOn type="box" color="#10201A" strokeWidth={2} padding={[10, 16]}>
              <Link href="/register" className="handwritten text-xl font-bold text-[#10201A]">
                create free account
              </Link>
            </SketchOn>
            <SketchOn type="underline" color="#10201A" strokeWidth={2}>
              <a
                href="mailto:hello@campuslink.co.tz"
                className="handwritten text-lg text-[#10201A]/80"
              >
                or talk to us
              </a>
            </SketchOn>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {[
              { icon: Lock, label: "University-verified" },
              { icon: ShieldCheck, label: "Private by default" },
              { icon: Heart, label: "Free for students" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[12px] text-[#10201A]/60">
                <Icon size={13} />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-[#10201A]/10 px-5 py-8 dark:border-[#F4F1E6]/10 sm:flex-row sm:px-8 lg:px-10">
        <Link href="/">
          <p className="font-display text-sm font-semibold text-[#10201A]/60 dark:text-[#F4F1E6]/55">
            Campus<span className="text-[#F0B429]">Link</span>.
          </p>
        </Link>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Contact", "About"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs text-[#10201A]/40 transition-colors hover:text-[#10201A]/70 dark:text-[#F4F1E6]/35 dark:hover:text-[#F4F1E6]/60"
            >
              {l}
            </a>
          ))}
        </div>
        <p className="text-xs text-[#10201A]/30 dark:text-[#F4F1E6]/25">© 2026 CampusLink</p>
      </footer>
    </main>
  );
}