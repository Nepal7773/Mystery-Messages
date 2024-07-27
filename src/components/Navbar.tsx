'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'
// import { Button } from '@react-email/components'


const Navbar = () => {
    const { data: session } = useSession();

    const user: User = session?.user as User;
    return (
        <nav className='p-4 bg-neutral-900 text-white md:p-6 shadow-md'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <a className='text-xl font-bold mb-4 md:mb-0 ' href="/">Mystery Message</a>
                {

                    session ? (
                        <Link href="/dashboard">
                            <span className='mr-4'>Welcome , {user.username || user.email} </span>
                            <Button className='w-full md:w-auto bg-white text-black hover:bg-black hover:text-white' onClick={() => signOut()}>Logout</Button>
                        </Link>
                    ) : (
                        <Link href='/sign-in'>
                            <Button className='w-full md:w-auto bg-white text-black hover:bg-black hover:text-white'>Login</Button>
                        </Link>
                    )

                }
            </div>
        </nav>
    )
}

export default Navbar