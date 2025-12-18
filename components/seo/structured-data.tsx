// Componentes de Structured Data para SEO

export function BreadcrumbList({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'QR Libre',
    url: baseUrl,
    logo: `${baseUrl}/icon-512.png`,
    description: 'Generador de códigos QR online gratis. Crea códigos QR ilimitados sin registro.',
    sameAs: [
      // Agregar redes sociales cuando estén disponibles
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Soporte',
      availableLanguage: ['Spanish'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}

export function HowToSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo generar un código QR online gratis',
    description: 'Aprende a generar códigos QR de forma gratuita y sin registro usando QR Libre.',
    image: `${baseUrl}/og-image.png`,
    totalTime: 'PT1M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Navegador web',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'QR Libre - Generador de QR',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Ingresa la URL',
        text: 'Ingresa la URL que deseas convertir en código QR en el campo de texto.',
        image: `${baseUrl}/og-image.png`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Genera el código QR',
        text: 'Haz clic en el botón "Generar QR Code Gratis" para crear tu código QR instantáneamente.',
        image: `${baseUrl}/og-image.png`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Descarga el código QR',
        text: 'Descarga tu código QR en formato PNG de alta calidad haciendo clic en el botón de descarga.',
        image: `${baseUrl}/og-image.png`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
    />
  )
}

export function SoftwareApplicationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'QR Libre',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Generación de códigos QR gratuita',
      'Sin registro requerido',
      'Descarga en formato PNG',
      'Almacenamiento local en navegador',
      'Ilimitado y libre',
      'Privacidad total',
    ],
    screenshot: `${baseUrl}/og-image.png`,
    url: baseUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
    />
  )
}

