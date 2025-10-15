"use client"

import { motion } from "framer-motion"
import { Sparkles, ListChecks, Bookmark, ArrowRight, Zap } from "lucide-react"

const items = [
  {
    title: "AI Recipe Generator",
    desc: "Generate unique, personalized recipes instantly with the power of artificial intelligence.",
    Icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
    stats: "10K+ recipes"
  },
  {
    title: "Smart Ingredient Detection",
    desc: "Simply enter what you have, and watch as we match you with perfect dishes.",
    Icon: ListChecks,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    stats: "500+ ingredients"
  },
  {
    title: "Save Favorites",
    desc: "Bookmark your favorite recipes and share culinary discoveries with friends.",
    Icon: Bookmark,
    color: "from-orange-500 to-amber-500",
    bgColor: "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
    stats: "Unlimited saves"
  },
]

export function Features() {
  return (
    <section id="about" className="relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/20 dark:bg-orange-800/10 rounded-full blur-3xl" />
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
            <Zap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-900 dark:text-orange-200">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Why Choose SmartChef?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cooking inspiration powered by AI, served with speed and simplicity
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {items.map(({ title, desc, Icon, color, bgColor, stats }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative h-full"
              >
                {/* Main Card */}
                <div className={`relative rounded-3xl bg-gradient-to-br ${bgColor} p-8 h-full border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated background blob */}
                  <motion.div
                    className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-xl mb-6 group-hover:shadow-2xl transition-shadow duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" aria-hidden />
                      <span className="sr-only">{title} icon</span>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                      {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {desc}
                    </p>

                    {/* Stats badge */}
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${color} bg-opacity-10`}>
                        <span className={`text-sm font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                          {stats}
                        </span>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <ArrowRight className={`w-5 h-5 bg-gradient-to-r ${color} bg-clip-text text-transparent`} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom decorative line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white font-semibold"
                  >
                    {i}K
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Join 5,000+ happy cooks</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Start cooking smarter today</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}