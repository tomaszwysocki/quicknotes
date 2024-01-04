'use client'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useToast } from './ui/use-toast'
import { Icons } from './icons'

export function UserAuthForm() {
    const [isGithubLoading, setIsGithubLoading] = useState(false)
    const { toast } = useToast()

    const loginWithGithub = async () => {
        setIsGithubLoading(true)
        try {
            await signIn('github')
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

    return (
        <div className='grid gap-6'>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>
                        Continue with
                    </span>
                </div>
            </div>
            <button
                type='button'
                className={cn(buttonVariants({ variant: 'outline' }))}
                onClick={() => {
                    loginWithGithub()
                }}
                disabled={isGithubLoading}
            >
                {isGithubLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                Github
            </button>
        </div>
    )
}
