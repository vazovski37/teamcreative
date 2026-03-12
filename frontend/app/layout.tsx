import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const firaSans = localFont({
  src: [
    {
      path: './../public/fonts/FiraGO/FiraGO-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../public/fonts/FiraGO/FiraGO-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../public/fonts/FiraGO/FiraGO-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './../public/fonts/FiraGO/FiraGO-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './../public/fonts/FiraGO/FiraGO-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './../public/fonts/FiraGO/FiraGO-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './../public/fonts/FiraGO/FiraGO-SemiBoldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './../public/fonts/FiraGO/FiraGO-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: "--font-firago",
  display: "swap"
});

const msBlock = localFont({
  src: "./fonts/MSBlock.otf",
  variable: "--font-ms-block",
  display: "swap",
});

const roman = localFont({
  src: [
    {
      path: "./../public/fonts/FiraGO/FiraGO-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../public/fonts/FiraGO/FiraGO-BookItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./../public/fonts/FiraGO/FiraGO-Two.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../public/fonts/FiraGO/FiraGO-TwoItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./../public/fonts/FiraGO/FiraGO-Eight.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../public/fonts/FiraGO/FiraGO-EightItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-roman",
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
import { LightboxProvider } from "@/lib/lightbox-context";
import { Lightbox } from "@/components/ui/Lightbox";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaSans.variable} ${msBlock.variable} ${roman.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          // defaultTheme="dark"
          forcedTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <LightboxProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
                <Lightbox />
              </div>
            </LightboxProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
