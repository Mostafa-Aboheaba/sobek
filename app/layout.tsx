/**
 * Root Layout
 * 
 * This is a minimal root layout that delegates to the [locale] layout.
 * The actual layout with fonts, styles, and providers is in app/[locale]/layout.tsx
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

