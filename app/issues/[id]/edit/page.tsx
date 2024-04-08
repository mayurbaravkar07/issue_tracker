import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

const IssueForm = dynamic(
    () => import('@/app/issues/_components/issueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton></IssueFormSkeleton>
    }
)

interface Props {
    params: { id: string }
}
const EditIssuePage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) notFound();
    return (
        <IssueForm issue={issue}></IssueForm>
    )
}

export default EditIssuePage