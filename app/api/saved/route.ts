import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getDb } from "@/lib/db/mongodb"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDb()
    const savedCol = db.collection("saved")
    const recipeCol = db.collection("recipe")

    // pagination (optional)
    const page = 1
    const pageSize = 50

    const savedDocs = await savedCol
      .find({ userId: session.user.email })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .toArray()

    const slugs = savedDocs.map((d: any) => d.slug)
    if (slugs.length === 0) {
      return NextResponse.json({ recipes: [], meta: { count: 0 } })
    }

    const recipes = await recipeCol
      .find({ slug: { $in: slugs } })
      .project({ _id: 0 })
      .toArray()

    // keep order by saved time
    const order = new Map(slugs.map((s, i) => [s, i]))
    recipes.sort((a: any, b: any) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0))

    return NextResponse.json({
      recipes,
      meta: { count: recipes.length },
    })
  } catch (err: any) {
    console.error("[v0] GET /api/saved error:", err?.message)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => null)
    const slug = body?.slug
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const db = await getDb()
    const savedCol = db.collection("saved")
    // upsert to avoid duplicates
    await savedCol.updateOne(
      { userId: session.user.email, slug },
      { $setOnInsert: { userId: session.user.email, slug, createdAt: new Date() } },
      { upsert: true },
    )

    return NextResponse.json({ ok: true, slug })
  } catch (err: any) {
    console.error("[v0] POST /api/saved error:", err?.message)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
