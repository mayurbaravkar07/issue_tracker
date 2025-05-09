import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { IssueStatusBadge } from './components';
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            assignedToUser: true
        }
    });

    return (
        <Card>
            <Flex justify='between'>
                <Heading size="5" mb="3">Latest Issues</Heading>
            </Flex>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify='between'>
                                    <Flex direction='column' align='start' gap='2'>
                                        <Link href={`/issues/${issue.id}`}>    {issue.title}</Link>
                                        <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                                    </Flex>
                                    {issue.assignedToUser && (
                                        <Avatar src={issue.assignedToUser.image!} fallback="?" size='2' radius='full'></Avatar>
                                    )}
                                </Flex>

                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssues