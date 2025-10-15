import type { Ingredient, Recipe } from "./recipes"

export function matchRecipes(
  recipes: Recipe[],
  opts: {
    ingredients: string[]
    diet: "none" | "vegetarian" | "vegan" | "gluten-free"
    difficulty: "any" | "easy" | "medium" | "hard"
    maxTime: number
  },
) {
  const ingSet = new Set(opts.ingredients.map((s) => s.toLowerCase()))
  const dietOk = (r: Recipe) => opts.diet === "none" || r.diet === opts.diet
  const diffOk = (r: Recipe) => opts.difficulty === "any" || r.difficulty === opts.difficulty
  const timeOk = (r: Recipe) => r.time <= opts.maxTime

  const scored = recipes
    .filter((r) => dietOk(r) && diffOk(r) && timeOk(r))
    .map((r) => {
      const names = r.ingredients.map((i) => i.name.toLowerCase())
      const overlap = names.filter((n) => ingSet.has(n)).length
      const score = names.length ? overlap / names.length : 0
      const substitutions = computeSubstitutions(r, ingSet)
      return { ...r, score, substitutions }
    })
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  return scored
}

const SUBS: Record<string, string[]> = {
  butter: ["olive oil", "coconut oil"],
  milk: ["oat milk", "almond milk"],
  egg: ["flax egg", "chia egg"],
  beef: ["turkey", "tofu crumbles"],
  cheese: ["nutritional yeast"],
  "soy sauce": ["tamari", "coconut aminos"],
  pasta: ["zoodles", "gluten-free pasta"],
}

export function computeSubstitutions(recipe: Recipe, available: Set<string>) {
  const out: Record<string, string[]> = {}
  for (const ing of recipe.ingredients) {
    const name = ing.name.toLowerCase()
    if (!available.has(name) && SUBS[name]) {
      out[name] = SUBS[name]
    }
  }
  return out
}

export function scaleIngredients(ings: Ingredient[], baseServings: number, targetServings: number) {
  const factor = targetServings / Math.max(1, baseServings)
  return ings.map((i) => ({
    ...i,
    quantity: Math.round(i.quantity * factor * 10) / 10,
  }))
}
