import React from 'react';
import { Html, Body, Container, Text, Preview, Tailwind } from '@react-email/components';
import { Issue, Status, User } from 'prisma/prisma-client';

import { Flex, Section } from '@radix-ui/themes';

interface IssueProps extends Issue { }

interface UserProps extends User { }

const IssueTemplate: React.FC<IssueProps & UserProps> = ({ title, status, description, createdAt, name }) => {

    const determinePriority = (status: Status) => {
        return status === 'OPEN' ? 'High' : status === 'IN_PROGRESS' ? 'Medium' : 'Low';
    };

    return (
        <Html>
            <Preview>{title}</Preview>
            <Tailwind>
                <Flex justify='start'>
                    <Body>
                        <Container className=" justify-between max-w-2xl mx-auto p-4 bg-white rounded shadow-lg">
                            <Section className="mb-4">
                                <Text className="text-lg font-semibold">Hi, {name}</Text>
                            </Section>
                            <Section className='space'>
                                <Text className='text-lg font-semibold'>Action Required: New Task Assigned - Issue-Tracker - {title}</Text>
                                <Text className='text-sm'>{description}</Text>
                                <Text className='text-sm'>Priority: {determinePriority(status)}</Text>
                                <Text className='text-sm'>Status: {status}</Text>
                                <Text className='text-sm'>Deadline: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</Text>
                                <Text className='text-sm'>Please review the issue and take appropriate action as soon as possible. If you have any questions or need further clarification, feel free to reach out.</Text>
                            </Section>
                            <Section>
                                <Text className="mt-4 text-sm">Best regards,</Text>
                                <Text className="text-sm">Team Issue-Tracker</Text>
                            </Section>
                        </Container>
                    </Body>
                </Flex>
            </Tailwind>
        </Html>
    )

}

export default IssueTemplate;
