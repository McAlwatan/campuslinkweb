// "use client";
// import { Bell, Upload } from "lucide-react";
// import { useAuthStore } from "@/store/authStore";

// export default function Topbar() {
//   const user = useAuthStore((s) => s.user);

//   return (
//     <header className="h-14 bg-card border-b border-border flex items-center gap-3 px-6 shrink-0">
//       {/* Search */}
//       <div className="flex-1 max-w-md">
//         <input
//           type="text"
//           placeholder="Search students, docs, listings…"
//           className="input-field w-full h-9 text-sm"
//         />
//       </div>

//       <div className="flex items-center gap-2 ml-auto">
//         {/* Notifications */}
//         <button className="relative w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors">
//           <Bell size={16} className="text-muted-foreground" />
//           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
//         </button>

//         {/* Upload */}
//         <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors">
//           <Upload size={16} className="text-muted-foreground" />
//         </button>

//         {/* Avatar */}
//         <div className="w-8 h-8 rounded-full bg-primary-tint flex items-center justify-center text-primary text-xs font-bold ml-1">
//           {user?.full_name?.slice(0, 2).toUpperCase() ?? "U"}
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUIStore } from "@/store/uistore";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
});

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Home",
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
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const title = PAGE_TITLES[pathname ?? ""] ?? "Dashboard";

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

      <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-xl border border-[#10201A]/12 bg-[#10201A]/[0.03] px-3 py-2 dark:border-[#F4F1E6]/12 dark:bg-[#F4F1E6]/[0.04] md:flex">
        <Search size={15} className="text-[#10201A]/40 dark:text-[#F4F1E6]/40" />
        <input
          type="text"
          placeholder="Search documents, groups, people..."
          className="w-full bg-transparent text-sm text-[#10201A] placeholder:text-[#10201A]/35 focus:outline-none dark:text-[#F4F1E6] dark:placeholder:text-[#F4F1E6]/30"
        />
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