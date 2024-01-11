import CreateNoteForm from '@/components/create-note-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Create Note',
    description: 'Create your new note instantly.',
}

const CreateNotePage = () => {
    return <CreateNoteForm />
}

export default CreateNotePage
