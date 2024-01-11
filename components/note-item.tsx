import { Note } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import dayjs from 'dayjs'
import { Icons } from "./icons"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./ui/button"
import DeleteDialog from "./delete-dialog"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    note: Pick<Note, 'id' | 'title' | 'content' | 'updatedAt'>
}

const NoteItem = ({ note, ...props }: Props) => {
    const dateFormat = dayjs(note.updatedAt).format('DD.MM.YYYY HH:mm')

    return (
        <Card {...props}>
            <DeleteDialog note={note} className="absolute right-3 top-3 h-10 w-10 p-0" />
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>{dateFormat}</CardDescription>
            </CardHeader>
            <div>
                <CardContent className="whitespace-break-spaces">
                    {note.content}
                </CardContent>
            </div>
        </Card >
    )
}
export default NoteItem