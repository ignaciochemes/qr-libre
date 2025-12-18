import { Metadata } from 'next'
import QrCodesClient from './qr-codes-client'
import { BreadcrumbList } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: "Lista de QR Codes Generados - Ver Todos los Códigos QR",
  description: "Visualiza y gestiona todos tus códigos QR generados. Lista completa de códigos QR creados con QR Libre, el generador de QR online gratis.",
  keywords: "lista qr codes, ver qr codes, gestionar qr codes, códigos qr generados, mis qr codes",
  openGraph: {
    title: "Lista de QR Codes Generados - QR Libre",
    description: "Visualiza y gestiona todos tus códigos QR generados.",
    type: "website",
    url: "/qr-codes",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QR Libre - Lista de QR Codes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lista de QR Codes Generados - QR Libre",
    description: "Visualiza y gestiona todos tus códigos QR generados.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/qr-codes",
  },
}

export default function QrCodesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  return (
    <>
      <BreadcrumbList
        items={[
          { name: 'Inicio', url: baseUrl },
          { name: 'QR Codes', url: `${baseUrl}/qr-codes` },
        ]}
      />
      <QrCodesClient />
    </>
  )
}
