'use client'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useToast } from './ui/use-toast'
import { Icons } from './icons'

const UserAuthForm = () => {
    const [isGithubLoading, setIsGithubLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const { toast } = useToast()

    const loginWithGithub = async () => {
        setIsGithubLoading(true)
        try {
            await signIn('github', { callbackUrl: '/dashboard' })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was an error logging in with Github',
                variant: 'destructive',
            })
        } finally {
            setIsGithubLoading(false)
        }
    }

    const loginWithGoogle = async () => {
        setIsGoogleLoading(true)
        try {
            await signIn('google', { callbackUrl: '/dashboard' })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was an error logging in with Google',
                variant: 'destructive',
            })
        } finally {
            setIsGoogleLoading(false)
        }
    }

    return (
        <div className='grid gap-3'>
            <button
                type='button'
                className={cn(buttonVariants({ variant: 'outline' }))}
                onClick={() => {
                    loginWithGoogle()
                }}
                disabled={isGoogleLoading}
            >
                {isGoogleLoading ? (
                    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                    <Icons.google className='mr-2 h-4 w-4' />
                )}{' '}
                Continue with Google
            </button>
            <button
                type='button'
                className={cn(buttonVariants({ variant: 'outline' }))}
                onClick={() => {
                    loginWithGithub()
                }}
                disabled={isGithubLoading}
            >
                {isGithubLoading ? (
                    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                    <Icons.github className='mr-2 h-4 w-4' />
                )}{' '}
                Continue with Github
            </button>
        </div>
    )
}

export default UserAuthForm
