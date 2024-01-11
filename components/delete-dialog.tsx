'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Icons } from './icons'
import { Note } from '@prisma/client'
import { toast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    note: Pick<Note, 'id'>
}

const DeleteDialog = ({ note, ...props }: Props) => {
    const router = useRouter()

    const handleDelete = async (id: typeof note.id) => {
        const res = await fetch('/api/notes', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })

        if (!res?.ok) {
            return toast({
                title: 'Something went wrong.',
                description: 'Your note was not deleted. Please try again.',
                variant: 'destructive',
            })
        }

        router.refresh()

        return toast({
            title: 'Deleted!',
            description: 'Your note has been deleted.',
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button {...props} variant={'outline'}>
                    <Icons.delete className='h-5 w-5' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Do you want to delete this note?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this note.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(note.id)}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDialog
