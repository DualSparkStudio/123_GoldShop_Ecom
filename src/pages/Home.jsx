import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Award, Shield, Truck, RefreshCw, ChevronRight } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const Home = () => {
  const { products } = useProducts()
  const featuredProducts = products.filter(p => p.featured).slice(0, 8)
  const goldProducts = products.filter(p => p.category === 'gold').slice(0, 4)
  const silverProducts = products.filter(p => p.category === 'silver').slice(0, 4)

  const heroSlides = [
    {
      title: 'Exquisite Gold & Silver Jewelry',
      subtitle: 'Discover our exclusive collection of handcrafted jewelry. Premium quality, timeless designs.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80',
      cta: 'Shop Now',
      link: '/shop'
    },
    {
      title: 'Bridal Collection 2024',
      subtitle: 'Make your special day unforgettable with our stunning bridal jewelry collection.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80',
      cta: 'Explore Collection',
      link: '/shop?featured=true'
    },
    {
      title: 'Premium Gold Jewelry',
      subtitle: 'Crafted with 22K & 18K gold. BIS hallmarked for guaranteed purity and quality.',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80',
      cta: 'View Gold Collection',
      link: '/shop?category=gold'
    },
    {
      title: 'Sterling Silver Elegance',
      subtitle: 'Beautiful 925 sterling silver jewelry for every occasion. Timeless and affordable.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80',
      cta: 'View Silver Collection',
      link: '/shop?category=silver'
    }
  ]

  const categories = [
    {
      name: 'Gold Necklaces',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
      link: '/shop?type=necklace&category=gold'
    },
    {
      name: 'Gold Rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      link: '/shop?type=ring&category=gold'
    },
    {
      name: 'Gold Earrings',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      link: '/shop?type=earrings&category=gold'
    },
    {
      name: 'Gold Bangles',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      link: '/shop?type=bangles&category=gold'
    },
    {
      name: 'Silver Jewelry',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      link: '/shop?category=silver'
    },
    {
      name: 'Bridal Collection',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      link: '/shop?featured=true'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Carousel */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full hero-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl"
                  >
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 md:mb-6 text-white drop-shadow-lg"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90 drop-shadow"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <Link 
                        to={slide.link}
                        className="inline-flex items-center space-x-2 bg-gold-600 hover:bg-gold-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                      >
                        <span>{slide.cta}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-slate-900">
              Shop by Category
            </h2>
            <p className="text-slate-600">Explore our exclusive jewelry collections</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="relative overflow-hidden rounded-lg aspect-square mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                <h3 className="text-center font-semibold text-slate-900 group-hover:text-gold-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-slate-900">
                Featured Products
              </h2>
              <p className="text-slate-600">Handpicked selections from our collection</p>
            </div>
            <Link 
              to="/shop" 
              className="hidden md:flex items-center space-x-2 text-gold-600 hover:text-gold-700 font-semibold"
            >
              <span>View All</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} data-aos="fade-up" data-aos-delay={index * 50}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link 
              to="/shop" 
              className="inline-flex items-center space-x-2 text-gold-600 hover:text-gold-700 font-semibold"
            >
              <span>View All Products</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gold Collection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-slate-900">
                Gold Collection
              </h2>
              <p className="text-slate-600">Premium 22K & 18K gold jewelry</p>
            </div>
            <Link 
              to="/shop?category=gold" 
              className="hidden md:flex items-center space-x-2 text-gold-600 hover:text-gold-700 font-semibold"
            >
              <span>View All</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {goldProducts.map((product, index) => (
              <div key={product.id} data-aos="fade-up" data-aos-delay={index * 50}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Silver Collection */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-slate-900">
                Silver Collection
              </h2>
              <p className="text-slate-600">925 Sterling silver jewelry</p>
            </div>
            <Link 
              to="/shop?category=silver" 
              className="hidden md:flex items-center space-x-2 text-gold-600 hover:text-gold-700 font-semibold"
            >
              <span>View All</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {silverProducts.map((product, index) => (
              <div key={product.id} data-aos="fade-up" data-aos-delay={index * 50}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-slate-900">
              Why Choose Us
            </h2>
            <p className="text-slate-600">Your trusted jewelry partner since 1970</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'BIS Hallmarked',
                description: 'Certified quality gold & silver',
              },
              {
                icon: Shield,
                title: 'Lifetime Exchange',
                description: 'Exchange anytime, anywhere',
              },
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'On orders above $500',
              },
              {
                icon: RefreshCw,
                title: 'Easy Returns',
                description: '30-day return policy',
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-gold-600 to-gold-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Book Your Favorite Jewelry Today
          </h2>
          <p className="text-xl mb-8 text-gold-50 max-w-2xl mx-auto">
            Reserve online and visit our store for a personalized experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center space-x-2 bg-white text-gold-600 hover:bg-gold-50 px-8 py-4 rounded-md font-semibold transition-colors"
            >
              <span>Browse Collection</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gold-600 px-8 py-4 rounded-md font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
