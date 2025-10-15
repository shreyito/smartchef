"use client"

import useSWR from "swr"
import { useState } from "react"
import { cn } from "@/lib/utils"

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Request failed: ${r.status}`)
    return r.json()
  })

type Recipe = {
  slug: string
  name: string
  cuisine?: string
  difficulty?: string
  totalTimeMinutes?: number
  servings?: number
  dietary?: Record<string, boolean>
  nutritionPerServing?: { calories?: number; protein_g?: number; carbs_g?: number; fat_g?: number }
  image?: string
  rating?: { average?: number; count?: number }
  tags?: string[]
}

export default function SavedRecipesClient() {
  const { data, error, isLoading, mutate } = useSWR<{ recipes: Recipe[] }>("/api/saved", fetcher, {
    revalidateOnFocus: false,
  })
  const [processing, setProcessing] = useState<string | null>(null)

  const handleUnsave = async (slug: string) => {
    try {
      setProcessing(slug)
      const res = await fetch(`/api/saved/${encodeURIComponent(slug)}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to unsave")
      await mutate()
    } catch (e) {
      console.error("[v0] unsave error:", (e as Error).message)
      // Optionally show toast
    } finally {
      setProcessing(null)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card/50 animate-pulse h-56" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="rounded-lg border p-4 text-sm">Unable to load saved recipes. Please try again.</div>
  }

  const recipes = data?.recipes ?? []

  if (recipes.length === 0) {
    return (
      <div className="rounded-lg border p-6 md:p-8 text-center">
        <p className="text-lg">No saved recipes yet.</p>
        <p className="text-muted-foreground mt-1">Browse recipes and save your favorites to see them here.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {recipes.map((r) => (
        <article
          key={r.slug}
          className={cn("group rounded-xl border bg-card hover:bg-card/90 transition-colors overflow-hidden")}
        >
          <div className="aspect-[16/10] w-full overflow-hidden">
            <img
              src={r.image || "/placeholder.svg?height=320&width=512&query=recipe+image"}
              alt={r.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
            />
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base md:text-lg font-semibold leading-tight text-pretty">{r.name}</h3>
              <button
                onClick={() => handleUnsave(r.slug)}
                disabled={processing === r.slug}
                className={cn(
                  "text-sm rounded-md px-2.5 py-1.5 border",
                  processing === r.slug ? "opacity-60 cursor-not-allowed" : "hover:bg-accent",
                )}
                aria-label={`Unsave ${r.name}`}
              >
                Unsave
              </button>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {r.cuisine && <span className="rounded-full border px-2 py-0.5">{r.cuisine}</span>}
              {r.difficulty && <span className="rounded-full border px-2 py-0.5">{r.difficulty}</span>}
              {typeof r.totalTimeMinutes === "number" && (
                <span className="rounded-full border px-2 py-0.5">{r.totalTimeMinutes} min</span>
              )}
              {r.servings && <span className="rounded-full border px-2 py-0.5">{r.servings} servings</span>}
            </div>

            {r.nutritionPerServing?.calories ? (
              <div className="mt-3 text-xs text-muted-foreground">~{r.nutritionPerServing.calories} kcal / serving</div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  )
}
