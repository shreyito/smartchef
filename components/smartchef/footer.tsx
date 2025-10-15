import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">© 2025 SmartChef</p>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link href="/#contact" className="text-muted-foreground hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
