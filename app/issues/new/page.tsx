'use client'
import { Text, TextArea, TextField } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Callout } from "@radix-ui/themes";
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateIssueSchema } from "@/app/validationSchemas";
import { z } from 'zod'
import Spinner from "@/app/components/Spinner";


type IssueForm = z.infer<typeof CreateIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<IssueForm>({
        resolver: zodResolver(CreateIssueSchema)
    });

    const [error, setError] = useState('');
    const [isSumbitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data)
            router.push('/issues')

        } catch (error) {
            setSubmitting(false);
            setError('An unexpected error is occured ');
        }
    });
    return (
        <div className="max-w-xl ">
            {error && <Callout.Root color="red">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className="space-y-3" onSubmit={onSubmit}>
            <TextField.Root>
                    <TextField.Input placeholder='TItle' {...register('title')} />
            </TextField.Root>
                {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
                <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder='Description'  {...field} />}>

                </Controller>
                {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}

                {<Button disabled={isSumbitting}>Submit New Issue{isSumbitting && <Spinner></Spinner>}</Button >}
            </form>
        </div>
    );
}

export default NewIssuePage;
