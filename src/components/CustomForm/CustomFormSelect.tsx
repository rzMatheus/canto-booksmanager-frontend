import type {InputHTMLAttributes} from "react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";

interface CustomFormSelectProps extends InputHTMLAttributes<any>{
    labelText: string,
    name: string,
    options: {
        value: string,
        label: string,
    }[],
    defaultValue?: string,
    key?: string,
    formControl: any,
}

export function CustomFormSelect({ labelText, name, options, key, defaultValue, formControl, ...rest }: CustomFormSelectProps){
    return(
            <FormField
                control={formControl.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{labelText}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={rest.placeholder} />
                                </SelectTrigger>
                         </FormControl>
                            <SelectContent>
                                {
                                    options?.map((option, index) => (
                                        <SelectItem key={index} value={option.value}>{option.label}</SelectItem>

                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
    );
}