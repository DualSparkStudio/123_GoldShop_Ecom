import { createContext, useContext, useState, useEffect } from 'react'
import { products as initialProducts } from '../data/products'

const ProductContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider')
  }
  return context
}

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products')
    const savedProducts = saved ? JSON.parse(saved) : null
    
    // If no saved products or saved products count is less than initial products, use initial products
    if (!savedProducts || savedProducts.length < initialProducts.length) {
      localStorage.setItem('products', JSON.stringify(initialProducts))
      return initialProducts
    }
    
    return savedProducts
  })

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      inStock: true,
      featured: false,
    }
    setProducts(prev => [...prev, newProduct])
    return newProduct
  }

  const updateProduct = (productId, productData) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId ? { ...product, ...productData } : product
      )
    )
  }

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId))
  }

  const toggleFeatured = (productId) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, featured: !product.featured }
          : product
      )
    )
  }

  const toggleStock = (productId) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, inStock: !product.inStock }
          : product
      )
    )
  }

  const getProductById = (productId) => {
    return products.find(product => product.id === productId)
  }

  const resetProducts = () => {
    setProducts(initialProducts)
    localStorage.setItem('products', JSON.stringify(initialProducts))
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFeatured,
        toggleStock,
        getProductById,
        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
