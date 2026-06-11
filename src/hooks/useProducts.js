import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadProducts() {
      setLoading(true)
      setError('')

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')

      if (!isActive) return

      if (fetchError) {
        setError(fetchError.message)
        setProducts([])
      } else {
        setProducts(data ?? [])
      }

      setLoading(false)
    }

    loadProducts()

    return () => {
      isActive = false
    }
  }, [])

  return { products, loading, error }
}
