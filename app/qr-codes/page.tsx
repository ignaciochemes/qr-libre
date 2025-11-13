import { Metadata } from 'next'
import QrCodesClient from './qr-codes-client'

export const metadata: Metadata = {
  title: "Lista de QR Codes Generados - Ver Todos los Códigos QR",
  description: "Visualiza y gestiona todos tus códigos QR generados. Lista completa de códigos QR creados con QR Libre, el generador de QR online gratis.",
  keywords: "lista qr codes, ver qr codes, gestionar qr codes, códigos qr generados",
  openGraph: {
    title: "Lista de QR Codes Generados - QR Libre",
    description: "Visualiza y gestiona todos tus códigos QR generados.",
    type: "website",
  },
  alternates: {
    canonical: "/qr-codes",
  },
}

export default function QrCodesPage() {
  return <QrCodesClient />
}
