import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getDb } from "@/lib/db/mongodb"

export const dynamic = "force-dynamic"

export async function DELETE(_request: Request, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const slug = params.slug
    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 })
    }

    const db = await getDb()
    const savedCol = db.collection("saved")
    const res = await savedCol.deleteOne({ userId: session.user.email, slug })
    return NextResponse.json({ ok: true, deletedCount: res.deletedCount ?? 0 })
  } catch (err: any) {
    console.error("[v0] DELETE /api/saved/[slug] error:", err?.message)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
