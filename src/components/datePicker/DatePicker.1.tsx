"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";


export function DatePicker(props: any) {
    const [date, setDate] = React.useState<Date>();

    React.useEffect(() => {
        props.onChange(date);
    }, [date]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        `${props.className} flex justify-start text-left font-normal w-full h-auto bg-[#F6F8FA] outline-none !py-4 !px-3 !text-[#424A53] hover:!text-[#424A53] `,
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                        format(date, "PPP")
                    ) : (
                        <span className="opacity-50">Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    className="text-[#424A53] hover:!text-[#424A53]"
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus />
            </PopoverContent>
        </Popover>
    );
}
