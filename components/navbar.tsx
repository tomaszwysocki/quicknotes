import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import ModeToggle from './mode-toggle'
import { getAuthSession } from '@/lib/auth'
import UserAccountNav from './user-account-nav'
import { Icons } from './icons'

const Navbar = async () => {
    const session = await getAuthSession()

    return (
        <header className='container'>
            <div className='flex h-20 items-center justify-between py-6'>
                <Link href={'/'} className={'flex items-center'}>
                    <Icons.stickyNote />
                    <span className='ml-2 font-bold'>Quicknotes</span>
                </Link>
                <div className='flex items-center'>
                    <ModeToggle />
                    {session?.user ? (
                        <UserAccountNav user={session.user} />
                    ) : (
                        <Link
                            href={'/login'}
                            className={cn(
                                buttonVariants({
                                    variant: 'secondary',
                                    size: 'sm',
                                })
                            )}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar
