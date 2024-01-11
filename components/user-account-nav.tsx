'use client'

import { User } from 'next-auth'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import UserAvatar from './user-avatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Icons } from './icons'

interface Props {
    user: Pick<User, 'email' | 'image' | 'name'>
}

const UserAccountNav = ({ user }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    className='h-8 w-8'
                    user={{
                        name: user.name || null,
                        image: user.image || null,
                    }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <div className='flex items-center justify-start gap-2 p-2'>
                    <div className='flex flex-col space-y-1 leading-none'>
                        {user.name && (
                            <p className='font-medium'>{user.name}</p>
                        )}
                        {user.email && (
                            <p className='w-[200px] truncate text-sm text-muted-foreground'>
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href='/dashboard'>
                        <Icons.fileText className='mr-2 h-4 w-4' />
                        All notes
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/create-note'>
                        <Icons.pencil className='mr-2 h-4 w-4' />
                        New note
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={event => {
                        event.preventDefault()
                        signOut({
                            callbackUrl: `${window.location.origin}/`,
                        })
                    }}
                >
                    <Icons.logout className='mr-2 h-4 w-4' />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav
