import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { StickyNote } from "lucide-react"
import { ModeToggle } from "./mode-toggle"


export default function Navbar() {
  return (
    <header className="container">
      <div className="flex h-20 items-center justify-between py-6">
        <Link href={"/"} className={"flex items-center"}>
          <StickyNote />
          <span className="ml-2 font-bold">Quicknotes</span>
        </Link>
        <div className="flex items-center">
          <ModeToggle />
          <Link href={"/login"} className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "ml-4")}>Login</Link>
        </div>
      </div>
    </header>
  )
}