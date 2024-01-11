import * as z from 'zod'

export const noteSchema = z.object({
    title: z
        .string()
        .min(1, {
            message: 'Title must be at least 1 character.',
        })
        .max(100, {
            message: 'Title must be at most 100 characters.',
        }),
    content: z
        .string()
        .min(1, {
            message: 'Content must be at least 1 character.',
        })
        .max(1000, {
            message: 'Content must be at most 1000 characters.',
        }),
})

export const noteSchemaDelete = z.object({
    id: z.string(),
})
