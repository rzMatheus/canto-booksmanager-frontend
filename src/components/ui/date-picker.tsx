import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDownIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {format} from "date-fns";

interface DatePickerProps {
    onChange: (e: any) => void,
}

export function DatePicker({onChange}: DatePickerProps){
    const [date, setDate] = useState<Date>()
    const [open, setOpen] = useState(false)

    return(
        <div className="flex flex-col gap-3 w-full">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                    >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                            onChange(date && format(date, 'yyyy-MM-dd'))
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}