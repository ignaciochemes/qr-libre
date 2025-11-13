import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import QRCode from 'qrcode'

// POST /api/qr - Crear un nuevo QR code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    // Validar que la URL esté presente
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'La URL es requerida' },
        { status: 400 }
      )
    }

    // Validar formato de URL básico
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'La URL proporcionada no es válida' },
        { status: 400 }
      )
    }

    // Crear el QR code en la base de datos
    const qrCode = await prisma.qrCode.create({
      data: {
        url: url.trim(),
      },
    })

    // Generar el código QR como imagen base64
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
    })

    return NextResponse.json({
      id: qrCode.id,
      url: qrCode.url,
      qrCodeImage: qrCodeDataUrl,
      createdAt: qrCode.createdAt,
    })
  } catch (error) {
    console.error('Error al crear QR code:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// GET /api/qr - Listar todos los QR codes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const qrCodes = await prisma.qrCode.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await prisma.qrCode.count()

    return NextResponse.json({
      data: qrCodes,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Error al listar QR codes:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

