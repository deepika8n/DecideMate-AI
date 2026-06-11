import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function AIAdvisor() {

  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*')
    if (data) setProducts(data)
  }

  // ---------------------------
  // INTENT EXTRACTION
  // ---------------------------
  function extractBudget(text) {
    const match = text.match(/under\s*(\d+)/i)
    const match2 = text.match(/below\s*(\d+)/i)
    const match3 = text.match(/budget\s*(\d+)/i)
    return match?.[1] || match2?.[1] || match3?.[1] || null
  }

  function detectCategory(text) {
    text = text.toLowerCase()

    if (text.includes('iphone') || text.includes('mobile') || text.includes('phone'))
      return 'smartphone'

    if (text.includes('camera'))
      return 'camera'

    if (text.includes('laptop'))
      return 'laptop'

    if (text.includes('headphone'))
      return 'audio'

    return null
  }

  function findBestProduct() {

    const raw = query.toLowerCase()
    const budget = extractBudget(raw)
    const category = detectCategory(raw)

    let filtered = products.filter(p => {

      const priceOK = budget ? p.price <= Number(budget) : true

      const textMatch =
        p.name.toLowerCase().includes(raw) ||
        p.description?.toLowerCase().includes(raw)

      const categoryMatch =
        category ? p.category?.toLowerCase().includes(category) : true

      return priceOK && (textMatch || categoryMatch)
    })

    if (filtered.length === 0) {
      setResult(null)
      alert("No matching product found")
      return
    }

    let scored = filtered.map(p => {

      let score = 0

      const text =
        `${p.name} ${p.category} ${p.description}`.toLowerCase()

      if (text.includes(raw)) score += 5

      score += (p.rating || 0) * 2

      score += (100000 - (p.price || 0)) / 100000

      return { ...p, score }
    })

    scored.sort((a, b) => b.score - a.score)

    setResult(scored[0])
  }

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>

      <h1>🧠 AI Product Advisor</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. mobile under 10000"
        style={{
          width: '350px',
          padding: '12px',
          borderRadius: '10px'
        }}
      />

      <br /><br />

      <button
        onClick={findBestProduct}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          background: 'linear-gradient(90deg,#4f46e5,#06b6d4)',
          color: 'white',
          border: 'none'
        }}
      >
        Ask AI
      </button>

      {result && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            background: '#f0fdf4',
            borderRadius: '12px',
            display: 'inline-block',
            textAlign: 'left',
            maxWidth: '500px'
          }}
        >

          <h2>🏆 Recommended Product</h2>

          <img
            src={result.image}
            alt={result.name}
            style={{ width: '250px', borderRadius: '10px' }}
          />

          <h3>{result.name}</h3>

          <p>₹ {result.price}</p>
          <p>⭐ {result.rating}</p>
          <p>{result.feature}</p>

          <p>{result.description}</p>

          <p style={{ fontWeight: 'bold' }}>
            Why this product?
          </p>

          <ul>
            <li>Matches your intent</li>
            <li>Within budget</li>
            <li>Best available match</li>
          </ul>

        </div>
      )}

    </div>
  )
}

export default AIAdvisor