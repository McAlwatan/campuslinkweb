import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CampusLink — Your campus, connected",
  description:
    "CampusLink connects university students through chat, shared documents, a student marketplace, and a skills network — all in one verified campus platform.",
  keywords: ["campus", "students", "university", "Tanzania", "study groups", "marketplace"],
  openGraph: {
    title: "CampusLink — Your campus, connected",
    description:
      "Chat, share documents, trade in the marketplace, and build skills — all in one place for your campus community.",
    url: "http://campuslinkapp.online",
    siteName: "CampusLink",
    locale: "en_TZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusLink — Your campus, connected",
    description: "The campus platform students actually use.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${geistMono.variable} ${bricolage.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
              <Toaster position="top-right" richColors />
            </ThemeProvider>
          </Providers>
      </body>
    </html>
  );
}