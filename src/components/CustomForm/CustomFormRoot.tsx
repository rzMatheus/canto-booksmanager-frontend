import {z} from "zod";
import type {ReactNode} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";

interface CustomFormProps {
    formSchema: z.Schema<any>,
    defaultValues: {[key: string]: string | number | boolean | Date }
    onSubmitAction: (data: any) => Promise<void>,
    children: ReactNode,
}

export function CustomFormRoot({formSchema, onSubmitAction, defaultValues, children}:CustomFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema as any),
        defaultValues: defaultValues
    })

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-4">
                {children}
            </form>
        </Form>
    )
}