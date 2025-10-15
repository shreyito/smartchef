"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChefHat, Sparkles, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" aria-label="SmartChef Hero">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-orange-950/20 dark:to-amber-950/20" aria-hidden="true" />
      
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-15 dark:opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/top-down-view-of-fresh-ingredients-on-a-kitchen-co.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)"
        }}
      />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -right-48 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 border border-orange-200 dark:border-orange-800"
            >
              <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-900 dark:text-orange-200">
                AI-Powered Recipe Generation
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-gray-900 dark:text-white">
                  Cook Smarter,
                </span>
                <span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                  Not Harder
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                Transform your ingredients into delicious meals with AI-powered recipes tailored just for you.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white border-0 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link href="/login" aria-label="Get Started" className="flex items-center justify-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  <span>Start Cooking</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 px-8 py-6 text-lg font-semibold backdrop-blur-sm bg-white/50 dark:bg-gray-950/50 transition-all duration-300"
              >
                <Link href="/#about" aria-label="Learn more" className="flex items-center justify-center gap-2">
                  <span>Learn More</span>
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-8 pt-4"
            >
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Recipes Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">5K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Cooks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">User Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-400 rounded-3xl blur-2xl opacity-30" aria-hidden="true" />
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Recipe Generator</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI Powered</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Available Ingredients</div>
                    <div className="flex flex-wrap gap-2">
                      {['🥚 Eggs', '🧀 Cheese', '🍞 Bread', '🥬 Spinach'].map((ingredient, i) => (
                        <motion.span
                          key={ingredient}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="px-3 py-1 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700"
                        >
                          {ingredient}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl border border-orange-200 dark:border-orange-800"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Generated Recipe</div>
                    </div>
                    <div className="text-lg font-bold text-orange-900 dark:text-orange-200">
                      Classic French Omelette
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Ready in 15 minutes
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}