import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function ProductSearch() {

  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

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

  function handleSelect(e) {

    const productId = Number(e.target.value)

    const product = products.find(
      (item) => item.id === productId
    )

    setSelectedProduct(product)
  }

  return (
    <div
      style={{
        padding: '30px',
        textAlign: 'center'
      }}
    >

      <h1>Product Search</h1>

      <select
        onChange={handleSelect}
        style={{
          width: '300px',
          padding: '12px',
          fontSize: '18px',
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

      {selectedProduct && (

        <div
          style={{
            margin: 'auto',
            width: '400px',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >

          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            title={selectedProduct.feature}
            style={{
              width: '350px',
              height: '350px',
              objectFit: 'cover',
              borderRadius: '10px'
            }}
          />

          <h2>{selectedProduct.name}</h2>

          <h3>₹ {selectedProduct.price}</h3>

          <p>
            <strong>Brand:</strong> {selectedProduct.brand}
          </p>

          <p>
            <strong>Rating:</strong> {selectedProduct.rating}
          </p>

          <p>
            <strong>Feature:</strong> {selectedProduct.feature}
          </p>

        </div>

      )}

    </div>
  )
}

export default ProductSearch