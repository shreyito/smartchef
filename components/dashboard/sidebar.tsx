"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Home, ChefHat, Filter, Utensils, LogOut, Sparkles } from "lucide-react"
import { signOut } from "next-auth/react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const NavItem = ({
  href,
  label,
  icon: Icon,
  currentHash,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  currentHash: string
}) => {
  const pathname = usePathname()
  let isActive = false
  if (pathname?.startsWith("/dashboard")) {
    const targetHash = href.replace("/dashboard", "")
    isActive = currentHash ? currentHash === targetHash : targetHash === "#overview"
  }

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
        isActive
          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
          : "text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/20"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && (
        <motion.div
          layoutId="activeNavItem"
          className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <Icon className={cn(
        "h-5 w-5 transition-transform group-hover:scale-110 relative z-10",
        isActive && "text-white"
      )} />
      <span className="relative z-10">{label}</span>
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto w-2 h-2 rounded-full bg-white relative z-10"
        />
      )}
    </Link>
  )
}

export function Sidebar() {
  const [currentHash, setCurrentHash] = useState<string>("")

  useEffect(() => {
    const setHash = () => setCurrentHash(window.location.hash || "#overview")
    setHash()
    window.addEventListener("hashchange", setHash)
    return () => window.removeEventListener("hashchange", setHash)
  }, [])

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-white to-orange-50/30 dark:from-gray-950 dark:to-orange-950/10 border-r-2 border-orange-200 dark:border-orange-800">
      {/* Logo Section */}
      <div className="px-5 py-6">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg"
          >
            <ChefHat className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
              SmartChef
            </span>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-medium text-orange-900 dark:text-orange-200">
                Dashboard
              </span>
            </div>
          </div>
        </Link>
      </div>

      <Separator className="bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-800 to-transparent" />

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <NavItem href="/dashboard#overview" label="Overview" icon={Home} currentHash={currentHash} />
        <NavItem href="/dashboard#ingredients" label="Ingredients" icon={ChefHat} currentHash={currentHash} />
        <NavItem href="/dashboard#filters" label="Filters" icon={Filter} currentHash={currentHash} />
        <NavItem href="/dashboard#recipes" label="Recipes" icon={Utensils} currentHash={currentHash} />
      </nav>

      {/* Sign Out Section */}
      <div className="border-t border-orange-200 dark:border-orange-800 p-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-300 dark:hover:border-red-700 hover:text-red-600 dark:hover:text-red-400 transition-all group"
            onClick={() => signOut({ callbackUrl: "/" })}
            aria-label="Sign out"
          >
            <LogOut className="mr-2 h-4 w-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
            <span className="font-semibold">Sign out</span>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}