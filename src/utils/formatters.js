const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0)
}

export function productText(product) {
  return [
    product.name,
    product.brand,
    product.category,
    product.feature,
    product.description,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export function extractBudget(text) {
  const match = text.match(
    /\b(?:under|below|budget|within|less than)\s*(?:rs\.?|inr)?\s*([\d,]+)/i,
  )

  return match ? Number(match[1].replace(/,/g, '')) : null
}

export function detectCategory(text) {
  const lowerText = text.toLowerCase()

  if (
    lowerText.includes('iphone') ||
    lowerText.includes('mobile') ||
    lowerText.includes('phone')
  ) {
    return 'smartphone'
  }

  if (lowerText.includes('camera')) return 'camera'
  if (lowerText.includes('laptop')) return 'laptop'
  if (lowerText.includes('headphone') || lowerText.includes('audio')) return 'audio'

  return ''
}

export function queryWords(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .filter(
      (word) =>
        ![
          'need',
          'want',
          'for',
          'with',
          'under',
          'below',
          'budget',
          'within',
          'than',
          'less',
          'the',
          'and',
        ].includes(word),
    )
}
