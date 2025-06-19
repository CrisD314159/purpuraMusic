import type { Metadata } from "next";
import { Montserrat, Quicksand } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "../lib/theme/theme";
import Head from "next/head";


const quicksand = Quicksand({
  style:["normal"],
  subsets: ["latin"],
  weight:["300", "400", "500", "600"]
})


const montserrat = Montserrat({
  style:["normal", "italic"],
  subsets: ["latin"],
  weight:["200","300", "400", "500", "600"]
})

export const metadata: Metadata = {
  title: "Púrpura Music",
  description: "Welcome to Púrpura Music!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Esto permite que el navegador sepa que el sitio web está optimizado para dispositivos móviles.( que no haya rebote al hacer scroll) */}
      <Head> 
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="description" content="Púrpura Music: Tu música en todas partes" />
        <meta name="theme-color" content="transparent" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-title" content="Púrpura Music"/>
      </Head>
      
      <body
        className={`${quicksand.className} ${montserrat.className} antialiased h-screen`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}  
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
