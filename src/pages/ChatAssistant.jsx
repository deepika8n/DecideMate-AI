import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function ChatAssistant() {

  const [products, setProducts] = useState([])
  const [input, setInput] = useState('')
  const [response, setResponse] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {

    const { data, error } = await supabase
      .from('products')
      .select('*')

    if (error) {
      console.log(error)
    } else {
      setProducts(data)
    }
  }

  function getRecommendation() {

    const q = input.toLowerCase().trim()
    if (!q) return

    let scored = products.map((p) => {

      const text =
        `${p.name} ${p.category} ${p.description}`.toLowerCase()

      let score = 0

      // intent match
      if (text.includes(q)) score += 6

      // word matching
      q.split(' ').forEach(word => {
        if (word && text.includes(word)) score += 2
      })

      // rating boost
      score += (p.rating || 0) * 1.5

      // price balance
      score += (100000 - (p.price || 0)) / 90000

      return { ...p, score }
    })

    scored.sort((a, b) => b.score - a.score)

    const best = scored[0]

    setResponse({
      product: best,
      explanation: generateExplanation(best)
    })
  }

  function generateExplanation(product) {

    return `
I recommend ${product.name} because it matches your requirement.

• Category fit: ${product.category}
• Good rating: ${product.rating}
• Value for money based on price ₹${product.price}
• Description match: ${product.description}
    `
  }

  return (
    <div style={{ padding: '30px' }}>

      <h1 style={{ textAlign: 'center' }}>
        💬 AI Shopping Assistant
      </h1>

      <div style={{ textAlign: 'center' }}>

        <input
          type="text"
          value={input}
          placeholder="e.g. I need a phone for photography under 50000"
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: '350px',
            padding: '12px',
            borderRadius: '10px'
          }}
        />

        <br /><br />

        <button
          onClick={getRecommendation}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            background: 'linear-gradient(90deg, #4f46e5, #06b6d4)',
            color: 'white',
            border: 'none'
          }}
        >
          Ask AI
        </button>

      </div>

      {response && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#f0fdf4',
            borderRadius: '12px'
          }}
        >

          <h2>🏆 Recommendation</h2>

          <img
            src={response.product.image}
            alt={response.product.name}
            style={{
              width: '250px',
              borderRadius: '10px'
            }}
          />

          <h3>{response.product.name}</h3>

          <p>₹ {response.product.price}</p>
          <p>⭐ {response.product.rating}</p>

          <p>{response.product.feature}</p>

          <h4>🧠 Why this product?</h4>

          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {response.explanation}
          </pre>

        </div>
      )}

    </div>
  )
}

export default ChatAssistant