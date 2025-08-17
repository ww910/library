import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const ibmFlexSans = localFont({
  src: [
    { path: "./fonts/IBMPlexSans-Regular.ttf", weight: '400', style: 'normal' },
    { path: "./fonts/IBMPlexSans-Medium.ttf", weight: '500', style: 'normal' },
    { path: "./fonts/IBMPlexSans-SemiBold.ttf", weight: '600', style: 'normal' },
    { path: "./fonts/IBMPlexSans-Bold.ttf", weight: '700', style: 'normal' },
  ],
  variable: "--font-ibm-plex-sans",
});

const bebasNeue = localFont({
  src: [
    { path: "./fonts/BebasNeue-Regular.ttf", weight: '400', style: 'normal' },
  ],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "BookWise is a library management system that helps you manage your books efficiently.",
};

async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  const session = await auth()

  return (
    <html lang="en">
      <body
          className={`${ibmFlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        <SessionProvider session={session}>
        {children}
          <Toaster richColors /> 
      </SessionProvider>
      </body>
    </html>
  );
}
export default RootLayout;
