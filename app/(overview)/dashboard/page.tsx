import { Icons } from "@/components/icons"
import NoteItem from "@/components/note-item"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"

const Dashboard = async () => {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    const notes = await db.note.findMany({
        where: {
            authorId: user.id,
        },
        select: {
            id: true,
            title: true,
            content: true,
            updatedAt: true,
            createdAt: true,

        },
        orderBy: {
            updatedAt: "desc",
        },
    })

    return (
        <div>
            {notes?.length ? (
                <>
                    <div className="flex items-center mb-5 justify-between">
                        <h1 className="text-4xl">Your notes:</h1>
                        <Link href='/create-note' className={cn(
                            buttonVariants(),
                        )}>
                            <Icons.pencil className="h-[18px] w-[18px] mr-2" />
                            New note
                        </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        {notes.map(note => (
                            <NoteItem className="h-[400px] overflow-hidden box-border" key={note.id} note={note} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-4xl">You don't have any notes yet</h1>
                </>
            )}
        </div>
    )
}
export default Dashboard