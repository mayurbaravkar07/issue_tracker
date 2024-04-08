// import IssueForm from '../_components/issueForm'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading';


const IssueForm = dynamic(
    () => import('@/app/issues/_components/issueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton></IssueFormSkeleton>
    }

);
const NewIssuePage = () => {
    return (
        <IssueForm></IssueForm>
    )
}

export default NewIssuePage