import { getDiscoByCode } from '@/data/discos'

const PITC_BASE = 'https://bill.pitc.com.pk'

export function buildBillUrl(discoCode: string, refNo: string): string | null {
  const disco = getDiscoByCode(discoCode)
  if (!disco) return null

  // Non-PITC-network providers
  if (disco.baseUrl) {
    return disco.baseUrl
  }

  // Ensure the path is exactly as the official portal expects:
  // Format: https://bill.pitc.com.pk/lescobill/general?refno=...
  const cleanRef = refNo.trim().replace(/\s+/g, '')
  return `${PITC_BASE}/${disco.pitcPath}/general?refno=${encodeURIComponent(cleanRef)}`
}

export function isValidReference(value: string, discoCode?: string): boolean {
  const cleaned = value.trim().replace(/\s+/g, '')
  const disco = discoCode ? getDiscoByCode(discoCode) : undefined

  if (disco?.idLength) {
    const re = new RegExp(`^\\d{${disco.idLength}}$`)
    return re.test(cleaned)
  }

  // General validation for 14-digit ref numbers
  return /^\d{6,16}$/.test(cleaned)
}
