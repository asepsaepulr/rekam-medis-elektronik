import type { Metadata } from "next";
import "@/styles/globals.scss";

import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ClerkProvider } from "@clerk/nextjs";


  import { primary, secondary } from '@/lib/font';
  import theme from '@/lib/theme';

export const metadata: Metadata = {
  title: "UTAMA Klinik",
  description: "Rekam Medis Elektronik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="ini headnya">
          <body id="__next" className={`${primary.variable} ${secondary.variable}`}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
          </body>
      </html>
  );
}
