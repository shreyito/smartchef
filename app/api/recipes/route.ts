import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db/mongodb"
import { RECIPES } from "@/lib/recipes"

export const dynamic = "force-dynamic"

function parseBool(value: string | null | undefined) {
  if (value === "true") return true
  if (value === "false") return false
  return undefined
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const page = Math.max(1, Number(url.searchParams.get("page") || "1"))
  const pageSize = Math.min(50, Math.max(1, Number(url.searchParams.get("pageSize") || "20")))

  const search = url.searchParams.get("search")?.trim()
  const ingredientsParam = url.searchParams.get("ingredients") // comma-separated
  const difficulty = url.searchParams.get("difficulty") ?? undefined
  const cuisine = url.searchParams.get("cuisine") ?? undefined
  const maxTime = url.searchParams.get("maxTime") ? Number(url.searchParams.get("maxTime")) : undefined
  const minRating = url.searchParams.get("minRating") ? Number(url.searchParams.get("minRating")) : undefined

  const vegetarian = parseBool(url.searchParams.get("vegetarian"))
  const vegan = parseBool(url.searchParams.get("vegan"))
  const glutenFree = parseBool(url.searchParams.get("glutenFree"))
  const dairyFree = parseBool(url.searchParams.get("dairyFree"))
  const nutFree = parseBool(url.searchParams.get("nutFree"))

  // Build MongoDB filter
  const filter: Record<string, any> = {}

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { cuisine: { $regex: search, $options: "i" } },
      { tags: { $elemMatch: { $regex: search, $options: "i" } } },
      { slug: { $regex: search, $options: "i" } },
    ]
  }

  if (ingredientsParam) {
    const ingredients = ingredientsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    if (ingredients.length > 0) {
      // Require all provided ingredients to be present by item name
      filter["ingredients.item"] = { $all: ingredients }
    }
  }

  if (difficulty) filter.difficulty = difficulty
  if (cuisine) filter.cuisine = cuisine
  if (typeof maxTime === "number" && !Number.isNaN(maxTime)) filter.totalTimeMinutes = { $lte: maxTime }
  if (typeof minRating === "number" && !Number.isNaN(minRating)) filter["rating.average"] = { $gte: minRating }

  // Dietary flags
  if (vegetarian !== undefined) filter["dietary.vegetarian"] = vegetarian
  if (vegan !== undefined) filter["dietary.vegan"] = vegan
  if (glutenFree !== undefined) filter["dietary.glutenFree"] = glutenFree
  if (dairyFree !== undefined) filter["dietary.dairyFree"] = dairyFree
  if (nutFree !== undefined) filter["dietary.nutFree"] = nutFree

  try {
    if (!process.env.MONGODB_URI) {
      // Fallback to static data if env var is not set
      const total = RECIPES.length
      const start = (page - 1) * pageSize
      const recipes = RECIPES.slice(start, start + pageSize)
      return NextResponse.json({
        recipes,
        meta: { total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
        source: "static",
      })
    }

    const col = await getCollection<any>("recipe")

    const cursor = col
      .find(filter)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
    // Optional: sort by updatedAt desc if present
    cursor.sort({ updatedAt: -1, name: 1 })

    const [recipes, total] = await Promise.all([cursor.toArray(), col.countDocuments(filter)])

    return NextResponse.json({
      recipes,
      meta: { total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
      source: "mongodb",
    })
  } catch (error: any) {
    console.error("[v0] /api/recipes GET error:", error?.message || error)
    // Graceful fallback to static data so the UI still works
    const total = RECIPES.length
    const start = (page - 1) * pageSize
    const recipes = RECIPES.slice(start, start + pageSize)
    return NextResponse.json(
      {
        recipes,
        meta: { total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
        source: "fallback-static",
        error: "Failed to fetch from MongoDB. Returned static data.",
      },
      { status: 200 },
    )
  }
}
