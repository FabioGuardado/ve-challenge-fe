import { Inter } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Technical Challenge - Vinculos Estratégicos",
  description: "Solución a la prueba técnica de Vinculos Estratégicos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
