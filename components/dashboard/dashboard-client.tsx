"use client"

import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/components/ui/use-toast"
import { ImageIngredientUploader } from "@/components/dashboard/image-ingredient-uploader"
import { RecipeList } from "@/components/dashboard/recipe-list"
import { matchRecipes } from "@/lib/matching"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { motion } from "framer-motion"
import { ChefHat, Sparkles } from "lucide-react"

type Recipe = import("@/lib/recipes").Recipe

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const PRESET_INGREDIENTS = [
  "tomato",
  "onion",
  "garlic",
  "chicken",
  "beef",
  "egg",
  "milk",
  "cheese",
  "pasta",
  "rice",
  "potato",
  "bell pepper",
  "spinach",
  "mushroom",
  "carrot",
  "broccoli",
  "lemon",
  "olive oil",
  "butter",
  "flour",
]

const DIETS = ["none", "vegetarian", "vegan", "gluten-free"] as const
const DIFFICULTIES = ["any", "easy", "medium", "hard"] as const

export function DashboardClient() {
  const { toast } = useToast()
  const { data, error, isLoading } = useSWR<{ recipes: Recipe[] }>("/api/recipes", fetcher)
  const [input, setInput] = useState("")
  const [ingredients, setIngredients] = useState<string[]>([])
  const [diet, setDiet] = useState<(typeof DIETS)[number]>("none")
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>("any")
  const [maxTime, setMaxTime] = useState<number>(90)
  const [servings, setServings] = useState<number>(2)
  const [favorites, setFavorites] = useLocalStorage<string[]>("smartchef:favorites", [])
  const [ratings, setRatings] = useLocalStorage<Record<string, number>>("smartchef:ratings", {})

  useEffect(() => {
    if (error) {
      toast({ title: "Failed to load recipes", description: "Please try again later.", variant: "destructive" })
    }
  }, [error, toast])

  const onAddIngredient = () => {
    const t = input.trim().toLowerCase()
    if (!t) return
    if (!ingredients.includes(t)) setIngredients((prev) => [...prev, t])
    setInput("")
  }

  const onRemoveIngredient = (item: string) => {
    setIngredients((prev) => prev.filter((i) => i !== item))
  }

  const onRecognized = (recognized: string[]) => {
    const merged = Array.from(new Set([...ingredients, ...recognized.map((s) => s.toLowerCase())]))
    setIngredients(merged)
    toast({ title: "Recognized ingredients added", description: `${recognized.join(", ")}` })
  }

  const matched = useMemo(() => {
    const recipes = data?.recipes ?? []
    return matchRecipes(recipes, {
      ingredients,
      diet,
      difficulty,
      maxTime,
    })
  }, [data?.recipes, ingredients, diet, difficulty, maxTime])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const rateRecipe = (id: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [id]: rating }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 dark:from-gray-950 dark:to-orange-950/10">
      <div className="mx-auto w-full max-w-6xl px-3 py-5 md:px-4 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            id="overview"
            className="mb-6 border-2 border-orange-200 dark:border-orange-800 bg-white/80 dark:bg-gray-900/80 shadow-xl backdrop-blur-xl rounded-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-6 relative overflow-hidden">
              <motion.div
                className="absolute top-2 right-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-white/50" />
              </motion.div>
              <CardHeader className="p-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl md:text-3xl text-white font-bold">SmartChef Dashboard</CardTitle>
                    <p className="text-white/90 text-sm mt-1">
                      Input ingredients, set your preferences, and discover recipes tailored to you.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </div>
            
            <CardContent className="space-y-6 p-6">
              <div id="ingredients" className="flex flex-col gap-3 md:flex-row md:items-center">
                <Input
                  placeholder="Type an ingredient (e.g., tomato) and press Add"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onAddIngredient()}
                  aria-label="Ingredient input"
                  className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-500"
                />
                <Button 
                  onClick={onAddIngredient} 
                  className="md:shrink-0 h-12 px-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl shadow-lg"
                >
                  Add
                </Button>
                <ImageIngredientUploader onRecognized={onRecognized} />
              </div>

              <div className="flex flex-wrap gap-2">
                {PRESET_INGREDIENTS.map((item) => {
                  const active = ingredients.includes(item)
                  return (
                    <Badge
                      key={item}
                      variant={active ? "default" : "secondary"}
                      className={`cursor-pointer transition-all duration-200 px-4 py-2 rounded-lg ${
                        active 
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600" 
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => (active ? onRemoveIngredient(item) : setIngredients((p) => [...p, item]))}
                      aria-pressed={active}
                      aria-label={`Select ingredient ${item}`}
                    >
                      {item}
                    </Badge>
                  )
                })}
              </div>

              {ingredients.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                  <span className="text-sm font-medium text-orange-900 dark:text-orange-200">Selected:</span>
                  {ingredients.map((i) => (
                    <Badge key={i} variant="outline" className="gap-2 border-orange-300 dark:border-orange-700">
                      {i}
                      <button
                        className="rounded bg-orange-200 dark:bg-orange-800 px-1.5 py-0.5 text-xs hover:bg-orange-300 dark:hover:bg-orange-700 transition-colors"
                        onClick={() => onRemoveIngredient(i)}
                        aria-label={`Remove ${i}`}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <Separator className="bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-800 to-transparent" />

              <div id="filters" className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dietary preference</label>
                  <Select value={diet} onValueChange={(v) => setDiet(v as typeof diet)}>
                    <SelectTrigger aria-label="Dietary preference" className="h-11 rounded-xl border-2">
                      <SelectValue placeholder="Select diet" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIETS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Difficulty</label>
                  <Select value={difficulty} onValueChange={(v) => setDifficulty(v as typeof difficulty)}>
                    <SelectTrigger aria-label="Difficulty filter" className="h-11 rounded-xl border-2">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIFFICULTIES.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Max cooking time (minutes)</label>
                  <div className="px-1">
                    <Slider
                      value={[maxTime]}
                      onValueChange={(v) => setMaxTime(v[0] ?? 90)}
                      min={10}
                      max={120}
                      step={5}
                      aria-label="Max cooking time"
                      className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-orange-500 [&_[role=slider]]:to-amber-500"
                    />
                    <div className="mt-2 text-sm font-medium text-orange-600 dark:text-orange-400">{maxTime} min</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Servings</label>
                  <div className="px-1">
                    <Slider
                      value={[servings]}
                      onValueChange={(v) => setServings(v[0] ?? 2)}
                      min={1}
                      max={8}
                      step={1}
                      aria-label="Servings"
                      className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-orange-500 [&_[role=slider]]:to-amber-500"
                    />
                    <div className="mt-2 text-sm font-medium text-orange-600 dark:text-orange-400">{servings} servings</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div id="recipes">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 py-12">
              <Spinner className="h-5 w-5" />
              <span>Loading recipes…</span>
            </div>
          ) : (
            <RecipeList
              recipes={matched}
              servings={servings}
              favorites={favorites}
              ratings={ratings}
              onToggleFavorite={toggleFavorite}
              onRate={rateRecipe}
            />
          )}
        </div>
      </div>
    </div>
  )
}