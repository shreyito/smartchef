"use client"

import Image from "next/image"
import { Star, Bookmark, Clock, Flame, ChefHat } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export type RecipeCardData = {
  slug: string
  name: string
  cuisine?: string
  difficulty?: string
  totalTimeMinutes?: number
  tags?: string[]
  image?: string
  nutritionPerServing?: { calories?: number; protein_g?: number; carbs_g?: number; fat_g?: number }
  rating?: { average?: number; count?: number }
  dietary?: { vegetarian?: boolean; vegan?: boolean; glutenFree?: boolean; dairyFree?: boolean; nutFree?: boolean }
}

export function RecipeCard({
  data,
  saved,
  onToggleSave,
  onRate,
  className,
}: {
  data: RecipeCardData
  saved?: boolean
  onToggleSave?: (slug: string) => void
  onRate?: (slug: string, value: number) => void
  className?: string
}) {
  const calories = data.nutritionPerServing?.calories
  const protein = data.nutritionPerServing?.protein_g

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-900 shadow-lg transition-all",
        "hover:shadow-2xl hover:border-orange-300 dark:hover:border-orange-700",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/20 dark:to-amber-950/20">
        <Image
          src={data.image || "/placeholder.svg?height=240&width=384&query=delicious dish photo"}
          alt={data.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
          sizes="(min-width: 1280px) 384px, (min-width: 768px) 33vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Save button overlay */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={saved ? "Remove from saved" : "Save recipe"}
          onClick={() => onToggleSave?.(data.slug)}
          className={cn(
            "absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-md transition-all shadow-lg",
            saved 
              ? "bg-orange-500 text-white" 
              : "bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900",
          )}
        >
          <Bookmark className={cn("h-5 w-5", saved && "fill-current")} />
        </motion.button>

        {/* Difficulty badge */}
        {data.difficulty && (
          <div className="absolute top-3 left-3">
            <span className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md shadow-lg",
              data.difficulty === "easy" && "bg-green-500/90 text-white",
              data.difficulty === "medium" && "bg-yellow-500/90 text-white",
              data.difficulty === "hard" && "bg-red-500/90 text-white"
            )}>
              <ChefHat className="h-3.5 w-3.5" />
              {data.difficulty}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {data.name}
          </h3>
          
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {data.cuisine && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 font-medium border border-orange-200 dark:border-orange-800">
                {data.cuisine}
              </span>
            )}
            {typeof data.totalTimeMinutes === "number" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                <Clock className="h-3.5 w-3.5" />
                {data.totalTimeMinutes} min
              </span>
            )}
          </div>
        </div>

        {/* Nutrition and rating */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex gap-2">
            {typeof calories === "number" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30 text-orange-700 dark:text-orange-300 text-xs font-semibold border border-orange-200 dark:border-orange-800">
                <Flame className="h-3.5 w-3.5" />
                {calories}
              </span>
            )}
            {typeof protein === "number" && (
              <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold">
                {protein}g
              </span>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200 dark:border-yellow-800 transition-all hover:shadow-md"
            onClick={() => onRate?.(data.slug, Math.min(5, Math.round((data.rating?.average || 4) + 1)))}
            aria-label="Rate recipe"
          >
            <Star className={cn(
              "h-4 w-4",
              (data.rating?.average || 0) >= 4.5 ? "fill-yellow-500 text-yellow-500" : "text-yellow-600 dark:text-yellow-500"
            )} />
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {(data.rating?.average ?? 4.0).toFixed(1)}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}