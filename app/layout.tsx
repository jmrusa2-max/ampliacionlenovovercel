import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ampliación Memorias Lenovo",
  description: "Verifica si tu equipo Lenovo puede ampliar su garantía.",
  icons: "/logomini.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        {/* Background Container */}
        <div className="fixed inset-0 z-[-1] overflow-hidden">
          <Image
            src="/diseñov2.png"
            alt="Fondo abstracto"
            layout="fill"
            objectFit="cover"
            quality={90}
            className="translate-y-[75px]"
          />
          {/* Overlay & Vignette */}
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, black 100%)",
            }}
          />
        </div>

        {/* Header with Logo */}
        <header className="absolute top-0 left-0 w-full p-4 z-20">
          <div className="w-full max-w-7xl mx-auto">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Lenovo Logo"
                width={130}
                height={28}
                className="h-7 w-auto" // Ajusta la altura y el ancho se ajustará automáticamente
              />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
