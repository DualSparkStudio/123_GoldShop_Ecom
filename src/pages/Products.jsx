import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search, X, Sparkles, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import { categories, types } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'

const Products = () => {
  const { products } = useProducts()
  const [searchParams] = useSearchParams()
  
  // Get initial values from URL parameters
  const urlCategory = searchParams.get('category') || 'all'
  const urlType = searchParams.get('type') || 'all'
  
  const [selectedCategory, setSelectedCategory] = useState(urlCategory)
  const [selectedType, setSelectedType] = useState(urlType)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  
  // Update filters when URL parameters change
  useEffect(() => {
    setSelectedCategory(urlCategory)
    setSelectedType(urlType)
    setCurrentPage(1)
  }, [urlCategory, urlType])

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesType = selectedType === 'all' || product.type === selectedType
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchesPrice = true
    if (priceRange === 'under500') matchesPrice = product.price < 500
    else if (priceRange === '500-1000') matchesPrice = product.price >= 500 && product.price < 1000
    else if (priceRange === '1000-2000') matchesPrice = product.price >= 1000 && product.price < 2000
    else if (priceRange === 'over2000') matchesPrice = product.price >= 2000

    return matchesCategory && matchesType && matchesSearch && matchesPrice
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'featured':
        return b.featured - a.featured
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedType('all')
    setSearchQuery('')
    setPriceRange('all')
    setSortBy('featured')
    setCurrentPage(1)
  }

  const handleFilterChange = (setter) => (value) => {
    setter(value)
    setCurrentPage(1)
  }

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedType !== 'all',
    priceRange !== 'all',
    searchQuery !== ''
  ].filter(Boolean).length

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span className="text-gold-700 text-sm font-semibold uppercase tracking-wider">Complete Collection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            <span className="luxury-text">All Products</span>
          </h1>
        </motion.div>

        {/* Search & View Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for your perfect piece..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 placeholder-slate-400 shadow-lg focus:shadow-xl transition-all outline-none text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-lg border-2 border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gold-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'list'
                    ? 'bg-gold-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full glass rounded-2xl p-4 flex items-center justify-between text-slate-800 font-semibold hover:bg-white transition-all shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </div>
            {activeFiltersCount > 0 && (
              <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="glass rounded-3xl p-6 sticky top-24 space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-2 rounded-lg">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-bold text-xl text-slate-800">Filters</h2>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-slate-600 hover:text-gold-600 text-sm font-semibold transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFilterChange(setSelectedCategory)(category.id)}
                      className={`w-full text-left px-5 py-3 rounded-xl transition-all font-semibold ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/30'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200'
                      }`}
                    >
                      <span className="mr-2 text-lg">{category.icon}</span>
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => handleFilterChange(setSelectedType)(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-800 focus:border-gold-500 transition-all outline-none font-semibold"
                >
                  {types.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => handleFilterChange(setPriceRange)(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-800 focus:border-gold-500 transition-all outline-none font-semibold"
                >
                  <option value="all">All Prices</option>
                  <option value="under500">Under ₹500</option>
                  <option value="500-1000">₹500 - ₹1,000</option>
                  <option value="1000-2000">₹1,000 - ₹2,000</option>
                  <option value="over2000">Over ₹2,000</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => handleFilterChange(setSortBy)(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-800 focus:border-gold-500 transition-all outline-none font-semibold"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Active Filters Summary */}
              {activeFiltersCount > 0 && (
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600 mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'all' && (
                      <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-xs font-semibold">
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </span>
                    )}
                    {selectedType !== 'all' && (
                      <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-xs font-semibold">
                        {types.find(t => t.id === selectedType)?.name}
                      </span>
                    )}
                    {priceRange !== 'all' && (
                      <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-xs font-semibold">
                        {priceRange === 'under500' && 'Under ₹500'}
                        {priceRange === '500-1000' && '₹500-₹1,000'}
                        {priceRange === '1000-2000' && '₹1,000-₹2,000'}
                        {priceRange === 'over2000' && 'Over ₹2,000'}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-slate-600">
                Showing <span className="font-bold text-gold-600 text-xl">{sortedProducts.length}</span> of {products.length} products
              </p>
              <div className="flex items-center space-x-2 text-slate-600 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>All items in stock</span>
              </div>
            </div>

            {/* Products Display */}
            {currentProducts.length > 0 ? (
              <>
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8'
                    : 'space-y-6'
                }>
                  {currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {viewMode === 'grid' ? (
                      <ProductCard product={product} />
                    ) : (
                      <div className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-gold-300 hover:shadow-xl transition-all">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-64 h-64 sm:h-auto">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    product.category === 'gold'
                                      ? 'bg-gold-100 text-gold-700'
                                      : 'bg-slate-200 text-slate-700'
                                  }`}>
                                    {product.category.toUpperCase()}
                                  </span>
                                  {product.featured && (
                                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                      FEATURED
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                  {product.name}
                                </h3>
                                <p className="text-slate-600 text-sm mb-3">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-3xl font-bold text-gold-600 mb-1">
                                  ₹{product.price.toLocaleString()}
                                </p>
                                <p className="text-sm text-slate-600">
                                  {product.purity} • {product.weight}
                                </p>
                              </div>
                              <button className="btn-primary">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === 1
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-slate-700 hover:bg-gold-500 hover:text-white border-2 border-slate-200'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex space-x-2">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                              currentPage === pageNumber
                                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg'
                                : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        )
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return <span key={pageNumber} className="px-2 text-slate-400">...</span>
                      }
                      return null
                    })}
                  </div>

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === totalPages
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-slate-700 hover:bg-gold-500 hover:text-white border-2 border-slate-200'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="glass rounded-3xl p-12 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">No Products Found</h3>
                  <p className="text-slate-600 mb-6">
                    We couldn't find any products matching your criteria.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
