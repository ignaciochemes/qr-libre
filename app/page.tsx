import { Metadata } from 'next'
import HomeClient from './home-client'

export const metadata: Metadata = {
  title: "Generar QR Online Gratis - Creador de Códigos QR Gratuito",
  description: "Genera códigos QR online gratis sin registro. Creador de códigos QR gratuito e ilimitado. Genera QR codes para URLs, descarga en PNG y almacena tus códigos QR de forma gratuita.",
  keywords: "generar qr online gratis, crear qr code gratis, generador qr online, qr code gratis, crear codigo qr, generar qr code",
  openGraph: {
    title: "Generar QR Online Gratis - QR Libre",
    description: "Genera códigos QR online gratis sin registro. Creador de códigos QR gratuito e ilimitado.",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'QR Libre',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    description: 'Genera códigos QR online gratis sin registro. Creador de códigos QR gratuito e ilimitado.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: [
      'Generación de códigos QR gratuita',
      'Sin registro requerido',
      'Descarga en formato PNG',
      'Almacenamiento persistente',
      'Ilimitado y libre',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo generar un QR code gratis online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simplemente ingresa la URL que deseas convertir en código QR en nuestro generador gratuito y haz clic en "Generar QR Code". El código se generará instantáneamente y podrás descargarlo en formato PNG.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Es gratis generar códigos QR?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, QR Libre es completamente gratuito. Puedes generar códigos QR ilimitados sin necesidad de registro ni pago.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Necesito registrarme para generar QR codes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, no necesitas registrarte. Puedes generar códigos QR de forma inmediata sin crear una cuenta.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo descargar los códigos QR generados?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, todos los códigos QR generados se pueden descargar en formato PNG de alta calidad.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeClient />
    </>
  )
}
