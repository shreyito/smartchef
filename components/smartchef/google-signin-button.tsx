"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export function GoogleSignInButton({ label = "Sign in with Google" }: { label?: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center w-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full max-w-md"
      >
        <Button
          onClick={handleSignIn}
          disabled={isLoading}
          size="lg"
          variant="outline"
          className="relative w-full h-14 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          aria-label="Sign in with Google"
        >
          {/* Gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50 dark:from-blue-950/20 dark:to-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="relative flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-gray-600 dark:text-gray-400" aria-hidden />
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Connecting...
                </span>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FcGoogle className="h-6 w-6" aria-hidden />
                </motion.div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {label}
                </span>
              </>
            )}
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              translateX: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear"
            }}
            aria-hidden="true"
          />
        </Button>
      </motion.div>
    </div>
  )
}