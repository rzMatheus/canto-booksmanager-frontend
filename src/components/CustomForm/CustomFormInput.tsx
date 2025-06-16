import type {InputHTMLAttributes} from "react";
import {Input} from "@/components/ui/input.tsx";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";

interface CustomFormInputProps extends InputHTMLAttributes<any>{
    labelText: string,
    name: string,
    defaultValue: string,
    key?: string,
    formControl: any,
}

export function CustomFormInput({ labelText, name, key, defaultValue, formControl, ...rest }: CustomFormInputProps){
    return(
            <FormField
                control={formControl.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{labelText}</FormLabel>
                        <FormControl>
                            <Input placeholder={rest.placeholder} {...field} {...rest} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
    );
}