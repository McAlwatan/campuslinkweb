// "use client";

// import * as React from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // Standard shadcn/next-themes toggle, restyled to match the CampusLink
// // "ID card" palette. Assumes next-themes' <ThemeProvider attribute="class">
// // already wraps the app in app/layout.tsx — same one your settings toggle uses.
// export function ThemeToggle() {
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           className="relative h-9 w-9 shrink-0 rounded-full border-[#10201A]/15 bg-transparent hover:bg-[#10201A]/5 dark:border-[#F4F1E6]/15 dark:hover:bg-[#F4F1E6]/10"
//         >
//           <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 text-[#10201A] transition-all duration-300 dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 text-[#F4F1E6] transition-all duration-300 dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         align="end"
//         className="border-[#10201A]/10 bg-[#F5F1E4] font-medium text-[#10201A] dark:border-[#F4F1E6]/10 dark:bg-[#0E1B16] dark:text-[#F4F1E6]"
//       >
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Uses your actual global.css tokens (bg-background, border-border, etc.)
// so it stays correct automatically if the palette ever changes again —
// no hardcoded hex here. Assumes next-themes' <ThemeProvider attribute="class">
// already wraps the app in app/layout.tsx.
export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 shrink-0 rounded-full border-border bg-background hover:bg-accent"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 text-foreground transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 text-foreground transition-all duration-300 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-border bg-popover font-medium text-popover-foreground"
      >
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}