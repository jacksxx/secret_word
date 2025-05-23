import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Palavra Secreta",
  description: "Adivinha a Palavra ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-radial from-blue-600 from-0% to-black to-100% `}
      >
        {children}
      </body>
    </html>
  );
}
