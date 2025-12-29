import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isRTL } from '@/i18n/config';
import type { Metadata } from "next";
import { Poppins, Manjari } from "next/font/google";
import "../globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeInjector from "@/components/ThemeInjector";

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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const rtl = isRTL(locale as any);

  return (
    <html lang={locale} dir={rtl ? 'rtl' : 'ltr'} className={`${poppins.variable} ${manjari.variable}`}>
      <body className={`${poppins.className} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeInjector />
          {children}
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

