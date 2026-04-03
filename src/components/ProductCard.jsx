import { motion } from 'framer-motion'
import { ShoppingCart, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-gold-300 hover:shadow-xl transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                FEATURED
              </span>
            )}
            {product.category === 'gold' && (
              <span className="bg-gold-600 text-white px-2 py-1 rounded text-xs font-bold">
                GOLD
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleWishlist}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
            >
              <Heart 
                className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} 
              />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gold-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Quick View Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-full bg-white text-slate-900 py-2 rounded font-semibold hover:bg-gold-600 hover:text-white transition-colors">
              Quick View
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Category & Purity */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">
              {product.type}
            </span>
            <span className="text-xs font-bold text-gold-600">
              {product.purity}
            </span>
          </div>
          
          {/* Product Name */}
          <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors min-h-[3rem]">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-slate-900">
                ${product.price.toLocaleString()}
              </span>
              <p className="text-xs text-slate-500">{product.weight}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default ProductCard
