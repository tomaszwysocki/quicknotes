import { NextRequest } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import * as z from 'zod'
import {
    noteSchema,
    noteSchemaDelete,
    noteSchemaUpdate,
} from '@/lib/validations/note'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
    try {
        const json = await req.json()
        const body = noteSchema.parse(json)
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        await db.note.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: session.user.id,
            },
        })

        return new Response(null, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }
    }

    return new Response(null, { status: 500 })
}

export async function PATCH(req: NextRequest) {
    try {
        const json = await req.json()
        const body = noteSchemaUpdate.parse(json)
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        await db.note.update({
            data: {
                title: body.title,
                content: body.content,
            },
            where: {
                id: body.id,
            },
        })

        return new Response(null, { status: 204 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        return new Response(null, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const json = await req.json()
        const body = noteSchemaDelete.parse(json)
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        await db.note.delete({
            where: {
                id: body.id,
            },
        })

        return new Response(null, { status: 204 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }
    }

    return new Response(null, { status: 500 })
}
