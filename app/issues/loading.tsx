import { Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import prisma from '@/prisma/client'
import { array } from 'zod'
import IssueActions from './issueActions'
const LoadingIssuePage = async () => {
    const AllIssues = await prisma.issue.findMany();

    const issues = [];
    for (let i = 0; i < AllIssues.length; i++) {
        issues.push(i);
    }


    return (
        <div>
            <IssueActions></IssueActions>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>CreatedAt</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue}>

                            <Table.Cell><Skeleton></Skeleton>
                                <div className='block md:hidden'><Skeleton></Skeleton></div></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><Skeleton></Skeleton></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><Skeleton></Skeleton></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root></div>
    )
}

export default LoadingIssuePage