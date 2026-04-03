import { motion } from 'framer-motion'
import { Award, Users, Heart, Sparkles } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Every piece is crafted with meticulous attention to detail and certified for authenticity.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide personalized service and lifetime support.',
    },
    {
      icon: Heart,
      title: 'Ethical Sourcing',
      description: 'We source our materials responsibly, ensuring fair trade and sustainable practices.',
    },
    {
      icon: Sparkles,
      title: 'Timeless Design',
      description: 'Our designs blend traditional craftsmanship with contemporary aesthetics.',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80"
            alt="About"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 md:mb-4">
            Our Story
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-200">
            Crafting excellence since 1970
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed mb-4 md:mb-6 text-justify">
              For over five decades, Luxe Gold & Silver has been synonymous with exceptional 
              craftsmanship and timeless elegance. What began as a small family workshop has 
              grown into a trusted name in fine jewelry, serving generations of customers who 
              value quality and authenticity.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed mb-4 md:mb-6 text-justify">
              Our master craftsmen bring together traditional techniques passed down through 
              generations with modern design sensibilities. Each piece tells a story, whether 
              it's a wedding band symbolizing eternal love, a necklace celebrating a milestone, 
              or earrings that add sparkle to everyday moments.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed text-justify">
              We believe jewelry is more than adornment—it's an expression of identity, a 
              keeper of memories, and a legacy to be treasured. That's why we're committed to 
              creating pieces that not only meet the highest standards of quality but also 
              resonate with your personal story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3 md:mb-4">Our Values</h2>
            <p className="text-slate-600 text-sm md:text-base lg:text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gold-100 rounded-full mb-4 md:mb-6">
                  <value.icon className="w-8 h-8 md:w-10 md:h-10 text-gold-600" />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm md:text-base">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Years of Excellence' },
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Unique Designs' },
              { number: '100%', label: 'Certified Quality' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-gold-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
