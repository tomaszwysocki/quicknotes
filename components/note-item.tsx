import { Note } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import dayjs from 'dayjs'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    note: Pick<Note, 'id' | 'title' | 'content' | 'updatedAt'>
}

const NoteItem = ({ note, ...props }: Props) => {
    const dateFormat = dayjs(note.updatedAt).format('DD.MM.YYYY HH:mm')

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>{dateFormat}</CardDescription>
            </CardHeader>
            <div>
                <CardContent className="whitespace-break-spaces">
                    {note.content}
                </CardContent>
            </div>
        </Card>
    )
}
export default NoteItem