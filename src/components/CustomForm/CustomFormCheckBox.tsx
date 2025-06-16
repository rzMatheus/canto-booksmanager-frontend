import type {InputHTMLAttributes} from "react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

interface CustomFormCheckBoxProps extends InputHTMLAttributes<HTMLButtonElement>{
    labelText: string,
    name: string,
    checked?: boolean,
    key?: string,
    formControl: any,
}

export function CustomFormCheckBox({ labelText, name, formControl}: CustomFormCheckBoxProps){
    return(
            <FormField
                control={formControl.control}
                name={name}
                key={name}
                render={({ field }) => (
                    <FormItem key={name} className="flex flex-row items-center gap-2">
                        <FormControl>
                            <Checkbox checked={field.value == true}
                                      onCheckedChange={(checked) => {
                                          return checked
                                              ? field.onChange(true)
                                              : field.onChange(
                                                  field.value !== true
                                              )
                                      }}
                                      />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{labelText}</FormLabel>
                        <FormMessage />
                    </FormItem>
                )}
            />
    );
}