import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import QRCode from 'qrcode'

// GET /api/qr/[id] - Obtener un QR code específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const qrCode = await prisma.qrCode.findUnique({
      where: { id },
    })

    if (!qrCode) {
      return NextResponse.json(
        { error: 'QR code no encontrado' },
        { status: 404 }
      )
    }

    // Generar el código QR como imagen base64
    const qrCodeDataUrl = await QRCode.toDataURL(qrCode.url, {
      width: 300,
      margin: 2,
    })

    return NextResponse.json({
      id: qrCode.id,
      url: qrCode.url,
      qrCodeImage: qrCodeDataUrl,
      createdAt: qrCode.createdAt,
      updatedAt: qrCode.updatedAt,
    })
  } catch (error) {
    console.error('Error al obtener QR code:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

