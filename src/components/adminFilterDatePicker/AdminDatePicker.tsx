"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "@/app/[locale]/admin-profile/components/FilterSidebar";

interface Props {
  className?: string;
  filter: Filter | null;
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>;
}

const AdminDatePicker = ({ className, filter, setFilter }: Props) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  React.useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      from_date: date?.from?.toString(),
      to_date: date?.to?.toString(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              `w-[300px] justify-between text-left font-normal py-3 !h-auto !border-[#D0D7DE] hover:!text-[#24292F] ${className}`,
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>From - to</span>
            )}

            <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="!text-[#24292F] hover:!text-[#24292F] "
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AdminDatePicker;
