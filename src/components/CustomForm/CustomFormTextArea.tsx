import type {InputHTMLAttributes} from "react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

interface CustomFormTextAreaProps extends InputHTMLAttributes<any>{
    labelText: string,
    name: string,
    key?: string,
    formControl: any,
}

export function CustomFormTextArea({ labelText, name, key, formControl, ...rest }: CustomFormTextAreaProps){
    return(
            <FormField
                control={formControl.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{labelText}</FormLabel>
                        <FormControl>
                            <Textarea placeholder={rest.placeholder} {...field} {...rest} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
    );
}