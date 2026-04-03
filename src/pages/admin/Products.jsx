import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Search, X, Star } from 'lucide-react'
import { useProducts } from '../../context/ProductContext'

const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleFeatured, toggleStock, resetProducts } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'gold',
    type: 'necklace',
    price: '',
    weight: '',
    purity: '',
    description: '',
    image: '',
  })

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        category: product.category,
        type: product.type,
        price: product.price,
        weight: product.weight,
        purity: product.purity,
        description: product.description,
        image: product.image,
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        category: 'gold',
        type: 'necklace',
        price: '',
        weight: '',
        purity: '',
        description: '',
        image: '',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
    } else {
      addProduct(productData)
    }

    handleCloseModal()
  }

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold luxury-text mb-2">
            Products
          </h1>
          <p className="text-slate-600">Manage your jewelry collection ({products.length} items)</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (window.confirm('Reset to default 40 products? This will replace all current products.')) {
                resetProducts()
                alert('Products reset successfully! All 40 default products loaded.')
              }
            }}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
          >
            <span>Reset Products</span>
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all font-semibold"
          >
            <option value="all">All Categories</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Weight</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-slate-800">{product.name}</p>
                          {product.featured && (
                            <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{product.purity}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      product.category === 'gold'
                        ? 'bg-gold-100 text-gold-700'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {product.category.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gold-600">${product.price.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-700">{product.weight}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStock(product.id)}
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                        product.inStock
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => toggleFeatured(product.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          product.featured
                            ? 'bg-gold-100 text-gold-600 hover:bg-gold-200'
                            : 'hover:bg-slate-100 text-slate-400'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-5 h-5 ${product.featured ? 'fill-gold-600' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-bold text-slate-900">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
                        placeholder="Royal Gold Necklace"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
                      >
                        <option value="gold">Gold</option>
                        <option value="silver">Silver</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Type *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
                      >
                        <option value="necklace">Necklace</option>
                        <option value="ring">Ring</option>
                        <option value="earrings">Earrings</option>
                        <option value="bracelet">Bracelet</option>
                        <option value="bangles">Bangles</option>
                        <option value="pendant">Pendant</option>
                        <option value="anklet">Anklet</option>
                        <option value="chain">Chain</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
                        placeholder="2499"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Weight *
                      </label>
                      <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
                        placeholder="25g"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Purity *
                      </label>
                      <input
                        type="text"
                        name="purity"
                        value={formData.purity}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
                        placeholder="22K or 925 Sterling"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
                      placeholder="Exquisite handcrafted jewelry..."
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-6 py-3 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary"
                    >
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Products
