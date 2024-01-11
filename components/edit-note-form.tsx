'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { noteSchema } from '@/lib/validations/note'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from './ui/textarea'
import { Button, buttonVariants } from './ui/button'
import { Input } from './ui/input'
import { Note } from '@prisma/client'
import { toast } from './ui/use-toast'
import * as z from 'zod'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
    note: Pick<Note, 'title' | 'content' | 'id'>
}

const EditNoteForm = ({ note }: Props) => {
    const router = useRouter()

    const form = useForm<z.infer<typeof noteSchema>>({
        defaultValues: {
            title: note.title,
            content: note.content,
        },
        resolver: zodResolver(noteSchema),
    })

    async function onSubmit(data: z.infer<typeof noteSchema>) {
        const res = await fetch('/api/notes', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: data.title,
                content: data.content,
                id: note.id,
            }),
        })

        if (!res?.ok) {
            return toast({
                title: 'Something went wrong.',
                description: 'Your note was not updated. Please try again.',
                variant: 'destructive',
            })
        }

        router.push('/dashboard')
        router.refresh()

        return toast({
            title: 'Updated!',
            description: 'Your note has been updated.',
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Link
                    type='submit'
                    href='/dashboard'
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'mr-4'
                    )}
                >
                    Cancel
                </Link>
                <Button type='submit'>Update a note</Button>
            </form>
        </Form>
    )
}

export default EditNoteForm
