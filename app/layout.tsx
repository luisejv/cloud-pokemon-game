import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon Game",
  description: "Proyecto de Cloud Computing 2024-1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <NextUIProvider>
          <main className="flex min-h-screen flex-col items-center justify-center p-24">
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
