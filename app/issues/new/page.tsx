'use client'
import { TextArea, TextField } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Callout } from "@radix-ui/themes";
interface IssueForm {
    title: string
    description: string
}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();

    const [error, setError] = useState('');

    return (
        <div className="max-w-xl ">
            {error && <Callout.Root color="red">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className="space-y-3" onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issues', data)
                    router.push('/issues')

                } catch (error) {
                    setError('An unexpected error is occured ');
                }
            })}>
            <TextField.Root>
                    <TextField.Input placeholder='TItle' {...register('title')} />
            </TextField.Root>
                <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder='Description'  {...field} />}>

                </Controller>

            <Button >Submit New Issue </Button>
            </form>
        </div>
    );
}

export default NewIssuePage;
