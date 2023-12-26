import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { StickyNote } from "lucide-react"


export default function Navbar() {
  return (
    <header className="container">
      <div className="flex h-20 items-center justify-between py-6">
        <Link href={"/"} className={"flex items-center"}>
          <StickyNote />
          <span className="ml-2 font-bold">Quicknotes</span>
        </Link>
        <Link href={"/login"} className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>Login</Link>
      </div>
    </header>
  )
}