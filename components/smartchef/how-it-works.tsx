"use client"

import { motion } from "framer-motion"
import { Utensils, ChefHat, Bookmark, ArrowRight, Sparkles } from "lucide-react"

const steps = [
  { 
    step: "01", 
    title: "Enter your ingredients", 
    description: "Tell us what's in your kitchen and we'll work our magic",
    Icon: Utensils,
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
  },
  { 
    step: "02", 
    title: "Generate recipes with AI", 
    description: "Our AI creates personalized recipes just for you",
    Icon: ChefHat,
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20"
  },
  { 
    step: "03", 
    title: "Save or share your favorites", 
    description: "Keep your best recipes and share with friends",
    Icon: Bookmark,
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20"
  },
]

export function HowItWorks() {
  return (
    <section id="recipes" className="relative overflow-hidden bg-gradient-to-b from-white to-orange-50/30 dark:from-gray-950 dark:to-orange-950/10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-orange-200/20 dark:bg-orange-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-amber-200/20 dark:bg-amber-800/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 border border-orange-200 dark:border-orange-800 mb-6">
            <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-900 dark:text-orange-200">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Three simple steps to transform your ingredients into delicious meals
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-amber-200 to-yellow-200 dark:from-orange-800 dark:via-amber-800 dark:to-yellow-800 opacity-30" />
          </div>

          <div className="grid gap-8 md:gap-6 lg:gap-8 md:grid-cols-3 relative">
            {steps.map(({ step, title, description, Icon, color, bgColor }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full"
                >
                  {/* Card */}
                  <div className={`relative rounded-2xl bg-gradient-to-br ${bgColor} p-8 h-full border border-orange-100 dark:border-orange-900/30 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group`}>
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      {/* Step number */}
                      <div className="flex items-center justify-between mb-6">
                        <span className={`text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                          {step}
                        </span>
                        {i < steps.length - 1 && (
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="hidden lg:block"
                          >
                            <ArrowRight className="w-6 h-6 text-orange-400 dark:text-orange-500" />
                          </motion.div>
                        )}
                      </div>

                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg mb-6`}
                      >
                        <Icon className="h-8 w-8 text-white" aria-hidden />
                        <span className="sr-only">{title} icon</span>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {description}
                      </p>

                      {/* Decorative element */}
                      <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`} aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>

                {/* Mobile arrow */}
                {i < steps.length - 1 && (
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="lg:hidden flex justify-center my-4"
                  >
                    <ArrowRight className="w-6 h-6 text-orange-400 dark:text-orange-500 rotate-90" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to start cooking smarter?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}