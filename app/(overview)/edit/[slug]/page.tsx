import EditNoteForm from '@/components/edit-note-form'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { notFound, redirect } from 'next/navigation'

const EditPage = async ({ params: { slug } }: { params: { slug: string } }) => {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || '/login')
    }

    const note = await db.note.findFirst({
        where: {
            id: slug,
        },
        select: {
            title: true,
            content: true,
            id: true,
            authorId: true,
        },
    })

    if (note === null || note.authorId !== user.id) {
        notFound()
    }

    return <EditNoteForm note={note} />
}

export default EditPage
