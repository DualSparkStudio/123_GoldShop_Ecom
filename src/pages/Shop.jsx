import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import { categories, types } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'

const Shop = () => {
  const { products } = useProducts()
  const [searchParams] = useSearchParams()
  
  // Get initial values from URL parameters
  const urlCategory = searchParams.get('category') || 'all'
  const urlType = searchParams.get('type') || 'all'
  
  const [selectedCategory, setSelectedCategory] = useState(urlCategory)
  const [selectedType, setSelectedType] = useState(urlType)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState('all')
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

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Reset to page 1 when filters change
  const handleFilterChange = (setter) => (value) => {
    setter(value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedType('all')
    setSearchQuery('')
    setPriceRange('all')
    setCurrentPage(1)
  }

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
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span className="text-gold-700 text-sm font-semibold uppercase tracking-wider">Premium Collection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            <span className="luxury-text">Our Collection</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">
            Explore our exquisite range of handcrafted gold and silver jewelry
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="relative max-w-2xl mx-auto">
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
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="lg:hidden mb-6" data-aos="fade-up" data-aos-delay="200">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full glass rounded-2xl p-4 flex items-center justify-center space-x-2 text-slate-800 font-semibold hover:bg-white transition-all shadow-lg"
          >
            <Filter className="w-5 h-5" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass rounded-3xl p-8 mb-12 ${showFilters ? 'block' : 'hidden lg:block'}`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-2 rounded-lg">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-xl text-slate-800">Filters</h2>
            </div>
            <button
              onClick={clearFilters}
              className="text-slate-600 hover:text-gold-600 text-sm font-semibold transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <option value="under500">Under $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="over2000">Over $2,000</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between" data-aos="fade-up" data-aos-delay="300">
          <p className="text-slate-600">
            Showing <span className="font-bold text-gold-600 text-xl">{filteredProducts.length}</span> products
          </p>
          <div className="flex items-center space-x-2 text-slate-600 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>All items in stock</span>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {currentProducts.map((product, index) => (
                <div
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2" data-aos="fade-up">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === 1
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-white text-slate-700 hover:bg-gold-500 hover:text-white border-2 border-slate-200'
                  }`}
                >
                  Previous
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
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
            data-aos="fade-up"
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
  )
}

export default Shop
