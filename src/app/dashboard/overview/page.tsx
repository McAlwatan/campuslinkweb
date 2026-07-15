"use client";

import { useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { FileText, Users, ShoppingBag, BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const BARCODE = [3, 5, 2, 6, 4, 2, 5, 3];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: documents } = useQuery({
    queryKey: ["documents"],
    queryFn: () => api.get("/documents").then((r) => r.data),
  });

  const { data: groups } = useQuery({
    queryKey: ["groups"],
    queryFn: () => api.get("/groups").then((r) => r.data),
  });

  const { data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: () => api.get("/marketplace/listings").then((r) => r.data),
  });

  const stats = [
    {
      label: "Documents",
      value: documents?.length ?? 0,
      icon: FileText,
      href: "/dashboard/documents",
      accent: "#F0B429",
      rotate: -1.5,
    },
    {
      label: "Groups",
      value: groups?.length ?? 0,
      icon: Users,
      href: "/dashboard/groups",
      accent: "#FF6B57",
      rotate: 1,
    },
    {
      label: "Listings",
      value: listings?.length ?? 0,
      icon: ShoppingBag,
      href: "/dashboard/marketplace",
      accent: "#4FD1AE",
      rotate: -1,
    },
    {
      label: "Courses",
      value: 0,
      icon: BookOpen,
      href: "/dashboard/courses",
      accent: "#4C9BE8",
      rotate: 1.5,
    },
  ];

  return (
    <div className={`${display.variable} ${mono.variable} space-y-6`}>
      <style>{`
        .font-display { font-family: var(--font-display), sans-serif; }
        .font-mono-alt { font-family: var(--font-mono), monospace; }
      `}</style>

      {/* Welcome */}
      <div>
        <h1 className="font-display text-2xl font-bold text-[#10201A] dark:text-[#F4F1E6]">
          Good morning, {user?.full_name?.split(" ")[0] ?? "there"}
        </h1>
        <p className="mt-1 text-sm text-[#10201A]/55 dark:text-[#F4F1E6]/55">
          Here&apos;s what&apos;s happening on campus today.
        </p>
      </div>

      {/* Stat coupons — grab one and drag it around */}
      <div ref={containerRef} className="relative grid grid-cols-2 gap-5 pb-2 pt-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href, accent, rotate }) => (
          <motion.div
            key={label}
            drag
            dragConstraints={containerRef}
            dragElastic={0.12}
            dragMomentum={false}
            whileHover={{ y: -3 }}
            whileDrag={{
              scale: 1.06,
              zIndex: 50,
              boxShadow: "0 25px 45px -18px rgba(16,32,26,0.4)",
            }}
            style={{ rotate }}
            className="relative cursor-grab touch-none select-none rounded-2xl border-2 border-dashed border-[#10201A]/15 bg-[#F5F1E4] p-5 shadow-sm active:cursor-grabbing dark:border-[#F4F1E6]/15 dark:bg-[#152922]"
          >
            {/* ticket-stub notches */}
            <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#EEF0E9] dark:bg-[#0B1712]" />
            <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#EEF0E9] dark:bg-[#0B1712]" />

            <Link
              href={href}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute right-3 top-3 rounded-full border border-[#10201A]/15 p-1.5 text-[#10201A]/35 transition-colors hover:text-[#10201A] dark:border-[#F4F1E6]/15 dark:text-[#F4F1E6]/35 dark:hover:text-[#F4F1E6]"
            >
              <ArrowUpRight size={12} />
            </Link>

            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${accent}22` }}
            >
              <Icon size={18} style={{ color: accent }} />
            </div>
            <p className="font-display text-3xl font-extrabold text-[#10201A] dark:text-[#F4F1E6]">
              {value}
            </p>
            <p className="mt-0.5 text-sm text-[#10201A]/55 dark:text-[#F4F1E6]/55">{label}</p>

            <div className="mt-4 flex items-end gap-1 border-t border-dashed border-[#10201A]/12 pt-3 dark:border-[#F4F1E6]/12">
              {BARCODE.map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] bg-[#10201A]/25 dark:bg-[#F4F1E6]/25"
                  style={{ height: `${h * 3}px` }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="font-mono-alt -mt-2 text-[11px] text-[#10201A]/35 dark:text-[#F4F1E6]/30">
        Tip: grab a coupon and drag it around.
      </p>

      {/* Recent content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent documents */}
        <div className="rounded-2xl border-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4] p-5 dark:border-[#F4F1E6]/12 dark:bg-[#152922] lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-bold text-[#10201A] dark:text-[#F4F1E6]">
              Recent Documents
            </h2>
            <Link
              href="/dashboard/documents"
              className="text-xs font-medium text-[#B8860B] dark:text-[#F0B429]"
            >
              See all
            </Link>
          </div>
          <div className="space-y-2">
            {documents?.slice(0, 5).map((doc: any) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 rounded-xl bg-[#10201A]/[0.03] p-3 transition-colors hover:bg-[#F0B429]/10 dark:bg-[#F4F1E6]/[0.04]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FF6B57]/15">
                  <FileText size={16} className="text-[#FF6B57]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#10201A] dark:text-[#F4F1E6]">
                    {doc.title}
                  </p>
                  <p className="font-mono-alt text-[11px] text-[#10201A]/40 dark:text-[#F4F1E6]/40">
                    {doc.course_tag ?? "No course tag"} · {doc.file_type?.toUpperCase()}
                  </p>
                </div>
              </div>
            )) ?? (
              <p className="py-6 text-center text-sm text-[#10201A]/40 dark:text-[#F4F1E6]/40">
                No documents yet.{" "}
                <Link href="/dashboard/documents" className="text-[#B8860B] dark:text-[#F0B429]">
                  Upload one
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Groups */}
        <div className="rounded-2xl border-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4] p-5 dark:border-[#F4F1E6]/12 dark:bg-[#152922]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-bold text-[#10201A] dark:text-[#F4F1E6]">
              My Groups
            </h2>
            <Link
              href="/dashboard/groups"
              className="text-xs font-medium text-[#B8860B] dark:text-[#F0B429]"
            >
              See all
            </Link>
          </div>
          <div className="space-y-2">
            {groups?.slice(0, 6).map((group: any) => (
              <Link
                key={group.id}
                href={`/dashboard/groups/${group.id}`}
                className="flex items-center gap-2.5 rounded-xl p-2.5 transition-colors hover:bg-[#F0B429]/10"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#4FD1AE]/15">
                  <span className="text-xs font-bold text-[#0E8C6C] dark:text-[#4FD1AE]">
                    {group.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#10201A] dark:text-[#F4F1E6]">
                    {group.name}
                  </p>
                  <p className="text-xs capitalize text-[#10201A]/40 dark:text-[#F4F1E6]/40">
                    {group.group_type}
                  </p>
                </div>
              </Link>
            )) ?? (
              <p className="py-6 text-center text-sm text-[#10201A]/40 dark:text-[#F4F1E6]/40">
                No groups yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}