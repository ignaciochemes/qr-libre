'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Download, QrCode, Loader2 } from 'lucide-react'
import QRCode from 'qrcode'
import { saveQrCode, type QrCodeItem } from '@/lib/storage'

export default function HomeClient() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState<QrCodeItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Validar URL
      if (!url || typeof url !== 'string') {
        throw new Error('La URL es requerida')
      }

      // Validar formato de URL
      try {
        new URL(url)
      } catch {
        throw new Error('La URL proporcionada no es válida')
      }

      // Generar ID único
      const id = `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const createdAt = new Date().toISOString()

      // Generar el código QR como imagen base64
      const qrCodeDataUrl = await QRCode.toDataURL(url.trim(), {
        width: 300,
        margin: 2,
      })

      const newQrCode: QrCodeItem = {
        id,
        url: url.trim(),
        qrCodeImage: qrCodeDataUrl,
        createdAt,
      }

      // Guardar en localStorage
      saveQrCode(newQrCode)

      setQrCode(newQrCode)
      setUrl('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!qrCode?.qrCodeImage) return

    const link = document.createElement('a')
    link.href = qrCode.qrCodeImage
    link.download = `qr-code-${qrCode.id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!mounted) {
    return null // Evitar problemas de hidratación
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <QrCode className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">QR Libre</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Genera códigos QR online gratis sin registro. Creador de códigos QR gratuito e ilimitado. 
              Almacena y gestiona tus códigos QR fácilmente en tu navegador.
            </p>
          </div>

          {/* Formulario */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Generar Nuevo QR Code</CardTitle>
              <CardDescription>
                Ingresa una URL para generar un código QR gratis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://ejemplo.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <QrCode className="mr-2 h-4 w-4" />
                      Generar QR Code Gratis
                    </>
                  )}
                </Button>
              </form>

              {error && (
                <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resultado del QR */}
          {qrCode && (
            <Card>
              <CardHeader>
                <CardTitle>QR Code Generado</CardTitle>
                <CardDescription>
                  Escanea este código QR o descárgalo. Se ha guardado en tu navegador.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <img
                      src={qrCode.qrCodeImage}
                      alt={`QR Code para ${qrCode.url} - Generado con QR Libre, el mejor generador de códigos QR online gratis`}
                      className="w-64 h-64"
                      loading="lazy"
                      decoding="async"
                      width={256}
                      height={256}
                    />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground break-all">
                    {qrCode.url}
                  </p>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Link a lista de QRs */}
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <a href="/qr-codes">Ver todos los QR codes generados</a>
            </Button>
          </div>

          {/* SEO Content Section */}
          <section className="mt-16 space-y-6" aria-label="Información sobre QR Libre">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Generador de Códigos QR Online Gratis</h2>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>QR Libre</strong> es el mejor <strong>generador de códigos QR online gratis</strong> disponible. 
                  Crea códigos QR ilimitados sin necesidad de registro ni pago. Nuestra herramienta 
                  te permite <strong>generar códigos QR para URLs</strong> de forma instantánea y descargarlos en 
                  formato PNG de alta calidad. Todos tus códigos QR se guardan localmente en tu navegador, 
                  garantizando tu privacidad total.
                </p>
                <p>
                  ¿Buscas un <strong>generador QR online gratis</strong>? Has llegado al lugar correcto. 
                  QR Libre es completamente gratuito, no requiere registro y te permite crear tantos 
                  códigos QR como necesites. Perfecto para uso personal y profesional. Nuestro 
                  <strong>creador de QR codes</strong> es la solución ideal para generar códigos QR 
                  de forma rápida y sencilla.
                </p>
                
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">
                  ¿Por qué elegir QR Libre para generar QR codes?
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>100% Gratis:</strong> Genera códigos QR ilimitados sin costo. No hay límites ni restricciones.</li>
                  <li><strong>Sin Registro:</strong> Crea QR codes de forma inmediata sin crear cuenta. Empieza a generar ahora mismo.</li>
                  <li><strong>Privacidad Total:</strong> Tus QR codes se guardan solo en tu navegador. Tus datos nunca salen de tu dispositivo.</li>
                  <li><strong>Descarga Gratis:</strong> Descarga tus códigos QR en PNG de alta calidad para usar donde necesites.</li>
                  <li><strong>Almacenamiento Local:</strong> Guarda y gestiona todos tus códigos QR en tu navegador de forma permanente.</li>
                  <li><strong>Fácil de Usar:</strong> Interfaz simple e intuitiva. Genera tu primer QR code en menos de 30 segundos.</li>
                  <li><strong>Sin Límites:</strong> Genera tantos códigos QR como necesites, completamente gratis e ilimitado.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">
                  Cómo generar un código QR online gratis
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Ingresa la URL que deseas convertir en código QR en el campo de texto superior</li>
                  <li>Haz clic en "Generar QR Code Gratis" y espera unos segundos</li>
                  <li>Visualiza tu código QR generado instantáneamente</li>
                  <li>Descarga tu código QR en formato PNG haciendo clic en el botón de descarga</li>
                  <li>¡Listo! Tu código QR está listo para usar y guardado automáticamente en tu navegador</li>
                </ol>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">
                  Usos comunes de los códigos QR
                </h3>
                <p>
                  Los códigos QR generados con QR Libre pueden ser utilizados para múltiples propósitos:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Marketing Digital:</strong> Comparte enlaces a tus productos, servicios o promociones</li>
                  <li><strong>Redes Sociales:</strong> Enlaza a tus perfiles de Instagram, Facebook, Twitter y más</li>
                  <li><strong>Menús Digitales:</strong> Crea códigos QR para restaurantes y cafeterías</li>
                  <li><strong>Eventos:</strong> Comparte información de eventos, conferencias y reuniones</li>
                  <li><strong>Portafolios:</strong> Enlaza a tu sitio web personal o portafolio profesional</li>
                  <li><strong>WiFi:</strong> Comparte credenciales de WiFi de forma rápida y segura</li>
                  <li><strong>Contacto:</strong> Comparte tu tarjeta de contacto digital o información de contacto</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">
                  ¿Es seguro usar QR Libre?
                </h3>
                <p>
                  Absolutamente. QR Libre es una herramienta 100% segura y privada. Todos los códigos QR 
                  se generan directamente en tu navegador y se almacenan localmente. No enviamos tus datos 
                  a ningún servidor externo, garantizando tu privacidad y seguridad total. Además, nuestro 
                  servicio es completamente gratuito y sin publicidad intrusiva.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
