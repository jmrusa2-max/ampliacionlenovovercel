import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
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
  description: "Verifica si un equipo Lenovo puede ampliar sus memorias.",
  icons: {
    icon: "/favicon.ico",
  },
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
        {/* ✅ Logo en la esquina superior izquierda (COMO EN CÓDIGO A) */}
        <div className="absolute top-4 left-4 z-10"> 
          <Image
            src="/logo.png"
            alt="Lenovo Logo"
            width={120}
            height={40}
            priority
          />
        </div>

        {/* ✅ Fondo */}
        <div className="fixed inset-0 z-[-1] overflow-hidden"> 
          <Image
            src="/disenov2.jpg"
            alt="Fondo Lenovo"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            quality={90}
            priority
          />
          
          {/* Capas de Overlay y Viñeta optimizadas para la foto */}
          <div className="absolute inset-0 bg-slate-900/50" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.8) 100%)",
            }}
          />
        </div>

        {/* ✅ Contenido principal centrado */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
