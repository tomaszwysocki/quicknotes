'use client'

import dayjs from 'dayjs'
import { CardDescription } from './ui/card'
import { Note } from '@prisma/client'

interface DateTimeProps {
    note: Pick<Note, 'updatedAt'>
}

const DateTime = ({ note }: DateTimeProps) => {
    const dateFormat = dayjs(note.updatedAt).format('DD.MM.YYYY HH:mm')

    return (
        <CardDescription suppressHydrationWarning={true}>
            {dateFormat}
        </CardDescription>
    )
}

export default DateTime
