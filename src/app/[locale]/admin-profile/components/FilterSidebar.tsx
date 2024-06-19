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
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/admin.store";
import { formStore } from "@/store/form.store";

export type Filter = {
  full_name?: string;
  edu_direction?: string;
  education_form?: string;
  from_date?: string;
  status?: 'pending' | 'accepted' | 'rejected';
  to_date?: string;
  faculty?: string;
  entered_year?: number;
  graduation_year?: number;
  edu_type?: string;
  gender?: 'male' | 'female';
}

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

const educationTypes = [
  {
    value: "OShniy",
    label: "OShniy",
  },
  {
    value: "Zauchniy",
    label: "Zauchniy",
  },
];

const faculties = [
  {
    value: "Moliya va iqtisod",
    label: "Moliya va iqtisod",
  },
  {
    value: "Buxgalteriya",
    label: "Buxgalteriya",
  },
  {
    value: "Kompyuter texnologiyalari",
    label: "Kompyuter texnologiyalari",
  },
];


const FilterSidebar = ({
  filter,
  setFilter,
  isShowSideBar,
  setIsShowSideBar,
}: {
  filter: Filter | null;
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>
  isShowSideBar: boolean;
  setIsShowSideBar: (v: boolean) => void;
}) => {
  const [date, setDate] = useState<Date>();
  const { getApplications } = useAdminStore()
  const { regions, getRegions } = formStore()


  const handleChange = (e: any, param: keyof Filter) => {
    setFilter((prev) => ({
      ...prev,
      [param]: e,
    }))
  }

  const handleSubmit = () => {
    getApplications(filter)
    setIsShowSideBar(false)
  }

  const handleCancel = () => {
    setFilter(null)
    getApplications()
    setIsShowSideBar(false)
  }

  useEffect(() => {
    if (!regions.length) {
      getRegions()
    }
  }, [])

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
            <Select value={filter?.faculty} onValueChange={(e) => handleChange(e, "faculty")}>
              <Label className="text-[#6E7781] text-sm">
                Fakultet
              </Label>
              <SelectTrigger className="w-full !border-[#D0D7DE] !py-3 h-auto">
                <SelectValue placeholder="Fakultet nomi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {faculties.map((item) => (
                    <SelectItem key={item.label} className="!text-[#24292F]" value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-5">
            <Select value={filter?.edu_type} onValueChange={(e) => handleChange(e, "edu_type")}>
              <Label className="text-[#6E7781] text-sm">Ta’lim shakli</Label>
              <SelectTrigger className="w-full !border-[#D0D7DE] !py-3 h-auto">
                <SelectValue placeholder="Ta’lim shakli" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {educationTypes.map((item) => (
                    <SelectItem key={item.label} className="!text-[#24292F]" value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-5">
            <Label className="text-[#6E7781] text-sm">Ariza sanasi</Label>
            <AdminDatePicker key={"1"} filter={filter} setFilter={setFilter} className="!w-full" />
          </div>
          <div className="mb-5">
            <Select value={filter?.edu_direction} onValueChange={(e) => handleChange(e, "edu_direction")}>
              <Label className="text-[#6E7781] text-sm">Hudud</Label>
              <SelectTrigger className="w-full !border-[#D0D7DE] !py-3 h-auto">
                <SelectValue placeholder="Hudud" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {regions.map((item) => (
                    <SelectItem key={item.id} className="!text-[#24292F]" value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-5">
            <Select value={filter?.gender} onValueChange={(e) => handleChange(e, "gender")}>
              <Label className="text-[#6E7781] text-sm">Jinsi</Label>
              <SelectTrigger className="w-full !border-[#D0D7DE] !py-3 h-auto">
                <SelectValue placeholder="Jinsi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    { value: "male", label: "Erkak" },
                    { value: "female", label: "Ayol" },
                  ].map((item) => (
                    <SelectItem key={item.label} className="!text-[#24292F]" value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-5">
            <Select value={filter?.edu_type} onValueChange={(e) => handleChange(e, "edu_type")}>
              <Label className="text-[#6E7781] text-sm">
                Bitirgan ta’lim dargohi
              </Label>
              <SelectTrigger className="w-full !border-[#D0D7DE] !py-3 h-auto">
                <SelectValue placeholder="Bitirgan ta’lim dargohi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {applicationStatus.map((item) => (
                    <SelectItem key={item.label} className="!text-[#24292F]" value={item.value}>
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
                  {date ? format(date, "PPP") : <span>Sanani kiriting</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  onDayClick={(e) => handleChange(e, 'graduation_year')}
                  initialFocus
                  className="text-[#24292F] hover:!text-[#24292F]"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-end gap-3 mb-6">
            <Button onClick={handleCancel} className="py-3 px-5 !bg-white border border-[#0550AE] !text-[#0550AE]">
              Bekor qilish
            </Button>
            <Button onClick={handleSubmit} className="text-white !bg-[#0550AE] py-3 px-5">
              Ko’rsatish
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSidebar;
