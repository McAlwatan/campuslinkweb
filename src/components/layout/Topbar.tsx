"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Bell, X } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUIStore } from "@/store/uistore";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
});

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Home",
  "/dashboard/overview": "Overview",
  "/dashboard/documents": "Documents",
  "/dashboard/chat": "Chat",
  "/dashboard/groups": "Groups",
  "/dashboard/folders": "Folders",
  "/dashboard/marketplace": "Marketplace",
  "/dashboard/skills": "Skills",
  "/dashboard/courses": "Courses",
  "/dashboard/profile": "Profile",
  "/dashboard/settings": "Settings",
};

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const title = PAGE_TITLES[pathname ?? ""] ?? "Dashboard";

  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const { data: results, isFetching } = useQuery({
    queryKey: ["user-search", debounced],
    queryFn: () =>
      api.get(`/users/search?q=${encodeURIComponent(debounced)}`).then((r) => r.data),
    enabled: debounced.trim().length >= 2,
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goToProfile = (userId: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/dashboard/people/${userId}`);
  };

  return (
    <header
      className={`${display.variable} sticky top-0 z-20 flex items-center justify-between gap-4 border-b-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4]/90 px-4 py-3 backdrop-blur-md dark:border-[#F4F1E6]/12 dark:bg-[#0E1B16]/90 sm:px-6`}
    >
      <style>{`.font-display { font-family: var(--font-display), sans-serif; }`}</style>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg border border-[#10201A]/15 p-2 text-[#10201A]/70 dark:border-[#F4F1E6]/15 dark:text-[#F4F1E6]/70 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
        <h1 className="font-display text-lg font-bold text-[#10201A] dark:text-[#F4F1E6]">
          {title}
        </h1>
      </div>

      <div ref={wrapperRef} className="relative hidden max-w-sm flex-1 md:block">
        <div className="flex items-center gap-2 rounded-xl border border-[#10201A]/12 bg-[#10201A]/[0.03] px-3 py-2 dark:border-[#F4F1E6]/12 dark:bg-[#F4F1E6]/[0.04]">
          <Search size={15} className="shrink-0 text-[#10201A]/40 dark:text-[#F4F1E6]/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => query && setOpen(true)}
            placeholder="Search people…"
            className="w-full bg-transparent text-sm text-[#10201A] placeholder:text-[#10201A]/35 focus:outline-none dark:text-[#F4F1E6] dark:placeholder:text-[#F4F1E6]/30"
          />
          {query && (
            <button onClick={() => { setQuery(""); setOpen(false); }} className="shrink-0">
              <X size={14} className="text-[#10201A]/40 dark:text-[#F4F1E6]/40" />
            </button>
          )}
        </div>

        {open && debounced.trim().length >= 2 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-xl border-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4] p-1.5 shadow-lg dark:border-[#F4F1E6]/12 dark:bg-[#152922]">
            {isFetching ? (
              <p className="p-3 text-center text-xs text-[#10201A]/40 dark:text-[#F4F1E6]/40">
                Searching…
              </p>
            ) : results?.length ? (
              results.map((u: any) => (
                <button
                  key={u.id}
                  onClick={() => goToProfile(u.id)}
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-[#10201A]/5 dark:hover:bg-[#F4F1E6]/8"
                >
                  {u.avatar_url ? (
                    <img src={u.avatar_url} alt={u.full_name} className="h-8 w-8 shrink-0 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F0B429] to-[#FF6B57] text-[10px] font-bold text-[#10201A]">
                      {u.full_name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#10201A] dark:text-[#F4F1E6]">
                      {u.full_name}
                    </p>
                    <p className="truncate text-[10.5px] text-[#10201A]/45 dark:text-[#F4F1E6]/45">
                      {u.course ?? u.university_name ?? u.email}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <p className="p-3 text-center text-xs text-[#10201A]/40 dark:text-[#F4F1E6]/40">
                No students found
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="relative rounded-full border border-[#10201A]/15 p-2 text-[#10201A]/70 transition-colors hover:bg-[#10201A]/5 dark:border-[#F4F1E6]/15 dark:text-[#F4F1E6]/70 dark:hover:bg-[#F4F1E6]/10"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#FF6B57]" />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}