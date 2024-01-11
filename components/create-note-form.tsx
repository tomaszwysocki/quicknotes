'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
import { noteSchema } from '@/lib/validations/note'

const CreateNoteForm = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof noteSchema>>({
        resolver: zodResolver(noteSchema),
    })

    async function onSubmit(data: z.infer<typeof noteSchema>) {
        const res = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: data.title,
                content: data.content,
            }),
        })

        if (!res?.ok) {
            return toast({
                title: 'Something went wrong.',
                description: 'Your note was not added. Please try again.',
                variant: 'destructive',
            })
        }

        router.push('/dashboard')
        router.refresh()

        return toast({
            description: 'New note has been created.',
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
                                <Input placeholder='Untitled' {...field} />
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
                                <Textarea
                                    placeholder='Your content goes here...'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Create a note</Button>
            </form>
        </Form>
    )
}

export default CreateNoteForm
