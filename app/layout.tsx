import type { Metadata } from "next";
import { Poppins, Manjari } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

const manjari = Manjari({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-manjari",
});

export const metadata: Metadata = {
  title: "Sobek Shipping Agency - Exclusive Agent of Right Line",
  description: "Fast, reliable sea freight solutions. Sobek Shipping Agency is the exclusive agent of Right Line - Russian Shipping Line, providing global maritime and logistics services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${manjari.variable}`}>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}

