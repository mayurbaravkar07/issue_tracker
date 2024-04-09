import prisma from '@/prisma/client';
import { Box, Grid, Flex } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

interface Props {
    params: { id: string }
}
const IssueDetailPage = async ({ params }: Props) => {
    // if (typeof params.id !== 'number') notFound();
    const session = await getServerSession(authOptions);

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) {
        notFound();
    }

    return (
        <Grid columns={{ initial: "1", sm: "5", lg: "8" }} gap="5">
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue}></IssueDetails>
            </Box>

            {session && <Box>
                <Flex direction='column' gap='3'>
                    <EditIssueButton issueId={issue.id}></EditIssueButton>
                    <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
                </Flex>

            </Box>
            }

        </Grid>
    )
}

export default IssueDetailPage