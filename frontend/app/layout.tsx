import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const firaSans = Fira_Sans({
  variable: "--font-firago",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const msBlock = localFont({
  src: "./fonts/MSBlock.otf",
  variable: "--font-ms-block",
  display: "swap",
});


export const metadata: Metadata = {
  title: "TeamCreative - Digital Agency",
  description: "Web Development, Graphic Design, and more.",
};

import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { LanguageProvider } from "@/lib/language-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaSans.variable} ${msBlock.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          // defaultTheme="dark"
          forcedTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
