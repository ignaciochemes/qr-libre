import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QR Libre - Generador de Códigos QR Gratuito',
    short_name: 'QR Libre',
    description: 'Genera códigos QR online gratis sin registro. Creador de códigos QR gratuito e ilimitado.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#222222',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

