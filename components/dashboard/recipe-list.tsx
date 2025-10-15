"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, Flame, Award, ChevronLeft, ChevronRight } from "lucide-react"
import { scaleIngredients } from "@/lib/matching"
import type { Recipe } from "@/lib/recipes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function RecipeList({
  recipes,
  servings,
  favorites,
  ratings,
  onToggleFavorite,
  onRate,
}: {
  recipes: (Recipe & { score?: number; substitutions?: Record<string, string[]> })[]
  servings: number
  favorites: string[]
  ratings: Record<string, number>
  onToggleFavorite: (id: string) => void
  onRate: (id: string, rating: number) => void
}) {
  const [page, setPage] = useState(1)
  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(recipes.length / pageSize))

  useEffect(() => {
    setPage(1)
  }, [recipes])

  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return recipes.slice(start, start + pageSize)
  }, [recipes, page])

  if (recipes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No recipes found
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
          Try adding or removing ingredients to find matching recipes
        </p>
      </motion.div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {current.map((r, index) => {
          const scaled = scaleIngredients(r.ingredients, r.servings, servings)
          const isFav = favorites.includes(r.id)
          const rating = ratings[r.id] ?? 0
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className="group overflow-hidden rounded-2xl border-2 border-orange-200 dark:border-orange-800 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-orange-300 dark:hover:border-orange-700 bg-white dark:bg-gray-900"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-3 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-b border-orange-200 dark:border-orange-800">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-lg font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {r.name}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                        {r.cuisine}
                      </Badge>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                        <Clock className="h-3 w-3" />
                        {r.time} min
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium capitalize">
                        <Award className="h-3 w-3" />
                        {r.difficulty}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                        <Users className="h-3 w-3" />
                        {servings}
                      </span>
                      {r.score !== undefined && (
                        <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20">
                          {Math.round((r.score ?? 0) * 100)}% match
                        </Badge>
                      )}
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      variant={isFav ? "default" : "outline"}
                      onClick={() => onToggleFavorite(r.id)}
                      aria-pressed={isFav}
                      className={cn(
                        "rounded-lg",
                        isFav && "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white border-0"
                      )}
                    >
                      {isFav ? "Saved" : "Save"}
                    </Button>
                  </motion.div>
                </CardHeader>
                <CardContent className="space-y-4 p-5">
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <div className="w-1 h-4 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
                      Ingredients
                    </div>
                    <ul className="space-y-1.5 text-gray-600 dark:text-gray-400">
                      {scaled.map((ing) => (
                        <li key={ing.name} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {ing.quantity} {ing.unit}
                            </span>{" "}
                            {ing.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {r.substitutions && Object.keys(r.substitutions).length > 0 && (
                    <div className="text-sm p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                      <div className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                        💡 Substitutions
                      </div>
                      <ul className="space-y-1 text-amber-700 dark:text-amber-300 text-xs">
                        {Object.entries(r.substitutions).map(([k, v]) => (
                          <li key={k}>
                            <span className="font-medium">{k}:</span> {v.join(", ")}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <div className="w-1 h-4 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
                      Steps
                    </div>
                    <ol className="space-y-2 text-gray-600 dark:text-gray-400">
                      {r.steps.slice(0, 4).map((s, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                          <span className="flex-1">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="text-sm p-3 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-800">
                    <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      Nutrition (per serving)
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="px-2 py-1 rounded-lg bg-white dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                        {r.nutrition.calories} kcal
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-white dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                        {r.nutrition.protein}g protein
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-white dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                        {r.nutrition.carbs}g carbs
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-white dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                        {r.nutrition.fat}g fat
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <motion.button
                        key={n}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRate(r.id, n)}
                        aria-label={`Rate ${n} stars`}
                        className="transition"
                      >
                        <Star
                          className={cn(
                            "h-5 w-5",
                            n <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
                          )}
                        />
                      </motion.button>
                    ))}
                    <span className="text-xs text-gray-600 dark:text-gray-400 ml-1 font-medium">
                      {rating ? `${rating}/5` : "Rate this recipe"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex items-center justify-center gap-2"
      >
        <div className="inline-flex items-center gap-2 rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-900 p-2 shadow-lg">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="rounded-lg border-2 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={p === page ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(p)}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Go to page ${p}`}
              className={cn(
                "rounded-lg min-w-[2.5rem]",
                p === page && "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white border-0"
              )}
            >
              {p}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
            className="rounded-lg border-2 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </>
  )
}