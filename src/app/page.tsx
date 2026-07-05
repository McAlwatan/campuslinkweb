// import Link from "next/link";
// import Image from "next/image";
// import {
//   MessageCircle,
//   UsersRound,
//   FileText,
//   ShoppingBag,
//   Award,
//   ShieldCheck,
//   MessageSquareMore,
//   TrendingUp,
//   Files,
//   Tag,
//   Lock,
//   Shield,
//   Heart,
//   Star,
//   Plus,
//   Play,
//   PlusCircle,
//   PlusCircleIcon,
//   PlusIcon,
// } from "lucide-react";

// const stats = [
//   { num: "2+", label: "Active students" },
//   { num: "0+", label: "Universities" },
//   { num: "0%", label: "Satisfaction rate" },
//   { num: "0+", label: "Messages sent" },
// ];

// const features = [
//   {
//     icon: MessageCircle,
//     title: "Campus chat",
//     desc: "Real-time messaging for classmates, departments, and study groups with file sharing built in.",
//   },
//   {
//     icon: UsersRound,
//     title: "Groups",
//     desc: "Create and discover groups by course, club, faculty, or interest across your university.",
//   },
//   {
//     icon: FileText,
//     title: "Documents",
//     desc: "Share notes, past papers, and resources. Everything is searchable and organized by subject.",
//   },
//   {
//     icon: ShoppingBag,
//     title: "Marketplace",
//     desc: "Buy, sell, and swap textbooks, equipment, and services with verified students only.",
//   },
//   {
//     icon: Award,
//     title: "Skills",
//     desc: "Build a campus portfolio and connect with peers whose expertise complements yours.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Verified community",
//     desc: "Every account is tied to a real university identity. A trusted space, by design.",
//   },
// ];

// const steps = [
//   {
//     num: "1",
//     title: "Sign up with your university email",
//     desc: "Use your institutional email address to verify your student identity. Takes under 60 seconds.",
//   },
//   {
//     num: "2",
//     title: "Join your campus community",
//     desc: "Your university, faculty, and year group are automatically suggested. Join groups that match your interests.",
//   },
//   {
//     num: "3",
//     title: "Connect, share, and thrive",
//     desc: "Chat, access documents, trade in the marketplace, and build your campus network from day one.",
//   },
// ];

// const testimonials = [
//   {
//     quote:
//       "Found my entire study group for final exams in one afternoon. We shared notes and past papers all in the same place.",
//     name: "Amina Mwangi",
//     role: "2nd year, Computer Science",
//     initials: "AM",
//   },
//   {
//     quote:
//       "Sold my first-year textbooks and bought all my second-year ones through the marketplace. Saved so much money.",
//     name: "Joseph Kiprotich",
//     role: "3rd year, Business Admin",
//     initials: "JK",
//   },
//   {
//     quote:
//       "The skills section helped me find a partner for my final project who knew exactly what I needed. Game changer.",
//     name: "Fatuma Omar",
//     role: "Final year, Engineering",
//     initials: "FO",
//   },
// ];

// const docs = [
//   { name: "STAT 201 Past Paper 2023.pdf", icon: FileText },
//   { name: "Organic Chemistry Notes.docx", icon: FileText },
//   { name: "Macroeconomics Week 7.pptx", icon: FileText },
//   { name: "Law of Torts Summary.pdf", icon: FileText },
// ];

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen bg-[#0c0b18] text-white font-sans overflow-x-hidden">

//       {/* Nav */}
//       <nav className="flex items-center justify-between px-10 py-5 border-b border-white/5 animate-fade-in">
//         <div className="flex items-center gap-2">
//           {/* <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
//             <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//               <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
//               <circle cx="8" cy="8" r="2" fill="white" />
//             </svg>
//           </div> */}
//           <span className="text-base md:text-[20px] sm:text-sm font-medium">
//             Campus<span className="text-primary">Link</span>.
//           </span>
//         </div>
//         <div className="hidden md:flex items-center gap-7">
//           {["Features", "How it works", "Community", "About"].map((l) => (
//             <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="text-sm text-white/50 hover:text-white transition-colors">
//               {l}
//             </a>
//           ))}
//         </div>
//         <div className="flex items-center gap-2.5">
//           <Link href="/login" className="text-sm text-white/60 border border-white/15 rounded-lg px-4 py-1.5 hover:bg-white/5 hover:text-white transition-all">
//             Sign in
//           </Link>
//           <Link href="/register" className="text-sm text-white bg-primary rounded-lg px-4 py-1.5 hover:opacity-85 transition-opacity">
//             Get started
//           </Link>
//         </div>
//       </nav>

//       {/* Hero */}
//       <section id="features" className="relative px-10 pt-20 pb-0 text-center overflow-hidden">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-primary/20 rounded-full blur-[80px] pointer-events-none animate-pulse" />

//         <p className="text-[13px] text-white/30 font-medium mb-3 animate-fade-up animation-delay-200">
//           The campus platform students actually use
//         </p>
//         <h1 className="text-8xl md:text-[120px] font-medium leading-[1.0] tracking-tight mb-5 animate-fade-up animation-delay-150 mb-20">
//           <span
//             style={{
//               background: "linear-gradient(90deg, #1a1030 0%, #ffffff 40%, #ffffff 60%, #1a1030 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//             }}
//           >
//             Campus<span className="text-primary">Link</span>.
//           </span>
//         </h1>

        

//         <div className="flex items-center justify-center gap-3 mb-4 animate-fade-up animation-delay-450">
//           <Link
//             href="/register"
//             className="inline-flex items-center gap-2 text-sm font-medium text-white bg-primary rounded-xl px-7 py-3.5 hover:opacity-85 hover:-translate-y-0.5 transition-all"
//           >
//             <Plus size={16} />
//             Create free account
//           </Link>
//           <button className="inline-flex items-center gap-2 text-sm text-white/55 border border-white/15 rounded-xl px-6 py-3.5 hover:bg-white/5 hover:text-white transition-all">
//             <Play size={14} />
//             Watch demo
//           </button>
//         </div>
//         <p className="text-xs text-white/20 mb-14 animate-fade-up animation-delay-450">
//           No credit card required. Free for all students.
//         </p>

//         {/* Dashboard snapshot */}
//         <div className="relative max-w-4xl mx-auto animate-fade-up animation-delay-600">
//           <div className="animate-float rounded-2xl rounded-b-none border border-white/10 bg-white/[0.03] overflow-hidden">
//             <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.06]">
//               <div className="flex gap-1.5">
//                 <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
//                 <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
//                 <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
//               </div>
//               <span className="flex-1 text-center text-[11px] text-white/20">
//                 app.campuslink.co.tz/dashboard
//               </span>
//             </div>
//             {/* ↓ Replace this div with your actual screenshot */}
//             <div className="min-h-[340px] flex flex-col items-center justify-center gap-3 border-2 border-dashed border-primary/20 bg-primary/[0.03]">
//               {/* <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
//                 <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
//                   <rect x="2" y="2" width="7" height="7" rx="2" stroke="#6d5dff" strokeWidth="1.5" />
//                   <rect x="13" y="2" width="7" height="7" rx="2" stroke="#6d5dff" strokeWidth="1.5" />
//                   <rect x="2" y="13" width="18" height="7" rx="2" stroke="#6d5dff" strokeWidth="1.5" />
//                 </svg>
//               </div> */}
//               {/* <p className="text-sm text-white/25">Place your dashboard screenshot here</p>
//               <code className="text-xs text-primary/50 font-mono"> */}
//                 <Image src="/dashboard.png" alt="dashboard" width={1200} height={700}  loading="eager"/>
//               {/* </code> */}
//             </div>
//           </div>
//           <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-24 bg-primary/25 rounded-full blur-[60px] pointer-events-none" />
//         </div>
//       </section>

//       {/* Stats */}
//       <div className="grid grid-cols-4 border-y border-white/[0.06] mt-10">
//         {stats.map((s) => {
//           const match = s.num.match(/^(\d+)(.+)$/);
//           const number = match?.[1] ?? s.num;
//           const suffix = match?.[2] ?? "";
//           return (
//             <div key={s.label} className="py-9 text-center border-r border-white/[0.06] last:border-r-0">
//               <p className="text-3xl font-medium text-white mb-1">
//                 {number}<span className="text-primary">{suffix}</span>
//               </p>
//               <p className="text-xs text-white/35 tracking-wide">{s.label}</p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Features */}
//       <section className="px-10 py-24">
//         <p className="text-[11px] font-medium tracking-[1.4px] text-primary uppercase text-center mb-3">Features</p>
//         <h2 className="text-4xl font-medium text-center text-white mb-3 tracking-tight">Everything campus life needs</h2>
//         <p className="text-[15px] text-white/40 text-center max-w-md mx-auto mb-16 leading-relaxed">
//           Six core tools built around how students actually live and study.
//         </p>
//         <div className="grid grid-cols-3 max-w-4xl mx-auto border border-white/[0.07] rounded-2xl overflow-hidden divide-x divide-y divide-white/[0.07]">
//           {features.map(({ icon: Icon, title, desc }) => (
//             <div key={title} className="p-7 bg-[#0c0b18] hover:bg-[#110f22] transition-colors group">
//               <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
//                 <Icon size={18} className="text-primary" />
//               </div>
//               <p className="text-sm font-medium text-white mb-1.5">{title}</p>
//               <p className="text-[13px] text-white/38 leading-relaxed">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Bento */}
//       <section className="px-10 py-24 bg-[#100f1e]">
//         <p className="text-[11px] font-medium tracking-[1.4px] text-primary uppercase text-center mb-3">A closer look</p>
//         <h2 className="text-4xl font-medium text-center text-white mb-3 tracking-tight">Designed around student life</h2>
//         <p className="text-[15px] text-white/40 text-center max-w-md mx-auto mb-16 leading-relaxed">
//           Every feature is purpose-built for the rhythms of campus — from exam season to the marketplace.
//         </p>
//         <div className="grid grid-cols-3 grid-rows-2 gap-3 max-w-4xl mx-auto">
//           {/* Chat card — wide */}
//           <div className="col-span-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-primary/35 transition-colors">
//             <MessageSquareMore size={22} className="text-primary mb-3" />
//             <p className="text-sm font-medium text-white mb-1.5">Study group chat</p>
//             <p className="text-[12px] text-white/35 leading-relaxed mb-4">
//               Persistent group threads with file drops, polls, and @mentions. Stay in sync for assignments and exams.
//             </p>
//             <div className="flex flex-col gap-2">
//               {[
//                 { msg: "Has anyone finished the stats assignment?", out: false },
//                 { msg: "Almost done — sharing my notes now", out: true },
//                 { msg: "You're a lifesaver, thank you", out: false },
//               ].map((b, i) => (
//                 <div key={i} className={`inline-block self-${b.out ? "end" : "start"} max-w-[75%]`}>
//                   <span className={`text-[11px] px-3 py-1.5 rounded-xl block ${b.out ? "bg-primary/50 text-white" : "bg-primary/15 text-white/70"}`}>
//                     {b.msg}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Skills card — tall */}
//           <div className="row-span-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-primary/35 transition-colors">
//             <Files size={22} className="text-primary mb-3" />
//             <p className="text-sm font-medium text-white mb-1.5">Document library</p>
//             <p className="text-[12px] text-white/35 leading-relaxed mb-4">
//               Past papers, lecture notes, and study guides — organized, searchable, shared by real students.
//             </p>
//             <div className="flex flex-col gap-2">
//               {docs.map((d) => (
//                 <div key={d.name} className="flex items-center gap-2 text-[11px] text-white/40 bg-white/[0.03] rounded-lg px-3 py-2">
//                   <FileText size={13} className="text-primary flex-shrink-0" />
//                   <span className="truncate">{d.name}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Skills */}
//           <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-primary/35 transition-colors">
//             <TrendingUp size={22} className="text-primary mb-3" />
//             <p className="text-sm font-medium text-white mb-1.5">Skills profile</p>
//             <p className="text-[12px] text-white/35 leading-relaxed">
//               List what you know and what you can offer — visible to your whole campus.
//             </p>
//           </div>
//           {/* Marketplace */}
//           <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-primary/35 transition-colors">
//             <Tag size={22} className="text-primary mb-3" />
//             <p className="text-sm font-medium text-white mb-1.5">Student marketplace</p>
//             <p className="text-[12px] text-white/35 leading-relaxed">
//               Textbooks, lab coats, laptops — listed by students, bought by students, no middleman.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* How it works */}
//       <section id="how-it-works" className="px-10 py-24 bg-[#0c0b18]">
//         <p className="text-[11px] font-medium tracking-[1.4px] text-primary uppercase text-center mb-3">How it works</p>
//         <h2 className="text-4xl font-medium text-center text-white mb-3 tracking-tight">Up and running in minutes</h2>
//         <p className="text-[15px] text-white/40 text-center max-w-md mx-auto mb-16 leading-relaxed">
//           Three steps is all it takes to join your campus community.
//         </p>
//         <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
//           {steps.map((s, i) => (
//             <div key={s.num} className="text-center relative">
//               {i < steps.length - 1 && (
//                 <div className="absolute top-6 left-[calc(50%+26px)] right-0 h-px bg-primary/20" />
//               )}
//               <div className="w-12 h-12 rounded-full border border-primary/35 bg-primary/10 flex items-center justify-center text-lg font-medium text-primary/80 mx-auto mb-5">
//                 {s.num}
//               </div>
//               <p className="text-sm font-medium text-white mb-2">{s.title}</p>
//               <p className="text-[13px] text-white/38 leading-relaxed">{s.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="px-10 py-20 bg-[#0c0b18] border-t border-white/[0.06]">
//         <p className="text-[11px] font-medium tracking-[1.4px] text-primary uppercase text-center mb-14">What students say</p>
//         <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
//           {testimonials.map((t) => (
//             <div key={t.name} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
//               <div className="flex gap-0.5 mb-3">
//                 {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
//               </div>
//               <p className="text-[13px] text-white/55 leading-relaxed mb-4">{`"${t.quote}"`}</p>
//               <div className="flex items-center gap-2.5">
//                 <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[11px] font-medium text-primary/90 flex-shrink-0">
//                   {t.initials}
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium text-white">{t.name}</p>
//                   <p className="text-[11px] text-white/30">{t.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>


//       {/* Pricing */}
//       <section className="px-10 py-24 bg-[#0c0b18] border-t border-white/[0.06]">
//         <p className="text-[11px] font-medium tracking-[1.4px] text-primary uppercase text-center mb-3">Pricing?</p>
//         <h2 className="text-4xl font-medium text-center text-white mb-3 tracking-tight">
//           Free. Always!.
//         </h2>
//         <p className="text-[15px] text-white/40 text-center max-w-md mx-auto mb-16 leading-relaxed">
//           CampusLink is built for students, not investors. No trials, no paywalls, no hidden fees.
//         </p>

//         <div className="max-w-sm mx-auto bg-white/[0.03] border border-primary/25 rounded-3xl p-8">
//           <div className="flex items-end gap-2 mb-1">
//             <span className="text-6xl font-medium text-white">0</span>
//             <span className="text-2xl text-white/40 mb-3">/=</span>
//             <span className="text-xl text-white/40 mb-3">Tsh</span>
//           </div>
//           <p className="text-sm text-white/35 mb-8">per month, forever</p>

//           <div className="flex flex-col gap-3 mb-8">
//             {[
//               "Campus chat with file sharing",
//               "Study groups & communities",
//               "Document library access",
//               "Student marketplace",
//               "Skills profile & discovery",
//               "University-verified identity",
//               "Unlimited messages",
//               "All future features included",
//             ].map((f) => (
//               <div key={f} className="flex items-center gap-3">
//                 <div className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
//                   <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                     <path d="M2 5l2.5 2.5L8 3" stroke="#8b7dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm text-white/60">{f}</span>
//               </div>
//             ))}
//           </div>

//           <Link
//             href="/register"
//             className="flex items-center justify-center gap-2 w-full text-sm font-medium text-white bg-primary rounded-xl py-3.5 hover:opacity-85 transition-opacity"
//           >
//             <PlusIcon size={16} />
//             Get started for free
//           </Link>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="px-10 py-24 bg-[#100f1e]">
//         <div className="max-w-xl mx-auto text-center bg-primary/[0.08] border border-primary/25 rounded-3xl px-10 py-14">
//           <h2 className="text-3xl font-medium text-white mb-3 tracking-tight">Join your campus today</h2>
//           <p className="text-sm text-white/40 mb-8 leading-relaxed">
//             Thousands of students are already connecting, sharing, and building together on CampusLink. Your community is waiting.
//           </p>
//           <div className="flex items-center justify-center gap-3 mb-6">
//             <Link href="/register" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-primary rounded-xl px-7 py-3.5 hover:opacity-85 transition-opacity">
//               <Plus size={16} />
//               Create free account
//             </Link>
//             <button className="text-sm text-white/55 border border-white/15 rounded-xl px-5 py-3.5 hover:bg-white/5 hover:text-white transition-all">
//               Talk to us
//             </button>
//           </div>
//           <div className="flex items-center justify-center gap-6">
//             {[
//               { icon: Lock, label: "University-verified" },
//               { icon: Shield, label: "Private by default" },
//               { icon: Heart, label: "Free for students" },
//             ].map(({ icon: Icon, label }) => (
//               <div key={label} className="flex items-center gap-1.5 text-[12px] text-white/30">
//                 <Icon size={13} className="text-primary" />
//                 {label}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="flex items-center justify-between px-10 py-8 border-t border-white/[0.06] bg-[#0c0b18]">
//         <div className="flex items-center gap-2 text-sm font-medium text-white/35">
//           {/* <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
//             <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" stroke="#6d5dff" strokeWidth="1.5" strokeLinejoin="round" />
//             <circle cx="8" cy="8" r="2" fill="#6d5dff" />
//           </svg> */}
//           <p>Campus<span className="text-primary">Link</span>.</p>
//         </div>
//         <div className="flex gap-5">
//           {["Privacy", "Terms", "Contact", "About"].map((l) => (
//             <a key={l} href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">{l}</a>
//           ))}
//         </div>
//         <p className="text-xs text-white/18">© 2026 CampusLink</p>
//       </footer>

//     </main>
//   );
// }




"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  Plus,
  ArrowRight,
  Menu,
  X,
  BadgeCheck,
  Globe,
  Check,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * PALETTE (reference only — Tailwind needs literal hex in classNames)
 * Ink      #10201A  deep pine-ink   -> dark bg / light-mode text
 * Paper    #F5F1E4  warm parchment  -> light bg / dark-mode text
 * Marigold #F0B429  sunlit amber    -> primary accent
 * Coral    #FF6B57  warm coral-red  -> secondary accent / marketplace
 * Mint     #4FD1AE  fresh teal      -> trust / verified accent
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
    title: "Sign up with your university email",
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

function MarkerUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 18"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute -bottom-1.5 left-0 w-full ${className}`}
    >
      <path
        d="M2 12C40 4 80 16 100 9C130 0 160 14 198 6"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
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
            <BadgeCheck size={13} />
            Verified
          </span>
        </div>
      </motion.div>

      {/* floating sticky notes */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-6 -top-6 hidden rotate-6 items-center gap-1.5 rounded-xl border-2 border-[#10201A]/15 bg-[#FF6B57] px-3 py-2 text-[11px] font-semibold text-[#10201A] shadow-lg sm:flex"
      >
        <Sparkles size={13} />
        You&apos;re verified!
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute -bottom-5 -left-6 hidden -rotate-6 items-center gap-1.5 rounded-xl border-2 border-[#10201A]/15 bg-[#F0B429] px-3 py-2 text-[11px] font-semibold text-[#10201A] shadow-lg sm:flex"
      >
        <Tag size={13} />
        Tsh 12,000 · Calculus
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const typed = useTypewriter(TYPEWRITER_PHRASES);

  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} font-body min-h-screen overflow-x-hidden bg-[#F5F1E4] text-[#10201A] dark:bg-[#0E1B16] dark:text-[#F4F1E6]`}
    >
      <style>{`
        .font-display { font-family: var(--font-display), sans-serif; }
        .font-mono-alt { font-family: var(--font-mono), monospace; }
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
              className="hidden rounded-lg border border-[#10201A]/15 px-4 py-1.5 text-sm text-[#10201A]/70 transition-all hover:bg-[#10201A]/5 dark:border-[#F4F1E6]/15 dark:text-[#F4F1E6]/70 dark:hover:bg-[#F4F1E6]/10 sm:inline-block"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="hidden rounded-lg bg-[#10201A] px-4 py-1.5 text-sm font-medium text-[#F5F1E4] transition-opacity hover:opacity-85 dark:bg-[#F0B429] dark:text-[#10201A] sm:inline-block"
            >
              Get started
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
                <div className="mt-2 flex gap-2.5">
                  <Link
                    href="/login"
                    className="flex-1 rounded-lg border border-[#10201A]/15 px-4 py-2 text-center text-sm dark:border-[#F4F1E6]/15"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 rounded-lg bg-[#10201A] px-4 py-2 text-center text-sm font-medium text-[#F5F1E4] dark:bg-[#F0B429] dark:text-[#10201A]"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:px-10">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-dashed border-[#10201A]/25 px-3.5 py-1.5 font-mono-alt text-[11px] uppercase tracking-[1.5px] text-[#10201A]/60 dark:border-[#F4F1E6]/25 dark:text-[#F4F1E6]/55"
            >
              <BadgeCheck size={13} className="text-[#4FD1AE]" />
              University-email verified
            </motion.span>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="font-display font-extrabold leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}
            >
              Campus<span className="text-[#F0B429]">Link</span>.
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="mt-5 min-h-[3.5em] text-xl leading-snug text-[#10201A]/75 dark:text-[#F4F1E6]/75 sm:text-2xl"
            >
              One verified place to{" "}
              <span className="font-mono-alt font-medium text-[#10201A] dark:text-[#F4F1E6]">
                {typed}
              </span>
            </motion.p>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="mt-2 max-w-md text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55"
            >
              No fake accounts, no spam, no strangers — just your university,
              online.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10201A] px-7 py-3.5 text-sm font-semibold text-[#F5F1E4] transition-all hover:-translate-y-0.5 hover:opacity-90 dark:bg-[#F0B429] dark:text-[#10201A]"
              >
                <Plus size={16} />
                Create free account
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#10201A]/20 px-6 py-3.5 text-sm text-[#10201A]/70 transition-all hover:bg-[#10201A]/5 dark:border-[#F4F1E6]/20 dark:text-[#F4F1E6]/70 dark:hover:bg-[#F4F1E6]/10"
              >
                See how it works
                <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="mt-4 text-xs text-[#10201A]/40 dark:text-[#F4F1E6]/35"
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
        <div className="mx-auto mb-14 max-w-lg text-center">
          <p className="mb-3 font-mono-alt text-[11px] uppercase tracking-[2px] text-[#F0B429]">
            Features
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Everything campus life needs
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
            Six core tools built around how students actually live and study.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group relative rounded-2xl border-2 border-[#10201A]/12 bg-[#F5F1E4] p-6 shadow-sm transition-all hover:-translate-y-1 hover:rotate-0 hover:shadow-lg dark:border-[#F4F1E6]/12 dark:bg-[#152922]"
            >
              <span className="absolute -top-2 left-8 h-3 w-3 rounded-full bg-[#FF6B57] shadow" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#F0B429]/30 bg-[#F0B429]/15">
                <Icon size={18} className="text-[#B8860B] dark:text-[#F0B429]" />
              </div>
              <p className="mb-1.5 font-display text-[15px] font-bold">{title}</p>
              <p className="text-[13px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bento */}
      <section id="community" className="relative z-10 bg-[#EEF0E9] px-5 py-20 dark:bg-[#0B1712] sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto mb-14 max-w-lg text-center">
          <p className="mb-3 font-mono-alt text-[11px] uppercase tracking-[2px] text-[#F0B429]">
            A closer look
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Designed around student life
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
            Every feature is purpose-built for the rhythms of campus — from
            exam season to the marketplace.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          <div
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
          </div>

          <div
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
          </div>

          <div
            {...fadeUp(0.15)}
            className="rounded-2xl border-2 border-[#10201A]/12 bg-[#F5F1E4] p-6 transition-colors hover:border-[#F0B429]/50 dark:border-[#F4F1E6]/12 dark:bg-[#152922]"
          >
            <TrendingUp size={22} className="mb-3 text-[#F0B429]" />
            <p className="mb-1.5 font-display text-[15px] font-bold">Skills profile</p>
            <p className="text-[12.5px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
              List what you know and what you can offer — visible to your
              whole campus.
            </p>
          </div>

          <div
            {...fadeUp(0.2)}
            className="rounded-2xl border-2 border-[#10201A]/12 bg-[#F5F1E4] p-6 transition-colors hover:border-[#F0B429]/50 dark:border-[#F4F1E6]/12 dark:bg-[#152922]"
          >
            <Tag size={22} className="mb-3 text-[#FF6B57]" />
            <p className="mb-1.5 font-display text-[15px] font-bold">Student marketplace</p>
            <p className="text-[12.5px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
              Textbooks, lab coats, laptops — listed by students, bought by
              students, no middleman.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto mb-14 max-w-lg text-center">
          <p className="mb-3 font-mono-alt text-[11px] uppercase tracking-[2px] text-[#F0B429]">
            How it works
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Up and running in minutes
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
            Three steps is all it takes to join your campus community.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.num} className="relative text-center">
              {i < STEPS.length - 1 && (
                <div className="absolute left-[calc(50%+28px)] right-0 top-6 hidden h-px border-t-2 border-dashed border-[#10201A]/20 dark:border-[#F4F1E6]/20 sm:block" />
              )}
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[#F0B429]/60 bg-[#F0B429]/15 font-display text-lg font-bold text-[#B8860B] dark:text-[#F0B429]">
                {s.num}
              </div>
              <p className="mb-2 text-[15px] font-semibold">{s.title}</p>
              <p className="text-[13px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 border-t border-[#10201A]/10 bg-[#EEF0E9] px-5 py-20 dark:border-[#F4F1E6]/10 dark:bg-[#0B1712] sm:px-8 sm:py-24 lg:px-10">
        <p {...fadeUp()} className="mb-14 text-center font-mono-alt text-[11px] uppercase tracking-[2px] text-[#F0B429]">
          What students say
        </p>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
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
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div {...fadeUp()} className="mx-auto mb-14 max-w-lg text-center">
          <p className="mb-3 font-mono-alt text-[11px] uppercase tracking-[2px] text-[#F0B429]">
            Pricing
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Free. Always.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
            CampusLink is built for students, not investors. No trials, no
            paywalls, no hidden fees.
          </p>
        </div>

        <div {...fadeUp(0.1)} className="relative mx-auto max-w-sm">
          <span className="absolute -left-3 top-24 h-6 w-6 rounded-full bg-[#F5F1E4] dark:bg-[#0E1B16]" />
          <span className="absolute -right-3 top-24 h-6 w-6 rounded-full bg-[#F5F1E4] dark:bg-[#0E1B16]" />
          <div className="rounded-3xl border-2 border-dashed border-[#F0B429]/50 bg-[#F5F1E4] p-8 dark:bg-[#152922]">
            <div className="mb-1 flex items-end gap-2">
              <span className="font-display text-6xl font-extrabold">0</span>
              <span className="mb-3 text-xl text-[#10201A]/45 dark:text-[#F4F1E6]/45">/= Tsh</span>
            </div>
            <p className="mb-8 text-sm text-[#10201A]/50 dark:text-[#F4F1E6]/45">per month, forever</p>

            <div className="mb-8 flex flex-col gap-3">
              {PRICING_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[#F0B429]/40 bg-[#F0B429]/20">
                    <Check size={11} className="text-[#B8860B] dark:text-[#F0B429]" />
                  </div>
                  <span className="text-sm text-[#10201A]/70 dark:text-[#F4F1E6]/70">{f}</span>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10201A] py-3.5 text-sm font-semibold text-[#F5F1E4] transition-opacity hover:opacity-85 dark:bg-[#F0B429] dark:text-[#10201A]"
            >
              <Plus size={16} />
              Get started for free
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div {...fadeUp()} className="mx-auto mb-14 max-w-lg text-center">
          <p className="mb-3 font-mono-alt text-[11px] uppercase tracking-[2px] text-[#F0B429]">
            Security & privacy
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Built for students, not advertisers
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
            CampusLink is private by default. We don’t sell your data or show
            you ads. Your campus is yours.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div
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
          <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-[#10201A] px-7 py-3.5 text-sm font-semibold text-[#F5F1E4] transition-opacity hover:opacity-85"
            >
              <Plus size={16} />
              Create free account
            </Link>
            <a
              href="mailto:hello@campuslink.co.tz"
              className="rounded-xl border border-[#10201A]/25 px-5 py-3.5 text-sm text-[#10201A]/80 transition-all hover:bg-[#10201A]/10"
            >
              Talk to us
            </a>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-[#10201A]/10 px-5 py-8 dark:border-[#F4F1E6]/10 sm:flex-row sm:px-8 lg:px-10">
        <p className="font-display text-sm font-semibold text-[#10201A]/60 dark:text-[#F4F1E6]/55">
          Campus<span className="text-[#F0B429]">Link</span>.
        </p>
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