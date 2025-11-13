'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, QrCode, Loader2, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { getQrCodes, deleteQrCode, type QrCodeItem } from '@/lib/storage'

export default function QrCodesClient() {
  const [qrCodes, setQrCodes] = useState<QrCodeItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQr, setSelectedQr] = useState<QrCodeItem | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadQrCodes()
  }, [])

  const loadQrCodes = () => {
    try {
      const stored = getQrCodes()
      setQrCodes(stored)
    } catch (error) {
      console.error('Error al cargar QR codes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewQr = (qr: QrCodeItem) => {
    if (selectedQr?.id === qr.id) {
      setSelectedQr(null)
    } else {
      setSelectedQr(qr)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este QR code?')) {
      deleteQrCode(id)
      loadQrCodes()
      if (selectedQr?.id === id) {
        setSelectedQr(null)
      }
    }
  }

  const handleDownload = (qrCode: QrCodeItem) => {
    if (!qrCode?.qrCodeImage) return

    const link = document.createElement('a')
    link.href = qrCode.qrCodeImage
    link.download = `qr-code-${qrCode.id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Todos los QR Codes
              </h1>
              <p className="text-muted-foreground">
                Lista de todos los códigos QR generados (guardados en tu navegador)
              </p>
            </div>
            <Button asChild>
              <Link href="/">
                <QrCode className="mr-2 h-4 w-4" />
                Generar Nuevo
              </Link>
            </Button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Lista de QR Codes */}
          {!loading && qrCodes.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <QrCode className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">
                  No hay QR codes generados aún.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Los QR codes se guardan localmente en tu navegador.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/">Generar tu primer QR code</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Grid de QR Codes */}
          {!loading && qrCodes.length > 0 && (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                {qrCodes.length} {qrCodes.length === 1 ? 'QR code guardado' : 'QR codes guardados'} en tu navegador
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {qrCodes.map((qr) => (
                  <Card key={qr.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg truncate">
                        {qr.url}
                      </CardTitle>
                      <CardDescription>
                        {formatDate(qr.createdAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewQr(qr)}
                          className="flex-1"
                        >
                          {selectedQr?.id === qr.id ? 'Ocultar' : 'Ver QR'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={qr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Abrir URL"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(qr.id)}
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      {/* QR Code Image */}
                      {selectedQr?.id === qr.id && selectedQr.qrCodeImage && (
                        <div className="space-y-2">
                          <div className="flex justify-center p-4 bg-white rounded-lg">
                            <img
                              src={selectedQr.qrCodeImage}
                              alt={`QR Code para ${selectedQr.url}`}
                              className="w-48 h-48"
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(selectedQr)}
                            className="w-full"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Descargar
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
