"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GoogleSignInButton } from "@/components/smartchef/google-signin-button"
import { Mail, ChefHat, Sparkles, ArrowRight, Lock, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const features = [
  "Unlimited AI recipes",
  "Save favorites",
  "Share with friends"
]

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-orange-950/20 dark:to-amber-950/20">
      {/* Animated background orbs */}
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

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Branding & Features */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block space-y-8 pr-12"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl"
            >
              <ChefHat className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <span className="font-bold text-3xl bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                SmartChef
              </span>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                <span className="text-xs font-medium text-orange-900 dark:text-orange-200">
                  AI-Powered Cooking
                </span>
              </div>
            </div>
          </Link>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white">
                Welcome Back
              </span>
              <span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                to Your Kitchen
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Sign in to continue creating amazing recipes with AI-powered assistance
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">5K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Recipes Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">User Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="w-full border-2 border-orange-200 dark:border-orange-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Card header with gradient */}
            <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-8">
              <motion.div
                className="absolute top-4 right-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-white/50" />
              </motion.div>
              
              <CardHeader className="p-0">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-white/80" />
                  <span className="text-sm font-medium text-white/80">Secure Login</span>
                </div>
                <CardTitle className="text-3xl text-white">
                  Sign In
                </CardTitle>
                <p className="text-white/90 mt-2">
                  Choose your preferred sign-in method
                </p>
              </CardHeader>
            </div>

            <CardContent className="space-y-6 p-8">
              {/* Mobile logo */}
              <Link href="/" className="lg:hidden flex items-center justify-center gap-3 pb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                  SmartChef
                </span>
              </Link>

              {/* Google Sign In */}
              <div>
                <GoogleSignInButton label="Continue with Google" />
              </div>

             

              {/* Email Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                
              </motion.div>

              {/* Don't have account */}
              <div className="text-center pt-2">
              
              </div>

              {/* Terms */}
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                  Privacy Policy
                </Link>
              </p>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Free Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">No Credit Card</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}