"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function ImageIngredientUploader({ onRecognized }: { onRecognized: (items: string[]) => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const recognize = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const form = new FormData()
      form.append("image", file)
      const res = await fetch("/api/recognize", { method: "POST", body: form })
      if (!res.ok) throw new Error("Failed to recognize ingredients")
      const json = (await res.json()) as { ingredients: string[] }
      onRecognized(json.ingredients)
    } catch (e: any) {
      setError(e?.message ?? "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        aria-label="Upload ingredient image"
        className="text-sm"
      />
      <Button
        onClick={recognize}
        variant="secondary"
        disabled={!file || loading}
        aria-label="Recognize ingredients from image"
      >
        {loading ? <Spinner className="mr-2 h-4 w-4" /> : null}
        Recognize
      </Button>
      {error ? <span className="text-sm text-destructive">{error}</span> : null}
    </div>
  )
}
