"use client"

import { motion } from "framer-motion"
import { GoogleSignInButton } from "./google-signin-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChefHat, Sparkles, ArrowRight, Mail, Check } from "lucide-react"

const benefits = [
  "Unlimited AI recipe generation",
  "Save favorite recipes",
  "Share with friends",
  "No credit card required"
]

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-white to-orange-50 dark:from-gray-950 dark:to-orange-950/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-amber-300/30 dark:from-orange-800/20 dark:to-amber-800/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 dark:from-yellow-800/20 dark:to-orange-800/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Main CTA Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-white to-orange-50/50 dark:from-gray-900 dark:to-orange-950/20 border-2 border-orange-200 dark:border-orange-800 shadow-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl" aria-hidden="true" />
            
            {/* Animated sparkles */}
            <motion.div
              className="absolute top-8 right-8"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-12 h-12 text-orange-400 dark:text-orange-500 opacity-50" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-8"
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChefHat className="w-12 h-12 text-amber-400 dark:text-amber-500 opacity-50" />
            </motion.div>

            <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="max-w-3xl mx-auto text-center space-y-8">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 border border-orange-300 dark:border-orange-700"
                >
                  <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-semibold text-orange-900 dark:text-orange-200">
                    Join 5,000+ Home Chefs
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                    <span className="block text-gray-900 dark:text-white">
                      Ready to Transform
                    </span>
                    <span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                      Your Cooking?
                    </span>
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Start generating personalized recipes in seconds. No credit card required.
                  </p>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 gap-3 max-w-2xl mx-auto mb-8"
                >
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-2 text-left"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center gap-4"
                >
                  <GoogleSignInButton label="Get Started with Google" />
                  
                  <div className="flex items-center gap-3 w-full max-w-md">
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">or</span>
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full max-w-md"
                  >
                    <Button 
                      asChild 
                      variant="outline" 
                      size="lg" 
                      className="w-full h-14 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                     
                    </Button>
                  </motion.div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Free forever. Upgrade anytime for premium features.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>No Payment Info</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Cancel Anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}