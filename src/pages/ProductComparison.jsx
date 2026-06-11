import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function ProductComparison() {

  const [products, setProducts] = useState([])
  const [product1, setProduct1] = useState('')
  const [product2, setProduct2] = useState('')

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

  const selected1 = products.find(
    (item) => item.id === Number(product1)
  )

  const selected2 = products.find(
    (item) => item.id === Number(product2)
  )

  return (
    <div
      style={{
        padding: '30px',
        textAlign: 'center'
      }}
    >

      <h1>Compare Products</h1>

      <select
        value={product1}
        onChange={(e) => setProduct1(e.target.value)}
        style={{
          width: '250px',
          padding: '12px',
          margin: '10px',
          borderRadius: '10px'
        }}
      >
        <option value="">Select Product 1</option>

        {products.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        value={product2}
        onChange={(e) => setProduct2(e.target.value)}
        style={{
          width: '250px',
          padding: '12px',
          margin: '10px',
          borderRadius: '10px'
        }}
      >
        <option value="">Select Product 2</option>

        {products.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <br /><br />

      {selected1 && selected2 && (

        <div>

          <table
            border="1"
            cellPadding="12"
            style={{
              margin: 'auto',
              borderCollapse: 'collapse',
              minWidth: '700px'
            }}
          >

            <thead>
              <tr>
                <th>Feature</th>
                <th>{selected1.name}</th>
                <th>{selected2.name}</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Brand</td>
                <td>{selected1.brand}</td>
                <td>{selected2.brand}</td>
              </tr>

              <tr>
                <td>Price</td>
                <td>₹{selected1.price}</td>
                <td>₹{selected2.price}</td>
              </tr>

              <tr>
                <td>Rating</td>
                <td>{selected1.rating}</td>
                <td>{selected2.rating}</td>
              </tr>

              <tr>
                <td>Feature</td>
                <td>{selected1.feature}</td>
                <td>{selected2.feature}</td>
              </tr>

            </tbody>

          </table>

          {/* AI Recommendation */}

          <div
            style={{
              marginTop: '25px',
              padding: '20px',
              backgroundColor: '#ecfdf5',
              borderRadius: '12px',
              border: '2px solid green',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >

            <h2>🏆 AI Recommendation</h2>

            <h3>
              Recommended Product:
              {' '}
              {
                selected1.price < selected2.price
                  ? selected1.name
                  : selected2.name
              }
            </h3>

            <p>
              {
                Math.abs(selected1.rating - selected2.rating) <= 0.3
                  ? 'Similar ratings but lower price makes it a better value.'
                  : 'Higher rating makes it the stronger choice.'
              }
            </p>

            <p>
              💰 Price Difference:
              ₹{Math.abs(selected1.price - selected2.price)}
            </p>

          </div>

          {/* Regret Predictor */}

          <div
            style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: '#fff7ed',
              borderRadius: '12px',
              border: '2px solid orange',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >

            <h2>⚠ Regret Predictor</h2>

            {
              Math.abs(selected1.price - selected2.price) > 10000 ? (
                <p>
                  You may regret buying the more expensive product because
                  the price difference is ₹
                  {Math.abs(selected1.price - selected2.price)}.
                </p>
              ) : (
                <p>
                  Price difference is small, so regret risk is low.
                </p>
              )
            }

            {
              Math.abs(selected1.rating - selected2.rating) < 0.3 && (
                <p>
                  Ratings are very similar, so paying much more may not
                  provide significant benefits.
                </p>
              )
            }

          </div>

        </div>

      )}

    </div>
  )
}

export default ProductComparison