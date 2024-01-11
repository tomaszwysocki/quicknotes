import { Icons } from '@/components/icons'
import NoteItem from '@/components/note-item'
import { buttonVariants } from '@/components/ui/button'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'View and manage your notes.',
}

const Dashboard = async () => {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || '/login')
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
            updatedAt: 'desc',
        },
    })

    return (
        <div>
            {notes?.length ? (
                <>
                    <div className='flex items-center mb-5 justify-between'>
                        <h1 className='text-3xl md:text-4xl'>
                            Your notes ({notes.length}):
                        </h1>
                        <Link
                            href='/create-note'
                            className={cn(buttonVariants())}
                        >
                            <Icons.new className='h-[18px] w-[18px] mr-2' />
                            New note
                        </Link>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {notes.map(note => (
                            <NoteItem
                                className='h-[400px] overflow-hidden box-border relative group'
                                key={note.id}
                                note={note}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className='flex items-center mb-5 justify-between'>
                    <h1 className='text-3xl md:text-4xl'>
                        You don&apos;t have any notes yet
                    </h1>
                    <Link href='/create-note' className={cn(buttonVariants())}>
                        <Icons.new className='h-[18px] w-[18px] mr-2' />
                        New note
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Dashboard
