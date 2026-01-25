/* eslint-disable @typescript-eslint/no-explicit-any */
interface FilterObject {
  [key: string]:
    | string
    | number
    | boolean
    | Date
    | FilterObject
    | (string | number | Date)[]
}

/**
 * Helper: remove all null/undefined/empty recursively
 */
function cleanObject<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj
  const cleaned: Record<string, any> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (
      v === undefined ||
      v === null ||
      v === '' ||
      (Array.isArray(v) && v.length === 0)
    )
      continue

    if (typeof v === 'object' && !Array.isArray(v)) {
      const nested = cleanObject(v)
      if (Object.keys(nested).length > 0) cleaned[k] = nested
    } else {
      cleaned[k] = v
    }
  }
  return cleaned as T
}

/**
 * Convert Date or numeric timestamp → ISO string
 */
function normalizeValue(value: any): string | number | boolean {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'number' && value > 1e12) {
    // likely ms timestamp
    return new Date(value).toISOString()
  }
  return value
}

/**
 * Flatten filter object into dot-notation query params compatible with nestjs-paginate.
 *
 * Examples:
 * { createdAt: { $gte: 123, $lte: 456 } }  → filter.createdAt=$gte:123&filter.createdAt=$lte:456
 * { toys: { name: ['Mouse','Ball'] } }      → filter.toys.name=$in:Mouse,Ball
 */
function flattenFilter(
  obj: FilterObject,
  prefix = 'filter',
  parts: string[] = []
) {
  for (const key in obj) {
    const val = obj[key]
    if (Array.isArray(val)) {
      parts.push(`${prefix}.${key}=$in:${val.map(normalizeValue).join(',')}`)
    } else if (val && typeof val === 'object' && !(val instanceof Date)) {
      const entries = Object.entries(val)
      const allOperators = entries.every(([k]) => k.startsWith('$'))

      if (allOperators) {
        for (const [op, opVal] of entries) {
          if (Array.isArray(opVal)) {
            parts.push(
              `${prefix}.${key}=${op}:${opVal.map(normalizeValue).join(',')}`
            )
          } else {
            parts.push(`${prefix}.${key}=${op}:${normalizeValue(opVal)}`)
          }
        }
      } else {
        flattenFilter(val as FilterObject, `${prefix}.${key}`, parts)
      }
    } else {
      parts.push(`${prefix}.${key}=${normalizeValue(val)}`)
    }
  }
  return parts
}

const KNOWN_PARAMS = [
  'limit',
  'page',
  'cursor',
  'sortBy',
  'search',
  'select',
  'withDeleted',
  'with',
  'filter',
] as const

export interface PaginateQueryParams {
  limit?: number
  page?: number
  cursor?: string
  sortBy?: string
  search?: string
  select?: string[]
  withDeleted?: boolean
  with?: string[]
  filter?: FilterObject
  [key: string]: any
}

export function buildPaginateQuery(params: PaginateQueryParams): string {
  const cleaned = cleanObject(params)
  const parts: string[] = []

  if (cleaned.limit !== undefined) parts.push(`limit=${cleaned.limit}`)
  if (cleaned.page !== undefined) parts.push(`page=${cleaned.page}`)
  if (cleaned.cursor) parts.push(`cursor=${cleaned.cursor}`)
  if (cleaned.sortBy) parts.push(`sortBy=${cleaned.sortBy}`)
  if (cleaned.search) parts.push(`search=${cleaned.search}`)
  if (cleaned.select) parts.push(`select=${cleaned.select.join(',')}`)
  if (cleaned.withDeleted !== undefined)
    parts.push(`withDeleted=${cleaned.withDeleted}`)
  if (cleaned.with) parts.push(`with=${cleaned.with.join(',')}`)

  if (cleaned.filter) flattenFilter(cleaned.filter, 'filter', parts)

  // Extra fields
  for (const key in cleaned) {
    if (!KNOWN_PARAMS.includes(key as any)) {
      const value = cleaned[key]
      if (Array.isArray(value)) parts.push(`${key}=${value.join(',')}`)
      else if (typeof value === 'object') continue
      else parts.push(`${key}=${encodeURIComponent(String(value))}`)
    }
  }

  return parts.join('&')
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// interface FilterObject {
//   [key: string]: string | number | boolean | FilterObject | (string | number)[]
// }

// /**
//  * Recursively remove empty values (null, undefined, '', [])
//  */
// function cleanObject<T extends Record<string, any>>(obj: T): T {
//   if (!obj || typeof obj !== 'object') return obj
//   const cleaned: Record<string, any> = {}
//   for (const [k, v] of Object.entries(obj)) {
//     if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0))
//       continue
//     if (typeof v === 'object' && !Array.isArray(v)) {
//       const nested = cleanObject(v)
//       if (Object.keys(nested).length > 0) cleaned[k] = nested
//     } else {
//       cleaned[k] = v
//     }
//   }
//   return cleaned as T
// }

// /**
//  * Flatten filter object for nestjs-paginate
//  */
// function flattenFilter(
//   obj: FilterObject,
//   prefix = 'filter',
//   parts: string[] = []
// ) {
//   for (const key in obj) {
//     const val = obj[key]

//     if (Array.isArray(val)) {
//       // Array → $in operator
//       parts.push(`${prefix}.${key}=$in:${val.join(',')}`)
//     } else if (val && typeof val === 'object') {
//       const entries = Object.entries(val)
//       const allOperators = entries.every(([k]) => k.startsWith('$'))

//       if (allOperators) {
//         for (const [op, opVal] of entries) {
//           if (Array.isArray(opVal)) {
//             parts.push(`${prefix}.${key}=${op}:${opVal.join(',')}`)
//           } else {
//             parts.push(`${prefix}.${key}=${opVal}`)
//           }
//         }
//       } else {
//         flattenFilter(val as FilterObject, `${prefix}.${key}`, parts)
//       }
//     } else {
//       parts.push(`${prefix}.${key}=${val}`)
//     }
//   }
//   return parts
// }

// const KNOWN_PARAMS = [
//   'limit',
//   'page',
//   'cursor',
//   'sortBy',
//   'search',
//   'select',
//   'withDeleted',
//   'with',
//   'filter',
// ] as const

// export interface PaginateQueryParams {
//   limit?: number
//   page?: number
//   cursor?: string
//   sortBy?: string
//   search?: string
//   select?: string[]
//   withDeleted?: boolean
//   with?: string[]
//   filter?: FilterObject
//   [key: string]: any
// }

// export function buildPaginateQuery(params: PaginateQueryParams): string {
//   const cleaned = cleanObject(params)
//   const parts: string[] = []

//   if (cleaned.limit !== undefined) parts.push(`limit=${cleaned.limit}`)
//   if (cleaned.page !== undefined) parts.push(`page=${cleaned.page}`)
//   if (cleaned.cursor) parts.push(`cursor=${cleaned.cursor}`)
//   if (cleaned.sortBy) parts.push(`sortBy=${cleaned.sortBy}`)
//   if (cleaned.search) parts.push(`search=${cleaned.search}`)
//   if (cleaned.select) parts.push(`select=${cleaned.select.join(',')}`)
//   if (cleaned.withDeleted !== undefined)
//     parts.push(`withDeleted=${cleaned.withDeleted}`)
//   if (cleaned.with) parts.push(`with=${cleaned.with.join(',')}`)

//   if (cleaned.filter) flattenFilter(cleaned.filter, 'filter', parts)

//   // Extra fields
//   for (const key in cleaned) {
//     if (!KNOWN_PARAMS.includes(key as any)) {
//       const value = cleaned[key]
//       if (Array.isArray(value)) parts.push(`${key}=${value.join(',')}`)
//       else if (typeof value === 'object') continue
//       else parts.push(`${key}=${encodeURIComponent(String(value))}`)
//     }
//   }

//   return parts.join('&')
// }
