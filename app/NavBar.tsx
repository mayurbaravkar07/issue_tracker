'use client'
import React from 'react'
import Link from 'next/link'
import { IoBug } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Flex } from '@radix-ui/themes';
import { Container } from '@radix-ui/themes'
import { Text } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();
    console.log(currentPath);
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },

    ]
    return (
        <nav className=' border-b mb-5 px-5 py-3 '>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href="/"><IoBug />
                        </Link>

                        <ul className='flex space-x-6 '>

                            {links.map(link => <li><Link key={link.href} href={link.href} className={classNames({
                                'text-zinc-900': link.href === currentPath,
                                'text-zinc-500': link.href !== currentPath,
                                'hover:text-zinc-800 transition-colors ': true
                            })}>{link.label}    </Link> </li>)}

                        </ul>

                    </Flex>
                    <Box>
                        {status === "authenticated" &&
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar src={session.user!.image!} fallback='?' size='2' radius='full' className="cursor-pointer"></Avatar>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size='2'>
                                            {session.user!.email}
                                        </Text>

                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href={'api/auth/signout'}>Log out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>}
                        {status === "unauthenticated" && <Link href={'api/auth/signin'}>Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar