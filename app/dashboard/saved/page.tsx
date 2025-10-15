import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SavedRecipesClient from "@/components/dashboard/saved-recipes-client"

export default async function SavedPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <main className="max-w-6xl mx-auto w-full p-4 md:p-6 lg:p-8">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-balance">Saved Recipes</h1>
        <p className="text-muted-foreground mt-1">Your personal collection of favorites.</p>
      </div>
      <SavedRecipesClient />
    </main>
  )
}
