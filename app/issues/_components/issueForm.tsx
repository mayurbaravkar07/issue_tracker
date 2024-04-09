'use client'
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from "@prisma/client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import SimpleMDE from 'react-simplemde-editor'
type IssueFormData = z.infer<typeof issueSchema>;




const IssueForm = async ({ issue }: { issue?: Issue }) => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });

    const [error, setError] = useState('');
    const [isSumbitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            if (issue) await axios.patch('/api/issues/' + issue.id, data);
            else await axios.post('/api/issues', data);
            router.push('/issues');
            router.refresh();

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
                    <TextField.Input defaultValue={issue?.title} placeholder='TItle' {...register('title')} />
                </TextField.Root>
                {errors.title && <Text color="red" as="p">{errors.title?.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder='Description'  {...field} />}>

                </Controller>
                {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}

                {<Button disabled={isSumbitting}>{issue ? 'Update Issue' : 'Submit New Issue'}{' '}{isSumbitting && <Spinner></Spinner>}</Button >}
            </form>
        </div>
    );
}

export default IssueForm;