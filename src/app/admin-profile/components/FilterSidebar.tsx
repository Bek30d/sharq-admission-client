import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import BaseIcon from "@/components/icons/BaseIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminDatePicker from "@/components/adminFilterDatePicker/AdminDatePicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const educationDirections = [
  {
    value: "moliya1",
    label: "Moliya",
  },
  {
    value: "kafedra1",
    label: "Kafedra",
  },
  {
    value: "moliya",
    label: "Moliya",
  },
  {
    value: "kafedra",
    label: "Kafedra",
  },
];

const applicationStatus = [
  {
    value: "accepted",
    label: "Qabul qilingan",
  },
  {
    value: "pending",
    label: "Ko’rib chiqilmoqda",
  },
  {
    value: "rejected",
    label: "Rad etildi",
  },
];

const FilterSidebar = ({
  isShowSideBar,
  setIsShowSideBar,
}: {
  isShowSideBar: boolean;
  setIsShowSideBar: (v: boolean) => void;
}) => {
  const [date, setDate] = useState<Date>();
  return (
    <Sheet open={isShowSideBar} onOpenChange={setIsShowSideBar}>
      <SheetContent className="!p-0 overflow-y-auto">
        <SheetHeader className="flex-row justify-between items-center p-5 border-b border-[#D0D7DE] mb-5">
          <SheetTitle className="!text-[#18324D]">Filter</SheetTitle>

          <div onClick={() => setIsShowSideBar(false)}>
            <BaseIcon name="close" />
          </div>
        </SheetHeader>

        <div className="px-5">
          <div className="mb-5">
            <Select>
              <Label className="text-[#6E7781] text-sm">
                Ta’lim yo’nalishi
              </Label>
              <SelectTrigger className="w-full !border-[#D0D7DE] !py-3 h-auto">
                <SelectValue placeholder="Ariza holati" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {applicationStatus.map((item) => (
                    <SelectItem className="!text-[#24292F]" value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-5">
            <Select>
              <Label className="text-[#6E7781] text-sm">Ta’lim shakli</Label>
              <SelectTrigger className="w-full !border-[#D0D7DE] !py-3 h-auto">
                <SelectValue placeholder="Ariza holati" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {applicationStatus.map((item) => (
                    <SelectItem className="!text-[#24292F]" value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-5">
            <Label className="text-[#6E7781] text-sm">Ariza sanasi</Label>
            <AdminDatePicker className="!w-full" />
          </div>
          <div className="mb-5">
            <Select>
              <Label className="text-[#6E7781] text-sm">Hudud</Label>
              <SelectTrigger className="w-full !border-[#D0D7DE] !py-3 h-auto">
                <SelectValue placeholder="Ariza holati" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {applicationStatus.map((item) => (
                    <SelectItem className="!text-[#24292F]" value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-5">
            <Select>
              <Label className="text-[#6E7781] text-sm">Jinsi</Label>
              <SelectTrigger className="w-full !border-[#D0D7DE] !py-3 h-auto">
                <SelectValue placeholder="Hammasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    { value: "male", label: "Erkak" },
                    { value: "female", label: "Ayol" },
                  ].map((item) => (
                    <SelectItem className="!text-[#24292F]" value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-5">
            <Select>
              <Label className="text-[#6E7781] text-sm">
                Bitirgan ta’lim dargohi
              </Label>
              <SelectTrigger className="w-full !border-[#D0D7DE] !py-3 h-auto">
                <SelectValue placeholder="Ariza holati" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {applicationStatus.map((item) => (
                    <SelectItem className="!text-[#24292F]" value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-20 flex flex-col">
            <Label className="text-[#6E7781] text-sm">Bitirgan yili</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[228px] justify-start text-left font-normal !border-[#D0D7DE] text-[#24292F] hover:!text-[#24292F] ",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="text-[#24292F] hover:!text-[#24292F]"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-end gap-3 mb-6">
            <Button className="py-3 px-5 !bg-white border border-[#0550AE] !text-[#0550AE]">
              Bekor qilish
            </Button>
            <Button className="text-white !bg-[#0550AE] py-3 px-5">
              Ko’rsatish
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSidebar;
