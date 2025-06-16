import type {InputHTMLAttributes} from "react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";

interface CustomFormDatePickerProps extends InputHTMLAttributes<any>{
    labelText: string,
    name: string,
    key?: string,
    formControl: any,
}

export function CustomFormDatePicker({ labelText, name, key, formControl}: CustomFormDatePickerProps){
    return(
            <FormField
                control={formControl.control}
                name={name}
                key={key}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{labelText}</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            `${new Date(field.value).toLocaleDateString()}`
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date()
                                    }
                                    captionLayout="dropdown"
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />
    );
}