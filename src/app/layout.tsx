import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const canela = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Canela-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Canela-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Canela-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Canela-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Canela-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Canela-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Canela-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Canela-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Canela-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Canela-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Canela-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Canela-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-canela",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Satoshi-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Satoshi-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Satoshi-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Satoshi-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Satoshi-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Satoshi-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TalkWithBarb",
  description: "Sophisticated French language learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${canela.variable} ${satoshi.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
