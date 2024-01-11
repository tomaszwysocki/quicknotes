import { Note } from '@prisma/client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card'
import dayjs from 'dayjs'
import DeleteDialog from './delete-dialog'
import Link from 'next/link'
import { Icons } from './icons'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import Timezone from 'dayjs/plugin/timezone'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    note: Pick<Note, 'id' | 'title' | 'content' | 'updatedAt'>
}

const NoteItem = ({ note, ...props }: Props) => {
    dayjs.extend(Timezone)
    dayjs.tz.setDefault('Europe/Warsaw')
    const dateFormat = dayjs(note.updatedAt).format('DD.MM.YYYY HH:mm')

    return (
        <Card {...props}>
            <Link
                href={`/edit/${note.id}`}
                className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'group-hover:inline-flex hidden absolute right-[3.75rem] top-3 h-10 w-10 p-0'
                )}
            >
                <Icons.pencil className='h-5 w-5' />
            </Link>
            <DeleteDialog
                note={note}
                className='absolute right-3 top-3 h-10 w-10 p-0 group-hover:inline-flex hidden '
            />
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>{dateFormat}</CardDescription>
            </CardHeader>
            <div>
                <CardContent className='whitespace-break-spaces'>
                    {note.content}
                </CardContent>
            </div>
        </Card>
    )
}

export default NoteItem
