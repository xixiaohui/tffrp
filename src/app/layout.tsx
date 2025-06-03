import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tianfu New Material",
  description: "Fiberglass Raw Materials Distributor.One-stop supplier of composite materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/materials' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ]

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar items={navItems} brand="TF FRP" />

        {children}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
