  // "use client";
  // import Link from "next/link";
  // import { usePathname } from "next/navigation";
  // import {
  //   Home, FileText, MessageCircle, Users,
  //   ShoppingBag, Lightbulb, BookOpen,
  //   User, Settings, School,
  //   FolderOpen,
  // } from "lucide-react";
  // import { useAuthStore } from "@/store/authStore";
  // import { cn } from "@/lib/utils";

  // const navItems = [
  //   { label: "Home", href: "/dashboard", icon: Home },
  //   { label: "Documents", href: "/dashboard/documents", icon: FileText },
  //   { label: "Chat", href: "/dashboard/chat", icon: MessageCircle },
  //   { label: "Groups", href: "/dashboard/groups", icon: Users },
  //   { label: "Folders", href: "/dashboard/folders", icon: FolderOpen },
  // ];

  // const discoverItems = [
  //   { label: "Marketplace", href: "/dashboard/marketplace", icon: ShoppingBag },
  //   { label: "Skills", href: "/dashboard/skills", icon: Lightbulb },
  //   { label: "Courses", href: "/dashboard/courses", icon: BookOpen },
  // ];

  // const accountItems = [
  //   { label: "Profile", href: "/dashboard/profile", icon: User },
  //   { label: "Settings", href: "/dashboard/settings", icon: Settings },
  // ];

  // export default function Sidebar() {
  //   const pathname = usePathname();
  //   const user = useAuthStore((s) => s.user);
  //   const logout = useAuthStore((s) => s.logout);

  //   const isActive = (href: string) =>
  //     href === "/dashboard"
  //       ? pathname === "/dashboard"
  //       : pathname.startsWith(href);

  //   return (
  //     <aside className="w-56 bg-card border-r border-border flex flex-col h-full shrink-0">
  //       {/* Logo */}
  //       <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border">
  //         {/* <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
  //           <School size={16} className="text-primary-foreground" />
  //         </div> */}
  //         <span className="font-bold text-foreground">
  //           Campus<span className="text-primary">Link</span>.
  //         </span>
  //       </div>

  //       {/* Nav */}
  //       <nav className="flex-1 overflow-y-auto py-3 px-2">
  //         <NavGroup items={navItems} isActive={isActive} />

  //         <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 py-2 mt-2">
  //           Discover
  //         </p>
  //         <NavGroup items={discoverItems} isActive={isActive} />

  //         <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 py-2 mt-2">
  //           Account
  //         </p>
  //         <NavGroup items={accountItems} isActive={isActive} />
  //       </nav>

  //       {/* User row */}
  //       <div className="border-t border-border p-3 flex items-center gap-2.5">
  //         <div className="w-8 h-8 rounded-full bg-primary-tint flex items-center justify-center text-primary text-xs font-bold shrink-0">
  //           {user?.full_name?.slice(0, 2).toUpperCase() ?? "U"}
  //         </div>
  //         <div className="flex-1 min-w-0">
  //           <p className="text-xs font-semibold text-foreground truncate">
  //             {user?.full_name ?? "User"}
  //           </p>
  //           <p className="text-[10px] text-muted-foreground truncate">
  //             {user?.email ?? ""}
  //           </p>
  //         </div>
  //         <button
  //           onClick={logout}
  //           className="text-muted-foreground hover:text-destructive transition-colors"
  //           title="Logout"
  //         >
  //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
  //           </svg>
  //         </button>
  //       </div>
  //     </aside>
  //   );
  // }

  // function NavGroup({
  //   items,
  //   isActive,
  // }: {
  //   items: { label: string; href: string; icon: any }[];
  //   isActive: (href: string) => boolean;
  // }) {
  //   return (
  //     <div className="space-y-0.5">
  //       {items.map(({ label, href, icon: Icon }) => (
  //         <Link
  //           key={href}
  //           href={href}
  //           className={cn(
  //             "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
  //             isActive(href)
  //               ? "bg-accent text-primary font-semibold"
  //               : "text-muted-foreground hover:bg-accent hover:text-foreground"
  //           )}
  //         >
  //           <Icon size={16} />
  //           {label}
  //         </Link>
  //       ))}
  //     </div>
  //   );
  // }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  MessageCircle,
  Users,
  ShoppingBag,
  Lightbulb,
  BookOpen,
  User,
  Settings,
  FolderOpen,
  LayoutDashboard,
  X,
} from "lucide-react";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uistore";
import { cn } from "@/lib/utils";

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

const navItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "Chat", href: "/dashboard/chat", icon: MessageCircle },
  { label: "Groups", href: "/dashboard/groups", icon: Users },
  { label: "Folders", href: "/dashboard/folders", icon: FolderOpen },
];

const discoverItems = [
  { label: "Marketplace", href: "/dashboard/marketplace", icon: ShoppingBag },
  { label: "Skills", href: "/dashboard/skills", icon: Lightbulb },
  { label: "Courses", href: "/dashboard/courses", icon: BookOpen },
];

const accountItems = [
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const closeSidebar = useUIStore((s) => s.closeSidebar);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <>
      {/* mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-[#10201A]/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          `${display.variable} ${mono.variable} fixed inset-y-0 left-0 z-40 flex h-full w-64 shrink-0 flex-col border-r-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4] transition-transform duration-300 dark:border-[#F4F1E6]/12 dark:bg-[#0E1B16] lg:static lg:z-auto lg:translate-x-0`,
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <style>{`
          .font-display { font-family: var(--font-display), sans-serif; }
          .font-mono-alt { font-family: var(--font-mono), monospace; }
        `}</style>

        {/* Logo */}
        <div className="flex items-center justify-between gap-2.5 border-b border-dashed border-[#10201A]/12 px-4 py-5 dark:border-[#F4F1E6]/12">
          <span className="font-display text-base font-bold text-[#10201A] dark:text-[#F4F1E6]">
            Campus<span className="text-[#F0B429]">Link</span>.
          </span>
          <button
            onClick={closeSidebar}
            className="text-[#10201A]/40 dark:text-[#F4F1E6]/40 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <NavGroup items={navItems} isActive={isActive} onNavigate={closeSidebar} />

          <p className="font-mono-alt mt-3 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-[#10201A]/35 dark:text-[#F4F1E6]/35">
            Discover
          </p>
          <NavGroup items={discoverItems} isActive={isActive} onNavigate={closeSidebar} />

          <p className="font-mono-alt mt-3 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-[#10201A]/35 dark:text-[#F4F1E6]/35">
            Account
          </p>
          <NavGroup items={accountItems} isActive={isActive} onNavigate={closeSidebar} />
        </nav>

        {/* User row */}
        <div className="flex items-center gap-2.5 border-t border-dashed border-[#10201A]/12 p-3 dark:border-[#F4F1E6]/12">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F0B429] to-[#FF6B57] text-xs font-bold text-[#10201A]">
            {user?.full_name?.slice(0, 2).toUpperCase() ?? "U"}
          </div>
          
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#10201A] dark:text-[#F4F1E6]">
              {user?.full_name ?? "User"}
            </p>
            <p className="truncate text-[10px] text-[#10201A]/45 dark:text-[#F4F1E6]/45">
              {user?.email ?? ""}
            </p>
          </div>
          <button
            onClick={logout}
            className="text-[#10201A]/40 transition-colors hover:text-[#FF6B57] dark:text-[#F4F1E6]/40"
            title="Logout"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}

function NavGroup({
  items,
  isActive,
  onNavigate,
}: {
  items: { label: string; href: string; icon: any }[];
  isActive: (href: string) => boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-0.5">
      {items.map(({ label, href, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
              active
                ? "bg-[#F0B429]/15 font-semibold text-[#B8860B] dark:text-[#F0B429]"
                : "text-[#10201A]/55 hover:bg-[#10201A]/5 hover:text-[#10201A] dark:text-[#F4F1E6]/50 dark:hover:bg-[#F4F1E6]/8 dark:hover:text-[#F4F1E6]"
            )}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-[#F0B429]" />
            )}
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}