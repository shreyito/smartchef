import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY
    if (!apiKey) {
      console.error("[v0] GOOGLE_GEMINI_API_KEY not set")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const ct = req.headers.get("content-type") || ""
    if (!ct.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 })
    }

    const form = await req.formData()
    const file = form.get("image") as File | null
    if (!file) {
      return NextResponse.json({ error: "Missing image" }, { status: 400 })
    }

    // Convert image to base64
    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    const mimeType = file.type || "image/jpeg"

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    // Call Gemini Vision API
    const response = await model.generateContent([
      {
        inlineData: {
          data: base64,
          mimeType,
        },
      },
      {
        text: `Analyze this food image and extract a list of visible ingredients. 
        Return ONLY a JSON object with an "ingredients" array of lowercase ingredient names (strings).
        Example: {"ingredients": ["tomato", "onion", "garlic", "olive oil"]}
        If no food is detected, return {"ingredients": []}.
        Be specific and list individual ingredients, not dishes.`,
      },
    ])

    const text = response.response.text()
    console.log("[v0] Gemini response:", text)

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error("[v0] No JSON found in Gemini response")
      return NextResponse.json({ ingredients: [] }, { status: 200 })
    }

    const parsed = JSON.parse(jsonMatch[0])
    const ingredients = Array.isArray(parsed.ingredients)
      ? parsed.ingredients.map((s: string) => s.toLowerCase().trim()).filter(Boolean)
      : []

    console.log("[v0] Extracted ingredients:", ingredients)
    return NextResponse.json({ ingredients })
  } catch (e: any) {
    console.error("[v0] Recognition error:", e.message)
    return NextResponse.json({ error: "Recognition failed", details: e.message }, { status: 500 })
  }
}
