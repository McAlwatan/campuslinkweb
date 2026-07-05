import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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
    url: "http://182.194.219.112",
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
      <body className={`${jakarta.variable} font-sans antialiased`} suppressHydrationWarning>
          <Providers>
            <ThemeProvider>
              {children}
              <Toaster position="top-right" richColors />
            </ThemeProvider>
          </Providers>
      </body>
    </html>
  );
}