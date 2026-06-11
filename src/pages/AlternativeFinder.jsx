import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function AlternativeFinder() {

  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [alternatives, setAlternatives] = useState([])

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

  function findAlternatives(productId) {

    setSelectedProduct(productId)

    const selected = products.find(
      (item) => item.id === Number(productId)
    )

    if (!selected) return

    const similarProducts = products.filter(
      (item) =>
        item.category === selected.category &&
        item.id !== selected.id
    )

    setAlternatives(similarProducts)
  }

  return (
    <div
      style={{
        padding: '30px',
        textAlign: 'center'
      }}
    >

      <h1>Alternative Finder</h1>

      <select
        onChange={(e) => findAlternatives(e.target.value)}
        style={{
          width: '300px',
          padding: '12px',
          borderRadius: '10px'
        }}
      >
        <option value="">
          Select Product
        </option>

        {products.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <br /><br />

      {alternatives.length > 0 && (

        <div>

          <h2>Recommended Alternatives</h2>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}
          >

            {alternatives.map((item) => (

              <div
                key={item.id}
                style={{
                  width: '250px',
                  padding: '15px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />

                <h3>{item.name}</h3>

                <p>₹ {item.price}</p>

                <p>⭐ {item.rating}</p>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  )
}

export default AlternativeFinder