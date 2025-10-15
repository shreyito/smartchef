"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"

async function postJSON(url: string, { arg }: { arg: { slug: string } }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  })
  if (!res.ok) throw new Error("Failed to save recipe")
  return res.json()
}

async function deleteReq(url: string) {
  const res = await fetch(url, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to unsave recipe")
  return res.json()
}

export default function SaveRecipeButton({
  slug,
  initialSaved = false,
  onChange,
}: {
  slug: string
  initialSaved?: boolean
  onChange?: (saved: boolean) => void
}) {
  const [saved, setSaved] = useState(initialSaved)
  const [loading, setLoading] = useState(false)

  const save = async () => {
    try {
      setLoading(true)
      await postJSON("/api/saved", { arg: { slug } })
      setSaved(true)
      onChange?.(true)
    } catch (e) {
      console.error("[v0] save recipe error:", (e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const unsave = async () => {
    try {
      setLoading(true)
      await deleteReq(`/api/saved/${encodeURIComponent(slug)}`)
      setSaved(false)
      onChange?.(false)
    } catch (e) {
      console.error("[v0] unsave recipe error:", (e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className={cn(
        "text-sm rounded-md px-2.5 py-1.5 border transition-colors",
        loading ? "opacity-60 cursor-not-allowed" : "hover:bg-accent",
      )}
      onClick={saved ? unsave : save}
      disabled={loading}
      aria-label={saved ? "Unsave recipe" : "Save recipe"}
      title={saved ? "Unsave" : "Save"}
    >
      {saved ? "Saved" : "Save"}
    </button>
  )
}
