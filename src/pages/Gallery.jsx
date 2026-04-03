import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      title: 'Gold Necklace Collection',
      category: 'necklaces',
      description: 'Exquisite handcrafted gold necklaces'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      title: 'Diamond Rings',
      category: 'rings',
      description: 'Stunning diamond engagement rings'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      title: 'Gold Earrings',
      category: 'earrings',
      description: 'Classic gold earrings with pearl drops'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      title: 'Gold Bangles Set',
      category: 'bangles',
      description: 'Traditional gold bangles with intricate patterns'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
      title: 'Bridal Jewelry',
      category: 'bridal',
      description: 'Complete bridal jewelry collection'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80',
      title: 'Silver Rings',
      category: 'rings',
      description: 'Sterling silver rings collection'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80',
      title: 'Silver Anklets',
      category: 'anklets',
      description: 'Delicate silver anklets with bells'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
      title: 'Gold Chains',
      category: 'chains',
      description: 'Premium gold chains collection'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
      title: 'Pendant Sets',
      category: 'pendants',
      description: 'Beautiful pendant sets'
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
      title: 'Gemstone Jewelry',
      category: 'gemstones',
      description: 'Precious gemstone jewelry'
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80',
      title: 'Wedding Bands',
      category: 'rings',
      description: 'Elegant wedding bands'
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
      title: 'Luxury Collection',
      category: 'bridal',
      description: 'Premium luxury jewelry pieces'
    },
  ]

  const categories = [
    { id: 'all', name: 'All', icon: '✨' },
    { id: 'necklaces', name: 'Necklaces', icon: '📿' },
    { id: 'rings', name: 'Rings', icon: '💍' },
    { id: 'earrings', name: 'Earrings', icon: '👂' },
    { id: 'bangles', name: 'Bangles', icon: '⭕' },
    { id: 'bridal', name: 'Bridal', icon: '👰' },
    { id: 'chains', name: 'Chains', icon: '🔗' },
    { id: 'pendants', name: 'Pendants', icon: '💎' },
    { id: 'anklets', name: 'Anklets', icon: '🦶' },
    { id: 'gemstones', name: 'Gemstones', icon: '💠' },
  ]

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (image) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    let newIndex
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    }
    
    setSelectedImage(filteredImages[newIndex])
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
            <ImageIcon className="w-4 h-4 text-gold-600" />
            <span className="text-gold-700 text-sm font-semibold uppercase tracking-wider">Visual Showcase</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            <span className="luxury-text">Gallery</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">
            Explore our stunning collection through beautiful imagery
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/30'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.description}</p>
                </div>
                
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="glass rounded-3xl p-12 max-w-md mx-auto">
              <ImageIcon className="w-20 h-20 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">No Images Found</h3>
              <p className="text-slate-600 mb-6">
                No images in this category yet.
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="btn-primary"
              >
                View All Images
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
            />

            {/* Lightbox Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage('prev')
                }}
                className="absolute left-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage('next')
                }}
                className="absolute right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-5xl w-full"
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                
                {/* Image Info */}
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedImage.title}
                  </h2>
                  <p className="text-white/70">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
