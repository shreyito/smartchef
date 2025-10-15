import type { ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] grid grid-cols-1 md:grid-cols-[280px_1fr] scroll-smooth">
      {/* widened sidebar for balance */}
      <aside className="hidden md:block border-r bg-card">
        <Sidebar />
      </aside>
      <div className="flex min-h-[100dvh] flex-col">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-10 border-b bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="font-semibold tracking-tight">SmartChef</div>
            <a
              href="/dashboard#recipes"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Browse recipes
            </a>
          </div>
        </header>
        {/* children may contain its own <main>, so don't add another <main> here */}
        {children}
      </div>
    </div>
  )
}
