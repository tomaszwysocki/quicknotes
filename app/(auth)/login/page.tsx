import { Metadata } from 'next'
// import Link from 'next/link'
// import { cn } from '@/lib/utils'
// import { buttonVariants } from '@/components/ui/button'
import UserAuthForm from '@/components/user-auth-form'
import { Icons } from '@/components/icons'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to quicknotes.',
}

const LoginPage = async () => {
    const user = await getCurrentUser()

    if (user) {
        redirect('/dashboard')
    }

    return (
        <div className='container flex h-screen w-screen flex-col items-center justify-center'>
            {/* <Link
                href='/'
                className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    'absolute left-4 top-4 md:left-8'
                )}
            >
                <>
                    <Icons.chevronLeft className='mr-2 h-4 w-4' />
                    Back
                </>
            </Link> */}
            <div className='mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]'>
                <div className='flex flex-col space-y-2 text-center'>
                    <Icons.stickyNote className='mx-auto h-6 w-6' />
                    <h1 className='text-2xl font-semibold tracking-tight'>
                        Welcome back
                    </h1>
                </div>
                <UserAuthForm />
            </div>
        </div>
    )
}

export default LoginPage
