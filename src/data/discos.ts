export interface Disco {
  code: string
  name: string
  fullName: string
  region: string
  pitcPath: string | null

  baseUrl?: string
  idLabel?: string
  idLength?: number

  logo: string
  color: string
  badge: string
}

// pitcPath maps each DISCO to its segment on bill.pitc.com.pk
// Pattern: https://bill.pitc.com.pk/{pitcPath}/general?refno={number}
// Confirmed for LESCO directly from a real redirect. Others follow the same
// naming convention, cross-referenced against multiple independent sources.
export const discos: Disco[] = [
  {
    code: 'lesco',
    name: 'LESCO',
    fullName: 'Lahore Electric Supply Company',
    region: 'Lahore, Sheikhupura, Kasur, Okara, Nankana Sahib',
    pitcPath: 'lescobill',
    logo: '/logos/lesco.png',
    color: '#F59E0B',
    badge: 'Punjab',
  },
  {
    code: 'mepco',
    name: 'MEPCO',
    fullName: 'Multan Electric Power Company',
    region: 'Multan, Bahawalpur, Dera Ghazi Khan',
    pitcPath: 'mepcobill',
    logo: '/logos/mepco.png',
    color: '#10B981',
    badge: 'Punjab',
  },
  {
    code: 'fesco',
    name: 'FESCO',
    fullName: 'Faisalabad Electric Supply Company',
    region: 'Faisalabad, Jhang, Toba Tek Singh',
    pitcPath: 'fescobill',
    logo: '/logos/fesco.png',
    color: '#6366F1',
    badge: 'Punjab',
  },
  {
    code: 'iesco',
    name: 'IESCO',
    fullName: 'Islamabad Electric Supply Company',
    region: 'Islamabad, Rawalpindi, Attock',
    pitcPath: 'iescobill',
    logo: '/logos/iesco.png',
    color: '#06B6D4',
    badge: 'Punjab',
  },
  {
    code: 'gepco',
    name: 'GEPCO',
    fullName: 'Gujranwala Electric Power Company',
    region: 'Gujranwala, Sialkot, Gujrat',
    pitcPath: 'gepcobill',
    logo: '/logos/gepco.png',
    color: '#F97316',
    badge: 'Punjab',
  },
  {
    code: 'pesco',
    name: 'PESCO',
    fullName: 'Peshawar Electric Supply Company',
    region: 'Peshawar, Mardan, Swat',
    pitcPath: 'pescobill',
    logo: '/logos/pesco.png',
    color: '#65A30D',
    badge: 'KPK',
  },
  {
    code: 'hesco',
    name: 'HESCO',
    fullName: 'Hyderabad Electric Supply Company',
    region: 'Hyderabad, Mirpurkhas, Badin',
    pitcPath: 'hescobill',
    logo: '/logos/hesco.png',
    color: '#0EA5E9',
    badge: 'Sindh',
  },
  {
    code: 'sepco',
    name: 'SEPCO',
    fullName: 'Sukkur Electric Power Company',
    region: 'Sukkur, Larkana, Shikarpur',
    pitcPath: 'sepcobill',
    logo: '/logos/sepco.png',
    color: '#8B5CF6',
    badge: 'Sindh',
  },
  {
    code: 'qesco',
    name: 'QESCO',
    fullName: 'Quetta Electric Supply Company',
    region: 'Quetta, Balochistan region',
    pitcPath: 'qescobill',
    logo: '/logos/qesco.png',
    color: '#DC2626',
    badge: 'Balochistan',
  },
  {
    code: 'tesco',
    name: 'TESCO',
    fullName: 'Tribal Electric Supply Company',
    region: 'Tribal districts',
    pitcPath: 'tescobill',
    logo: '/logos/tesco.png',
    color: '#7C3AED',
    badge: 'Ex-FATA',
  },
  {
    code: 'hazeco',
    name: 'HAZECO',
    fullName: 'Hazara Electric Supply Company',
    region: 'Abbottabad, Mansehra, Haripur',
    pitcPath: 'hazecobill',
    logo: '/logos/hazeco.png',
    color: '#0891B2',
    badge: 'KPK',
  },
  {
    code: 'ke',
    name: 'K-Electric',
    fullName: 'K-Electric Limited',
    region: 'Karachi and surrounding areas',
    pitcPath: null,
    baseUrl: 'https://staging.ke.com.pk:24555/ReBrand/DuplicateBill.aspx',
    idLabel: '13-digit Account Number',
    idLength: 13,
    logo: '/logos/ke.png',
    color: '#2563EB',
    badge: 'Sindh',
  },
]
export function getDiscoByCode(code: string): Disco | undefined {
  return discos.find((d) => d.code === code)
}
