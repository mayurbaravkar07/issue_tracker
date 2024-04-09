'use client'
import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const deleteIssue = async () => {
        try {
            setDeleting(true);
            await axios.delete('/api/issues/' + issueId);
            router.push('/issues');
            router.refresh();
        } catch (error) {
            setDeleting(false);
            setError(true);
        }

    }

    return (
        <>
        <AlertDialog.Root>
            <AlertDialog.Trigger>

                    <Button color='red' disabled={isDeleting}>
                        Delete Issue
                        {isDeleting && <Spinner size="1"></Spinner>}
                </Button>

            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Confirm  Deletion
                </AlertDialog.Title>
                <AlertDialog.Description>
                    This action will permanently remove the selected issue. Proceed with caution as this action cannot be undone.  </AlertDialog.Description>
                <Flex mt="4" gap="3">
                    <AlertDialog.Cancel>
                        <Button color='gray' variant='soft'>
                                Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                            <Button color='red' onClick={deleteIssue}>Delete Issue</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Error
                    </AlertDialog.Title>
                    <AlertDialog.Description> This Issue Could not be deleted.</AlertDialog.Description>
                    <Button color='gray' variant='soft' mt="2" onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Content>


            </AlertDialog.Root>
        </>


    )
}

export default DeleteIssueButton;