export interface QrCodeItem {
  id: string
  url: string
  qrCodeImage: string
  createdAt: string
}

const STORAGE_KEY = 'qrlibre_qrcodes'

/**
 * Obtiene todos los QR codes del localStorage
 */
export function getQrCodes(): QrCodeItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error al leer QR codes del localStorage:', error)
    return []
  }
}

/**
 * Guarda un nuevo QR code en el localStorage
 */
export function saveQrCode(qrCode: QrCodeItem): void {
  if (typeof window === 'undefined') return
  
  try {
    const existing = getQrCodes()
    const updated = [qrCode, ...existing] // Nuevo al inicio
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Error al guardar QR code en localStorage:', error)
  }
}

/**
 * Elimina un QR code del localStorage
 */
export function deleteQrCode(id: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const existing = getQrCodes()
    const updated = existing.filter(qr => qr.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Error al eliminar QR code del localStorage:', error)
  }
}

/**
 * Obtiene un QR code específico por ID
 */
export function getQrCodeById(id: string): QrCodeItem | null {
  const qrCodes = getQrCodes()
  return qrCodes.find(qr => qr.id === id) || null
}

/**
 * Limpia todos los QR codes del localStorage
 */
export function clearAllQrCodes(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

