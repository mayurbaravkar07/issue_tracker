'use client'
import { Avatar, Box, Container, DropdownMenu, Flex, Skeleton, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoBug } from "react-icons/io5";

const NavBar = () => {
    return (

        <nav className=' border-b mb-5 px-5 py-3 '>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href="/"><IoBug />
                        </Link>
                        <NavLinks></NavLinks>
                    </Flex>
                    <AuthStatus></AuthStatus>
                </Flex>
            </Container>
        </nav>
    )
}


const AuthStatus = () => {
    const { status, data: session } = useSession();
    if (status === 'loading') return <Skeleton width="3rem"></Skeleton>;
    if (status === 'unauthenticated') return <Link className="nav-link" href={'api/auth/signin'}>Login</Link>

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user!.image!} fallback='?' size='2' radius='full' className="cursor-pointer" referrerPolicy='no-referrer'></Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size='2'>
                            {session!.user!.email}
                        </Text>

                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href={'api/auth/signout'}>Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>

        </Box>
    );
}

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },

    ]
    return (
        <ul className='flex space-x-6 '>

            {links.map(link => <li><Link key={link.href} href={link.href} className={classNames({
                "nav-link": true,
                '!text-zinc-900': link.href === currentPath,
            })}>{link.label}    </Link> </li>)}

        </ul>
    )
}
export default NavBar