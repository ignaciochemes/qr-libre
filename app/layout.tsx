import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "Generar QR Online Gratis - QR Libre | Creador de Códigos QR Gratuito",
    template: "%s | QR Libre"
  },
  description: "Genera códigos QR online gratis sin registro. Creador de códigos QR gratuito e ilimitado. Genera QR codes para URLs, descarga en PNG y almacena tus códigos QR de forma gratuita.",
  keywords: [
    "generar qr online gratis",
    "crear qr code gratis",
    "generador qr online",
    "qr code gratis",
    "crear codigo qr",
    "generar qr code",
    "qr generator online",
    "generador de qr codes",
    "crear qr online",
    "qr code generator gratis",
    "generar codigo qr online",
    "qr code creator",
    "generador qr code gratis",
    "crear qr code online",
    "qr generator español"
  ],
  authors: [{ name: "QR Libre" }],
  creator: "QR Libre",
  publisher: "QR Libre",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    title: "Generar QR Online Gratis - QR Libre | Creador de Códigos QR Gratuito",
    description: "Genera códigos QR online gratis sin registro. Creador de códigos QR gratuito e ilimitado. Genera QR codes para URLs, descarga en PNG y almacena tus códigos QR de forma gratuita.",
    siteName: "QR Libre",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QR Libre - Generador de Códigos QR Gratuito",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generar QR Online Gratis - QR Libre",
    description: "Genera códigos QR online gratis sin registro. Creador de códigos QR gratuito e ilimitado.",
    creator: "@qrlibre",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "QR Libre",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Agregar aquí los códigos de verificación cuando los tengas
    // google: 'tu-codigo-google',
    // yandex: 'tu-codigo-yandex',
    // bing: 'tu-codigo-bing',
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

