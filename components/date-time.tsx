'use client'

import dayjs from 'dayjs'
import { CardDescription } from './ui/card'
import { Note } from '@prisma/client'

interface Props {
    note: Pick<Note, 'updatedAt'>
}

const DateTime = ({ note }: Props) => {
    const dateFormat = dayjs(note.updatedAt).format('DD.MM.YYYY HH:mm')

    return <CardDescription>{dateFormat}</CardDescription>
}

export default DateTime
