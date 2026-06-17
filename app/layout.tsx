import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Finkont — Accounting for Businesses",
  description:
    "Finkont is an ultra-clean, dark-mode-first accounting platform for businesses.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-accent-neutral">
        {children}
      </body>
    </html>
  );
}
