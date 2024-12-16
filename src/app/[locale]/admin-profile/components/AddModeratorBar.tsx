import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import BaseIcon from "@/components/icons/BaseIcon";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useAdminStore } from "@/store/admin.store";


type FormData = z.infer<typeof schema>;
const phoneRegex = new RegExp(/^\+998\d{9}$/);

const schema = z.object({
    phone: z.string().regex(phoneRegex, { message: "Invalid phone number" }),
    password: z.string().min(4, "Password is required"),
});

const AddModeratorBar = ({
    isShowSideBar,
    setIsShowSideBar,
}: {
    isShowSideBar: boolean;
    setIsShowSideBar: (v: boolean) => void;
}) => {
    const { postModerator } = useAdminStore()

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            phone: "+998",
            password: "",
        },
    });

    const handleSubmit: SubmitHandler<FormData> = async (data) => {
        postModerator(data.phone, data.password)
    }

    const handleCancel = () => {
        setIsShowSideBar(false)
        form.reset()
    }

    useEffect(() => {
    }, [])

    return (
        <Sheet open={isShowSideBar} onOpenChange={setIsShowSideBar}>
            <SheetContent className="!p-0 overflow-y-auto flex flex-col">
                <SheetHeader className="flex-row justify-between items-center p-5 border-b border-[#D0D7DE] mb-5">
                    <SheetTitle className="!text-[#18324D]">Yangi moderator qo`shish</SheetTitle>

                    <div onClick={() => setIsShowSideBar(false)}>
                        <BaseIcon name="close" />
                    </div>
                </SheetHeader>

                <div className="flex-1 px-5">

                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex h-full flex-col justify-between">
                        <div className="flex flex-col gap-4">
                            <div className="flex-1 w-full">
                                <label
                                    htmlFor="phone"
                                    className="text-[#424A53] font-medium text-sm"
                                >
                                    Telefon raqam
                                </label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                                    placeholder="998 xx xxx-xx-xx"
                                    {...form.register("phone")}
                                    maxLength={13}
                                />
                                <span className="text-red-400 text-xs">
                                    {form.formState.errors.phone?.message}
                                </span>
                            </div>
                            <div className="flex-1 w-full">
                                <label
                                    htmlFor="password"
                                    className="text-[#424A53] font-medium text-sm"
                                >
                                    Parol
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                                    placeholder="****"
                                    {...form.register("password")}
                                />
                                <span className="text-red-400 text-xs">
                                    {form.formState.errors.password?.message}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mb-6">
                            <Button onClick={handleCancel} className="py-3 px-5 !bg-white border border-[#0550AE] !text-[#0550AE]">
                                Bekor qilish
                            </Button>
                            <Button type="submit" className="text-white !bg-[#0550AE] py-3 px-5">
                                Ko’rsatish
                            </Button>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AddModeratorBar;
